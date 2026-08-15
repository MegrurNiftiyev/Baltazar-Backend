import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { paginationQuerySchema } from '../../shared/pagination.js';

extendZodWithOpenApi(z);

export const reviewTargetTypeEnum = z.enum(['RENT_A_CAR', 'TRAVEL', 'HOTEL', 'FOOD', 'COMPANY']);

export const createReviewSchema = z.object({
  targetType: reviewTargetTypeEnum,
  targetId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1).max(2000).optional(),
}).openapi('CreateReviewInput');

export const reviewQuerySchema = z.object({
  targetType: reviewTargetTypeEnum.optional(),
  targetId: z.string().min(1).optional(),
}).merge(paginationQuerySchema).openapi('ReviewQuery');

export const updateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().min(1).max(2000).optional(),
}).refine((value) => Object.keys(value).length > 0).openapi('UpdateReviewInput');

export const reviewResponseSchema = z.object({
  id: z.string(),
  userId: z.string().nullable().optional(),
  userName: z.string().optional(),
  avatarUrl: z.string().nullable().optional(),
  targetType: reviewTargetTypeEnum,
  targetId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().default(''),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
}).openapi('ReviewResponse');

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type ReviewQuery = z.infer<typeof reviewQuerySchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
export type ReviewResponse = z.infer<typeof reviewResponseSchema>;
