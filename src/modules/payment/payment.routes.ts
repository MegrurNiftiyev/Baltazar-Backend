import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { validate } from '../../middlewares/validate.js';
import { paymentLimiter } from '../../middlewares/rateLimiters.js';
import { addCardSchema, paySchema } from './payment.schema.js';
import {
  getAllCardsController,
  addCardController,
  payController,
  getPaymentSummaryController,
} from './payment.controller.js';

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
 *       200: { description: List of saved cards (last4, brand only) }
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
 *             type: object
 *             required: [cardNumber, expiryMonth, expiryYear, cvv, cardholderName]
 *             properties:
 *               cardNumber: { type: string }
 *               expiryMonth: { type: integer }
 *               expiryYear: { type: integer }
 *               cvv: { type: string }
 *               cardholderName: { type: string }
 *     responses:
 *       201: { description: Card added (returns last4 and brand only) }
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
 * /api/payment/pay:
 *   post:
 *     tags: [Payment]
 *     summary: Process payment for a FlowBox
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [flowBoxId, paymentMethodId]
 *             properties:
 *               flowBoxId: { type: string }
 *               paymentMethodId: { type: string }
 *     responses:
 *       200: { description: Payment result }
 */
router.post(
  '/pay',
  requireAuth,
  paymentLimiter,
  validate({ body: paySchema }),
  payController,
);

/**
 * @swagger
 * /api/payment/{id}/summary:
 *   get:
 *     tags: [Payment]
 *     summary: Get payment summary for a FlowBox
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
router.get('/:id/summary', requireAuth, getPaymentSummaryController);

export default router;
