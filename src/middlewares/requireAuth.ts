import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import { verifyAccessToken } from '../utils/tokens.js';

/**
 * Verifies the access token from the Authorization header and attaches
 * the decoded payload to `req.user`.
 *
 * Usage: router.get('/protected', requireAuth, controller)
 */
export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    next(new AppError(401, 'AUTH_REQUIRED'));
    return;
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    next(new AppError(401, 'TOKEN_EXPIRED'));
  }
};
