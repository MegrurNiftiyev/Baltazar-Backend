import { z } from 'zod';

export const addCardSchema = z.object({
  cardNumber: z.string().min(13).max(19),
  expiryMonth: z.number().int().min(1).max(12),
  expiryYear: z.number().int().min(2024),
  cvv: z.string().min(3).max(4),
  cardholderName: z.string().min(1),
});

export const paySchema = z.object({
  flowBoxId: z.string().min(1),
  paymentMethodId: z.string().min(1),
});

export type AddCardInput = z.infer<typeof addCardSchema>;
export type PayInput = z.infer<typeof paySchema>;
