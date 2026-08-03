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

export async function getAllUsers(params: {
  limit: number;
  startAfterId?: string;
  role?: 'USER' | 'ADMIN';
}) {
  let query: FirebaseFirestore.Query = usersCollection.orderBy('createdAt', 'desc');

  if (params.role) {
    query = query.where('role', '==', params.role).orderBy('createdAt', 'desc');
  }

  if (params.startAfterId) {
    const cursorDoc = await usersCollection.doc(params.startAfterId).get();
    if (cursorDoc.exists) query = query.startAfter(cursorDoc);
  }

  const snapshot = await query.limit(params.limit).get();
  const users = snapshot.docs.map((doc) => {
    const { passwordHash, ...safe } = doc.data(); // never expose password hash
    return { id: doc.id, ...safe };
  });

  const nextCursor = users.length === params.limit ? users[users.length - 1]!.id : null;
  return { users, nextCursor };
}
