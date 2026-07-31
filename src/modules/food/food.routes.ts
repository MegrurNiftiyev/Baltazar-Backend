import { Router } from 'express';
import { optionalAuth } from '../../middlewares/optionalAuth.js';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { upload } from '../../middlewares/upload.js';
import { parseJsonPayload } from '../../middlewares/parseJsonPayload.js';
import { resolveImageFields } from '../../middlewares/resolveImageFields.js';
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
 * /api/services/food/companies:
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
 * /api/services/food/companies/{id}:
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
router.get('/companies/:id', optionalAuth, getCompanyByIdController);

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
 * /api/services/food/companies:
 *   post:
 *     tags: [Food]
 *     summary: Create food company (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [data]
 *             properties:
 *               data:
 *                 type: string
 *                 description: JSON-stringified body matching CreateFoodCompanyInput (see components.schemas), minus the image fields below
 *               logo: { type: string, format: binary }
 *               images:
 *                 type: array
 *                 items: { type: string, format: binary }
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.post(
  '/companies',
  requireAuth,
  requireRole('ADMIN'),
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  parseJsonPayload,
  resolveImageFields('foodCompanies', [
    { field: 'logo', kind: 'single' },
    { field: 'images', kind: 'multi' },
  ]),
  validate({ body: createFoodCompanySchema }),
  createCompanyController,
);

/**
 * @swagger
 * /api/services/food/companies/{id}:
 *   put:
 *     tags: [Food]
 *     summary: Update food company (admin)
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [data]
 *             properties:
 *               data:
 *                 type: string
 *                 description: JSON-stringified body matching UpdateFoodCompanyInput (see components.schemas), minus the image fields below
 *               logo: { type: string, format: binary }
 *               images:
 *                 type: array
 *                 items: { type: string, format: binary }
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.put(
  '/companies/:id',
  requireAuth,
  requireRole('ADMIN'),
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  parseJsonPayload,
  resolveImageFields('foodCompanies', [
    { field: 'logo', kind: 'single' },
    { field: 'images', kind: 'multi' },
  ]),
  validate({ body: updateFoodCompanySchema }),
  updateCompanyController,
);

/**
 * @swagger
 * /api/services/food/companies/{id}:
 *   delete:
 *     tags: [Food]
 *     summary: Delete food company
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
router.delete('/companies/:id', requireAuth, requireRole('ADMIN'), deleteCompanyController);

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [data]
 *             properties:
 *               data:
 *                 type: string
 *                 description: JSON-stringified body matching CreateFoodItemInput (see components.schemas), minus the image fields below
 *               images:
 *                 type: array
 *                 items: { type: string, format: binary }
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.post(
  '/items',
  requireAuth,
  requireRole('ADMIN'),
  upload.fields([
    { name: 'images', maxCount: 10 },
  ]),
  parseJsonPayload,
  resolveImageFields('foodItems', [
    { field: 'images', kind: 'multi' },
  ]),
  validate({ body: createFoodItemSchema }),
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [data]
 *             properties:
 *               data:
 *                 type: string
 *                 description: JSON-stringified body matching UpdateFoodItemInput (see components.schemas), minus the image fields below
 *               images:
 *                 type: array
 *                 items: { type: string, format: binary }
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.put(
  '/items/:id',
  requireAuth,
  requireRole('ADMIN'),
  upload.fields([
    { name: 'images', maxCount: 10 },
  ]),
  parseJsonPayload,
  resolveImageFields('foodItems', [
    { field: 'images', kind: 'multi' },
  ]),
  validate({ body: updateFoodItemSchema }),
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

