import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const createBannerSchema = z.object({
  link: z.string().min(1),
  order: z.number(),
  isActive: z.boolean().optional().default(true),
  image: z.string().url(),
}).openapi('CreateBannerInput');

export const updateBannerSchema = createBannerSchema.partial().openapi('UpdateBannerInput');

export type CreateBannerInput = z.infer<typeof createBannerSchema>;
export type UpdateBannerInput = z.infer<typeof updateBannerSchema>;