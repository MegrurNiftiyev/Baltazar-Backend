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
  logo: z.string().url().openapi({ example: 'https://storage.googleapis.com/your-bucket/foodCompanies/8f14e45f-ceea-4c9e-8bd7-1e4a0f5b1a2c.jpg' }).optional(),
  images: z.array(z.string().url()).max(10).openapi({ example: ['https://storage.googleapis.com/your-bucket/foodCompanies/2b6b1f1e-08c2-4a13-9a3f-3f6d0e7c9b1a.jpg'] }).optional(),
  cuisineTypes: z.array(z.string()).optional(),
  address: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
}).openapi('CreateFoodCompanyInput');

export const updateFoodCompanySchema = createFoodCompanySchema.partial().openapi('UpdateFoodCompanyInput');

export const createFoodItemSchema = z.object({
  companyId: z.string().min(1),
  name: localizedMapSchema,
  description: localizedMapSchema.optional(),
  category: z.string().min(1),
  price: z.number().min(0).max(50000), // AZN - sanity cap, adjust per business rules
  images: z.array(z.string().url()).max(10).openapi({ example: ['https://storage.googleapis.com/your-bucket/foodItems/2b6b1f1e-08c2-4a13-9a3f-3f6d0e7c9b1a.jpg'] }).optional(),
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
