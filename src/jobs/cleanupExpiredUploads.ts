import cron from 'node-cron';
import { logger } from '../config/logger.js';
import { cleanupExpiredUploads } from '../modules/uploads/uploads.service.js';

export function scheduleUploadCleanup(): void {
  // Every hour, on the hour. TTL is 24h, so hourly cadence is frequent
  // enough to keep storage bloat bounded without hammering Firestore.
  cron.schedule('0 * * * *', async () => {
    try {
      const { deleted, failed } = await cleanupExpiredUploads();
      if (deleted > 0 || failed > 0) {
        logger.info(`Upload cleanup: deleted=${deleted} failed=${failed}`);
      }
    } catch (err) {
      logger.error({ err }, 'Upload cleanup job failed');
    }
  });
}
