import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { paginationQuerySchema } from '../../shared/pagination.js';
import { serviceTypeEnum } from '../../shared/serviceType.js';
import { companyStatusEnum, companyDetailSectionEnum } from '../../shared/enums.js';

extendZodWithOpenApi(z);

const localizedMapSchema = z.object({
  az: z.string(),
  en: z.string(),
  ru: z.string(),
});

export const createCompanySchema = z.object({
  name: localizedMapSchema,
  about: localizedMapSchema.optional(),
  serviceType: serviceTypeEnum,
  logo: z.string().url().optional(),
  profileImage: z.string().url().optional(),
  bannerImage: z.string().url().optional(),
  images: z.array(z.string().url()).max(10).optional(),
  address: z.string().optional(),
  status: companyStatusEnum.default('ACTIVE'),
  sectionOrder: z
    .array(companyDetailSectionEnum)
    .refine((arr) => new Set(arr).size === arr.length, {
      message: 'sectionOrder must not contain duplicate values',
    })
    .optional()
    .default(['ABOUT', 'GALLERY', 'ITEMS']),
  cuisineTypes: z.array(z.string()).optional(), // FOOD only
  relatedItemIds: z.array(z.string()).max(10).optional().default([]),
  order: z.number().int().min(0).optional().default(0),
}).openapi('CreateCompanyInput');


export const updateCompanySchema = createCompanySchema.partial().openapi('UpdateCompanyInput');

export const companiesQuerySchema = z.object({
  serviceType: serviceTypeEnum.optional(),
}).merge(paginationQuerySchema).openapi('CompaniesQuery');

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
export type CompaniesQuery = z.infer<typeof companiesQuerySchema>;
