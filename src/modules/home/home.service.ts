import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../config/firebase.js';
import { COLLECTIONS } from '../../config/collections.js';
import { AppError } from '../../errors/AppError.js';
import type { CreateBannerInput, UpdateBannerInput } from './home.schema.js';

const titleMap = {
  RENT_A_CAR: { az: 'Avtomobil icaresi', en: 'Car Rental', ru: 'Arenda avto' },
  HOTEL: { az: 'Hoteller', en: 'Hotels', ru: 'Oteli' },
  TRAVEL: { az: 'Seyahet', en: 'Travel', ru: 'Puteshestviya' },
  FOOD: { az: 'Yemek', en: 'Food', ru: 'Eda' },
};

export async function getBanners() {
  const snapshot = await db.collection(COLLECTIONS.BANNERS)
    .where('isActive', '==', true)
    .orderBy('order', 'asc')
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createBanner(data: CreateBannerInput) {
  const docRef = await db.collection(COLLECTIONS.BANNERS).add(data);
  return { id: docRef.id, ...data };
}

export async function updateBanner(id: string, data: UpdateBannerInput) {
  const doc = await db.collection(COLLECTIONS.BANNERS).doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');

  // Remove undefined values
  const updates = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));

  await db.collection(COLLECTIONS.BANNERS).doc(id).update(updates);
  return { id, ...doc.data(), ...updates };
}

export async function deleteBanner(id: string) {
  const doc = await db.collection(COLLECTIONS.BANNERS).doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await db.collection(COLLECTIONS.BANNERS).doc(id).delete();
  return { id, deleted: true };
}

async function getItemsForServiceType(serviceType: string) {
  const collectionMap: Record<string, string> = {
    RENT_A_CAR: COLLECTIONS.CARS,
    HOTEL: COLLECTIONS.HOTELS,
    TRAVEL: COLLECTIONS.TRAVELS,
    FOOD: COLLECTIONS.FOOD_ITEMS,
  };
  const snapshot = await db.collection(collectionMap[serviceType]!).limit(6).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function buildExploreRows(orderedServiceTypes: string[]) {
  const rows = await Promise.all(
    orderedServiceTypes.map(async (serviceType) => ({
      serviceType,
      title: titleMap[serviceType as keyof typeof titleMap],
      items: await getItemsForServiceType(serviceType),
    })),
  );
  return rows;
}

export async function getExplore(userId?: string) {
  if (userId) {
    const interestsDoc = await db.collection(COLLECTIONS.USER_INTERESTS).doc(userId).get();
    if (interestsDoc.exists) {
      const counts = interestsDoc.data()!.serviceTypeCounts as Record<string, number>;
      const ranked = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([serviceType]) => serviceType);
      return buildExploreRows(ranked);
    }
  }
  return buildExploreRows(['RENT_A_CAR', 'HOTEL', 'TRAVEL', 'FOOD']);
}

export async function incrementUserInterest(
  userId: string,
  serviceType: 'RENT_A_CAR' | 'HOTEL' | 'TRAVEL' | 'FOOD',
) {
  const ref = db.collection(COLLECTIONS.USER_INTERESTS).doc(userId);
  await ref.set(
    {
      userId,
      serviceTypeCounts: { [serviceType]: FieldValue.increment(1) },
      updatedAt: new Date().toISOString(),
    },
    { merge: true },
  );
}
