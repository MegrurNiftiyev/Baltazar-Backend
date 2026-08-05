import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import type { AddToWishlistInput } from './wishlist.schema.js';
import { FieldValue } from 'firebase-admin/firestore';
import { COLLECTIONS } from '../../config/collections.js';

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

/**
 * Get the user's wishlist — reads User.wishlist[], then batch-fetches
 * the referenced service documents via Firestore getAll().
 */
export async function getWishlist(userId: string, query: { limit?: number, cursor?: string } = {}) {
  const userDoc = await usersCollection.doc(userId).get();
  if (!userDoc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }

  const userData = userDoc.data()!;
  const wishlist: Array<{ serviceId: string; serviceType: string }> = userData.wishlist || [];

  if (wishlist.length === 0) {
    return { items: [], hasMore: false, nextCursor: undefined };
  }

  // Reverse so newest additions appear first
  const reversed = wishlist.slice().reverse();
  const limit = query.limit ? Number(query.limit) : 20;
  const cursor = query.cursor ? parseInt(query.cursor) : 0;
  const pageWishlist = reversed.slice(cursor, cursor + limit);
  const hasMore = cursor + limit < reversed.length;

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
  const refMeta: Array<{ serviceType: string; serviceId: string }> = [];

  for (const [serviceType, ids] of grouped) {
    const collectionName = collectionMap[serviceType];
    if (!collectionName) continue;

    for (const id of ids) {
      refs.push(db.collection(collectionName).doc(id));
      refMeta.push({ serviceType, serviceId: id });
    }
  }

  if (refs.length === 0) return { items: [], hasMore: false, nextCursor: undefined };

  const docs = await db.getAll(...refs);

  const items = docs
    .map((doc, index) => {
      if (!doc.exists) return null;
      return {
        wishlistItemId: `${refMeta[index]!.serviceType}_${refMeta[index]!.serviceId}`,
        serviceType: refMeta[index]!.serviceType,
        serviceId: refMeta[index]!.serviceId,
        ...doc.data(),
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
 * Add a service to the user's wishlist.
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

  // Check for duplicate
  const userDoc = await usersCollection.doc(userId).get();
  if (!userDoc.exists) throw new AppError(404, 'NOT_FOUND');

  const existing: Array<{ serviceId: string; serviceType: string }> =
    userDoc.data()!.wishlist || [];

  const alreadyExists = existing.some(
    (w) => w.serviceId === input.serviceId && w.serviceType === input.serviceType,
  );

  if (alreadyExists) {
    throw new AppError(409, 'ALREADY_IN_WISHLIST');
  }

  await usersCollection.doc(userId).update({
    wishlist: FieldValue.arrayUnion({
      serviceId: input.serviceId,
      serviceType: input.serviceType,
    }),
  });

  return {
    serviceId: input.serviceId,
    serviceType: input.serviceType,
    added: true,
  };
}

/**
 * Remove a service from the user's wishlist.
 * The `itemId` format is `serviceType_serviceId`.
 */
export async function removeFromWishlist(userId: string, itemId: string) {
  const [serviceType, ...serviceIdParts] = itemId.split('_');
  const serviceId = serviceIdParts.join('_');

  if (!serviceType || !serviceId) {
    throw new AppError(400, 'INVALID_WISHLIST_ID');
  }

  await usersCollection.doc(userId).update({
    wishlist: FieldValue.arrayRemove({
      serviceId,
      serviceType,
    }),
  });

  return { itemId, removed: true };
}
