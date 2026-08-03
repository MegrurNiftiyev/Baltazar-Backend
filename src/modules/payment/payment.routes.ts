import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { validate } from '../../middlewares/validate.js';
import { paymentLimiter } from '../../middlewares/rateLimiters.js';
import { paySchema } from './payment.schema.js';
import { payController } from './payment.controller.js';

const router = Router();

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
