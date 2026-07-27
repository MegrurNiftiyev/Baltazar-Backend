import type { Request, Response, NextFunction } from 'express';
import type { SupportedLang } from '../config/locales.js';

const SUPPORTED_LANGUAGES: SupportedLang[] = ['az', 'en', 'ru'];
const DEFAULT_LANG: SupportedLang = 'en';

/**
 * Resolves the user's preferred language from the `Accept-Language` header.
 *
 * Priority: Accept-Language header → defaults to 'en'.
 * Attaches the resolved language as `req.lang`.
 *
 * Later, when the user is authenticated, the auth flow can override
 * `req.lang` with `User.language` if desired (not implemented here to
 * keep this middleware auth-agnostic).
 */
export const resolveLocale = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const acceptLang = req.headers['accept-language'];

  if (acceptLang) {
    // Parse the primary language tag (e.g. "az-AZ,az;q=0.9,en;q=0.8" → "az")
    const primaryTag = acceptLang.split(',')[0]?.split('-')[0]?.toLowerCase().trim();

    if (primaryTag && SUPPORTED_LANGUAGES.includes(primaryTag as SupportedLang)) {
      req.lang = primaryTag as SupportedLang;
      next();
      return;
    }
  }

  req.lang = DEFAULT_LANG;
  next();
};
