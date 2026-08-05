import fs from 'fs';
import path from 'path';

export function loc(enStr: string, azStr?: string, ruStr?: string) {
  return {
    az: azStr || enStr,
    en: enStr,
    ru: ruStr || enStr,
  };
}

export interface SeedContext {
  baseUrl: string;
  token: string;
  headers: Record<string, string>;
  testImagesDir: string;
  uploadImageFile: (filePath: string, folder: string) => Promise<string>;
}

export async function uploadImageFileHelper(baseUrl: string, token: string, filePath: string, folder: string): Promise<string> {
  const fileBuffer = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const mimeType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';

  const formData = new FormData();
  formData.append('image', new Blob([fileBuffer], { type: mimeType }), fileName);

  const res = await fetch(`${baseUrl}/api/uploads/image?folder=${folder}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    console.error(`❌ Upload failed for ${filePath} (${folder}):`, data);
    throw new Error(data.message || 'Upload failed');
  }
  console.log(`  📸 Uploaded ${fileName} -> ${data.data.url}`);
  return data.data.url;
}
