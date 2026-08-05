import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../middlewares/validate.js';
import { ORDER_SCREENS } from '../../config/orderScreens.js';

const router = Router();

const serviceTypeParamsSchema = z.object({
  serviceType: z.enum(['RENT_A_CAR', 'TRAVEL', 'HOTEL', 'FOOD']),
});

/**
 * @swagger
 * /api/order-screens/{serviceType}:
 *   get:
 *     tags: [Order]
 *     summary: Get the hardcoded screen sequence for a service type
 *     security: []
 *     parameters:
 *       - in: path
 *         name: serviceType
 *         required: true
 *         schema: { type: string, enum: [RENT_A_CAR, TRAVEL, HOTEL, FOOD] }
 *     responses:
 *       200: { description: Ordered list of screen keys for this service type }
 */
router.get('/:serviceType', validate({ params: serviceTypeParamsSchema }), (req, res) => {
  const serviceType = req.params.serviceType as keyof typeof ORDER_SCREENS;
  res.status(200).json({ success: true, data: { screens: ORDER_SCREENS[serviceType] } });
});

export default router;
