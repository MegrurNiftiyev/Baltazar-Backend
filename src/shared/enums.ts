import { z } from 'zod';

export const companyStatusEnum = z.enum(['ACTIVE', 'INACTIVE']);
export type CompanyStatus = z.infer<typeof companyStatusEnum>;

export const currencyEnum = z.enum(['AZN', 'USD', 'RUB']);
export type Currency = z.infer<typeof currencyEnum>;

export const regionEnum = z.enum(['AZ', 'US', 'RU']);
export type Region = z.infer<typeof regionEnum>;

export const REGION_CURRENCY_MAP: Record<Region, Currency> = {
  AZ: 'AZN',
  US: 'USD',
  RU: 'RUB',
};

export const companyDetailSectionEnum = z.enum(['ABOUT', 'GALLERY', 'ITEMS']);
export type CompanyDetailSection = z.infer<typeof companyDetailSectionEnum>;
