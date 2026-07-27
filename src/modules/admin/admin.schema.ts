import { z } from 'zod';

export const addAdminSchema = z.object({
  userId: z.string().min(1),
});

export const updateFlowboxStatusSchema = z.object({
  status: z.enum(['PENDING', 'AWAITING_PAYMENT', 'CONFIRMED', 'CANCELLED', 'EXPIRED']),
});

export const adminFlowboxQuerySchema = z.object({
  status: z
    .enum(['PENDING', 'AWAITING_PAYMENT', 'CONFIRMED', 'CANCELLED', 'EXPIRED'])
    .optional(),
  userId: z.string().optional(),
  serviceType: z.string().optional(),
});

export const adminTransactionQuerySchema = z.object({
  status: z.enum(['SUCCESS', 'FAILED', 'PENDING']).optional(),
  userId: z.string().optional(),
});

export type AddAdminInput = z.infer<typeof addAdminSchema>;
export type UpdateFlowboxStatusInput = z.infer<typeof updateFlowboxStatusSchema>;
