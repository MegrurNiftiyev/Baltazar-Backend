import 'dotenv-flow/config';
import { env } from './config/env.js';
import { app } from './app.js';
import { logger } from './config/logger.js';

const server = app.listen(env.PORT, () => {
  logger.info({ port: env.PORT, env: env.NODE_ENV }, `Baltazar API server running`);
  logger.info(`Swagger docs: http://localhost:${env.PORT}/api-docs`);
});

// ── Graceful shutdown ──────────────────────────────────────────────────
const shutdown = (signal: string) => {
  logger.info(`${signal} received — shutting down gracefully`);
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
  // Force-kill after 10 s if graceful shutdown stalls
  setTimeout(() => process.exit(1), 10_000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// ── Process-level error safety ─────────────────────────────────────────
process.on('uncaughtException', (err) => {
  logger.fatal(err, 'UNCAUGHT EXCEPTION — shutting down');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.fatal(reason, 'UNHANDLED REJECTION — shutting down');
  process.exit(1);
});
