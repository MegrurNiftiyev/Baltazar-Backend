import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { appConfigSchema } from './appConfig.schema.js';
import { getAppConfigController, updateAppConfigController } from './appConfig.controller.js';

const router = Router();

/**
 * @swagger
 * /api/app/config:
 *   get:
 *     tags: [AppConfig]
 *     summary: Get mobile app version configuration
 *     security: []
 *     responses:
 *       200: { description: Current app configuration }
 */
router.get('/', getAppConfigController);

/**
 * @swagger
 * /api/app/config:
 *   put:
 *     tags: [AppConfig]
 *     summary: Update mobile app version configuration
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppConfigInput'
 *     responses:
 *       200: { description: Updated app configuration }
 *       403: { description: Forbidden, admin only }
 */
router.put('/', requireAuth, requireRole('ADMIN'), validate({ body: appConfigSchema }), updateAppConfigController);

export default router;
