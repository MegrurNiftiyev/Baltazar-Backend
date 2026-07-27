import type { SupportedLang, LocalizedMap } from '../config/locales.js';

/**
 * Check if a value looks like a localized map ({ az, en, ru }).
 */
function isLocalizedMap(value: unknown): value is LocalizedMap {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.az === 'string' && typeof obj.en === 'string' && typeof obj.ru === 'string';
}

/**
 * Recursively walk an object and resolve any `{ az, en, ru }` map fields
 * to a single string in the requested language.
 *
 * Applied at the controller layer, right before `res.json(...)`,
 * on every localized field (name, about, title, description).
 *
 * @example
 *   const hotel = { name: { az: 'Otel', en: 'Hotel', ru: 'Отель' }, starRating: 5 };
 *   localize(hotel, 'en'); // => { name: 'Hotel', starRating: 5 }
 */
const ALLOWED_LOCALIZE_FIELDS = new Set(['name', 'about', 'title', 'description', 'categoryName', 'brandName']);

export function localize<T>(obj: T, lang: SupportedLang): T {
  if (obj === null || obj === undefined) return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => localize(item, lang)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (ALLOWED_LOCALIZE_FIELDS.has(key) && isLocalizedMap(value)) {
        result[key] = value[lang] || value.en;
      } else if (value !== null && typeof value === 'object') {
        result[key] = localize(value, lang);
      } else {
        result[key] = value;
      }
    }
    return result as T;
  }

  return obj;
}
