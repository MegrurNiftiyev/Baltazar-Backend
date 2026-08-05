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

export const foodItemsQuerySchema = z.object({
  companyId: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  name: z.string().optional(),
}).merge(paginationQuerySchema).openapi('FoodItemsQuery');

// ── Admin CRUD Schemas ─────────────────────────────────────────────────



export const foodItemStatusEnum = z.enum(['AVAILABLE', 'OUT_OF_STOCK']);

export const createFoodItemSchema = z.object({
  companyId: z.string().min(1),
  name: localizedMapSchema,
  description: localizedMapSchema.optional(),
  category: z.string().min(1),
  price: z.number().min(0).max(50000), // AZN - sanity cap, adjust per business rules
  images: z.array(z.string().url()).max(10).openapi({ example: ['https://storage.googleapis.com/your-bucket/foodItems/2b6b1f1e-08c2-4a13-9a3f-3f6d0e7c9b1a.jpg'] }).optional(),
  ingredients: z.array(z.string()).optional(),
  status: foodItemStatusEnum.default('AVAILABLE'),
  calories: z.number().optional(),
  protein: z.number().optional(),
  fat: z.number().optional(),
  carb: z.number().optional(),
}).openapi('CreateFoodItemInput');

export const updateFoodItemSchema = createFoodItemSchema.partial().openapi('UpdateFoodItemInput');

export type FoodItemsQuery = z.infer<typeof foodItemsQuerySchema>;

export type CreateFoodItemInput = z.infer<typeof createFoodItemSchema>;
export type UpdateFoodItemInput = z.infer<typeof updateFoodItemSchema>;
