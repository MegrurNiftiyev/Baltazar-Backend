import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const bannerSchema = z.object({
  link: z.string().min(1),
  order: z.coerce.number(),
  isActive: z.preprocess(
    (val) => val === 'true' || val === true || val === '1',
    z.boolean()
  ).optional().default(true),
  image: z.string().optional(),
}).openapi('BannerInput');

export type BannerInput = z.infer<typeof bannerSchema>;
