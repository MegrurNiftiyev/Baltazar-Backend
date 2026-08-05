# Baltazar Backend API

Production-grade TypeScript + Express backend for the Baltazar multi-service platform.

The API covers authentication, user profiles, admin tools, multi-domain companies (hotel, rent-a-car, travel, food), step-based order booking, tokenized payments, verified reviews, wishlist, home banners, explore personalization, dynamic enums, and mobile app version config.

- 📱 **Mobile App (Kotlin / Android)**: [Baltazar-Mobile](https://github.com/MegrurNiftiyev/Baltazar-Mobile)
- 💳 **Payment Simulator Gateway**: [Baltazar-Payment-Backend](https://github.com/MegrurNiftiyev/Baltazar-Payment-Backend)

## Tech Stack

<p>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Express.js" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img alt="Firebase" src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
</p>

## Packages

<p>
  <a href="https://www.npmjs.com/package/express"><img alt="express" src="https://img.shields.io/badge/express-v5.1.0-000000?style=for-the-badge&logo=express&logoColor=white"></a>
  <a href="https://www.npmjs.com/package/firebase-admin"><img alt="firebase-admin" src="https://img.shields.io/badge/firebase--admin-v13.4.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"></a>
  <a href="https://www.npmjs.com/package/jsonwebtoken"><img alt="jsonwebtoken" src="https://img.shields.io/badge/jsonwebtoken-v9.0.2-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"></a>
  <a href="https://www.npmjs.com/package/google-auth-library"><img alt="google-auth-library" src="https://img.shields.io/badge/google--auth--library-v9.15.1-4285F4?style=for-the-badge&logo=google&logoColor=white"></a>
  <a href="https://www.npmjs.com/package/zod"><img alt="zod" src="https://img.shields.io/badge/zod-v3.24.4-3068B7?style=for-the-badge&logo=npm&logoColor=white"></a>
  <a href="https://www.npmjs.com/package/multer"><img alt="multer" src="https://img.shields.io/badge/multer-v2.2.0-000000?style=for-the-badge&logo=npm&logoColor=white"></a>
  <a href="https://www.npmjs.com/package/helmet"><img alt="helmet" src="https://img.shields.io/badge/helmet-v8.1.0-000000?style=for-the-badge&logo=npm&logoColor=white"></a>
  <a href="https://www.npmjs.com/package/cors"><img alt="cors" src="https://img.shields.io/badge/cors-v2.8.5-000000?style=for-the-badge&logo=npm&logoColor=white"></a>
  <a href="https://www.npmjs.com/package/hpp"><img alt="hpp" src="https://img.shields.io/badge/hpp-v0.2.3-000000?style=for-the-badge&logo=npm&logoColor=white"></a>
  <a href="https://www.npmjs.com/package/express-rate-limit"><img alt="express-rate-limit" src="https://img.shields.io/badge/express--rate--limit-v7.5.0-000000?style=for-the-badge&logo=npm&logoColor=white"></a>
  <a href="https://www.npmjs.com/package/pino"><img alt="pino" src="https://img.shields.io/badge/pino-v9.6.0-000000?style=for-the-badge&logo=npm&logoColor=white"></a>
  <a href="https://www.npmjs.com/package/swagger-jsdoc"><img alt="swagger-jsdoc" src="https://img.shields.io/badge/swagger--jsdoc-v6.2.8-85EA2D?style=for-the-badge&logo=swagger&logoColor=black"></a>
  <a href="https://www.npmjs.com/package/swagger-ui-express"><img alt="swagger-ui-express" src="https://img.shields.io/badge/swagger--ui--express-v5.0.1-85EA2D?style=for-the-badge&logo=swagger&logoColor=black"></a>
  <a href="https://www.npmjs.com/package/node-cron"><img alt="node-cron" src="https://img.shields.io/badge/node--cron-v4.6.0-000000?style=for-the-badge&logo=npm&logoColor=white"></a>
  <a href="https://www.npmjs.com/package/dotenv-flow"><img alt="dotenv-flow" src="https://img.shields.io/badge/dotenv--flow-v4.1.0-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black"></a>
</p>

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
| Background Jobs | node-cron (cleanup expired uploads) |
| Config | dotenv-flow |


---

## Project Structure

```text
src/server.ts             Server entry point, cron scheduling, graceful shutdown
src/app.ts                Express app, middleware, route mounting
src/config/               Env, Firebase (Firestore + Storage), collections, locales, order screens
src/errors/               AppError
src/jobs/                 Cron jobs (cleanup expired uploads)
src/middlewares/          Auth, roles, validation, rate limits, uploads, errors
src/modules/              Domain modules (schema -> service -> controller -> routes)
src/openapi/              OpenAPI registry
src/shared/               Shared enums and domain types (serviceType, language)
src/types/                Express type augmentation
src/utils/                Tokens, passwords, image upload, async wrapper
scripts/generateSwagger.ts  Static OpenAPI JSON build (npm run docs:build)
```

---

## Firestore Data Model

| Collection | Key fields |
|---|---|
| `users` | name, email, passwordHash, role (USER/ADMIN), phone, region, language, wishlist, personalInfo, driverLicense, passport, profileCompleteness |
| `companies` | Shared by all service types. serviceType, name, about, profileImage, bannerImage, images, sectionOrder, rating, reviewCount, status |
| `cars` | companyId, brand, model, year, category, transmission, fuelType, seats, price, images, features, rating, reviewCount, status |
| `travels` | Tours: companyId, categories, title, roadmap, images, duration, startDate, endDate, includedServices, price, rating, reviewCount, status |
| `hotels` | companyId, starRating, amenities, price, status |
| `rooms` | hotelId, roomType, name, description, price, capacity, amenities, images, status |
| `foodItems` | companyId, name, description, category, price, images, ingredients, status, calories, protein, fat, carb |
| `includedServices` | name, icon, serviceType |
| `orders` | userId, serviceType, serviceId, companyId, status, currentStep, details, serverComputedPrice, createdAt, expiresAt |
| `paymentMethods` | userId, paymentMethodId, brand, last4, expiryMonth, expiryYear |
| `transactions` | orderId, userId, amount, currency, status (SUCCESS/FAILED/PENDING) |
| `reviews` | userId, targetType, targetId, serviceId, companyId, rating, comment, createdAt |
| `banners` | image, link, order, isActive |
| `appConfig` | latestVersion, minSupportedVersion, updateNotes |
| `uploads` | userId, filename, url, purpose, expiresAt, confirmed |
| `categories` | serviceType, name |

---

## Conventions

- **Response Envelope**: All successful controller responses return `{ "success": true, "data": { ... } }`.
- **Error Envelope**: Operational errors return `{ "success": false, "errorCode": "...", "message": "..." }`.
- **Localization**: Localized fields are stored as `{ az, en, ru }`. The API resolves strings using the `resolveLocale` utility, prioritizing the authenticated user's language, then the `?lang` query parameter, then `Accept-Language`, falling back to English.
- **Enums**: Module-specific enums reside in their respective `.schema.ts`, while cross-cutting enums (e.g., regions, currencies, service types) are in `src/shared/`. Valid enum options are exposed via `/api/enums/:key`.

---

## Order Execution Architecture & Data-Driven Step Engine

The order booking flow in Baltazar is **100% data-driven** and dynamic across all 4 service types (`RENT_A_CAR`, `TRAVEL`, `HOTEL`, `FOOD`).

### 1. Screen Sequences (`src/config/orderScreens.ts`)
Every domain defines an ordered list of screens required to complete a booking:

```ts
export const ORDER_SCREENS = {
  RENT_A_CAR: ['PERSONAL_INFO_SCREEN', 'DRIVER_LICENSE_SCREEN', 'ADDRESS_SCREEN', 'PAYMENT_SCREEN', 'CONFIRM_SCREEN'],
  TRAVEL:     ['PERSONAL_INFO_SCREEN', 'PASSPORT_INFO_SCREEN', 'PAYMENT_SCREEN', 'CONFIRM_SCREEN'],
  HOTEL:      ['PERSONAL_INFO_SCREEN', 'PAYMENT_SCREEN', 'CONFIRM_SCREEN'],
  FOOD:       ['PERSONAL_INFO_SCREEN', 'DELIVERY_ADDRESS_SCREEN', 'PAYMENT_SCREEN', 'CONFIRM_SCREEN'],
};
```

### 2. Intelligent Screen Skipping (Profile Completeness)
When a user calls `PUT /api/orders/:id/step`, the server executes `resolveNextStep(order, user)`.
If the user's profile already has completed data (verified via `user.profileCompleteness` flags), the backend **automatically skips** redundant input screens:
- `PERSONAL_INFO_SCREEN` is skipped if `user.profileCompleteness.personalInfo === true`
- `DRIVER_LICENSE_SCREEN` is skipped if `user.profileCompleteness.driverLicense === true`
- `PASSPORT_INFO_SCREEN` is skipped if `user.profileCompleteness.passport === true`

The API response directly instructs the mobile client which screen to render next:
```json
{
  "orderId": "ord_123",
  "status": "PENDING",
  "nextStep": { "screen": "ADDRESS_SCREEN" }
}
```

### 3. Step Accumulation & Server-Side Price Calculation
As the user completes steps, payload data from each screen is accumulated into the order's `details` object (`details[screen] = inputData`).

When the sequence completes and reaches `DONE` (after `CONFIRM_SCREEN`):
1. The engine triggers `computeOrderPrice(serviceType, serviceId, details)`.
2. The server dynamically looks up base prices, multipliers (rental days, hotel nights, selected rooms), and calculates taxes and fees.
3. The resulting `serverComputedPrice` (`basePrice`, `tax`, `serviceFee`, `totalAmount`, `currency`) is securely stored on the order document.

### 4. Payment Execution & State Transition
1. Client calls `POST /api/payment/pay/:orderId` passing a saved `paymentMethodId`.
2. Backend charges the exact `serverComputedPrice.totalAmount` via the Payment Gateway.
3. Upon payment authorization success, order status transitions from `PENDING` -> `CONFIRMED`.

---

## Modules

### Auth

Core functionality for Auth.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| POST | /api/auth/register | Public | Register a new user | Status confirmation / entity payload |
| POST | /api/auth/login | Public | Login with email and password | Status confirmation / entity payload |
| POST | /api/auth/refresh | Public | Refresh access token using a refresh token | Status confirmation / entity payload |
| POST | /api/auth/google | Public | Login or register with Google OAuth | Status confirmation / entity payload |

#### User Action Payload Examples
**POST /api/auth/register**
```json
{
  "name": "Aydin Aliyev",
  "email": "aydin@example.com",
  "password": "securepassword123",
  "phone": "+994501112233",
  "region": "AZ",
  "language": "en"
}
```

**POST /api/auth/login**
```json
{
  "email": "aydin@example.com",
  "password": "securepassword123"
}
```

#### Response Payload Example (Login / Register / Refresh / Google)
```json
{
  "user": {
    "id": "usr_987654321",
    "name": "Aydin Aliyev",
    "email": "aydin@example.com",
    "role": "USER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Users

Core functionality for Users.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| GET | /api/users/me | Authenticated | Get current user profile | `UserProfile` object |
| PUT | /api/users/me | Authenticated | Update current user profile | Status confirmation / entity payload |
| PUT | /api/users/me/avatar | Authenticated | Upload/replace the current user's avatar image | Status confirmation / entity payload |
| PUT | /api/users/{id}/disable | Admin | Revoke all sessions for a user (disable/ban action) | Status confirmation / entity payload |

#### User Action Payload Examples
**PUT /api/users/me**
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

#### GET Response Payload Example (`GET /api/users/me`)
```json
{
  "id": "usr_987654321",
  "name": "Aydin Aliyev",
  "email": "aydin@example.com",
  "role": "USER",
  "phone": "+994501112233",
  "region": "AZ",
  "language": "en",
  "wishlist": ["RENT_A_CAR_car_123"],
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
  },
  "profileCompleteness": {
    "personalInfo": true,
    "driverLicense": true,
    "passport": true
  },
  "createdAt": "2026-08-01T00:00:00.000Z"
}
```

### Wishlist

Core functionality for Wishlist.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| GET | /api/user/wishlist | Authenticated | Get the authenticated user's wishlist | `WishlistItem[]` array with populated entity |
| POST | /api/user/wishlist | Authenticated | Add a service to wishlist | Status confirmation / entity payload |
| DELETE | /api/user/wishlist/{id} | Admin | Remove a service from wishlist | Status confirmation / entity payload |

#### User Action Payload Example (`POST /api/user/wishlist`)
```json
{
  "serviceId": "car_123",
  "serviceType": "RENT_A_CAR"
}
```

#### GET Response Payload Example (`GET /api/user/wishlist`)
```json
[
  {
    "id": "RENT_A_CAR_car_123",
    "serviceId": "car_123",
    "serviceType": "RENT_A_CAR",
    "addedAt": "2026-08-05T09:00:00.000Z",
    "item": {
      "id": "car_123",
      "brand": "Toyota",
      "model": "Camry",
      "price": 90,
      "rating": 4.8,
      "image": "https://storage.googleapis.com/baltazar-bucket/cars/camry.jpg"
    }
  }
]
```

### Companies

Core functionality for Companies.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| GET | /api/companies | Public | Get a list of companies | `Company[]` array |
| POST | /api/companies | Admin | Create a new company | Status confirmation / entity payload |
| GET | /api/companies/{id} | Public | Get a company by ID | `Company` detail (with `fullSectionOrder`) |
| PUT | /api/companies/{id} | Admin | Update an existing company | Status confirmation / entity payload |
| DELETE | /api/companies/{id} | Admin | Delete a company and its items | Status confirmation / entity payload |

#### GET Response Payload Example (`GET /api/companies/:id`)
```json
{
  "id": "comp_123456",
  "serviceType": "RENT_A_CAR",
  "name": "Baku Premium Cars",
  "about": "Top luxury car rentals in Baku",
  "profileImage": "https://storage.googleapis.com/baltazar-bucket/companies/profile.jpg",
  "bannerImage": "https://storage.googleapis.com/baltazar-bucket/companies/banner.jpg",
  "images": ["https://storage.googleapis.com/baltazar-bucket/companies/1.jpg"],
  "sectionOrder": ["ABOUT", "ITEMS", "GALLERY"],
  "fullSectionOrder": ["HEADER", "ABOUT", "ITEMS", "GALLERY", "REVIEWS"],
  "rating": 4.9,
  "reviewCount": 15,
  "status": "ACTIVE"
}
```

### Hotel

Core functionality for Hotel.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| GET | /api/services/hotel | Public | List hotels with filters | `HotelDTO[]` array |
| POST | /api/services/hotel | Admin | Create hotel (admin) | Status confirmation / entity payload |
| GET | /api/services/hotel/{id} | Public | Get hotel details by ID | `HotelDetail` object |
| PUT | /api/services/hotel/{id} | Admin | Update hotel (admin) | Status confirmation / entity payload |
| DELETE | /api/services/hotel/{id} | Admin | Delete hotel | Status confirmation / entity payload |
| GET | /api/services/hotel/{id}/rooms | Public | List rooms for a hotel | `Room[]` array |
| POST | /api/services/hotel/rooms | Admin | Create room (admin) | Status confirmation / entity payload |
| PUT | /api/services/hotel/rooms/{id} | Admin | Update room (admin) | Status confirmation / entity payload |
| DELETE | /api/services/hotel/rooms/{id} | Admin | Delete room | Status confirmation / entity payload |

#### GET Response Payload Example (`GET /api/services/hotel/:id`)
```json
{
  "id": "hotel_123",
  "companyId": "comp_456",
  "name": "Four Seasons Baku",
  "about": "Luxury hotel on the Caspian Boulevard",
  "city": "Baku",
  "address": "1 Neftchilar Avenue",
  "starRating": 5,
  "amenities": ["WiFi", "Pool", "Spa", "Fitness Center"],
  "images": ["https://storage.googleapis.com/baltazar-bucket/hotels/fs1.jpg"],
  "logo": "https://storage.googleapis.com/baltazar-bucket/hotels/logo.jpg",
  "price": 250,
  "rating": 4.9,
  "reviewCount": 42,
  "status": "ACTIVE"
}
```

### RentACar

Core functionality for RentACar.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| GET | /api/services/rentacar/cars | Public | List cars with filters | `CarDTO[]` array |
| POST | /api/services/rentacar/cars | Admin | Create car (admin) | Status confirmation / entity payload |
| GET | /api/services/rentacar/cars/{id} | Public | Get full car details by ID | `CarDetail` object |
| PUT | /api/services/rentacar/cars/{id} | Admin | Update car (admin) | Status confirmation / entity payload |
| DELETE | /api/services/rentacar/cars/{id} | Admin | Delete car | Status confirmation / entity payload |

#### GET Response Payload Example (`GET /api/services/rentacar/cars/:id`)
```json
{
  "id": "car_123",
  "companyId": "comp_123",
  "brand": "Mercedes-Benz",
  "model": "E-Class",
  "year": 2024,
  "category": "Sedan",
  "transmission": "AUTOMATIC",
  "fuelType": "HYBRID",
  "seats": 5,
  "price": 120,
  "images": ["https://storage.googleapis.com/baltazar-bucket/cars/eclass.jpg"],
  "features": ["GPS", "Bluetooth", "Leather Seats"],
  "rating": 4.8,
  "reviewCount": 20,
  "status": "AVAILABLE"
}
```

### Food

Core functionality for Food.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| GET | /api/services/food/items | Public | List food items with filters | `FoodItemDTO[]` array |
| POST | /api/services/food/items | Admin | Create food item (admin) | Status confirmation / entity payload |
| GET | /api/services/food/items/{id} | Public | Get food item details by ID | `FoodItemDetail` object |
| PUT | /api/services/food/items/{id} | Admin | Update food item (admin) | Status confirmation / entity payload |
| DELETE | /api/services/food/items/{id} | Admin | Delete food item | Status confirmation / entity payload |

#### GET Response Payload Example (`GET /api/services/food/items/:id`)
```json
{
  "id": "food_123",
  "companyId": "comp_789",
  "name": "Special Doner Kabab",
  "description": "Fresh meat with homemade garlic sauce",
  "category": "Fast Food",
  "price": 10,
  "images": ["https://storage.googleapis.com/baltazar-bucket/food/doner.jpg"],
  "ingredients": ["Beef", "Garlic Sauce", "Bread", "Tomato"],
  "calories": 520,
  "protein": 35,
  "fat": 20,
  "carb": 45,
  "rating": 4.7,
  "reviewCount": 30,
  "status": "AVAILABLE"
}
```

### Travel

Core functionality for Travel.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| GET | /api/services/travel/tours | Public | List tours with filters | `TourDTO[]` array |
| POST | /api/services/travel/tours | Admin | Create tour (admin) | Status confirmation / entity payload |
| GET | /api/services/travel/tours/{id} | Public | Get full tour details | `TourDetail` object |
| PUT | /api/services/travel/tours/{id} | Admin | Update tour (admin) | Status confirmation / entity payload |
| DELETE | /api/services/travel/tours/{id} | Admin | Delete tour | Status confirmation / entity payload |

#### GET Response Payload Example (`GET /api/services/travel/tours/:id`)
```json
{
  "id": "tour_123",
  "companyId": "comp_999",
  "categories": ["Mountain", "Adventure"],
  "title": "Shahdag Winter & Summer Tour",
  "roadmap": "Day 1: Departure -> Day 2: Mountain Activities",
  "images": ["https://storage.googleapis.com/baltazar-bucket/tours/shahdag.jpg"],
  "duration": "2 Days",
  "startDate": "2026-09-01T08:00:00.000Z",
  "endDate": "2026-09-02T20:00:00.000Z",
  "includedServices": ["Transfer", "Guide", "Hotel"],
  "price": 150,
  "rating": 4.9,
  "reviewCount": 12,
  "status": "AVAILABLE"
}
```

### IncludedServices

Core functionality for IncludedServices.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| GET | /api/services/included-services/{serviceType} | Public | Get included services by service type | `IncludedService[]` array |
| POST | /api/services/included-services/{serviceType} | Admin | Create included service | Status confirmation / entity payload |
| PUT | /api/services/included-services/{id} | Admin | Update included service | Status confirmation / entity payload |
| DELETE | /api/services/included-services/{id} | Admin | Delete included service | Status confirmation / entity payload |

### Order

Core functionality for Order.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| GET | /api/order-screens/{serviceType} | Public | Get the hardcoded screen sequence for a service type | `string[]` screen key array |
| POST | /api/orders | Authenticated | Create a new Order (start a booking flow) | Status confirmation / entity payload |
| GET | /api/orders | Authenticated | Get all orders for the authenticated user | `OrderDTO[]` array |
| GET | /api/orders/{id} | Authenticated | Get a specific order by ID | `OrderDetail` object |
| PUT | /api/orders/{id}/step | Authenticated | Advance order to next step | Status confirmation / entity payload |
| PUT | /api/orders/{id}/cancel | Authenticated | Cancel an order | Status confirmation / entity payload |
| GET | /api/orders/{id}/payment-summary | Authenticated | Get payment summary for an order | `PaymentSummary` breakdown |
| PUT | /api/orders/{id}/status | Admin | Update order status (Admin only) | Status confirmation / entity payload |

#### User Action Payload Examples
**POST /api/orders** (Create initial order)
```json
{
  "serviceType": "RENT_A_CAR",
  "serviceId": "car_123"
}
```

**PUT /api/orders/:id/step** (Advance step submission)
```json
{
  "screen": "ADDRESS_SCREEN",
  "data": {
    "pickupAddress": "Baku Airport Terminal 1",
    "dropoffAddress": "Baku City Center"
  }
}
```

#### GET Response Payload Example (`GET /api/orders/:id`)
```json
{
  "id": "ord_123456",
  "userId": "usr_987654321",
  "serviceType": "RENT_A_CAR",
  "serviceId": "car_123",
  "companyId": "comp_123",
  "status": "PENDING",
  "currentStep": 2,
  "details": {
    "PERSONAL_INFO_SCREEN": { "dateOfBirth": "1995-04-12", "address": "Baku", "idNumber": "AZE12345678" }
  },
  "serverComputedPrice": {
    "basePrice": 120,
    "tax": 10,
    "serviceFee": 5,
    "totalAmount": 135,
    "currency": "AZN"
  },
  "createdAt": "2026-08-05T10:00:00.000Z",
  "expiresAt": "2026-08-05T10:30:00.000Z"
}
```

### Payment

Core functionality for Payment.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| GET | /api/payment/all-cards | Authenticated | Get all saved payment methods | `PaymentMethod[]` array |
| POST | /api/payment/add-card | Authenticated | Add a payment card (tokenized via external gateway) | Status confirmation / entity payload |
| POST | /api/payment/pay/{orderId} | Authenticated | Process payment for an order | Status confirmation / entity payload |

#### User Action Payload Examples
**POST /api/payment/add-card**
```json
{
  "paymentMethodId": "pm_card_visa_123",
  "brand": "VISA",
  "last4": "4242",
  "expiryMonth": 12,
  "expiryYear": 2028
}
```

**POST /api/payment/pay/:orderId**
```json
{
  "paymentMethodId": "pm_card_visa_123"
}
```

#### GET Response Payload Example (`GET /api/payment/all-cards`)
```json
[
  {
    "id": "pm_doc_123",
    "paymentMethodId": "pm_card_visa_123",
    "brand": "VISA",
    "last4": "4242",
    "expiryMonth": 12,
    "expiryYear": 2028
  }
]
```

### Reviews

Core functionality for Reviews.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| GET | /api/reviews | Authenticated | Get reviews for a target (public) | `{ items: Review[], averageRating, totalCount }` |
| POST | /api/reviews | Authenticated | Create a review (requires a confirmed order) | Status confirmation / entity payload |
| GET | /api/reviews/{id} | Authenticated | Get a review by ID | Object payload |
| PUT | /api/reviews/{id} | Authenticated | Update the authenticated user's review | Status confirmation / entity payload |
| DELETE | /api/reviews/{id} | Authenticated | Delete the authenticated user's review | Status confirmation / entity payload |

#### User Action Payload Example (`POST /api/reviews`)
```json
{
  "targetType": "SERVICE",
  "targetId": "car_123",
  "rating": 5,
  "comment": "Great experience, smooth ride!"
}
```

#### GET Response Payload Example (`GET /api/reviews?targetType=SERVICE&targetId=car_123`)
```json
{
  "items": [
    {
      "id": "rev_123",
      "userId": "usr_987654321",
      "userName": "Aydin A.",
      "targetType": "SERVICE",
      "targetId": "car_123",
      "serviceId": "car_123",
      "companyId": "comp_123",
      "rating": 5,
      "comment": "Great experience, smooth ride!",
      "createdAt": "2026-08-04T12:00:00.000Z"
    }
  ],
  "averageRating": 5,
  "totalCount": 1
}
```

### Home

Core functionality for Home.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| GET | /api/home/banner | Public | Get home banner slides | `Banner[]` array |
| POST | /api/home/banner | Admin | Create a banner slide (admin) | Status confirmation / entity payload |
| PUT | /api/home/banner/{id} | Admin | Update a banner slide (admin) | Status confirmation / entity payload |
| DELETE | /api/home/banner/{id} | Admin | Delete a banner slide | Status confirmation / entity payload |
| GET | /api/home/explore | Public | Get personalized explore rows | `ExploreRow[]` array |

#### GET Response Payload Example (`GET /api/home/banner`)
```json
[
  {
    "id": "ban_123",
    "image": "https://storage.googleapis.com/baltazar-bucket/banners/summer.jpg",
    "link": "/services/rentacar",
    "order": 1,
    "isActive": true
  }
]
```

### AppConfig

Core functionality for AppConfig.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| GET | /api/app/config | Public | Get mobile app version configuration | `AppConfig` object |
| PUT | /api/app/config | Admin | Update mobile app version configuration | Status confirmation / entity payload |

#### GET Response Payload Example (`GET /api/app/config`)
```json
{
  "latestVersion": "1.4.0",
  "minSupportedVersion": "1.2.0",
  "updateNotes": {
    "az": "Yeniliklər əlavə edildi",
    "en": "Bug fixes and performance improvements",
    "ru": "Исправления ошибок"
  }
}
```

### Enums

Core functionality for Enums.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| GET | /api/enums/roles | Public | Get valid user roles | `string[]` enum options array |
| GET | /api/enums/service-types | Public | Get valid service types | `string[]` enum options array |
| GET | /api/enums/company-statuses | Public | Get valid company statuses | `string[]` enum options array |
| GET | /api/enums/food-item-statuses | Public | Get valid food item statuses | `string[]` enum options array |
| GET | /api/enums/car-statuses | Public | Get valid car statuses | `string[]` enum options array |
| GET | /api/enums/transmissions | Public | Get valid transmission types | `string[]` enum options array |
| GET | /api/enums/fuel-types | Public | Get valid fuel types | `string[]` enum options array |
| GET | /api/enums/review-target-types | Public | Get valid review target types | `string[]` enum options array |
| GET | /api/enums/languages | Public | Get supported languages | `string[]` enum options array |
| GET | /api/enums/regions | Public | Get valid regions | `string[]` enum options array |
| GET | /api/enums/currencies | Public | Get valid currencies | `string[]` enum options array |
| GET | /api/enums/company-sections | Public | Get valid company detail sections | `string[]` enum options array |
| GET | /api/enums/order-statuses | Public | Get valid order statuses | `string[]` enum options array |
| GET | /api/enums/order-screens | Public | Get valid order screen keys | `string[]` enum options array |

#### GET Response Payload Example (`GET /api/enums/service-types`)
```json
[
  "RENT_A_CAR",
  "HOTEL",
  "TRAVEL",
  "FOOD"
]
```

### Uploads

Core functionality for Uploads.

| Method | Path | Access | Description | Response Data Format |
|---|---|---|---|---|
| POST | /api/uploads/image | Authenticated | Upload a single image | Status confirmation / entity payload |
| POST | /api/uploads/images | Authenticated | Upload multiple images (max 10) | Status confirmation / entity payload |
| GET | /api/uploads/images | Admin | List every uploaded image in the database (admin only) | `Upload[]` array |

#### User Action Payload Example (`POST /api/uploads/image`)
*Form Data*: `image` file (Max 5MB, JPEG/PNG/WebP)

#### Response Payload Example (`POST /api/uploads/image`)
```json
{
  "url": "https://storage.googleapis.com/baltazar-bucket/uploads/abc-123.jpg",
  "filename": "abc-123.jpg",
  "expiresAt": "2026-08-05T12:00:00.000Z"
}
```

---

## Background Jobs & Setup

- **Cleanup Expired Uploads**: A `node-cron` job runs periodically to clear `pending` uploads from Firebase Storage that were never confirmed by an entity creation/update, preventing storage leaks.

### Environment Variables (`src/config/env.ts`)

```text
NODE_ENV=development | production
PORT=3000
LOG_LEVEL=info
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_STORAGE_BUCKET=...
CORS_ORIGIN=http://localhost:3000
GOOGLE_CLIENT_ID=...
PAYMENT_GATEWAY_URL=http://localhost:4000
```

---

## Admin

Admin functionality is restricted to users with the `ADMIN` role.

- `GET /api/admin/metrics` - Retrieve system-wide metrics (total users, active orders, revenue). Response: `{ totalUsers, activeOrders, totalRevenue, totalCompanies }`.
- `POST /api/admin/reset-database` - DANGER: Wipes all collections except the calling admin's own user record. Response: `{ reset: true }`.
- `GET /api/admin/transactions` - View all cross-domain financial transactions. Response: `Transaction[]` array.
- `PUT /api/users/:id/disable` - Ban/disable a user account and revoke their sessions. Response: `{ disabled: true }`.
