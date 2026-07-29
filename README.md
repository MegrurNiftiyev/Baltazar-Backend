# Baltazar Backend API

Production-grade TypeScript + Express backend for the Baltazar multi-service platform.

The API covers authentication, users, admin tools, services, rent-a-car, travel, hotel, food, Order booking, payments, reviews, wishlists, and included service definitions.

---

## Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js ESM |
| Language | TypeScript |
| Framework | Express |
| Database | Firebase Firestore |
| Auth | JWT access tokens, JWT refresh tokens, Google OAuth |
| Validation | Zod |
| Security | Helmet, CORS, HPP, express-rate-limit |
| Logging | Pino, pino-http |
| API Docs | Swagger UI, swagger-jsdoc |
| Config | dotenv-flow |

---

## Project Structure

```text
server.ts                 Server entry point
src/app.ts                Express app, middleware, route mounting
src/config/               Env, Firebase, logger, Swagger, locales
src/errors/               AppError
src/middlewares/          Auth, roles, validation, rate limits, errors
src/modules/              Domain modules
src/types/                Express type augmentation
src/utils/                Tokens, passwords, localization, async wrapper
```

Most modules follow this pattern:

```text
schema.ts -> service.ts -> controller.ts -> routes.ts
```

---

## Response Format

All successful controller responses currently use this envelope:

```json
{
  "success": true,
  "data": {}
}
```

Operational errors use this envelope:

```json
{
  "success": false,
  "errorCode": "VALIDATION_ERROR",
  "message": "Something went wrong"
}
```

Localized fields are stored as `{ az, en, ru }` maps but API responses always
return one resolved string. Authenticated requests use the language stored on
the user profile. Public requests use a valid `?lang=az|en|ru` query parameter,
then `Accept-Language`, then English. Error `message` values follow the same
resolution order; `errorCode` remains stable for client-side handling.

The health endpoint is the only route that does not use the `success/data` envelope.

---

## Auth

### `POST /api/auth/register`

Access: public

Status: `201 Created`

Request body:

```json
{
  "name": "Aydin Aliyev",
  "email": "aydin@example.com",
  "password": "secure-password",
  "phone": "+994501112233",
  "region": "AZ",
  "language": "en"
}
```

Rules:

- `name`: string, 2-100 chars
- `email`: valid email
- `password`: string, 8-128 chars
- `phone`: optional string, 7-20 chars
- `region`: optional string, 1-10 chars
- `language`: optional `az`, `en`, or `ru`, defaults to `en`

Response data:

```json
{
  "user": {
    "id": "user_id",
    "name": "Aydin Aliyev",
    "email": "aydin@example.com",
    "role": "USER"
  },
  "accessToken": "jwt",
  "refreshToken": "jwt"
}
```

### `POST /api/auth/login`

Access: public

Status: `200 OK`

Request body:

```json
{
  "email": "aydin@example.com",
  "password": "secure-password"
}
```

Response data:

```json
{
  "user": {
    "id": "user_id",
    "name": "Aydin Aliyev",
    "email": "aydin@example.com",
    "role": "USER"
  },
  "accessToken": "jwt",
  "refreshToken": "jwt"
}
```

### `POST /api/auth/refresh`

Access: public

Status: `200 OK`

Request body:

```json
{
  "refreshToken": "jwt"
}
```

Response data:

```json
{
  "user": {
    "id": "user_id",
    "name": "Aydin Aliyev",
    "email": "aydin@example.com",
    "role": "USER"
  },
  "accessToken": "jwt",
  "refreshToken": "jwt"
}
```

### `POST /api/auth/google`

Access: public

Status: `200 OK`

Request body:

```json
{
  "idToken": "google-id-token"
}
```

Response data:

```json
{
  "user": {
    "id": "user_id",
    "name": "Aydin Aliyev",
    "email": "aydin@example.com",
    "role": "USER"
  },
  "accessToken": "jwt",
  "refreshToken": "jwt"
}
```

---

## Users

### `GET /api/users/me`

Access: authenticated

Status: `200 OK`

Request body: none

Response data: authenticated user profile.

### `PUT /api/users/me`

Access: authenticated

Status: `200 OK`

Request body:

```json
{
  "name": "Aydin Aliyev",
  "phone": "+994501112233",
  "region": "AZ",
  "language": "en"
}
```

Rules: all fields are optional.

Response data: updated user profile.

---

## Wishlist

### `GET /api/user/wishlist`

Access: authenticated

Status: `200 OK`

Request body: none

Response data: localized wishlist array.

### `POST /api/user/wishlist`

Access: authenticated

Status: `201 Created`

Request body:

```json
{
  "serviceId": "service_id",
  "serviceType": "TRAVEL"
}
```

Rules:

- `serviceType`: `RENT_A_CAR`, `TRAVEL`, `HOTEL`, or `FOOD`

Response data: wishlist add result.

### `DELETE /api/user/wishlist/:id`

Access: authenticated

Status: `200 OK`

Request body: none

Response data:

```json
{
  "itemId": "wishlist_item_id",
  "removed": true
}
```

---

## Services

### `GET /api/services`

Access: public

Status: `200 OK`

Request body: none

Response data: localized service array.

### `GET /api/services/:id`

Access: public

Status: `200 OK`

Request body: none

Response data: localized service object.

### `POST /api/services`

Access: admin

Status: `201 Created`

Request body:

```json
{
  "key": "airport_transfer",
  "name": {
    "az": "Airport transfer",
    "en": "Airport transfer",
    "ru": "Airport transfer"
  },
  "icon": "car",
  "order": 1
}
```

Response data: created service object.

### `PUT /api/services/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services` body.

Response data: updated service object.

### `DELETE /api/services/:id`

Access: admin

Status: `200 OK`

Request body: none

Response data:

```json
{
  "id": "service_id",
  "deleted": true
}
```

---

## Hotel

### `GET /api/services/hotel`

Access: public

Status: `200 OK`

Query params:

- `minPrice`: optional number
- `maxPrice`: optional number
- `starRating`: optional integer 1-5
- `city`: optional string
- `minRating`: optional number 0-5
- `name`: optional string

Request body: none

Response data: localized hotel array.

### `GET /api/services/hotel/:id`

Access: public

Status: `200 OK`

Request body: none

Response data: localized hotel object.

### `GET /api/services/hotel/:id/rooms`

Access: public

Status: `200 OK`

Query params:

- `roomType`: optional string

Request body: none

Response data: localized room array.

### `POST /api/services/hotel`

Access: admin

Status: `201 Created`

Request body:

```json
{
  "name": {
    "az": "Hotel",
    "en": "Hotel",
    "ru": "Hotel"
  },
  "about": {
    "az": "About hotel",
    "en": "About hotel",
    "ru": "About hotel"
  },
  "city": "Baku",
  "address": "Center street",
  "starRating": 5,
  "amenities": ["wifi", "pool"],
  "images": ["https://example.com/hotel.jpg"],
  "logo": "https://example.com/logo.jpg",
  "price": 120,
  "rating": 0,
  "reviewCount": 0,
  "status": "ACTIVE"
}
```

Required fields: `name`, `city`, `starRating`, `price`.

Response data: created hotel object.

### `PUT /api/services/hotel/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/hotel` body.

Response data: updated hotel object.

### `DELETE /api/services/hotel/:id`

Access: admin

Status: `200 OK`

Request body: none

Response data:

```json
{
  "id": "hotel_id",
  "deleted": true
}
```

### `POST /api/services/hotel/rooms`

Access: admin

Status: `201 Created`

Request body:

```json
{
  "hotelId": "hotel_id",
  "roomType": "DELUXE",
  "name": {
    "az": "Room",
    "en": "Room",
    "ru": "Room"
  },
  "description": {
    "az": "Room description",
    "en": "Room description",
    "ru": "Room description"
  },
  "price": 150,
  "capacity": 2,
  "amenities": ["wifi"],
  "images": ["https://example.com/room.jpg"],
  "status": "AVAILABLE"
}
```

Required fields: `hotelId`, `roomType`, `name`, `price`, `capacity`.

Response data: created room object.

### `PUT /api/services/hotel/rooms/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/hotel/rooms` body.

Response data: updated room object.

### `DELETE /api/services/hotel/rooms/:id`

Access: admin

Status: `200 OK`

Request body: none

Response data:

```json
{
  "id": "room_id",
  "deleted": true
}
```

---

## Rent A Car

### `GET /api/services/rentacar/companies`

Access: public

Status: `200 OK`

Request body: none

Response data: localized rent-a-car company array.

### `GET /api/services/rentacar/companies/:id`

Access: public

Status: `200 OK`

Request body: none

Response data: localized rent-a-car company object.

### `GET /api/services/rentacar/cars`

Access: public

Status: `200 OK`

Query params:

- `companyId`: optional string
- `minPrice`: optional number
- `maxPrice`: optional number
- `brand`: optional string
- `model`: optional string
- `category`: optional string
- `transmission`: optional `AUTOMATIC` or `MANUAL`
- `fuelType`: optional `PETROL`, `DIESEL`, `ELECTRIC`, or `HYBRID`

Request body: none

Response data: car array.

### `GET /api/services/rentacar/cars/:id`

Access: public

Status: `200 OK`

Request body: none

Response data: localized car object.

### `POST /api/services/rentacar/companies`

Access: admin

Status: `201 Created`

Request body:

```json
{
  "name": {
    "az": "Company",
    "en": "Company",
    "ru": "Company"
  },
  "about": {
    "az": "About company",
    "en": "About company",
    "ru": "About company"
  },
  "serviceType": "RENT_A_CAR",
  "logo": "https://example.com/logo.jpg",
  "images": ["https://example.com/company.jpg"],
  "rating": 0,
  "reviewCount": 0,
  "status": "ACTIVE"
}
```

Required fields: `name`.

Response data: created company object.

### `PUT /api/services/rentacar/companies/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/rentacar/companies` body.

Response data: updated company object.

### `DELETE /api/services/rentacar/companies/:id`

Access: admin

Status: `200 OK`

Request body: none

Response data:

```json
{
  "id": "company_id",
  "deleted": true
}
```

### `POST /api/services/rentacar/cars`

Access: admin

Status: `201 Created`

Request body:

```json
{
  "companyId": "company_id",
  "brand": "Toyota",
  "model": "Camry",
  "category": "Sedan",
  "transmission": "AUTOMATIC",
  "fuelType": "HYBRID",
  "seats": 5,
  "price": 90,
  "images": ["https://example.com/car.jpg"],
  "features": ["bluetooth"],
  "rating": 0,
  "reviewCount": 0,
  "status": "AVAILABLE"
}
```

Required fields: `companyId`, `brand`, `model`, `category`, `transmission`, `fuelType`, `seats`, `price`, `images`.

Response data: created car object.

### `PUT /api/services/rentacar/cars/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/rentacar/cars` body.

Response data: updated car object.

### `DELETE /api/services/rentacar/cars/:id`

Access: admin

Status: `200 OK`

Request body: none

Response data:

```json
{
  "id": "car_id",
  "deleted": true
}
```

---

## Food

### `GET /api/services/food/companies`

Access: public

Status: `200 OK`

Request body: none

Response data: localized food company array.

### `GET /api/services/food/companies/:id`

Access: public

Status: `200 OK`

Request body: none

Response data: localized food company object.

### `GET /api/services/food/items`

Access: public

Status: `200 OK`

Query params:

- `companyId`: optional string
- `category`: optional string
- `minPrice`: optional number
- `maxPrice`: optional number
- `name`: optional string

Request body: none

Response data: localized food item array.

### `GET /api/services/food/items/:id`

Access: public

Status: `200 OK`

Request body: none

Response data: localized food item object.

### `POST /api/services/food/companies`

Access: admin

Status: `201 Created`

Request body:

```json
{
  "name": {
    "az": "Restaurant",
    "en": "Restaurant",
    "ru": "Restaurant"
  },
  "about": {
    "az": "About restaurant",
    "en": "About restaurant",
    "ru": "About restaurant"
  },
  "serviceType": "FOOD",
  "logo": "https://example.com/logo.jpg",
  "images": ["https://example.com/restaurant.jpg"],
  "cuisineTypes": ["local"],
  "address": "Center street",
  "rating": 0,
  "reviewCount": 0,
  "status": "ACTIVE"
}
```

Required fields: `name`.

Response data: created company object.

### `PUT /api/services/food/companies/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/food/companies` body.

Response data: updated company object.

### `DELETE /api/services/food/companies/:id`

Access: admin

Status: `200 OK`

Request body: none

Response data:

```json
{
  "id": "company_id",
  "deleted": true
}
```

### `POST /api/services/food/items`

Access: admin

Status: `201 Created`

Request body:

```json
{
  "companyId": "company_id",
  "name": {
    "az": "Burger",
    "en": "Burger",
    "ru": "Burger"
  },
  "description": {
    "az": "Food description",
    "en": "Food description",
    "ru": "Food description"
  },
  "category": "Main",
  "price": 12,
  "images": ["https://example.com/food.jpg"],
  "ingredients": ["bread"],
  "isAvailable": true
}
```

Required fields: `companyId`, `name`, `category`, `price`.

Response data: created food item object.

### `PUT /api/services/food/items/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/food/items` body.

Response data: updated food item object.

### `DELETE /api/services/food/items/:id`

Access: admin

Status: `200 OK`

Request body: none

Response data:

```json
{
  "id": "item_id",
  "deleted": true
}
```

---

## Travel

### `GET /api/services/travel/companies`

Access: public

Status: `200 OK`

Request body: none

Response data: localized travel company array.

### `GET /api/services/travel/companies/:id`

Access: public

Status: `200 OK`

Request body: none

Response data: localized travel company object.

### `GET /api/services/travel/tours`

Access: public

Status: `200 OK`

Query params:

- `companyId`: optional string
- `category`: optional string
- `minRating`: optional number
- `startDate`: optional string
- `endDate`: optional string
- `name`: optional string

Request body: none

Response data: localized tour array.

### `GET /api/services/travel/tours/:id`

Access: public

Status: `200 OK`

Request body: none

Response data: localized tour object.

### `POST /api/services/travel/companies`

Access: admin

Status: `201 Created`

Request body:

```json
{
  "name": {
    "az": "Travel company",
    "en": "Travel company",
    "ru": "Travel company"
  },
  "about": {
    "az": "About company",
    "en": "About company",
    "ru": "About company"
  },
  "serviceType": "TRAVEL",
  "logo": "https://example.com/logo.jpg",
  "images": ["https://example.com/company.jpg"],
  "rating": 0,
  "reviewCount": 0,
  "status": "ACTIVE"
}
```

Required fields: `name`.

Response data: created company object.

### `PUT /api/services/travel/companies/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/travel/companies` body.

Response data: updated company object.

### `DELETE /api/services/travel/companies/:id`

Access: admin

Status: `200 OK`

Request body: none

Response data:

```json
{
  "id": "company_id",
  "deleted": true
}
```

### `POST /api/services/travel/tours`

Access: admin

Status: `201 Created`

Request body:

```json
{
  "companyId": "company_id",
  "categories": ["Adventure"],
  "title": {
    "az": "Tour",
    "en": "Tour",
    "ru": "Tour"
  },
  "roadmap": [
    {
      "lat": 40.4093,
      "long": 49.8671,
      "order": 1
    }
  ],
  "images": ["https://example.com/tour.jpg"],
  "duration": "3 days",
  "startDate": "2026-08-01",
  "endDate": "2026-08-04",
  "includedServices": ["service_id"],
  "price": 250,
  "rating": 0,
  "reviewCount": 0,
  "status": "ACTIVE"
}
```

Required fields: `companyId`, `categories`, `title`, `images`, `duration`, `startDate`, `endDate`, `price`.

Response data: created tour object.

### `PUT /api/services/travel/tours/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/travel/tours` body.

Response data: updated tour object.

### `DELETE /api/services/travel/tours/:id`

Access: admin

Status: `200 OK`

Request body: none

Response data:

```json
{
  "id": "tour_id",
  "deleted": true
}
```

---

## Included Services

### `GET /api/services/included-services/:serviceType`

Access: public

Status: `200 OK`

Path params:

- `serviceType`: `TRAVEL` or `HOTEL`

Request body: none

Response data: localized included service array.

### `POST /api/services/included-services/:serviceType`

Access: admin

Status: `201 Created`

Path params:

- `serviceType`: `TRAVEL` or `HOTEL`

Request body:

```json
{
  "name": {
    "az": "Breakfast",
    "en": "Breakfast",
    "ru": "Breakfast"
  },
  "icon": "coffee",
  "serviceType": "HOTEL"
}
```

Required fields: `name`, `serviceType`.

Response data: created included service object.

### `PUT /api/services/included-services/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/included-services/:serviceType` body.

Rules: `name` remains a full `{ az, en, ru }` map when supplied.

Response data: updated included service object with localized fields resolved
to one string.

### `DELETE /api/services/included-services/:id`

Access: admin

Status: `200 OK`

Request body: none

Response data:

```json
{
  "id": "included_service_id",
  "deleted": true
}
```

---

## Order

### `POST /api/orders`

Access: authenticated

Status: `201 Created`

Request body:

```json
{
  "serviceType": "TRAVEL",
  "serviceId": "service_id"
}
```

Rules:

- `serviceType`: `RENT_A_CAR`, `TRAVEL`, `HOTEL`, or `FOOD`

Response data: created Order object.

### `GET /api/orders`

Access: authenticated

Status: `200 OK`

Request body: none

Response data: Order array for the authenticated user.

### `GET /api/orders/:id`

Access: authenticated

Status: `200 OK`

Request body: none

Response data: Order object.

### `PUT /api/orders/:id/step`

Access: authenticated

Status: `200 OK`

Request body:

```json
{
  "screen": "pickup-info",
  "data": {
    "pickupDate": "2026-08-01"
  }
}
```

Response data: updated Order step result.

### `PUT /api/orders/:id/cancel`

Access: authenticated

Status: `200 OK`

Request body: none

Response data:

```json
{
  "id": "order_id",
  "status": "CANCELLED"
}
```

### `GET /api/orders/flow-screens/:serviceType`

Access: admin

Status: `200 OK`

Path params:

- `serviceType`: `RENT_A_CAR`, `TRAVEL`, `HOTEL`, or `FOOD`

Request body: none

Response data: flow screen configuration.

### `PUT /api/orders/flow-screens/:serviceType`

Access: admin

Status: `200 OK`

Path params:

- `serviceType`: `RENT_A_CAR`, `TRAVEL`, `HOTEL`, or `FOOD`

Request body:

```json
{
  "screens": [
    {
      "screenId": "pickup-info",
      "title": {
        "az": "Selection",
        "en": "Selection",
        "ru": "Selection"
      },
      "fields": [
        {
          "name": "pickupDate",
          "type": "date",
          "required": true,
          "options": ["option-a"]
        }
      ],
      "order": 1
    }
  ]
}
```

Allowed field types: `text`, `number`, `date`, `select`, `multi-select`, `boolean`.

Response data: updated flow screen configuration.

---

## Payment

### `GET /api/payment/all-cards`

Access: authenticated

Status: `200 OK`

Request body: none

Response data: saved payment cards for the authenticated user.

### `POST /api/payment/add-card`

Access: authenticated

Status: `201 Created`

Request body:

```json
{
  "cardNumber": "4539974024498311",
  "expiryMonth": 11,
  "expiryYear": 2028,
  "cvv": "123",
  "cardholderName": "Aydin Aliyev"
}
```

Rules:

- `cardNumber`: string, 13-19 chars
- `expiryMonth`: integer 1-12
- `expiryYear`: integer, minimum 2024
- `cvv`: string, 3-4 chars
- `cardholderName`: non-empty string

Response data: added card summary.

### `POST /api/payment/pay`

Access: authenticated

Status: `200 OK`

Request body:

```json
{
  "orderId": "order_id",
  "paymentMethodId": "payment_method_id"
}
```

Response data: payment result.

### `GET /api/payment/:id/summary`

Access: authenticated

Status: `200 OK`

Request body: none

Response data: payment summary.

---

## Reviews

### `GET /api/reviews`

Access: public

Status: `200 OK`

Query params:

- `targetType`: required `RENT_A_CAR`, `TRAVEL`, `HOTEL`, or `FOOD`
- `targetId`: required string

Request body: none

Response data: review array for the target.

### `POST /api/reviews`

Access: authenticated

Status: `201 Created`

Request body:

```json
{
  "targetType": "HOTEL",
  "targetId": "hotel_id",
  "rating": 5,
  "comment": "Excellent stay"
}
```

Rules:

- `rating`: integer 1-5
- `comment`: string, 1-2000 chars

Response data: created review object.

---

## Admin

All admin routes require authentication and `ADMIN` role.

### `POST /api/admin/users/add-admin`

Status: `200 OK`

Request body:

```json
{
  "userId": "user_id"
}
```

Response data:

```json
{
  "userId": "user_id",
  "role": "ADMIN"
}
```

### `GET /api/admin/orders`

Status: `200 OK`

Query params:

- `status`: optional `PENDING`, `AWAITING_PAYMENT`, `CONFIRMED`, `CANCELLED`, or `EXPIRED`
- `userId`: optional string
- `serviceType`: optional string

Request body: none

Response data: Order array.

### `GET /api/admin/orders/:id`

Status: `200 OK`

Request body: none

Response data: Order object.

### `PUT /api/admin/orders/:id/status`

Status: `200 OK`

Request body:

```json
{
  "status": "CONFIRMED"
}
```

Response data:

```json
{
  "id": "order_id",
  "status": "CONFIRMED"
}
```

### `GET /api/admin/transactions`

Status: `200 OK`

Query params:

- `status`: optional `SUCCESS`, `FAILED`, or `PENDING`
- `userId`: optional string

Request body: none

Response data: transaction array.

### `GET /api/admin/reviews`

Status: `200 OK`

Request body: none

Response data: review array.

### `DELETE /api/admin/reviews/:id`

Status: `200 OK`

Request body: none

Response data:

```json
{
  "id": "review_id",
  "deleted": true
}
```

---

## Health

### `GET /health`

Access: public

Status: `200 OK`

Request body: none

Response:

```json
{
  "status": "ok",
  "timestamp": "2026-07-28T00:00:00.000Z"
}
```

---

## API Docs

When the server is running:

- Swagger UI: `http://localhost:3000/api-docs`
- Raw JSON spec: `http://localhost:3000/api-docs.json`

Swagger is generated from route annotations in `src/modules/**/*.routes.ts`.

---

## Environment Variables

Copy `.env.example` to `.env.development` or your local `.env` file and fill in the values.

| Variable | Description |
|---|---|
| `NODE_ENV` | `development` or `production` |
| `PORT` | HTTP port, default `3000` |
| `LOG_LEVEL` | Pino log level |
| `JWT_ACCESS_SECRET` | Secret for access tokens, minimum 32 chars |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens, minimum 32 chars |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key |
| `CORS_ORIGIN` | Comma-separated allowed origins |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `PAYMENT_GATEWAY_URL` | Payment gateway simulator URL |

---

## Setup

Install dependencies:

```bash
npm install
```

Create an env file:

```bash
cp .env.example .env.development
```

Run in development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start production build:

```bash
npm start
```

---

## Deployment

For Render or similar platforms:

```bash
Build Command: npm install && npm run build
Start Command: npm start
```

The intended compiled entry point is `dist/server.js`.

---

## Notes

- `dist/` is ignored by Git and should be generated during deployment.
- Runtime response envelopes were checked against the current controllers.
- Request body and query models were checked against the current Zod schemas.




