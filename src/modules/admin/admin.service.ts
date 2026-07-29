import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';

const usersCollection = db.collection(COLLECTIONS.USERS);
const ordersCollection = db.collection(COLLECTIONS.ORDERS);
const transactionsCollection = db.collection(COLLECTIONS.TRANSACTIONS);

export async function promoteToAdmin(userId: string) {
  const doc = await usersCollection.doc(userId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');

  const data = doc.data()!;
  if (data.role === 'ADMIN') throw new AppError(400, 'USER_ALREADY_ADMIN');

  await usersCollection.doc(userId).update({ role: 'ADMIN' });
  return { userId, role: 'ADMIN' };
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

