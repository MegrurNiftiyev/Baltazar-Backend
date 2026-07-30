import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import {
  addAdminSchema,
  adminTransactionQuerySchema,
} from './admin.schema.js';
import {
  addAdminController,
  getAllTransactionsController,
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
 *             $ref: '#/components/schemas/AddAdminInput'
 *     responses:
 *       200: { description: User promoted }
 *       403: { description: Forbidden, caller is not an admin }
 *       404: { description: User not found }
 */
router.post('/users/add-admin', validate({ body: addAdminSchema }), addAdminController);

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

export default router;
