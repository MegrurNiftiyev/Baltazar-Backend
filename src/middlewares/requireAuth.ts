import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import { verifyAccessToken } from '../utils/tokens.js';

// A language change via PUT /api/users/me takes effect on next token refresh (<=15 min).
export const requireAuth = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    next(new AppError(401, 'AUTH_REQUIRED'));
    return;
  }

  try {
    req.user = verifyAccessToken(token);
    req.lang = req.user.language;
  } catch {
    next(new AppError(401, 'TOKEN_EXPIRED'));
    return;
  }

  next();
};
