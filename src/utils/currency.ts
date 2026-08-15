import { db } from '../config/firebase.js';
import { COLLECTIONS } from '../config/collections.js';
import { REGION_CURRENCY_MAP, type Region, type Currency } from '../shared/enums.js';

const rateCache = new Map<string, { rate: number; cachedAt: number }>();
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

export function getCurrencyForRegion(region?: string): Currency {
  if (!region) return 'AZN';
  const upper = region.toUpperCase().trim() as Region;
  return REGION_CURRENCY_MAP[upper] || 'AZN';
}

async function getCachedRate(region: string): Promise<number> {
  const currency = getCurrencyForRegion(region);
  const cached = rateCache.get(currency);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) return cached.rate;

  const doc = await db.collection(COLLECTIONS.EXCHANGE_RATES).doc(currency).get();
  const rate = doc.exists ? (doc.data()!.rateToUsd as number) : 1;
  rateCache.set(currency, { rate, cachedAt: Date.now() });
  return rate;
}

export async function toDisplayPrice(basePriceUsd: number, region: string) {
  const rate = await getCachedRate(region);
  return { amount: Math.round(basePriceUsd * rate * 100) / 100, currency: getCurrencyForRegion(region) };
}

