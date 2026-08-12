import { z } from 'zod';
import { serviceTypeEnum } from '../serviceType.js';

export const localizedMapSchema = z.object({
  az: z.string(),
  en: z.string(),
  ru: z.string(),
});

export const exploreCardSchema = z.object({
  id: z.string(),
  serviceType: serviceTypeEnum,
  serviceId: z.string(),
  title: z.union([z.string(), localizedMapSchema]),
  image: z.string(),
  price: z.number(),
  priceSuffix: z.string(),
  currency: z.string().default('AZN'),
  rating: z.number().default(0),
  ratingCount: z.number().default(0),
  category: z.union([z.string(), localizedMapSchema]).optional(),
});

export type ExploreCardDTO = z.infer<typeof exploreCardSchema>;

export const exploreSectionSchema = z.object({
  serviceType: serviceTypeEnum,
  title: z.union([z.string(), localizedMapSchema]),
  order: z.number(),
  items: z.array(exploreCardSchema),
});

export type ExploreSectionDTO = z.infer<typeof exploreSectionSchema>;
