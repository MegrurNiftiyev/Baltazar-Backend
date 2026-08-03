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

export const listUsersQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  cursor: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
}).openapi('ListUsersQuery');

export type AddAdminInput = z.infer<typeof addAdminSchema>;
export type AdminTransactionQuery = z.infer<typeof adminTransactionQuerySchema>;
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;
