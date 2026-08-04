import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { validate } from '../../middlewares/validate.js';
import { addToWishlistSchema, wishlistQuerySchema } from './wishlist.schema.js';
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
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: cursor
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of wishlisted services with full details }
 *       401: { description: Unauthorized }
 *       400: { description: Validation error }
 */
router.get('/wishlist', requireAuth, validate({ query: wishlistQuerySchema }), getWishlistController);

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
 *             $ref: '#/components/schemas/AddToWishlistInput'
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
