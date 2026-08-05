import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

/**
 * Factory function that returns a middleware checking `req.user.role`
 * against the required role.
 *
 * Usage: router.post('/admin/...', requireAuth, requireRole('ADMIN'), controller)
 */
export const requireRole = (role: 'ADMIN') => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (req.user?.role !== role) {
      next(new AppError(403, 'FORBIDDEN'));
      return;
    }
    next();
  };
};
