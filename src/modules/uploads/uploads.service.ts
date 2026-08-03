import { db, bucket } from '../../config/firebase.js';
import { COLLECTIONS } from '../../config/collections.js';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { AppError } from '../../errors/AppError.js';
import type { UploadRecord, CreateUploadRecordInput } from './uploads.types.js';

const uploadsCollection = db.collection(COLLECTIONS.UPLOADS);
const PENDING_TTL_HOURS = 24;
const CLEANUP_BATCH_SIZE = 200;

/**
 * Creates the tracking doc right after a file is stored. `id` is still
 * the uuid used for the Storage path — it's the Firestore doc id, but it
 * is NEVER returned to the client. The client only ever sees `url`.
 */
export async function createUploadRecord(input: CreateUploadRecordInput): Promise<UploadRecord> {
  const record: UploadRecord = { ...input, status: 'pending', createdAt: Timestamp.now() };
  await uploadsCollection.doc(input.id).set(record);
  return record;
}

/**
 * Looks the upload up BY URL (what the client actually sends back on
 * entity create/update), confirms ownership, flips 'pending' -> 'confirmed'.
 *
 * Firestore auto-indexes single fields, so `where('url', '==', url)`
 * needs no manual composite index — unlike the old `(status, createdAt)`
 * query used by cleanup, which still does.
 */
export async function confirmUploadByUrl(url: string, ownerId: string): Promise<string> {
  const snapshot = await uploadsCollection.where('url', '==', url).limit(1).get();

  if (snapshot.empty) {
    throw new AppError(404, 'IMAGE_NOT_FOUND', 'No upload found for this URL');
  }

  const doc = snapshot.docs[0]!;
  const data = doc.data() as UploadRecord;

  if (data.ownerId !== ownerId) {
    // Same error shape as "not found" — don't leak that the URL exists
    // but belongs to someone else.
    throw new AppError(403, 'IMAGE_NOT_FOUND', 'This upload does not belong to you');
  }

  if (data.status === 'pending') {
    await doc.ref.update({ status: 'confirmed', confirmedAt: FieldValue.serverTimestamp() });
  }

  return data.url;
}

/** Cleanup job — unchanged from Part 1, still keyed by status + createdAt. */
export async function cleanupExpiredUploads(): Promise<{ deleted: number; failed: number }> {
  const cutoff = Timestamp.fromMillis(Date.now() - PENDING_TTL_HOURS * 60 * 60 * 1000);

  const snapshot = await uploadsCollection
    .where('status', '==', 'pending')
    .where('createdAt', '<', cutoff)
    .limit(CLEANUP_BATCH_SIZE)
    .get();

  if (snapshot.empty) return { deleted: 0, failed: 0 };

  const results = await Promise.allSettled(
    snapshot.docs.map(async (doc) => {
      const data = doc.data() as UploadRecord;
      await bucket.file(data.storagePath).delete({ ignoreNotFound: true });
      await doc.ref.delete();
    }),
  );

  const deleted = results.filter((r) => r.status === 'fulfilled').length;
  return { deleted, failed: results.length - deleted };
}

/**
 * NEW — admin listing. Returns every tracked upload (pending + confirmed),
 * newest first, with simple cursor pagination via `startAfter` (a
 * document id from a previous page's last item).
 */
export async function listAllUploads(params: {
  limit: number;
  startAfterId?: string;
  status?: 'pending' | 'confirmed';
}): Promise<{ items: UploadRecord[]; nextCursor: string | null }> {
  let query: FirebaseFirestore.Query = uploadsCollection.orderBy('createdAt', 'desc');

  if (params.status) {
    query = query.where('status', '==', params.status).orderBy('createdAt', 'desc');
  }

  if (params.startAfterId) {
    const cursorDoc = await uploadsCollection.doc(params.startAfterId).get();
    if (cursorDoc.exists) query = query.startAfter(cursorDoc);
  }

  const snapshot = await query.limit(params.limit).get();
  const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as UploadRecord);
  const nextCursor = items.length === params.limit ? items[items.length - 1]!.id : null;

  return { items, nextCursor };
}
