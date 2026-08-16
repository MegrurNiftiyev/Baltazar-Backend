import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';
import { getReviewEligibility } from '../reviews/reviews.service.js';
import type {
  CarsQuery,
  CreateCarInput,
  UpdateCarInput,
} from './rentacar.schema.js';
import { paginateQuery } from '../../shared/pagination.js';
import type { ExploreCardDTO } from '../../shared/dto/explore-card.dto.js';
import { getLocalizedPriceSuffix } from '../../shared/priceSuffix.js';
import type { SupportedLang } from '../../config/locales.js';

import { convertPriceFromUsd, getCurrencyForRegion } from '../../utils/currency.js';
import type { Region } from '../../shared/enums.js';

export function toCarExploreCard(doc: any, lang: SupportedLang = 'en', region?: Region): ExploreCardDTO {
  const ratingAvg =
    typeof doc.rating === 'number'
      ? doc.rating
      : typeof doc.rating?.average === 'number'
      ? doc.rating.average
      : 0;

  const countVal = doc.reviewCount ?? doc.rating?.count ?? 0;

  const carTitle =
    doc.title ||
    (doc.brand && doc.model
      ? `${doc.brand} ${doc.model}`.trim()
      : doc.name || doc.brand || doc.model || '');

  const rawPrice = typeof doc.price === 'number' ? doc.price : typeof doc.dailyPrice === 'number' ? doc.dailyPrice : 0;
  const { price, currency } = convertPriceFromUsd(rawPrice, region);

  return {
    id: doc.id,
    serviceType: 'RENT_A_CAR',
    serviceId: doc.id,
    title: carTitle,
    image: doc.images?.[0] || doc.image || '',
    price,
    priceSuffix: getLocalizedPriceSuffix('RENT_A_CAR', lang),
    currency,
    rating: ratingAvg,
    ratingCount: countVal,
    category: doc.category || undefined,
  };
}




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

export async function deleteCarsForCompany(companyId: string): Promise<{ deletedCount: number }> {
  const childSnapshot = await carsCollection.where('companyId', '==', companyId).get();
  await assertNoActiveOrdersForServiceIds(childSnapshot.docs.map((child) => child.id));
  await deleteSnapshotInBatches(childSnapshot);
  return { deletedCount: childSnapshot.size };
}

// ── Cars ───────────────────────────────────────────────────────────────

/**
 * List cars with filters.
 * Returns a list DTO: { id, brand, model, price, image, rating }
 * Full document is only returned by getCarById.
 */
export async function getCars(filters: CarsQuery, lang: SupportedLang = 'en', region?: Region) {
  let query: FirebaseFirestore.Query = carsCollection.where('status', '==', 'AVAILABLE');

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
  const result = await paginateQuery(
    carsCollection,
    query.orderBy('createdAt', 'desc'),
    filters,
    (doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        brand: data.brand,
        model: data.model,
        price: data.price,
        priceSuffix: getLocalizedPriceSuffix('RENT_A_CAR', lang),
        currency: data.currency || getCurrencyForRegion(region),
        image: data.images?.[0] || null,
        rating: data.rating || 0,
        category: data.category,
        transmission: data.transmission,
        fuelType: data.fuelType,
      };
    }
  );

  let filteredItems = result.items;
  if (filters.minPrice !== undefined) {
    filteredItems = filteredItems.filter((c) => c.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filteredItems = filteredItems.filter((c) => c.price <= filters.maxPrice!);
  }

  return { ...result, items: filteredItems };
}

/**
 * Get full car details by ID.
 */
export async function getCarById(id: string, userId?: string, region?: Region, lang: SupportedLang = 'en') {
  const doc = await carsCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  const { ratingSum, ...data } = doc.data()!;
  const reviewEligibility = await getReviewEligibility(userId, 'RENT_A_CAR', id);
  const rawPrice = typeof data.price === 'number' ? data.price : typeof data.dailyPrice === 'number' ? data.dailyPrice : 0;
  const { price, currency } = convertPriceFromUsd(rawPrice, region);
  const priceSuffix = getLocalizedPriceSuffix('RENT_A_CAR', lang);

  let companyName = data.companyName || '';
  let companyProfilePhoto = data.companyProfilePhoto || data.companyLogo || '';
  if (data.companyId && (!companyName || !companyProfilePhoto)) {
    const compDoc = await db.collection(COLLECTIONS.COMPANIES).doc(data.companyId).get();
    if (compDoc.exists) {
      const compData = compDoc.data()!;
      if (!companyName) companyName = compData.name || '';
      if (!companyProfilePhoto) companyProfilePhoto = compData.profileImage || compData.logo || '';
    }
  }

  return {
    id: doc.id,
    ...data,
    companyName,
    companyProfilePhoto,
    price,
    priceSuffix,
    currency,
    reviewEligibility,
  };
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
  // Note: reviewEligibility in this response reflects no particular user (userId defaults to undefined)
  // because this is an admin PUT response, not a customer-facing product page.
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
