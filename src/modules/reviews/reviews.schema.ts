import { z } from 'zod';

export const createReviewSchema = z.object({
  targetType: z.enum(['RENT_A_CAR', 'TRAVEL', 'HOTEL', 'FOOD', 'COMPANY']),
  targetId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1).max(2000),
});

export const reviewQuerySchema = z.object({
  targetType: z.enum(['RENT_A_CAR', 'TRAVEL', 'HOTEL', 'FOOD', 'COMPANY']),
  targetId: z.string().min(1),
});

export const updateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().min(1).max(2000).optional(),
}).refine((value) => Object.keys(value).length > 0);

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type ReviewQuery = z.infer<typeof reviewQuerySchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
