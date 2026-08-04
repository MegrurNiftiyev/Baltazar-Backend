import { z } from 'zod';

export const serviceTypeEnum = z.enum(['RENT_A_CAR', 'HOTEL', 'TRAVEL', 'FOOD']);
export type ServiceType = z.infer<typeof serviceTypeEnum>;
