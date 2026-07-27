import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { validate } from '../../middlewares/validate.js';
import { updateProfileSchema } from './users.schema.js';
import { getProfileController, updateProfileController } from './users.controller.js';

const router = Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags: [Users]
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: User profile }
 *       401: { description: Authentication required }
 */
router.get('/me', requireAuth, getProfileController);

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     tags: [Users]
 *     summary: Update current user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               phone: { type: string }
 *               region: { type: string }
 *               language: { type: string, enum: [az, en, ru] }
 *     responses:
 *       200: { description: Profile updated }
 *       401: { description: Authentication required }
 */
router.put('/me', requireAuth, validate({ body: updateProfileSchema }), updateProfileController);

export default router;
