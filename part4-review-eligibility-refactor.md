# Baltazar Backend — Refactor Plan 1 of 2: Review Eligibility on Detail Responses

> Paste this file as a standalone prompt to your coding agent. It contains full
> context and one self-contained refactor. Run `tsc --noEmit` and the existing
> `vitest` suite after applying it, before considering the task done.

> **Scope note:** this plan is about *review workflow* only — whether a user
> is allowed to submit a review, and whether they already have. It does
> **not** touch how `rating`/`reviewCount` are computed or displayed on the
> resource itself. That is a separate, related concern — see
> `part5-rating-aggregation-refactor.md` ("Refactor Plan 2 of 2"). The two can
> be implemented in either order, but Plan 2 should land first if you want the
> `reviewEligibility` object in this plan to sit next to an already-trustworthy
> `rating`/`reviewCount` on the same response — otherwise it'll sit next to a
> value that's still admin-writable junk.

---

## CONTEXT

This is a Node.js/Express + TypeScript + Firestore backend for a multi-domain
consumer app (rent-a-car, travel, hotel, food, booking, payments). Relevant
files live under `src/modules/*` (controller/routes/schema/service per
domain), `src/middlewares`, `src/utils`, `src/config`. Zod is used for
request validation. Firestore is the database (via `db.collection(...)`).

Reviews already exist as their own module (`src/modules/reviews/*`) with a
working eligibility rule in `reviews.service.ts` → `canReview()`:
- For `targetType: 'COMPANY'` → eligible if the user has a `CONFIRMED` order
  whose `details.companyId` matches the target.
- For any other `targetType` (`HOTEL`, `RENT_A_CAR`, `TRAVEL`, `FOOD`) →
  eligible if the user has a `CONFIRMED` order whose `serviceId` matches the
  exact target (the specific hotel/car/tour/food item, not just "any item of
  that type from that company").

This rule is correct and must be preserved exactly as-is — this refactor does
not change *who* is eligible, only *where and how* the frontend finds out.

---

## GOAL

Right now, the only way for a client to know "can I leave a review for this
hotel/car/tour/food item/company?" is to call `POST /api/reviews` and see if
it succeeds or returns `403 REVIEW_NOT_ELIGIBLE`. There is no way to know
*before* showing a "Write a review" button in the UI.

We want this eligibility information to come back **embedded directly in the
GET-by-id response** of the resource itself (hotel detail, car detail, tour
detail, food item detail, and each vertical's company detail), computed for
the *currently authenticated user making that specific request*. No separate
"check eligibility" endpoint, and no separate "add rating" endpoint unless
explicitly decided below — the frontend fetches the item, and the eligibility
data is already there in the payload.

---

## STEP 1 — Add `optionalAuth` to every detail (GET by id) route that currently has none

Checked against the current routers, these detail routes do **not** currently
run any auth middleware at all (so `req.user` is always `undefined` on them,
even when a valid token is sent):

- `hotel.routes.ts` → `GET /:id` (hotel detail)
- `hotel.routes.ts` → `GET /:id/rooms` (room list — lower priority, see Step 4)
- `rentacar.routes.ts` → `GET /companies/:id`
- `rentacar.routes.ts` → `GET /cars/:id`
- `food.routes.ts` → `GET /companies/:id`
- `food.routes.ts` → `GET /items/:id`
- `travel.routes.ts` → `GET /companies/:id`
- `travel.routes.ts` → `GET /tours/:id`

**Fix:** add the existing `optionalAuth` middleware (already used correctly
on `GET /api/reviews` and `GET /api/home/explore` — copy that exact usage
pattern) to each of the routes above:
```ts
router.get('/:id', optionalAuth, getHotelByIdController);
```
`optionalAuth` must not reject unauthenticated requests — it only populates
`req.user` when a valid token is present, and leaves it `undefined` otherwise
(confirm this is in fact its current behavior in `src/middlewares/optionalAuth.ts`
before reusing it; do not change its behavior as part of this task).

List endpoints (`GET /hotel`, `GET /cars`, `GET /tours`, `GET /items`,
`GET /companies`) are **out of scope** for this refactor — only single-item
detail endpoints get the eligibility field, to avoid N extra Firestore reads
per list request. See Step 4 for the reasoning.

---

## STEP 2 — Extract `canReview()` into a shared, reusable service function

`canReview()` currently lives only inside `reviews.service.ts` and is not
exported for use by other modules. Extract it (or a thin wrapper around it)
into a shared location so hotel/car/tour/food-item/company services can call
it without creating circular imports between domain modules and the reviews
module.

Suggested location: `src/modules/reviews/reviews.service.ts` already exports
functions — just add and export a new function alongside the existing ones,
e.g.:

```ts
// reviews.service.ts

export interface ReviewEligibility {
  eligible: boolean;       // has a qualifying CONFIRMED order for this exact target
  alreadyReviewed: boolean;
  canSubmit: boolean;      // eligible && !alreadyReviewed
}

export async function getReviewEligibility(
  userId: string | undefined,
  targetType: 'RENT_A_CAR' | 'TRAVEL' | 'HOTEL' | 'FOOD' | 'COMPANY',
  targetId: string,
): Promise<ReviewEligibility> {
  if (!userId) {
    return { eligible: false, alreadyReviewed: false, canSubmit: false };
  }

  const eligible = await canReview(userId, targetType, targetId);

  const existingReview = await reviewsCollection
    .where('userId', '==', userId)
    .where('targetId', '==', targetId)
    .limit(1)
    .get();
  const alreadyReviewed = !existingReview.empty;

  return { eligible, alreadyReviewed, canSubmit: eligible && !alreadyReviewed };
}
```

This mirrors the exact duplicate-check already done inside
`createReview()` — do not reimplement that query differently, reuse the same
query shape so behavior stays identical between "what GET tells you" and
"what POST actually enforces."

---

## STEP 3 — Call it from each domain's `getXById` service function and include it in the response

Naming: do **not** use `isUserRatable` or `isCommentActive` — both are vague
about what they gate (rating? commenting? both?) and inconsistent with each
other. Use a single nested object, consistently named across all five
resource types:

```json
{
  "id": "...",
  "name": { "az": "...", "en": "...", "ru": "..." },
  "...": "...rest of the existing resource fields...",
  "reviewEligibility": {
    "eligible": true,
    "alreadyReviewed": false,
    "canSubmit": true
  }
}
```

Field name: `reviewEligibility`. This name says what it's for (review
eligibility, not "rating" or "comment" separately — see Step 5 for why those
stay unified), and the three inner booleans are self-explanatory without
needing a naming decision per resource type. Do not invent a different key
name per module — `hotel.service.ts`, `rentacar.service.ts`, `food.service.ts`,
and `travel.service.ts` must all use exactly this same shape and key.

Apply this to:
- `hotel.service.ts` → `getHotelById()` — call
  `getReviewEligibility(userId, 'HOTEL', id)`
- `rentacar.service.ts` → `getCompanyById()` — call with `'COMPANY'`
- `rentacar.service.ts` → `getCarById()` — call with `'RENT_A_CAR'`
- `food.service.ts` → `getCompanyById()` — call with `'COMPANY'`
- `food.service.ts` → `getFoodItemById()` — call with `'FOOD'`
- `travel.service.ts` → `getCompanyById()` — call with `'COMPANY'`
- `travel.service.ts` → `getTourById()` — call with `'TRAVEL'`

Each of these `getXById` functions needs to accept the requesting user's id
(or `undefined`) as a new parameter, threaded through from the controller,
e.g.:
```ts
// hotel.controller.ts
export const getHotelByIdController = catchAsync(async (req: Request, res: Response) => {
  const hotel = await hotelService.getHotelById(req.params.id as string, req.user?.userId);
  res.status(200).json({ success: true, data: hotel });
});
```

**Important — company-vs-target-id distinction:** for `targetType: 'COMPANY'`,
the id passed to `getReviewEligibility` must be the **company's own id** (the
one in the URL), and `canReview()`'s existing `COMPANY` branch already
correctly checks `details.companyId` on orders, not `serviceId` — do not
change that branch's matching logic, only wire the call through.

---

## STEP 4 — Do not add this to list endpoints

Explicitly **excluded from this refactor**: `GET /hotel`, `GET /cars`,
`GET /tours`, `GET /items`, `GET /companies` (rentacar/food/travel). Adding a
per-user Firestore lookup to every item in a paginated (or, currently,
unpaginated — see the earlier pagination finding) list would multiply read
cost by the page size on every list request. If a future requirement needs
this on lists too, it should be batched (e.g. one query for "all of this
user's CONFIRMED orders' serviceIds", intersected client-side against the
list results) rather than looping `getReviewEligibility()` per row — that's a
separate, larger task and out of scope here.

---

## STEP 5 — Open decision: keep rating bundled inside `POST /api/reviews`, or add a separate "rate only" endpoint?

Right now `POST /api/reviews` requires both `rating` (1–5) and `comment`
(1–2000 chars) together — there is no way to submit just a star rating
without text, or just a comment update without changing the rating (well,
`PUT /api/reviews/{id}` does allow updating either independently, but
*creation* requires both).

This refactor does **not** decide this on its own. Flag it explicitly and
pick one of the following before implementing anything beyond Steps 1–4:

- **Option A — keep as-is.** `reviewEligibility.canSubmit` just gates whether
  the existing combined review form (rating + comment) should be shown.
  Simplest, no schema changes needed.
- **Option B — make `comment` optional on creation.** Change
  `createReviewSchema` so `comment` is optional (e.g. `min(1).max(2000).optional()`),
  allowing a star-only rating with no written comment. `rating` stays
  required in both cases — a review always needs at least a rating.
- **Option C — split into two endpoints.** Add a separate
  `POST /api/reviews/rating-only` (or similar) alongside the existing
  `POST /api/reviews`. Adds surface area and an extra "did they already rate
  vs already review" distinction that doesn't exist anywhere else in the data
  model right now (a `Review` doc only has one `rating` + one `comment`
  field) — this would need a data model change too, not just a route change.

**Do not implement Option C without confirming the data model change with
whoever owns the reviews module** — it's a bigger change than Steps 1–4 and
affects the `Review` schema itself, not just how eligibility is surfaced.

---

## STEP 6 — Firestore index check

`getReviewEligibility()` (via `canReview()`) already runs compound `.where()`
queries (`userId` + `serviceId`/`details.companyId` + `status`). These are
now being called on every authenticated detail-page view instead of only on
review submission, so query volume goes up significantly. Before shipping:
- Confirm the required Firestore composite indexes already exist (check
  `firestore.indexes.json` or the Firebase console) for:
  - `orders`: `userId ASC, serviceId ASC, status ASC`
  - `orders`: `userId ASC, details.companyId ASC, status ASC`
  - `reviews`: `userId ASC, targetId ASC`
- If any of these are missing, Firestore will throw a runtime error on first
  use with a direct link to auto-create the index — do not silently catch and
  swallow that error; let it surface during testing so it gets created before
  production traffic hits it.

---

## ACCEPTANCE CRITERIA

- [ ] `optionalAuth` is applied to all eight routes listed in Step 1; none of
      them reject unauthenticated requests (verify with a plain `curl` with
      no `Authorization` header — should still return 200).
- [ ] `getReviewEligibility()` is exported from `reviews.service.ts` (or an
      equivalent shared location) and used — not reimplemented — by all four
      domain services listed in Step 3.
- [ ] `GET /api/services/hotel/{id}` (and the equivalent car/tour/food-item/
      company detail endpoints) returns a `reviewEligibility` object with
      `eligible`, `alreadyReviewed`, `canSubmit` booleans.
- [ ] An anonymous request (no token) to any of these detail endpoints
      returns `reviewEligibility: { eligible: false, alreadyReviewed: false,
      canSubmit: false }`, not an error and not a missing field.
- [ ] A user with a `CONFIRMED` order for the exact resource gets
      `canSubmit: true` until they submit a review, after which
      `alreadyReviewed: true` and `canSubmit: false` on the next fetch.
- [ ] `COMPANY`-type eligibility still matches on `details.companyId`, not
      `serviceId` — confirm with a test where the user ordered a *different*
      product from the *same* company and still gets `eligible: true` for the
      company page.
- [ ] The decision from Step 5 is explicitly recorded (which option was
      chosen and why) before any schema change tied to it is made.
- [ ] List endpoints (`GET /hotel`, `/cars`, `/tours`, `/items`,
      `/companies`) are unchanged — no `reviewEligibility` field added there.
- [ ] Required Firestore composite indexes exist and are verified, not just
      assumed.

---

## General instructions for the agent

- Run `tsc --noEmit` and the existing `vitest` suite after this refactor,
  before considering the task done.
- Keep the diff scoped to what is described above — do not refactor unrelated
  code "while you're in there."
- Do not implement Step 5 Option C without explicit confirmation — stop and
  ask instead of guessing which option is wanted.
- Every new code path must produce a proper error response for invalid input
  (using the existing `AppError` / `validate()` middleware conventions
  already used throughout the codebase) — never a silent no-op.
