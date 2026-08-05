import type { Request, Response, NextFunction } from 'express';
import { confirmUploadByUrl } from '../modules/uploads/uploads.service.js';

type ImageRefConfig =
  | { bodyField: string; kind: 'single' }
  | { bodyField: string; kind: 'multi' };

/**
 * For each configured body field, looks up the client-supplied URL(s),
 * confirms ownership, and flips the upload state to 'confirmed'.
 *
 * Ordering requirement: run AFTER requireAuth (needs req.user.userId) and
 * AFTER validate({ body: schema }) for the *input* shape. Must run BEFORE
 * the controller/service that persists the entity.
 *
 * Every throw here is an AppError (404 IMAGE_NOT_FOUND or 403
 * IMAGE_NOT_FOUND) that propagates straight to errorHandler.
 */
export function validateImageReferences(fields: ImageRefConfig[]) {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const ownerId = req.user!.userId;

      for (const config of fields) {
        const value = req.body[config.bodyField];
        if (value === undefined) continue;

        if (config.kind === 'single') {
          req.body[config.bodyField] = await confirmUploadByUrl(value as string, ownerId);
        } else {
          const urls = value as string[];
          req.body[config.bodyField] = await Promise.all(urls.map((u) => confirmUploadByUrl(u, ownerId)));
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
