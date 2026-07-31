import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';
import { getReviewEligibility } from '../reviews/reviews.service.js';
import type {
  FoodItemsQuery,
  CreateFoodCompanyInput,
  UpdateFoodCompanyInput,
  CreateFoodItemInput,
  UpdateFoodItemInput,
} from './food.schema.js';

const companiesCollection = db.collection(COLLECTIONS.COMPANIES);
const foodItemsCollection = db.collection(COLLECTIONS.FOOD_ITEMS);
const ordersCollection = db.collection(COLLECTIONS.ORDERS);
const activeStatuses = ['PENDING', 'AWAITING_PAYMENT', 'PROCESSING', 'CONFIRMED'];

async function assertNoActiveOrdersForServiceIds(serviceIds: string[]) {
  for (let i = 0; i < serviceIds.length; i += 30) {
    const chunk = serviceIds.slice(i, i + 30);
    if (chunk.length === 0) continue;
    const activeOrders = await ordersCollection
      .where('serviceId', 'in', chunk)
      .where('status', 'in', activeStatuses)
      .limit(1)
      .get();
    if (!activeOrders.empty) throw new AppError(409, 'HAS_ACTIVE_BOOKINGS');
  }
}

async function deleteSnapshotInBatches(snapshot: FirebaseFirestore.QuerySnapshot) {
  for (let i = 0; i < snapshot.docs.length; i += 450) {
    const batch = db.batch();
    snapshot.docs.slice(i, i + 450).forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  }
}

// ── Companies ──────────────────────────────────────────────────────────

export async function getCompanies() {
  const snapshot = await companiesCollection
    .where('serviceType', '==', 'FOOD')
    .where('status', '==', 'ACTIVE')
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getCompanyById(id: string, userId?: string) {
  const doc = await companiesCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  const { ratingSum, ...data } = doc.data()!;
  const reviewEligibility = await getReviewEligibility(userId, 'COMPANY', id);
  return { id: doc.id, ...data, reviewEligibility };
}

export async function createCompany(input: CreateFoodCompanyInput) {
  const docRef = await companiesCollection.add({
    ...input,
    serviceType: 'FOOD',
    rating: 5,
    reviewCount: 0,
    ratingSum: 0,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...input, rating: 5, reviewCount: 0 };
}

export async function updateCompany(id: string, input: UpdateFoodCompanyInput) {
  const doc = await companiesCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await companiesCollection.doc(id).update(input);
  return getCompanyById(id);
}

export async function deleteCompany(id: string) {
  const doc = await companiesCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  const childSnapshot = await foodItemsCollection.where('companyId', '==', id).get();
  await assertNoActiveOrdersForServiceIds(childSnapshot.docs.map((child) => child.id));
  await deleteSnapshotInBatches(childSnapshot);
  await companiesCollection.doc(id).delete();
  return { id, deleted: true, deletedFoodItems: childSnapshot.size };
}

// ── Food Items ─────────────────────────────────────────────────────────

export async function getFoodItems(filters: FoodItemsQuery) {
  let query: FirebaseFirestore.Query = foodItemsCollection.where('status', '==', 'AVAILABLE');

  if (filters.companyId) {
    query = query.where('companyId', '==', filters.companyId);
  }
  if (filters.category) {
    query = query.where('category', '==', filters.category);
  }

  const snapshot = await query.get();
  let results = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      companyId: data.companyId,
      name: data.name,
      category: data.category,
      price: data.price,
      image: data.images?.[0] || null,
    };
  });

  // Post-fetch filters
  if (filters.minPrice !== undefined) {
    results = results.filter((f) => f.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter((f) => f.price <= filters.maxPrice!);
  }
  if (filters.name) {
    const searchTerm = filters.name.toLowerCase();
    results = results.filter((f) => {
      const name = f.name as Record<string, string>;
      return (
        name?.az?.toLowerCase().includes(searchTerm) ||
        name?.en?.toLowerCase().includes(searchTerm) ||
        name?.ru?.toLowerCase().includes(searchTerm)
      );
    });
  }

  return results;
}

export async function getFoodItemById(id: string, userId?: string) {
  const doc = await foodItemsCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  const { ratingSum, ...data } = doc.data()!;
  const reviewEligibility = await getReviewEligibility(userId, 'FOOD', id);
  return { id: doc.id, ...data, reviewEligibility };
}

export async function createFoodItem(input: CreateFoodItemInput) {
  // Verify company exists
  const companyDoc = await companiesCollection.doc(input.companyId).get();
  if (!companyDoc.exists) throw new AppError(404, 'NOT_FOUND');

  const docRef = await foodItemsCollection.add({
    ...input,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...input };
}

export async function updateFoodItem(id: string, input: UpdateFoodItemInput) {
  const doc = await foodItemsCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await foodItemsCollection.doc(id).update(input);
  const updated = await foodItemsCollection.doc(id).get();
  return { id: updated.id, ...updated.data() };
}

export async function deleteFoodItem(id: string) {
  const doc = await foodItemsCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await assertNoActiveOrdersForServiceIds([id]);
  await foodItemsCollection.doc(id).delete();
  return { id, deleted: true };
}
