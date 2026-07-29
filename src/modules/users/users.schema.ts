import { z } from 'zod';

/**
 * Update profile — all fields optional (partial update).
 */
export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: z.string().min(7).max(20).optional(),
  region: z.string().min(1).max(10).optional(),
  language: z.enum(['az', 'en', 'ru']).optional(),
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
});

export const profileCompletenessSchema = z.object({
  personalInfo: z.boolean().default(false),
  driverLicense: z.boolean().default(false),
  passport: z.boolean().default(false),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ProfileCompleteness = z.infer<typeof profileCompletenessSchema>;
