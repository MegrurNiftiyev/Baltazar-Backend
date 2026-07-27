import { z } from 'zod';

export const createReviewSchema = z.object({
  targetType: z.enum(['RENT_A_CAR', 'TRAVEL', 'HOTEL', 'FOOD']),
  targetId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1).max(2000),
});

export const reviewQuerySchema = z.object({
  targetType: z.enum(['RENT_A_CAR', 'TRAVEL', 'HOTEL', 'FOOD']),
  targetId: z.string().min(1),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type ReviewQuery = z.infer<typeof reviewQuerySchema>;
