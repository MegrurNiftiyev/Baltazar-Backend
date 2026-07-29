import { Router } from 'express';
import { optionalAuth } from '../../middlewares/optionalAuth.js';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { upload } from '../../middlewares/upload.js';
import { validate } from '../../middlewares/validate.js';
import { bannerSchema } from './home.schema.js';
import { 
  getBannerController, 
  getExploreController,
  createBannerController,
  updateBannerController,
  deleteBannerController
} from './home.controller.js';

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

router.post(
  '/banner',
  requireAuth,
  requireRole('ADMIN'),
  upload.single('image'),
  validate({ body: bannerSchema }),
  createBannerController
);

router.put(
  '/banner/:id',
  requireAuth,
  requireRole('ADMIN'),
  upload.single('image'),
  validate({ body: bannerSchema }),
  updateBannerController
);

router.delete(
  '/banner/:id',
  requireAuth,
  requireRole('ADMIN'),
  deleteBannerController
);

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
