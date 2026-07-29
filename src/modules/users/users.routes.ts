import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { updateProfileSchema } from './users.schema.js';
import { getProfileController, updateProfileController, disableUserController } from './users.controller.js';

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

/**
 * @swagger
 * /api/users/{id}/disable:
 *   put:
 *     tags: [Users]
 *     summary: Revoke all sessions for a user (disable/ban action)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Refresh token revoked immediately; any still-valid access token (up to 15 min) keeps working until natural expiry }
 *       404: { description: User not found }
 */
router.put('/:id/disable', requireAuth, requireRole('ADMIN'), disableUserController);

export default router;
