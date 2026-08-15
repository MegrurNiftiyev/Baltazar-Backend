import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import type { AddToWishlistInput } from './wishlist.schema.js';
import { COLLECTIONS } from '../../config/collections.js';

const wishlistCollection = db.collection(COLLECTIONS.WISHLIST);
const usersCollection = db.collection(COLLECTIONS.USERS);

/**
 * Collection map: serviceType → Firestore collection name.
 */
const collectionMap: Record<string, string> = {
  RENT_A_CAR: 'cars',
  TRAVEL: 'travels',
  HOTEL: 'hotels',
  FOOD: 'foodItems',
};

import { getCurrencyForRegion } from '../../utils/currency.js';
import type { Region } from '../../shared/enums.js';

/**
 * Get the user's wishlist — queries dedicated `wishlist` collection by `userId`.
 */
export async function getWishlist(userId: string, query: { limit?: number; cursor?: string } = {}, region?: Region) {
  const userDoc = await usersCollection.doc(userId).get();
  if (!userDoc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }

  const snap = await wishlistCollection
    .where('userId', '==', userId)
    .get();

  if (snap.empty) {
    return { items: [], hasMore: false, nextCursor: undefined };
  }

  // Sort by createdAt desc
  const wishlistDocs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any));
  wishlistDocs.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

  const limit = query.limit ? Number(query.limit) : 20;
  const cursor = query.cursor ? parseInt(query.cursor, 10) : 0;
  const pageWishlist = wishlistDocs.slice(cursor, cursor + limit);
  const hasMore = cursor + limit < wishlistDocs.length;

  if (pageWishlist.length === 0) {
    return { items: [], hasMore: false, nextCursor: undefined };
  }

  // Group by serviceType for efficient batch fetching
  const grouped = new Map<string, string[]>();
  for (const item of pageWishlist) {
    const existing = grouped.get(item.serviceType) || [];
    existing.push(item.serviceId);
    grouped.set(item.serviceType, existing);
  }

  // Batch-fetch all referenced documents
  const refs: FirebaseFirestore.DocumentReference[] = [];
  const refMeta: Array<{ wishlistItemId: string; serviceType: string; serviceId: string }> = [];

  for (const [serviceType, ids] of grouped) {
    const collectionName = collectionMap[serviceType];
    if (!collectionName) continue;

    for (const id of ids) {
      refs.push(db.collection(collectionName).doc(id));
      refMeta.push({
        wishlistItemId: `${serviceType}_${id}`,
        serviceType,
        serviceId: id,
      });
    }
  }

  if (refs.length === 0) return { items: [], hasMore: false, nextCursor: undefined };

  const docs = await db.getAll(...refs);

  const items = docs
    .map((doc, index) => {
      if (!doc.exists) return null;
      const data = doc.data()!;
      return {
        wishlistItemId: refMeta[index]!.wishlistItemId,
        serviceType: refMeta[index]!.serviceType,
        serviceId: refMeta[index]!.serviceId,
        currency: data.currency || getCurrencyForRegion(region),
        ...data,
      };
    })
    .filter(Boolean);

  return {
    items,
    hasMore,
    nextCursor: hasMore ? String(cursor + limit) : undefined,
  };
}


/**
 * Add a service to the user's wishlist (dedicated `wishlist` collection).
 */
export async function addToWishlist(userId: string, input: AddToWishlistInput) {
  // Verify the service exists
  const collectionName = collectionMap[input.serviceType];
  if (!collectionName) {
    throw new AppError(400, 'VALIDATION_ERROR', `Unknown serviceType: ${input.serviceType}`);
  }

  const serviceDoc = await db.collection(collectionName).doc(input.serviceId).get();
  if (!serviceDoc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }

  const docId = `${userId}_${input.serviceType}_${input.serviceId}`;
  const existingDoc = await wishlistCollection.doc(docId).get();
  if (existingDoc.exists) {
    throw new AppError(409, 'ALREADY_IN_WISHLIST');
  }

  await wishlistCollection.doc(docId).set({
    userId,
    serviceId: input.serviceId,
    serviceType: input.serviceType,
    createdAt: new Date().toISOString(),
  });

  return {
    wishlistItemId: `${input.serviceType}_${input.serviceId}`,
    serviceId: input.serviceId,
    serviceType: input.serviceType,
    added: true,
  };
}

/**
 * Remove a service from the user's wishlist.
 * `itemId` can be `${serviceType}_${serviceId}` or exact docId `${userId}_${serviceType}_${serviceId}`.
 */
export async function removeFromWishlist(userId: string, itemId: string) {
  const fullDocId = `${userId}_${itemId}`;
  const directDoc = await wishlistCollection.doc(fullDocId).get();

  if (directDoc.exists) {
    await wishlistCollection.doc(fullDocId).delete();
    return { itemId, removed: true };
  }

  const exactDoc = await wishlistCollection.doc(itemId).get();
  if (exactDoc.exists && exactDoc.data()?.userId === userId) {
    await wishlistCollection.doc(itemId).delete();
    return { itemId, removed: true };
  }

  // Parse itemId if format is serviceType_serviceId
  const parts = itemId.split('_');
  if (parts.length >= 2) {
    const serviceType = parts[0];
    const serviceId = parts.slice(1).join('_');
    const constructedId = `${userId}_${serviceType}_${serviceId}`;
    const snap = await wishlistCollection.doc(constructedId).get();
    if (snap.exists) {
      await wishlistCollection.doc(constructedId).delete();
      return { itemId, removed: true };
    }
  }

  return { itemId, removed: true };
}
