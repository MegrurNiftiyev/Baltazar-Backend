import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import type { CreateReviewInput, ReviewQuery, UpdateReviewInput } from './reviews.schema.js';
import { COLLECTIONS } from '../../config/collections.js';

const reviewsCollection = db.collection(COLLECTIONS.REVIEWS);
const flowBoxesCollection = db.collection(COLLECTIONS.FLOW_BOXES);

/**
 * Get reviews for a specific target (service/item).
 */
export async function getReviews(filters: ReviewQuery) {
  const snapshot = await reviewsCollection
    .where('targetType', '==', filters.targetType)
    .where('targetId', '==', filters.targetId)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/**
 * Create a review — only allowed if the user has a CONFIRMED FlowBox
 * for the target service (eligibility check).
 *
 * Rating/reviewCount increment on the target document is delegated
 * to a Cloud Function trigger (not implemented in this REST API).
 */
export async function createReview(userId: string, input: CreateReviewInput) {
  // Eligibility check — user must have a confirmed FlowBox for this service
  const eligibleSnapshot = await flowBoxesCollection
    .where('userId', '==', userId)
    .where('serviceId', '==', input.targetId)
    .where('status', '==', 'CONFIRMED')
    .limit(1)
    .get();

  if (eligibleSnapshot.empty) {
    throw new AppError(403, 'REVIEW_NOT_ELIGIBLE');
  }

  // Prevent duplicate reviews
  const existingReview = await reviewsCollection
    .where('userId', '==', userId)
    .where('targetId', '==', input.targetId)
    .limit(1)
    .get();

  if (!existingReview.empty) {
    throw new AppError(409, 'ALREADY_REVIEWED');
  }

  const docRef = await reviewsCollection.add({
    userId,
    targetType: input.targetType,
    targetId: input.targetId,
    rating: input.rating,
    comment: input.comment,
    createdAt: new Date().toISOString(),
  });

  return {
    id: docRef.id,
    userId,
    targetType: input.targetType,
    targetId: input.targetId,
    rating: input.rating,
    comment: input.comment,
  };
}

export async function getReviewById(id: string) {
  const doc = await reviewsCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  return { id: doc.id, ...doc.data() };
}

async function assertOwner(id: string, userId: string) {
  const review = await getReviewById(id) as { id: string; userId?: string };
  if (review.userId !== userId) throw new AppError(403, 'REVIEW_NOT_OWNER');
  return review;
}

export async function updateReview(id: string, userId: string, input: UpdateReviewInput) {
  await assertOwner(id, userId);
  await reviewsCollection.doc(id).update(input);
  return getReviewById(id);
}

export async function deleteOwnReview(id: string, userId: string) {
  await assertOwner(id, userId);
  await reviewsCollection.doc(id).delete();
  return { id, deleted: true };
}

/**
 * Delete a review — admin only.
 */
export async function deleteReview(reviewId: string) {
  const doc = await reviewsCollection.doc(reviewId).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  await reviewsCollection.doc(reviewId).delete();
  return { id: reviewId, deleted: true };
}
