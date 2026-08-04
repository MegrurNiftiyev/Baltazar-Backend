import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { paginationQuerySchema } from '../../shared/pagination.js';

extendZodWithOpenApi(z);



// ── Query Schemas ──────────────────────────────────────────────────────

export const transmissionEnum = z.enum(['AUTOMATIC', 'MANUAL']);
export const fuelTypeEnum = z.enum(['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID']);
export const carStatusEnum = z.enum(['AVAILABLE', 'UNAVAILABLE']);

export const carsQuerySchema = z.object({
  companyId: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  category: z.string().optional(),
  transmission: transmissionEnum.optional(),
  fuelType: fuelTypeEnum.optional(),
}).merge(paginationQuerySchema).openapi('CarsQuery');

// ── Admin CRUD Schemas ─────────────────────────────────────────────────



export const createCarSchema = z.object({
  companyId: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(1990).max(new Date().getFullYear() + 1),
  category: z.string().min(1),
  transmission: transmissionEnum,
  fuelType: fuelTypeEnum,
  seats: z.number().int().min(1).max(50),
  price: z.number().min(0).max(50000), // AZN - sanity cap, adjust per business rules
  images: z.array(z.string().url()).max(10).optional(),
  features: z.array(z.string()).optional(),
  status: carStatusEnum.default('AVAILABLE'),
}).openapi('CreateCarInput');

export const updateCarSchema = createCarSchema.partial().openapi('UpdateCarInput');

export type CarsQuery = z.infer<typeof carsQuerySchema>;

export type CreateCarInput = z.infer<typeof createCarSchema>;
export type UpdateCarInput = z.infer<typeof updateCarSchema>;
