import { randomUUID } from 'node:crypto';
import { bucket } from '../config/firebase.js';

export type ImageFolder =
  | 'rentacarCompanies'
  | 'cars'
  | 'travelCompanies'
  | 'tours'
  | 'includedServices'
  | 'hotels'
  | 'rooms'
  | 'foodCompanies'
  | 'foodItems'
  | 'banners'
  | 'avatars';

export async function uploadImage(file: Express.Multer.File, folder: ImageFolder): Promise<string> {
  const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${folder}/${randomUUID()}-${safeName}`;
  const fileRef = bucket.file(path);

  await fileRef.save(file.buffer, { metadata: { contentType: file.mimetype } });
  await fileRef.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${path}`;
}

export async function uploadImages(
  files: Express.Multer.File[],
  folder: ImageFolder,
): Promise<string[]> {
  return Promise.all(files.map((file) => uploadImage(file, folder)));
}