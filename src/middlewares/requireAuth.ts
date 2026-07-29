import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import { verifyAccessToken } from '../utils/tokens.js';
import { db } from '../config/firebase.js';
import { COLLECTIONS } from '../config/collections.js';
import type { SupportedLang } from '../config/locales.js';

/**
 * Verifies the access token from the Authorization header and attaches
 * the decoded payload to `req.user`.
 *
 * Usage: router.get('/protected', requireAuth, controller)
 */
export const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    next(new AppError(401, 'AUTH_REQUIRED'));
    return;
  }

  try {
    req.user = verifyAccessToken(token);
  } catch {
    next(new AppError(401, 'TOKEN_EXPIRED'));
    return;
  }

  const userDoc = await db.collection(COLLECTIONS.USERS).doc(req.user.userId).get();
  const language = userDoc.exists ? userDoc.data()?.language : undefined;
  if (language === 'az' || language === 'en' || language === 'ru') {
    req.lang = language as SupportedLang;
  }
  next();
};
