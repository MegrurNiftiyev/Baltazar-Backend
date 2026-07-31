import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

/**
 * For multipart/form-data admin requests: the client sends every non-file field
 * as a single JSON-stringified blob in a form field named `data`. This middleware
 * replaces req.body with the parsed contents of that field, so everything downstream
 * (image-resolution middleware, Zod validation, controllers) sees correctly-typed
 * JS values exactly as if this had been a normal application/json request.
 *
 * Must run AFTER multer (`upload.fields(...)` / `upload.single(...)`) and BEFORE
 * `resolveImageFields(...)` and `validate(...)`.
 *
 * If the request was NOT multipart (no `data` field present — e.g. a plain JSON
 * request, which some read/query endpoints or future non-file admin endpoints might
 * still use), this middleware is a no-op and leaves req.body untouched.
 */
export function parseJsonPayload(req: Request, _res: Response, next: NextFunction): void {
  if (typeof req.body?.data === 'string') {
    try {
      req.body = JSON.parse(req.body.data);
    } catch {
      next(new AppError(400, 'VALIDATION_ERROR', 'Invalid JSON in `data` field'));
      return;
    }
  }
  next();
}