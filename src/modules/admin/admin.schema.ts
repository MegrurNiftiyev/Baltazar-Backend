import { z } from 'zod';

export const addAdminSchema = z.object({
  userId: z.string().min(1),
});


export const adminTransactionQuerySchema = z.object({
  status: z.enum(['SUCCESS', 'FAILED', 'PENDING']).optional(),
  userId: z.string().optional(),
});

export type AddAdminInput = z.infer<typeof addAdminSchema>;
