import type { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError, ZodType } from 'zod';
import { AppError } from '../errors/AppError.js';

interface ValidationSchemas {
  body?: ZodType;
  query?: AnyZodObject;
  params?: AnyZodObject;
}

/**
 * Zod validation middleware factory.
 *
 * Validates `req.body`, `req.query`, and/or `req.params` against the
 * provided Zod schemas. Replaces the raw values with the parsed
 * (and potentially transformed) output.
 *
 * A controller should never read `req.body` directly without it having
 * passed through Zod first.
 *
 * Usage:
 *   router.post('/foo', validate({ body: fooSchema }), controller)
 */
export const validate = (schemas: ValidationSchemas) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.query) {
        // req.query has no setter in Express 5 — store parsed output separately.
        (req as Request & { validatedQuery?: unknown }).validatedQuery =
          schemas.query.parse(req.query);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.errors
          .map((e) => `${e.path.join('.')}: ${e.message}`)
          .join('; ');
        next(new AppError(400, 'VALIDATION_ERROR', message));
        return;
      }
      next(err);
    }
  };
};
