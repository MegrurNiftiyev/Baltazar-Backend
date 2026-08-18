import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/tokens.js';
import { db } from '../config/firebase.js';
import { COLLECTIONS } from '../config/collections.js';

export const optionalAuth = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (token) {
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
      req.lang = payload.language;
    } catch {
      // Invalid optional auth is ignored.
    }
  }
  next();
};
