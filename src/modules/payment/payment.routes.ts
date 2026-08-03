import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { validate } from '../../middlewares/validate.js';
import { paymentLimiter } from '../../middlewares/rateLimiters.js';
import { addCardSchema, paySchema } from './payment.schema.js';
import { getAllCardsController, addCardController, payController } from './payment.controller.js';

const router = Router();

/**
 * @swagger
 * /api/payment/all-cards:
 *   get:
 *     tags: [Payment]
 *     summary: Get all saved payment methods
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of saved cards }
 */
router.get('/all-cards', requireAuth, getAllCardsController);

/**
 * @swagger
 * /api/payment/add-card:
 *   post:
 *     tags: [Payment]
 *     summary: Add a payment card (tokenized via external gateway)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddCardInput'
 *     responses:
 *       201: { description: Card added }
 */
router.post(
  '/add-card',
  requireAuth,
  paymentLimiter,
  validate({ body: addCardSchema }),
  addCardController,
);

/**
 * @swagger
 * /api/payment/pay/{orderId}:
 *   post:
 *     tags: [Payment]
 *     summary: Process payment for an order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayInput'
 *     responses:
 *       200: { description: Payment result }
 */
router.post('/pay/:orderId', requireAuth, paymentLimiter, validate({ body: paySchema }), payController);

export default router;
