import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { optionalAuth } from '../../middlewares/optionalAuth.js';
import { validate } from '../../middlewares/validate.js';
import { createReviewSchema, reviewQuerySchema, updateReviewSchema } from './reviews.schema.js';
import {
  getReviewsController,
  createReviewController,
  getReviewByIdController,
  updateReviewController,
  deleteReviewController,
} from './reviews.controller.js';

const router = Router();

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     tags: [Reviews]
 *     summary: Get reviews for a target (public)
 *     security: []
 *     parameters:
 *       - in: query
 *         name: targetType
 *         required: false
 *         schema: { type: string, enum: [RENT_A_CAR, TRAVEL, HOTEL, FOOD, COMPANY] }
 *       - in: query
 *         name: targetId
 *         required: false
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of reviews }
 */
router.get('/', optionalAuth, validate({ query: reviewQuerySchema }), getReviewsController);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     tags: [Reviews]
 *     summary: Create a review (requires a confirmed order)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [targetType, targetId, rating, comment]
 *             properties:
 *               targetType: { type: string, enum: [RENT_A_CAR, TRAVEL, HOTEL, FOOD, COMPANY] }
 *               targetId: { type: string }
 *               rating: { type: integer, minimum: 1, maximum: 5 }
 *               comment: { type: string }
 *     responses:
 *       201: { description: Review created }
 *       403: { description: Not eligible to review }
 */
router.post(
  '/',
  requireAuth,
  validate({ body: createReviewSchema }),
  createReviewController,
);

router.get('/:id', getReviewByIdController);
router.put('/:id', requireAuth, validate({ body: updateReviewSchema }), updateReviewController);
router.delete('/:id', requireAuth, deleteReviewController);

export default router;
