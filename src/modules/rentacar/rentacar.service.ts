import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';
import { getReviewEligibility } from '../reviews/reviews.service.js';
import type {
  CarsQuery,
  CreateCompanyInput,
  UpdateCompanyInput,
  CreateCarInput,
  UpdateCarInput,
} from './rentacar.schema.js';

const companiesCollection = db.collection(COLLECTIONS.COMPANIES);
const carsCollection = db.collection(COLLECTIONS.CARS);
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
    .where('serviceType', '==', 'RENT_A_CAR')
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

export async function createCompany(input: CreateCompanyInput) {
  const docRef = await companiesCollection.add({
    ...input,
    serviceType: 'RENT_A_CAR',
    rating: 5,
    reviewCount: 0,
    ratingSum: 0,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...input, rating: 5, reviewCount: 0 };
}

export async function updateCompany(id: string, input: UpdateCompanyInput) {
  const doc = await companiesCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  await companiesCollection.doc(id).update(input);
  return getCompanyById(id);
}

export async function deleteCompany(id: string) {
  const doc = await companiesCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  const childSnapshot = await carsCollection.where('companyId', '==', id).get();
  await assertNoActiveOrdersForServiceIds(childSnapshot.docs.map((child) => child.id));
  await deleteSnapshotInBatches(childSnapshot);
  await companiesCollection.doc(id).delete();
  return { id, deleted: true, deletedCars: childSnapshot.size };
}

// ── Cars ───────────────────────────────────────────────────────────────

/**
 * List cars with filters.
 * Returns a list DTO: { id, brand, model, price, image, rating }
 * Full document is only returned by getCarById.
 */
export async function getCars(filters: CarsQuery) {
  let query: FirebaseFirestore.Query = carsCollection;

  // Equality filters (can be combined freely in Firestore)
  if (filters.companyId) {
    query = query.where('companyId', '==', filters.companyId);
  }
  if (filters.brand) {
    query = query.where('brand', '==', filters.brand);
  }
  if (filters.model) {
    query = query.where('model', '==', filters.model);
  }
  if (filters.category) {
    query = query.where('category', '==', filters.category);
  }
  if (filters.transmission) {
    query = query.where('transmission', '==', filters.transmission);
  }
  if (filters.fuelType) {
    query = query.where('fuelType', '==', filters.fuelType);
  }

  // Range filters — only one inequality filter field per Firestore query
  if (filters.minPrice !== undefined) {
    query = query.where('price', '>=', filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    query = query.where('price', '<=', filters.maxPrice);
  }

  const snapshot = await query.get();

  // Map to list DTO — only essential fields for listing
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      brand: data.brand,
      model: data.model,
      price: data.price,
      image: data.images?.[0] || null,
      rating: data.rating || 0,
      category: data.category,
      transmission: data.transmission,
      fuelType: data.fuelType,
    };
  });
}

/**
 * Get full car details by ID.
 */
export async function getCarById(id: string, userId?: string) {
  const doc = await carsCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  const { ratingSum, ...data } = doc.data()!;
  const reviewEligibility = await getReviewEligibility(userId, 'RENT_A_CAR', id);
  return { id: doc.id, ...data, reviewEligibility };
}

export async function createCar(input: CreateCarInput) {
  const docRef = await carsCollection.add({
    ...input,
    rating: 5,
    reviewCount: 0,
    ratingSum: 0,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...input, rating: 5, reviewCount: 0 };
}

export async function updateCar(id: string, input: UpdateCarInput) {
  const doc = await carsCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  await carsCollection.doc(id).update(input);
  return getCarById(id);
}

export async function deleteCar(id: string) {
  const doc = await carsCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  await assertNoActiveOrdersForServiceIds([id]);
  await carsCollection.doc(id).delete();
  return { id, deleted: true };
}
