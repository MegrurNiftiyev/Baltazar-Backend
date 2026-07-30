import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

const localizedMapSchema = z.object({
  az: z.string(),
  en: z.string(),
  ru: z.string(),
});

// ── Query Schemas ──────────────────────────────────────────────────────

export const carsQuerySchema = z.object({
  companyId: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  category: z.string().optional(),
  transmission: z.enum(['AUTOMATIC', 'MANUAL']).optional(),
  fuelType: z.enum(['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID']).optional(),
}).openapi('CarsQuery');

// ── Admin CRUD Schemas ─────────────────────────────────────────────────

export const createCompanySchema = z.object({
  name: localizedMapSchema,
  about: localizedMapSchema.optional(),
  serviceType: z.literal('RENT_A_CAR').default('RENT_A_CAR'),
  sectionsOrder: z.array(z.string()).optional(),
  profileImage: z.string().url().optional(),
  bannerImage: z.string().url().optional(),
  images: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
}).openapi('CreateRentACarCompanyInput');

export const updateCompanySchema = createCompanySchema.partial().openapi('UpdateRentACarCompanyInput');

export const createCarSchema = z.object({
  companyId: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(1990).max(new Date().getFullYear() + 1),
  category: z.string().min(1),
  transmission: z.enum(['AUTOMATIC', 'MANUAL']),
  fuelType: z.enum(['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID']),
  seats: z.number().int().min(1).max(50),
  price: z.number().min(0).max(50000), // AZN - sanity cap, adjust per business rules
  images: z.array(z.string()).min(1),
  features: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  status: z.enum(['AVAILABLE', 'UNAVAILABLE']).default('AVAILABLE'),
}).openapi('CreateCarInput');

export const updateCarSchema = createCarSchema.partial().openapi('UpdateCarInput');

export type CarsQuery = z.infer<typeof carsQuerySchema>;
export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
export type CreateCarInput = z.infer<typeof createCarSchema>;
export type UpdateCarInput = z.infer<typeof updateCarSchema>;
