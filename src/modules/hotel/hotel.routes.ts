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
 * /api/hotel:
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
 * /api/hotel/{id}:
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
 * /api/hotel/{id}/rooms:
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

// ── Admin CRUD ────────────────────────────────────────────────────────

router.post(
  '/',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createHotelSchema }),
  createHotelController,
);

router.put(
  '/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateHotelSchema }),
  updateHotelController,
);

router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteHotelController);

// ── Room admin CRUD ──────────────────────────────────────────────────

router.post(
  '/rooms',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: createRoomSchema }),
  createRoomController,
);

router.put(
  '/rooms/:id',
  requireAuth,
  requireRole('ADMIN'),
  validate({ body: updateRoomSchema }),
  updateRoomController,
);

router.delete('/rooms/:id', requireAuth, requireRole('ADMIN'), deleteRoomController);

export default router;
