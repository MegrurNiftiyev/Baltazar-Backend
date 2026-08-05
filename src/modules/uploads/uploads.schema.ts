import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const listUploadsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  cursor: z.string().optional(),
  status: z.enum(['pending', 'confirmed']).optional(),
}).openapi('ListUploadsQuery');

export type ListUploadsQuery = z.infer<typeof listUploadsQuerySchema>;
