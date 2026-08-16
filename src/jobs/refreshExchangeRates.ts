import cron from 'node-cron';
import { db } from '../config/firebase.js';
import { COLLECTIONS } from '../config/collections.js';
import { logger } from '../config/logger.js';
import { updateRateCache } from '../utils/currency.js';
import type { Currency } from '../shared/enums.js';

export async function refreshExchangeRates() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = (await response.json()) as { rates?: Record<string, number> };
    const aznRate = data.rates?.AZN ?? 1.7;
    const rubRate = data.rates?.RUB ?? 90.0;
    const usdRate = 1.0;

    const ratesToStore: Array<{ currency: Currency; rateToUsd: number }> = [
      { currency: 'AZN', rateToUsd: aznRate },
      { currency: 'RUB', rateToUsd: rubRate },
      { currency: 'USD', rateToUsd: usdRate },
    ];

    for (const item of ratesToStore) {
      await db.collection(COLLECTIONS.EXCHANGE_RATES).doc(item.currency).set({
        currency: item.currency,
        rateToUsd: item.rateToUsd,
        updatedAt: new Date().toISOString(),
      });
      updateRateCache(item.currency, item.rateToUsd);
    }
  } catch (error) {
    logger.warn({ error }, 'Failed to refresh exchange rates');
  }
}

export function scheduleExchangeRateRefresh() {
  void refreshExchangeRates();
  cron.schedule('0 */6 * * *', refreshExchangeRates);
}
