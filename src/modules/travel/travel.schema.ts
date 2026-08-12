import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { paginationQuerySchema } from '../../shared/pagination.js';


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
}).merge(paginationQuerySchema).openapi('ToursQuery');

export const includedServicesParamsSchema = z.object({
  serviceType: z.enum(['TRAVEL', 'HOTEL']),
}).openapi('IncludedServicesParams');

// ── Admin CRUD Schemas ─────────────────────────────────────────────────



export const createTourSchema = z.object({
  companyId: z.string().min(1),
  categories: z.array(z.string()).min(1),
  title: localizedMapSchema.optional(),
  name: localizedMapSchema.optional(),
  description: localizedMapSchema.optional(),
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

export type CreateIncludedServiceInput = z.infer<typeof createIncludedServiceSchema>;
export type UpdateIncludedServiceInput = z.infer<typeof updateIncludedServiceSchema>;
