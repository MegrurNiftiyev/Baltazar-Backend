import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../config/firebase.js';
import { COLLECTIONS } from '../../config/collections.js';
import { AppError } from '../../errors/AppError.js';
import type { CreateBannerInput, UpdateBannerInput } from './home.schema.js';
import { toHotelExploreCard } from '../hotel/hotel.service.js';
import { toCarExploreCard } from '../rentacar/rentacar.service.js';
import { toFoodExploreCard } from '../food/food.service.js';
import { toTourExploreCard } from '../travel/travel.service.js';
import type { ExploreSectionDTO } from '../../shared/dto/explore-card.dto.js';
import type { SupportedLang } from '../../config/locales.js';

const titleMap = {
  RENT_A_CAR: { az: 'Avtomobil icaresi', en: 'Car Rental', ru: 'Arenda avto' },
  HOTEL: { az: 'Hoteller', en: 'Hotels', ru: 'Oteli' },
  TRAVEL: { az: 'Seyahet', en: 'Travel', ru: 'Puteshestviya' },
  FOOD: { az: 'Yemek', en: 'Food', ru: 'Eda' },
};

export async function getBanners() {
  const snapshot = await db.collection(COLLECTIONS.BANNERS).get();
  const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return docs
    .filter((d: any) => d.isActive !== false)
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
}

export async function createBanner(data: CreateBannerInput) {
  const bannerData = {
    ...data,
    createdAt: new Date().toISOString(),
  };
  const docRef = await db.collection(COLLECTIONS.BANNERS).add(bannerData);
  return { id: docRef.id, ...bannerData };
}

export async function clearBanners() {
  const snapshot = await db.collection(COLLECTIONS.BANNERS).get();
  const batch = db.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
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

const getOrderValue = (item: any) => (typeof item.order === 'number' ? item.order : 0);

async function getItemsForServiceType(serviceType: string, lang: SupportedLang = 'en') {
  const collectionMap: Record<string, string> = {
    RENT_A_CAR: COLLECTIONS.CARS,
    HOTEL: COLLECTIONS.HOTELS,
    TRAVEL: COLLECTIONS.TRAVELS,
    FOOD: COLLECTIONS.FOOD_ITEMS,
  };
  const mapperMap: Record<string, (doc: any, lang?: SupportedLang) => any> = {
    RENT_A_CAR: toCarExploreCard,
    HOTEL: toHotelExploreCard,
    TRAVEL: toTourExploreCard,
    FOOD: toFoodExploreCard,
  };

  const collectionName = collectionMap[serviceType];
  const mapper = mapperMap[serviceType];
  if (!collectionName || !mapper) return [];

  const snapshot = await db.collection(collectionName).get();
  const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // TODO: Future enhancement — if business adds `isFeatured: boolean`, sort featured items to the top first.
  // Default dynamic sorting: rating (desc) -> ratingCount/reviewCount (desc) -> createdAt (desc)
  docs.sort((a: any, b: any) => {
    const ratingA = typeof a.rating === 'number' ? a.rating : a.rating?.average ?? a.starRating ?? 0;
    const ratingB = typeof b.rating === 'number' ? b.rating : b.rating?.average ?? b.starRating ?? 0;
    if (ratingB !== ratingA) return ratingB - ratingA;

    const countA = a.reviewCount ?? a.rating?.count ?? 0;
    const countB = b.reviewCount ?? b.rating?.count ?? 0;
    if (countB !== countA) return countB - countA;

    const dateA = a.createdAt || '';
    const dateB = b.createdAt || '';
    return dateB.localeCompare(dateA);
  });

  const mapped = docs.map((doc) => mapper(doc, lang));
  return mapped.slice(0, 6);
}

export async function getHomeSections() {
  const snapshot = await db.collection(COLLECTIONS.HOME_SECTIONS).get();
  if (snapshot.empty) {
    return [
      { id: 'sec-hotel', key: 'HOTEL', serviceType: 'HOTEL', order: 10, isActive: true },
      { id: 'sec-car', key: 'RENT_A_CAR', serviceType: 'RENT_A_CAR', order: 20, isActive: true },
      { id: 'sec-travel', key: 'TRAVEL', serviceType: 'TRAVEL', order: 30, isActive: true },
      { id: 'sec-food', key: 'FOOD', serviceType: 'FOOD', order: 40, isActive: true },
    ];
  }
  const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return docs
    .filter((d: any) => d.isActive !== false)
    .sort((a: any, b: any) => getOrderValue(a) - getOrderValue(b));
}

async function buildExploreRows(
  orderedSections: Array<{ serviceType: string; order: number }>,
  lang: SupportedLang = 'en',
): Promise<ExploreSectionDTO[]> {
  const rows = await Promise.all(
    orderedSections.map(async (sec) => ({
      serviceType: sec.serviceType as any,
      title: titleMap[sec.serviceType as keyof typeof titleMap],
      order: sec.order,
      items: await getItemsForServiceType(sec.serviceType, lang),
    })),
  );
  return rows;
}

export async function getExplore(userId?: string, lang: SupportedLang = 'en'): Promise<ExploreSectionDTO[]> {
  if (userId) {
    const interestsDoc = await db.collection(COLLECTIONS.USER_INTERESTS).doc(userId).get();
    if (interestsDoc.exists) {
      const counts = interestsDoc.data()!.serviceTypeCounts as Record<string, number>;
      const rankedTypes = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([serviceType]) => serviceType);

      const allTypes = ['HOTEL', 'RENT_A_CAR', 'TRAVEL', 'FOOD'];
      const finalTypes = Array.from(new Set([...rankedTypes, ...allTypes]));
      const orderedSections = finalTypes.map((st, index) => ({
        serviceType: st,
        order: (index + 1) * 10,
      }));
      return buildExploreRows(orderedSections, lang);
    }
  }

  const sections = await getHomeSections();
  const orderedSections = sections.map((sec: any, index: number) => ({
    serviceType: sec.serviceType,
    order: typeof sec.order === 'number' ? sec.order : (index + 1) * 10,
  }));

  if (orderedSections.length === 0) {
    const defaultSections = [
      { serviceType: 'HOTEL', order: 10 },
      { serviceType: 'RENT_A_CAR', order: 20 },
      { serviceType: 'TRAVEL', order: 30 },
      { serviceType: 'FOOD', order: 40 },
    ];
    return buildExploreRows(defaultSections, lang);
  }

  return buildExploreRows(orderedSections, lang);
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
