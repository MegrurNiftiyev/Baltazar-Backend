import { z } from 'zod';

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
});

export const roomQuerySchema = z.object({
  roomType: z.string().optional(),
});

// ── Admin CRUD Schemas ─────────────────────────────────────────────────

export const createHotelSchema = z.object({
  name: localizedMapSchema,
  about: localizedMapSchema.optional(),
  city: z.string().min(1),
  address: z.string().optional(),
  starRating: z.number().int().min(1).max(5),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  logo: z.string().optional(),
  price: z.number().min(0),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
});

export const updateHotelSchema = createHotelSchema.partial();

export const createRoomSchema = z.object({
  hotelId: z.string().min(1),
  roomType: z.string().min(1),
  name: localizedMapSchema,
  description: localizedMapSchema.optional(),
  price: z.number().min(0),
  capacity: z.number().int().min(1),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  status: z.enum(['AVAILABLE', 'UNAVAILABLE']).default('AVAILABLE'),
});

export const updateRoomSchema = createRoomSchema.partial();

export type HotelQuery = z.infer<typeof hotelQuerySchema>;
export type RoomQuery = z.infer<typeof roomQuerySchema>;
export type CreateHotelInput = z.infer<typeof createHotelSchema>;
export type UpdateHotelInput = z.infer<typeof updateHotelSchema>;
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
