# Refactor Task — Part 2 of 3: Home Module — Banner CRUD + Image Upload

## Project context

This is a Node.js + TypeScript + Express backend for a multi-service booking app (hotel, rent-a-car, food, travel, orders, payments, reviews, wishlist, home/banner, admin), using Firestore as the database and Zod for request validation. Modules follow this structure:

```
src/modules/<domain>/
  <domain>.routes.ts
  <domain>.controller.ts
  <domain>.service.ts
  <domain>.schema.ts
```

Auth middleware available:
- `requireAuth` — requires a valid JWT, populates `req.user` (`id`, `role`, where `role` is `'USER' | 'ADMIN'`).
- `requireRole('ADMIN')` — used after `requireAuth`, rejects non-admins.

There is a `home` module with two existing GET endpoints:

```
GET /api/home/banner
GET /api/home/explore
```

## Current state of each endpoint

**`GET /api/home/explore`** is fully implemented and correct — it's backed by a real Firestore collection called `USER_INTERESTS`, which tracks per-user view counts per `serviceType` (via a function like `incrementUserInterest`), and ranks service categories by those counts, falling back to a default order (`RENT_A_CAR`, `HOTEL`, `TRAVEL`, `FOOD`) for new/anonymous users. Example response:

```json
{
  "success": true,
  "data": [
    { "serviceType": "RENT_A_CAR", "title": { "az": "...", "en": "...", "ru": "..." }, "items": [] },
    { "serviceType": "HOTEL", "title": { "az": "...", "en": "...", "ru": "..." }, "items": [] },
    { "serviceType": "TRAVEL", "title": { "az": "...", "en": "...", "ru": "..." }, "items": [] },
    { "serviceType": "FOOD", "title": { "az": "...", "en": "...", "ru": "..." }, "items": [] }
  ]
}
```

**Do not modify `explore` in any way. Leave it exactly as it is.**

**`GET /api/home/banner`** is currently a stub: the service function just returns a hardcoded in-memory array, with no Firestore collection behind it and no admin CRUD at all. Example current output:

```json
{
  "success": true,
  "data": [
    { "image": "https://baltazar-app.example.com/banner/rentacar.jpg", "link": "/services/rentacar", "order": 1 },
    { "image": "https://baltazar-app.example.com/banner/travel.jpg", "link": "/services/travel", "order": 2 }
  ]
}
```

There is no `banners` entry in the `COLLECTIONS` constants file, and no way for an admin to create/edit/delete banners.

## Existing infrastructure you should reuse (already built, just unused)

- `upload.ts` — a multer middleware configured with memory storage and a 5MB file size limit. Exports something usable as `upload.single('image')`.
- `uploadImage.ts` — a helper function that takes a multer file object and a folder name, uploads it to Firebase Storage, and returns a public URL. It has a typed `ImageFolder` union type restricting which folder names are valid.

Currently nothing in the codebase calls `upload.single(...)` in any route — no real file upload endpoint exists yet anywhere in the project. You are building the first one.

## What you must do

### 1. Add a `banners` Firestore collection

Add a `BANNERS` entry to the `COLLECTIONS` constants file. Documents in this collection should have:

- `image: string` — public URL of the banner image
- `link: string` — where the banner should navigate to when tapped
- `order: number` — display order (see Part 3 for sorting requirement)
- `isActive: boolean` — whether the banner should currently be shown

### 2. Add a Zod schema for banners

Create `banner.schema.ts` (or add to `home.schema.ts` if that's the existing convention) with a schema for creating/updating a banner:

- `link`: required string
- `order`: required number
- `isActive`: optional boolean, default `true`
- `image`: **not** required in the body schema — when a file is uploaded via multipart, the server fills this field itself after uploading to Firebase Storage. Only fall back to accepting `image` as a plain string in the body if no file was uploaded (support both flows).

### 3. Add `'banners'` to the `ImageFolder` type in `uploadImage.ts`

So banner uploads can pass `'banners'` as the folder argument.

### 4. Implement banner CRUD in the `home` module

Routes to add in `home.routes.ts` (keep the existing `GET /banner` and `GET /explore`, just make `GET /banner` real instead of hardcoded):

```
GET    /api/home/banner        (public, no auth required)
POST   /api/home/banner        (requireAuth, requireRole('ADMIN'), upload.single('image'))
PUT    /api/home/banner/:id    (requireAuth, requireRole('ADMIN'), upload.single('image'))
DELETE /api/home/banner/:id    (requireAuth, requireRole('ADMIN'))
```

Controller logic for create (`PUT` should follow the same image-handling pattern):

```ts
export const createBannerController = catchAsync(async (req, res) => {
  const imageUrl = req.file ? await uploadImage(req.file, 'banners') : req.body.image;
  const banner = await homeService.createBanner({ ...req.body, image: imageUrl });
  res.status(201).json({ success: true, data: banner });
});
```

Service layer (`home.service.ts`):
- `createBanner(data)` — writes a new document to the `BANNERS` collection.
- `updateBanner(id, data)` — updates an existing document; if a new file was uploaded, replace `image`, otherwise keep the existing value unless `image` string was explicitly passed in the body.
- `deleteBanner(id)` — deletes the document.
- `getBanners()` — replaces the current hardcoded implementation. Should query the `BANNERS` collection filtered to `isActive == true`, and must be sorted by `order` ascending (see Part 3 — this is the concrete case Part 3's rule applies to).

### 5. Validation errors

If `POST`/`PUT` is called without a file **and** without an `image` string in the body, return a validation error (Zod refine or manual check) — a banner must always end up with an image URL.

## Acceptance criteria

- `GET /api/home/banner` reads from Firestore (not a hardcoded array), returns only banners where `isActive` is true, sorted by `order` ascending.
- `GET /api/home/explore` is byte-for-byte unchanged from its current implementation.
- `POST /api/home/banner` accepts `multipart/form-data` with an `image` file field plus `link`, `order`, `isActive` fields; uploads the image to Firebase Storage under the `banners` folder; creates a Firestore document; requires `ADMIN` role.
- `PUT /api/home/banner/:id` supports updating fields and optionally replacing the image the same way; requires `ADMIN` role.
- `DELETE /api/home/banner/:id` deletes the banner; requires `ADMIN` role.
- Non-admin users get a 403 on the three admin routes; unauthenticated users get a 401.
- Do not touch Swagger/JSDoc comments in this pass — that is handled in a later task.
