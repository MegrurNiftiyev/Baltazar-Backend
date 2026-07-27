import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import {
  carsQuerySchema,
  createCompanySchema,
  updateCompanySchema,
  createCarSchema,
  updateCarSchema,
} from './rentacar.schema.js';
import {
  getCompaniesController,
  getCompanyByIdController,
  createCompanyController,
  updateCompanyController,
  deleteCompanyController,
  getCarsController,
  getCarByIdController,
  createCarController,
  updateCarController,
  deleteCarController,
} from './rentacar.controller.js';

const router = Router();

// ── Public routes ──────────────────────────────────────────────────────

/**
 * @swagger
 * /api/rentacar/companies:
 *   get:
 *     tags: [RentACar]
 *     summary: Get all rent-a-car companies
 *     security: []
 *     responses:
 *       200: { description: List of companies }
 */
router.get('/companies', getCompaniesController);

/**
 * @swagger
 * /api/rentacar/companies/{id}:
 *   get:
 *     tags: [RentACar]
 *     summary: Get a rent-a-car company by ID
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
 * /api/rentacar/cars:
 *   get:
 *     tags: [RentACar]
 *     summary: List cars with filters
 *     security: []
 *     parameters:
 *       - in: query
 *         name: companyId
 *         schema: { type: string }
 *       - in: query
 *         name: minPrice
 *         schema: { type: number }
 *       - in: query
 *         name: maxPrice
 *         schema: { type: number }
 *       - in: query
 *         name: brand
 *         schema: { type: string }
 *       - in: query
 *         name: model
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: transmission
 *         schema: { type: string, enum: [AUTOMATIC, MANUAL] }
 *       - in: query
 *         name: fuelType
 *         schema: { type: string, enum: [PETROL, DIESEL, ELECTRIC, HYBRID] }
 *     responses:
 *       200: { description: List of cars (DTO — id, brand, model, price, image, rating) }
 */
router.get('/cars', validate({ query: carsQuerySchema }), getCarsController);

/**
 * @swagger
 * /api/rentacar/cars/{id}:
 *   get:
 *     tags: [RentACar]
 *     summary: Get full car details by ID
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Full car document }
 *       404: { description: Car not found }
 */
router.get('/cars/:id', getCarByIdController);

// ── Admin CRUD ────────────────────────────────────────────────────────

router.post(
  '/companies',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createCompanySchema }),
  createCompanyController,
);

router.put(
  '/companies/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateCompanySchema }),
  updateCompanyController,
);

router.delete('/companies/:id', requireAuth, requireRole('ADMIN'), deleteCompanyController);

router.post(
  '/cars',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createCarSchema }),
  createCarController,
);

router.put(
  '/cars/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateCarSchema }),
  updateCarController,
);

router.delete('/cars/:id', requireAuth, requireRole('ADMIN'), deleteCarController);

export default router;
