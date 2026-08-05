import { Router } from 'express';
import { optionalAuth } from '../../middlewares/optionalAuth.js';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { validateImageReferences } from '../../middlewares/validateImageReferences.js';
import {
  carsQuerySchema,
  createCarSchema,
  updateCarSchema,
} from './rentacar.schema.js';
import {
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
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: cursor
 *         schema: { type: string }
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
 * /api/services/rentacar/cars:
 *   post:
 *     tags: [RentACar]
 *     summary: Create car (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCarInput'
 *     responses:
 *       201: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.post(
  '/cars',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createCarSchema }),
  validateImageReferences([
    { bodyField: 'images', kind: 'multi' },
  ]),
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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCarInput'
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.put(
  '/cars/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateCarSchema }),
  validateImageReferences([
    { bodyField: 'images', kind: 'multi' },
  ]),
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
