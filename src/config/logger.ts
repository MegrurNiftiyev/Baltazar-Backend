import pino from 'pino';
import { pinoHttp } from 'pino-http';

import { env } from './env.js';

/**
 * Structured JSON logger — redacts sensitive fields at the logger level
 * so a developer can't forget to mask something in a one-off log call.
 */
export const logger = pino({
  level: env.LOG_LEVEL,
  redact: {
    paths: [
      'req.headers.authorization',
      'req.body.password',
      'req.body.cvv',
      'req.body.cardNumber',
      'req.body.currentPassword',
      'req.body.newPassword',
    ],
    censor: '[REDACTED]',
  },
  transport:
    process.env.NODE_ENV !== 'production'
      ? { target: 'pino/file', options: { destination: 1 } } // stdout
      : undefined,
});

/**
 * HTTP request logger middleware — inherits redaction config from parent logger.
 */
export const httpLogger = pinoHttp({
  logger,
  customLogLevel: (_req, res, err) => {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} ${res.statusCode}`;
  },
  customErrorMessage: (req, _res, err) => {
    return `${req.method} ${req.url} failed: ${err.message}`;
  },
  // Don't log health checks
  autoLogging: {
    ignore: (req) => req.url === '/health',
  },
});
