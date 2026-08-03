import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const paySchema = z.object({
  paymentMethodId: z.string().min(1),
}).openapi('PayInput');

export type PayInput = z.infer<typeof paySchema>;
