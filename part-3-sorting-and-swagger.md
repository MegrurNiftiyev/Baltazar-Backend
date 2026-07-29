# Refactor Task — Part 3 of 3: `order` Field Sorting + Full Swagger Schemas via Zod

This part must be done **last**, after the admin decentralization (Part 1) and the home/banner CRUD (Part 2) are complete and merged, because it depends on the final route structure.

## Project context

This is a Node.js + TypeScript + Express backend for a multi-service booking app (hotel, rent-a-car, food, travel, orders, payments, reviews, wishlist, home/banner, admin), using Firestore as the database and Zod for request validation. Modules follow this structure:

```
src/modules/<domain>/
  <domain>.routes.ts     // Express routes + inline @swagger JSDoc comments
  <domain>.controller.ts
  <domain>.service.ts
  <domain>.schema.ts     // Zod validation schemas
```

Swagger docs are currently generated with `swagger-jsdoc`, reading YAML written by hand inside `@swagger` JSDoc comment blocks above each route in every `*.routes.ts` file.

---

## Task A — Sort any list with an `order` field

Any Firestore collection that has an `order: number` field on its documents must be returned sorted ascending by that field whenever it's listed. As of this refactor, the concrete case is the `BANNERS` collection (`GET /api/home/banner`, built in Part 2) — make sure its query includes:

```ts
db.collection(COLLECTIONS.BANNERS).where('isActive', '==', true).orderBy('order', 'asc').get();
```

Search the rest of the codebase for any other collection/list endpoint that has an `order` numeric field on its documents and is not currently sorted by it, and apply the same `orderBy('order', 'asc')` rule there too. If none exist besides banners, no further changes are needed for this task.

---

## Task B — Migrate Swagger docs to be generated from Zod schemas

### The problem

Every module has a Zod schema file (e.g. `auth.schema.ts`) that already defines the real shape of request bodies:

```ts
export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  phone: z.string().min(7).max(20).optional(),
  region: z.string().min(1).max(10).optional(),
  language: z.enum(['az', 'en', 'ru']).optional().default('en'),
});
```

But the `@swagger` JSDoc comment above the corresponding route re-writes the same shape by hand, completely disconnected from the Zod schema:

```yaml
properties:
  name: { type: string, minLength: 2, maxLength: 100 }
  email: { type: string, format: email }
  password: { type: string, minLength: 8, maxLength: 128 }
  phone: { type: string }
  ...
```

This means every time a Zod schema changes, someone has to remember to manually update the matching YAML in a completely different part of the file, and it's already drifted in multiple modules. Additionally, most success/error responses currently have no schema at all — just a plain-text `description`, and `components.schemas` in the swagger config only defines one shared `ErrorResponse`, with no `$ref` used anywhere else in the whole codebase.

### The fix

Use the `@asteasolutions/zod-to-openapi` package so the Zod schemas themselves become the single source of truth for both runtime validation and API documentation.

Install: `@asteasolutions/zod-to-openapi` (peer-dependent on `zod`, already installed).

### Step 1 — Add OpenAPI metadata to every `*.schema.ts` file

At the top of each schema file:

```ts
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);
```

Then chain `.openapi({ example: ... })` on individual fields where a helpful example makes sense, and `.openapi('SchemaName')` on the full object schema so it gets registered under a named component. Example for `auth.schema.ts`:

```ts
export const registerSchema = z
  .object({
    name: z.string().min(2).max(100).openapi({ example: 'Elvin Mammadov' }),
    email: z.string().email().toLowerCase().trim().openapi({ example: 'elvin@example.com' }),
    password: z.string().min(8).max(128).openapi({ example: 'StrongPass123' }),
    phone: z.string().min(7).max(20).optional(),
    region: z.string().min(1).max(10).optional(),
    language: z.enum(['az', 'en', 'ru']).optional().default('en'),
  })
  .openapi('RegisterInput');

export const loginSchema = z
  .object({
    email: z.string().email().toLowerCase().trim(),
    password: z.string().min(1),
  })
  .openapi('LoginInput');
```

Apply this same treatment to every request-body schema and, where they exist, response-shape schemas, across **every** module: auth, user, hotel, rentacar, food, travel, included-services, order, order-screens, payment, reviews, wishlist, home (including the new banner schema from Part 2), app config, admin.

Pick clear, unique component names for each (`RegisterInput`, `LoginInput`, `CreateHotelInput`, `UpdateBannerInput`, `OrderResponse`, etc.) — avoid name collisions across modules.

### Step 2 — Central registry

Create `src/openapi/registry.ts`. Import every schema that was just annotated and register it:

```ts
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { registerSchema, loginSchema, refreshSchema, googleLoginSchema } from '../modules/auth/auth.schema.js';
// ... import from every other module's schema file

export const registry = new OpenAPIRegistry();

registry.register('RegisterInput', registerSchema);
registry.register('LoginInput', loginSchema);
// ... register every schema from every module, using the same name passed to .openapi(...)
```

### Step 3 — Wire the generator into the existing swagger config

Find the existing swagger-jsdoc setup file (likely `swagger.ts` or similar) and merge the generated components with the existing hand-written ones instead of replacing the file wholesale:

```ts
import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import swaggerJSDoc from 'swagger-jsdoc';
import { registry } from './openapi/registry.js';

const generator = new OpenApiGeneratorV3(registry.definitions);
const generatedComponents = generator.generateComponents();

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Baltazar API', version: '1.0.0', description: '...' }, // keep existing info/tags as-is
    tags: [ /* keep existing tags array unchanged */ ],
    components: {
      securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
      schemas: {
        ErrorResponse: { /* keep the existing hand-written ErrorResponse unchanged */ },
        ...generatedComponents.components?.schemas,
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/modules/**/*.routes.ts'], // keep existing glob unchanged
};

export const swaggerSpec = swaggerJSDoc(options);
```

### Step 4 — Replace inline JSDoc bodies with `$ref`

For every route in every `*.routes.ts` file, replace hand-written `requestBody`/`responses` YAML with references to the registered component names. Example:

```yaml
# @swagger
# /api/auth/register:
#   post:
#     tags: [Auth]
#     summary: Register a new user
#     security: []
#     requestBody:
#       required: true
#       content:
#         application/json:
#           schema:
#             $ref: '#/components/schemas/RegisterInput'
#     responses:
#       201: { description: User registered successfully }
#       409:
#         description: User with this email already exists
#         content:
#           application/json:
#             schema:
#               $ref: '#/components/schemas/ErrorResponse'
```

Go through every module's routes file and do this systematically — request bodies should `$ref` the matching input schema, and where a response schema was defined in Step 1 (or can reasonably be added), reference it too instead of leaving a bare `description` string. Keep `tags`, `summary`, path parameters, query parameters, and status codes as they currently are — only replace the schema bodies with `$ref`s.

Make sure this pass reflects the **final** route structure from Part 1 and Part 2 (e.g. document `PUT /api/orders/:id/status`, `POST/PUT/DELETE /api/home/banner/:id`, `PUT /api/user/:id/disable`, and the fact that `/api/admin` now only has 2 endpoints) — do not document the old `/api/admin/orders`, `/api/admin/reviews`, etc., since those routes no longer exist.

## Acceptance criteria

- Every module's Zod schemas are the single source of truth: changing a Zod schema field automatically changes what Swagger documents, with no manually duplicated YAML shape definitions left anywhere.
- `components.schemas` in the generated OpenAPI spec includes `ErrorResponse` plus one registered schema per module input/output that was migrated.
- The generated Swagger UI (`/api-docs` or wherever it's mounted) loads without errors and every endpoint's request body shows the correct fields, types, and constraints matching its Zod schema.
- No route in any `*.routes.ts` file still has a fully hand-written inline `properties:` block for a request body that has a corresponding Zod schema — all use `$ref`.
- The Swagger docs match the final endpoint list from Parts 1 and 2, including newly added/moved routes and the removal of old `/api/admin/*` routes that no longer exist.
- Validation logic (`validate({ body: schemaName })` middleware or equivalent) is untouched — this task only changes documentation generation, not runtime request validation behavior.
