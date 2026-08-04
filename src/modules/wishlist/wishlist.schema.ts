import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { paginationQuerySchema } from '../../shared/pagination.js';
import { serviceTypeEnum } from '../../shared/serviceType.js';

extendZodWithOpenApi(z);

export const addToWishlistSchema = z.object({
  serviceId: z.string().min(1),
  serviceType: serviceTypeEnum,
}).openapi('AddToWishlistInput');

export type AddToWishlistInput = z.infer<typeof addToWishlistSchema>;

export const wishlistQuerySchema = paginationQuerySchema.openapi('WishlistQuery');
export type WishlistQuery = z.infer<typeof wishlistQuerySchema>;
