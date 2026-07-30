# Image Upload Refactor — Part 3 of 3: User Avatar, Banner Retrofit, Swagger Fixes

This is Part 3 of a 3-part refactor. Parts 1 (shared infrastructure) and 2 (rentacar/travel/hotel/food conversion) must already be applied.

---

## 14. New endpoint: `PUT /api/users/me/avatar` — single-file, no admin, no `data` wrapper

This is deliberately NOT built as a generic reusable `POST /api/upload/image` endpoint that any client calls first and then references the URL in a second request — that two-step flow is what Part 1 through Part 2's admin conversions replace for admin forms, and the same reasoning applies even more strongly here: a mobile user changing their profile photo should do it in exactly one request, so a flaky connection between "upload" and "attach to profile" can never leave an orphaned file in Storage with no profile ever pointing at it.

Because this endpoint only ever accepts one field (the image itself), it does NOT need the `data`-JSON-blob convention from Part 1 §1 — that convention exists to solve multipart's inability to carry typed/nested non-file fields, and this endpoint has no non-file fields at all.

### 14.1 Schema — `src/modules/users/users.schema.ts`
No new Zod body schema is needed (there is no body to validate beyond the file itself, which multer handles, not Zod). Do not add an `avatar` field to `updateProfileSchema` — this stays a fully separate endpoint from `PUT /api/users/me`, exactly as `PUT /api/users/:id/disable` is already separate from it.

### 14.2 Service — `src/modules/users/users.service.ts`
Add:
```ts
export async function updateAvatar(userId: string, avatarUrl: string) {
  const doc = await usersCollection.doc(userId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await usersCollection.doc(userId).update({ avatarUrl });
  return getProfile(userId);
}
```
Add `avatarUrl: data.avatarUrl || null` to the object returned by the existing `getProfile` function, alongside `wishlist`/`profileCompleteness`/etc.

### 14.3 Controller — `src/modules/users/users.controller.ts`
```ts
export const updateAvatarController = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError(400, 'VALIDATION_ERROR', 'An image file is required');
  }
  const avatarUrl = await uploadImage(req.file, 'avatars');
  const profile = await usersService.updateAvatar(req.user!.userId, avatarUrl);
  res.status(200).json({ success: true, data: profile });
});
```
(Add `import { uploadImage } from '../../utils/uploadImage.js';` and `import { AppError } from '../../errors/AppError.js';` to this file if not already imported.)

### 14.4 Route — `src/modules/users/users.routes.ts`
```ts
/**
 * @swagger
 * /api/users/me/avatar:
 *   put:
 *     tags: [Users]
 *     summary: Upload/replace the current user's avatar image
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [avatar]
 *             properties:
 *               avatar: { type: string, format: binary }
 *     responses:
 *       200: { description: Avatar updated, returns full profile }
 *       400: { description: No file provided }
 *       401: { description: Authentication required }
 */
router.put('/me/avatar', requireAuth, upload.single('avatar'), updateAvatarController);
```
Add this route alongside the existing `GET /me`, `PUT /me`, and `PUT /:id/disable` routes in the same file. Import `upload` from `'../../middlewares/upload.js'` and `updateAvatarController` from `'./users.controller.js'`.

---

## 15. Retrofit `home.routes.ts` / `home.controller.ts` / `home.service.ts` onto the Part 1 shared infrastructure

The banner endpoint currently uses the older one-off pattern (`upload.single('image')` + inline `req.file ? await uploadImage(...) : req.body.image` in the controller) that Part 1 was built to replace. Convert it to match every other module for consistency — this is a refactor of working code, not a bug fix, so be careful not to change banner's actual behavior, only its wiring.

### 15.1 `home.schema.ts` — no field type changes
`bannerSchema` stays exactly as it is: `link`, `order`, `isActive`, `image` keep their current types. Remove the manual `z.coerce.number()` on `order` and the manual `z.preprocess(...)` boolean coercion on `isActive` — those existed specifically because the old flow validated raw multipart string fields directly; under the new flow, `parseJsonPayload` already hands Zod correctly-typed values (a real number, a real boolean) from the parsed `data` JSON, so those coercions are now unnecessary. Simplify to:
```ts
export const bannerSchema = z.object({
  link: z.string().min(1),
  order: z.number(),
  isActive: z.boolean().optional().default(true),
  image: z.string().optional(),
}).openapi('BannerInput');
```

### 15.2 `home.routes.ts`
```ts
router.post(
  '/banner',
  requireAuth,
  requireRole('ADMIN'),
  upload.fields([{ name: 'image', maxCount: 1 }]),
  parseJsonPayload,
  resolveImageFields('banners', [{ field: 'image', kind: 'single', required: true }]),
  validate({ body: bannerSchema }),
  createBannerController,
);

router.put(
  '/banner/:id',
  requireAuth,
  requireRole('ADMIN'),
  upload.fields([{ name: 'image', maxCount: 1 }]),
  parseJsonPayload,
  resolveImageFields('banners', [{ field: 'image', kind: 'single' }]),
  validate({ body: bannerSchema }),
  updateBannerController,
);
```

### 15.3 `home.controller.ts` — simplify, image logic moves out
```ts
export const createBannerController = catchAsync(async (req: Request, res: Response) => {
  const banner = await homeService.createBanner(req.body);
  res.status(201).json({ success: true, data: banner });
});

export const updateBannerController = catchAsync(async (req: Request, res: Response) => {
  const banner = await homeService.updateBanner(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: banner });
});
```
Remove the `if (!req.file && !req.body.image) throw new AppError(...)` check from `createBannerController` — that validation now belongs to Zod (`resolveImageFields` won't have set `image` if no file was uploaded and none was present in the parsed body, so an absent required field should produce the normal `400 VALIDATION_ERROR` from `validate()` instead of a custom one). To make that happen, change `bannerSchema.image` for the CREATE case specifically — since `bannerSchema` is shared between create and update today, either: (a) keep `image: z.string().optional()` shared, and re-add a `.refine()` at the schema level requiring `image` to be present (this preserves today's exact validation-error behavior with the least structural change), or (b) split into `createBannerSchema` (image required) and reuse `.partial()` for update, matching the pattern already used everywhere else in the codebase (`createXSchema` + `updateXSchema = createXSchema.partial()`). Prefer (b) for consistency with every other module's schema file — `bannerSchema` is the one schema in the codebase that doesn't already follow the create/update-partial split, and this is a natural point to fix that:
```ts
export const createBannerSchema = z.object({
  link: z.string().min(1),
  order: z.number(),
  isActive: z.boolean().optional().default(true),
  image: z.string().min(1),
}).openapi('CreateBannerInput');

export const updateBannerSchema = createBannerSchema.partial().openapi('UpdateBannerInput');
```
Update `registry.ts` to register both `CreateBannerInput` and `UpdateBannerInput` in place of the single `BannerInput` entry, and update `home.routes.ts`'s two `validate({ body: ... })` calls to use `createBannerSchema` for `POST` and `updateBannerSchema` for `PUT` respectively.

### 15.4 `home.service.ts` — no changes needed
`createBanner`/`updateBanner`/`deleteBanner`/`getBanners` already just take a data object and write it — they don't care whether the caller resolved `image` from a file or a passthrough string, so nothing here needs to change.

---

## 16. Swagger — represent multipart file fields as actual file pickers, everywhere this refactor touched

`$ref`ing a Zod-derived component schema (as Part 3 of the earlier Swagger-migration refactor established project-wide) works correctly for `application/json` bodies, but Zod has no `binary` string format and `zod-to-openapi` will not emit `format: binary` for a plain `z.string()` — so every multipart endpoint touched by this refactor needs its `requestBody` written as an inline `multipart/form-data` schema instead of a `$ref`, listing every field explicitly with `image`/`images`/etc. marked `format: binary`, and every other field described via a nested `data` property matching the shape of the underlying Zod input schema. This is the ONE deliberate, documented exception to "always use `$ref`" from the earlier Swagger refactor — note it as such in a comment if the codebase has a contributing-guide/README section documenting that convention.

Example for `POST /api/services/rentacar/companies` (apply the equivalent shape to every route touched in Part 2, plus the banner routes from §15, plus the avatar route from §14 which is already shown correctly in §14.4 since it never had a `data` wrapper to begin with):

```yaml
# @swagger
# /api/services/rentacar/companies:
#   post:
#     tags: [RentACar]
#     summary: Create a rent-a-car company (admin)
#     security:
#       - bearerAuth: []
#     requestBody:
#       required: true
#       content:
#         multipart/form-data:
#           schema:
#             type: object
#             required: [data]
#             properties:
#               data:
#                 type: string
#                 description: JSON-stringified body matching CreateRentACarCompanyInput (see components.schemas), minus the image fields below
#               profileImage: { type: string, format: binary }
#               bannerImage: { type: string, format: binary }
#               images:
#                 type: array
#                 items: { type: string, format: binary }
#     responses:
#       201: { description: Company created }
#       403: { description: Forbidden — admin only }
```
Keep the existing `CreateRentACarCompanyInput` (and every other already-registered) component schema in `components.schemas` exactly as-is — the comment referencing it in `data`'s `description` is documentation for the person reading Swagger UI, not a machine `$ref`, since OpenAPI has no way to say "this string field, once parsed, must match this other schema."

Go through every route converted in Part 2 (18 routes: 9 entities × create+update) plus the 2 banner routes from §15 and rewrite their `requestBody` this way. Leave every `GET`/`DELETE` route's Swagger untouched — they have no request body to change.

---

## 17. Verification checklist for Part 3

- `PUT /api/users/me/avatar` with a valid image file, valid token, updates `avatarUrl` on the user document and returns it in the response; without a file, returns `400 VALIDATION_ERROR`; without a token, returns `401`.
- `GET /api/users/me` response now includes `avatarUrl` (null for a user who never set one).
- `POST /api/home/banner` and `PUT /api/home/banner/:id` behave identically to their Part-2-era (pre-retrofit) selves from the outside — same success/failure conditions — despite the internal wiring now matching every other module.
- `npm run docs:build` succeeds; `/api-docs` shows a real file-picker widget (not a text box) for every image field on every route touched across this whole 3-part refactor, including banner and avatar.
- `grep -r "upload.single" src --include=*.ts` returns zero matches project-wide (every route now uses `upload.fields([...])`, even the avatar route's single-file case — confirm §14.4 above actually should use `upload.single('avatar')`, which is the one intentional exception, since it's the one endpoint with exactly one file field and no `data` wrapper at all; every other converted route uses `upload.fields`). Adjust this verification step's expectation accordingly: the grep should return exactly one match (`users.routes.ts`'s avatar route), not zero.

This concludes the 3-part image-upload refactor.
