import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';
import type {
  ToursQuery,
  CreateTravelCompanyInput,
  UpdateTravelCompanyInput,
  CreateTourInput,
  UpdateTourInput,
  CreateIncludedServiceInput,
} from './travel.schema.js';

const companiesCollection = db.collection(COLLECTIONS.COMPANIES);
const toursCollection = db.collection(COLLECTIONS.TRAVELS);
const includedServicesCollection = db.collection(COLLECTIONS.INCLUDED_SERVICES);

// ── Companies ──────────────────────────────────────────────────────────

export async function getCompanies() {
  const snapshot = await companiesCollection
    .where('serviceType', '==', 'TRAVEL')
    .where('status', '==', 'ACTIVE')
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getCompanyById(id: string) {
  const doc = await companiesCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  return { id: doc.id, ...doc.data() };
}

export async function createCompany(input: CreateTravelCompanyInput) {
  const docRef = await companiesCollection.add({
    ...input,
    serviceType: 'TRAVEL',
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...input };
}

export async function updateCompany(id: string, input: UpdateTravelCompanyInput) {
  const doc = await companiesCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await companiesCollection.doc(id).update(input);
  return getCompanyById(id);
}

export async function deleteCompany(id: string) {
  const doc = await companiesCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await companiesCollection.doc(id).delete();
  return { id, deleted: true };
}

// ── Tours ──────────────────────────────────────────────────────────────

export async function getTours(filters: ToursQuery) {
  let query: FirebaseFirestore.Query = toursCollection;

  if (filters.companyId) {
    query = query.where('companyId', '==', filters.companyId);
  }

  // array-contains — only one per query
  if (filters.category) {
    query = query.where('categories', 'array-contains', filters.category);
  }

  if (filters.minRating !== undefined) {
    query = query.where('rating', '>=', filters.minRating);
  }

  const snapshot = await query.get();
  let results = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      companyId: data.companyId,
      title: data.title,
      categories: data.categories,
      price: data.price,
      image: data.images?.[0] || null,
      rating: data.rating || 0,
      reviewCount: data.reviewCount || 0,
      duration: data.duration,
      startDate: data.startDate,
      endDate: data.endDate,
      status: data.status,
    };
  });

  // Post-fetch filters (for fields that can't all be in a single Firestore query)
  if (filters.startDate) {
    results = results.filter((t) => t.startDate >= filters.startDate!);
  }
  if (filters.endDate) {
    results = results.filter((t) => t.endDate <= filters.endDate!);
  }
  if (filters.name) {
    const searchTerm = filters.name.toLowerCase();
    results = results.filter((t) => {
      const title = t.title as Record<string, string>;
      return (
        title?.az?.toLowerCase().includes(searchTerm) ||
        title?.en?.toLowerCase().includes(searchTerm) ||
        title?.ru?.toLowerCase().includes(searchTerm)
      );
    });
  }

  return results;
}

export async function getTourById(id: string) {
  const doc = await toursCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  return { id: doc.id, ...doc.data() };
}

export async function createTour(input: CreateTourInput) {
  const docRef = await toursCollection.add({
    ...input,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...input };
}

export async function updateTour(id: string, input: UpdateTourInput) {
  const doc = await toursCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await toursCollection.doc(id).update(input);
  return getTourById(id);
}

export async function deleteTour(id: string) {
  const doc = await toursCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await toursCollection.doc(id).delete();
  return { id, deleted: true };
}

// ── Included Services ──────────────────────────────────────────────────

export async function getIncludedServices(serviceType: string) {
  const snapshot = await includedServicesCollection
    .where('serviceType', '==', serviceType)
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createIncludedService(input: CreateIncludedServiceInput) {
  const docRef = await includedServicesCollection.add({
    ...input,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...input };
}
