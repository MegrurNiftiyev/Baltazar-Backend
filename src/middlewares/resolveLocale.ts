import type { Request, Response, NextFunction } from 'express';
import type { SupportedLang } from '../config/locales.js';
import { regionEnum, type Region } from '../shared/enums.js';

const SUPPORTED_LANGUAGES: SupportedLang[] = ['az', 'en', 'ru'];
const DEFAULT_LANG: SupportedLang = 'en';

const SUPPORTED_REGIONS: Region[] = regionEnum.options;
const DEFAULT_REGION: Region = 'AZ';

const LANG_REGION_FALLBACK: Record<SupportedLang, Region> = {
  az: 'AZ',
  en: 'US',
  ru: 'RU',
};

/**
 * Resolves the user's preferred language and region from headers / query params.
 *
 * Language Priority: `?lang=...` query param → `Accept-Language` header → default 'en'.
 * Region Priority: `X-Region` header → `?region=...` query param → language fallback → default 'AZ'.
 *
 * Attaches the resolved values as `req.lang` and `req.region`.
 */
export const resolveLocale = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  // 1. Resolve Language
  let resolvedLang: SupportedLang = DEFAULT_LANG;
  const queryLang = req.query.lang;
  if (
    typeof queryLang === 'string' &&
    SUPPORTED_LANGUAGES.includes(queryLang.toLowerCase() as SupportedLang)
  ) {
    resolvedLang = queryLang.toLowerCase() as SupportedLang;
  } else {
    const acceptLang = req.headers['accept-language'];
    if (acceptLang) {
      const primaryTag = acceptLang.split(',')[0]?.split('-')[0]?.toLowerCase().trim();
      if (primaryTag && SUPPORTED_LANGUAGES.includes(primaryTag as SupportedLang)) {
        resolvedLang = primaryTag as SupportedLang;
      }
    }
  }
  req.lang = resolvedLang;

  // 2. Resolve Region
  let resolvedRegion: Region | undefined;

  // Priority A: X-Region HTTP Header
  const headerRegion = req.headers['x-region'];
  if (typeof headerRegion === 'string') {
    const uppercaseHeader = headerRegion.toUpperCase().trim() as Region;
    if (SUPPORTED_REGIONS.includes(uppercaseHeader)) {
      resolvedRegion = uppercaseHeader;
    }
  }

  // Priority B: region Query Parameter
  if (!resolvedRegion) {
    const queryRegion = req.query.region;
    if (typeof queryRegion === 'string') {
      const uppercaseQuery = queryRegion.toUpperCase().trim() as Region;
      if (SUPPORTED_REGIONS.includes(uppercaseQuery)) {
        resolvedRegion = uppercaseQuery;
      }
    }
  }

  // Priority C: Language Fallback / Default
  if (!resolvedRegion) {
    resolvedRegion = LANG_REGION_FALLBACK[resolvedLang] || DEFAULT_REGION;
  }

  req.region = resolvedRegion;
  next();
};
