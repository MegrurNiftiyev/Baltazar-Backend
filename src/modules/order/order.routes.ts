import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { createOrderSchema, updateOrderStatusSchema, orderQuerySchema, patchPaymentMethodSchema, patchDeliveryAddressSchema } from './order.schema.js';
import {
  createOrderController,
  getOrdersController,
  getOrderByIdController,
  getNextScreenController,
  patchPaymentMethodController,
  patchDeliveryAddressController,
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
 *       - in: query
 *         name: status
 *         schema: { type: string }
 *       - in: query
 *         name: userId
 *         schema: { type: string }
 *       - in: query
 *         name: serviceType
 *         schema: { type: string }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: cursor
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of user's orders }
 *       400: { description: Validation error }
 *       401: { description: Unauthorized }
 */
router.get('/', requireAuth, validate({ query: orderQuerySchema }), getOrdersController);

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
 * /api/orders/{id}/next-screen:
 *   get:
 *     tags: [Order]
 *     summary: Get the next screen and auto-fill user data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Next screen resolved }
 *       404: { description: Order not found }
 */
router.get('/:id/next-screen', requireAuth, getNextScreenController);

/**
 * @swagger
 * /api/orders/{id}/payment-method:
 *   patch:
 *     tags: [Order]
 *     summary: Set the payment method for an order
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
 *             $ref: '#/components/schemas/PatchPaymentMethodInput'
 *     responses:
 *       200: { description: Payment method updated }
 */
router.patch('/:id/payment-method', requireAuth, validate({ body: patchPaymentMethodSchema }), patchPaymentMethodController);

/**
 * @swagger
 * /api/orders/{id}/delivery-address:
 *   patch:
 *     tags: [Order]
 *     summary: Set the delivery address for a food order
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
 *             $ref: '#/components/schemas/PatchDeliveryAddressInput'
 *     responses:
 *       200: { description: Delivery address updated }
 */
router.patch('/:id/delivery-address', requireAuth, validate({ body: patchDeliveryAddressSchema }), patchDeliveryAddressController);

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
