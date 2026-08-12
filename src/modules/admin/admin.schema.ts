import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { paginationQuerySchema } from '../../shared/pagination.js';

extendZodWithOpenApi(z);

export const addAdminSchema = z.object({
  userId: z.string().min(1),
}).openapi('AddAdminInput');

export const adminTransactionQuerySchema = z.object({
  status: z.enum(['SUCCESS', 'FAILED', 'PENDING']).optional(),
  userId: z.string().optional(),
}).merge(paginationQuerySchema).openapi('AdminTransactionQuery');

export const roleEnum = z.enum(['USER', 'ADMIN']);

export const listUsersQuerySchema = z.object({
  role: roleEnum.optional(),
}).merge(paginationQuerySchema).openapi('ListUsersQuery');

export const reorderSectionsSchema = z
  .array(
    z.object({
      serviceType: z.enum(['RENT_A_CAR', 'HOTEL', 'TRAVEL', 'FOOD']),
      order: z.number().int().min(0),
    }),
  )
  .min(1)
  .openapi('ReorderSectionsInput');

export type AddAdminInput = z.infer<typeof addAdminSchema>;
export type AdminTransactionQuery = z.infer<typeof adminTransactionQuerySchema>;
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;
export type ReorderSectionsInput = z.infer<typeof reorderSectionsSchema>;
