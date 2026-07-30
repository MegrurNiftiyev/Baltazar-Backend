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
 *             $ref: '#/components/schemas/CreateReviewInput'
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

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     tags: [Reviews]
 *     summary: Get a review by ID
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Review details }
 *       404: { description: Review not found }
 *   put:
 *     tags: [Reviews]
 *     summary: Update the authenticated user's review
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
 *             $ref: '#/components/schemas/UpdateReviewInput'
 *     responses:
 *       200: { description: Review updated }
 *       403: { description: Forbidden }
 *   delete:
 *     tags: [Reviews]
 *     summary: Delete the authenticated user's review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Review deleted }
 *       403: { description: Forbidden }
 */
router.get('/:id', getReviewByIdController);
router.put('/:id', requireAuth, validate({ body: updateReviewSchema }), updateReviewController);
router.delete('/:id', requireAuth, deleteReviewController);

export default router;
