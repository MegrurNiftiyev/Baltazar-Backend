# Mobile API Implementation Plan

This document outlines the GET API endpoints, query parameters, cURL examples, and response models for Companies and all company-linked sub-resources (Food Items, Cars, Tours, Hotel Rooms, and Reviews).

---

## Companies & Company-Linked GET Endpoints

### 3.1 Get Companies List
Used to fetch a paginated list of companies, optionally filtered by `serviceType`.

- **Endpoint**: `GET /api/companies`
- **Auth**: Optional

**Query Parameters**:
- `serviceType` (string, optional): Filter by `HOTEL`, `RENT_A_CAR`, `TRAVEL`, `FOOD`
- `limit` (int, default 20)
- `cursor` (string, optional)

**cURL Example**:

```bash
curl -X 'GET' \
  'https://baltazar-backend-kf2f.onrender.com/api/companies?serviceType=FOOD&limit=10' \
  -H 'Accept-Language: az'
```

**Response Model (Company List Item)**:

```json
{
  "success": true,
  "data": [
    {
      "id": "company123",
      "name": "KFC",
      "about": {
        "az": "Fast food zənciri...",
        "en": "Fast food chain...",
        "ru": "Сеть ресторанов..."
      },
      "serviceType": "FOOD",
      "logo": "https://storage.googleapis.com/.../kfc_logo.jpg",
      "profileImage": "https://storage.googleapis.com/.../kfc_profile.jpg",
      "bannerImage": "https://storage.googleapis.com/.../kfc_banner.jpg",
      "status": "ACTIVE",
      "rating": 4.5,
      "reviewCount": 120,
      "cuisineTypes": ["Fast Food", "American"]
    }
  ],
  "pagination": {
    "nextCursor": "some_cursor_string",
    "hasMore": true
  }
}
```

---

### 3.2 Get Company by ID (Details)
Used to fetch detailed information about a company. Note: `fullSectionOrder` dictates how the UI should dynamically render the sections for this specific company.

Company `name`, `about` and other localized Company fields are returned as a single string according to the resolved request language.

- **Endpoint**: `GET /api/companies/{id}`
- **Auth**: Optional

**cURL Example**:

```bash
curl -X 'GET' \
  'https://baltazar-backend-kf2f.onrender.com/api/companies/company123' \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Accept-Language: az'
```

**Response Model (Company Details)**:

```json
{
  "success": true,
  "data": {
    "id": "company123",
    "name": "KFC",
    "about": {
      "az": "Fast food zənciri...",
      "en": "Fast food chain...",
      "ru": "Сеть ресторанов..."
    },
    "serviceType": "FOOD",
    "logo": "https://storage.googleapis.com/.../kfc_logo.jpg",
    "profileImage": "https://storage.googleapis.com/.../kfc_profile.jpg",
    "bannerImage": "https://storage.googleapis.com/.../kfc_banner.jpg",
    "images": ["https://...", "https://..."],
    "address": "Baku, Azerbaijan",
    "status": "ACTIVE",
    "rating": 4.5,
    "reviewCount": 120,
    "fullSectionOrder": ["HEADER", "ABOUT", "GALLERY", "ITEMS", "REVIEWS"],
    "cuisineTypes": ["Fast Food", "American"],
    "reviewEligibility": {
      "eligible": true,
      "alreadyReviewed": false,
      "canSubmit": true
    }
  }
}
```

---

### 3.3 Get Company Food Items (ITEMS Section for FOOD Company)
Used to fetch food menu items belonging to a specific food company.

- **Endpoint**: `GET /api/services/food/items`
- **Auth**: Optional

**Query Parameters**:
- `companyId` (string, required for filtering by company)
- `category` (string, optional)
- `minPrice` (number, optional)
- `maxPrice` (number, optional)
- `name` (string, optional)
- `limit` (int, default 20)
- `cursor` (string, optional)

**cURL Example**:

```bash
curl -X 'GET' \
  'https://baltazar-backend-kf2f.onrender.com/api/services/food/items?companyId=company123&limit=20' \
  -H 'Accept-Language: az'
```

**Response (Food Items List)**:

```json
{
  "success": true,
  "data": [
    {
      "id": "food123",
      "companyId": "company123",
      "name": {
        "az": "Zinger Burger",
        "en": "Zinger Burger",
        "ru": "Зингер Бургер"
      },
      "category": "Burgers",
      "price": 8.5,
      "priceSuffix": "AZN",
      "image": "https://storage.googleapis.com/.../zinger.jpg"
    }
  ],
  "pagination": {
    "nextCursor": "some_cursor_string",
    "hasMore": false
  }
}
```

---

### 3.4 Get Company Cars (ITEMS Section for RENT_A_CAR Company)
Used to fetch rental vehicles belonging to a specific car rental company.

- **Endpoint**: `GET /api/services/rentacar/cars`
- **Auth**: Optional

**Query Parameters**:
- `companyId` (string, required for filtering by company)
- `brand` (string, optional)
- `model` (string, optional)
- `category` (string, optional)
- `transmission` (string, optional: `MANUAL`, `AUTOMATIC`)
- `fuelType` (string, optional: `PETROL`, `DIESEL`, `ELECTRIC`, `HYBRID`)
- `minPrice` (number, optional)
- `maxPrice` (number, optional)
- `limit` (int, default 20)
- `cursor` (string, optional)

**cURL Example**:

```bash
curl -X 'GET' \
  'https://baltazar-backend-kf2f.onrender.com/api/services/rentacar/cars?companyId=company123&limit=20' \
  -H 'Accept-Language: az'
```

**Response (Cars List)**:

```json
{
  "success": true,
  "data": [
    {
      "id": "car123",
      "brand": "Hyundai",
      "model": "Elantra",
      "price": 60.0,
      "priceSuffix": "AZN / day",
      "image": "https://storage.googleapis.com/.../elantra.jpg",
      "rating": 4.8,
      "category": "Sedan",
      "transmission": "AUTOMATIC",
      "fuelType": "PETROL"
    }
  ],
  "pagination": {
    "nextCursor": "some_cursor_string",
    "hasMore": false
  }
}
```

---

### 3.5 Get Company Tours (ITEMS Section for TRAVEL Company)
Used to fetch tour packages offered by a specific travel company.

- **Endpoint**: `GET /api/services/travel/tours`
- **Auth**: Optional

**Query Parameters**:
- `companyId` (string, required for filtering by company)
- `category` (string, optional)
- `minRating` (number, optional)
- `startDate` (string ISO, optional)
- `endDate` (string ISO, optional)
- `name` (string, optional)
- `limit` (int, default 20)
- `cursor` (string, optional)

**cURL Example**:

```bash
curl -X 'GET' \
  'https://baltazar-backend-kf2f.onrender.com/api/services/travel/tours?companyId=company123&limit=20' \
  -H 'Accept-Language: az'
```

**Response (Tours List)**:

```json
{
  "success": true,
  "data": [
    {
      "id": "tour123",
      "companyId": "company123",
      "title": {
        "az": "Qəbələ Turu",
        "en": "Gabala Tour",
        "ru": "Тур в Габалу"
      },
      "categories": ["Nature"],
      "price": 120.0,
      "priceSuffix": "AZN",
      "image": "https://storage.googleapis.com/.../gabala.jpg",
      "rating": 4.9,
      "reviewCount": 35,
      "duration": "2 Days / 1 Night",
      "startDate": "2026-09-01T00:00:00Z",
      "endDate": "2026-09-03T00:00:00Z",
      "status": "AVAILABLE"
    }
  ],
  "pagination": {
    "nextCursor": "some_cursor_string",
    "hasMore": false
  }
}
```

---

### 3.6 Get Hotel Rooms
Used to fetch rooms available in a specific hotel (`{id}` is the hotel ID).

- **Endpoint**: `GET /api/services/hotel/{id}/rooms`
- **Auth**: Optional

**Query Parameters**:
- `roomType` (string, optional)

**cURL Example**:

```bash
curl -X 'GET' \
  'https://baltazar-backend-kf2f.onrender.com/api/services/hotel/hotel123/rooms' \
  -H 'Accept-Language: az'
```

### 3.8 Get Company Related Items

- **Endpoint**: `GET /api/companies/{id}/related-items`
- **Auth**: Optional
- **Header**: `Accept-Language: az|en|ru`

Returns the company's `relatedItemIds` as localized `ExploreCardDTO` cards. The response is:

```json
{
  "success": true,
  "data": [
    {
      "id": "item123",
      "serviceType": "FOOD",
      "title": "Zinger Burger",
      "image": "https://...",
      "price": 8.5,
      "priceSuffix": "AZN",
      "currency": "AZN"
    }
  ]
}
```

Company fields, related-item cards and service item GET responses are returned as localized strings according to the resolved request language.

## Order and Payment Flow

### Create order

`POST /api/orders` — authentication required.

```json
{
  "serviceType": "HOTEL",
  "serviceId": "hotel123",
  "subItemId": "room123"
}
```

`subItemId` is optional and is normally used for a hotel room.

### Resolve next screen

`GET /api/orders/{orderId}/next-screen` — authentication required.

Possible screens:

```text
PERSONAL_INFO_SCREEN
DRIVER_LICENSE_SCREEN   // RENT_A_CAR
PASSPORT_INFO_SCREEN    // TRAVEL
DELIVERY_ADDRESS_SCREEN // FOOD
PAYMENT_SCREEN
CONFIRM_SCREEN           // successful payment
```

### Save delivery address

Only for FOOD orders:

`PATCH /api/orders/{orderId}/delivery-address`

```json
{
  "lat": 40.4093,
  "lng": 49.8671,
  "addressName": "28 May, Baku"
}
```

### Select payment method

`PATCH /api/orders/{orderId}/payment-method`

```json
{
  "paymentMethodId": "pm_card_123"
}
```

### Pay for order

`POST /api/payment/pay/{orderId}`

```json
{
  "paymentMethodId": "pm_card_123"
}
```

After successful payment the order becomes `CONFIRMED`. The mobile app should call `GET /api/orders/{orderId}/next-screen` again and open `CONFIRM_SCREEN`.

**Response (Rooms List)**:

```json
{
  "success": true,
  "data": [
    {
      "id": "room123",
      "hotelId": "hotel123",
      "roomType": "Deluxe Double",
      "name": {
        "az": "Delüks İki Nəfərlik Otaq",
        "en": "Deluxe Double Room",
        "ru": "Двухместный номер Делюкс"
      },
      "price": 150.0,
      "capacity": 2,
      "amenities": ["WiFi", "Sea View", "AC"],
      "image": "https://storage.googleapis.com/.../room.jpg",
      "status": "AVAILABLE"
    }
  ]
}
```

---

### 3.7 Get Company Reviews (REVIEWS Section for Company)
Used to fetch user reviews specifically for a company.

- **Endpoint**: `GET /api/reviews`
- **Auth**: Optional

**Query Parameters**:
- `targetType` (string, required): Must be `COMPANY`
- `targetId` (string, required): Company ID
- `limit` (int, default 20)
- `cursor` (string, optional)

**cURL Example**:

```bash
curl -X 'GET' \
  'https://baltazar-backend-kf2f.onrender.com/api/reviews?targetType=COMPANY&targetId=company123&limit=20' \
  -H 'Accept-Language: az'
```

**Response (Company Reviews List)**:

```json
{
  "success": true,
  "data": [
    {
      "id": "review123",
      "userId": "user456",
      "targetType": "COMPANY",
      "targetId": "company123",
      "rating": 5,
      "comment": "Çox əla xidmətdir, tam razı qaldım!",
      "createdAt": "2026-08-12T10:00:00.000Z"
    }
  ],
  "pagination": {
    "nextCursor": "some_cursor_string",
    "hasMore": false
  }
}
```
