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
const includedServicesRouter = Router();

// ── Public routes ──────────────────────────────────────────────────────

/**
 * @swagger
 * /api/services/travel/companies:
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
 * /api/services/travel/companies/{id}:
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
 * /api/services/travel/tours:
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
 * /api/services/travel/tours/{id}:
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

// Admin CRUD

/**
 * @swagger
 * /api/services/travel/companies:
 *   post:
 *     tags: [Travel]
 *     summary: Create travel company
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTravelCompanyInput'
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.post(
  '/companies',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createTravelCompanySchema }),
  createCompanyController,
);

/**
 * @swagger
 * /api/services/travel/companies/{id}:
 *   put:
 *     tags: [Travel]
 *     summary: Update travel company
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
 *             $ref: '#/components/schemas/UpdateTravelCompanyInput'
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.put(
  '/companies/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateTravelCompanySchema }),
  updateCompanyController,
);

/**
 * @swagger
 * /api/services/travel/companies/{id}:
 *   delete:
 *     tags: [Travel]
 *     summary: Delete travel company
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
 * /api/services/travel/tours:
 *   post:
 *     tags: [Travel]
 *     summary: Create tour
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTourInput'
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.post(
  '/tours',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createTourSchema }),
  createTourController,
);

/**
 * @swagger
 * /api/services/travel/tours/{id}:
 *   put:
 *     tags: [Travel]
 *     summary: Update tour
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
 *             $ref: '#/components/schemas/UpdateTourInput'
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.put(
  '/tours/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateTourSchema }),
  updateTourController,
);

/**
 * @swagger
 * /api/services/travel/tours/{id}:
 *   delete:
 *     tags: [Travel]
 *     summary: Delete tour
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
router.delete('/tours/:id', requireAuth, requireRole('ADMIN'), deleteTourController);


// Included Services

/**
 * @swagger
 * /api/services/included-services/{serviceType}:
 *   get:
 *     tags: [IncludedServices]
 *     summary: Get included services by service type
 *     security: []
 *     parameters:
 *       - in: path
 *         name: serviceType
 *         required: true
 *         schema: { type: string, enum: [TRAVEL, HOTEL] }
 *     responses:
 *       200: { description: Included services }
 */
includedServicesRouter.get('/:serviceType', validate({ params: includedServicesParamsSchema }), getIncludedServicesController);

/**
 * @swagger
 * /api/services/included-services/{serviceType}:
 *   post:
 *     tags: [IncludedServices]
 *     summary: Create included service
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: serviceType
 *         required: true
 *         schema: { type: string, enum: [TRAVEL, HOTEL] }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateIncludedServiceInput'
 *     responses:
 *       201: { description: Included service created }
 *       403: { description: Forbidden, admin only }
 */
includedServicesRouter.post('/:serviceType', requireAuth, requireRole('ADMIN'), validate({ params: includedServicesParamsSchema, body: createIncludedServiceSchema }), createIncludedServiceController);

/**
 * @swagger
 * /api/services/included-services/{id}:
 *   put:
 *     tags: [IncludedServices]
 *     summary: Update included service
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
 *             $ref: '#/components/schemas/UpdateIncludedServiceInput'
 *     responses:
 *       200: { description: Included service updated }
 *       403: { description: Forbidden, admin only }
 */
includedServicesRouter.put('/:id', requireAuth, requireRole('ADMIN'), validate({ params: includedServiceIdParamsSchema, body: updateIncludedServiceSchema }), updateIncludedServiceController);

/**
 * @swagger
 * /api/services/included-services/{id}:
 *   delete:
 *     tags: [IncludedServices]
 *     summary: Delete included service
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Included service deleted }
 *       403: { description: Forbidden, admin only }
 */
includedServicesRouter.delete('/:id', requireAuth, requireRole('ADMIN'), validate({ params: includedServiceIdParamsSchema }), deleteIncludedServiceController);

export default router;
export { includedServicesRouter };

