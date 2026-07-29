import type { SupportedLang } from '../config/locales.js';

declare global {
  namespace Express {
    interface Request {
      /** Populated by requireAuth middleware after JWT verification. */
      user?: {
        userId: string;
        role: 'USER' | 'ADMIN';
        language: SupportedLang;
      };
      /** Populated by resolveLocale middleware. */
      lang?: SupportedLang;
      /** Populated by validate middleware for Express 5 compatibility. */
      validatedQuery?: unknown;
    }
  }
}

export {};
