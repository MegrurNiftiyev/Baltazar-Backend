import { z } from 'zod';

// ── FlowBox creation ──────────────────────────────────────────────────

export const createFlowBoxSchema = z.object({
  serviceType: z.enum(['RENT_A_CAR', 'TRAVEL', 'HOTEL', 'FOOD']),
  serviceId: z.string().min(1),
});

// ── Step advancement ──────────────────────────────────────────────────

export const advanceStepSchema = z.object({
  screen: z.string().min(1),
  data: z.record(z.unknown()),
});

// ── FlowScreen config (admin) ─────────────────────────────────────────

export const flowScreenConfigSchema = z.object({
  screens: z.array(
    z.object({
      screenId: z.string().min(1),
      title: z.object({
        az: z.string(),
        en: z.string(),
        ru: z.string(),
      }),
      fields: z.array(
        z.object({
          name: z.string(),
          type: z.enum(['text', 'number', 'date', 'select', 'multi-select', 'boolean']),
          required: z.boolean().default(true),
          options: z.array(z.string()).optional(),
        }),
      ),
      order: z.number().int().min(0),
    }),
  ),
});

export const serviceTypeParamsSchema = z.object({
  serviceType: z.enum(['RENT_A_CAR', 'TRAVEL', 'HOTEL', 'FOOD']),
});

export type CreateFlowBoxInput = z.infer<typeof createFlowBoxSchema>;
export type AdvanceStepInput = z.infer<typeof advanceStepSchema>;
export type FlowScreenConfigInput = z.infer<typeof flowScreenConfigSchema>;
