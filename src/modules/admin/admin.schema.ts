import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const addAdminSchema = z.object({
  userId: z.string().min(1),
}).openapi('AddAdminInput');


export const adminTransactionQuerySchema = z.object({
  status: z.enum(['SUCCESS', 'FAILED', 'PENDING']).optional(),
  userId: z.string().optional(),
}).openapi('AdminTransactionQuery');

export type AddAdminInput = z.infer<typeof addAdminSchema>;
