import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

/**
 * Register — no role field accepted. The service layer hardcodes role: 'USER'.
 */
export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).max(128),
  phone: z.string().min(7).max(20).optional(),
  region: z.string().min(1).max(10).optional(),
  language: z.enum(['az', 'en', 'ru']).optional().default('en'),
}).openapi('RegisterInput');

/**
 * Login — email + password.
 */
export const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1),
}).openapi('LoginInput');

/**
 * Refresh — requires the refresh token.
 */
export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
}).openapi('RefreshInput');

/**
 * Google OAuth — requires the Google ID token from the client.
 */
export const googleLoginSchema = z.object({
  idToken: z.string().min(1),
}).openapi('GoogleLoginInput');

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
export type GoogleLoginInput = z.infer<typeof googleLoginSchema>;
