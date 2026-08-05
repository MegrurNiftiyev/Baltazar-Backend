/**
 * Typed operational error class.
 *
 * All expected failures (AUTH_REQUIRED, FORBIDDEN, VALIDATION_ERROR, etc.)
 * are instances of AppError. The centralized errorHandler distinguishes
 * operational errors from unexpected programmer errors by checking `isOperational`.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly isOperational: boolean;

  constructor(statusCode: number, errorCode: string, message?: string) {
    super(message || errorCode);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;

    // Capture proper stack trace (excludes constructor call from trace)
    Error.captureStackTrace(this, this.constructor);
  }
}
