import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { paginationQuerySchema } from '../../shared/pagination.js';
import { companyStatusEnum } from '../../shared/enums.js';

extendZodWithOpenApi(z);

const localizedMapSchema = z.object({
  az: z.string(),
  en: z.string(),
  ru: z.string(),
});

// ── Query Schemas ──────────────────────────────────────────────────────

export const hotelQuerySchema = z.object({
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  starRating: z.coerce.number().int().min(1).max(5).optional(),
  city: z.string().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  name: z.string().optional(),
}).merge(paginationQuerySchema).openapi('HotelQuery');

export const roomQuerySchema = z.object({
  roomType: z.string().optional(),
}).merge(paginationQuerySchema).openapi('RoomQuery');

// ── Admin CRUD Schemas ─────────────────────────────────────────────────

export const createHotelSchema = z.object({
  name: localizedMapSchema,
  about: localizedMapSchema.optional(),
  city: z.string().min(1),
  address: z.string().optional(),
  starRating: z.number().int().min(1).max(5),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string().url()).max(10).optional(),
  logo: z.string().url().optional(),
  sectionsOrder: z.array(z.string()).optional(),
  serviceType: z.literal('HOTEL').default('HOTEL'),
  price: z.number().min(0).max(50000), // AZN - sanity cap, adjust per business rules
  status: companyStatusEnum.default('ACTIVE'),
}).openapi('CreateHotelInput');

export const updateHotelSchema = createHotelSchema.partial().openapi('UpdateHotelInput');


export const createRoomSchema = z.object({
  hotelId: z.string().min(1),
  roomType: z.string().min(1),
  name: localizedMapSchema,
  description: localizedMapSchema.optional(),
  price: z.number().min(0).max(50000), // AZN - sanity cap, adjust per business rules
  capacity: z.number().int().min(1),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string().url()).max(10).optional(),
  status: z.enum(['AVAILABLE', 'UNAVAILABLE']).default('AVAILABLE'),
}).openapi('CreateRoomInput');

export const updateRoomSchema = createRoomSchema.partial().openapi('UpdateRoomInput');

export type HotelQuery = z.infer<typeof hotelQuerySchema>;
export type RoomQuery = z.infer<typeof roomQuerySchema>;
export type CreateHotelInput = z.infer<typeof createHotelSchema>;
export type UpdateHotelInput = z.infer<typeof updateHotelSchema>;
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
