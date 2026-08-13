import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { serviceTypeEnum } from '../../shared/serviceType.js';
import { paginationQuerySchema } from '../../shared/pagination.js';

extendZodWithOpenApi(z);

// ── Create ──
export const createOrderSchema = z.object({
  serviceType: serviceTypeEnum,
  serviceId: z.string().min(1),
  subItemId: z.string().min(1).nullable().optional().default(null),
}).openapi('CreateOrderInput');

// ── PATCH payment method ──
export const patchPaymentMethodSchema = z.object({
  paymentMethodId: z.string().min(1),
}).openapi('PatchPaymentMethodInput');

// ── PATCH delivery address ──
export const patchDeliveryAddressSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  addressName: z.string().min(1),
}).openapi('PatchDeliveryAddressInput');

// ── Screen keys ──
export const orderScreenKeyEnum = z.enum([
  'PERSONAL_INFO_SCREEN',
  'DRIVER_LICENSE_SCREEN',
  'PASSPORT_INFO_SCREEN',
  'DELIVERY_ADDRESS_SCREEN',
  'PAYMENT_SCREEN',
  'CONFIRM_SCREEN',
]);

// ── Order status ──
export const orderStatusEnum = z.enum([
  'PENDING', 'AWAITING_PAYMENT', 'PROCESSING',
  'CONFIRMED', 'CANCELLED', 'EXPIRED',
]);

// ── Admin status update ──
export const updateOrderStatusSchema = z.object({
  status: orderStatusEnum,
}).openapi('UpdateOrderStatusInput');

// ── Query ──
export const orderQuerySchema = z.object({
  status: orderStatusEnum.optional(),
  userId: z.string().optional(),
  serviceType: z.string().optional(),
}).merge(paginationQuerySchema).openapi('OrderQuery');

// ── Types ──
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type PatchPaymentMethodInput = z.infer<typeof patchPaymentMethodSchema>;
export type PatchDeliveryAddressInput = z.infer<typeof patchDeliveryAddressSchema>;
export type OrderScreenKey = z.infer<typeof orderScreenKeyEnum>;
export type OrderQuery = z.infer<typeof orderQuerySchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
