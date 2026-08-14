import { db } from '../../config/firebase.js';
import { AppError } from '../../errors/AppError.js';
import type { 
  UpdateProfileInput, 
  UpdateUserDto, 
  UpdatePersonalInfoDto, 
  UpdatePassportInfoDto, 
  UpdateDriverLicenseDto 
} from './users.schema.js';
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
  const hasPersonalInfoDetails = Boolean(
    data.personalInfoDetails &&
    data.personalInfoDetails.dateOfBirth &&
    data.personalInfoDetails.address &&
    data.personalInfoDetails.idNumber
  );
  const hasDriverLicenseDetails = Boolean(
    data.driverLicenseDetails &&
    data.driverLicenseDetails.licenseNumber &&
    data.driverLicenseDetails.expiryDate
  );
  const hasPassportDetails = Boolean(
    data.passportDetails &&
    data.passportDetails.passportNumber &&
    data.passportDetails.expiryDate
  );

  return {
    id: doc.id,
    name: data.name,
    email: data.email,
    role: data.role,
    phone: data.phone || null,
    region: data.region || null,
    language: data.language || 'en',
    avatarUrl: data.avatarUrl || null,
    personalInfo: Boolean(data.personalInfo === true || data.profileCompleteness?.personalInfo === true || hasPersonalInfoDetails),
    driverLicense: Boolean(data.driverLicense === true || data.profileCompleteness?.driverLicense === true || hasDriverLicenseDetails),
    passport: Boolean(data.passport === true || data.profileCompleteness?.passport === true || hasPassportDetails),
    createdAt: data.createdAt,
  };
}

/**
 * Update user avatar / photo.
 */
export async function updateAvatar(userId: string, avatarUrl: string) {
  const doc = await usersCollection.doc(userId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await usersCollection.doc(userId).update({ avatarUrl });
  return getProfile(userId);
}

/**
 * Update basic user profile (name, phone, region, language).
 */
export async function updateBasicProfile(userId: string, input: UpdateUserDto) {
  const doc = await usersCollection.doc(userId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');

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

/**
 * Update personal info (dateOfBirth, address, idNumber) and set personalInfo boolean flag to true.
 */
export async function updatePersonalInfo(userId: string, input: UpdatePersonalInfoDto) {
  const doc = await usersCollection.doc(userId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');

  const isComplete = Boolean(input.dateOfBirth && input.address && input.idNumber);
  await usersCollection.doc(userId).update({
    personalInfoDetails: input,
    personalInfo: isComplete,
  });

  return getProfile(userId);
}

/**
 * Update passport info (passportNumber, expiryDate) and set passport boolean flag to true.
 */
export async function updatePassportInfo(userId: string, input: UpdatePassportInfoDto) {
  const doc = await usersCollection.doc(userId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');

  const isComplete = Boolean(input.passportNumber && input.expiryDate);
  await usersCollection.doc(userId).update({
    passportDetails: input,
    passport: isComplete,
  });

  return getProfile(userId);
}

/**
 * Update driver license info (licenseNumber, expiryDate) and set driverLicense boolean flag to true.
 */
export async function updateDriverLicenseInfo(userId: string, input: UpdateDriverLicenseDto) {
  const doc = await usersCollection.doc(userId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');

  const isComplete = Boolean(input.licenseNumber && input.expiryDate);
  await usersCollection.doc(userId).update({
    driverLicenseDetails: input,
    driverLicense: isComplete,
  });

  return getProfile(userId);
}

/**
 * Update user profile — composite method for general updates.
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

  if (pInfo !== undefined && typeof pInfo === 'object') {
    updates.personalInfoDetails = pInfo;
    updates.personalInfo = Boolean(pInfo.dateOfBirth && pInfo.address && pInfo.idNumber);
  }
  if (input.driverLicense !== undefined && typeof input.driverLicense === 'object') {
    updates.driverLicenseDetails = input.driverLicense;
    updates.driverLicense = Boolean(input.driverLicense.licenseNumber && input.driverLicense.expiryDate);
  }
  if (input.passport !== undefined && typeof input.passport === 'object') {
    updates.passportDetails = input.passport;
    updates.passport = Boolean(input.passport.passportNumber && input.passport.expiryDate);
  }

  if (Object.keys(updates).length === 0) {
    throw new AppError(400, 'NO_FIELDS_TO_UPDATE');
  }

  await usersCollection.doc(userId).update(updates);

  return getProfile(userId);
}

