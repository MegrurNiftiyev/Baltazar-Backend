import { Router } from 'express';
import { optionalAuth } from '../../middlewares/optionalAuth.js';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { upload } from '../../middlewares/upload.js';
import { parseJsonPayload } from '../../middlewares/parseJsonPayload.js';
import { resolveImageFields } from '../../middlewares/resolveImageFields.js';
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
 * /api/services/rentacar/companies:
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
 * /api/services/rentacar/companies/{id}:
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
router.get('/companies/:id', optionalAuth, getCompanyByIdController);

/**
 * @swagger
 * /api/services/rentacar/cars:
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
 * /api/services/rentacar/cars/{id}:
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
router.get('/cars/:id', optionalAuth, getCarByIdController);

// Admin CRUD

/**
 * @swagger
 * /api/services/rentacar/companies:
 *   post:
 *     tags: [RentACar]
 *     summary: Create rent-a-car company (admin)
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
 *                 description: JSON-stringified body matching CreateRentACarCompanyInput (see components.schemas), minus the image fields below
 *               profileImage: { type: string, format: binary }
 *               bannerImage: { type: string, format: binary }
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
    { name: 'profileImage', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  parseJsonPayload,
  resolveImageFields('rentacarCompanies', [
    { field: 'profileImage', kind: 'single' },
    { field: 'bannerImage', kind: 'single' },
    { field: 'images', kind: 'multi' },
  ]),
  validate({ body: createCompanySchema }),
  createCompanyController,
);

/**
 * @swagger
 * /api/services/rentacar/companies/{id}:
 *   put:
 *     tags: [RentACar]
 *     summary: Update rent-a-car company (admin)
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
 *                 description: JSON-stringified body matching UpdateRentACarCompanyInput (see components.schemas), minus the image fields below
 *               profileImage: { type: string, format: binary }
 *               bannerImage: { type: string, format: binary }
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
    { name: 'profileImage', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  parseJsonPayload,
  resolveImageFields('rentacarCompanies', [
    { field: 'profileImage', kind: 'single' },
    { field: 'bannerImage', kind: 'single' },
    { field: 'images', kind: 'multi' },
  ]),
  validate({ body: updateCompanySchema }),
  updateCompanyController,
);

/**
 * @swagger
 * /api/services/rentacar/companies/{id}:
 *   delete:
 *     tags: [RentACar]
 *     summary: Delete rent-a-car company
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
 * /api/services/rentacar/cars:
 *   post:
 *     tags: [RentACar]
 *     summary: Create car (admin)
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
 *                 description: JSON-stringified body matching CreateCarInput (see components.schemas), minus the image fields below
 *               images:
 *                 type: array
 *                 items: { type: string, format: binary }
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.post(
  '/cars',
  requireAuth,
  requireRole('ADMIN'),
  upload.fields([
    { name: 'images', maxCount: 10 },
  ]),
  parseJsonPayload,
  resolveImageFields('cars', [
    { field: 'images', kind: 'multi', required: true },
  ]),
  validate({ body: createCarSchema }),
  createCarController,
);

/**
 * @swagger
 * /api/services/rentacar/cars/{id}:
 *   put:
 *     tags: [RentACar]
 *     summary: Update car (admin)
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
 *                 description: JSON-stringified body matching UpdateCarInput (see components.schemas), minus the image fields below
 *               images:
 *                 type: array
 *                 items: { type: string, format: binary }
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.put(
  '/cars/:id',
  requireAuth,
  requireRole('ADMIN'),
  upload.fields([
    { name: 'images', maxCount: 10 },
  ]),
  parseJsonPayload,
  resolveImageFields('cars', [
    { field: 'images', kind: 'multi', required: true },
  ]),
  validate({ body: updateCarSchema }),
  updateCarController,
);

/**
 * @swagger
 * /api/services/rentacar/cars/{id}:
 *   delete:
 *     tags: [RentACar]
 *     summary: Delete car
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
router.delete('/cars/:id', requireAuth, requireRole('ADMIN'), deleteCarController);

export default router;

