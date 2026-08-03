import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { AppError } from '../../errors/AppError.js';
import { storeImage, storeImages, type ImageFolder } from '../../utils/uploadImage.js';
import { createUploadRecord, listAllUploads } from './uploads.service.js';
import type { ListUploadsQuery } from './uploads.schema.js';

const VALID_FOLDERS: ImageFolder[] = ['avatars', 'banners', 'food', 'foodCompanies', 'foodItems', 'hotels', 'rentacar', 'rentacarCompanies', 'rentacarCars', 'travel', 'travelCompanies', 'travelTours'];
const MAX_MULTI_FILES = 10;

function resolveFolder(req: Request): ImageFolder {
  const folder = req.query.folder;
  if (typeof folder !== 'string' || !VALID_FOLDERS.includes(folder as ImageFolder)) {
    throw new AppError(400, 'VALIDATION_ERROR', `folder must be one of: ${VALID_FOLDERS.join(', ')}`);
  }
  return folder as ImageFolder;
}

/** POST /api/uploads/image — single file, field name "image" */
export const uploadSingleImageController = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) throw new AppError(400, 'VALIDATION_ERROR', 'No file provided under field "image"');

  const folder = resolveFolder(req);
  const stored = await storeImage(req.file, folder);
  await createUploadRecord({ ...stored, folder, ownerId: req.user!.userId });

  // uploadId intentionally NOT returned — client only ever deals with url
  res.status(201).json({ success: true, data: { url: stored.url } });
});

/** POST /api/uploads/images — up to 10 files, field name "images" */
export const uploadMultipleImagesController = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[] | undefined;
  if (!files || files.length === 0) throw new AppError(400, 'VALIDATION_ERROR', 'No files provided under field "images"');
  if (files.length > MAX_MULTI_FILES) throw new AppError(400, 'VALIDATION_ERROR', `Maximum ${MAX_MULTI_FILES} images per request`);

  const folder = resolveFolder(req);
  const stored = await storeImages(files, folder);
  await Promise.all(stored.map((s) => createUploadRecord({ ...s, folder, ownerId: req.user!.userId })));

  res.status(201).json({ success: true, data: stored.map((s) => ({ url: s.url })) });
});

export const listAllUploadsController = catchAsync(async (req: Request, res: Response) => {
  const query = req.validatedQuery as unknown as ListUploadsQuery;

  const { items, nextCursor } = await listAllUploads({
    limit: query.limit,
    startAfterId: query.cursor,
    status: query.status,
  });

  res.status(200).json({
    success: true,
    data: items.map((u) => ({
      url: u.url,
      folder: u.folder,
      ownerId: u.ownerId,
      status: u.status,
      size: u.size,
      mimeType: u.mimeType,
      createdAt: u.createdAt,
    })),
    meta: { nextCursor },
  });
});
