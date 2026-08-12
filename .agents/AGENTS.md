# Baltazar Backend Agent & Developer Guide

> This guide reflects the backend **after** the 3-part refactor (centralized enums module,
> per-company section ordering, unified companies module). If any of that work is not yet
> merged into the branch you're working on, treat this file as the target state, not the
> current one — check `src/modules/enums/` and `src/modules/companies/` exist before assuming
> anything below is already true.

## Repository Map

# Core Application Architecture
- `src/server.ts`: Main entry point initializing environment variables, Firebase connection, background cron jobs, and starting the HTTP server.
- `src/app.ts`: Express application setup including security headers (Helmet), CORS, JSON body parsers, rate limiters, route mounting, and centralized error handling.

# Configuration & Infrastructure
- `src/config/env.ts`: Environment variable validation and parsing using Zod.
- `src/config/firebase.ts`: Firebase Admin SDK initialization and Firestore/Storage database instances.
- `src/config/collections.ts`: Centralized Firestore collection name definitions (`USERS`, `CARS`, `HOTELS`, `FOOD_ITEMS`, `COMPANIES`, `ORDERS`, `UPLOADS`, etc.). `COMPANIES` is a single shared collection across all service types — see the Companies module below, it is the only module that reads/writes it directly.
- `src/config/locales.ts`: Internationalization dictionaries and multi-language error message helpers.
- `src/config/swagger.ts`: Swagger UI setup and OpenAPI specification generator. The `tags` array must only ever list tags that are actually used by a route's `@swagger` block — do not add a tag "for later." (A stray `Services` tag with no routes was removed for exactly this reason; don't reintroduce that pattern.)

# Shared Domain Primitives (`src/shared/`)
- `src/shared/enums.ts`: The single source of truth for every enum that is NOT owned by one
  specific module — `companyStatusEnum`, `companyDetailSectionEnum`, `regionEnum`,
  `currencyEnum`, and `REGION_CURRENCY_MAP`. Enums that only make sense inside one module
  (e.g. `fuelTypeEnum` in rentacar) stay defined in that module's own `.schema.ts` — they don't
  need to move here, they just need to be re-exported and registered (see the Enums module
  below).
- `src/shared/serviceType.ts`: Exports the single canonical `serviceTypeEnum` —
  `['RENT_A_CAR', 'HOTEL', 'TRAVEL', 'FOOD']`. Every module that needs to represent "which
  service domain does this belong to" imports this. There is exactly one valid spelling for the
  hotel domain: `'HOTEL'`. A `'HOTEL_ROOM'` variant existed briefly in `order.schema.ts` and was
  a bug, not an alternate spelling — never reintroduce it, and never add a second `serviceType`-
  like enum anywhere else in the codebase.
- `src/shared/language.ts`: Exports `languageEnum` (`az | en | ru`), used both by
  `resolveLocale` middleware and anywhere a user's language preference is validated.

# Feature Modules (`src/modules/`)
- `src/modules/admin/`: Admin panel backend operations, system metrics, database seeding/reset, and transaction logs (`admin.routes.ts`, `admin.controller.ts`, `admin.service.ts`, `admin.schema.ts`).
- `src/modules/appConfig/`: Dynamic application configurations, version flags, and feature toggles.
- `src/modules/auth/`: User authentication workflows including registration, JWT login, token refresh, and Google OAuth.
- `src/modules/companies/`: **Owns all company CRUD for every service type.** `GET /api/companies` (optional `serviceType` query filter), `GET /api/companies/:id`, `POST /api/companies`, `PUT /api/companies/:id`, `DELETE /api/companies/:id`. Reads/writes `COLLECTIONS.COMPANIES` directly — no other module may do this. Owns the `sectionOrder` field (subset/order of `ABOUT | GALLERY | ITEMS`) and computes `fullSectionOrder` (`HEADER` + `sectionOrder` + `REVIEWS`) on the detail response. On delete, dispatches to the owning service module's `delete<X>ForCompany(companyId)` helper to cascade-delete that company's child items before removing the company document itself.
- `src/modules/enums/`: **Exposes every enum in the system as a read-only API.** One route, `GET /api/enums/:key`, backed by `enums.registry.ts` which maps a URL-safe key (e.g. `service-types`, `regions`, `currencies`, `company-sections`, `order-statuses`) to an existing enum's `.options`. This module never defines a new enum value itself — it only imports and re-exposes. If you add a new enum anywhere in the codebase that a client might need to know valid values for, register it here in the same PR.
- `src/modules/food/`: Food delivery domain managing food items only (company CRUD moved to `companies` module). Owns `foodItemsCollection` and exports `deleteFoodItemsForCompany(companyId)` for the companies module to call on cascade delete.
- `src/modules/home/`: Homepage feed data and marketing banners.
- `src/modules/hotel/`: Hotel booking domain managing hotels, rooms, and availability.
- `src/modules/order/`: Core order lifecycle, status state machine (`PENDING` -> `AWAITING_PAYMENT` -> `PROCESSING` -> `CONFIRMED` / `CANCELLED` / `EXPIRED`), and server-side price computation. `serviceType` on an order always uses the canonical `serviceTypeEnum` from `src/shared/serviceType.ts` — never a module-local redefinition.
- `src/modules/payment/`: Integration with the external Payment Simulator (`charges` execution via `baltazar-backend-payment.onrender.com`).
- `src/modules/rentacar/`: Car rental domain managing vehicles only (company CRUD moved to `companies` module). Owns the vehicle collection and exports `deleteCarsForCompany(companyId)` for the companies module to call on cascade delete.
- `src/modules/reviews/`: Generic multi-domain review system featuring verified buyer eligibility and automatic rating aggregation. `targetType` includes `COMPANY` alongside the four service types.
- `src/modules/travel/`: Travel domain managing tour packages only (company CRUD moved to `companies` module). Owns the tours collection and exports `deleteToursForCompany(companyId)` for the companies module to call on cascade delete.
- `src/modules/uploads/`: Generic 2-step image upload endpoints (`POST /api/uploads/image`, `POST /api/uploads/images`), storage lifecycle tracking (`pending` -> `confirmed`), and image reference validation.
- `src/modules/users/`: User profile management, avatar updates, and account status handling. Returns top-level boolean completeness flags (`personalInfo`, `driverLicense`, `passport`). `wishlist` array is NOT embedded in `User` documents.
- `src/modules/wishlist/`: User bookmarking and wishlist management storing entries in dedicated Firestore `wishlist` collection (`COLLECTIONS.WISHLIST`). Returns `ExploreCardDTO[]` populated cards. `DELETE /api/user/wishlist/:id` takes item ID in URL path.

# Middlewares (`src/middlewares/`)
- `src/middlewares/requireAuth.ts`: JWT authentication guard injecting `req.user` context.
- `src/middlewares/validate.ts`: Request validation factory executing Zod schemas against `req.body`, `req.query`, or `req.params`.
- `src/middlewares/upload.ts`: Multer upload middleware enforcing 5 MB max size and image-only MIME-type restrictions (`image/jpeg`, `image/png`, `image/webp`).
- `src/middlewares/validateImageReferences.ts`: Middleware validating that referenced image URLs exist in the `uploads` collection, belong to the requesting user, and are not expired.
- `src/middlewares/errorHandler.ts`: Centralized error handler converting operational errors (`AppError`) and uncaught exceptions into standard API responses.
- `src/middlewares/rateLimiters.ts`: Rate limiting rules protecting sensitive auth, upload, and payment endpoints.

# Background Jobs (`src/jobs/`)
- `src/jobs/cleanupExpiredUploads.ts`: Automated scheduled job running via `node-cron` that cleans up orphaned `pending` uploads from Firebase Storage and Firestore.

# Utilities & Types
- `src/utils/uploadImage.ts`: Firebase Storage upload helper generating unique unguessable filenames (`crypto.randomUUID()`).
- `src/utils/catchAsync.ts`: Async wrapper catching unhandled promise rejections in controller actions.
- `src/errors/AppError.ts`: Operational error class containing HTTP status codes, error codes, and contextual details.
- `src/types/`: Global TypeScript interface augmentations (e.g. extending Express `Request` with `req.user`).

# OpenAPI & Swagger Specs
- `src/openapi/registry.ts`: Centralized OpenAPI schema registry mapping Zod schemas to Swagger components.
- `scripts/generateSwagger.ts`: Build script compiling OpenAPI definitions into static documentation assets.

# Admin Dashboard (`admin/`)
- `admin/`: Modular Multi-Page Application (MPA) static dashboard (HTML, CSS, JS) operating independently from git source control.

---

## Git Commit Rules

# Commit Message Format
- Must follow the **Conventional Commits** specification: `<type>(<scope>): <short description>`.
- Allowed types:
  - `feat`: A new feature added to the application or API.
  - `fix`: A bug fix in existing codebase or logic.
  - `refactor`: Code change that neither fixes a bug nor adds a feature (e.g., restructuring modules).
  - `docs`: Documentation changes only (e.g., updating `README.md` or Swagger specs).
  - `chore`: Changes to build process, dependencies, or configuration without affecting src code.
  - `test`: Adding missing tests or correcting existing unit tests.

# Subject Line Guidelines
- Write in lowercase imperative mood (e.g., `use add user endpoint` not `Added user endpoint`).
- Keep the subject line under 70 characters.
- Do not put a period `.` at the end of the commit message header.

# Body & Breaking Changes
- Use an optional body to explain **what** changed and **why** (not how).
- Mention breaking API changes using `BREAKING CHANGE:` header in the footer or `!` after the type (e.g. `feat!: change image field format from uploadId to url`).

---

## General Rules & Guidelines

# Architectural Standards
- Enforce standard Layered Architecture: `Route` -> `Middleware` -> `Controller` -> `Service` -> `Schema`.
- Never put business logic or direct database calls inside controllers or routes; keep controllers thin and place domain logic in `.service.ts`.
- Enforce strict Zod schema validation on every input payload (`body`, `query`, `params`).

# Enum Governance (new — added after the enums-centralization refactor)
- An enum's values are defined in exactly ONE place: either inside the module that owns the
  concept (e.g. `fuelTypeEnum` stays in `rentacar.schema.ts`) or in `src/shared/enums.ts` if
  it's a cross-cutting concept (`region`, `currency`, `companyDetailSection`, `companyStatus`).
  Never copy-paste a `z.enum([...])` literal into a second file — import the existing constant.
- Every enum a client might need valid values for must be registered in
  `src/modules/enums/enums.registry.ts` under a stable, kebab-case key, in the same PR that
  introduces or changes the enum. If you add a new status/type/category value to any schema,
  check whether it's already covered by an existing registry entry before adding a new one.
- Never introduce a second enum for a concept that already has one (the `HOTEL_ROOM` /
  `HOTEL` incident is the canonical example of what this rule prevents — always import
  `serviceTypeEnum` from `src/shared/serviceType.ts` rather than writing a local
  `z.enum(['RENT_A_CAR', 'HOTEL', ...])` inline).

# Company Data Ownership (new — added after the companies-unification refactor)
- `COLLECTIONS.COMPANIES` is read and written ONLY from `src/modules/companies/`. If you're
  working inside `food`, `rentacar`, or `travel` and find yourself wanting to query or mutate a
  company document directly, that's a sign the logic belongs in the companies module instead —
  add a function there, or extend the `delete<X>ForCompany` cascade-delete contract rather than
  reaching into `COLLECTIONS.COMPANIES` from a service module.
- A company's `sectionOrder` only contains the admin-configurable sections
  (`ABOUT | GALLERY | ITEMS`). `HEADER` and `REVIEWS` are always present in a fixed position and
  are computed server-side into `fullSectionOrder` — never made part of the stored/editable
  array, and never added as values to `companyDetailSectionEnum`.

# API & Data Flow Contracts
- All entity endpoints MUST accept plain `application/json` payloads. Never create or update domain entities using `multipart/form-data`.
- Image fields in schemas must always be valid URL strings (`z.string().url()`).
- Use the 2-Step Image Upload workflow: 1) Upload raw file to `/api/uploads/image` to receive a `url`, 2) Pass the returned `url` string inside JSON entity payloads.
- Use `validateImageReferences` middleware before entity creation to ensure uploaded images are valid and belong to the active user.

# Error Handling & Security
- Throw operational errors using `AppError(statusCode, errorCode, message)` rather than standard `Error`.
- Never expose sensitive stack traces or raw database error messages to clients in production mode.
- Always sanitize and validate incoming parameters to prevent path traversal or unverified data access.
- Public read-only endpoints (like `GET /api/enums/:key`) should still go through the standard
  `catchAsync` + centralized error handler path even though they need no auth — don't special-
  case error handling for "simple" endpoints.

# Code Integrity
- Run `npm run lint` (`tsc --noEmit`) to verify project-wide TypeScript compilation before completing any task.
- Keep comments and docstrings up to date when changing method signatures or route parameters.
- When removing a module's responsibility (as happened when company CRUD moved out of
  food/rentacar/travel), grep the whole `src/` and `scripts/` tree for the old route paths and
  function names before considering the change done — a dangling reference to a deleted
  endpoint (e.g. in `seedAll.ts`) is a broken build, not a documentation nitpick.