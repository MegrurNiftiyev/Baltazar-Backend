import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

const localizedMapSchema = z.object({
  az: z.string(),
  en: z.string(),
  ru: z.string(),
});

// ── Query Schemas ──────────────────────────────────────────────────────

export const foodItemsQuerySchema = z.object({
  companyId: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  name: z.string().optional(),
}).openapi('FoodItemsQuery');

// ── Admin CRUD Schemas ─────────────────────────────────────────────────

export const createFoodCompanySchema = z.object({
  name: localizedMapSchema,
  about: localizedMapSchema.optional(),
  serviceType: z.literal('FOOD').default('FOOD'),
  logo: z.string().optional(),
  images: z.array(z.string()).optional(),
  cuisineTypes: z.array(z.string()).optional(),
  address: z.string().optional(),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
}).openapi('CreateFoodCompanyInput');

export const updateFoodCompanySchema = createFoodCompanySchema.partial().openapi('UpdateFoodCompanyInput');

export const createFoodItemSchema = z.object({
  companyId: z.string().min(1),
  name: localizedMapSchema,
  description: localizedMapSchema.optional(),
  category: z.string().min(1),
  price: z.number().min(0).max(50000), // AZN - sanity cap, adjust per business rules
  images: z.array(z.string()).optional(),
  ingredients: z.array(z.string()).optional(),
  status: z.enum(['AVAILABLE', 'OUT_OF_STOCK']).default('AVAILABLE'),
  calories: z.number().optional(),
  protein: z.number().optional(),
  fat: z.number().optional(),
  carb: z.number().optional(),
}).openapi('CreateFoodItemInput');

export const updateFoodItemSchema = createFoodItemSchema.partial().openapi('UpdateFoodItemInput');

export type FoodItemsQuery = z.infer<typeof foodItemsQuerySchema>;
export type CreateFoodCompanyInput = z.infer<typeof createFoodCompanySchema>;
export type UpdateFoodCompanyInput = z.infer<typeof updateFoodCompanySchema>;
export type CreateFoodItemInput = z.infer<typeof createFoodItemSchema>;
export type UpdateFoodItemInput = z.infer<typeof updateFoodItemSchema>;
