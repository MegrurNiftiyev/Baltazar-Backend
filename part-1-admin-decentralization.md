# Refactor Task — Part 1 of 3: Admin Module Decentralization

## Project context

This is a Node.js + TypeScript + Express backend for a multi-service booking app (hotel, rent-a-car, food, travel, orders, payments, reviews, wishlist, home/banner, admin). Data is stored in Firestore. Each domain has its own module folder following this pattern:

```
src/modules/<domain>/
  <domain>.routes.ts     // Express routes + inline @swagger JSDoc comments
  <domain>.controller.ts // request handlers
  <domain>.service.ts    // Firestore access / business logic
  <domain>.schema.ts     // Zod validation schemas
```

Auth middleware available:
- `requireAuth` — requires a valid JWT, populates `req.user` (has `id` and `role`, where `role` is `'USER' | 'ADMIN'`).
- `requireRole('ADMIN')` — must be used after `requireAuth`; rejects non-admins.

## Current problem

There is a separate `admin` module (`src/modules/admin/`) that duplicates functionality already owned by other modules. It exposes these 8 endpoints, all prefixed with `/api/admin`:

```
POST   /api/admin/users/add-admin
PUT    /api/admin/users/:id/disable
GET    /api/admin/orders
GET    /api/admin/orders/:id
PUT    /api/admin/orders/:id/status
GET    /api/admin/transactions
GET    /api/admin/reviews
DELETE /api/admin/reviews/:id
```

This is architecturally wrong: order-related admin logic lives in `admin.service.ts` (functions like `getAllOrders`, `getOrderById`, `updateOrderStatus`) as a **separate, duplicated implementation** from the real `order.service.ts`, which already has its own `getOrderById` (with ownership checks) but no admin-aware variant. Same duplication pattern exists for reviews: `reviews.service.ts` already has both `deleteOwnReview` (checks ownership) and `deleteReview` (no ownership check, used by admin) as two separate functions — this one is closer to correct, it just needs to be merged into a single endpoint with role-based branching instead of two separate routers.

## What you must do

### 1. Keep only 2 endpoints in the admin module

`admin.routes.ts` should end up with only:

```
POST   /api/admin/users/add-admin
GET    /api/admin/transactions
```

These stay because they have no natural "owner" module — they are pure admin operations (promoting a user to admin, viewing a global transaction ledger). Everything else must be removed from the admin module and its logic merged into the owning module.

### 2. Move `PUT /api/admin/users/:id/disable` → `PUT /api/user/:id/disable`

- Add this route to the `user` module's routes file, guarded with `requireAuth, requireRole('ADMIN')`.
- Move the disable logic into `user.service.ts` if it isn't already reusable there.
- Delete the old route and any now-unused admin-only service code for this.

### 3. Move order admin endpoints into the `order` module

Target routes on `order.routes.ts`:

```
GET  /api/orders             (requireAuth only)
GET  /api/orders/:id         (requireAuth only)
PUT  /api/orders/:id/status  (requireAuth, requireRole('ADMIN'))  -- new route
```

Behavior required in `order.controller.ts` / `order.service.ts`:

- `GET /api/orders`: if `req.user.role === 'ADMIN'`, return **all** orders across all users, supporting the same filters the old admin endpoint supported (`status`, `userId`, `serviceType` query params). If the requester is a regular user, keep the existing behavior of returning only their own orders. Do not create two separate controller functions for this — extend the existing `getOrdersController` / `getOrders` service function with a role branch.
- `GET /api/orders/:id`: if the requester is an admin, skip the ownership check entirely (any order can be fetched by id). If the requester is a regular user, keep the existing ownership check (403/404 if the order doesn't belong to them).
- `PUT /api/orders/:id/status`: new admin-only route that sets an arbitrary order status (this is different from the existing `PUT /:id/step` and `PUT /:id/cancel`, which are user-facing state transitions). Reuse the same status-update logic that currently lives in `admin.service.ts`'s `updateOrderStatus`, just move it into `order.service.ts`.

After this, delete `getAllOrders`, `getOrderById`, `updateOrderStatus` from `admin.service.ts` — their logic now lives in `order.service.ts`.

### 4. Move review admin endpoints into the `reviews` module

Target routes on `reviews.routes.ts`:

```
GET    /api/reviews      (requireAuth only)
DELETE /api/reviews/:id  (requireAuth only)
```

Behavior required:

- `GET /api/reviews`: if the requester is an admin AND no `targetType`/`targetId` query params are given, return all reviews (this is the moderation view). If a regular user calls it, or if `targetType`/`targetId` are given, keep the current filtered behavior.
- `DELETE /api/reviews/:id`: merge `deleteOwnReview` and `deleteReview` into a single function. A review can be deleted if `req.user.id === review.userId` **OR** `req.user.role === 'ADMIN'`. Remove the separate admin-only delete route; there should be exactly one `DELETE /api/reviews/:id` route, guarded only by `requireAuth`, with the ownership-or-admin check happening inside the controller/service.

### 5. Clean up

- Remove the moved logic from `admin.controller.ts` and `admin.service.ts`.
- Remove the now-empty route definitions from `admin.routes.ts`.
- Double check no other file imports the deleted admin service functions.
- Do not touch `/api/admin/users/add-admin` or `/api/admin/transactions` — leave them exactly as they are.

## Acceptance criteria

- `admin.routes.ts` only defines `POST /users/add-admin` and `GET /transactions`.
- A regular user calling `GET /api/orders` still only sees their own orders; an admin calling the same endpoint sees everyone's orders and can filter by `status`/`userId`/`serviceType`.
- A regular user calling `GET /api/orders/:id` on someone else's order still gets rejected; an admin can fetch any order by id.
- `PUT /api/orders/:id/status` exists, requires `ADMIN` role, and updates order status.
- `GET /api/reviews` returns all reviews for an admin with no target filters, and filtered reviews otherwise.
- `DELETE /api/reviews/:id` works for the review's owner and for any admin, and rejects everyone else.
- `PUT /api/user/:id/disable` requires `ADMIN` role and works exactly as the old `PUT /api/admin/users/:id/disable` did.
- No leftover dead code in `admin.service.ts` / `admin.controller.ts` for the moved features.
- Do not touch Swagger/JSDoc comments in this pass — that will be handled separately in a later task. It's fine if the JSDoc temporarily doesn't match the new routes; just make sure the routes and logic themselves are correct.
