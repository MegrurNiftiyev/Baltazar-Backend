import type { Request, Response, NextFunction } from 'express';
import { MulterError } from 'multer';
import { AppError } from '../errors/AppError.js';
import { MAX_FILE_SIZE_BYTES } from './upload.js';
import { logger } from '../config/logger.js';
import { t, type SupportedLang } from '../config/locales.js';

/**
 * Centralized error handler — always the LAST middleware in the stack.
 *
 * Distinguishes between:
 * - Operational errors (AppError) → clean JSON response with errorCode
 * - Unexpected errors (bugs)      → logged with full stack trace, generic 500 to client
 *
 * Every error response follows the same shape:
 *   { success: false, errorCode: string, message: string }
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const lang = (req.lang || 'en') as SupportedLang;

  if (err instanceof AppError) {
    // Operational error — expected failure
    res.status(err.statusCode).json({
      success: false,
      errorCode: err.errorCode,
      message: t(err.errorCode, lang),
    });
    return;
  }

  if (err instanceof MulterError) {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? `File too large. Max size is ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB.`
        : err.message;
    res.status(400).json({ success: false, errorCode: 'INVALID_FILE', message });
    return;
  }

  // Unexpected error — programmer bug
  logger.error(err, 'Unexpected error');

  res.status(500).json({
    success: false,
    errorCode: 'INTERNAL_ERROR',
    message: t('INTERNAL_ERROR', lang),
  });
};
