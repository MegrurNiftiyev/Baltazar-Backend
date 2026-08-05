import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { serviceTypeEnum } from '../../shared/serviceType.js';

extendZodWithOpenApi(z);

export const createBannerSchema = z.object({
  serviceType: serviceTypeEnum,
  order: z.number().optional().default(1),
  isActive: z.boolean().optional().default(true),
  image: z.string().url(),
}).openapi('CreateBannerInput');

export const updateBannerSchema = createBannerSchema.partial().openapi('UpdateBannerInput');

export type CreateBannerInput = z.infer<typeof createBannerSchema>;
export type UpdateBannerInput = z.infer<typeof updateBannerSchema>;