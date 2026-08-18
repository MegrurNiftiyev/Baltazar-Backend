import type { SupportedLang } from '../config/locales.js';
import type { Region } from '../shared/enums.js';

declare global {
  namespace Express {
    interface Request {
      /** Populated by requireAuth middleware after JWT verification. */
      user?: {
        userId: string;
        role: 'USER' | 'ADMIN';
        language: SupportedLang;
        wishlist?: Array<{ serviceId: string; serviceType: string }>;
      };
      /** Populated by resolveLocale middleware. */
      lang?: SupportedLang;
      /** Populated by resolveLocale middleware. */
      region?: Region;
      /** Populated by validate middleware for Express 5 compatibility. */
      validatedQuery?: unknown;
    }
  }
}

export {};
