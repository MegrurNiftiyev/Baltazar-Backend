import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import {
  hotelQuerySchema,
  roomQuerySchema,
  createHotelSchema,
  updateHotelSchema,
  createRoomSchema,
  updateRoomSchema,
} from './hotel.schema.js';
import {
  getHotelsController,
  getHotelByIdController,
  createHotelController,
  updateHotelController,
  deleteHotelController,
  getRoomsController,
  createRoomController,
  updateRoomController,
  deleteRoomController,
} from './hotel.controller.js';

const router = Router();

// ── Public routes ──────────────────────────────────────────────────────

/**
 * @swagger
 * /api/services/hotel:
 *   get:
 *     tags: [Hotel]
 *     summary: List hotels with filters
 *     security: []
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema: { type: number }
 *       - in: query
 *         name: maxPrice
 *         schema: { type: number }
 *       - in: query
 *         name: starRating
 *         schema: { type: integer, minimum: 1, maximum: 5 }
 *       - in: query
 *         name: city
 *         schema: { type: string }
 *       - in: query
 *         name: minRating
 *         schema: { type: number }
 *       - in: query
 *         name: name
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of hotels }
 */
router.get('/', validate({ query: hotelQuerySchema }), getHotelsController);

/**
 * @swagger
 * /api/services/hotel/{id}:
 *   get:
 *     tags: [Hotel]
 *     summary: Get hotel details by ID
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Hotel details }
 *       404: { description: Hotel not found }
 */
router.get('/:id', getHotelByIdController);

/**
 * @swagger
 * /api/services/hotel/{id}/rooms:
 *   get:
 *     tags: [Hotel]
 *     summary: List rooms for a hotel
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: roomType
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of rooms }
 */
router.get('/:id/rooms', validate({ query: roomQuerySchema }), getRoomsController);

// Admin CRUD

/**
 * @swagger
 * /api/services/hotel:
 *   post:
 *     tags: [Hotel]
 *     summary: Create hotel
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateHotelInput'
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.post(
  '/',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createHotelSchema }),
  createHotelController,
);

/**
 * @swagger
 * /api/services/hotel/{id}:
 *   put:
 *     tags: [Hotel]
 *     summary: Update hotel
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
 *             $ref: '#/components/schemas/UpdateHotelInput'
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.put(
  '/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateHotelSchema }),
  updateHotelController,
);

/**
 * @swagger
 * /api/services/hotel/{id}:
 *   delete:
 *     tags: [Hotel]
 *     summary: Delete hotel
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
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteHotelController);

/**
 * @swagger
 * /api/services/hotel/rooms:
 *   post:
 *     tags: [Hotel]
 *     summary: Create room
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoomInput'
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.post(
  '/rooms',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createRoomSchema }),
  createRoomController,
);

/**
 * @swagger
 * /api/services/hotel/rooms/{id}:
 *   put:
 *     tags: [Hotel]
 *     summary: Update room
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
 *             $ref: '#/components/schemas/UpdateRoomInput'
 *     responses:
 *       200: { description: Success }
 *       403: { description: Forbidden, admin only }
 */
router.put(
  '/rooms/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateRoomSchema }),
  updateRoomController,
);

/**
 * @swagger
 * /api/services/hotel/rooms/{id}:
 *   delete:
 *     tags: [Hotel]
 *     summary: Delete room
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
router.delete('/rooms/:id', requireAuth, requireRole('ADMIN'), deleteRoomController);

export default router;

