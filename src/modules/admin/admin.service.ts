import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';

const usersCollection = db.collection(COLLECTIONS.USERS);
const ordersCollection = db.collection(COLLECTIONS.ORDERS);
const transactionsCollection = db.collection(COLLECTIONS.TRANSACTIONS);
const reviewsCollection = db.collection(COLLECTIONS.REVIEWS);

export async function promoteToAdmin(userId: string) {
  const doc = await usersCollection.doc(userId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');

  const data = doc.data()!;
  if (data.role === 'ADMIN') throw new AppError(400, 'USER_ALREADY_ADMIN');

  await usersCollection.doc(userId).update({ role: 'ADMIN' });
  return { userId, role: 'ADMIN' };
}

export async function getAllOrders(filters: {
  status?: string;
  userId?: string;
  serviceType?: string;
}) {
  let query: FirebaseFirestore.Query = ordersCollection;

  if (filters.status) query = query.where('status', '==', filters.status);
  if (filters.userId) query = query.where('userId', '==', filters.userId);
  if (filters.serviceType) query = query.where('serviceType', '==', filters.serviceType);

  query = query.orderBy('createdAt', 'desc');

  const snapshot = await query.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getOrderById(orderId: string) {
  const doc = await ordersCollection.doc(orderId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  return { id: doc.id, ...doc.data() };
}

export async function updateOrderStatus(orderId: string, status: string) {
  const doc = await ordersCollection.doc(orderId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');

  const updates: Record<string, unknown> = { status };
  if (status === 'CONFIRMED' || status === 'CANCELLED' || status === 'EXPIRED') {
    updates.isCompleted = true;
  }

  await ordersCollection.doc(orderId).update(updates);
  return { id: orderId, status };
}

export async function getAllTransactions(filters: {
  status?: string;
  userId?: string;
}) {
  let query: FirebaseFirestore.Query = transactionsCollection;

  if (filters.status) query = query.where('status', '==', filters.status);

  query = query.orderBy('processedAt', 'desc');

  const snapshot = await query.get();
  const transactions = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  if (filters.userId) {
    const userOrders = await ordersCollection.where('userId', '==', filters.userId).get();
    const orderIds = new Set(userOrders.docs.map((doc) => doc.id));
    return transactions.filter((transaction: Record<string, unknown>) =>
      orderIds.has(transaction.orderId as string),
    );
  }

  return transactions;
}

export async function getAllReviews() {
  const snapshot = await reviewsCollection.orderBy('createdAt', 'desc').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function deleteReview(reviewId: string) {
  const doc = await reviewsCollection.doc(reviewId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await reviewsCollection.doc(reviewId).delete();
  return { id: reviewId, deleted: true };
}
