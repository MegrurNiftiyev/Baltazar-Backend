import rateLimit from 'express-rate-limit';
import { t, type SupportedLang } from '../config/locales.js';

const localizedRateLimitMessage = (req: import('express').Request) => ({
  success: false,
  errorCode: 'RATE_LIMIT',
  message: t('RATE_LIMIT', (req.lang || 'en') as SupportedLang),
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: localizedRateLimitMessage,
});

export const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: localizedRateLimitMessage,
});

export const paymentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: localizedRateLimitMessage,
});
