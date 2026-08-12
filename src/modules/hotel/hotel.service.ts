import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';
import { getReviewEligibility } from '../reviews/reviews.service.js';
import type {
  HotelQuery,
  RoomQuery,
  CreateHotelInput,
  UpdateHotelInput,
  CreateRoomInput,
  UpdateRoomInput,
} from './hotel.schema.js';
import { paginateQuery } from '../../shared/pagination.js';
import type { ExploreCardDTO } from '../../shared/dto/explore-card.dto.js';
import { getLocalizedPriceSuffix } from '../../shared/priceSuffix.js';
import type { SupportedLang } from '../../config/locales.js';

const hotelsCollection = db.collection(COLLECTIONS.HOTELS);
const roomsCollection = db.collection(COLLECTIONS.ROOMS);
const ordersCollection = db.collection(COLLECTIONS.ORDERS);
const activeStatuses = ['PENDING', 'AWAITING_PAYMENT', 'PROCESSING', 'CONFIRMED'];

export async function calculateHotelPriceRange(hotelId: string): Promise<{ min: number; max: number }> {
  const roomsSnap = await roomsCollection.where('hotelId', '==', hotelId).get();
  if (roomsSnap.empty) {
    return { min: 0, max: 0 };
  }
  const prices = roomsSnap.docs
    .map((doc) => doc.data().price)
    .filter((p) => typeof p === 'number');
  if (prices.length === 0) {
    return { min: 0, max: 0 };
  }
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export function toHotelExploreCard(doc: any, lang: SupportedLang = 'en'): ExploreCardDTO {
  const ratingVal =
    typeof doc.rating === 'number'
      ? doc.rating
      : typeof doc.rating?.average === 'number'
      ? doc.rating.average
      : typeof doc.starRating === 'number'
      ? doc.starRating
      : 0;

  const countVal = doc.reviewCount ?? doc.rating?.count ?? 0;
  const minPrice =
    typeof doc.priceRange?.min === 'number'
      ? doc.priceRange.min
      : typeof doc.price === 'number'
      ? doc.price
      : 0;

  return {
    id: doc.id,
    serviceType: 'HOTEL',
    serviceId: doc.id,
    title: doc.title || doc.name || '',
    image: doc.images?.[0] || doc.image || '',
    price: minPrice,
    priceSuffix: getLocalizedPriceSuffix('HOTEL', lang),
    currency: doc.currency || 'AZN',
    rating: ratingVal,
    ratingCount: countVal,
    category: doc.city || undefined,
  };
}

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

// ── Hotels ─────────────────────────────────────────────────────────────

export async function getHotels(filters: HotelQuery) {
  let query: FirebaseFirestore.Query = hotelsCollection.where('status', '==', 'ACTIVE');

  if (filters.starRating !== undefined) {
    query = query.where('starRating', '==', filters.starRating);
  }
  if (filters.city) {
    query = query.where('city', '==', filters.city);
  }
  if (filters.minRating !== undefined) {
    query = query.where('rating', '>=', filters.minRating);
  }

  const result = await paginateQuery(
    hotelsCollection,
    query.orderBy('createdAt', 'desc'),
    filters,
    (doc) => {
      const data = doc.data();
      const images = data.images || (data.image ? [data.image] : []);
      return {
        id: doc.id,
        title: data.title || data.name,
        name: data.name || data.title,
        description: data.description,
        starRating: data.starRating,
        city: data.city,
        address: data.address,
        amenities: data.amenities || [],
        rating: data.rating ?? 0,
        reviewCount: data.reviewCount ?? 0,
        priceRange: data.priceRange || { min: data.price || 0, max: data.price || 0 },
        currency: data.currency || 'AZN',
        images,
        createdAt: data.createdAt,
      };
    },
  );

  let filteredItems = result.items;
  if (filters.minPrice !== undefined) {
    filteredItems = filteredItems.filter((h) => h.priceRange.min >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filteredItems = filteredItems.filter((h) => h.priceRange.min <= filters.maxPrice!);
  }
  const search = filters.title || filters.name;
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredItems = filteredItems.filter((h) => {
      const titleObj = (h.title || h.name) as Record<string, string>;
      return (
        titleObj?.az?.toLowerCase().includes(searchTerm) ||
        titleObj?.en?.toLowerCase().includes(searchTerm) ||
        titleObj?.ru?.toLowerCase().includes(searchTerm)
      );
    });
  }

  return { ...result, items: filteredItems };
}

export async function getHotelById(id: string, userId?: string) {
  const doc = await hotelsCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  const { ratingSum, ...data } = doc.data()!;

  let priceRange = data.priceRange;
  if (!priceRange) {
    priceRange = await calculateHotelPriceRange(id);
  }

  const reviewEligibility = await getReviewEligibility(userId, 'HOTEL', id);
  return { id: doc.id, ...data, priceRange, reviewEligibility };
}

export async function createHotel(input: CreateHotelInput) {
  const title = input.title || input.name;
  const name = input.name || input.title;
  const hotelData = {
    ...input,
    title,
    name,
    serviceType: 'HOTEL',
    rating: 5,
    reviewCount: 0,
    ratingSum: 0,
    priceRange: { min: 0, max: 0 },
    currency: 'AZN',
    createdAt: new Date().toISOString(),
  };
  const docRef = await hotelsCollection.add(hotelData);
  return { id: docRef.id, ...hotelData };
}

export async function updateHotel(id: string, input: UpdateHotelInput) {
  const doc = await hotelsCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await hotelsCollection.doc(id).update(input);
  return getHotelById(id);
}

export async function deleteHotel(id: string) {
  const doc = await hotelsCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  const childSnapshot = await roomsCollection.where('hotelId', '==', id).get();
  await assertNoActiveOrdersForServiceIds(childSnapshot.docs.map((child) => child.id));
  await deleteSnapshotInBatches(childSnapshot);
  await hotelsCollection.doc(id).delete();
  return { id, deleted: true, deletedRooms: childSnapshot.size };
}

// ── Rooms ──────────────────────────────────────────────────────────────

export async function getRooms(hotelId: string, filters: RoomQuery) {
  let query: FirebaseFirestore.Query = roomsCollection.where('hotelId', '==', hotelId);

  if (filters.roomType) {
    query = query.where('roomType', '==', filters.roomType);
  }

  const result = await paginateQuery(
    roomsCollection,
    query.orderBy('createdAt', 'desc'),
    filters,
    (doc) => ({ id: doc.id, ...doc.data() }),
  );

  return result;
}

export async function createRoom(input: CreateRoomInput) {
  const hotelDoc = await hotelsCollection.doc(input.hotelId).get();
  if (!hotelDoc.exists) throw new AppError(404, 'NOT_FOUND');

  const docRef = await roomsCollection.add({
    ...input,
    status: input.status || 'AVAILABLE',
    createdAt: new Date().toISOString(),
  });

  const updatedPriceRange = await calculateHotelPriceRange(input.hotelId);
  await hotelsCollection.doc(input.hotelId).update({ priceRange: updatedPriceRange });

  return { id: docRef.id, ...input, status: input.status || 'AVAILABLE' };
}

export async function updateRoom(id: string, input: UpdateRoomInput) {
  const doc = await roomsCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await roomsCollection.doc(id).update(input);

  const hotelId = doc.data()!.hotelId;
  const updatedPriceRange = await calculateHotelPriceRange(hotelId);
  await hotelsCollection.doc(hotelId).update({ priceRange: updatedPriceRange });

  const updated = await roomsCollection.doc(id).get();
  return { id: updated.id, ...updated.data() };
}

export async function deleteRoom(id: string) {
  const doc = await roomsCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  const hotelId = doc.data()!.hotelId;

  await assertNoActiveOrdersForServiceIds([id]);
  await roomsCollection.doc(id).delete();

  const updatedPriceRange = await calculateHotelPriceRange(hotelId);
  await hotelsCollection.doc(hotelId).update({ priceRange: updatedPriceRange });

  return { id, deleted: true };
}