import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import {
  addAdminSchema,
  updateFlowboxStatusSchema,
  adminFlowboxQuerySchema,
  adminTransactionQuerySchema,
} from './admin.schema.js';
import {
  addAdminController,
  getAllFlowboxesController,
  getFlowboxByIdController,
  updateFlowboxStatusController,
  getAllTransactionsController,
  getAllReviewsController,
  deleteReviewController,
} from './admin.controller.js';

const router = Router();

// All admin routes require auth + ADMIN role
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
 *       403: { description: Forbidden — caller is not an admin }
 *       404: { description: User not found }
 */
router.post('/users/add-admin', validate({ body: addAdminSchema }), addAdminController);

/**
 * @swagger
 * /api/admin/flowboxes:
 *   get:
 *     tags: [Admin]
 *     summary: Get all flowboxes (admin view)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [PENDING, AWAITING_PAYMENT, CONFIRMED, CANCELLED, EXPIRED] }
 *       - in: query
 *         name: userId
 *         schema: { type: string }
 *       - in: query
 *         name: serviceType
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of flowboxes }
 */
router.get('/flowboxes', validate({ query: adminFlowboxQuerySchema }), getAllFlowboxesController);

/**
 * @swagger
 * /api/admin/flowboxes/{id}:
 *   get:
 *     tags: [Admin]
 *     summary: Get a single flowbox by ID (admin view)
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
router.get('/flowboxes/:id', getFlowboxByIdController);

/**
 * @swagger
 * /api/admin/flowboxes/{id}/status:
 *   put:
 *     tags: [Admin]
 *     summary: Update flowbox status
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
 *               status: { type: string, enum: [PENDING, AWAITING_PAYMENT, CONFIRMED, CANCELLED, EXPIRED] }
 *     responses:
 *       200: { description: Status updated }
 *       404: { description: FlowBox not found }
 */
router.put(
  '/flowboxes/:id/status',
  validate({ body: updateFlowboxStatusSchema }),
  updateFlowboxStatusController,
);

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
router.get(
  '/transactions',
  validate({ query: adminTransactionQuerySchema }),
  getAllTransactionsController,
);

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
