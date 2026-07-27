import { Router } from 'express';
import { validate } from '../../middlewares/validate.js';
import { authLimiter } from '../../middlewares/rateLimiters.js';
import {
  registerSchema,
  loginSchema,
  refreshSchema,
  googleLoginSchema,
} from './auth.schema.js';
import {
  registerController,
  loginController,
  refreshController,
  googleLoginController,
} from './auth.controller.js';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, minLength: 2, maxLength: 100 }
 *               email: { type: string, format: email }
 *               password: { type: string, minLength: 8, maxLength: 128 }
 *               phone: { type: string }
 *               region: { type: string }
 *               language: { type: string, enum: [az, en, ru] }
 *     responses:
 *       201: { description: User registered successfully }
 *       409: { description: User with this email already exists }
 */
router.post('/register', authLimiter, validate({ body: registerSchema }), registerController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *     responses:
 *       200: { description: Login successful }
 *       401: { description: Invalid email or password }
 */
router.post('/login', authLimiter, validate({ body: loginSchema }), loginController);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token using a refresh token
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken: { type: string }
 *     responses:
 *       200: { description: Tokens refreshed }
 *       401: { description: Invalid or expired refresh token }
 */
router.post('/refresh', validate({ body: refreshSchema }), refreshController);

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     tags: [Auth]
 *     summary: Login or register with Google OAuth
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [idToken]
 *             properties:
 *               idToken: { type: string }
 *     responses:
 *       200: { description: Login successful }
 *       401: { description: Invalid Google token }
 */
router.post('/google', authLimiter, validate({ body: googleLoginSchema }), googleLoginController);

export default router;
