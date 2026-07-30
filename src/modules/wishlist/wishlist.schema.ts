import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const addToWishlistSchema = z.object({
  serviceId: z.string().min(1),
  serviceType: z.enum(['RENT_A_CAR', 'TRAVEL', 'HOTEL', 'FOOD']),
}).openapi('AddToWishlistInput');

export type AddToWishlistInput = z.infer<typeof addToWishlistSchema>;
