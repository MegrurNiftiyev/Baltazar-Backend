import { Router } from 'express';
import {
  getRolesController,
  getServiceTypesController,
  getCompanyStatusesController,
  getFoodItemStatusesController,
  getCarStatusesController,
  getTransmissionsController,
  getFuelTypesController,
  getReviewTargetTypesController,
  getLanguagesController,
  getRegionsController,
  getCurrenciesController,
  getCompanySectionsController,
  getOrderStatusesController,
  getOrderScreensController,
} from './enums.controller.js';
import { ENUM_REGISTRY } from './enums.registry.js';

const router = Router();

/**
 * @swagger
 * /api/enums/roles:
 *   get:
 *     tags: [Enums]
 *     summary: Get valid user roles
 *     security: []
 *     responses:
 *       200: { description: List of role values }
 */
router.get('/roles', getRolesController);

/**
 * @swagger
 * /api/enums/service-types:
 *   get:
 *     tags: [Enums]
 *     summary: Get valid service types
 *     security: []
 *     responses:
 *       200: { description: List of service type values }
 */
router.get('/service-types', getServiceTypesController);

/**
 * @swagger
 * /api/enums/company-statuses:
 *   get:
 *     tags: [Enums]
 *     summary: Get valid company statuses
 *     security: []
 *     responses:
 *       200: { description: List of company status values }
 */
router.get('/company-statuses', getCompanyStatusesController);

/**
 * @swagger
 * /api/enums/food-item-statuses:
 *   get:
 *     tags: [Enums]
 *     summary: Get valid food item statuses
 *     security: []
 *     responses:
 *       200: { description: List of food item status values }
 */
router.get('/food-item-statuses', getFoodItemStatusesController);

/**
 * @swagger
 * /api/enums/car-statuses:
 *   get:
 *     tags: [Enums]
 *     summary: Get valid car statuses
 *     security: []
 *     responses:
 *       200: { description: List of car status values }
 */
router.get('/car-statuses', getCarStatusesController);

/**
 * @swagger
 * /api/enums/transmissions:
 *   get:
 *     tags: [Enums]
 *     summary: Get valid transmission types
 *     security: []
 *     responses:
 *       200: { description: List of transmission values }
 */
router.get('/transmissions', getTransmissionsController);

/**
 * @swagger
 * /api/enums/fuel-types:
 *   get:
 *     tags: [Enums]
 *     summary: Get valid fuel types
 *     security: []
 *     responses:
 *       200: { description: List of fuel type values }
 */
router.get('/fuel-types', getFuelTypesController);

/**
 * @swagger
 * /api/enums/review-target-types:
 *   get:
 *     tags: [Enums]
 *     summary: Get valid review target types
 *     security: []
 *     responses:
 *       200: { description: List of review target type values }
 */
router.get('/review-target-types', getReviewTargetTypesController);

/**
 * @swagger
 * /api/enums/languages:
 *   get:
 *     tags: [Enums]
 *     summary: Get supported languages
 *     security: []
 *     responses:
 *       200: { description: List of language codes }
 */
router.get('/languages', getLanguagesController);

/**
 * @swagger
 * /api/enums/regions:
 *   get:
 *     tags: [Enums]
 *     summary: Get valid regions
 *     security: []
 *     responses:
 *       200: { description: List of region values }
 */
router.get('/regions', getRegionsController);

/**
 * @swagger
 * /api/enums/currencies:
 *   get:
 *     tags: [Enums]
 *     summary: Get valid currencies
 *     security: []
 *     responses:
 *       200: { description: List of currency values }
 */
router.get('/currencies', getCurrenciesController);

/**
 * @swagger
 * /api/enums/company-sections:
 *   get:
 *     tags: [Enums]
 *     summary: Get valid company detail sections
 *     security: []
 *     responses:
 *       200: { description: List of company section values }
 */
router.get('/company-sections', getCompanySectionsController);

/**
 * @swagger
 * /api/enums/order-statuses:
 *   get:
 *     tags: [Enums]
 *     summary: Get valid order statuses
 *     security: []
 *     responses:
 *       200: { description: List of order status values }
 */
router.get('/order-statuses', getOrderStatusesController);

/**
 * @swagger
 * /api/enums/order-screens:
 *   get:
 *     tags: [Enums]
 *     summary: Get valid order screen keys
 *     security: []
 *     responses:
 *       200: { description: List of order screen key values }
 */
router.get('/order-screens', getOrderScreensController);

export default router;
export { ENUM_REGISTRY };
