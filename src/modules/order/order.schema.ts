import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { serviceTypeEnum } from '../../shared/serviceType.js';
import { paginationQuerySchema } from '../../shared/pagination.js';

extendZodWithOpenApi(z);

export const createOrderSchema = z.object({
  serviceType: serviceTypeEnum,
  serviceId: z.string().min(1),
}).openapi('CreateOrderInput');

export const advanceStepSchema = z.object({
  screen: z.string().min(1),
  data: z.record(z.unknown()),
}).openapi('AdvanceOrderStepInput');

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

export const orderStatusEnum = z.enum(['PENDING', 'AWAITING_PAYMENT', 'PROCESSING', 'CONFIRMED', 'CANCELLED', 'EXPIRED']);

export const updateOrderStatusSchema = z.object({
  status: orderStatusEnum,
}).openapi('UpdateOrderStatusInput');

export const orderQuerySchema = z.object({
  status: orderStatusEnum.optional(),
  userId: z.string().optional(),
  serviceType: z.string().optional(),
}).merge(paginationQuerySchema).openapi('OrderQuery');

export type OrderQuery = z.infer<typeof orderQuerySchema>;

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
