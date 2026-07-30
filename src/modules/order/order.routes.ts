import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { createOrderSchema, advanceStepSchema, updateOrderStatusSchema } from './order.schema.js';
import {
  createOrderController,
  getOrdersController,
  getOrderByIdController,
  advanceStepController,
  cancelOrderController,
  getPaymentSummaryController,
  updateOrderStatusController,
} from './order.controller.js';

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags: [Order]
 *     summary: Create a new Order (start a booking flow)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderInput'
 *     responses:
 *       201: { description: Order created }
 */
router.post('/', requireAuth, validate({ body: createOrderSchema }), createOrderController);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags: [Order]
 *     summary: Get all orders for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of user's orders }
 */
router.get('/', requireAuth, getOrdersController);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags: [Order]
 *     summary: Get a specific order by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Order details }
 *       404: { description: Order not found }
 */
router.get('/:id', requireAuth, getOrderByIdController);

/**
 * @swagger
 * /api/orders/{id}/step:
 *   put:
 *     tags: [Order]
 *     summary: Advance order to next step
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
 *             $ref: '#/components/schemas/AdvanceOrderStepInput'
 *     responses:
 *       200: { description: Step advanced, returns next step info }
 */
router.put('/:id/step', requireAuth, validate({ body: advanceStepSchema }), advanceStepController);

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   put:
 *     tags: [Order]
 *     summary: Cancel an order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Order cancelled }
 */
router.put('/:id/cancel', requireAuth, cancelOrderController);

/**
 * @swagger
 * /api/orders/{id}/payment-summary:
 *   get:
 *     tags: [Order]
 *     summary: Get payment summary for an order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Payment summary with transaction history }
 */
router.get('/:id/payment-summary', requireAuth, getPaymentSummaryController);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     tags: [Order]
 *     summary: Update order status (Admin only)
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
 *             $ref: '#/components/schemas/UpdateOrderStatusInput'
 *     responses:
 *       200: { description: Status updated }
 *       404: { description: Order not found }
 */
router.put('/:id/status', requireAuth, requireRole('ADMIN'), validate({ body: updateOrderStatusSchema }), updateOrderStatusController);

export default router;
