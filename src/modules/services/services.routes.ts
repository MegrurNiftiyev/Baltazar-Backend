import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { createServiceSchema, updateServiceSchema } from './services.schema.js';
import {
  getAllServicesController,
  getServiceByIdController,
  createServiceController,
  updateServiceController,
  deleteServiceController,
} from './services.controller.js';

const router = Router();

/**
 * @swagger
 * /api/servis:
 *   get:
 *     tags: [Services]
 *     summary: Get all top-level services
 *     security: []
 *     responses:
 *       200: { description: List of services }
 */
router.get('/', getAllServicesController);

/**
 * @swagger
 * /api/servis/{id}:
 *   get:
 *     tags: [Services]
 *     summary: Get a service by ID
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Service details }
 *       404: { description: Service not found }
 */
router.get('/:id', getServiceByIdController);

// ── Admin CRUD ────────────────────────────────────────────────────────

/**
 * @swagger
 * /api/servis:
 *   post:
 *     tags: [Services]
 *     summary: Create a new service (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [key, name, icon, order]
 *             properties:
 *               key: { type: string }
 *               name: { type: object, properties: { az: { type: string }, en: { type: string }, ru: { type: string } } }
 *               icon: { type: string }
 *               order: { type: integer }
 *     responses:
 *       201: { description: Service created }
 *       403: { description: Forbidden }
 */
router.post(
  '/',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createServiceSchema }),
  createServiceController,
);

/**
 * @swagger
 * /api/servis/{id}:
 *   put:
 *     tags: [Services]
 *     summary: Update a service (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Service updated }
 */
router.put(
  '/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateServiceSchema }),
  updateServiceController,
);

/**
 * @swagger
 * /api/servis/{id}:
 *   delete:
 *     tags: [Services]
 *     summary: Delete a service (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Service deleted }
 */
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteServiceController);

export default router;
