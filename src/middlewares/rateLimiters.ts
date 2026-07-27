import rateLimit from 'express-rate-limit';

/**
 * Auth limiter — login/register brute-force protection.
 * 10 requests per 15-minute window.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    errorCode: 'RATE_LIMIT',
    message: 'Too many requests — please try again later',
  },
});

/**
 * Global API limiter — general traffic protection.
 * 100 requests per 1-minute window.
 */
export const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    errorCode: 'RATE_LIMIT',
    message: 'Too many requests — please try again later',
  },
});

/**
 * Payment limiter — tightest rate limit for payment endpoints.
 * 5 requests per 1-minute window.
 */
export const paymentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    errorCode: 'RATE_LIMIT',
    message: 'Too many payment requests — please try again later',
  },
});
