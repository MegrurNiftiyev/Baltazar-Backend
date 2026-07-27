import { z } from 'zod';

/**
 * Update profile — all fields optional (partial update).
 */
export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: z.string().min(7).max(20).optional(),
  region: z.string().min(1).max(10).optional(),
  language: z.enum(['az', 'en', 'ru']).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
