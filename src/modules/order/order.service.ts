import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';
import type { SupportedLang } from '../../config/locales.js';
import type { 
  CreateOrderInput, 
  OrderScreenKey, 
  OrderQuery, 
  PatchDeliveryAddressInput 
} from './order.schema.js';
import { toCarExploreCard } from '../rentacar/rentacar.service.js';
import { toHotelExploreCard } from '../hotel/hotel.service.js';
import { toTourExploreCard } from '../travel/travel.service.js';
import { toFoodExploreCard } from '../food/food.service.js';

const ordersCollection = db.collection(COLLECTIONS.ORDERS);
const transactionsCollection = db.collection(COLLECTIONS.TRANSACTIONS);
const usersCollection = db.collection(COLLECTIONS.USERS);

const ORDER_TTL_MS = 24 * 60 * 60 * 1000;

async function verifyServiceExists(serviceType: string, serviceId: string) {
  const collectionMap: Record<string, string> = {
    RENT_A_CAR: COLLECTIONS.CARS,
    TRAVEL: COLLECTIONS.TRAVELS,
    HOTEL: COLLECTIONS.HOTELS,
    FOOD: COLLECTIONS.FOOD_ITEMS,
  };

  const collectionName = collectionMap[serviceType];
  if (!collectionName) {
    throw new AppError(400, 'VALIDATION_ERROR', `Unknown serviceType: ${serviceType}`);
  }

  const doc = await db.collection(collectionName).doc(serviceId).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND', `Service ${serviceType}/${serviceId} not found`);
  }

  return { id: doc.id, ...doc.data() } as any;
}

export async function createOrder(userId: string, input: CreateOrderInput, lang: SupportedLang = 'en') {
  // 1. Verify service item
  const serviceData = await verifyServiceExists(input.serviceType, input.serviceId);

  // 2. Verify subItem (room) for HOTEL
  let subItemData: any = null;
  if (input.subItemId) {
    if (input.serviceType === 'HOTEL') {
      const subItemDoc = await db.collection(COLLECTIONS.ROOMS).doc(input.subItemId).get();
      if (!subItemDoc.exists) throw new AppError(404, 'NOT_FOUND', `Room ${input.subItemId} not found`);
      subItemData = { id: subItemDoc.id, ...subItemDoc.data() };
    }
  }

  // 3. Read user profile
  const userDoc = await usersCollection.doc(userId).get();
  const user = userDoc.exists ? userDoc.data()! : {};

  // 4. Set requirement flags
  const isPersonalInfoRequired = true; // always
  const isDriverLicenseRequired = input.serviceType === 'RENT_A_CAR';
  const isPassportRequired = input.serviceType === 'TRAVEL';
  const isDeliveryAddressRequired = input.serviceType === 'FOOD';

  // 5. Auto-fill user data
  let personalInfo = null;
  const hasPersonalInfo = Boolean(user.personalInfo ?? user.profileCompleteness?.personalInfo);
  if (hasPersonalInfo && user.personalInfoDetails) {
    personalInfo = {
      name: user.name || '',
      phone: user.phone || '',
      dateOfBirth: user.personalInfoDetails.dateOfBirth,
      address: user.personalInfoDetails.address,
      idNumber: user.personalInfoDetails.idNumber,
    };
  }

  let driverLicense = null;
  const hasDriverLicense = Boolean(user.driverLicense ?? user.profileCompleteness?.driverLicense);
  if (hasDriverLicense && user.driverLicenseDetails) {
    driverLicense = user.driverLicenseDetails;
  }

  let passport = null;
  const hasPassport = Boolean(user.passport ?? user.profileCompleteness?.passport);
  if (hasPassport && user.passportDetails) {
    passport = user.passportDetails;
  }

  // 6. Create serviceItemSnapshot and calculate price
  let price = 0;
  let snapshotCard;

  if (input.serviceType === 'RENT_A_CAR') {
    snapshotCard = toCarExploreCard(serviceData, lang);
    price = typeof serviceData.price === 'number' ? serviceData.price : typeof serviceData.dailyPrice === 'number' ? serviceData.dailyPrice : 0;
  } else if (input.serviceType === 'HOTEL') {
    snapshotCard = toHotelExploreCard(serviceData, lang);
    // If subItemId exists, price is from room, else from hotel min price
    price = subItemData?.price ?? snapshotCard.price;
  } else if (input.serviceType === 'TRAVEL') {
    snapshotCard = toTourExploreCard(serviceData, lang);
    price = typeof serviceData.price === 'number' ? serviceData.price : typeof serviceData.packagePrice === 'number' ? serviceData.packagePrice : 0;
  } else if (input.serviceType === 'FOOD') {
    snapshotCard = toFoodExploreCard(serviceData, lang);
    price = typeof serviceData.price === 'number' ? serviceData.price : 0;
  }

  const serviceItemSnapshot = {
    title: snapshotCard?.title || '',
    image: snapshotCard?.image || '',
    price: price,
    priceSuffix: snapshotCard?.priceSuffix || '',
    currency: snapshotCard?.currency || 'AZN',
  };

  const now = new Date();
  const expiresAt = new Date(now.getTime() + ORDER_TTL_MS);

  // 7. Write to Firestore
  const orderData = {
    userId,
    serviceType: input.serviceType,
    serviceId: input.serviceId,
    subItemId: input.subItemId || null,
    status: 'PENDING',
    
    isPersonalInfoRequired,
    isDriverLicenseRequired,
    isPassportRequired,
    isDeliveryAddressRequired,

    personalInfo,
    driverLicense,
    passport,
    
    paymentMethodId: null,
    deliveryAddress: null,

    serviceItemSnapshot,
    totalPrice: price,

    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    paidAt: null,
    updatedAt: null,
  };

  const docRef = await ordersCollection.add(orderData);
  return { id: docRef.id, ...orderData };
}

export async function getNextScreen(orderId: string, userId: string) {
  // 1. Read Order
  const doc = await ordersCollection.doc(orderId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  
  let order = doc.data() as any;
  if (order.userId !== userId) throw new AppError(403, 'FORBIDDEN');
  
  const now = new Date();
  if (new Date(order.expiresAt) < now && order.status !== 'EXPIRED' && order.status !== 'CONFIRMED' && order.status !== 'CANCELLED') {
    await ordersCollection.doc(orderId).update({ status: 'EXPIRED', updatedAt: now.toISOString() });
    order.status = 'EXPIRED';
    throw new AppError(400, 'ORDER_EXPIRED');
  }

  // 2. Check if already confirmed
  if (order.status === 'CONFIRMED') {
    return { screen: 'CONFIRM_SCREEN', order: { id: doc.id, status: order.status, totalPrice: order.totalPrice, paidAt: order.paidAt } };
  }
  
  if (order.status === 'CANCELLED' || order.status === 'EXPIRED') {
     throw new AppError(400, `ORDER_${order.status}`);
  }

  // 3. Read user profile and auto-fill if needed
  const userDoc = await usersCollection.doc(userId).get();
  const user = userDoc.exists ? userDoc.data()! : {};
  const updates: Record<string, any> = {};

  const hasPersonalInfo = Boolean(user.personalInfo ?? user.profileCompleteness?.personalInfo);
  if (order.isPersonalInfoRequired && !order.personalInfo && hasPersonalInfo && user.personalInfoDetails) {
    updates.personalInfo = {
      name: user.name || '',
      phone: user.phone || '',
      dateOfBirth: user.personalInfoDetails.dateOfBirth,
      address: user.personalInfoDetails.address,
      idNumber: user.personalInfoDetails.idNumber,
    };
  }

  const hasDriverLicense = Boolean(user.driverLicense ?? user.profileCompleteness?.driverLicense);
  if (order.isDriverLicenseRequired && !order.driverLicense && hasDriverLicense && user.driverLicenseDetails) {
    updates.driverLicense = user.driverLicenseDetails;
  }

  const hasPassport = Boolean(user.passport ?? user.profileCompleteness?.passport);
  if (order.isPassportRequired && !order.passport && hasPassport && user.passportDetails) {
    updates.passport = user.passportDetails;
  }

  if (Object.keys(updates).length > 0) {
    updates.updatedAt = now.toISOString();
    await ordersCollection.doc(orderId).update(updates);
    order = { ...order, ...updates };
  }

  // 4. Resolve next screen
  let nextScreen: OrderScreenKey = 'PAYMENT_SCREEN';

  if (order.isPersonalInfoRequired && !order.personalInfo) {
    nextScreen = 'PERSONAL_INFO_SCREEN';
  } else if (order.isDriverLicenseRequired && !order.driverLicense) {
    nextScreen = 'DRIVER_LICENSE_SCREEN';
  } else if (order.isPassportRequired && !order.passport) {
    nextScreen = 'PASSPORT_INFO_SCREEN';
  } else if (order.isDeliveryAddressRequired && !order.deliveryAddress) {
    nextScreen = 'DELIVERY_ADDRESS_SCREEN';
  } else if (!order.paymentMethodId) {
    nextScreen = 'PAYMENT_SCREEN';
  }

  return { 
    screen: nextScreen, 
    order: { 
      id: doc.id, 
      status: order.status,
      personalInfo: order.personalInfo,
      driverLicense: order.driverLicense,
      passport: order.passport,
      deliveryAddress: order.deliveryAddress,
      paymentMethodId: order.paymentMethodId,
      totalPrice: order.totalPrice 
    } 
  };
}

export async function patchPaymentMethod(orderId: string, userId: string, paymentMethodId: string) {
  const doc = await ordersCollection.doc(orderId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  
  const order = doc.data()!;
  if (order.userId !== userId) throw new AppError(403, 'FORBIDDEN');
  if (order.status === 'CANCELLED' || order.status === 'EXPIRED') throw new AppError(400, `ORDER_${order.status}`);
  if (order.status === 'CONFIRMED') throw new AppError(400, 'ORDER_CONFIRMED');

  await ordersCollection.doc(orderId).update({
    paymentMethodId,
    updatedAt: new Date().toISOString(),
  });

  return { orderId, paymentMethodId };
}

export async function patchDeliveryAddress(orderId: string, userId: string, input: PatchDeliveryAddressInput) {
  const doc = await ordersCollection.doc(orderId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  
  const order = doc.data()!;
  if (order.userId !== userId) throw new AppError(403, 'FORBIDDEN');
  if (order.status === 'CANCELLED' || order.status === 'EXPIRED') throw new AppError(400, `ORDER_${order.status}`);
  if (order.status === 'CONFIRMED') throw new AppError(400, 'ORDER_CONFIRMED');
  if (order.serviceType !== 'FOOD') throw new AppError(400, 'VALIDATION_ERROR', 'Delivery address is only for FOOD orders');

  await ordersCollection.doc(orderId).update({
    deliveryAddress: input,
    updatedAt: new Date().toISOString(),
  });

  return { orderId, deliveryAddress: input };
}


export async function cancelOrder(orderId: string, userId: string) {
  const doc = await ordersCollection.doc(orderId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');

  const order = doc.data()!;
  if (order.userId !== userId) throw new AppError(403, 'FORBIDDEN');
  if (order.status === 'CONFIRMED') throw new AppError(400, 'ORDER_CONFIRMED');

  await ordersCollection.doc(orderId).update({
    status: 'CANCELLED',
    updatedAt: new Date().toISOString(),
  });

  return { id: orderId, status: 'CANCELLED' };
}

export async function getOrderById(orderId: string, userId: string, role?: string) {
  const doc = await ordersCollection.doc(orderId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');

  const order = doc.data()!;
  if (role !== 'ADMIN' && order.userId !== userId) throw new AppError(403, 'FORBIDDEN');

  return { id: doc.id, ...order };
}

export async function getOrders(userId: string, role?: string, filters?: OrderQuery) {
  let query: FirebaseFirestore.Query = ordersCollection;

  if (role === 'ADMIN') {
    if (filters?.status) query = query.where('status', '==', filters.status);
    if (filters?.userId) query = query.where('userId', '==', filters.userId);
    if (filters?.serviceType) query = query.where('serviceType', '==', filters.serviceType);
  } else {
    query = query.where('userId', '==', userId);
    if (filters?.status) query = query.where('status', '==', filters.status);
    if (filters?.serviceType) query = query.where('serviceType', '==', filters.serviceType);
  }

  let snapshot: FirebaseFirestore.QuerySnapshot;
  try {
    snapshot = await query.orderBy('createdAt', 'desc').get();
  } catch (err: any) {
    if (err.code === 9 || (err.message && err.message.toLowerCase().includes('index'))) {
      snapshot = await query.get();
    } else {
      throw err;
    }
  }

  let docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  docs.sort((a: any, b: any) => (b.createdAt || '').localeCompare(a.createdAt || ''));

  const limit = filters?.limit ? Number(filters.limit) : 20;
  let startIndex = 0;
  if (filters?.cursor) {
    const foundIdx = docs.findIndex((d: any) => d.id === filters.cursor);
    if (foundIdx !== -1) {
      startIndex = foundIdx + 1;
    }
  }

  const pageDocs = docs.slice(startIndex, startIndex + limit);
  const items = pageDocs.map((doc: any) => ({
    id: doc.id,
    userId: doc.userId,
    serviceType: doc.serviceType,
    serviceId: doc.serviceId,
    subItemId: doc.subItemId || null,
    status: doc.status,
    serviceItemSnapshot: doc.serviceItemSnapshot,
    totalPrice: doc.totalPrice,
    createdAt: doc.createdAt,
    expiresAt: doc.expiresAt,
    paidAt: doc.paidAt || null,
  }));

  const hasMore = startIndex + limit < docs.length;
  const nextCursor = hasMore && items.length > 0 ? items[items.length - 1]!.id : null;

  return {
    items,
    nextCursor,
    hasMore,
  };
}

export async function getPaymentSummary(orderId: string, userId: string) {
  const orderDoc = await ordersCollection.doc(orderId).get();
  if (!orderDoc.exists) throw new AppError(404, 'NOT_FOUND');

  const order = orderDoc.data()!;
  if (order.userId !== userId) throw new AppError(403, 'FORBIDDEN');

  const txSnapshot = await transactionsCollection.where('orderId', '==', orderId).get();
  const transactions = txSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return {
    orderId,
    serviceType: order.serviceType,
    serviceId: order.serviceId,
    status: order.status,
    totalPrice: order.totalPrice,
    serviceItemSnapshot: order.serviceItemSnapshot,
    transactions,
  };
}

export async function updateOrderStatus(orderId: string, status: string) {
  const doc = await ordersCollection.doc(orderId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');

  const updates: Record<string, unknown> = { status };
  if (status === 'CONFIRMED' || status === 'CANCELLED' || status === 'EXPIRED') {
    updates.isCompleted = true;
  }
  updates.updatedAt = new Date().toISOString();

  await ordersCollection.doc(orderId).update(updates);
  return { id: orderId, status };
}

