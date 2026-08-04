import { Router } from 'express';
import { getEnumController, getNamespacedEnumController } from './enums.controller.js';
import { ENUM_REGISTRY, NAMESPACED_ENUM_REGISTRY } from './enums.registry.js';

const router = Router();

/**
 * @swagger
 * /api/enums/{key}:
 *   get:
 *     tags: [Enums]
 *     summary: Get all valid values for a given enum key
 *     security: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema: { type: string, enum: [roles, service-types, company-statuses, food-item-statuses, car-statuses, transmissions, fuel-types, review-target-types, languages, regions, currencies, company-sections] }
 *     responses:
 *       200: { description: List of valid values for this enum }
 *       404: { description: Unknown enum key }
 */
router.get('/:key', getEnumController);

/**
 * @swagger
 * /api/enums/{namespace}/{key}:
 *   get:
 *     tags: [Enums]
 *     summary: Get all valid values for a namespaced enum key
 *     security: []
 *     parameters:
 *       - in: path
 *         name: namespace
 *         required: true
 *         schema: { type: string, enum: [orders] }
 *       - in: path
 *         name: key
 *         required: true
 *         schema: { type: string, enum: [statuses, screens] }
 *     responses:
 *       200: { description: List of valid values for this enum }
 *       404: { description: Unknown enum key }
 */
router.get('/:namespace/:key', getNamespacedEnumController);

export default router;
export { ENUM_REGISTRY, NAMESPACED_ENUM_REGISTRY };
