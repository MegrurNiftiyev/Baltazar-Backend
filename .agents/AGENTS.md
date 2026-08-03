# Baltazar Backend Agent & Developer Guide

## Repository Map

# Core Application Architecture
- `src/server.ts`: Main entry point initializing environment variables, Firebase connection, background cron jobs, and starting the HTTP server.
- `src/app.ts`: Express application setup including security headers (Helmet), CORS, JSON body parsers, rate limiters, route mounting, and centralized error handling.

# Configuration & Infrastructure
- `src/config/env.ts`: Environment variable validation and parsing using Zod.
- `src/config/firebase.ts`: Firebase Admin SDK initialization and Firestore/Storage database instances.
- `src/config/collections.ts`: Centralized Firestore collection name definitions (`USERS`, `CARS`, `HOTELS`, `FOOD_ITEMS`, `ORDERS`, `UPLOADS`, etc.).
- `src/config/locales.ts`: Internationalization dictionaries and multi-language error message helpers.
- `src/config/swagger.ts`: Swagger UI setup and OpenAPI specification generator.

# Feature Modules (`src/modules/`)
- `src/modules/admin/`: Admin panel backend operations, system metrics, database seeding/reset, and transaction logs (`admin.routes.ts`, `admin.controller.ts`, `admin.service.ts`, `admin.schema.ts`).
- `src/modules/appConfig/`: Dynamic application configurations, version flags, and feature toggles.
- `src/modules/auth/`: User authentication workflows including registration, JWT login, token refresh, and Google OAuth.
- `src/modules/food/`: Food delivery domain managing food companies and food items.
- `src/modules/home/`: Homepage feed data and marketing banners.
- `src/modules/hotel/`: Hotel booking domain managing hotels, rooms, and availability.
- `src/modules/order/`: Core order lifecycle, status state machine (`PENDING` -> `PROCESSING` -> `CONFIRMED` / `CANCELLED`), and server-side price computation.
- `src/modules/payment/`: Integration with the external Payment Simulator (`charges` execution via `baltazar-backend-payment.onrender.com`).
- `src/modules/rentacar/`: Car rental domain managing rental companies and vehicles.
- `src/modules/reviews/`: Generic multi-domain review system featuring verified buyer eligibility and automatic rating aggregation.
- `src/modules/travel/`: Travel domain managing travel agencies and tour packages.
- `src/modules/uploads/`: Generic 2-step image upload endpoints (`POST /api/uploads/image`, `POST /api/uploads/images`), storage lifecycle tracking (`pending` -> `confirmed`), and image reference validation.
- `src/modules/users/`: User profile management, avatar updates, and account status handling.
- `src/modules/wishlist/`: User bookmarking and wishlist management for multi-domain entities.

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

# API & Data Flow Contracts
- All entity endpoints MUST accept plain `application/json` payloads. Never create or update domain entities using `multipart/form-data`.
- Image fields in schemas must always be valid URL strings (`z.string().url()`).
- Use the 2-Step Image Upload workflow: 1) Upload raw file to `/api/uploads/image` to receive a `url`, 2) Pass the returned `url` string inside JSON entity payloads.
- Use `validateImageReferences` middleware before entity creation to ensure uploaded images are valid and belong to the active user.

# Error Handling & Security
- Throw operational errors using `AppError(statusCode, errorCode, message)` rather than standard `Error`.
- Never expose sensitive stack traces or raw database error messages to clients in production mode.
- Always sanitize and validate incoming parameters to prevent path traversal or unverified data access.

# Code Integrity
- Run `npm run lint` (`tsc --noEmit`) to verify project-wide TypeScript compilation before completing any task.
- Keep comments and docstrings up to date when changing method signatures or route parameters.
