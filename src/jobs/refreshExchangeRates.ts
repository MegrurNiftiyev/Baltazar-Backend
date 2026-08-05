import cron from 'node-cron';
import { db } from '../config/firebase.js';
import { COLLECTIONS } from '../config/collections.js';
import { logger } from '../config/logger.js';

async function refreshExchangeRates() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = (await response.json()) as { rates?: Record<string, number> };
    const aznRate = data.rates?.AZN ?? 1;
    await db.collection(COLLECTIONS.EXCHANGE_RATES).doc('AZN').set({
      currency: 'AZN',
      rateToUsd: aznRate,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    logger.warn({ error }, 'Failed to refresh exchange rates');
  }
}

export function scheduleExchangeRateRefresh() {
  cron.schedule('0 */6 * * *', refreshExchangeRates);
}
