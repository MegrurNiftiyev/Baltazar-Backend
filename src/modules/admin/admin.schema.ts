import { z } from 'zod';

export const addAdminSchema = z.object({
  userId: z.string().min(1),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'AWAITING_PAYMENT', 'PROCESSING', 'CONFIRMED', 'CANCELLED', 'EXPIRED']),
});

export const adminOrderQuerySchema = z.object({
  status: z
    .enum(['PENDING', 'AWAITING_PAYMENT', 'PROCESSING', 'CONFIRMED', 'CANCELLED', 'EXPIRED'])
    .optional(),
  userId: z.string().optional(),
  serviceType: z.string().optional(),
});

export const adminTransactionQuerySchema = z.object({
  status: z.enum(['SUCCESS', 'FAILED', 'PENDING']).optional(),
  userId: z.string().optional(),
});

export type AddAdminInput = z.infer<typeof addAdminSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
