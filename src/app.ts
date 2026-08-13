import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env.js';
import { swaggerSpec } from './config/swagger.js';
import { httpLogger } from './config/logger.js';
import { globalLimiter } from './middlewares/rateLimiters.js';
import { resolveLocale } from './middlewares/resolveLocale.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { t } from './config/locales.js';

// ── Module routers ─────────────────────────────────────────────────────
import authRouter from './modules/auth/auth.routes.js';
import usersRouter from './modules/users/users.routes.js';
import adminRouter from './modules/admin/admin.routes.js';
import rentacarRouter from './modules/rentacar/rentacar.routes.js';
import travelRouter, { includedServicesRouter } from './modules/travel/travel.routes.js';
import hotelRouter from './modules/hotel/hotel.routes.js';
import foodRouter from './modules/food/food.routes.js';
import orderRouter from './modules/order/order.routes.js';
import paymentRouter from './modules/payment/payment.routes.js';
import reviewsRouter from './modules/reviews/reviews.routes.js';
import wishlistRouter from './modules/wishlist/wishlist.routes.js';
import homeRouter from './modules/home/home.routes.js';
import appConfigRouter from './modules/appConfig/appConfig.routes.js';
import uploadsRouter from './modules/uploads/uploads.routes.js';
import categoriesRouter from './modules/categories/categories.routes.js';
import enumsRouter from './modules/enums/enums.routes.js';
import companiesRouter from './modules/companies/companies.routes.js';

// ── App initialization ────────────────────────────────────────────────
export const app = express();

// ── Middleware stack (spec order) ──────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN.split(',').map((o) => o.trim()),
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(hpp());
app.use(httpLogger);
app.use(resolveLocale);

// ── Health check ──────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

let finalSwaggerSpec = swaggerSpec;
if (env.NODE_ENV === 'production') {
  try {
    const specPath = path.join(process.cwd(), 'dist', 'openapi.json');
    finalSwaggerSpec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  } catch (err) {
    console.warn('Could not load dist/openapi.json in production.');
  }
}

// ── Swagger UI ────────────────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(finalSwaggerSpec));
app.get('/api-docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(finalSwaggerSpec);
});

app.use(globalLimiter);

// ── API routes (order matches Swagger tag order — see config/swagger.ts) ──
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/user', wishlistRouter);
app.use('/api/services/hotel', hotelRouter);
app.use('/api/services/rentacar', rentacarRouter);
app.use('/api/services/food', foodRouter);
app.use('/api/services/travel', travelRouter);
app.use('/api/services/included-services', includedServicesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/home', homeRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/app/config', appConfigRouter);
app.use('/api/enums', enumsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/uploads', uploadsRouter);

// ── 404 catch-all ─────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    errorCode: 'NOT_FOUND',
    message: t('NOT_FOUND', req.lang || 'en'),
  });
});

// ── Error handler (must be last) ──────────────────────────────────────
app.use(errorHandler);
