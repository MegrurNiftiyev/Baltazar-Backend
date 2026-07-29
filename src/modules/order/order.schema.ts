import { z } from 'zod';

export const createOrderSchema = z.object({
  serviceType: z.enum(['RENT_A_CAR', 'TRAVEL', 'HOTEL_ROOM', 'FOOD']),
  serviceId: z.string().min(1),
});

export const advanceStepSchema = z.object({
  screen: z.string().min(1),
  data: z.record(z.unknown()),
});

export const orderScreenKeyEnum = z.enum([
  'AUTH_SCREEN',
  'PERSONAL_INFO_SCREEN',
  'DRIVER_LICENSE_SCREEN',
  'PASSPORT_INFO_SCREEN',
  'ADDRESS_SCREEN',
  'DELIVERY_ADDRESS_SCREEN',
  'PAYMENT_SCREEN',
  'CONFIRM_SCREEN',
]);

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type AdvanceStepInput = z.infer<typeof advanceStepSchema>;
export type OrderScreenKey = z.infer<typeof orderScreenKeyEnum>;

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

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
