import { Router } from 'express';
import { optionalAuth } from '../../middlewares/optionalAuth.js';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { validateImageReferences } from '../../middlewares/validateImageReferences.js';
import {
  foodItemsQuerySchema,
  createFoodItemSchema,
  updateFoodItemSchema,
} from './food.schema.js';
import {
  getFoodItemsController,
  getFoodItemByIdController,
  createFoodItemController,
  updateFoodItemController,
  deleteFoodItemController,
} from './food.controller.js';

const router = Router();

// ── Public routes ──────────────────────────────────────────────────────



/**
 * @swagger
 * /api/services/food/items:
 *   get:
 *     tags: [Food]
 *     summary: List food items with filters
 *     security: []
 *     parameters:
 *       - in: query
 *         name: companyId
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: minPrice
 *         schema: { type: number }
 *       - in: query
 *         name: maxPrice
 *         schema: { type: number }
 *       - in: query
 *         name: name
 *         schema: { type: string }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: cursor
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of food items }
 */
router.get('/items', validate({ query: foodItemsQuerySchema }), getFoodItemsController);

/**
 * @swagger
 * /api/services/food/items/{id}:
 *   get:
 *     tags: [Food]
 *     summary: Get food item details by ID
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Food item details }
 *       404: { description: Food item not found }
 */
router.get('/items/:id', optionalAuth, getFoodItemByIdController);

// Admin CRUD



/**
 * @swagger
 * /api/services/food/items:
 *   post:
 *     tags: [Food]
 *     summary: Create food item (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFoodItemInput'
 *     responses:
 *       201: { description: Success }
 *       403: { description: Forbidden, admin only, or unowned image }
 *       404: { description: Referenced image not found }
 */
router.post(
  '/items',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createFoodItemSchema }),
  validateImageReferences([
    { bodyField: 'images', kind: 'multi' },
  ]),
  createFoodItemController,
);

/**
 * @swagger
 * /api/services/food/items/{id}:
 *   put:
 *     tags: [Food]
 *     summary: Update food item (admin)
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
 *             $ref: '#/components/schemas/UpdateFoodItemInput'
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only, or unowned image }
 *       404: { description: Referenced image not found }
 */
router.put(
  '/items/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateFoodItemSchema }),
  validateImageReferences([
    { bodyField: 'images', kind: 'multi' },
  ]),
  updateFoodItemController,
);

/**
 * @swagger
 * /api/services/food/items/{id}:
 *   delete:
 *     tags: [Food]
 *     summary: Delete food item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 *       409: { description: Has active bookings }
 */
router.delete('/items/:id', requireAuth, requireRole('ADMIN'), deleteFoodItemController);

export default router;
