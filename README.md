# Baltazar Backend API

Production-grade TypeScript + Express backend for the Baltazar multi-service platform.

The API covers authentication, user profiles (personal info, driver license, passport), admin tools, hotels, rent-a-car, travel, food, step-based order booking, tokenized payments, verified reviews, wishlist, home banners, explore personalization, and mobile app version config.

---

## Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js ESM |
| Language | TypeScript |
| Framework | Express 5 |
| Database | Firebase Firestore |
| File Storage | Firebase Storage (image uploads) |
| Auth | JWT access tokens, JWT refresh tokens, Google OAuth |
| Validation | Zod + zod-to-openapi |
| Uploads | Multer (memory storage, 5 MB limit) |
| Security | Helmet, CORS, HPP, express-rate-limit |
| Logging | Pino, pino-http |
| API Docs | Swagger UI, swagger-jsdoc |
| Background Jobs | node-cron (exchange-rate refresh) |
| Config | dotenv-flow |

---

## Project Structure

```text
src/server.ts             Server entry point, cron scheduling, graceful shutdown
src/app.ts                Express app, middleware, route mounting
src/config/               Env, Firebase (Firestore + Storage), logger, Swagger, locales, order screens
src/errors/               AppError
src/jobs/                 Cron jobs (exchange-rate refresh)
src/middlewares/          Auth, roles, validation, rate limits, uploads, errors
src/modules/              Domain modules (schema -> service -> controller -> routes)
src/openapi/              OpenAPI assembly
src/types/                Express type augmentation
src/utils/                Tokens, passwords, localization, currency, image upload, async wrapper
scripts/generateSwagger.ts  Static OpenAPI JSON build (npm run docs:build)
```

Most modules follow this pattern:

```text
schema.ts -> service.ts -> controller.ts -> routes.ts
```

### Firestore Data Model

| Collection | Key fields |
|---|---|
| `users` | name, email, passwordHash, role (`USER`/`ADMIN`), phone, region, language, wishlist, personalInfo, driverLicense, passport, profileCompleteness |
| `companies` | Shared by rent-a-car / travel / food companies, distinguished by `serviceType`; name, about, profileImage, bannerImage, images, sectionsOrder, rating, reviewCount, status |
| `cars` | companyId, brand, model, year, category, transmission, fuelType, seats, price, images, features, rating, reviewCount, status |
| `travels` | Tours: companyId, categories, title, roadmap, images, duration, startDate, endDate, includedServices, price, rating, reviewCount, status |
| `hotels` | name, about, city, address, starRating, amenities, images, logo, sectionsOrder, price, rating, reviewCount, status |
| `rooms` | hotelId, roomType, name, description, price, capacity, amenities, images, status |
| `foodItems` | companyId, name, description, category, price, images, ingredients, status, calories, protein, fat, carb |
| `includedServices` | name, icon, serviceType (`TRAVEL`/`HOTEL`) |
| `orders` | userId, serviceType, serviceId, status, currentStep, details, createdAt, expiresAt |
| `paymentMethods` | userId, paymentMethodId, brand, last4, cardholderName |
| `transactions` | orderId, userId, amount, status (`SUCCESS`/`FAILED`/`PENDING`) |
| `reviews` | userId, targetType, targetId, rating, comment, createdAt |
| `banners` | image, link, order, isActive |
| `appConfig` | latestVersion, minSupportedVersion, updateNotes |
| `exchangeRates` | currency, rateToUsd, updatedAt (refreshed by cron) |
| `userInterests` | Per-user explore personalization counters |

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

Prices are stored in USD and converted for display by region using cached
exchange rates (`exchangeRates` collection, refreshed every 6 hours by cron).
Region `AZ` displays AZN; all other regions display USD.

The health endpoint is the only route that does not use the `success/data` envelope.

---

## Auth

Login and register endpoints are rate-limited (`authLimiter`).

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
- `role` is never accepted — every registration is hardcoded to `USER`

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

Response data: same shape as register.

### `POST /api/auth/refresh`

Access: public

Status: `200 OK`

Request body:

```json
{
  "refreshToken": "jwt"
}
```

Response data: same shape as register.

### `POST /api/auth/google`

Access: public

Status: `200 OK`

Request body:

```json
{
  "idToken": "google-id-token"
}
```

Response data: same shape as register.

---

## Users

### `GET /api/users/me`

Access: authenticated

Status: `200 OK`

Request body: none

Response data:

```json
{
  "id": "user_id",
  "name": "Aydin Aliyev",
  "email": "aydin@example.com",
  "role": "USER",
  "phone": "+994501112233",
  "region": "AZ",
  "language": "en",
  "wishlist": [],
  "profileCompleteness": {
    "personalInfo": true,
    "driverLicense": false,
    "passport": false
  },
  "createdAt": "2026-07-01T00:00:00.000Z"
}
```

### `PUT /api/users/me`

Access: authenticated

Status: `200 OK`

Request body:

```json
{
  "name": "Aydin Aliyev",
  "phone": "+994501112233",
  "region": "AZ",
  "language": "en",
  "personalInfo": {
    "dateOfBirth": "1995-04-12",
    "address": "Baku, Azerbaijan",
    "idNumber": "AZE12345678"
  },
  "driverLicense": {
    "licenseNumber": "B-123456",
    "expiryDate": "2030-01-01"
  },
  "passport": {
    "passportNumber": "C1234567",
    "expiryDate": "2032-01-01"
  }
}
```

Rules: all fields are optional. `personalInfo`, `driverLicense`, and `passport`
are used by the booking flow and automatically update the matching
`profileCompleteness` flags (`personalInfo` requires all three sub-fields).
Returns `400 NO_FIELDS_TO_UPDATE` when the body is empty.

Response data: updated user profile (same shape as `GET /api/users/me`).

### `PUT /api/users/:id/disable`

Access: admin

Status: `200 OK`

Request body: none

Revokes all sessions for a user (disable/ban). The refresh token is revoked
immediately; any still-valid access token (up to 15 min) keeps working until
natural expiry.

---

## Wishlist

### `GET /api/user/wishlist`

Access: authenticated

Status: `200 OK`

Request body: none

Response data: localized wishlist array with full service details.

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
- Adding the same service twice returns `409`

Response data: wishlist add result.

### `DELETE /api/user/wishlist/:id`

Access: authenticated

Status: `200 OK`

Path params:

- `id`: wishlist item ID in the format `serviceType_serviceId`

Request body: none

Response data:

```json
{
  "itemId": "wishlist_item_id",
  "removed": true
}
```

---

## Home

### `GET /api/home/banner`

Access: public

Status: `200 OK`

Request body: none

Response data: active banner slides, ordered by `order`.

### `POST /api/home/banner`

Access: admin

Status: `201 Created`

Content-Type: `multipart/form-data`

Form fields:

- `image`: image file (max 5 MB, uploaded to Firebase Storage `banners/` folder)
- `link`: string, required
- `order`: number, required
- `isActive`: optional boolean, defaults to `true`

Response data: created banner object with the public Storage URL.

### `PUT /api/home/banner/:id`

Access: admin

Status: `200 OK`

Content-Type: `multipart/form-data`

Form fields: same as create. A new `image` file replaces the stored image;
otherwise the existing URL is kept.

Response data: updated banner object.

### `DELETE /api/home/banner/:id`

Access: admin

Status: `200 OK`

Request body: none

Response data: banner deleted confirmation.

### `GET /api/home/explore`

Access: public (optionally authenticated for personalization)

Status: `200 OK`

Request body: none

Response data: personalized explore rows. Authenticated views are tracked in
`userInterests` and influence future personalization.

---

## App Config

### `GET /api/app/config`

Access: public

Status: `200 OK`

Request body: none

Response data: current mobile app version configuration.

### `PUT /api/app/config`

Access: admin

Status: `200 OK`

Request body:

```json
{
  "latestVersion": "1.4.0",
  "minSupportedVersion": "1.2.0",
  "updateNotes": {
    "az": "Yeniliklər",
    "en": "What's new",
    "ru": "Что нового"
  }
}
```

Rules:

- `latestVersion`, `minSupportedVersion`: required non-empty strings
- `updateNotes`: optional `{ az, en, ru }` map

Response data: updated app configuration.

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
  "name": { "az": "Hotel", "en": "Hotel", "ru": "Hotel" },
  "about": { "az": "About hotel", "en": "About hotel", "ru": "About hotel" },
  "city": "Baku",
  "address": "Center street",
  "starRating": 5,
  "amenities": ["wifi", "pool"],
  "images": ["https://example.com/hotel.jpg"],
  "logo": "https://example.com/logo.jpg",
  "sectionsOrder": ["about", "rooms", "reviews"],
  "price": 120,
  "status": "ACTIVE"
}
```

Rules:

- Required fields: `name`, `city`, `starRating`, `price`
- `starRating`: integer 1-5
- `price`: number 0-50000 (USD base)
- `status`: `ACTIVE` or `INACTIVE`, defaults to `ACTIVE`
- `rating` and `reviewCount` default to `0`

Response data: created hotel object.

### `PUT /api/services/hotel/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/hotel` body.

Response data: updated hotel object.

### `DELETE /api/services/hotel/:id`

Access: admin

Status: `200 OK`

Returns `409` when the hotel has active bookings.

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
  "name": { "az": "Room", "en": "Room", "ru": "Room" },
  "description": { "az": "Room description", "en": "Room description", "ru": "Room description" },
  "price": 150,
  "capacity": 2,
  "amenities": ["wifi"],
  "images": ["https://example.com/room.jpg"],
  "status": "AVAILABLE"
}
```

Rules:

- Required fields: `hotelId`, `roomType`, `name`, `price`, `capacity`
- `capacity`: integer, minimum 1
- `status`: `AVAILABLE` or `UNAVAILABLE`, defaults to `AVAILABLE`

Response data: created room object.

### `PUT /api/services/hotel/rooms/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/hotel/rooms` body.

Response data: updated room object.

### `DELETE /api/services/hotel/rooms/:id`

Access: admin

Status: `200 OK`

Returns `409` when the room has active bookings.

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

Response data: car DTO array (id, brand, model, price, image, rating).

### `GET /api/services/rentacar/cars/:id`

Access: public

Status: `200 OK`

Request body: none

Response data: full localized car object.

### `POST /api/services/rentacar/companies`

Access: admin

Status: `201 Created`

Request body:

```json
{
  "name": { "az": "Company", "en": "Company", "ru": "Company" },
  "about": { "az": "About company", "en": "About company", "ru": "About company" },
  "profileImage": "https://example.com/profile.jpg",
  "bannerImage": "https://example.com/banner.jpg",
  "images": ["https://example.com/company.jpg"],
  "sectionsOrder": ["about", "cars", "reviews"],
  "status": "ACTIVE"
}
```

Rules:

- Required fields: `name`
- `profileImage`, `bannerImage`: optional URL strings
- `serviceType` is fixed to `RENT_A_CAR`
- `status`: `ACTIVE` or `INACTIVE`, defaults to `ACTIVE`

Response data: created company object.

### `PUT /api/services/rentacar/companies/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/rentacar/companies` body.

Response data: updated company object.

### `DELETE /api/services/rentacar/companies/:id`

Access: admin

Status: `200 OK`

Returns `409` when the company has active bookings.

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
  "year": 2024,
  "category": "Sedan",
  "transmission": "AUTOMATIC",
  "fuelType": "HYBRID",
  "seats": 5,
  "price": 90,
  "images": ["https://example.com/car.jpg"],
  "features": ["bluetooth"],
  "status": "AVAILABLE"
}
```

Rules:

- Required fields: `companyId`, `brand`, `model`, `year`, `category`, `transmission`, `fuelType`, `seats`, `price`, `images`
- `year`: integer, 1990 to current year + 1
- `seats`: integer 1-50
- `images`: at least one image URL
- `status`: `AVAILABLE` or `UNAVAILABLE`, defaults to `AVAILABLE`

Response data: created car object.

### `PUT /api/services/rentacar/cars/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/rentacar/cars` body.

Response data: updated car object.

### `DELETE /api/services/rentacar/cars/:id`

Access: admin

Status: `200 OK`

Returns `409` when the car has active bookings.

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
  "name": { "az": "Restaurant", "en": "Restaurant", "ru": "Restaurant" },
  "about": { "az": "About restaurant", "en": "About restaurant", "ru": "About restaurant" },
  "logo": "https://example.com/logo.jpg",
  "images": ["https://example.com/restaurant.jpg"],
  "cuisineTypes": ["local"],
  "address": "Center street",
  "status": "ACTIVE"
}
```

Rules:

- Required fields: `name`
- `serviceType` is fixed to `FOOD`
- `status`: `ACTIVE` or `INACTIVE`, defaults to `ACTIVE`

Response data: created company object.

### `PUT /api/services/food/companies/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/food/companies` body.

Response data: updated company object.

### `DELETE /api/services/food/companies/:id`

Access: admin

Status: `200 OK`

Returns `409` when the company has active bookings.

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
  "name": { "az": "Burger", "en": "Burger", "ru": "Burger" },
  "description": { "az": "Food description", "en": "Food description", "ru": "Food description" },
  "category": "Main",
  "price": 12,
  "images": ["https://example.com/food.jpg"],
  "ingredients": ["bread"],
  "status": "AVAILABLE",
  "calories": 650,
  "protein": 30,
  "fat": 25,
  "carb": 70
}
```

Rules:

- Required fields: `companyId`, `name`, `category`, `price`
- `status`: `AVAILABLE` or `OUT_OF_STOCK`, defaults to `AVAILABLE`
- `calories`, `protein`, `fat`, `carb`: optional nutrition numbers

Response data: created food item object.

### `PUT /api/services/food/items/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/food/items` body.

Response data: updated food item object.

### `DELETE /api/services/food/items/:id`

Access: admin

Status: `200 OK`

Returns `409` when the item has active bookings.

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
  "name": { "az": "Travel company", "en": "Travel company", "ru": "Travel company" },
  "about": { "az": "About company", "en": "About company", "ru": "About company" },
  "profileImage": "https://example.com/profile.jpg",
  "bannerImage": "https://example.com/banner.jpg",
  "images": ["https://example.com/company.jpg"],
  "sectionsOrder": ["about", "tours", "reviews"],
  "status": "ACTIVE"
}
```

Rules:

- Required fields: `name`
- `profileImage`, `bannerImage`: optional URL strings
- `serviceType` is fixed to `TRAVEL`
- `status`: `ACTIVE` or `INACTIVE`, defaults to `ACTIVE`

Response data: created company object.

### `PUT /api/services/travel/companies/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/travel/companies` body.

Response data: updated company object.

### `DELETE /api/services/travel/companies/:id`

Access: admin

Status: `200 OK`

Returns `409` when the company has active bookings.

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
  "title": { "az": "Tour", "en": "Tour", "ru": "Tour" },
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
  "status": "ACTIVE"
}
```

Rules:

- Required fields: `companyId`, `categories`, `title`, `images`, `duration`, `startDate`, `endDate`, `price`
- `categories` and `images`: at least one entry each
- `status`: `ACTIVE`, `INACTIVE`, or `SOLD_OUT`, defaults to `ACTIVE`

Response data: created tour object.

### `PUT /api/services/travel/tours/:id`

Access: admin

Status: `200 OK`

Request body: partial `POST /api/services/travel/tours` body.

Response data: updated tour object.

### `DELETE /api/services/travel/tours/:id`

Access: admin

Status: `200 OK`

Returns `409` when the tour has active bookings.

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
  "name": { "az": "Breakfast", "en": "Breakfast", "ru": "Breakfast" },
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

Orders are step-based booking flows. Each service type has a hardcoded screen
sequence; screens already satisfied by the user's `profileCompleteness`
(personal info, driver license, passport) are skipped automatically. Unpaid
orders expire after 24 hours (`expiresAt`) and become `EXPIRED` when touched.

Screen sequences (`src/config/orderScreens.ts`):

| Service type | Screens |
|---|---|
| `RENT_A_CAR` | PERSONAL_INFO → DRIVER_LICENSE → ADDRESS → PAYMENT → CONFIRM |
| `TRAVEL` | PERSONAL_INFO → PASSPORT_INFO → PAYMENT → CONFIRM |
| `HOTEL_ROOM` | PERSONAL_INFO → PAYMENT → CONFIRM |
| `FOOD` | PERSONAL_INFO → DELIVERY_ADDRESS → PAYMENT → CONFIRM |

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

- `serviceType`: `RENT_A_CAR`, `TRAVEL`, `HOTEL_ROOM`, or `FOOD`
- `HOTEL_ROOM` targets a room document; other types target their own collections
- For `RENT_A_CAR` and `TRAVEL`, the service's `companyId` is copied into `details`

Response data: created order with `status: "PENDING"`, `currentStep: 0`,
`expiresAt` (24 hours), and the first required screen.

### `GET /api/orders`

Access: authenticated

Status: `200 OK`

Request body: none

Response data: order array for the authenticated user.

### `GET /api/orders/:id`

Access: authenticated

Status: `200 OK`

Request body: none

Response data: order object.

### `PUT /api/orders/:id/step`

Access: authenticated

Status: `200 OK`

Request body:

```json
{
  "screen": "PERSONAL_INFO_SCREEN",
  "data": {
    "dateOfBirth": "1995-04-12"
  }
}
```

Rules:

- `screen`: one of the `OrderScreenKey` values for the order's service type
- `data`: free-form object stored under the screen key in `details`
- Expired orders return `400 ORDER_EXPIRED`

Response data:

```json
{
  "orderId": "order_id",
  "status": "PENDING",
  "nextStep": { "screen": "PAYMENT_SCREEN" }
}
```

`nextStep` is `"DONE"` when the flow is complete.

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

### `GET /api/orders/:id/payment-summary`

Access: authenticated

Status: `200 OK`

Request body: none

Response data: payment summary for the order, including transaction history.

### `PUT /api/orders/:id/status`

Access: admin

Status: `200 OK`

Request body:

```json
{
  "status": "CONFIRMED"
}
```

Rules:

- `status`: `PENDING`, `AWAITING_PAYMENT`, `PROCESSING`, `CONFIRMED`, `CANCELLED`, or `EXPIRED`

Response data:

```json
{
  "id": "order_id",
  "status": "CONFIRMED"
}
```

### `GET /api/order-screens/:serviceType`

Access: public

Status: `200 OK`

Path params:

- `serviceType`: `RENT_A_CAR`, `TRAVEL`, `HOTEL_ROOM`, or `FOOD`

Request body: none

Response data:

```json
{
  "screens": ["PERSONAL_INFO_SCREEN", "PASSPORT_INFO_SCREEN", "PAYMENT_SCREEN", "CONFIRM_SCREEN"]
}
```

---

## Payment

Cards are tokenized through an external payment gateway simulator — only
`paymentMethodId`, `brand`, and `last4` are stored. Card and pay endpoints are
rate-limited (`paymentLimiter`).

### `GET /api/payment/all-cards`

Access: authenticated

Status: `200 OK`

Request body: none

Response data: saved payment methods for the authenticated user (last4 and
brand only).

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

Response data:

```json
{
  "id": "doc_id",
  "paymentMethodId": "gateway_payment_method_id",
  "brand": "VISA",
  "last4": "8311"
}
```

### `POST /api/payment/pay/:orderId`

Access: authenticated

Status: `200 OK`

Path params:

- `orderId`: order to pay for

Request body:

```json
{
  "paymentMethodId": "payment_method_id"
}
```

Rules:

- The order must belong to the authenticated user
- Returns `409 PAYMENT_IN_PROGRESS` when the order is already `PROCESSING`
- Returns `400 ORDER_ALREADY_PAID` when the order is `CONFIRMED`
- `CANCELLED` and `EXPIRED` orders cannot be paid
- The order is atomically set to `PROCESSING` before the gateway charge, then
  to `CONFIRMED` on success

Response data: payment result with the recorded transaction.

---

## Reviews

Reviews are verified: creating one requires at least one `CONFIRMED` order for
the target. For `COMPANY` targets the order must reference the company through
`details.companyId`; for all other targets the order's `serviceId` must match
`targetId`. Ineligible attempts return `403 REVIEW_NOT_ELIGIBLE`.

### `GET /api/reviews`

Access: public (admin may fetch all)

Status: `200 OK`

Query params:

- `targetType`: optional `RENT_A_CAR`, `TRAVEL`, `HOTEL`, `FOOD`, or `COMPANY`
- `targetId`: optional string

Rules: non-admin requests must supply both `targetType` and `targetId`;
admins may omit both to list every review.

Request body: none

Response data: review array, newest first.

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

- `targetType`: `RENT_A_CAR`, `TRAVEL`, `HOTEL`, `FOOD`, or `COMPANY`
- `rating`: integer 1-5
- `comment`: string, 1-2000 chars
- Requires a confirmed order for the target (see above)

Response data: created review object.

### `GET /api/reviews/:id`

Access: public

Status: `200 OK`

Request body: none

Response data: review object.

### `PUT /api/reviews/:id`

Access: authenticated (review owner)

Status: `200 OK`

Request body:

```json
{
  "rating": 4,
  "comment": "Updated comment"
}
```

Rules: both fields optional, but at least one must be present. Only the review
owner can update.

Response data: updated review object.

### `DELETE /api/reviews/:id`

Access: authenticated (review owner or admin)

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

### `GET /api/admin/transactions`

Status: `200 OK`

Query params:

- `status`: optional `SUCCESS`, `FAILED`, or `PENDING`
- `userId`: optional string

Request body: none

Response data: transaction array.

Admin capabilities exposed on other routers:

- `PUT /api/orders/:id/status` — update any order's status
- `PUT /api/users/:id/disable` — revoke all sessions for a user
- `GET /api/reviews` without filters — list every review (admin role)
- `DELETE /api/reviews/:id` — delete any review (admin role)
- Banner, app config, and service CRUD endpoints documented above

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

## Image Uploads

Multipart uploads are handled by Multer in memory with a 5 MB per-file limit.
Files are written to Firebase Storage under a folder per domain (for example
`banners/`), with UUID-prefixed sanitized filenames, and served as public URLs:

```text
https://storage.googleapis.com/<FIREBASE_STORAGE_BUCKET>/banners/<uuid>-<filename>
```

Currently banner create/update endpoints accept file uploads. Other image
fields across the API accept plain URL strings.

---

## Background Jobs

| Job | Schedule | Purpose |
|---|---|---|
| `refreshExchangeRates` | Every 6 hours (`0 */6 * * *`) | Fetches the latest USD→AZN rate and stores it in `exchangeRates` for region-based price display |

---

## API Docs

When the server is running:

- Swagger UI: `http://localhost:3000/api-docs`
- Raw JSON spec: `http://localhost:3000/api-docs.json`

Swagger is generated from route annotations in `src/modules/**/*.routes.ts`
combined with Zod schemas via `@asteasolutions/zod-to-openapi`. To emit a
static spec (used in production from `dist/openapi.json`):

```bash
npm run docs:build
```

---

## Environment Variables

Copy `.env.example` to `.env.development` or your local `.env` file and fill in the values.

| Variable | Description |
|---|---|
| `NODE_ENV` | `development` or `production` |
| `PORT` | HTTP port, default `3000` (do not set in production — the platform injects it) |
| `LOG_LEVEL` | Pino log level |
| `JWT_ACCESS_SECRET` | Secret for access tokens, minimum 32 chars |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens, minimum 32 chars |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key |
| `FIREBASE_STORAGE_BUCKET` | Firebase Storage bucket for image uploads |
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

Run tests:

```bash
npm test
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
- Rent-a-car, travel, and food companies share the `companies` Firestore
  collection and are distinguished by their `serviceType` field.
