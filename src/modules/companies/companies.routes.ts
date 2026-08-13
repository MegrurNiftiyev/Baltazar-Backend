import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { optionalAuth } from '../../middlewares/optionalAuth.js';
import { validate } from '../../middlewares/validate.js';
import { requireRole } from '../../middlewares/requireRole.js';
import {
  getCompaniesController,
  getCompanyByIdController,
  getCompanyRelatedItemsController,
  createCompanyController,
  updateCompanyController,
  deleteCompanyController,
} from './companies.controller.js';
import {
  companiesQuerySchema,
  createCompanySchema,
  updateCompanySchema,
} from './companies.schema.js';

const router = Router();

/**
 * @swagger
 * /api/companies:
 *   get:
 *     tags: [Companies]
 *     summary: Get a list of companies
 *     security: []
 *     parameters:
 *       - in: query
 *         name: serviceType
 *         schema: { type: string, enum: [RENT_A_CAR, HOTEL, TRAVEL, FOOD] }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: cursor
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of companies }
 */
router.get('/', optionalAuth, validate({ query: companiesQuerySchema }), getCompaniesController);

/**
 * @swagger
 * /api/companies/{id}/related-items:
 *   get:
 *     tags: [Companies]
 *     summary: Get resolved related items for a company as cross-service DTO cards
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of related item cards }
 *       404: { description: Company not found }
 */
router.get('/:id/related-items', optionalAuth, getCompanyRelatedItemsController);

/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     tags: [Companies]
 *     summary: Get a company by ID
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
router.get('/:id', optionalAuth, getCompanyByIdController);

/**
 * @swagger
 * /api/companies:
 *   post:
 *     tags: [Companies]
 *     summary: Create a new company
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCompanyInput'
 *     responses:
 *       201: { description: Created }
 */
router.post(
  '/',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createCompanySchema }),
  createCompanyController,
);

/**
 * @swagger
 * /api/companies/{id}:
 *   put:
 *     tags: [Companies]
 *     summary: Update an existing company
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
 *             $ref: '#/components/schemas/UpdateCompanyInput'
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Company not found }
 */
router.put(
  '/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateCompanySchema }),
  updateCompanyController,
);

/**
 * @swagger
 * /api/companies/{id}:
 *   delete:
 *     tags: [Companies]
 *     summary: Delete a company and its items
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Company not found }
 */
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteCompanyController);

export default router;
