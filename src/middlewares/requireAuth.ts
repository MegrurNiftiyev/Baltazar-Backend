import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import { verifyAccessToken } from '../utils/tokens.js';
import { db } from '../config/firebase.js';
import { COLLECTIONS } from '../config/collections.js';

// A language change via PUT /api/users/me takes effect on next token refresh (<=15 min).
export const requireAuth = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    next(new AppError(401, 'AUTH_REQUIRED'));
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    let wishlist: Array<{ serviceId: string; serviceType: string }> = [];
    try {
      const userDoc = await db.collection(COLLECTIONS.USERS).doc(payload.userId).get();
      if (userDoc.exists && Array.isArray(userDoc.data()?.wishlist)) {
        wishlist = userDoc.data()?.wishlist;
      } else {
        const snap = await db.collection(COLLECTIONS.WISHLIST).where('userId', '==', payload.userId).get();
        wishlist = snap.docs.map((doc) => ({
          serviceId: doc.data().serviceId,
          serviceType: doc.data().serviceType,
        }));
      }
    } catch {
      wishlist = [];
    }

    req.user = {
      ...payload,
      wishlist,
    };
    req.lang = req.user.language;
  } catch {
    next(new AppError(401, 'TOKEN_EXPIRED'));
    return;
  }

  next();
};
