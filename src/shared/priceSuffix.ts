import { ServiceType } from './serviceType.js';
import { SupportedLang, t } from '../config/locales.js';

export const PRICE_SUFFIX_KEY: Record<ServiceType, string> = {
  HOTEL: 'price_suffix_per_night',
  RENT_A_CAR: 'price_suffix_per_day',
  FOOD: 'price_suffix_per_item',
  TRAVEL: 'price_suffix_per_person',
};

export function getLocalizedPriceSuffix(serviceType: ServiceType, lang: SupportedLang = 'en'): string {
  const key = PRICE_SUFFIX_KEY[serviceType];
  if (!key) return '';
  return t(key, lang);
}
