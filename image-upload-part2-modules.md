# Image Upload Refactor — Part 2 of 3: Apply to RentACar, Travel, Hotel, Food

This is Part 2 of a 3-part refactor. Part 1 (shared `parseJsonPayload` middleware, `resolveImageFields` middleware factory, expanded `ImageFolder` type) must already be applied before starting this part — every instruction below imports from those files.

As established in Part 1 §1: no Zod schema in this part needs its field **types** changed. Every `profileImage`/`bannerImage`/`logo`/`icon`/`images` field keeps exactly the type it has today (`z.string().optional()` or `z.array(z.string())` with whatever `.min()` it already has). Do not add `.optional()` to a field that is currently required, and do not remove a `.min(1)` from `images` on `createCarSchema`/`createTourSchema` — those stay required, they're just now satisfied by an uploaded file instead of a JSON string.

Apply the standardized middleware chain from Part 1 §5 to every route listed below, in this exact order: `requireAuth, requireRole('ADMIN'), upload.fields([...]), parseJsonPayload, resolveImageFields(folder, [...]), validate({ body: schema }), controller`. Controllers and services in all four modules stay completely unmodified — do not add any image-handling code to any `*.controller.ts` or `*.service.ts` file in this part.

---

## 8. `rentacar.routes.ts`

### 8.1 `POST /companies` and `PUT /companies/:id`
```ts
upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'bannerImage', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]),
parseJsonPayload,
resolveImageFields('rentacarCompanies', [
  { field: 'profileImage', kind: 'single' },
  { field: 'bannerImage', kind: 'single' },
  { field: 'images', kind: 'multi' },
]),
validate({ body: createCompanySchema }),   // or updateCompanySchema for PUT
```

### 8.2 `POST /cars` and `PUT /cars/:id`
```ts
upload.fields([
  { name: 'images', maxCount: 10 },
]),
parseJsonPayload,
resolveImageFields('cars', [
  { field: 'images', kind: 'multi', required: true },  // matches createCarSchema.images.min(1)
]),
validate({ body: createCarSchema }),   // or updateCarSchema for PUT
```
Note: `required: true` here does not change `resolveImageFields`'s runtime behavior (per Part 1 §4, it never throws itself either way) — it exists purely as inline documentation of intent; the actual enforcement still comes from Zod's `.min(1)` on `createCarSchema.images`, which fires with a normal `400 VALIDATION_ERROR` if neither a file nor a pre-existing `images` array made it into the parsed body.

---

## 9. `travel.routes.ts` (including the `includedServicesRouter` exported from the same file)

### 9.1 `POST /companies` and `PUT /companies/:id`
```ts
upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'bannerImage', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]),
parseJsonPayload,
resolveImageFields('travelCompanies', [
  { field: 'profileImage', kind: 'single' },
  { field: 'bannerImage', kind: 'single' },
  { field: 'images', kind: 'multi' },
]),
validate({ body: createTravelCompanySchema }),   // or updateTravelCompanySchema for PUT
```

### 9.2 `POST /tours` and `PUT /tours/:id`
```ts
upload.fields([
  { name: 'images', maxCount: 10 },
]),
parseJsonPayload,
resolveImageFields('tours', [
  { field: 'images', kind: 'multi', required: true },  // matches createTourSchema.images.min(1)
]),
validate({ body: createTourSchema }),   // or updateTourSchema for PUT
```
Reminder: `createTourSchema.roadmap` (the `{ lat, long, order }[]` array) is NOT an image field — it stays exactly as-is, arriving correctly typed automatically once `parseJsonPayload` parses the `data` blob, no special handling needed.

### 9.3 `POST /included-services/:serviceType` (note: this route already takes `serviceType` from the URL, not a schema-required body field the way others do — check the existing route signature before editing) and `PUT /included-services/:id`

`createIncludedServiceSchema.icon` is a single optional field (`icon: z.string().optional()`). Treat it as an image field:
```ts
upload.fields([
  { name: 'icon', maxCount: 1 },
]),
parseJsonPayload,
resolveImageFields('includedServices', [
  { field: 'icon', kind: 'single' },
]),
validate({ body: createIncludedServiceSchema }),   // or updateIncludedServiceSchema for PUT
```
This is a judgment call worth double-checking against the real product need before implementing: `icon` here might be intended as a small icon **identifier** (e.g. a design-system icon name like `"wifi"`, rendered client-side from a local icon set) rather than an uploaded photo. If that's the actual usage in the admin panel today, skip this specific conversion and leave `icon` as a plain string field, unconverted — do not force a file-upload flow onto a field that was never meant to hold an image URL. Confirm which case it is before applying this subsection; apply every other subsection in this document regardless.

---

## 10. `hotel.routes.ts`

### 10.1 `POST /` and `PUT /:id` (hotel)
```ts
upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]),
parseJsonPayload,
resolveImageFields('hotels', [
  { field: 'logo', kind: 'single' },
  { field: 'images', kind: 'multi' },
]),
validate({ body: createHotelSchema }),   // or updateHotelSchema for PUT
```
Note `createHotelSchema` uses `logo`, not `profileImage`/`bannerImage` (unlike the rentacar/travel company schemas) — this is the real current field name, confirmed against the schema; do not rename it as part of this refactor, that's out of scope here.

### 10.2 `POST /rooms` and `PUT /rooms/:id`
```ts
upload.fields([
  { name: 'images', maxCount: 10 },
]),
parseJsonPayload,
resolveImageFields('rooms', [
  { field: 'images', kind: 'multi' },
]),
validate({ body: createRoomSchema }),   // or updateRoomSchema for PUT
```

---

## 11. `food.routes.ts`

### 11.1 `POST /companies` and `PUT /companies/:id`
```ts
upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]),
parseJsonPayload,
resolveImageFields('foodCompanies', [
  { field: 'logo', kind: 'single' },
  { field: 'images', kind: 'multi' },
]),
validate({ body: createFoodCompanySchema }),   // or updateFoodCompanySchema for PUT
```

### 11.2 `POST /items` and `PUT /items/:id`
```ts
upload.fields([
  { name: 'images', maxCount: 10 },
]),
parseJsonPayload,
resolveImageFields('foodItems', [
  { field: 'images', kind: 'multi' },
]),
validate({ body: createFoodItemSchema }),   // or updateFoodItemSchema for PUT
```

---

## 12. Content-Type note for the DELETE and GET routes in all four modules

None of the `DELETE /:id` or any `GET` route in rentacar/travel/hotel/food changes in this refactor — they don't accept a body with images, leave them exactly as they are today.

## 13. Verification checklist for Part 2

For each of the 9 entities (rentacar company, car, travel company, tour, included-service, hotel, room, food company, food item):
- A `multipart/form-data` `POST` request with a `data` field (JSON string, all non-image fields) plus the relevant image file field(s) creates the entity successfully, and the created document's image field(s) in Firestore contain real `https://storage.googleapis.com/...` URLs, not the literal string `"[object Object]"` or anything malformed.
- The same `POST` WITHOUT any image file, but with `data` containing an already-known URL string for a single-image field (e.g. `profileImage: "https://..."`), still succeeds (the "reuse an existing URL" fallback path still works, per Part 1 §4's "no file uploaded -> leave req.body[field] untouched" behavior).
- `POST /cars` and `POST /tours` WITHOUT any `images` file and WITHOUT an `images` array in `data` fails with `400 VALIDATION_ERROR` (their `.min(1)` requirement is still enforced, now via Zod on the resolved body, exactly as it was before this refactor when `images` came from JSON).
- A `PUT` (update) request that sends `data` with other fields changed but no new image file leaves the existing image URL(s) in Firestore unchanged (confirms `resolveImageFields`'s "no file -> untouched" path doesn't accidentally null out existing images on partial updates).
- `npm run build` succeeds with zero type errors across all four modules' routes files.

This concludes Part 2. Part 3 adds a dedicated single-file user avatar endpoint (`PUT /api/users/me/avatar`, no `data` JSON wrapper needed since it's the only field), retrofits the existing banner endpoint onto this same shared infrastructure (currently the only endpoint still using the old one-off `upload.single('image')` + inline controller logic pattern, which now looks inconsistent with everything built in Part 2), and fixes the Swagger docs for every multipart endpoint (existing `$ref`s to Zod-derived schemas do not tell Swagger UI these fields are file pickers — this affects banner too, which was never fixed for this even when it was first built).
