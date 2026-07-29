import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { validate } from '../../middlewares/validate.js';
import { createOrderSchema, advanceStepSchema } from './order.schema.js';
import {
  createOrderController,
  getUserOrdersController,
  getOrderByIdController,
  advanceStepController,
  cancelOrderController,
  getPaymentSummaryController,
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
 *             type: object
 *             properties:
 *               serviceType: { type: string, enum: [RENT_A_CAR, TRAVEL, HOTEL_ROOM, FOOD] }
 *               serviceId: { type: string }
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
router.get('/', requireAuth, getUserOrdersController);

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
 *             type: object
 *             properties:
 *               screen: { type: string }
 *               data: { type: object }
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

export default router;
