import { z } from 'zod';

export const languageEnum = z.enum(['az', 'en', 'ru']);
export type Language = z.infer<typeof languageEnum>;
