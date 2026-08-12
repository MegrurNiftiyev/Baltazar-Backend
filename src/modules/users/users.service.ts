import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import type { UpdateProfileInput } from './users.schema.js';
import { COLLECTIONS } from '../../config/collections.js';

const usersCollection = db.collection(COLLECTIONS.USERS);

/**
 * Get user profile by ID — never includes passwordHash or refreshToken.
 * Returns flattened top-level completeness booleans (personalInfo, driverLicense, passport).
 * Wishlist is NOT included (stored in separate wishlist collection).
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
    avatarUrl: data.avatarUrl || null,
    personalInfo: Boolean(data.personalInfo ?? data.profileCompleteness?.personalInfo ?? false),
    driverLicense: Boolean(data.driverLicense ?? data.profileCompleteness?.driverLicense ?? false),
    passport: Boolean(data.passport ?? data.profileCompleteness?.passport ?? false),
    createdAt: data.createdAt,
  };
}

/**
 * Update user avatar.
 */
export async function updateAvatar(userId: string, avatarUrl: string) {
  const doc = await usersCollection.doc(userId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await usersCollection.doc(userId).update({ avatarUrl });
  return getProfile(userId);
}

/**
 * Update user profile — updates profile details and top-level completeness booleans.
 */
export async function updateProfile(userId: string, input: UpdateProfileInput) {
  const doc = await usersCollection.doc(userId).get();
  if (!doc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }

  const pInfo = input.personalInfoDetails || input.personalInfo;

  // Build update object from non-undefined fields
  const updates: Record<string, unknown> = {};
  if (input.name !== undefined) updates.name = input.name;
  if (input.phone !== undefined) updates.phone = input.phone;
  if (input.region !== undefined) updates.region = input.region;
  if (input.language !== undefined) updates.language = input.language;

  if (pInfo !== undefined) {
    updates.personalInfoDetails = pInfo;
    updates.personalInfo = Boolean(pInfo.dateOfBirth && pInfo.address && pInfo.idNumber);
  }
  if (input.driverLicense !== undefined) {
    updates.driverLicenseDetails = input.driverLicense;
    updates.driverLicense = true;
  }
  if (input.passport !== undefined) {
    updates.passportDetails = input.passport;
    updates.passport = true;
  }

  if (Object.keys(updates).length === 0) {
    throw new AppError(400, 'NO_FIELDS_TO_UPDATE');
  }

  await usersCollection.doc(userId).update(updates);

  return getProfile(userId);
}
