# Baltazar Backend — Refactor Plan 2 of 2: Server-Computed Rating Aggregation

> Paste this file as a standalone prompt to your coding agent. It contains full
> context and one self-contained refactor. Run `tsc --noEmit` and the existing
> `vitest` suite after applying it, before considering the task done.

> **Scope note:** this plan is about how `rating`/`reviewCount` are computed
> and stored on hotels/cars/tours/food items/companies. It does not touch
> review *eligibility* (who is allowed to submit a review) — that's
> `part4-review-eligibility-refactor.md` ("Refactor Plan 1 of 2"). The two
> plans touch the same files (`reviews.service.ts` and the four domain
> services) but for different reasons — read both before starting either, to
> avoid two separate PRs conflicting on the same functions.

---

## CONTEXT

This is a Node.js/Express + TypeScript + Firestore backend for a multi-domain
consumer app (rent-a-car, travel, hotel, food, booking, payments). Relevant
files live under `src/modules/*` (controller/routes/schema/service per
domain), `src/middlewares`, `src/utils`, `src/config`. Zod is used for
request validation. Firestore is the database (via `db.collection(...)`).

Confirmed current state (this is the bug this plan fixes):
- `rating` and `reviewCount` are **plain client-writable fields** on the
  admin create/update schemas for every reviewable resource:
  `hotel.schema.ts` (`createHotelSchema`), `rentacar.schema.ts`
  (`createRentACarCompanySchema` and `createCarSchema`), `food.schema.ts`
  (`createFoodCompanySchema` and `createFoodItemSchema`), `travel.schema.ts`
  (`createTravelCompanySchema` and `createTourSchema`) — all defined as
  `rating: z.number().min(0).max(5).default(0)` and
  `reviewCount: z.number().int().min(0).default(0)`, meaning an admin (or
  anyone with admin-role access) can set these to any value on create or
  update, and nothing anywhere in the codebase ever recomputes them from
  actual review data.
- `reviews.service.ts` (`createReview`, `updateReview`, `deleteReview`) writes
  to the `reviews` collection only — it never touches the target
  hotel/car/tour/food-item/company document at all.
- Companies (rent-a-car, food, travel) all live in a single shared Firestore
  collection: `COLLECTIONS.COMPANIES` (`'companies'`), distinguished by a
  `serviceType` field. Hotels, cars, tours, and food items live in their own
  separate collections (`HOTELS`, `CARS`, `TRAVELS`, `FOOD_ITEMS`).

---

## GOAL

`rating` and `reviewCount` must become **fully server-computed, derived
fields** — never accepted as input on create or update, and automatically
recalculated every time a review is created, updated (rating changed), or
deleted. Business rule for the initial/empty state, exactly as specified:

- **A newly created resource with zero reviews displays `rating: 5`** (a
  friendly default, not a real average — there is nothing to average yet).
- **The moment the first real review comes in, `rating` becomes the actual
  average of submitted ratings** — the placeholder `5` is not blended into
  that average, it's simply replaced by real data.
- **Every subsequent review (create/update/delete) recalculates the average**
  based on the current full set of ratings, weighted correctly by count — not
  a naive "average of averages" that drifts over time.
- **If all reviews for a resource are later deleted and `reviewCount` returns
  to 0, `rating` reverts to the `5` placeholder.**

---

## STEP 1 — Add an internal `ratingSum` field alongside `rating`/`reviewCount`

Do not try to maintain a running average by repeatedly recomputing
`(oldAverage * oldCount ± delta) / newCount` — that formula accumulates
floating-point rounding error over many updates, and it cannot cleanly
"un-average" a deleted or edited review without also knowing the exact old
value (which you do have here, but the safer and simpler approach avoids
needing to reason about it at all).

Instead, store the raw sum and derive the average on write:

```
ratingSum: number     // sum of all individual review ratings (internal only)
reviewCount: number   // count of reviews contributing to ratingSum
rating: number        // derived: reviewCount > 0 ? round2(ratingSum / reviewCount) : 5
```

`ratingSum` is an internal bookkeeping field — it must never be part of any
public API response. Exclude it explicitly in every `getXById` / `getXs` DTO
mapping the same way `passwordHash` is already excluded from user responses
(follow that existing pattern in `users.service.ts` → `getProfile()`).

Add `ratingSum: z.number().min(0).default(0)` to each collection's internal
Firestore document shape (not to the public create/update Zod schemas — see
Step 3) so it's initialized to `0` at creation time alongside `reviewCount: 0`.

---

## STEP 2 — Add a shared, transactional rating-aggregation function

Add this to `reviews.service.ts` (or a new shared file, e.g.
`src/modules/reviews/ratingAggregation.ts`, if you'd rather keep
`reviews.service.ts` from growing too large — either is fine, just don't
duplicate this logic per domain module):

```ts
const TARGET_COLLECTION_MAP: Record<string, string> = {
  HOTEL: COLLECTIONS.HOTELS,
  RENT_A_CAR: COLLECTIONS.CARS,
  TRAVEL: COLLECTIONS.TRAVELS,
  FOOD: COLLECTIONS.FOOD_ITEMS,
  COMPANY: COLLECTIONS.COMPANIES,
};

function round2(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Atomically applies a rating change to the target resource.
 * ratingDelta: the new review's rating (create), the difference
 *   (newRating - oldRating) on update, or the negative of the removed
 *   review's rating (delete).
 * countDelta: +1 (create), 0 (update), -1 (delete).
 */
export async function applyRatingDelta(
  targetType: string,
  targetId: string,
  ratingDelta: number,
  countDelta: 1 | 0 | -1,
): Promise<void> {
  const collectionName = TARGET_COLLECTION_MAP[targetType];
  if (!collectionName) return; // unknown targetType — nothing to aggregate

  const docRef = db.collection(collectionName).doc(targetId);

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(docRef);
    if (!snap.exists) return; // target was deleted concurrently — nothing to update

    const data = snap.data()!;
    const currentSum = (data.ratingSum as number) ?? 0;
    const currentCount = (data.reviewCount as number) ?? 0;

    const newSum = Math.max(0, currentSum + ratingDelta);
    const newCount = Math.max(0, currentCount + countDelta);
    const newRating = newCount > 0 ? round2(newSum / newCount) : 5;

    tx.update(docRef, {
      ratingSum: newSum,
      reviewCount: newCount,
      rating: newRating,
    });
  });
}
```

Using a Firestore transaction (not `FieldValue.increment()` alone) is
required here because `rating` itself must be derived and written in the same
atomic step as `ratingSum`/`reviewCount` — two concurrent review submissions
must not read-modify-write past each other and leave `rating` inconsistent
with the actual `ratingSum`/`reviewCount` that landed.

---

## STEP 3 — Wire it into `createReview`, `updateReview`, `deleteReview`

Each of these already writes to the `reviews` collection — call
`applyRatingDelta()` right after (or, if you want full atomicity between the
review write and the aggregate update, inside the same transaction — see the
note below).

- **`createReview(userId, input)`** → after the review doc is created, call:
  ```ts
  await applyRatingDelta(input.targetType, input.targetId, input.rating, 1);
  ```
- **`updateReview(id, userId, input)`** → only if `input.rating` is present
  and different from the stored value. Fetch the existing review first (the
  function already does, via `assertOwner` → `getReviewById`), then:
  ```ts
  if (input.rating !== undefined && input.rating !== existingReview.rating) {
    const delta = input.rating - existingReview.rating;
    await applyRatingDelta(existingReview.targetType, existingReview.targetId, delta, 0);
  }
  ```
- **`deleteReview(id, userId, role)`** → fetch the review before deleting it
  (already done via `assertOwner`), then:
  ```ts
  await applyRatingDelta(review.targetType, review.targetId, -review.rating, -1);
  ```

**Atomicity note:** the simplest correct version calls `applyRatingDelta()`
right after the review write succeeds, as a second operation — accept that in
a rare crash-between-the-two-writes scenario the review and the aggregate
could momentarily disagree. If you want single-transaction atomicity instead
(review write + aggregate update as one all-or-nothing operation), both
writes need to happen inside one `db.runTransaction()` block together — this
is a valid choice too, but note that `createReview()` currently does its
duplicate-review check (`existingReview` query) *before* the write, outside
any transaction; merging everything into one transaction means restructuring
that check to happen inside the transaction as well (Firestore requires all
reads in a transaction to happen before any writes). Pick one approach and
apply it consistently across create/update/delete — don't mix.

---

## STEP 4 — Remove `rating`/`reviewCount` from every admin create/update schema

These fields must disappear entirely from client input, not just be ignored
server-side (silently accepting-and-discarding invites confusion when an
admin sends `rating: 3` and sees `rating: 5` come back with no explanation).

Remove these two lines from each of the following schemas:
- `hotel.schema.ts` → `createHotelSchema` (and therefore `updateHotelSchema`,
  which is `createHotelSchema.partial()`)
- `rentacar.schema.ts` → `createRentACarCompanySchema` and `createCarSchema`
  (and their `.partial()` update variants)
- `food.schema.ts` → `createFoodCompanySchema` and `createFoodItemSchema`
  (and their `.partial()` update variants)
- `travel.schema.ts` → `createTravelCompanySchema` and `createTourSchema`
  (and their `.partial()` update variants)

Then, in each domain's `createX()` service function, explicitly set the
initial values server-side regardless of what (if anything) was in the
request body:
```ts
const docRef = await hotelsCollection.add({
  ...input,          // input no longer contains rating/reviewCount at all
  rating: 5,
  reviewCount: 0,
  ratingSum: 0,
  serviceType: 'HOTEL',
  createdAt: new Date().toISOString(),
});
```

For `updateX()` functions: since `rating`/`reviewCount`/`ratingSum` are no
longer part of the update schema either, `input` passed to
`.update(input)` will simply never contain them — no extra guard needed
there, removing them from the schema is sufficient to prevent an admin from
ever overwriting them through that path.

---

## ACCEPTANCE CRITERIA

- [ ] Creating a new hotel/car/tour/food item/company (with or without a
      `rating`/`reviewCount` field in the request body — the field should be
      rejected or ignored by the schema either way, confirm which) always
      results in `rating: 5`, `reviewCount: 0`, `ratingSum: 0` in Firestore.
- [ ] `PUT` (update) on any of these resources cannot change `rating`,
      `reviewCount`, or `ratingSum` — sending them in the body has no effect
      (ideally the schema rejects unknown/extra fields outright, per however
      `validate()` / Zod is currently configured for strictness).
- [ ] Submitting a review with `rating: 4` on a resource with `reviewCount: 0`
      results in `rating: 4`, `reviewCount: 1` on that resource (not blended
      with the `5` placeholder).
- [ ] Submitting a second review with `rating: 2` results in `rating: 3`
      (`(4 + 2) / 2`), `reviewCount: 2`.
- [ ] Editing the first review's rating from `4` to `5` results in `rating: 3.5`
      (`(5 + 2) / 2`), `reviewCount` unchanged at `2`.
- [ ] Deleting the second review (`rating: 2`) results in `rating: 5`
      (`(5) / 1`), `reviewCount: 1`.
- [ ] Deleting the last remaining review results in `reviewCount: 0` and
      `rating` reverting to the `5` placeholder.
- [ ] `ratingSum` never appears in any public API response (hotel/car/tour/
      food-item/company detail or list endpoints).
- [ ] Two concurrent review submissions for the same resource (simulate with
      `Promise.all([...])` in a test) both land correctly — final
      `reviewCount` reflects both, final `rating` reflects both ratings, no
      lost update.
- [ ] `COMPANY`-type reviews correctly update the shared `companies`
      collection document by id — verify with a company that belongs to each
      of the three verticals (rent-a-car, food, travel), since they all share
      one collection.

---

## General instructions for the agent

- Run `tsc --noEmit` and the existing `vitest` suite after this refactor,
  before considering the task done.
- Keep the diff scoped to what is described above — do not refactor unrelated
  code "while you're in there."
- Pick one atomicity approach in Step 3 (sequential vs. single-transaction)
  and apply it consistently to create/update/delete — do not mix approaches
  across the three functions.
- Every new code path must produce a proper error response for invalid input
  (using the existing `AppError` / `validate()` middleware conventions
  already used throughout the codebase) — never a silent no-op.
