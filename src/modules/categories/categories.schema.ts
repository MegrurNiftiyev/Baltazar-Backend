import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { serviceTypeEnum } from '../../shared/serviceType.js';

extendZodWithOpenApi(z);

const localizedMapSchema = z.object({
  az: z.string(),
  en: z.string(),
  ru: z.string(),
});

export const categoriesQuerySchema = z.object({
  serviceType: serviceTypeEnum.optional(),
}).openapi('CategoriesQuery');

export const createCategorySchema = z.object({
  name: localizedMapSchema,
  serviceType: serviceTypeEnum,
}).openapi('CreateCategoryInput');

export const updateCategorySchema = createCategorySchema.partial().openapi('UpdateCategoryInput');

export type CategoriesQuery = z.infer<typeof categoriesQuerySchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
