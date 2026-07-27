import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';

const usersCollection = db.collection(COLLECTIONS.USERS);
const flowboxesCollection = db.collection(COLLECTIONS.FLOW_BOXES);
const transactionsCollection = db.collection(COLLECTIONS.TRANSACTIONS);
const reviewsCollection = db.collection(COLLECTIONS.REVIEWS);

/**
 * Promote a user to ADMIN role.
 * Only callable by an existing admin.
 */
export async function promoteToAdmin(userId: string) {
  const doc = await usersCollection.doc(userId).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }

  const data = doc.data()!;
  if (data.role === 'ADMIN') {
    throw new AppError(400, 'USER_ALREADY_ADMIN');
  }

  await usersCollection.doc(userId).update({ role: 'ADMIN' });

  return { userId, role: 'ADMIN' };
}

/**
 * Get all flowboxes with optional filters (admin view).
 */
export async function getAllFlowboxes(filters: {
  status?: string;
  userId?: string;
  serviceType?: string;
}) {
  let query: FirebaseFirestore.Query = flowboxesCollection;

  if (filters.status) {
    query = query.where('status', '==', filters.status);
  }
  if (filters.userId) {
    query = query.where('userId', '==', filters.userId);
  }
  if (filters.serviceType) {
    query = query.where('serviceType', '==', filters.serviceType);
  }

  query = query.orderBy('createdAt', 'desc');

  const snapshot = await query.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/**
 * Get a single flowbox by ID (admin view — no user ownership check).
 */
export async function getFlowboxById(flowboxId: string) {
  const doc = await flowboxesCollection.doc(flowboxId).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  return { id: doc.id, ...doc.data() };
}

/**
 * Update flowbox status (admin action).
 */
export async function updateFlowboxStatus(flowboxId: string, status: string) {
  const doc = await flowboxesCollection.doc(flowboxId).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }

  const updates: Record<string, unknown> = { status };
  if (status === 'CONFIRMED' || status === 'CANCELLED' || status === 'EXPIRED') {
    updates.isCompleted = true;
  }

  await flowboxesCollection.doc(flowboxId).update(updates);
  return { id: flowboxId, status };
}

/**
 * Get all transactions with optional filters (admin view).
 */
export async function getAllTransactions(filters: {
  status?: string;
  userId?: string;
}) {
  let query: FirebaseFirestore.Query = transactionsCollection;

  if (filters.status) {
    query = query.where('status', '==', filters.status);
  }

  query = query.orderBy('processedAt', 'desc');

  const snapshot = await query.get();
  const transactions = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // Post-filter by userId if provided (userId is on the FlowBox, not the Transaction)
  if (filters.userId) {
    const userFlowboxes = await flowboxesCollection
      .where('userId', '==', filters.userId)
      .get();
    const flowboxIds = new Set(userFlowboxes.docs.map((d) => d.id));
    return transactions.filter((t: Record<string, unknown>) =>
      flowboxIds.has(t.flowBoxId as string),
    );
  }

  return transactions;
}

/**
 * Get all reviews (admin view).
 */
export async function getAllReviews() {
  const snapshot = await reviewsCollection.orderBy('createdAt', 'desc').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/**
 * Delete a review (admin moderation).
 */
export async function deleteReview(reviewId: string) {
  const doc = await reviewsCollection.doc(reviewId).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  await reviewsCollection.doc(reviewId).delete();
  return { id: reviewId, deleted: true };
}
