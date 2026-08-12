import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { languageEnum } from '../../shared/language.js';

extendZodWithOpenApi(z);

/**
 * Update profile — all fields optional (partial update).
 */
export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: z.string().min(7).max(20).optional(),
  region: z.string().min(1).max(10).optional(),
  language: languageEnum.optional(),
  personalInfoDetails: z
    .object({
      dateOfBirth: z.string().min(1).optional(),
      address: z.string().min(1).optional(),
      idNumber: z.string().min(1).optional(),
    })
    .optional(),
  personalInfo: z
    .object({
      dateOfBirth: z.string().min(1).optional(),
      address: z.string().min(1).optional(),
      idNumber: z.string().min(1).optional(),
    })
    .optional(),
  driverLicense: z
    .object({
      licenseNumber: z.string().min(1),
      expiryDate: z.string().min(1),
    })
    .optional(),
  passport: z
    .object({
      passportNumber: z.string().min(1),
      expiryDate: z.string().min(1),
    })
    .optional(),
}).openapi('UpdateProfileInput');

export const userProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['USER', 'ADMIN']),
  phone: z.string().nullable(),
  region: z.string().nullable(),
  language: languageEnum,
  avatarUrl: z.string().url().nullable(),
  personalInfo: z.boolean().default(false),
  driverLicense: z.boolean().default(false),
  passport: z.boolean().default(false),
  createdAt: z.string(),
}).openapi('UserProfile');

export const updateAvatarSchema = z.object({
  avatar: z.string().url(),
}).openapi('UpdateAvatarInput');

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
export type UpdateAvatarInput = z.infer<typeof updateAvatarSchema>;
