import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/tokens.js';

export const optionalAuth = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (token) {
    try {
      req.user = verifyAccessToken(token);
    } catch {
      // Invalid optional auth is ignored.
    }
  }
  next();
};
