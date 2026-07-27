import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import type { UpdateProfileInput } from './users.schema.js';
import { COLLECTIONS } from '../../config/collections.js';

const usersCollection = db.collection(COLLECTIONS.USERS);

/**
 * Get user profile by ID — never includes passwordHash or refreshToken.
 */
export async function getProfile(userId: string) {
  const doc = await usersCollection.doc(userId).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }

  const data = doc.data()!;
  return {
    id: doc.id,
    name: data.name,
    email: data.email,
    role: data.role,
    phone: data.phone || null,
    region: data.region || null,
    language: data.language || 'en',
    wishlist: data.wishlist || [],
    createdAt: data.createdAt,
  };
}

/**
 * Update user profile — only the fields present in the input are updated.
 */
export async function updateProfile(userId: string, input: UpdateProfileInput) {
  const doc = await usersCollection.doc(userId).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }

  // Build update object from non-undefined fields
  const updates: Record<string, unknown> = {};
  if (input.name !== undefined) updates.name = input.name;
  if (input.phone !== undefined) updates.phone = input.phone;
  if (input.region !== undefined) updates.region = input.region;
  if (input.language !== undefined) updates.language = input.language;

  if (Object.keys(updates).length === 0) {
    throw new AppError(400, 'NO_FIELDS_TO_UPDATE');
  }

  await usersCollection.doc(userId).update(updates);

  return getProfile(userId);
}
