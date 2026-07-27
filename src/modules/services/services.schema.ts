import { z } from 'zod';

const localizedMapSchema = z.object({
  az: z.string(),
  en: z.string(),
  ru: z.string(),
});

/** Admin: create/update a service */
export const createServiceSchema = z.object({
  key: z.string().min(1).max(50),
  name: localizedMapSchema,
  icon: z.string().min(1),
  order: z.coerce.number().int().min(0),
});

export const updateServiceSchema = createServiceSchema.partial();

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
