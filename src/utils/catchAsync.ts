import type { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Wraps an async route handler / controller to ensure any thrown error
 * is forwarded to Express's `next()` rather than silently swallowed.
 *
 * Usage:
 *   router.get('/foo', catchAsync(async (req, res) => { ... }));
 */
export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
