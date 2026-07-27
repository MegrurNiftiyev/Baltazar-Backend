import { z } from 'zod';

export const addToWishlistSchema = z.object({
  serviceId: z.string().min(1),
  serviceType: z.enum(['RENT_A_CAR', 'TRAVEL', 'HOTEL', 'FOOD']),
});

export type AddToWishlistInput = z.infer<typeof addToWishlistSchema>;
