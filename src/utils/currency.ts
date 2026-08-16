import { db } from '../config/firebase.js';
import { COLLECTIONS } from '../config/collections.js';
import { REGION_CURRENCY_MAP, type Region, type Currency } from '../shared/enums.js';

const rateCache = new Map<string, { rate: number; cachedAt: number }>();
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

const DEFAULT_RATES_FROM_USD: Record<Currency, number> = {
  USD: 1.0,
  AZN: 1.7,
  RUB: 90.0,
};

export function updateRateCache(currency: Currency, rate: number) {
  rateCache.set(currency, { rate, cachedAt: Date.now() });
}

export async function loadExchangeRatesFromDb(): Promise<void> {
  try {
    const snap = await db.collection(COLLECTIONS.EXCHANGE_RATES).get();
    for (const doc of snap.docs) {
      const data = doc.data();
      if (data.currency && typeof data.rateToUsd === 'number') {
        updateRateCache(data.currency as Currency, data.rateToUsd);
      }
    }
  } catch {
    // fallback to default rates if DB is uninitialized or offline
  }
}

export function getCurrencyForRegion(region?: string): Currency {
  if (!region) return 'AZN';
  const upper = region.toUpperCase().trim() as Region;
  return REGION_CURRENCY_MAP[upper] || 'AZN';
}

export function getRateForCurrency(currency: Currency): number {
  const cached = rateCache.get(currency);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return cached.rate;
  }
  return DEFAULT_RATES_FROM_USD[currency] ?? 1.0;
}

export function convertPriceFromUsd(basePriceUsd: number, region?: string): { price: number; currency: Currency } {
  const currency = getCurrencyForRegion(region);
  const rate = getRateForCurrency(currency);
  const price = Math.round(basePriceUsd * rate * 100) / 100;
  return { price, currency };
}

async function getCachedRate(region: string): Promise<number> {
  const currency = getCurrencyForRegion(region);
  const cached = rateCache.get(currency);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) return cached.rate;

  try {
    const doc = await db.collection(COLLECTIONS.EXCHANGE_RATES).doc(currency).get();
    if (doc.exists && typeof doc.data()?.rateToUsd === 'number') {
      const rate = doc.data()!.rateToUsd as number;
      updateRateCache(currency, rate);
      return rate;
    }
  } catch {
    // fallback to default rate
  }

  const rate = DEFAULT_RATES_FROM_USD[currency] ?? 1;
  updateRateCache(currency, rate);
  return rate;
}

export async function toDisplayPrice(basePriceUsd: number, region: string) {
  const rate = await getCachedRate(region);
  return { amount: Math.round(basePriceUsd * rate * 100) / 100, currency: getCurrencyForRegion(region) };
}

