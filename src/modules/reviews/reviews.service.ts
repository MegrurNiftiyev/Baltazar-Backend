import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import type { CreateReviewInput, ReviewQuery, UpdateReviewInput } from './reviews.schema.js';
import { COLLECTIONS } from '../../config/collections.js';


const reviewsCollection = db.collection(COLLECTIONS.REVIEWS);
const ordersCollection = db.collection(COLLECTIONS.ORDERS);

const TARGET_COLLECTION_MAP: Record<string, string> = {
  HOTEL: COLLECTIONS.HOTELS,
  RENT_A_CAR: COLLECTIONS.CARS,
  TRAVEL: COLLECTIONS.TRAVELS,
  FOOD: COLLECTIONS.FOOD_ITEMS,
  COMPANY: COLLECTIONS.COMPANIES,
};

function round2(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Atomically applies a rating change to the target resource.
 * ratingDelta: the new review's rating (create), the difference
 *   (newRating - oldRating) on update, or the negative of the removed
 *   review's rating (delete).
 * countDelta: +1 (create), 0 (update), -1 (delete).
 */
export async function applyRatingDelta(
  targetType: string,
  targetId: string,
  ratingDelta: number,
  countDelta: 1 | 0 | -1,
): Promise<void> {
  const collectionName = TARGET_COLLECTION_MAP[targetType];
  if (!collectionName) return;

  const docRef = db.collection(collectionName).doc(targetId);

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(docRef);
    if (!snap.exists) return;

    const data = snap.data()!;
    const currentSum = (data.ratingSum as number) ?? 0;
    const currentCount = (data.reviewCount as number) ?? 0;

    const newSum = Math.max(0, currentSum + ratingDelta);
    const newCount = Math.max(0, currentCount + countDelta);
    const newRating = newCount > 0 ? round2(newSum / newCount) : 5;

    tx.update(docRef, {
      ratingSum: newSum,
      reviewCount: newCount,
      rating: newRating,
    });
  });
}

export interface ReviewEligibility {
  eligible: boolean;
  alreadyReviewed: boolean;
  canSubmit: boolean;
}

export async function getReviewEligibility(
  userId: string | undefined,
  targetType: 'RENT_A_CAR' | 'TRAVEL' | 'HOTEL' | 'FOOD' | 'COMPANY',
  targetId: string,
): Promise<ReviewEligibility> {
  if (!userId) {
    return { eligible: false, alreadyReviewed: false, canSubmit: false };
  }

  const eligible = await canReview(userId, targetType, targetId);

  const existingReview = await reviewsCollection
    .where('userId', '==', userId)
    .where('targetId', '==', targetId)
    .limit(1)
    .get();
  const alreadyReviewed = !existingReview.empty;

  return { eligible, alreadyReviewed, canSubmit: eligible && !alreadyReviewed };
}

export async function getReviews(filters: ReviewQuery, role?: string) {
  let query: FirebaseFirestore.Query = reviewsCollection;

  if (role === 'ADMIN' && !filters.targetType && !filters.targetId) {
    // Admin fetching all reviews without filters
  } else if (filters.targetType && filters.targetId) {
    query = query.where('targetType', '==', filters.targetType).where('targetId', '==', filters.targetId);
  } else if (role !== 'ADMIN') {
    throw new AppError(400, 'VALIDATION_ERROR', 'targetType and targetId are required');
  }

  const snapshot = await query.get();
  let docs = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId || null,
      userName: data.userName || (data.user && typeof data.user === 'object' ? data.user.name : undefined) || 'Anonymous',
      avatarUrl: data.avatarUrl || (data.user && typeof data.user === 'object' ? data.user.avatarUrl : undefined) || null,
      targetType: data.targetType,
      targetId: data.targetId,
      rating: data.rating,
      comment: data.comment || '',
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  });

  // Sort by createdAt descending
  docs.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

  const limit = filters.limit ? Number(filters.limit) : 20;
  let startIndex = 0;
  if (filters.cursor) {
    const foundIdx = docs.findIndex((d) => d.id === filters.cursor);
    if (foundIdx !== -1) {
      startIndex = foundIdx + 1;
    }
  }

  const pageDocs = docs.slice(startIndex, startIndex + limit);
  const hasMore = startIndex + limit < docs.length;
  const nextCursor = hasMore && pageDocs.length > 0 ? pageDocs[pageDocs.length - 1]!.id : null;

  return {
    items: pageDocs,
    nextCursor,
    hasMore,
  };
}

async function canReview(userId: string, targetType: string, targetId: string): Promise<boolean> {
  if (targetType === 'COMPANY') {
    const snap = await ordersCollection
      .where('userId', '==', userId)
      .where('details.companyId', '==', targetId)
      .where('status', '==', 'CONFIRMED')
      .limit(1)
      .get();
    return !snap.empty;
  }

  const snap = await ordersCollection
    .where('userId', '==', userId)
    .where('serviceId', '==', targetId)
    .where('status', '==', 'CONFIRMED')
    .limit(1)
    .get();
  return !snap.empty;
}

export async function createReview(userId: string, input: CreateReviewInput) {
  const eligible = await canReview(userId, input.targetType, input.targetId);
  if (!eligible) throw new AppError(403, 'REVIEW_NOT_ELIGIBLE');

  const existingReview = await reviewsCollection
    .where('userId', '==', userId)
    .where('targetId', '==', input.targetId)
    .limit(1)
    .get();

  if (!existingReview.empty) throw new AppError(409, 'ALREADY_REVIEWED');

  const userDoc = await db.collection(COLLECTIONS.USERS).doc(userId).get();
  const userData = userDoc.exists ? userDoc.data() : undefined;
  const userName = userData?.name || 'Anonymous';
  const avatarUrl = userData?.avatarUrl || null;
  const createdAt = new Date().toISOString();

  const reviewPayload = {
    userId,
    userName,
    avatarUrl,
    targetType: input.targetType,
    targetId: input.targetId,
    rating: input.rating,
    comment: input.comment || '',
    createdAt,
  };

  const docRef = await reviewsCollection.add(reviewPayload);

  // Update rating aggregation
  await applyRatingDelta(input.targetType, input.targetId, input.rating, 1);

  return {
    id: docRef.id,
    ...reviewPayload,
  };
}

export async function getReviewById(id: string) {
  const doc = await reviewsCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  const data = doc.data()!;
  return {
    id: doc.id,
    userId: data.userId || null,
    userName: data.userName || (data.user && typeof data.user === 'object' ? data.user.name : undefined) || 'Anonymous',
    avatarUrl: data.avatarUrl || (data.user && typeof data.user === 'object' ? data.user.avatarUrl : undefined) || null,
    targetType: data.targetType,
    targetId: data.targetId,
    rating: data.rating,
    comment: data.comment || '',
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    ...data,
  };
}

async function assertOwner(id: string, userId: string, role?: string) {
  const review = (await getReviewById(id)) as { id: string; userId?: string };
  if (role !== 'ADMIN' && review.userId !== userId) throw new AppError(403, 'REVIEW_NOT_OWNER');
  return review;
}

export async function updateReview(id: string, userId: string, input: UpdateReviewInput) {
  const existing = (await assertOwner(id, userId)) as unknown as { rating?: number; targetType: string; targetId: string };
  const updatePayload: Record<string, unknown> = {
    ...input,
    updatedAt: new Date().toISOString(),
  };
  await reviewsCollection.doc(id).update(updatePayload);

  if (input.rating !== undefined && input.rating !== existing.rating) {
    const delta = input.rating - (existing.rating ?? 0);
    await applyRatingDelta(existing.targetType, existing.targetId, delta, 0);
  }

  return getReviewById(id);
}

export async function deleteReview(id: string, userId: string, role?: string) {
  const review = (await assertOwner(id, userId, role)) as unknown as { rating?: number; targetType: string; targetId: string };
  await reviewsCollection.doc(id).delete();

  await applyRatingDelta(review.targetType, review.targetId, -(review.rating ?? 0), -1);

  return { id, deleted: true };
}


