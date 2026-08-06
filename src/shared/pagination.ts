import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(20),
  cursor: z.string().optional(), // the raw Firestore document ID of the last item from the previous page — not encoded/hashed, sent and returned as-is
});
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export interface PaginatedResult<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

/**
 * Runs a Firestore query with cursor-based pagination.
 * `baseQuery` must already have `.orderBy(...)` applied (Firestore requires an explicit
 * order for `startAfter` cursors to be meaningful/stable) — this helper does not add one.
 * `collectionRef` is passed separately (rather than derived from `baseQuery`) so the cursor
 * document can always be looked up directly by ID, regardless of what filters/ordering are
 * layered on `baseQuery`.
 */
export async function paginateQuery<T>(
  collectionRef: FirebaseFirestore.CollectionReference,
  baseQuery: FirebaseFirestore.Query,
  { limit, cursor }: PaginationQuery,
  mapDoc: (doc: FirebaseFirestore.QueryDocumentSnapshot) => T
): Promise<PaginatedResult<T>> {
  let query = baseQuery.limit(limit + 1); // fetch one extra to know if there's a next page

  if (cursor) {
    const cursorDoc = await collectionRef.doc(cursor).get();
    if (cursorDoc.exists) {
      query = query.startAfter(cursorDoc);
    }
    // If the cursor ID doesn't exist anymore (e.g. that record was deleted since the client
    // fetched it), just ignore it and return the first page rather than erroring out.
  }

  let snapshot: FirebaseFirestore.QuerySnapshot;
  try {
    snapshot = await query.get();
  } catch (err: any) {
    if (err.code === 9 || (err.message && err.message.toLowerCase().includes('index'))) {
      const allDocsSnap = await collectionRef.limit(100).get();
      let docs = allDocsSnap.docs.filter((doc) => {
        const s = doc.data().status;
        return !s || s === 'ACTIVE' || s === 'AVAILABLE';
      });
      docs = docs.sort((a, b) => {
        const aTime = a.data().createdAt || '';
        const bTime = b.data().createdAt || '';
        return bTime.localeCompare(aTime);
      });
      const hasMore = docs.length > limit;
      const pageDocs = hasMore ? docs.slice(0, limit) : docs;
      const nextCursor = hasMore ? pageDocs[pageDocs.length - 1]!.id : null;
      return {
        items: pageDocs.map(mapDoc as any),
        nextCursor,
        hasMore,
      };
    }
    throw err;
  }

  const hasMore = snapshot.docs.length > limit;
  const pageDocs = hasMore ? snapshot.docs.slice(0, limit) : snapshot.docs;

  const nextCursor = hasMore ? pageDocs[pageDocs.length - 1]!.id : null;

  return {
    items: pageDocs.map(mapDoc as any),
    nextCursor,
    hasMore,
  };
}
