import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import { COLLECTIONS } from '../../config/collections.js';
import type {
  CreateFlowBoxInput,
  AdvanceStepInput,
  FlowScreenConfigInput,
} from './flowbox.schema.js';

const flowBoxesCollection = db.collection(COLLECTIONS.FLOW_BOXES);
const flowScreenConfigCollection = db.collection(COLLECTIONS.FLOW_SCREEN_CONFIGS);

/** FlowBox expires after 24 hours if not completed. */
const FLOWBOX_TTL_MS = 24 * 60 * 60 * 1000;

// ── Helpers ────────────────────────────────────────────────────────────

/**
 * Look up the service document to verify it exists before creating a FlowBox.
 */
async function verifyServiceExists(serviceType: string, serviceId: string) {
  const collectionMap: Record<string, string> = {
    RENT_A_CAR: 'cars',
    TRAVEL: 'travels',
    HOTEL: 'hotels',
    FOOD: 'foodItems',
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

async function computeFlowBoxPrice(serviceType: string, serviceId: string, details: any) {
  const collectionMap: Record<string, string> = {
    RENT_A_CAR: COLLECTIONS.CARS,
    TRAVEL: COLLECTIONS.TRAVELS,
    HOTEL: COLLECTIONS.HOTELS,
    FOOD: COLLECTIONS.FOOD_ITEMS,
  };
  const doc = await db.collection(collectionMap[serviceType]!).doc(serviceId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  const data = doc.data()!;

  switch (serviceType) {
    case 'RENT_A_CAR': {
      const days = Number(details['dates']?.['days'] ?? 1);
      return round2(data.price * Math.max(1, days));
    }
    case 'HOTEL': {
      const nights = Number(details['dates']?.['nights'] ?? 1);
      const roomId = details['room']?.['roomId'];
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

function round2(n: number) { return Math.round((n + Number.EPSILON) * 100) / 100; }

// ── Public API ─────────────────────────────────────────────────────────

/**
 * Create a new FlowBox — validates that the target service exists,
 * initializes status to PENDING, sets expiry timestamp.
 */
export async function createFlowBox(userId: string, input: CreateFlowBoxInput) {
  await verifyServiceExists(input.serviceType, input.serviceId);

  const now = new Date();
  const expiresAt = new Date(now.getTime() + FLOWBOX_TTL_MS);

  const docRef = await flowBoxesCollection.add({
    userId,
    serviceType: input.serviceType,
    serviceId: input.serviceId,
    status: 'PENDING',
    currentStep: 0,
    details: {},
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

/**
 * Advance the FlowBox to the next step.
 * Validates the step data, merges into `details`, and looks up the
 * next step from FlowScreenConfig.
 */
export async function advanceStep(
  flowBoxId: string,
  userId: string,
  input: AdvanceStepInput,
) {
  const doc = await flowBoxesCollection.doc(flowBoxId).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }

  const flowBox = doc.data()!;

  // Ownership check
  if (flowBox.userId !== userId) {
    throw new AppError(403, 'FORBIDDEN');
  }

  // Status checks
  if (flowBox.status === 'CANCELLED') {
    throw new AppError(400, 'FLOWBOX_CANCELLED');
  }
  if (flowBox.status === 'CONFIRMED') {
    throw new AppError(400, 'FLOWBOX_CONFIRMED');
  }

  // Expiry check
  if (new Date(flowBox.expiresAt) < new Date()) {
    await flowBoxesCollection.doc(flowBoxId).update({ status: 'EXPIRED' });
    throw new AppError(400, 'FLOWBOX_EXPIRED');
  }

  // Merge step data into details
  const updatedDetails = {
    ...flowBox.details,
    [input.screen]: input.data,
  };

  // Look up flow screen config to determine next step
  const configDoc = await flowScreenConfigCollection.doc(flowBox.serviceType).get();
  let nextStep: string | null = null;
  let newStepIndex = (flowBox.currentStep || 0) + 1;

  if (configDoc.exists) {
    const config = configDoc.data()!;
    const screens = config.screens as Array<{ screenId: string; order: number }>;
    const sortedScreens = [...screens].sort((a, b) => a.order - b.order);
    const currentIndex = sortedScreens.findIndex((s) => s.screenId === input.screen);

    if (currentIndex >= 0 && currentIndex + 1 < sortedScreens.length) {
      nextStep = sortedScreens[currentIndex + 1]!.screenId;
      newStepIndex = currentIndex + 1;
    }
  }

  if (nextStep === null) {
    (updatedDetails as any).serverComputedPrice = await computeFlowBoxPrice(
      flowBox.serviceType,
      flowBox.serviceId,
      updatedDetails
    );
  }

  await flowBoxesCollection.doc(flowBoxId).update({
    details: updatedDetails,
    currentStep: newStepIndex,
    updatedAt: new Date().toISOString(),
  });

  return {
    id: flowBoxId,
    currentStep: newStepIndex,
    nextStep,
    details: updatedDetails,
    status: flowBox.status,
  };
}

/**
 * Cancel a FlowBox — sets status to CANCELLED.
 */
export async function cancelFlowBox(flowBoxId: string, userId: string) {
  const doc = await flowBoxesCollection.doc(flowBoxId).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }

  const flowBox = doc.data()!;
  if (flowBox.userId !== userId) {
    throw new AppError(403, 'FORBIDDEN');
  }

  if (flowBox.status === 'CONFIRMED') {
    throw new AppError(400, 'FLOWBOX_CONFIRMED');
  }

  await flowBoxesCollection.doc(flowBoxId).update({
    status: 'CANCELLED',
    updatedAt: new Date().toISOString(),
  });

  return { id: flowBoxId, status: 'CANCELLED' };
}

/**
 * Get a single FlowBox by ID — ownership enforced.
 */
export async function getFlowBoxById(flowBoxId: string, userId: string) {
  const doc = await flowBoxesCollection.doc(flowBoxId).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }

  const flowBox = doc.data()!;
  if (flowBox.userId !== userId) {
    throw new AppError(403, 'FORBIDDEN');
  }

  return { id: doc.id, ...flowBox };
}

/**
 * Get all FlowBoxes for the current user.
 */
export async function getUserFlowBoxes(userId: string) {
  const snapshot = await flowBoxesCollection
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ── FlowScreen Config (Admin) ─────────────────────────────────────────

/**
 * Get the FlowScreen configuration for a given service type.
 */
export async function getFlowScreenConfig(serviceType: string) {
  const doc = await flowScreenConfigCollection.doc(serviceType).get();
  if (!doc.exists) {
    return { serviceType, screens: [] };
  }
  return { serviceType, ...doc.data() };
}

/**
 * Create or replace the FlowScreen configuration for a given service type.
 */
export async function updateFlowScreenConfig(
  serviceType: string,
  input: FlowScreenConfigInput,
) {
  await flowScreenConfigCollection.doc(serviceType).set({
    ...input,
    serviceType,
    updatedAt: new Date().toISOString(),
  });

  return getFlowScreenConfig(serviceType);
}
