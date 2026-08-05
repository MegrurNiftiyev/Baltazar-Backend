import { httpLogger } from '../config/logger.js';

/**
 * Re-export the pino-http logger middleware.
 *
 * This is the single source of request logging — it inherits the
 * redaction config from the parent pino instance, ensuring that
 * authorization headers, passwords, and card data are never logged.
 */
export const requestLogger = httpLogger;
