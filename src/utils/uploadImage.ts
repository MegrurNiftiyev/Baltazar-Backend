import { randomUUID } from 'crypto';
import path from 'path';
import { bucket } from '../config/firebase.js';

export type ImageFolder = 'avatars' | 'banners' | 'food' | 'foodCompanies' | 'foodItems' | 'hotels' | 'rentacar' | 'rentacarCompanies' | 'rentacarCars' | 'travel' | 'travelCompanies' | 'travelTours';

export interface StoredImage {
  id: string;          // uuid — becomes the uploads-collection doc id
  url: string;
  storagePath: string;
  mimeType: string;
  size: number;
}

/**
 * Stores one already-validated (type + size) file in Firebase Storage
 * under folder/<uuid>.<ext>. The original filename is discarded entirely
 * except for its extension — this prevents filename collisions between
 * different users, strips any path-traversal attempts embedded in a
 * malicious filename, and avoids leaking the user's local file naming.
 */
export async function storeImage(file: Express.Multer.File, folder: ImageFolder): Promise<StoredImage> {
  const id = randomUUID();
  const ext = resolveSafeExtension(file);
  const storagePath = `${folder}/${id}${ext}`;

  const blob = bucket.file(storagePath);
  await blob.save(file.buffer, {
    contentType: file.mimetype,
    public: true,
    metadata: { cacheControl: 'public, max-age=31536000, immutable' },
  });

  return { id, url: blob.publicUrl(), storagePath, mimeType: file.mimetype, size: file.size };
}

/**
 * Derives the extension from the validated MIME type rather than trusting
 * file.originalname's extension (a client could upload real image bytes
 * with a ".exe" name, or vice versa — fileFilter already checked the
 * actual mimetype multer/browser reports, so we key off that instead).
 */
function resolveSafeExtension(file: Express.Multer.File): string {
  const map: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
  };
  return map[file.mimetype] ?? (path.extname(file.originalname).toLowerCase() || '.jpg');
}

export async function storeImages(files: Express.Multer.File[], folder: ImageFolder): Promise<StoredImage[]> {
  return Promise.all(files.map((f) => storeImage(f, folder)));
}