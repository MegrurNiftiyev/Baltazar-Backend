import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),

  // JWT — minimum 32 characters for security
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),

  // Firebase Admin SDK
  FIREBASE_PROJECT_ID: z.string().min(1),
  FIREBASE_CLIENT_EMAIL: z.string().min(1),
  FIREBASE_PRIVATE_KEY: z.string().min(1),
  FIREBASE_STORAGE_BUCKET: z.string().min(1),

  // CORS — comma-separated origin whitelist
  CORS_ORIGIN: z.string().min(1),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1),

  // Payment Gateway Simulator
  PAYMENT_GATEWAY_URL: z.string().url().default('http://localhost:4000'),
});

/**
 * Validated environment variables.
 * The app will fail to start (not silently run with undefined values)
 * if any required env var is missing or malformed.
 */
export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
