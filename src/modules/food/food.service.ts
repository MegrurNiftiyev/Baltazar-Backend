import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';
import { getReviewEligibility } from '../reviews/reviews.service.js';
import type {
  FoodItemsQuery,
  CreateFoodItemInput,
  UpdateFoodItemInput,
} from './food.schema.js';
import { paginateQuery } from '../../shared/pagination.js';
import type { ExploreCardDTO } from '../../shared/dto/explore-card.dto.js';
import { getLocalizedPriceSuffix } from '../../shared/priceSuffix.js';
import type { SupportedLang } from '../../config/locales.js';

import { convertPriceFromUsd, getCurrencyForRegion } from '../../utils/currency.js';
import type { Region } from '../../shared/enums.js';

export function toFoodExploreCard(doc: any, lang: SupportedLang = 'en', region?: Region): ExploreCardDTO {
  const ratingAvg =
    typeof doc.rating === 'number'
      ? doc.rating
      : typeof doc.rating?.average === 'number'
      ? doc.rating.average
      : 0;

  const countVal = doc.reviewCount ?? doc.rating?.count ?? 0;

  const rawPrice = typeof doc.price === 'number' ? doc.price : 0;
  const { price, currency } = convertPriceFromUsd(rawPrice, region);

  return {
    id: doc.id,
    serviceType: 'FOOD',
    serviceId: doc.id,
    title: doc.name || '',
    image: doc.images?.[0] || doc.image || '',
    price,
    priceSuffix: getLocalizedPriceSuffix('FOOD', lang),
    currency,
    rating: ratingAvg,
    ratingCount: countVal,
    category: doc.category || undefined,
  };
}



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

export async function deleteFoodItemsForCompany(companyId: string): Promise<{ deletedCount: number }> {
  const childSnapshot = await foodItemsCollection.where('companyId', '==', companyId).get();
  await assertNoActiveOrdersForServiceIds(childSnapshot.docs.map((child) => child.id));
  await deleteSnapshotInBatches(childSnapshot);
  return { deletedCount: childSnapshot.size };
}

// ── Food Items ─────────────────────────────────────────────────────────

export async function getFoodItems(filters: FoodItemsQuery, lang: SupportedLang = 'en', region?: Region) {
  let query: FirebaseFirestore.Query = foodItemsCollection.where('status', '==', 'AVAILABLE');

  if (filters.companyId) {
    query = query.where('companyId', '==', filters.companyId);
  }
  if (filters.category) {
    query = query.where('category', '==', filters.category);
  }

  const result = await paginateQuery(
    foodItemsCollection,
    query.orderBy('createdAt', 'desc'),
    filters,
    (doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        companyId: data.companyId,
        title: data.title || data.name,
        name: data.name || data.title,
        category: data.category,
        price: data.price,
        priceSuffix: getLocalizedPriceSuffix('FOOD', lang),
        currency: data.currency || getCurrencyForRegion(region),
        image: data.images?.[0] || null,
      };
    }
  );

  // Post-fetch filters
  let filteredItems = result.items;
  if (filters.minPrice !== undefined) {
    filteredItems = filteredItems.filter((f) => f.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filteredItems = filteredItems.filter((f) => f.price <= filters.maxPrice!);
  }
  if (filters.name) {
    const searchTerm = filters.name.toLowerCase();
    filteredItems = filteredItems.filter((f) => {
      const name = f.name as Record<string, string>;
      return (
        name?.az?.toLowerCase().includes(searchTerm) ||
        name?.en?.toLowerCase().includes(searchTerm) ||
        name?.ru?.toLowerCase().includes(searchTerm)
      );
    });
  }

  return { ...result, items: filteredItems };
}

export async function getFoodItemById(id: string, userId?: string, region?: Region, lang: SupportedLang = 'en') {
  const doc = await foodItemsCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  const { ratingSum, ...data } = doc.data()!;
  const reviewEligibility = await getReviewEligibility(userId, 'FOOD', id);
  const rawPrice = typeof data.price === 'number' ? data.price : 0;
  const { price, currency } = convertPriceFromUsd(rawPrice, region);
  const priceSuffix = getLocalizedPriceSuffix('FOOD', lang);
  return { id: doc.id, ...data, price, priceSuffix, currency, reviewEligibility };
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
  // Note: reviewEligibility in this response reflects no particular user (userId defaults to undefined)
  // because this is an admin PUT response, not a customer-facing product page.
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
