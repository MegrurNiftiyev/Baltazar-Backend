import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { upload } from '../../middlewares/upload.js';
import {
  uploadSingleImageController,
  uploadMultipleImagesController,
  listAllUploadsController,
} from './uploads.controller.js';
import { listUploadsQuerySchema } from './uploads.schema.js';

const router = Router();

/**
 * @swagger
 * /api/uploads/image:
 *   post:
 *     tags: [Uploads]
 *     summary: Upload a single image
 *     description: >
 *       Accepts one image file (jpeg, png, webp, gif; max 5MB) and returns
 *       a public `url`. The upload is `pending` until it is
 *       referenced by a subsequent entity create/update call (see Part 3),
 *       after which it becomes `confirmed`. Unreferenced uploads are
 *       deleted automatically after 24h.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: folder
 *         required: true
 *         schema:
 *           type: string
 *           enum: [avatars, banners, food, foodCompanies, foodItems, hotels, rentacar, rentacarCompanies, rentacarCars, travel, travelCompanies, travelTours]
 *         example: foodCompanies
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [image]
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Uploaded successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 url: "https://storage.googleapis.com/your-bucket/foodCompanies/8f14e45f-ceea-4c9e-8bd7-1e4a0f5b1a2c.jpg"
 *       400:
 *         description: Missing file, wrong type, or too large
 *       401:
 *         description: Missing or invalid auth token
 */
router.post('/image', requireAuth, upload.single('image'), uploadSingleImageController);

/**
 * @swagger
 * /api/uploads/images:
 *   post:
 *     tags: [Uploads]
 *     summary: Upload multiple images (max 10)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: folder
 *         required: true
 *         schema:
 *           type: string
 *           enum: [avatars, banners, food, foodCompanies, foodItems, hotels, rentacar, rentacarCompanies, rentacarCars, travel, travelCompanies, travelTours]
 *         example: hotels
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [images]
 *             properties:
 *               images:
 *                 type: array
 *                 maxItems: 10
 *                 items: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Uploaded successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - url: "https://storage.googleapis.com/your-bucket/hotels/8f14e45f-ceea-4c9e-8bd7-1e4a0f5b1a2c.jpg"
 *                 - url: "https://storage.googleapis.com/your-bucket/hotels/2b6b1f1e-08c2-4a13-9a3f-3f6d0e7c9b1a.jpg"
 *       400:
 *         description: No files, too many files, wrong type, or too large
 */
router.post('/images', requireAuth, upload.array('images', 10), uploadMultipleImagesController);

/**
 * @swagger
 * /api/uploads/images:
 *   get:
 *     tags: [Uploads]
 *     summary: List every uploaded image in the database (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 50, maximum: 100 }
 *       - in: query
 *         name: cursor
 *         schema: { type: string }
 *         description: Pass the previous page's `meta.nextCursor` to continue
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [pending, confirmed] }
 *     responses:
 *       200:
 *         description: Paginated list of uploads
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - url: "https://storage.googleapis.com/your-bucket/foodCompanies/8f14e45f-....jpg"
 *                   folder: "foodCompanies"
 *                   ownerId: "u_9f2c1a"
 *                   status: "confirmed"
 *                   size: 184320
 *                   mimeType: "image/jpeg"
 *                   createdAt: "2026-08-01T10:12:00.000Z"
 *               meta:
 *                 nextCursor: "2b6b1f1e-08c2-4a13-9a3f-3f6d0e7c9b1a"
 *       403:
 *         description: Forbidden, admin only
 */
router.get(
  '/images',
  requireAuth,
  requireRole('ADMIN'),
  validate({ query: listUploadsQuerySchema }),
  listAllUploadsController,
);

export default router;
