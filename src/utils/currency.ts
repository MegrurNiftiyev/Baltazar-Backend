import { db } from '../config/firebase.js';
import { COLLECTIONS } from '../config/collections.js';

const rateCache = new Map<string, { rate: number; cachedAt: number }>();
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

async function getCachedRate(region: string): Promise<number> {
  const currency = getCurrencyForRegion(region);
  const cached = rateCache.get(currency);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) return cached.rate;

  const doc = await db.collection(COLLECTIONS.EXCHANGE_RATES).doc(currency).get();
  const rate = doc.exists ? (doc.data()!.rateToUsd as number) : 1;
  rateCache.set(currency, { rate, cachedAt: Date.now() });
  return rate;
}

function getCurrencyForRegion(region: string): string {
  const map: Record<string, string> = { AZ: 'AZN' };
  return map[region] || 'USD';
}

export async function toDisplayPrice(basePriceUsd: number, region: string) {
  const rate = await getCachedRate(region);
  return { amount: Math.round(basePriceUsd * rate * 100) / 100, currency: getCurrencyForRegion(region) };
}
