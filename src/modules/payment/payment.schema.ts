import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const addCardSchema = z.object({
  paymentMethodId: z.string(),
  brand: z.string(),
  last4: z.string(),
  expiryMonth: z.string().or(z.number()),
  expiryYear: z.string().or(z.number())
}).openapi('AddCardInput');


export const paySchema = z.object({
  paymentMethodId: z.string().min(1),
}).openapi('PayInput');

export type PayInput = z.infer<typeof paySchema>;
export type AddCardInput = z.infer<typeof addCardSchema>;
