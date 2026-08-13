import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';
import { getReviewEligibility } from '../reviews/reviews.service.js';
import { paginateQuery } from '../../shared/pagination.js';
import type { CompanyDetailSection } from '../../shared/enums.js';
import type { CreateCompanyInput, UpdateCompanyInput, CompaniesQuery } from './companies.schema.js';
import type { SupportedLang } from '../../config/locales.js';
import type { ExploreCardDTO } from '../../shared/dto/explore-card.dto.js';
import { toFoodExploreCard } from '../food/food.service.js';
import { toCarExploreCard } from '../rentacar/rentacar.service.js';
import { toTourExploreCard } from '../travel/travel.service.js';
import { toHotelExploreCard } from '../hotel/hotel.service.js';

const companiesCollection = db.collection(COLLECTIONS.COMPANIES);

const SERVICE_COLLECTION_MAP: Record<string, string> = {
  FOOD: COLLECTIONS.FOOD_ITEMS,
  RENT_A_CAR: COLLECTIONS.CARS,
  TRAVEL: COLLECTIONS.TRAVELS,
  HOTEL: COLLECTIONS.HOTELS,
};

const CARD_MAPPER_MAP: Record<string, (doc: any, lang: SupportedLang) => ExploreCardDTO> = {
  FOOD: toFoodExploreCard,
  RENT_A_CAR: toCarExploreCard,
  TRAVEL: toTourExploreCard,
  HOTEL: toHotelExploreCard,
};

function buildFullSectionOrder(sectionOrder: CompanyDetailSection[]): string[] {
  return ['HEADER', ...sectionOrder, 'REVIEWS'];
}

export async function getCompanies(query: CompaniesQuery) {
  let ref: FirebaseFirestore.Query = companiesCollection.where('status', '==', 'ACTIVE');
  if (query.serviceType) {
    ref = ref.where('serviceType', '==', query.serviceType);
  }
  
  const result = await paginateQuery(
    companiesCollection,
    ref.orderBy('createdAt', 'desc'),
    query,
    (doc) => ({ id: doc.id, ...doc.data() })
  );

  let filteredItems = result.items;
  if (query.serviceType) {
    filteredItems = filteredItems.filter((c: any) => c.serviceType === query.serviceType);
  }

  const sortedItems = [...filteredItems].sort(
    (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)
  );

  return { ...result, items: sortedItems };
}


export async function getCompanyById(id: string, userId?: string) {
  const doc = await companiesCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  const { ratingSum, ...data } = doc.data()!;
  const reviewEligibility = await getReviewEligibility(userId, 'COMPANY', id);
  const fullSectionOrder = buildFullSectionOrder(data.sectionOrder || ['ABOUT', 'GALLERY', 'ITEMS']);
  return { id: doc.id, ...data, fullSectionOrder, reviewEligibility };
}

export async function createCompany(input: CreateCompanyInput) {
  const docRef = await companiesCollection.add({
    ...input,
    rating: 5,
    reviewCount: 0,
    ratingSum: 0,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...input, rating: 5, reviewCount: 0 };
}

export async function updateCompany(id: string, input: UpdateCompanyInput) {
  const doc = await companiesCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await companiesCollection.doc(id).update(input);
  return getCompanyById(id);
}

export async function deleteCompany(id: string) {
  const doc = await companiesCollection.doc(id).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  const data = doc.data()!;

  const { deleteChildrenForCompany } = await resolveChildDeleter(data.serviceType);
  const { deletedCount } = await deleteChildrenForCompany(id);

  await companiesCollection.doc(id).delete();
  return { id, deleted: true, deletedChildren: deletedCount };
}

async function resolveChildDeleter(serviceType: string) {
  switch (serviceType) {
    case 'FOOD':
      return import('../food/food.service.js').then((m) => ({ deleteChildrenForCompany: m.deleteFoodItemsForCompany }));
    case 'RENT_A_CAR':
      return import('../rentacar/rentacar.service.js').then((m) => ({ deleteChildrenForCompany: m.deleteCarsForCompany }));
    case 'TRAVEL':
      return import('../travel/travel.service.js').then((m) => ({ deleteChildrenForCompany: m.deleteToursForCompany }));
    default:
      return { deleteChildrenForCompany: async () => ({ deletedCount: 0 }) };
  }
}

export async function getCompanyRelatedItems(companyId: string, lang: SupportedLang = 'en'): Promise<ExploreCardDTO[]> {
  const doc = await companiesCollection.doc(companyId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');

  const data = doc.data()!;
  const relatedItemIds: string[] = data.relatedItemIds || [];

  if (relatedItemIds.length === 0) return [];

  const serviceType = data.serviceType;
  const collectionName = SERVICE_COLLECTION_MAP[serviceType];
  const cardMapper = CARD_MAPPER_MAP[serviceType];

  if (!collectionName || !cardMapper) return [];

  const refs = relatedItemIds.map((id) => db.collection(collectionName).doc(id));
  const docs = await db.getAll(...refs);

  const cards: ExploreCardDTO[] = [];
  for (const itemDoc of docs) {
    if (itemDoc.exists) {
      cards.push(cardMapper({ id: itemDoc.id, ...itemDoc.data() }, lang));
    }
  }

  return cards;
}
