# Baltazar Admin Panel — Refactor Plan 1 of 3: Critical API Client Fixes

> Paste this file as a standalone prompt to your coding agent. It contains full
> context and one self-contained refactor. Manually exercise every page of the
> admin panel in a browser after applying it, before considering the task done
> — this plan has no automated test suite to fall back on.

> **Scope note:** this is Plan 1 of a 3-part admin-panel refactor.
> - Plan 1 (this document) fixes the API client itself — it is currently
>   broken in a way that likely makes **every single request silently fail
>   to log correctly, and every mutating action lie to the user about
>   whether it succeeded.** Nothing else in the panel can be trusted to work
>   until this is fixed.
> - `part9-admin-panel-schema-alignment.md` (Plan 2 of 3) fixes concrete
>   request-shape mismatches against the backend (missing required fields,
>   wrong field names, wrong enum values) that Plan 1's error-surfacing will
>   finally make *visible* to whoever is testing the panel.
> - `part10-admin-panel-images-and-ux.md` (Plan 3 of 3) wires up real image
>   uploads (currently dead UI in several forms) and polishes secondary UX
>   (edit-form data hydration, double-submit protection, rating input
>   bounds).
>
> Apply them in this order — Plan 2's fixes are much harder to verify without
> Plan 1's honest error reporting in place.

---

## CONTEXT

This is a static single-page admin panel (`index.html` + `app.js` +
`style.css`) that talks to the Baltazar backend (Node/Express/Firestore) via
a hand-rolled `fetch` wrapper. It has no build step and no framework — plain
DOM manipulation, hash-based routing, and a shared `api()` helper that every
page's load/create/update/delete function calls.

### Bug 1 — `api()` throws on every single call, after the request already completed

```js
// app.js
async function api(method, path, body, isMultipart = false) {
  const url = baseUrl.replace(/\/+$/, '') + path;
  const headers = {};
  if (token) headers['Authorization'] = 'Bearer ' + token;
  if (!isMultipart) headers['Content-Type'] = 'application/json';

  const opts = { method, headers };
  if (body !== undefined) {
    opts.body = isMultipart ? body : JSON.stringify(body);
  }

  const startTime = performance.now();
  let res, data;
  try {
    res = await fetch(url, opts);
    const text = await res.text();
    try { data = JSON.parse(text); } catch { data = text; }
  } catch (err) {
    data = { error: err.message };
    res = { status: 0, headers: new Headers() };
  }
  const duration = ((performance.now() - startTime) / 1000).toFixed(2);

  // Log to inspector
  const entry = {
    method, url, headers: Object.fromEntries(opts.headers.entries() || []),
    body: isMultipart ? '(multipart)' : body,
    status: res.status,
    response: data,
    responseHeaders: res.headers ? Object.fromEntries([...res.headers]) : {},
    duration,
    multipart: isMultipart,
  };
  inspectorHistory.push(entry);
  if (inspectorHistory.length > 20) inspectorHistory.shift();
  inspectorIdx = inspectorHistory.length - 1;
  updateInspector();

  return { status: res.status, data };
}
```

`opts.headers` is `headers`, a **plain JavaScript object literal** (`{}`),
not a Fetch API `Headers` instance. Plain objects do not have an `.entries()`
*method* — `Object.entries(obj)` is a static function on `Object`, it is not
callable as `obj.entries()`. So the line

```js
headers: Object.fromEntries(opts.headers.entries() || []),
```

throws `TypeError: opts.headers.entries is not a function` — and it does so
**unconditionally, on every call to `api()`, immediately after the network
request has already completed**, before the function returns `{ status,
data }` to its caller.

Because this throw happens outside the earlier `try/catch` (that `try/catch`
only wraps the `fetch()` call itself, not the inspector-logging code after
it), every caller's `await api(...)` rejects. Since none of the ~40 functions
in `app.js` that call `api()` wrap that call in their own `try/catch`, every
one of them throws an uncaught exception the moment the response comes back
— meaning `loadHotels()`, `createHotel()`, `authLogin()`, and everything
else never reach their own logic after the `api()` call. In practice this
means:

- No list ever renders (`loadHotels()`, `loadRentacarCars()`, etc. all crash
  before writing to `innerHTML`).
- No toast ever shows.
- No modal ever closes after a create/update.
- Login "succeeds" on the server (the request goes out and Firestore/the
  JWT are unaffected), but `useToken(data.data.accessToken)` is never
  reached, so the panel never learns the token and never updates the auth
  status dot.

This is the single highest-priority bug in the codebase — nothing else can
be meaningfully tested or fixed until it's resolved, because right now
**every page of the admin panel is non-functional**, not just the pages with
schema mismatches covered in Plan 2.

### Bug 2 — every mutating call ignores whether the request actually succeeded

Separately from Bug 1 (once fixed, `api()` will correctly return `{ status,
data }` without throwing), most of the panel's create/update/delete
functions never look at that return value before declaring success. For
example:

```js
async function createFoodItem() {
  const body = { /* ... */ };
  // ...
  await api('POST', '/api/services/food/items', body);
  closeModal(); loadFoodItems(); showToast('Item created', 'success');
}
```

This closes the modal, reloads the list, and shows a green "Item created"
toast **unconditionally** — even if the server responded `400
VALIDATION_ERROR`, `403 FORBIDDEN`, or `409` with an error body. The same
pattern (call `api()`, discard the result, always show a success toast, always
close the modal) appears in the vast majority of mutating functions across
every module: hotels, rooms, rent-a-car companies and cars, travel companies
and tours, food companies and items, included services, reviews, orders
(create/step/status/cancel), and banners. A handful of functions do check
`data?.success` already (`authLogin`, `authRegister`, `updateProfile`,
`uploadAvatar`, `addToWishlist`, `addCard`) — those are the pattern to
generalize, not the exception to preserve.

Combined with Bug 1 (which currently makes this invisible because nothing
runs after the crash), fixing Bug 1 alone would suddenly surface Bug 2 very
loudly — the panel would appear to succeed at everything even when the
backend is rejecting most of it (see Plan 2 for the concrete cases where
this will happen constantly, e.g. car creation, tour creation, add-card,
pay-order).

---

## GOAL

- `api()` never throws as a side effect of its own request-logging code.
- Every mutating action (create/update/delete, across every module) checks
  the actual HTTP outcome before telling the user it succeeded, and shows
  the server's real error message when it didn't — using data the inspector
  already captures, so this is additive, not a rewrite of the inspector.
- No behavior change to the inspector's *content* (cURL/body/response/headers
  tabs) — only to whether `api()` crashes while building that content.

---

## STEP 1 — Fix the request-headers logging line in `api()`

Replace the broken line with a version that works against a plain object
(which is what `headers` actually is — there is no reason to route this
through anything `Headers`-shaped):

```js
// app.js — inside api(), replace only this one line:
headers: Object.fromEntries(opts.headers.entries() || []),

// with:
headers: { ...opts.headers },
```

Do not touch the adjacent `responseHeaders: res.headers ? Object.fromEntries([...res.headers]) : {}`
line — `res.headers` **is** a real Fetch API `Headers` instance (it comes
from the actual `fetch()` `Response` object, or from the synthetic `{
status: 0, headers: new Headers() }` fallback in the `catch` block), and
`Headers` instances *are* iterable, so spreading them into an array of
`[key, value]` pairs for `Object.fromEntries([...res.headers])` is correct
as-is.

---

## STEP 2 — Add a single shared "did this mutation actually succeed" helper

Rather than hand-editing 25+ near-identical call sites, add one small helper
next to `api()` and route every create/update/delete function through it.
This keeps Plan 2 and Plan 3's edits mechanical and consistent instead of
inventing a slightly different error-handling snippet per function.

```js
// app.js — add near api(), after it

/**
 * Wraps a mutating api() call: shows a success toast and runs onSuccess
 * only if the response indicates success; otherwise shows the server's
 * real error message (or a generic fallback) and does NOT run onSuccess
 * (so callers should put closeModal()/reload-list logic inside onSuccess,
 * not after this call).
 */
async function apiMutate(method, path, body, isMultipart, successMessage, onSuccess) {
  const { status, data } = await api(method, path, body, isMultipart);
  const ok = status >= 200 && status < 300 && data?.success !== false;
  if (ok) {
    if (onSuccess) onSuccess(data);
    showToast(successMessage, 'success');
  } else {
    const message = data?.message || data?.errorCode || `Request failed (status ${status})`;
    showToast(message, 'error');
  }
  return ok;
}
```

`isMultipart` is passed straight through to `api()` unchanged, so this works
identically for JSON and `FormData` calls (relevant once Plan 3 wires up
real file uploads).

---

## STEP 3 — Route every mutating function through `apiMutate()`

Convert every create/update/delete function in `app.js` from the "call
`api()`, discard the result, always show success" pattern to `apiMutate()`.
The transformation is mechanical; here is one representative example — apply
the identical shape to every other mutating function listed below.

**Before:**
```js
async function createFoodItem() {
  const body = { /* ... */ };
  // ...
  await api('POST', '/api/services/food/items', body);
  closeModal(); loadFoodItems(); showToast('Item created', 'success');
}
```

**After:**
```js
async function createFoodItem() {
  const body = { /* ... */ };
  // ...
  await apiMutate('POST', '/api/services/food/items', body, false, 'Item created', () => {
    closeModal();
    loadFoodItems();
  });
}
```

Apply this same transformation to all of the following (list is exhaustive
for the current codebase — do not skip any, this is the whole point of the
plan):

- Hotel: `createHotel`, `updateHotel`, `deleteHotel`
- Rooms: `createRoom`, `updateRoom`, `deleteRoom`
- RentACar: `createRentacarCompany`, `updateRentacarCompany`,
  `deleteRentacarCompany`, `createRentacarCar`, `updateRentacarCar`,
  `deleteRentacarCar`
- Travel: `createTravelCompany`, `updateTravelCompany`,
  `deleteTravelCompany`, `createTravelTour`, `updateTravelTour`,
  `deleteTravelTour`
- Food: `createFoodCompany`, `updateFoodCompany`, `deleteFoodCompany`,
  `createFoodItem`, `updateFoodItem`, `deleteFoodItem`
- Included Services: `createIncludedService`, `updateIncludedService`,
  `deleteIncludedService`
- Reviews: `createReview`, `updateReview`, `deleteReview`
- Orders: `createOrder`, `advanceOrderStep`, `updateOrderStatus`,
  `cancelOrder`
- Banner: `createBanner`, `updateBanner`, `deleteBanner`
- Users: `disableUser`
- Wishlist: `addWishlist`, `deleteWishlist`
- Admin: `addAdmin`
- Payment: `payOrder` (note: `addCard` and `updateProfile` and
  `uploadAvatar` already check `data?.success` manually today — it's fine to
  leave those as-is, or convert them to `apiMutate()` too for consistency;
  either is acceptable, but if you convert them, verify their existing
  success-path logic — e.g. `uploadAvatar`'s file-input clearing, if any —
  is preserved inside the new `onSuccess` callback)

For `delete*` functions specifically, keep the existing `confirm(...)` guard
**before** the `apiMutate()` call, unchanged — only the part after the
confirmation dialog changes:

```js
// Before
async function deleteHotel(id) {
  if (!confirm('Delete hotel ' + id + '?')) return;
  await api('DELETE', `/api/services/hotel/${id}`);
  loadHotels(); showToast('Hotel deleted', 'success');
}

// After
async function deleteHotel(id) {
  if (!confirm('Delete hotel ' + id + '?')) return;
  await apiMutate('DELETE', `/api/services/hotel/${id}`, undefined, false, 'Hotel deleted', () => {
    loadHotels();
  });
}
```

---

## STEP 4 — Do not change read-only (`GET`) call sites in this plan

`loadHotels()`, `loadRentacarCars()`, `loadReviews()`, `loadProfile()`,
`loadCards()`, `loadAppConfig()`, `loadTransactions()`, and every other
`load*`/`get*` function stays exactly as it is — they already handle their
own empty/error states reasonably (`data?.data || data || []` defensively
falls back to an empty array), and they don't claim "success" the way
mutating actions do. `apiMutate()` is specifically for state-changing
requests; introducing it for reads would be scope creep for this plan.

---

## ACCEPTANCE CRITERIA

- [ ] Opening any page of the panel (Hotel, RentACar, Travel, Food, Reviews,
      Orders, Banner, Wishlist) with a valid `baseUrl`/`token` configured
      successfully renders its table — confirms `api()` no longer throws.
- [ ] The Request Inspector's cURL/Body/Response/Headers tabs all still
      populate correctly after this fix (open the inspector panel, make any
      request, confirm all four tabs show real content, not blank/broken).
- [ ] Submitting a form that the backend will reject (e.g. create a hotel
      with no `city` filled in) shows a **red error toast containing the
      server's actual validation message**, and the modal stays open with
      the user's input intact (not closed, not silently "successful").
- [ ] Submitting a form that the backend accepts still shows the existing
      green success toast, closes the modal, and reloads the relevant list —
      i.e. the success path is unchanged from before this plan.
- [ ] Every function listed in Step 3 has been converted — grep the file for
      `await api(` in a mutating (non-`load`/non-`get`) function; it should
      return zero matches once this plan is applied (all should now be
      `await apiMutate(`).
- [ ] No new page reload, framework, or build step was introduced — this
      remains a plain static `index.html` + `app.js` + `style.css` bundle.

---

## General instructions for the agent

- This project has no automated tests — manually exercise each page (list
  load, create, edit, delete) in a real browser against a running backend
  (or a backend you can point `baseUrl` at) before considering this done.
- Keep the diff scoped to `app.js`. Do not touch `index.html` or `style.css`
  in this plan — no new form fields or markup are needed here, only the
  API client and its call sites.
- Do not fix the request-*shape* bugs (missing fields, wrong field names,
  wrong enum values) in this plan even though Step 3 will make them visible
  for the first time via red error toasts — those are Plan 2's job
  (`part9-admin-panel-schema-alignment.md`). Resist the urge to "fix while
  you're in there"; keep this plan's diff limited to the API client itself.




Baltazar Admin Panel — Refactor Plan 2 of 3: Backend Schema Alignment

Paste this file as a standalone prompt to your coding agent. It contains full context and one self-contained refactor. Manually exercise every affected form in a browser after applying it, before considering the task done.

Scope note: this is Plan 2 of a 3-part admin-panel refactor. Apply part8-admin-panel-api-client-fixes.md (Plan 1 of 3) first — it fixes the API client so that the mismatches this plan addresses actually surface as visible red error toasts instead of silently "succeeding" while the backend rejects the request underneath. This plan does not touch the image-upload plumbing (dead file inputs, missing multipart wiring) — that's part10-admin-panel-images-and-ux.md (Plan 3 of 3).

CONTEXT

The admin panel (app.js) was built against an earlier or assumed shape of the backend's request schemas. A field-by-field audit against the actual Zod schemas currently enforced by the backend (rentacar.schema.ts, travel.schema.ts, order.schema.ts, payment.schema.ts, admin.schema.ts, wishlist.service.ts's response shape) found six concrete mismatches where the panel currently sends a request the backend will always reject, or reads a response field that doesn't exist. Under today's broken api() (see Plan 1), none of these are visible — the panel crashes before it can tell you the request failed. Once Plan 1 is applied, every one of these will start producing loud, constant 400/404 error toasts until fixed here.

Rent-a-car "Create/Edit Car" form has no images field at all, but rentacar.schema.ts's createCarSchema requires it:
ts
   images: z.array(z.string()).min(1),

showRentacarCarForm() has inputs for brand, model, year, price, category, seats, transmission, fuel type, features, and status — nothing for images. createRentacarCar()/updateRentacarCar() never reference an images field. Every car creation currently fails 400 VALIDATION_ERROR on the missing images field, unconditionally.

Travel "Create/Edit Tour" form has no images field at all, but travel.schema.ts's createTourSchema requires it identically:
ts
   images: z.array(z.string()).min(1),

showTravelTourForm() has company, title, price, duration, dates, categories, and a roadmap row-builder — nothing for images. Every tour creation currently fails 400 VALIDATION_ERROR the same way.

Order creation's serviceType dropdown offers an invalid value. order.schema.ts's createOrderSchema is:
ts
   export const createOrderSchema = z.object({
     serviceType: z.enum(['RENT_A_CAR', 'TRAVEL', 'HOTEL_ROOM', 'FOOD']),
     serviceId: z.string().min(1),
   }).openapi('CreateOrderInput');

Note the hotel variant is HOTEL_ROOM, not HOTEL. But showOrderForm() renders:

html
   <select id="order-serviceType">
     <option value="HOTEL">HOTEL</option>
     <option value="RENT_A_CAR">RENT_A_CAR</option>
     <option value="TRAVEL">TRAVEL</option>
     <option value="FOOD">FOOD</option>
   </select>

Selecting "HOTEL" and submitting always fails 400    VALIDATION_ERROR, since 'HOTEL' isn't in the accepted enum. Additionally, createOrder() also sends startDate/endDate, which createOrderSchema doesn't define at all — Zod's default (non-.strict()) parsing silently strips these, so they aren't a hard failure, just dead fields that give the illusion of controlling something they don't.

Order "Step" form sends no body at all, but order.schema.ts's advanceStepSchema requires two fields:
ts
   export const advanceStepSchema = z.object({
     screen: z.string().min(1),
     data: z.record(z.unknown()),
   }).openapi('AdvanceOrderStepInput');

showOrderStepForm() renders only a confirm button, no inputs, and advanceOrderStep() calls api('PUT', /api/orders/${id}/step) with no third argument at all. Every step-advance attempt currently fails 400    VALIDATION_ERROR on both missing fields.

"Add Card" form's field names don't match the backend at all. payment.schema.ts's addCardSchema:
ts
   export const addCardSchema = z.object({
     cardNumber: z.string().min(13).max(19),
     expiryMonth: z.number().int().min(1).max(12),
     expiryYear: z.number().int().min(2024),
     cvv: z.string().min(3).max(4),
     cardholderName: z.string().min(1),
   }).openapi('AddCardInput');

But addCard() sends:

js
   const body = {
     cardNumber: document.getElementById('card-number').value,
     expiry: document.getElementById('card-expiry').value,      // wrong key, wrong shape
     cvc: document.getElementById('card-cvc').value,             // wrong key (cvv, not cvc)
     holderName: document.getElementById('card-holder').value,   // wrong key
   };

Only cardNumber matches. Every "Add Card" attempt currently fails 400 VALIDATION_ERROR on all four of the other required fields being absent (the ones actually sent — expiry, cvc, holderName — are simply not fields the schema knows about, so they're stripped, and the real required fields are never populated).

"Pay Order" sends no body, but payment.schema.ts's paySchema requires a paymentMethodId:
ts
   export const paySchema = z.object({
     paymentMethodId: z.string().min(1),
   }).openapi('PayInput');

payOrder() calls api('POST', /api/payment/pay/${id}) with no body, and there is no UI anywhere to pick which of the user's saved cards to pay with. Every payment attempt currently fails 400    VALIDATION_ERROR.

"Add Admin" sends the wrong field, and there's no way to get the right one. admin.schema.ts's addAdminSchema:
ts
   export const addAdminSchema = z.object({
     userId: z.string().min(1),
   }).openapi('AddAdminInput');

addAdmin() sends { email: document.getElementById('admin-email').value } — there is no email-based lookup anywhere in the backend (promoteToAdmin(userId) in admin.service.ts only ever takes a raw Firestore user document ID). This always fails 400    VALIDATION_ERROR, and no amount of admin-panel-only fixing can make an email-based flow work without a backend change (see Step 7 below for the two ways to resolve this).

Wishlist delete looks for a field that doesn't exist in the response. wishlist.service.ts's getWishlist() returns objects shaped like:
ts
   {
     wishlistItemId: `${serviceType}_${serviceId}`,
     serviceType,
     serviceId,
     ...doc.data(),
   }

There is no id or _id field. But loadWishlist() does:

js
   const id = item.id || item._id || '';

id is always ''. Every "Delete" click in the Wishlist page currently calls DELETE /api/user/wishlist/ (empty id), which fails, and even if it didn't, removeFromWishlist() on the backend parses the id as serviceType_serviceId — an empty string can't be split into a valid pair either way.

GOAL

Every mutating form in the admin panel sends a request shape the backend will actually accept for valid input, and every response the panel reads a field from actually contains that field. No new features here — pay-order's card picker and add-admin's user-lookup both get the minimum viable fix, not a redesigned UX (that's reasonable, given Plan 3 is where broader UX polish lives).

STEP 1 — Add an images field to the Rent-a-Car "Create/Edit Car" form

Add a plain textarea/input for comma-or-newline-separated image URLs, the same convention already used for car-features (comma-separated), since Plan 3 (not this plan) is where real file-upload wiring happens across every module at once — for this plan, the minimum fix is "the field exists and is sent," using the same URL-string convention the rest of the panel already relies on today for image fields.

html
<!-- app.js — inside showRentacarCarForm()'s template, add near car-features -->
<div class="form-group"><label>Images (comma-separated URLs, at least one required)</label>
  <input id="car-images" value="${(d.images||[]).join(', ')}"></div>
js
// app.js — createRentacarCar(), add alongside the existing body fields
const images = document.getElementById('car-images').value;
body.images = images.split(',').map(s => s.trim()).filter(Boolean);

Apply the identical addition to updateRentacarCar(). Do not make this field optional in the panel even though updateCarSchema (the .partial() of createCarSchema) technically allows omitting it on PUT — always sending the current full list on both create and update keeps the panel's behavior predictable and avoids a confusing "it's required on create but not on update" distinction for whoever's using the form.

STEP 2 — Add an images field to the Travel "Create/Edit Tour" form

Identical shape and reasoning to Step 1:

html
<!-- app.js — inside showTravelTourForm()'s template, add near tour-categories -->
<div class="form-group"><label>Images (comma-separated URLs, at least one required)</label>
  <input id="tour-images" value="${(d.images||[]).join(', ')}"></div>
js
// app.js — createTravelTour(), add alongside the existing body fields
const images = document.getElementById('tour-images').value;
body.images = images.split(',').map(s => s.trim()).filter(Boolean);

Apply the identical addition to updateTravelTour().

STEP 3 — Fix the order serviceType dropdown and drop the unused date fields

Change the dropdown's hotel option value to match the schema, and remove the startDate/endDate inputs entirely since createOrderSchema has no such fields and keeping them implies they do something:

html
<!-- app.js — showOrderForm(), replace the <select> options -->
<select id="order-serviceType">
  <option value="RENT_A_CAR">RENT_A_CAR</option>
  <option value="TRAVEL">TRAVEL</option>
  <option value="HOTEL_ROOM">HOTEL_ROOM</option>
  <option value="FOOD">FOOD</option>
</select>
<!-- Remove the Start Date / End Date form-groups entirely -->
js
// app.js — createOrder(), simplify to only the two fields the schema accepts
async function createOrder() {
  const body = {
    serviceType: document.getElementById('order-serviceType').value,
    serviceId: document.getElementById('order-serviceId').value,
  };
  await apiMutate('POST', '/api/orders', body, false, 'Order created', () => {
    closeModal();
    loadOrders();
  });
}

(This assumes Plan 1's apiMutate() has already been applied — if applying this plan standalone before Plan 1, use the existing api() + manual closeModal()/loadOrders()/showToast() pattern instead, and revisit once Plan 1 lands.)

Also update the label on the "Service ID" input to clarify that for HOTEL_ROOM, this must be a room ID, not a hotel ID — the hotel is implied by the room's own hotelId field server-side:

html
<div class="form-group"><label>Service ID (for HOTEL_ROOM, this is the Room ID, not the Hotel ID)</label>
  <input id="order-serviceId" placeholder="Service ID"></div>
STEP 4 — Add real fields to the Order "Step" form

advanceStepSchema requires screen (a string identifying which onboarding screen was just completed) and data (an arbitrary JSON object of that screen's captured fields). The valid screen values are enumerated in order.schema.ts's orderScreenKeyEnum:

ts
export const orderScreenKeyEnum = z.enum([
  'AUTH_SCREEN', 'PERSONAL_INFO_SCREEN', 'DRIVER_LICENSE_SCREEN',
  'PASSPORT_INFO_SCREEN', 'ADDRESS_SCREEN', 'DELIVERY_ADDRESS_SCREEN',
  'PAYMENT_SCREEN', 'CONFIRM_SCREEN',
]);

Note advanceStepSchema.screen itself is typed as z.string().min(1), not orderScreenKeyEnum — so the backend doesn't reject an unrecognized screen name at the schema layer, but the panel should still constrain the dropdown to real values so admins can't send garbage the order-flow logic doesn't recognize downstream. Rebuild the form:

html
<!-- app.js — showOrderStepForm(id), replace the confirm-only body -->
<p style="color:var(--text-muted);margin-bottom:12px">Order: ${id}</p>
<div class="form-group"><label>Screen</label>
  <select id="step-screen">
    <option value="AUTH_SCREEN">AUTH_SCREEN</option>
    <option value="PERSONAL_INFO_SCREEN">PERSONAL_INFO_SCREEN</option>
    <option value="DRIVER_LICENSE_SCREEN">DRIVER_LICENSE_SCREEN</option>
    <option value="PASSPORT_INFO_SCREEN">PASSPORT_INFO_SCREEN</option>
    <option value="ADDRESS_SCREEN">ADDRESS_SCREEN</option>
    <option value="DELIVERY_ADDRESS_SCREEN">DELIVERY_ADDRESS_SCREEN</option>
    <option value="PAYMENT_SCREEN">PAYMENT_SCREEN</option>
    <option value="CONFIRM_SCREEN">CONFIRM_SCREEN</option>
  </select></div>
<div class="form-group"><label>Data (raw JSON object)</label>
  <textarea id="step-data" placeholder='{"key":"value"}'>{}</textarea></div>
<div class="form-actions">
  <button class="btn-submit" onclick="advanceOrderStep('${id}')">Advance Step</button>
  <button class="btn-cancel" onclick="closeModal()">Cancel</button>
</div>
js
// app.js — advanceOrderStep(id)
async function advanceOrderStep(id) {
  const screen = document.getElementById('step-screen').value;
  let data;
  try {
    data = JSON.parse(document.getElementById('step-data').value || '{}');
  } catch {
    showToast('Data must be valid JSON', 'error');
    return;
  }
  await apiMutate('PUT', `/api/orders/${id}/step`, { screen, data }, false, 'Step advanced', () => {
    closeModal();
    loadOrders();
  });
}

This is an admin/debug tool, not the real end-user order flow (which would presumably be driven by a mobile/web client screen-by-screen) — a raw JSON textarea for data is an acceptable admin-panel-grade solution here, not a compromise that needs a follow-up plan.

STEP 5 — Fix the "Add Card" field names

Rename every field to match addCardSchema exactly, and split the combined "Expiry (MM/YY)" input into the two separate numeric fields the schema actually wants:

html
<!-- app.js — Payment page markup (index.html), replace the Add Card form-groups -->
<div class="form-group"><input id="card-number" placeholder="Card Number"></div>
<div class="form-row">
  <div class="form-group"><input id="card-expiry-month" placeholder="Expiry Month (1-12)" type="number" min="1" max="12"></div>
  <div class="form-group"><input id="card-expiry-year" placeholder="Expiry Year (e.g. 2027)" type="number" min="2024"></div>
</div>
<div class="form-group"><input id="card-cvv" placeholder="CVV"></div>
<div class="form-group"><input id="card-holder" placeholder="Cardholder Name"></div>
js
// app.js — addCard()
async function addCard() {
  const body = {
    cardNumber: document.getElementById('card-number').value,
    expiryMonth: parseInt(document.getElementById('card-expiry-month').value),
    expiryYear: parseInt(document.getElementById('card-expiry-year').value),
    cvv: document.getElementById('card-cvv').value,
    cardholderName: document.getElementById('card-holder').value,
  };
  await apiMutate('POST', '/api/payment/add-card', body, false, 'Card added', () => {
    loadCards();
  });
}
STEP 6 — Give "Pay Order" a real card picker and send paymentMethodId

At minimum, let the admin pick from the cards GET /api/payment/all-cards already returns (this endpoint exists and the panel already calls it via loadCards() — reuse it rather than adding a new one):

html
<!-- app.js — Payment page markup, replace the "Pay Order" form-group -->
<div class="form-group"><input id="pay-order-id" placeholder="Order ID"></div>
<div class="form-group"><input id="pay-method-id" placeholder="Payment Method ID (see All Cards above)"></div>
js
// app.js — payOrder()
async function payOrder() {
  const id = document.getElementById('pay-order-id').value;
  const paymentMethodId = document.getElementById('pay-method-id').value;
  if (!id || !paymentMethodId) { showToast('Enter both order ID and payment method ID', 'error'); return; }
  await apiMutate('POST', `/api/payment/pay/${id}`, { paymentMethodId }, false, 'Payment initiated', () => {});
}

A dropdown populated from loadCards()'s response instead of a raw text input would be a nicer follow-up, but is not required by this plan — the minimum fix is "the request is well-formed," and payment.service.ts's getAllCards() response shape wasn't part of this audit's schema-mismatch findings, so building a dropdown against it belongs in Plan 3 (UX polish) if wanted, not here.

STEP 7 — Resolve "Add Admin" (decision required, do not silently pick one)

promoteToAdmin() only accepts a raw userId. There is currently no backend endpoint to look up a user by email. Pick one of the following two options — do not implement a third option (e.g. guessing at an email-lookup endpoint that doesn't exist) without confirming it first:

Option A — change the admin-panel field to ask for userId directly, no backend change. Simplest, ships immediately:
html
  <div class="form-group"><input id="admin-userId" placeholder="User ID (Firestore doc ID)"></div>
js
  async function addAdmin() {
    const userId = document.getElementById('admin-userId').value;
    if (!userId) { showToast('Enter a user ID', 'error'); return; }
    await apiMutate('POST', '/api/admin/users/add-admin', { userId }, false, 'Admin added', () => {});
  }

Trade-off: whoever operates the admin panel needs another way to find a user's Firestore ID first (e.g. looking it up via a database console, since there is no GET /api/users admin-list endpoint in this backend today either).

Option B — request a backend addition first. Ask for a small, separate backend change — e.g. GET /api/admin/users?email=... — before building an email-based picker in the panel. This is the nicer long-term UX but is out of scope for an admin-panel-only refactor; flag it as a backend follow-up rather than building against an endpoint that doesn't exist.

Recommendation: Option A, since it requires no backend coordination and unblocks the panel today; note Option B as a suggested backend follow-up in the same PR description rather than blocking on it.

STEP 8 — Fix wishlist delete to use wishlistItemId
js
// app.js — loadWishlist(), fix the id lookup
arr.forEach(item => {
  const id = item.wishlistItemId || '';
  html += `<tr><td>${id}</td><td>${highlightJson(JSON.stringify(item, null, 2))}</td>
    <td class="actions"><button class="btn-delete" onclick="deleteWishlist('${id}')">Delete</button></td></tr>`;
});

No change is needed to deleteWishlist(id) itself — it already just does DELETE /api/user/wishlist/${id}, which is exactly the format removeFromWishlist() expects (serviceType_serviceId) once id is populated correctly from wishlistItemId.

ACCEPTANCE CRITERIA
 Creating a rent-a-car car with at least one image URL entered succeeds; leaving the images field empty shows the backend's real 400 VALIDATION_ERROR (via Plan 1's apiMutate), not a false "Car created" toast.
 Creating a travel tour behaves identically for its images field.
 The order-creation dropdown no longer offers HOTEL as a value; selecting HOTEL_ROOM and a valid room ID successfully creates an order.
 Advancing an order's step with a selected screen and valid JSON data succeeds; entering invalid JSON in the data textarea shows a client-side "Data must be valid JSON" error without ever hitting the network.
 Adding a card with all five correctly-named fields filled in succeeds against a real backend; the browser network tab shows a request body with keys cardNumber, expiryMonth, expiryYear, cvv, cardholderName — no expiry/cvc/holderName keys anywhere.
 Paying an order with a valid paymentMethodId (copied from a card returned by "Load Cards") succeeds.
 Adding an admin with a real Firestore user ID succeeds (Option A), or the chosen alternative from Step 7 is implemented and documented.
 Deleting a wishlist item successfully removes it and the list re-renders without it — confirmed via DELETE     /api/user/wishlist/{serviceType}_{serviceId} in the Request Inspector's cURL tab, not DELETE /api/user/wishlist/ with an empty id.
 No other request-shape mismatch was introduced while making these fixes — every other existing form's field names are left untouched.
General instructions for the agent
Apply part8-admin-panel-api-client-fixes.md (Plan 1) before this plan, or at minimum be aware that without it, none of these fixes will be visibly verifiable — the panel will keep crashing before showing you whether a request succeeded or failed.
This project has no automated tests — manually exercise each fixed form against a real (or locally running) backend instance before considering this done.
Keep the diff scoped to the eight items above, across app.js and (for Steps 5–6's markup changes) index.html. Do not touch style.css, and do not add real file-upload plumbing — that's Plan 3.
Step 7 requires an explicit decision, recorded in the PR/commit description — do not silently default to Option A without noting it was a choice, mirroring how the backend plans handled their own open decisions.


Baltazar Admin Panel — Refactor Plan 3 of 3: Real Image Uploads & UX Polish

Paste this file as a standalone prompt to your coding agent. It contains full context and one self-contained refactor. Manually exercise every affected form in a browser after applying it, before considering the task done.

Scope note: this is Plan 3 of a 3-part admin-panel refactor. Apply part8-admin-panel-api-client-fixes.md (Plan 1) and part9-admin-panel-schema-alignment.md (Plan 2) first — this plan assumes apiMutate() already exists and that every form already sends a schema-valid request shape. This plan is about two remaining things: (1) the admin panel's backend already supports real multipart/form-data image uploads for every media-bearing resource, but the panel's forms either don't send multipart at all, or have file inputs that are wired up to nothing; and (2) a handful of smaller UX gaps (dead edit forms, permissive rating input, no double-submit protection) worth fixing while touching these same forms.

CONTEXT

The backend went through a 3-part image-upload refactor (image-upload-part1-infrastructure.md through -part3-avatar-banner-swagger.md) that converted every admin create/update endpoint for images from "accept a URL string in JSON" to "accept a real file via multipart/form-data, using one form field named data (a JSON-stringified blob of every non-image field) plus one file field per image field (profileImage, bannerImage, logo, images, etc.)." The admin panel currently only implements this correctly in two places: createBanner()/updateBanner() and uploadAvatar(). Everywhere else, one of two things is true:

The form has a file input, but it's never read on submit. Hotel's form is the clearest example:
html
   <!-- showHotelForm() -->
   <div class="form-group"><label>Logo (file)</label>
     <input id="hotel-logo" type="file" onchange="previewFile(this,'hotel-logo-preview')">
     <img class="file-preview" id="hotel-logo-preview"></div>
   <div class="form-group"><label>Images (files)</label>
     <input id="hotel-images" type="file" multiple onchange="previewFile(this,'hotel-images-preview')">
     <img class="file-preview" id="hotel-images-preview"></div>

But createHotel()/updateHotel() never call document.getElementById('hotel-logo') or 'hotel-images' at all — they build a plain JSON body and call api('POST', '/api/services/hotel',    body) with Content-Type: application/json. Selecting a logo file shows a preview thumbnail and then does nothing — the file is silently discarded on submit, and the hotel is created/updated with no logo and no images, regardless of what the admin picked.

The form has no image UI at all, and the create/update function sends plain JSON with no image handling whatsoever — this is the case for rent-a-car companies (only plain URL text inputs for profileImage/ bannerImage, no file inputs, no images array UI at all), travel companies (no image UI at all), food companies (no logo/images UI), and food items/rooms (no images UI, even though the schema allows it).

Meanwhile, the backend's resolveImageFields middleware (already correct, see the image-upload refactor docs) is happy to accept either a real file or a passed-through URL string for optional single-image fields — so the panel doesn't strictly need file uploads everywhere to be functional, but wherever a file input already exists and is ignored, or wherever the backend's resource genuinely expects a real uploaded asset (not just a pre-hosted URL an admin happens to have on hand), the panel should give the operator a working file-upload path rather than a decorative one.

Separately, three smaller UX issues were found while auditing these same forms:

editRoom(id) and editBanner(id) open a form pre-filled with nothing but the id, discarding data the panel already has in memory:
js
   async function editRoom(id) {
     // No dedicated GET room endpoint, so we pass partial data
     showRoomForm({ id });
   }
   async function editBanner(id) {
     // No dedicated GET banner endpoint, so we pass what we have
     showBannerForm({ id });
   }

Both comments are correct that no single-item GET endpoint exists for rooms or banners — but viewHotelRooms() and loadBanners() already fetched the full list of rooms/banners to render the table one screen ago; that data is simply thrown away instead of being kept around for the edit form to reuse.

The review rating input allows values the backend doesn't actually want long-term. showReviewForm() has:
html
   <input id="review-rating" type="number" min="0" max="5" step="0.1" value="${d.rating||''}">

allowing 0 and fractional values like 4.5. The backend's review context describes ratings as 1–5, and a companion backend bugfix plan (part7-review-eligibility-followups.md, Step 4) tightens createReviewSchema.rating to z.number().int().min(1).max(5) to match updateReviewSchema's existing bound. Once that backend fix lands, this input will let an admin fill in a value the server will reject.

No form disables its submit button while the request is in flight, so a slow network or a slow Firebase Storage upload invites double-clicks that fire duplicate creates (most visible on createCar/createTour once Plan 2's images field makes those forms take noticeably longer to submit, and even more so once this plan adds real file uploads that need to finish uploading before the response comes back).
GOAL
Every resource that has a media field in its backend schema (profileImage, bannerImage, logo, icon, images) gets a real file input in the admin panel, wired to send actual multipart/form-data using the same data + per-field-file convention the backend already expects (mirroring what createBanner()/updateBanner() already do correctly).
editRoom() and editBanner() hydrate their forms from data the panel already fetched, instead of opening a blank shell.
The review rating input matches the 1–5 integer bound.
Every submit button disables itself for the duration of its request.
STEP 1 — Add a shared multipart form-builder helper

Rather than hand-writing FormData construction per resource (as createBanner() already does once), add one small helper next to apiMutate() so every resource's create/update function builds its multipart body the same way:

js
// app.js — add near apiMutate()

/**
 * Builds a FormData body for a multipart admin endpoint: every non-file
 * field goes into a single JSON-stringified `data` field, and each entry in
 * `fileFields` becomes its own file part (skipped entirely if no file was
 * chosen, so existing URL-string values already in `jsonFields` pass
 * through untouched on update — matching resolveImageFields' documented
 * "no file -> leave existing value" behavior on the backend).
 *
 * fileFields: { fieldName: HTMLInputElement (type=file, single or multiple) }
 */
function buildMultipartBody(jsonFields, fileFields) {
  const formData = new FormData();
  formData.append('data', JSON.stringify(jsonFields));
  for (const [field, input] of Object.entries(fileFields)) {
    if (!input.files || input.files.length === 0) continue;
    if (input.multiple) {
      [...input.files].forEach((file) => formData.append(field, file));
    } else {
      formData.append(field, input.files[0]);
    }
  }
  return formData;
}
STEP 2 — Wire up Hotel's already-existing file inputs

The form markup in Step-0 context already has hotel-logo and hotel-images file inputs — they just need to be read on submit, and the request needs to switch from JSON to multipart:

js
// app.js — createHotel()
async function createHotel() {
  const jsonFields = {
    name: getLocalized('hotel-name'),
    city: document.getElementById('hotel-city').value,
    starRating: parseInt(document.getElementById('hotel-star').value),
    price: parseFloat(document.getElementById('hotel-price').value),
    status: document.getElementById('hotel-status').value,
  };
  const about = getLocalized('hotel-about');
  if (about) jsonFields.about = about;
  const addr = document.getElementById('hotel-address').value;
  if (addr) jsonFields.address = addr;
  const am = document.getElementById('hotel-amenities').value;
  if (am) jsonFields.amenities = am.split(',').map(s => s.trim()).filter(Boolean);
  const sec = document.getElementById('hotel-sections').value;
  if (sec) jsonFields.sectionsOrder = sec.split(',').map(s => s.trim()).filter(Boolean);

  const body = buildMultipartBody(jsonFields, {
    logo: document.getElementById('hotel-logo'),
    images: document.getElementById('hotel-images'),
  });

  await apiMutate('POST', '/api/services/hotel', body, true, 'Hotel created', () => {
    closeModal();
    loadHotels();
  });
}

Apply the identical change to updateHotel(id) (same field-gathering logic, PUT /api/services/hotel/${id} instead of POST). Note the fourth argument to apiMutate is now true (multipart) instead of false.

STEP 3 — Add real image UI to Rent-a-Car Companies

Replace the existing plain-URL text inputs with file inputs for profileImage/bannerImage, and add a new multi-file images input (the schema already supports images: z.array(z.string()).optional(), the panel never exposed it):

html
<!-- app.js — showRentacarCompanyForm(), replace the profileImage/bannerImage rows -->
<div class="form-group"><label>Profile Image (file)</label>
  <input id="rc-profileImage" type="file" onchange="previewFile(this,'rc-profileImage-preview')">
  <img class="file-preview" id="rc-profileImage-preview"></div>
<div class="form-group"><label>Banner Image (file)</label>
  <input id="rc-bannerImage" type="file" onchange="previewFile(this,'rc-bannerImage-preview')">
  <img class="file-preview" id="rc-bannerImage-preview"></div>
<div class="form-group"><label>Images (files)</label>
  <input id="rc-images" type="file" multiple onchange="previewFile(this,'rc-images-preview')">
  <img class="file-preview" id="rc-images-preview"></div>
js
// app.js — createRentacarCompany()
async function createRentacarCompany() {
  const jsonFields = { name: getLocalized('rc-name'), status: document.getElementById('rc-status').value };
  const about = getLocalized('rc-about');
  if (about) jsonFields.about = about;
  const sec = document.getElementById('rc-sections').value;
  if (sec) jsonFields.sectionsOrder = sec.split(',').map(s => s.trim()).filter(Boolean);

  const body = buildMultipartBody(jsonFields, {
    profileImage: document.getElementById('rc-profileImage'),
    bannerImage: document.getElementById('rc-bannerImage'),
    images: document.getElementById('rc-images'),
  });

  await apiMutate('POST', '/api/services/rentacar/companies', body, true, 'Company created', () => {
    closeModal();
    loadRentacarCompanies();
    loadRentacarCompaniesDropdowns();
  });
}

Apply the identical change to updateRentacarCompany(id). Since editing no longer has a text value to pre-fill (file inputs can't be pre-populated with an existing URL for security reasons — this is a standard browser restriction, not a bug to work around), show the currently-stored URL as read-only reference text next to each file input in edit mode so the admin can see what's already set before deciding whether to replace it:

html
<!-- inside showRentacarCompanyForm(), when `data` (i.e. editing) is truthy -->
${data && d.profileImage ? `<p style="color:var(--text-muted);font-size:11px;margin-top:4px">Current: ${d.profileImage}</p>` : ''}
STEP 4 — Add image UI to Rent-a-Car Cars, Travel Companies/Tours, Food Companies/Items, and Rooms

Apply the same buildMultipartBody() pattern established in Steps 2–3 to every remaining media-bearing form:

Rent-a-car Cars (showRentacarCarForm): replace Plan 2's comma-separated car-images text input (if Plan 2 was applied first) or add fresh if applying this plan standalone — a multi-file input, same as hotel's images. resolveImageFields('cars', [{ field: 'images', kind: 'multi', required: true }]) on the backend needs an actual images file field name in the multipart body, matching this input's id="car-images" and name in the buildMultipartBody call.
Travel Companies (showTravelCompanyForm): add profileImage, bannerImage, images file inputs — none exist today.
Travel Tours (showTravelTourForm): replace/add images as a multi-file input, same reasoning as rent-a-car cars.
Food Companies (showFoodCompanyForm): add logo (single file) and images (multi-file) inputs — none exist today.
Food Items (showFoodItemForm): add images (multi-file) — none exists today.
Rooms (showRoomForm): add images (multi-file) — none exists today.

For each, follow the exact structure already demonstrated in Steps 2–3: buildMultipartBody(jsonFields, fileFieldsMap) in place of a plain object, apiMutate(method, path, body, true /* isMultipart */, message, onSuccess) in place of the old JSON call. Do not deviate from this shape between resources — consistency here is more valuable than any per-resource cleverness.

STEP 5 — Hydrate editRoom()/editBanner() from already-fetched list data

Cache each list's last-fetched array in a module-level variable when it's loaded, and look up by id when editing instead of passing only { id }:

js
// app.js — near the other state variables at the top of the file
let currentRoomsList = [];
let currentBannersList = [];
js
// app.js — viewHotelRooms(hotelId), store the fetched array
async function viewHotelRooms(hotelId) {
  currentHotelId = hotelId;
  document.getElementById('hotel-rooms-section').style.display = 'block';
  document.getElementById('hotel-rooms-title').textContent = `Rooms for Hotel ${hotelId}`;
  const { data } = await api('GET', `/api/services/hotel/${hotelId}/rooms`);
  const items = data?.data || data || [];
  currentRoomsList = Array.isArray(items) ? items : [];
  // ...rest of the function (building `html`) stays unchanged, just read from currentRoomsList
  // instead of re-deriving `arr` separately
}
js
// app.js — editRoom(id), look the room up instead of passing only {id}
async function editRoom(id) {
  const room = currentRoomsList.find((r) => r.id === id);
  showRoomForm(room || { id });
}

Apply the identical pattern to banners:

js
// app.js — near the other state variables
let currentBannersList = [];

// loadBanners(), store the fetched array
async function loadBanners() {
  const { data } = await api('GET', '/api/home/banner');
  const items = data?.data || data || [];
  currentBannersList = Array.isArray(items) ? items : [];
  // ...rest unchanged, read from currentBannersList
}

// editBanner(id)
async function editBanner(id) {
  const banner = currentBannersList.find((b) => b.id === id);
  showBannerForm(banner || { id });
}

If the room or banner isn't found in the cached list (e.g. the table wasn't reloaded after some other change), falling back to { id } preserves today's behavior exactly rather than throwing — this is a pure enhancement with no worse fallback than before.

STEP 6 — Tighten the review rating input to integer 1–5
html
<!-- app.js — showReviewForm(), replace the rating input -->
<div class="form-group"><label>Rating (1-5)</label>
  <input id="review-rating" type="number" min="1" max="5" step="1" value="${d.rating||''}"></div>

No change is needed to createReview()/updateReview()'s parseFloat(...) call sites beyond this — an integer typed into a step="1" input parses identically via parseFloat, but if you'd rather be explicit that this is now always a whole number, switching to parseInt(..., 10) in both places is a reasonable accompanying change, not a required one.

STEP 7 — Disable submit buttons while a request is in flight

Add a small helper that any submit button's onclick handler can opt into, and apply it to every btn-submit button across every form built via openModal():

js
// app.js — add near apiMutate()

/**
 * Wraps a submit-button click handler so the button disables itself (and
 * shows a busy label) for the duration of the async action, re-enabling
 * it afterward regardless of success or failure. Prevents double-submit
 * from an impatient double-click or a slow multipart upload.
 */
async function withButtonBusy(button, busyLabel, action) {
  const originalLabel = button.textContent;
  const originalDisabled = button.disabled;
  button.disabled = true;
  button.textContent = busyLabel;
  try {
    await action();
  } finally {
    button.disabled = originalDisabled;
    button.textContent = originalLabel;
  }
}

Update every btn-submit button's inline onclick to pass this through, e.g.:

html
<!-- Before -->
<button class="btn-submit" onclick="createHotel()">Create</button>
<!-- After -->
<button class="btn-submit" onclick="withButtonBusy(this, 'Saving…', createHotel)">Create</button>

Apply this wrapping to every btn-submit button generated by every show*Form() function in the file (hotel, room, rent-a-car company/car, travel company/tour, food company/item, included service, review, order, banner, wishlist) — this is a mechanical find-and-wrap across the template strings, not a per-form redesign.

ACCEPTANCE CRITERIA
 Selecting a logo file in the Hotel form and submitting results in a real https://storage.googleapis.com/... URL showing up in logo on the next GET /api/services/hotel/{id} — confirmed via the Request Inspector's Response tab, not just "no error was shown."
 The same is true for hotel images, rent-a-car company profileImage/bannerImage/images, rent-a-car car images, travel company profileImage/bannerImage/images, travel tour images, food company logo/images, food item images, and room images.
 Editing an existing rent-a-car company (or any resource converted in this plan) without choosing a new file for an already-set image field leaves that field's existing URL untouched in Firestore (confirms buildMultipartBody()'s "skip file fields with no chosen file" behavior lines up with the backend's resolveImageFields "no file -> leave untouched" contract).
 Clicking "Rooms" for a hotel, then "Edit" on one of the listed rooms, opens a form pre-filled with that room's actual name/type/price/ capacity/amenities/status — not a blank form with only the ID known.
 The same is true for editing an existing banner.
 The review rating input's browser-native spinner only allows whole numbers from 1–5; typing 0 or 4.5 and blurring the field shows the browser's built-in out-of-range indicator.
 Every btn-submit button across every form disables itself and shows a busy label for the duration of its request, then returns to normal whether the request succeeded or failed.
 Rapidly double-clicking any submit button no longer fires two requests — the second click is a no-op while the button is disabled.
General instructions for the agent
Apply Plans 1 and 2 first — this plan assumes apiMutate() exists and that every form already sends schema-valid JSON payloads; Step 1–4 here only change how that payload travels (multipart vs JSON), not what's in it.
This project has no automated tests — manually exercise every converted form (create, edit without changing the file, edit while changing the file) against a real backend before considering this done, and inspect the actual Firestore document or the GET response afterward to confirm the uploaded URL landed where expected, not just that no error was shown.
Keep new file-input ids consistent with the naming convention already established (<resource-prefix>-<fieldName>, e.g. rc-profileImage, item-images) so future maintainers can find them by pattern.
Do not add any new backend-facing behavior beyond what the already-applied image-upload refactor (image-upload-part1/2/3) already supports — this plan is strictly about the panel catching up to what the backend already accepts, not requesting new backend capability.