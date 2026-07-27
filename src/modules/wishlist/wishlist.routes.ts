import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { validate } from '../../middlewares/validate.js';
import { addToWishlistSchema } from './wishlist.schema.js';
import {
  getWishlistController,
  addToWishlistController,
  removeFromWishlistController,
} from './wishlist.controller.js';

const router = Router();

/**
 * @swagger
 * /api/user/wishlist:
 *   get:
 *     tags: [Wishlist]
 *     summary: Get the authenticated user's wishlist
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of wishlisted services with full details }
 */
router.get('/wishlist', requireAuth, getWishlistController);

/**
 * @swagger
 * /api/user/wishlist:
 *   post:
 *     tags: [Wishlist]
 *     summary: Add a service to wishlist
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [serviceId, serviceType]
 *             properties:
 *               serviceId: { type: string }
 *               serviceType: { type: string, enum: [RENT_A_CAR, TRAVEL, HOTEL, FOOD] }
 *     responses:
 *       201: { description: Added to wishlist }
 *       409: { description: Already in wishlist }
 */
router.post(
  '/wishlist',
  requireAuth,
  validate({ body: addToWishlistSchema }),
  addToWishlistController,
);

/**
 * @swagger
 * /api/user/wishlist/{id}:
 *   delete:
 *     tags: [Wishlist]
 *     summary: Remove a service from wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Wishlist item ID (format serviceType_serviceId)
 *         schema: { type: string }
 *     responses:
 *       200: { description: Removed from wishlist }
 */
router.delete('/wishlist/:id', requireAuth, removeFromWishlistController);

export default router;
