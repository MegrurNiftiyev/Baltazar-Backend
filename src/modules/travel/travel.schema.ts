import { z } from 'zod';

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
});

export const includedServicesParamsSchema = z.object({
  serviceType: z.enum(['TRAVEL', 'HOTEL']),
});

// ── Admin CRUD Schemas ─────────────────────────────────────────────────

export const createTravelCompanySchema = z.object({
  name: localizedMapSchema,
  about: localizedMapSchema.optional(),
  serviceType: z.literal('TRAVEL').default('TRAVEL'),
  sectionsOrder: z.array(z.string()).optional(),
  profileImage: z.string().url().optional(),
  bannerImage: z.string().url().optional(),
  images: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
});

export const updateTravelCompanySchema = createTravelCompanySchema.partial();

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
  images: z.array(z.string()).min(1),
  duration: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  includedServices: z.array(z.string()).optional(),
  price: z.number().min(0).max(50000), // AZN - sanity cap, adjust per business rules
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SOLD_OUT']).default('ACTIVE'),
});

export const updateTourSchema = createTourSchema.partial();

export const createIncludedServiceSchema = z.object({
  name: localizedMapSchema,
  icon: z.string().optional(),
  serviceType: z.enum(['TRAVEL', 'HOTEL']),
});

export const updateIncludedServiceSchema = createIncludedServiceSchema.partial();

export const includedServiceIdParamsSchema = z.object({
  id: z.string().min(1),
});

export type ToursQuery = z.infer<typeof toursQuerySchema>;
export type CreateTourInput = z.infer<typeof createTourSchema>;
export type UpdateTourInput = z.infer<typeof updateTourSchema>;
export type CreateTravelCompanyInput = z.infer<typeof createTravelCompanySchema>;
export type UpdateTravelCompanyInput = z.infer<typeof updateTravelCompanySchema>;
export type CreateIncludedServiceInput = z.infer<typeof createIncludedServiceSchema>;
export type UpdateIncludedServiceInput = z.infer<typeof updateIncludedServiceSchema>;
