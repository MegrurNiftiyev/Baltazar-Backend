import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import {
  foodItemsQuerySchema,
  createFoodCompanySchema,
  updateFoodCompanySchema,
  createFoodItemSchema,
  updateFoodItemSchema,
} from './food.schema.js';
import {
  getCompaniesController,
  getCompanyByIdController,
  createCompanyController,
  updateCompanyController,
  deleteCompanyController,
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
 * /api/food/companies:
 *   get:
 *     tags: [Food]
 *     summary: Get all food companies
 *     security: []
 *     responses:
 *       200: { description: List of food companies }
 */
router.get('/companies', getCompaniesController);

/**
 * @swagger
 * /api/food/companies/{id}:
 *   get:
 *     tags: [Food]
 *     summary: Get a food company by ID
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Company details }
 *       404: { description: Company not found }
 */
router.get('/companies/:id', getCompanyByIdController);

/**
 * @swagger
 * /api/food/items:
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
 *     responses:
 *       200: { description: List of food items }
 */
router.get('/items', validate({ query: foodItemsQuerySchema }), getFoodItemsController);

/**
 * @swagger
 * /api/food/items/{id}:
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
router.get('/items/:id', getFoodItemByIdController);

// ── Admin CRUD — Companies ────────────────────────────────────────────

router.post(
  '/companies',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createFoodCompanySchema }),
  createCompanyController,
);

router.put(
  '/companies/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateFoodCompanySchema }),
  updateCompanyController,
);

router.delete('/companies/:id', requireAuth, requireRole('ADMIN'), deleteCompanyController);

// ── Admin CRUD — Food Items ──────────────────────────────────────────

router.post(
  '/items',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createFoodItemSchema }),
  createFoodItemController,
);

router.put(
  '/items/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateFoodItemSchema }),
  updateFoodItemController,
);

router.delete('/items/:id', requireAuth, requireRole('ADMIN'), deleteFoodItemController);

export default router;
