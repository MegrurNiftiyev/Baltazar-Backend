import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const appConfigSchema = z.object({
  latestVersion: z.string().min(1),
  minSupportedVersion: z.string().min(1),
  updateNotes: z.object({ az: z.string(), en: z.string(), ru: z.string() }).optional(),
}).openapi('AppConfigInput');

export type AppConfigInput = z.infer<typeof appConfigSchema>;
