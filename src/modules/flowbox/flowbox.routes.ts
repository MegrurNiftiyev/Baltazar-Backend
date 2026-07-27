import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import {
  createFlowBoxSchema,
  advanceStepSchema,
  flowScreenConfigSchema,
  serviceTypeParamsSchema,
} from './flowbox.schema.js';
import {
  createFlowBoxController,
  getUserFlowBoxesController,
  getFlowBoxByIdController,
  advanceStepController,
  cancelFlowBoxController,
  getFlowScreenConfigController,
  updateFlowScreenConfigController,
} from './flowbox.controller.js';

const router = Router();

// ── User flow routes ──────────────────────────────────────────────────

/**
 * @swagger
 * /api/flowboxes:
 *   post:
 *     tags: [FlowBox]
 *     summary: Create a new FlowBox (start a booking flow)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceType: { type: string, enum: [RENT_A_CAR, TRAVEL, HOTEL, FOOD] }
 *               serviceId: { type: string }
 *     responses:
 *       201: { description: FlowBox created }
 */
router.post(
  '/',
  requireAuth,
  validate({ body: createFlowBoxSchema }),
  createFlowBoxController,
);

/**
 * @swagger
 * /api/flowboxes:
 *   get:
 *     tags: [FlowBox]
 *     summary: Get all FlowBoxes for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of user's FlowBoxes }
 */
router.get('/', requireAuth, getUserFlowBoxesController);

/**
 * @swagger
 * /api/flowboxes/{id}:
 *   get:
 *     tags: [FlowBox]
 *     summary: Get a specific FlowBox by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: FlowBox details }
 *       404: { description: FlowBox not found }
 */
router.get('/:id', requireAuth, getFlowBoxByIdController);

/**
 * @swagger
 * /api/flowboxes/{id}/step:
 *   put:
 *     tags: [FlowBox]
 *     summary: Advance FlowBox to next step
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               screen: { type: string }
 *               data: { type: object }
 *     responses:
 *       200: { description: Step advanced, returns next step info }
 */
router.put(
  '/:id/step',
  requireAuth,
  validate({ body: advanceStepSchema }),
  advanceStepController,
);

/**
 * @swagger
 * /api/flowboxes/{id}/cancel:
 *   put:
 *     tags: [FlowBox]
 *     summary: Cancel a FlowBox
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: FlowBox cancelled }
 */
router.put('/:id/cancel', requireAuth, cancelFlowBoxController);

// ── Admin: Flow Screen Config ─────────────────────────────────────────

/**
 * @swagger
 * /api/flowboxes/flow-screens/{serviceType}:
 *   get:
 *     tags: [FlowBox]
 *     summary: Get flow screen configuration for a service type (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: serviceType
 *         required: true
 *         schema: { type: string, enum: [RENT_A_CAR, TRAVEL, HOTEL, FOOD] }
 *     responses:
 *       200: { description: Flow screen configuration }
 */
router.get(
  '/flow-screens/:serviceType',
  requireAuth,
  requireRole('ADMIN'),
  validate({ params: serviceTypeParamsSchema }),
  getFlowScreenConfigController,
);

/**
 * @swagger
 * /api/flowboxes/flow-screens/{serviceType}:
 *   put:
 *     tags: [FlowBox]
 *     summary: Update flow screen configuration for a service type (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: serviceType
 *         required: true
 *         schema: { type: string, enum: [RENT_A_CAR, TRAVEL, HOTEL, FOOD] }
 *     responses:
 *       200: { description: Updated flow screen configuration }
 */
router.put(
  '/flow-screens/:serviceType',
  requireAuth,
  requireRole('ADMIN'),
  validate({ params: serviceTypeParamsSchema, body: flowScreenConfigSchema }),
  updateFlowScreenConfigController,
);

export default router;
