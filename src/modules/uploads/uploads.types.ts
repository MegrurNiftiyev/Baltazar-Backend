import type { Timestamp } from 'firebase-admin/firestore';

export type UploadStatus = 'pending' | 'confirmed';

export interface UploadRecord {
  id: string;                 // uuid — same as the storage object's base filename
  url: string;                // public Firebase Storage URL returned to the client
  storagePath: string;        // full bucket path, e.g. "foodCompanies/<uuid>.jpg"
  folder: string;             // logical folder/category: 'avatars' | 'foodCompanies' | ...
  ownerId: string;            // req.user.userId at time of upload
  mimeType: string;
  size: number;                // bytes
  status: UploadStatus;
  createdAt: Timestamp;
  confirmedAt?: Timestamp;
}

export interface CreateUploadRecordInput {
  id: string;
  url: string;
  storagePath: string;
  folder: string;
  ownerId: string;
  mimeType: string;
  size: number;
}
