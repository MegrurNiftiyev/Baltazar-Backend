import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import {
  addAdminSchema,
  updateOrderStatusSchema,
  adminOrderQuerySchema,
  adminTransactionQuerySchema,
} from './admin.schema.js';
import {
  addAdminController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
  getAllTransactionsController,
  getAllReviewsController,
  deleteReviewController,
  disableUserController,
} from './admin.controller.js';

const router = Router();

router.use(requireAuth, requireRole('ADMIN'));

/**
 * @swagger
 * /api/admin/users/add-admin:
 *   post:
 *     tags: [Admin]
 *     summary: Promote a user to ADMIN role
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId]
 *             properties:
 *               userId: { type: string }
 *     responses:
 *       200: { description: User promoted }
 *       403: { description: Forbidden, caller is not an admin }
 *       404: { description: User not found }
 */
router.post('/users/add-admin', validate({ body: addAdminSchema }), addAdminController);

/**
 * @swagger
 * /api/admin/users/{id}/disable:
 *   put:
 *     tags: [Admin]
 *     summary: Revoke all sessions for a user (disable/ban action)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Refresh token revoked immediately; any still-valid access token (up to 15 min) keeps working until natural expiry }
 *       404: { description: User not found }
 */
router.put('/users/:id/disable', disableUserController);

/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     tags: [Admin]
 *     summary: Get all orders (admin view)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [PENDING, AWAITING_PAYMENT, PROCESSING, CONFIRMED, CANCELLED, EXPIRED] }
 *       - in: query
 *         name: userId
 *         schema: { type: string }
 *       - in: query
 *         name: serviceType
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of orders }
 */
router.get('/orders', validate({ query: adminOrderQuerySchema }), getAllOrdersController);

/**
 * @swagger
 * /api/admin/orders/{id}:
 *   get:
 *     tags: [Admin]
 *     summary: Get a single order by ID (admin view)
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
router.get('/orders/:id', getOrderByIdController);

/**
 * @swagger
 * /api/admin/orders/{id}/status:
 *   put:
 *     tags: [Admin]
 *     summary: Update order status
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
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [PENDING, AWAITING_PAYMENT, PROCESSING, CONFIRMED, CANCELLED, EXPIRED] }
 *     responses:
 *       200: { description: Status updated }
 *       404: { description: Order not found }
 */
router.put('/orders/:id/status', validate({ body: updateOrderStatusSchema }), updateOrderStatusController);

/**
 * @swagger
 * /api/admin/transactions:
 *   get:
 *     tags: [Admin]
 *     summary: Get all transactions (admin view)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [SUCCESS, FAILED, PENDING] }
 *       - in: query
 *         name: userId
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of transactions }
 */
router.get('/transactions', validate({ query: adminTransactionQuerySchema }), getAllTransactionsController);

/**
 * @swagger
 * /api/admin/reviews:
 *   get:
 *     tags: [Admin]
 *     summary: Get all reviews (admin moderation view)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of reviews }
 */
router.get('/reviews', getAllReviewsController);

/**
 * @swagger
 * /api/admin/reviews/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete a review (admin moderation)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Review deleted }
 *       404: { description: Review not found }
 */
router.delete('/reviews/:id', deleteReviewController);

export default router;

