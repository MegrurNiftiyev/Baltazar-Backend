# Demli Backend

Production-grade TypeScript + Express backend for the Demli multi-service platform — rent-a-car, travel, hotel, food ordering, multi-step booking (FlowBox), payments, reviews, and wishlists.

## 🏗️ Architecture

```
server.ts                  ← entry point (dotenv, HTTP, graceful shutdown)
src/
├── app.ts                 ← Express app (middleware stack, route mounting)
├── config/                ← env validation, Firebase, Swagger, i18n
├── errors/                ← AppError class
├── middlewares/           ← auth, role, validation, rate-limit, error handler
├── modules/               ← domain modules (auth, users, admin, …)
│   ├── auth/
│   ├── users/
│   ├── admin/
│   ├── services/
│   ├── rentacar/
│   ├── travel/
│   ├── hotel/
│   ├── food/
│   ├── flowbox/
│   ├── payment/
│   ├── reviews/
│   └── wishlist/
├── services/              ← cross-cutting services (exchange rate)
├── types/                 ← Express augmentations
└── utils/                 ← catchAsync, JWT, password hashing, localize
```

Each module follows a consistent 4-file pattern:
`schema.ts` → `service.ts` → `controller.ts` → `routes.ts`

## 🚀 Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js (ESM) |
| Language | TypeScript (strict mode) |
| Framework | Express |
| Database | Firebase Firestore |
| Auth | JWT (access + refresh tokens), Google OAuth |
| Validation | Zod |
| Security | Helmet, CORS, HPP, express-rate-limit |
| Logging | Pino + pino-http |
| API Docs | Swagger UI + swagger-jsdoc (OpenAPI 3.0) |
| Config | dotenv-flow (.env.development / .env.staging / .env.production) |

## 📋 Setup

### 1. Clone & Install

```bash
git clone <repo-url>
cd Backend
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.development` and fill in the values:

```bash
cp .env.example .env.development
```

Required variables:

| Variable | Description |
|---|---|
| `NODE_ENV` | `development`, `staging`, or `production` |
| `PORT` | HTTP port (default: 3000) |
| `JWT_ACCESS_SECRET` | ≥32 character secret for access tokens |
| `JWT_REFRESH_SECRET` | ≥32 character secret for refresh tokens |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key (PEM) |
| `CORS_ORIGIN` | Comma-separated allowed origins |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `PAYMENT_GATEWAY_URL` | Payment gateway simulator base URL |

### 3. Run

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build
npm start
```

### 4. API Documentation

Once the server is running:

- **Interactive Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Raw JSON Spec**: [http://localhost:3000/api-docs.json](http://localhost:3000/api-docs.json)
- **Static YAML**: See `docs/swagger.yaml`

## 🔐 Authentication

The API uses JWT bearer tokens:

1. **Register** → `POST /api/auth/register`
2. **Login** → `POST /api/auth/login` → returns `{ accessToken, refreshToken }`
3. **Use** → Add `Authorization: Bearer <accessToken>` header
4. **Refresh** → `POST /api/auth/refresh` with `{ refreshToken }`
5. **Google OAuth** → `POST /api/auth/google` with `{ idToken }`

Access tokens expire in 15 minutes. Refresh tokens expire in 30 days.

### Admin Bootstrap

There is no API endpoint to create the first admin account. You must bootstrap the first admin directly in Firestore:
1. Register a normal user account via the app or API.
2. Open the Firebase Console -> Firestore Database.
3. Locate the user in the `users` collection.
4. Manually change their `role` field from `"USER"` to `"ADMIN"`.
5. Future admins can now be created by this first admin using `POST /api/admin/users/add-admin`.

## 📡 API Modules

| Module | Base Path | Auth |
|---|---|---|
| Auth | `/api/auth` | Public |
| Users | `/api/users` | Protected |
| Admin | `/api/admin` | Admin only |
| Services | `/api/servis` | Public |
| RentACar | `/api/rentacar` | Public |
| Travel | `/api/travel` | Public |
| Included Services | `/api/included-services` | Public |
| Hotel | `/api/hotel` | Public |
| Food | `/api/food` | Public |
| FlowBox | `/api/flowboxes` | Protected |
| Payment | `/api/payment` | Protected |
| Reviews | `/api/reviews` | Mixed |
| Wishlist | `/api/user/wishlist` | Protected |

## 🌐 Localization

The API supports three languages: **Azerbaijani (az)**, **English (en)**, **Russian (ru)**.

Set the `Accept-Language` header to receive localized responses:
```
Accept-Language: az
```

## 🧪 Testing

```bash
npm test
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).