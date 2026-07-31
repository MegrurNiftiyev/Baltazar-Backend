import type { Request, Response, NextFunction } from 'express';
import { uploadImage, uploadImages, type ImageFolder } from '../utils/uploadImage.js';

type SingleImageFieldConfig = { field: string; kind: 'single'; required?: boolean };
type MultiImageFieldConfig = { field: string; kind: 'multi'; required?: boolean };
type ImageFieldConfig = SingleImageFieldConfig | MultiImageFieldConfig;

/**
 * Returns Express middleware that, given a list of image field configs and the
 * Firebase Storage folder they upload into, reads `req.files` (populated by a prior
 * `upload.fields([...])` call), uploads any files present via uploadImage/uploadImages,
 * and merges the resulting public URL(s) into `req.body[field]`.
 *
 * Behavior per field:
 *   - A file was uploaded for this field  -> req.body[field] is overwritten with the
 *     new URL (single) or new URL array (multi), replacing anything that was already
 *     in the parsed `data` JSON for that key.
 *   - No file was uploaded for this field -> req.body[field] is left completely
 *     untouched (whatever `parseJsonPayload` already put there stays).
 *   - `required: true` and no file AND req.body[field] is also absent -> this
 *     middleware does NOT throw; it leaves the field absent and lets the Zod schema's
 *     own required-field validation produce the error.
 *
 * Must run AFTER parseJsonPayload and BEFORE validate().
 */
export function resolveImageFields(folder: ImageFolder, fields: ImageFieldConfig[]) {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const files = (req.files ?? {}) as Record<string, Express.Multer.File[]>;

      for (const config of fields) {
        const uploaded = files[config.field];
        if (!uploaded || uploaded.length === 0) continue;

        if (config.kind === 'single') {
          req.body[config.field] = await uploadImage(uploaded[0]!, folder);
        } else {
          req.body[config.field] = await uploadImages(uploaded, folder);
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}