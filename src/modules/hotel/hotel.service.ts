import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';
import type {
  HotelQuery,
  RoomQuery,
  CreateHotelInput,
  UpdateHotelInput,
  CreateRoomInput,
  UpdateRoomInput,
} from './hotel.schema.js';

const hotelsCollection = db.collection(COLLECTIONS.HOTELS);
const roomsCollection = db.collection(COLLECTIONS.ROOMS);

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

  const snapshot = await query.get();
  let results = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      city: data.city,
      starRating: data.starRating,
      price: data.price,
      image: data.images?.[0] || null,
      rating: data.rating || 0,
      reviewCount: data.reviewCount || 0,
    };
  });

  // Post-fetch filters for price range and name search
  if (filters.minPrice !== undefined) {
    results = results.filter((h) => h.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter((h) => h.price <= filters.maxPrice!);
  }
  if (filters.name) {
    const searchTerm = filters.name.toLowerCase();
    results = results.filter((h) => {
      const name = h.name as Record<string, string>;
      return (
        name?.az?.toLowerCase().includes(searchTerm) ||
        name?.en?.toLowerCase().includes(searchTerm) ||
        name?.ru?.toLowerCase().includes(searchTerm)
      );
    });
  }

  return results;
}

export async function getHotelById(id: string) {
  const doc = await hotelsCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  return { id: doc.id, ...doc.data() };
}

export async function createHotel(input: CreateHotelInput) {
  const docRef = await hotelsCollection.add({
    ...input,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...input };
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
  await hotelsCollection.doc(id).delete();
  return { id, deleted: true };
}

// ── Rooms ──────────────────────────────────────────────────────────────

export async function getRooms(hotelId: string, filters: RoomQuery) {
  let query: FirebaseFirestore.Query = roomsCollection.where('hotelId', '==', hotelId);

  if (filters.roomType) {
    query = query.where('roomType', '==', filters.roomType);
  }

  const snapshot = await query.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createRoom(input: CreateRoomInput) {
  // Verify hotel exists
  const hotelDoc = await hotelsCollection.doc(input.hotelId).get();
  if (!hotelDoc.exists) throw new AppError(404, 'NOT_FOUND');

  const docRef = await roomsCollection.add({
    ...input,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...input };
}

export async function updateRoom(id: string, input: UpdateRoomInput) {
  const doc = await roomsCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await roomsCollection.doc(id).update(input);
  const updated = await roomsCollection.doc(id).get();
  return { id: updated.id, ...updated.data() };
}

export async function deleteRoom(id: string) {
  const doc = await roomsCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await roomsCollection.doc(id).delete();
  return { id, deleted: true };
}
