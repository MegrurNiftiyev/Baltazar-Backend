import 'dotenv-flow/config';
import { describe, it, expect } from 'vitest';
import { convertPriceFromUsd, getCurrencyForRegion } from './currency.js';

describe('Currency Conversion Utility', () => {
  it('resolves region currencies correctly', () => {
    expect(getCurrencyForRegion('AZ')).toBe('AZN');
    expect(getCurrencyForRegion('US')).toBe('USD');
    expect(getCurrencyForRegion('RU')).toBe('RUB');
    expect(getCurrencyForRegion('unknown')).toBe('AZN');
    expect(getCurrencyForRegion(undefined)).toBe('AZN');
  });

  it('converts base USD price to regional currency values correctly', () => {
    // US region: 1 USD = 1.0 USD
    const usResult = convertPriceFromUsd(100, 'US');
    expect(usResult.currency).toBe('USD');
    expect(usResult.price).toBe(100);

    // AZ region: 1 USD = 1.7 AZN
    const azResult = convertPriceFromUsd(100, 'AZ');
    expect(azResult.currency).toBe('AZN');
    expect(azResult.price).toBe(170);

    // RU region: 1 USD = 90.0 RUB
    const ruResult = convertPriceFromUsd(100, 'RU');
    expect(ruResult.currency).toBe('RUB');
    expect(ruResult.price).toBe(9000);
  });
});
