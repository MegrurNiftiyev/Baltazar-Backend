import multer from 'multer';
import { AppError } from '../errors/AppError.js';

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new AppError(400, 'INVALID_FILE_TYPE', `Unsupported file type: ${file.mimetype}. Allowed: jpeg, png, webp, gif.`));
      return;
    }
    cb(null, true);
  },
});
