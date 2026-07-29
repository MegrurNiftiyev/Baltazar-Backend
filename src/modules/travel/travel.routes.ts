import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import {
  toursQuerySchema,
  includedServicesParamsSchema,
  createTravelCompanySchema,
  updateTravelCompanySchema,
  createTourSchema,
  updateTourSchema,
  createIncludedServiceSchema,
  updateIncludedServiceSchema,
  includedServiceIdParamsSchema,
} from './travel.schema.js';
import {
  getCompaniesController,
  getCompanyByIdController,
  createCompanyController,
  updateCompanyController,
  deleteCompanyController,
  getToursController,
  getTourByIdController,
  createTourController,
  updateTourController,
  deleteTourController,
  getIncludedServicesController,
  createIncludedServiceController,
  updateIncludedServiceController,
  deleteIncludedServiceController,
} from './travel.controller.js';

const router = Router();

// ── Public routes ──────────────────────────────────────────────────────

/**
 * @swagger
 * /api/travel/companies:
 *   get:
 *     tags: [Travel]
 *     summary: Get all travel companies
 *     security: []
 *     responses:
 *       200: { description: List of travel companies }
 */
router.get('/companies', getCompaniesController);

/**
 * @swagger
 * /api/travel/companies/{id}:
 *   get:
 *     tags: [Travel]
 *     summary: Get a travel company by ID
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Company details }
 */
router.get('/companies/:id', getCompanyByIdController);

/**
 * @swagger
 * /api/travel/tours:
 *   get:
 *     tags: [Travel]
 *     summary: List tours with filters
 *     security: []
 *     parameters:
 *       - in: query
 *         name: companyId
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: minRating
 *         schema: { type: number }
 *       - in: query
 *         name: startDate
 *         schema: { type: string }
 *       - in: query
 *         name: endDate
 *         schema: { type: string }
 *       - in: query
 *         name: name
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of tours }
 */
router.get('/tours', validate({ query: toursQuerySchema }), getToursController);

/**
 * @swagger
 * /api/travel/tours/{id}:
 *   get:
 *     tags: [Travel]
 *     summary: Get full tour details
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Tour details }
 */
router.get('/tours/:id', getTourByIdController);

// ── Admin CRUD ────────────────────────────────────────────────────────

router.post(
  '/companies',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createTravelCompanySchema }),
  createCompanyController,
);

router.put(
  '/companies/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateTravelCompanySchema }),
  updateCompanyController,
);

router.delete('/companies/:id', requireAuth, requireRole('ADMIN'), deleteCompanyController);

router.post(
  '/tours',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createTourSchema }),
  createTourController,
);

router.put(
  '/tours/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateTourSchema }),
  updateTourController,
);

router.delete('/tours/:id', requireAuth, requireRole('ADMIN'), deleteTourController);

export default router;

// ── Included Services (separate router, mounted at /api/included-services) ──

export const includedServicesRouter = Router();

/**
 * @swagger
 * /api/included-services/{serviceType}:
 *   get:
 *     tags: [IncludedServices]
 *     summary: Get included services by type (TRAVEL or HOTEL)
 *     security: []
 *     parameters:
 *       - in: path
 *         name: serviceType
 *         required: true
 *         schema: { type: string, enum: [TRAVEL, HOTEL] }
 *     responses:
 *       200: { description: List of included services }
 */
includedServicesRouter.get(
  '/:serviceType',
  validate({ params: includedServicesParamsSchema }),
  getIncludedServicesController,
);

/**
 * @swagger
 * /api/included-services/{serviceType}:
 *   post:
 *     tags: [IncludedServices]
 *     summary: Create an included service (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: serviceType
 *         required: true
 *         schema: { type: string, enum: [TRAVEL, HOTEL] }
 *     responses:
 *       201: { description: Included service created }
 */
includedServicesRouter.post(
  '/:serviceType',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createIncludedServiceSchema }),
  createIncludedServiceController,
);

/**
 * @swagger
 * /api/included-services/{id}:
 *   put:
 *     tags: [IncludedServices]
 *     summary: Update an included service (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Included service updated }
 */
includedServicesRouter.put(
  '/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ params: includedServiceIdParamsSchema, body: updateIncludedServiceSchema }),
  updateIncludedServiceController,
);

/**
 * @swagger
 * /api/included-services/{id}:
 *   delete:
 *     tags: [IncludedServices]
 *     summary: Delete an included service (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Included service deleted }
 */
includedServicesRouter.delete(
  '/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ params: includedServiceIdParamsSchema }),
  deleteIncludedServiceController,
);
