import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import type { CreateServiceInput, UpdateServiceInput } from './services.schema.js';
import { COLLECTIONS } from '../../config/collections.js';

const servicesCollection = db.collection(COLLECTIONS.SERVICES);

/**
 * Get all services, ordered by `order` field.
 */
export async function getAllServices() {
  const snapshot = await servicesCollection.orderBy('order', 'asc').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/**
 * Get a single service by ID.
 */
export async function getServiceById(id: string) {
  const doc = await servicesCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  return { id: doc.id, ...doc.data() };
}

/**
 * Create a new service (admin only).
 */
export async function createService(input: CreateServiceInput) {
  const docRef = await servicesCollection.add({
    ...input,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...input };
}

/**
 * Update a service (admin only).
 */
export async function updateService(id: string, input: UpdateServiceInput) {
  const doc = await servicesCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  await servicesCollection.doc(id).update(input);
  return getServiceById(id);
}

/**
 * Delete a service (admin only).
 */
export async function deleteService(id: string) {
  const doc = await servicesCollection.doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }
  await servicesCollection.doc(id).delete();
  return { id, deleted: true };
}
