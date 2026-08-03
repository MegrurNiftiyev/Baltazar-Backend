import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

const localizedMapSchema = z.object({
  az: z.string(),
  en: z.string(),
  ru: z.string(),
});

// ── Query Schemas ──────────────────────────────────────────────────────

export const toursQuerySchema = z.object({
  companyId: z.string().optional(),
  category: z.string().optional(),
  minRating: z.coerce.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  name: z.string().optional(),
}).openapi('ToursQuery');

export const includedServicesParamsSchema = z.object({
  serviceType: z.enum(['TRAVEL', 'HOTEL']),
}).openapi('IncludedServicesParams');

// ── Admin CRUD Schemas ─────────────────────────────────────────────────

export const createTravelCompanySchema = z.object({
  name: localizedMapSchema,
  about: localizedMapSchema.optional(),
  serviceType: z.literal('TRAVEL').default('TRAVEL'),
  sectionsOrder: z.array(z.string()).optional(),
  profileImage: z.string().url().optional(),
  bannerImage: z.string().url().optional(),
  images: z.array(z.string().url()).max(10).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
}).openapi('CreateTravelCompanyInput');

export const updateTravelCompanySchema = createTravelCompanySchema.partial().openapi('UpdateTravelCompanyInput');

export const createTourSchema = z.object({
  companyId: z.string().min(1),
  categories: z.array(z.string()).min(1),
  title: localizedMapSchema,
  roadmap: z
    .array(
      z.object({
        lat: z.number(),
        long: z.number(),
        order: z.number().int(),
      }),
    )
    .optional(),
  images: z.array(z.string().url()).max(10).optional(),
  duration: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  includedServices: z.array(z.string()).optional(),
  price: z.number().min(0).max(50000), // AZN - sanity cap, adjust per business rules
  status: z.enum(['ACTIVE', 'INACTIVE', 'SOLD_OUT']).default('ACTIVE'),
}).openapi('CreateTourInput');

export const updateTourSchema = createTourSchema.partial().openapi('UpdateTourInput');

export const createIncludedServiceSchema = z.object({
  name: localizedMapSchema,
  serviceType: z.enum(['TRAVEL', 'HOTEL']),
}).openapi('CreateIncludedServiceInput');

export const updateIncludedServiceSchema = createIncludedServiceSchema.partial().openapi('UpdateIncludedServiceInput');

export const includedServiceIdParamsSchema = z.object({
  id: z.string().min(1),
}).openapi('IncludedServiceIdParams');

export type ToursQuery = z.infer<typeof toursQuerySchema>;
export type CreateTourInput = z.infer<typeof createTourSchema>;
export type UpdateTourInput = z.infer<typeof updateTourSchema>;
export type CreateTravelCompanyInput = z.infer<typeof createTravelCompanySchema>;
export type UpdateTravelCompanyInput = z.infer<typeof updateTravelCompanySchema>;
export type CreateIncludedServiceInput = z.infer<typeof createIncludedServiceSchema>;
export type UpdateIncludedServiceInput = z.infer<typeof updateIncludedServiceSchema>;
