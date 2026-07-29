import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';
import { ORDER_SCREENS } from '../../config/orderScreens.js';
import type { AdvanceStepInput, CreateOrderInput, OrderScreenKey } from './order.schema.js';

const ordersCollection = db.collection(COLLECTIONS.ORDERS);
const transactionsCollection = db.collection(COLLECTIONS.TRANSACTIONS);

const ORDER_TTL_MS = 24 * 60 * 60 * 1000;

async function verifyServiceExists(serviceType: string, serviceId: string) {
  const collectionMap: Record<string, string> = {
    RENT_A_CAR: COLLECTIONS.CARS,
    TRAVEL: COLLECTIONS.TRAVELS,
    HOTEL_ROOM: COLLECTIONS.ROOMS,
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

  return doc.data();
}

async function computeOrderPrice(serviceType: string, serviceId: string, details: Record<string, any>) {
  const collectionMap: Record<string, string> = {
    RENT_A_CAR: COLLECTIONS.CARS,
    TRAVEL: COLLECTIONS.TRAVELS,
    HOTEL_ROOM: COLLECTIONS.ROOMS,
    FOOD: COLLECTIONS.FOOD_ITEMS,
  };
  const doc = await db.collection(collectionMap[serviceType]!).doc(serviceId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  const data = doc.data()!;

  switch (serviceType) {
    case 'RENT_A_CAR': {
      const days = Number(details.dates?.days ?? 1);
      return round2(data.price * Math.max(1, days));
    }
    case 'HOTEL_ROOM': {
      const nights = Number(details.dates?.nights ?? 1);
      const roomId = details.room?.roomId;
      const roomDoc = roomId ? await db.collection(COLLECTIONS.ROOMS).doc(roomId).get() : null;
      const roomPrice = roomDoc?.exists ? roomDoc.data()!.price : data.price;
      return round2(roomPrice * Math.max(1, nights));
    }
    case 'TRAVEL':
    case 'FOOD':
    default:
      return round2(data.price);
  }
}

function round2(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

async function resolveNextStep(
  order: Record<string, unknown>,
  user: Record<string, unknown>,
): Promise<OrderScreenKey | 'DONE'> {
  const screens = ORDER_SCREENS[order.serviceType as keyof typeof ORDER_SCREENS];
  const completeness = (user.profileCompleteness ?? {}) as {
    personalInfo?: boolean;
    driverLicense?: boolean;
    passport?: boolean;
  };

  let idx = (order.currentStep as number) ?? 0;

  while (idx < screens.length) {
    const screen = screens[idx]!;

    if (screen === 'PERSONAL_INFO_SCREEN' && completeness.personalInfo) {
      idx++;
      continue;
    }
    if (screen === 'DRIVER_LICENSE_SCREEN' && completeness.driverLicense) {
      idx++;
      continue;
    }
    if (screen === 'PASSPORT_INFO_SCREEN' && completeness.passport) {
      idx++;
      continue;
    }
    return screen;
  }
  return 'DONE';
}

export async function createOrder(userId: string, input: CreateOrderInput) {
  const serviceData = await verifyServiceExists(input.serviceType, input.serviceId);
  const initialDetails: Record<string, unknown> = {};
  if ((input.serviceType === 'RENT_A_CAR' || input.serviceType === 'TRAVEL') && serviceData?.companyId) {
    initialDetails.companyId = serviceData.companyId;
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + ORDER_TTL_MS);

  const docRef = await ordersCollection.add({
    userId,
    serviceType: input.serviceType,
    serviceId: input.serviceId,
    status: 'PENDING',
    currentStep: 0,
    details: initialDetails,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  });

  return {
    id: docRef.id,
    userId,
    serviceType: input.serviceType,
    serviceId: input.serviceId,
    status: 'PENDING',
    currentStep: 0,
    expiresAt: expiresAt.toISOString(),
  };
}

export async function advanceStep(orderId: string, userId: string, input: AdvanceStepInput) {
  const doc = await ordersCollection.doc(orderId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');

  const order = doc.data()!;
  if (order.userId !== userId) throw new AppError(403, 'FORBIDDEN');
  if (order.status === 'CANCELLED') throw new AppError(400, 'ORDER_CANCELLED');
  if (order.status === 'CONFIRMED') throw new AppError(400, 'ORDER_CONFIRMED');

  if (new Date(order.expiresAt) < new Date()) {
    await ordersCollection.doc(orderId).update({ status: 'EXPIRED' });
    throw new AppError(400, 'ORDER_EXPIRED');
  }

  const updatedDetails = {
    ...order.details,
    [input.screen]: input.data,
  };

  const screens = ORDER_SCREENS[order.serviceType as keyof typeof ORDER_SCREENS];
  const currentScreenIndex = screens.findIndex((screen) => screen === input.screen);
  const newStepIndex = currentScreenIndex >= 0 ? currentScreenIndex + 1 : ((order.currentStep as number) ?? 0) + 1;
  const nextStepOrder = { ...order, currentStep: newStepIndex };
  const userDoc = await db.collection(COLLECTIONS.USERS).doc(userId).get();
  const user = userDoc.exists ? userDoc.data()! : {};
  const nextStep = await resolveNextStep(nextStepOrder, user);

  if (nextStep === 'DONE') {
    updatedDetails.serverComputedPrice = await computeOrderPrice(
      order.serviceType,
      order.serviceId,
      updatedDetails,
    );
  }

  await ordersCollection.doc(orderId).update({
    details: updatedDetails,
    currentStep: newStepIndex,
    updatedAt: new Date().toISOString(),
  });

  return {
    orderId,
    status: order.status,
    nextStep: nextStep === 'DONE' ? 'DONE' : { screen: nextStep },
  };
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

export async function getOrderById(orderId: string, userId: string) {
  const doc = await ordersCollection.doc(orderId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');

  const order = doc.data()!;
  if (order.userId !== userId) throw new AppError(403, 'FORBIDDEN');

  return { id: doc.id, ...order };
}

export async function getUserOrders(userId: string) {
  const snapshot = await ordersCollection
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
    details: order.details,
    transactions,
  };
}
