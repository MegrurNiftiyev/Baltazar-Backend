import { Router } from 'express';
import { optionalAuth } from '../../middlewares/optionalAuth.js';
import { getBannerController, getExploreController } from './home.controller.js';

const router = Router();

/**
 * @swagger
 * /api/home/banner:
 *   get:
 *     tags: [Home]
 *     summary: Get home banner slides
 *     security: []
 *     responses:
 *       200: { description: Banner slides }
 */
router.get('/banner', getBannerController);

/**
 * @swagger
 * /api/home/explore:
 *   get:
 *     tags: [Home]
 *     summary: Get personalized explore rows
 *     security: []
 *     responses:
 *       200: { description: Explore rows }
 */
router.get('/explore', optionalAuth, getExploreController);

export default router;
