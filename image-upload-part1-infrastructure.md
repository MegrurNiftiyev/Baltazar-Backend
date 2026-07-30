# Image Upload Refactor — Part 1 of 3: Shared Multipart Infrastructure

## Project context

Node.js + TypeScript + Express + Firestore backend, modules under `src/modules/<domain>/{routes,controller,service,schema}.ts`. There is already ONE working file-upload endpoint (`POST /api/home/banner`) using:
- `src/middlewares/upload.ts` — `multer` configured with `memoryStorage()`, 5MB limit, exported as `upload`.
- `src/utils/uploadImage.ts` — exports `uploadImage(file, folder)` (uploads one file to Firebase Storage, returns a public URL string) and `uploadImages(files, folder)` (same, for an array — already implemented, currently unused, you will start using it in Part 2), gated by a `type ImageFolder = 'hotels' | 'cars' | 'food' | 'tours' | 'rooms' | 'banners'` union.

## Goal of this 3-part refactor

Every admin-facing create/update endpoint across every module that currently accepts image URLs as plain JSON strings (`profileImage`, `bannerImage`, `logo`, `icon`, `images: string[]`) must instead accept **real image files** via `multipart/form-data`, uploaded to Firebase Storage server-side, exactly like the banner endpoint already does — but generalized so every module reuses the same middleware instead of duplicating the banner controller's inline logic ten times. Part 1 (this document) builds that shared infrastructure. Part 2 applies it to rentacar/travel/hotel/food. Part 3 adds a dedicated user-avatar endpoint and retrofits the banner endpoint itself onto the shared infrastructure for consistency, plus fixes Swagger.

Do not skip ahead to Part 2 or Part 3's file changes while working through this document — build and unit-test the shared pieces here first, since every later part imports from here.

---

## 1. The core design problem, and the contract that solves it

`multipart/form-data` requests only carry flat string fields (plus file parts) — there is no native way to send a nested object (`name: { az, en, ru }`) or a typed array (`amenities: string[]`, `rating: number`) the way `application/json` does. If you naively read `req.body.rating` from a multipart request, you get the **string** `"4.5"`, not the number `4.5`, and `req.body.name` would be the literal string `"[object Object]"` if a client tried to just pass an object into a form field.

**The contract this refactor establishes, project-wide, for every multipart admin endpoint (not just images):** the client sends ALL non-file fields as a single JSON-stringified blob in one form field literally named `data`, and each image goes in its own separate file field (`profileImage`, `bannerImage`, `logo`, `icon`, `images`, etc., matching the schema's field name). Example of what the client sends:

```
Content-Type: multipart/form-data

data: '{"name":{"az":"Sirket","en":"Company","ru":"Компания"},"rating":0,"sectionsOrder":["about","cars"]}'
profileImage: <binary file>
bannerImage: <binary file>
images: <binary file>
images: <binary file>
images: <binary file>
```

This means: once the server JSON-parses the `data` field, every non-image field arrives with its correct native JS type (numbers stay numbers, arrays stay arrays, nested objects stay objects) — **no Zod schema needs `.coerce()` or type changes for anything except the image fields themselves**, and even the image fields' Zod types stay exactly as they are today (`z.string().optional()` / `z.array(z.string())`), because the server resolves uploaded files into URL strings and merges them into the parsed body BEFORE Zod ever sees it. This is the same trick the banner endpoint already uses (file resolved outside/around the schema, schema only ever sees strings) — Part 1 just centralizes it into reusable middleware instead of one-off controller code.

---

## 2. `src/middlewares/parseJsonPayload.ts` — new file

```ts
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

/**
 * For multipart/form-data admin requests: the client sends every non-file field
 * as a single JSON-stringified blob in a form field named `data`. This middleware
 * replaces req.body with the parsed contents of that field, so everything downstream
 * (image-resolution middleware, Zod validation, controllers) sees correctly-typed
 * JS values exactly as if this had been a normal application/json request.
 *
 * Must run AFTER multer (`upload.fields(...)` / `upload.single(...)`) and BEFORE
 * `resolveImageFields(...)` and `validate(...)`.
 *
 * If the request was NOT multipart (no `data` field present — e.g. a plain JSON
 * request, which some read/query endpoints or future non-file admin endpoints might
 * still use), this middleware is a no-op and leaves req.body untouched.
 */
export function parseJsonPayload(req: Request, _res: Response, next: NextFunction): void {
  if (typeof req.body?.data === 'string') {
    try {
      req.body = JSON.parse(req.body.data);
    } catch {
      next(new AppError(400, 'VALIDATION_ERROR', 'Invalid JSON in `data` field'));
      return;
    }
  }
  next();
}
```

---

## 3. `src/utils/uploadImage.ts` — expand `ImageFolder`

Replace the current union:
```ts
// before
type ImageFolder = 'hotels' | 'cars' | 'food' | 'tours' | 'rooms' | 'banners';
// after
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
```
(Note `ImageFolder` was not previously exported — export it now, `resolveImageFields` in §4 needs to import it. Also note `'food'` is split into `'foodCompanies'` and `'foodItems'` since those are two different Firestore collections with two different admin CRUD flows — do not keep the old ambiguous `'food'` value.)

---

## 4. `src/middlewares/resolveImageFields.ts` — new file, the central image-resolution middleware factory

This is the piece every module's routes will configure and reuse instead of writing banner-style inline `req.file ? await uploadImage(...) : req.body.image` logic themselves.

```ts
import type { Request, Response, NextFunction } from 'express';
import { uploadImage, uploadImages, type ImageFolder } from '../utils/uploadImage.js';

type SingleImageFieldConfig = { field: string; kind: 'single'; required?: boolean };
type MultiImageFieldConfig = { field: string; kind: 'multi'; required?: boolean };
type ImageFieldConfig = SingleImageFieldConfig | MultiImageFieldConfig;

/**
 * Returns Express middleware that, given a list of image field configs and the
 * Firebase Storage folder they upload into, reads `req.files` (populated by a prior
 * `upload.fields([...])` call — see Part 2 for the exact multer config per route),
 * uploads any files present via uploadImage/uploadImages, and merges the resulting
 * public URL(s) into `req.body[field]`.
 *
 * Behavior per field, CREATE vs UPDATE is NOT distinguished here — the caller decides
 * that by whether `required` is set:
 *   - A file was uploaded for this field  -> req.body[field] is overwritten with the
 *     new URL (single) or new URL array (multi), replacing anything that was already
 *     in the parsed `data` JSON for that key.
 *   - No file was uploaded for this field -> req.body[field] is left completely
 *     untouched (whatever `parseJsonPayload` already put there stays — this could be
 *     an existing URL string the admin passed through unchanged, or simply absent).
 *   - `required: true` and no file AND req.body[field] is also absent -> this
 *     middleware does NOT throw; it leaves the field absent and lets the Zod schema's
 *     own required-field validation produce the error, so the error message stays
 *     consistent with every other required-field validation error in the app.
 *
 * Must run AFTER parseJsonPayload and BEFORE validate().
 */
export function resolveImageFields(folder: ImageFolder, fields: ImageFieldConfig[]) {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const files = (req.files ?? {}) as Record<string, Express.Multer.File[]>;

      for (const config of fields) {
        const uploaded = files[config.field];
        if (!uploaded || uploaded.length === 0) continue;

        if (config.kind === 'single') {
          req.body[config.field] = await uploadImage(uploaded[0]!, folder);
        } else {
          req.body[config.field] = await uploadImages(uploaded, folder);
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
```

---

## 5. Multer field configuration per route — how `req.files` gets populated

Every converted route replaces `upload.single('image')` (banner's current single-field style) with `upload.fields([...])`, listing every image field name that route accepts, each with a `maxCount`. Example shape you'll use repeatedly in Part 2 (do not implement this specific example yet, it's illustrative):

```ts
upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'bannerImage', maxCount: 1 },
  { name: 'images', maxCount: 10 },
])
```

Full route middleware order, standardized across every converted endpoint in Part 2 and Part 3:

```ts
router.post(
  '/companies',
  requireAuth,
  requireRole('ADMIN'),
  upload.fields([...]),               // multer: parses multipart, fills req.body.data (string) + req.files
  parseJsonPayload,                    // replaces req.body with JSON.parse(req.body.data)
  resolveImageFields('rentacarCompanies', [...]), // merges uploaded file URLs into req.body
  validate({ body: createCompanySchema }),        // schema is UNCHANGED from before this refactor
  createCompanyController,                        // controller is UNCHANGED from before this refactor
);
```

The key payoff: because image resolution now happens in shared middleware before `validate()`, **no controller function needs any image-handling code at all** — every controller across rentacar/travel/hotel/food stays exactly as it is today (`const x = await xService.createX(req.body); res.status(201).json(...)`), which is a meaningful simplification versus repeating banner's inline `req.file ? ... : ...` pattern in ten different controllers.

---

## 6. Do not touch yet

Do not modify any `*.routes.ts`, `*.schema.ts`, or `*.controller.ts` file in rentacar/travel/hotel/food/users/home in this part — that is Part 2 and Part 3's job, working from the shared pieces built here. This part should only add/modify:
- `src/middlewares/parseJsonPayload.ts` (new)
- `src/middlewares/resolveImageFields.ts` (new)
- `src/utils/uploadImage.ts` (expand and export `ImageFolder`)

## 7. Verification for this part

- `npm run build` succeeds with zero type errors from these three files in isolation (they won't be imported anywhere yet, so no route-level testing is possible until Part 2 — that's expected).
- `ImageFolder` is exported from `uploadImage.ts` (confirm via `import type { ImageFolder } from '../utils/uploadImage.js'` compiling cleanly from `resolveImageFields.ts`).

This concludes Part 1. Part 2 wires this infrastructure into rentacar, travel (+ included-services), hotel, and food's admin create/update endpoints, field by field. Part 3 adds the user avatar endpoint, retrofits banner onto this same infrastructure for consistency, and fixes Swagger docs to represent binary file fields correctly (they currently don't, even for the existing banner endpoint — `$ref`ing a Zod-derived string schema does not tell Swagger UI "this is a file picker").
