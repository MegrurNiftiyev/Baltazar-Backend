import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';
import { paginateQuery } from '../../shared/pagination.js';
import type { AdminTransactionQuery, ListUsersQuery } from './admin.schema.js';

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

export async function getAllTransactions(filters: AdminTransactionQuery) {
  let query: FirebaseFirestore.Query = transactionsCollection;

  if (filters.status) query = query.where('status', '==', filters.status);

  const result = await paginateQuery(
    transactionsCollection,
    query.orderBy('processedAt', 'desc'),
    filters,
    (doc) => ({ id: doc.id, ...doc.data() })
  );

  let filteredTransactions = result.items;

  if (filters.userId) {
    const userOrders = await ordersCollection.where('userId', '==', filters.userId).get();
    const orderIds = new Set(userOrders.docs.map((doc) => doc.id));
    filteredTransactions = filteredTransactions.filter((transaction: Record<string, unknown>) =>
      orderIds.has(transaction.orderId as string),
    );
  }

  return { ...result, items: filteredTransactions };
}

export async function getAllUsers(filters: ListUsersQuery) {
  let query: FirebaseFirestore.Query = usersCollection;

  if (filters.role) {
    query = query.where('role', '==', filters.role);
  }

  return paginateQuery(
    usersCollection,
    query.orderBy('createdAt', 'desc'),
    filters,
    (doc) => {
      const { passwordHash, ...safe } = doc.data(); // never expose password hash
      return { id: doc.id, ...safe };
    }
  );
}

export async function resetDatabase(adminId: string) {
  const collectionsToClear = Object.values(COLLECTIONS);
  
  for (const collectionName of collectionsToClear) {
    const colRef = db.collection(collectionName);
    const snapshot = await colRef.get();
    
    let batch = db.batch();
    let count = 0;
    
    for (const doc of snapshot.docs) {
      if (collectionName === COLLECTIONS.USERS && doc.id === adminId) {
        continue; // Skip the requesting admin user
      }
      
      batch.delete(doc.ref);
      count++;
      
      if (count >= 400) { // Max batch size is 500
        await batch.commit();
        batch = db.batch();
        count = 0;
      }
    }
    
    if (count > 0) {
      await batch.commit();
    }
  }
}

export async function reorderExploreSections(items: Array<{ serviceType: string; order: number }>) {
  const sectionsCol = db.collection(COLLECTIONS.HOME_SECTIONS);
  const snapshot = await sectionsCol.get();
  const batch = db.batch();

  for (const item of items) {
    const existingDoc = snapshot.docs.find((d) => d.data().serviceType === item.serviceType);
    if (existingDoc) {
      batch.update(existingDoc.ref, { order: item.order });
    } else {
      const newRef = sectionsCol.doc(`sec-${item.serviceType.toLowerCase()}`);
      batch.set(newRef, {
        id: `sec-${item.serviceType.toLowerCase()}`,
        key: item.serviceType,
        serviceType: item.serviceType,
        order: item.order,
        isActive: true,
      });
    }
  }

  await batch.commit();
  return { success: true, updatedCount: items.length };
}
