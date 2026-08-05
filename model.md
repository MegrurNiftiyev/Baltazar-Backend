# Baltazar Backend - Models / Schemas

This document contains all Zod validation schemas (models) used across the Baltazar Backend project, presented with JSON schema definitions and example data.

---

## 1. Admin Module (`admin.schema.ts`)

### AddAdminInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "userId": { "type": "string", "minLength": 1 }
  },
  "required": ["userId"]
}
```

**Example Data:**
```json
{
  "userId": "user_abc123def456"
}
```

### AdminTransactionQuery

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "status": { "type": "string", "enum": ["SUCCESS", "FAILED", "PENDING"] },
    "userId": { "type": "string" }
  },
  "required": []
}
```

**Example Data:**
```json
{
  "status": "SUCCESS",
  "userId": "user_abc123def456"
}
```

---

## 2. App Config Module (`appConfig.schema.ts`)

### AppConfigInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "latestVersion": { "type": "string", "minLength": 1 },
    "minSupportedVersion": { "type": "string", "minLength": 1 },
    "updateNotes": {
      "type": "object",
      "properties": {
        "az": { "type": "string" },
        "en": { "type": "string" },
        "ru": { "type": "string" }
      },
      "required": ["az", "en", "ru"]
    }
  },
  "required": ["latestVersion", "minSupportedVersion"]
}
```

**Example Data:**
```json
{
  "latestVersion": "2.1.0",
  "minSupportedVersion": "1.5.0",
  "updateNotes": {
    "az": "Yeni xüsusiyyətlər əlavə edildi",
    "en": "New features added",
    "ru": "Добавлены новые функции"
  }
}
```

---

## 3. Auth Module (`auth.schema.ts`)

### RegisterInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string", "minLength": 2, "maxLength": 100 },
    "email": { "type": "string", "format": "email" },
    "password": { "type": "string", "minLength": 8, "maxLength": 128 },
    "phone": { "type": "string", "minLength": 7, "maxLength": 20 },
    "region": { "type": "string", "minLength": 1, "maxLength": 10 },
    "language": { "type": "string", "enum": ["az", "en", "ru"], "default": "en" }
  },
  "required": ["name", "email", "password"]
}
```

**Example Data:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "phone": "+994501234567",
  "region": "Baku",
  "language": "en"
}
```

### LoginInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "email": { "type": "string", "format": "email" },
    "password": { "type": "string", "minLength": 1 }
  },
  "required": ["email", "password"]
}
```

**Example Data:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### RefreshInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "refreshToken": { "type": "string", "minLength": 1 }
  },
  "required": ["refreshToken"]
}
```

**Example Data:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GoogleLoginInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "idToken": { "type": "string", "minLength": 1 }
  },
  "required": ["idToken"]
}
```

**Example Data:**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6I..."
}
```

---

## 4. Food Module (`food.schema.ts`)

### LocalizedMap (internal)

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "az": { "type": "string" },
    "en": { "type": "string" },
    "ru": { "type": "string" }
  },
  "required": ["az", "en", "ru"]
}
```

### FoodItemsQuery

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "companyId": { "type": "string" },
    "category": { "type": "string" },
    "minPrice": { "type": "number" },
    "maxPrice": { "type": "number" },
    "name": { "type": "string" }
  },
  "required": []
}
```

**Example Data:**
```json
{
  "companyId": "company_abc123",
  "category": "Pizza",
  "minPrice": 5,
  "maxPrice": 30,
  "name": "Margherita"
}
```

### CreateFoodCompanyInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "name": { "$ref": "#/definitions/LocalizedMap" },
    "about": { "$ref": "#/definitions/LocalizedMap" },
    "serviceType": { "type": "string", "enum": ["FOOD"], "default": "FOOD" },
    "logo": { "type": "string" },
    "images": { "type": "array", "items": { "type": "string" } },
    "cuisineTypes": { "type": "array", "items": { "type": "string" } },
    "address": { "type": "string" },
    "rating": { "type": "number", "minimum": 0, "maximum": 5, "default": 0 },
    "reviewCount": { "type": "integer", "minimum": 0, "default": 0 },
    "status": { "type": "string", "enum": ["ACTIVE", "INACTIVE"], "default": "ACTIVE" }
  },
  "required": ["name"]
}
```

**Example Data:**
```json
{
  "name": { "az": "Ləzzət Restoranı", "en": "Lazzat Restaurant", "ru": "Ресторан Ляззят" },
  "about": { "az": "Ən yaxşı milli mətbəx", "en": "Best local cuisine", "ru": "Лучшая местная кухня" },
  "serviceType": "FOOD",
  "logo": "https://storage.example.com/logos/restaurant1.png",
  "images": ["https://storage.example.com/restaurant1/img1.jpg"],
  "cuisineTypes": ["Azerbaijani", "Turkish"],
  "address": "Baku, Nizami Street 123",
  "rating": 4.5,
  "reviewCount": 128,
  "status": "ACTIVE"
}
```

### UpdateFoodCompanyInput

**JSON Schema:** Same as `CreateFoodCompanyInput` but all properties are optional.

**Example Data:**
```json
{
  "name": { "az": "Yeni Ləzzət", "en": "New Lazzat", "ru": "Новый Ляззят" },
  "status": "INACTIVE"
}
```

### CreateFoodItemInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "companyId": { "type": "string", "minLength": 1 },
    "name": { "$ref": "#/definitions/LocalizedMap" },
    "description": { "$ref": "#/definitions/LocalizedMap" },
    "category": { "type": "string", "minLength": 1 },
    "price": { "type": "number", "minimum": 0, "maximum": 50000 },
    "images": { "type": "array", "items": { "type": "string" } },
    "ingredients": { "type": "array", "items": { "type": "string" } },
    "status": { "type": "string", "enum": ["AVAILABLE", "OUT_OF_STOCK"], "default": "AVAILABLE" },
    "calories": { "type": "number" },
    "protein": { "type": "number" },
    "fat": { "type": "number" },
    "carb": { "type": "number" }
  },
  "required": ["companyId", "name", "category", "price"]
}
```

**Example Data:**
```json
{
  "companyId": "company_abc123",
  "name": { "az": "Margherita Pizza", "en": "Margherita Pizza", "ru": "Пицца Маргарита" },
  "description": { "az": "Klassik İtalyan pizzası", "en": "Classic Italian pizza", "ru": "Классическая итальянская пицца" },
  "category": "Pizza",
  "price": 12.99,
  "images": ["https://storage.example.com/items/pizza1.jpg"],
  "ingredients": ["Tomato sauce", "Mozzarella", "Basil"],
  "status": "AVAILABLE",
  "calories": 250,
  "protein": 12,
  "fat": 8,
  "carb": 30
}
```

### UpdateFoodItemInput

**JSON Schema:** Same as `CreateFoodItemInput` but all properties are optional.

**Example Data:**
```json
{
  "price": 14.99,
  "status": "OUT_OF_STOCK"
}
```

---

## 5. Home Module (`home.schema.ts`)

### BannerInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "link": { "type": "string", "minLength": 1 },
    "order": { "type": "number" },
    "isActive": { "type": "boolean", "default": true },
    "image": { "type": "string" }
  },
  "required": ["link", "order"]
}
```

**Example Data:**
```json
{
  "link": "https://baltazar.az/promotions/summer2026",
  "order": 1,
  "isActive": true,
  "image": "https://storage.example.com/banners/summer2026.jpg"
}
```

---

## 6. Hotel Module (`hotel.schema.ts`)

### LocalizedMap (internal)

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "az": { "type": "string" },
    "en": { "type": "string" },
    "ru": { "type": "string" }
  },
  "required": ["az", "en", "ru"]
}
```

### HotelQuery

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "minPrice": { "type": "number" },
    "maxPrice": { "type": "number" },
    "starRating": { "type": "integer", "minimum": 1, "maximum": 5 },
    "city": { "type": "string" },
    "minRating": { "type": "number", "minimum": 0, "maximum": 5 },
    "name": { "type": "string" }
  },
  "required": []
}
```

**Example Data:**
```json
{
  "minPrice": 50,
  "maxPrice": 500,
  "starRating": 5,
  "city": "Baku",
  "minRating": 4,
  "name": "Hilton"
}
```

### RoomQuery

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "roomType": { "type": "string" }
  },
  "required": []
}
```

**Example Data:**
```json
{
  "roomType": "Deluxe Suite"
}
```

### CreateHotelInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "name": { "$ref": "#/definitions/LocalizedMap" },
    "about": { "$ref": "#/definitions/LocalizedMap" },
    "city": { "type": "string", "minLength": 1 },
    "address": { "type": "string" },
    "starRating": { "type": "integer", "minimum": 1, "maximum": 5 },
    "amenities": { "type": "array", "items": { "type": "string" } },
    "images": { "type": "array", "items": { "type": "string" } },
    "logo": { "type": "string" },
    "sectionsOrder": { "type": "array", "items": { "type": "string" } },
    "serviceType": { "type": "string", "enum": ["HOTEL"], "default": "HOTEL" },
    "price": { "type": "number", "minimum": 0, "maximum": 50000 },
    "rating": { "type": "number", "minimum": 0, "maximum": 5, "default": 0 },
    "reviewCount": { "type": "integer", "minimum": 0, "default": 0 },
    "status": { "type": "string", "enum": ["ACTIVE", "INACTIVE"], "default": "ACTIVE" }
  },
  "required": ["name", "city", "starRating", "price"]
}
```

**Example Data:**
```json
{
  "name": { "az": "Hilton Bakı", "en": "Hilton Baku", "ru": "Хилтон Баку" },
  "about": { "az": "Mərkəzdə yerləşən lüks otel", "en": "Luxury hotel in the center", "ru": "Роскошный отель в центре" },
  "city": "Baku",
  "address": "Baku, 28 May Street 1",
  "starRating": 5,
  "amenities": ["Pool", "Spa", "Gym", "Restaurant"],
  "images": ["https://storage.example.com/hotels/hilton1.jpg"],
  "logo": "https://storage.example.com/hotels/hilton_logo.png",
  "sectionsOrder": ["rooms", "amenities", "reviews"],
  "serviceType": "HOTEL",
  "price": 250,
  "rating": 4.8,
  "reviewCount": 342,
  "status": "ACTIVE"
}
```

### UpdateHotelInput

**JSON Schema:** Same as `CreateHotelInput` but all properties are optional.

**Example Data:**
```json
{
  "price": 300,
  "status": "INACTIVE"
}
```

### CreateRoomInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "hotelId": { "type": "string", "minLength": 1 },
    "roomType": { "type": "string", "minLength": 1 },
    "name": { "$ref": "#/definitions/LocalizedMap" },
    "description": { "$ref": "#/definitions/LocalizedMap" },
    "price": { "type": "number", "minimum": 0, "maximum": 50000 },
    "capacity": { "type": "integer", "minimum": 1 },
    "amenities": { "type": "array", "items": { "type": "string" } },
    "images": { "type": "array", "items": { "type": "string" } },
    "status": { "type": "string", "enum": ["AVAILABLE", "UNAVAILABLE"], "default": "AVAILABLE" }
  },
  "required": ["hotelId", "roomType", "name", "price", "capacity"]
}
```

**Example Data:**
```json
{
  "hotelId": "hotel_abc123",
  "roomType": "Deluxe Suite",
  "name": { "az": "Deluxe Suite", "en": "Deluxe Suite", "ru": "Делюкс Сьют" },
  "description": { "az": "Geniş və rahat otaq", "en": "Spacious and comfortable room", "ru": "Просторный и уютный номер" },
  "price": 350,
  "capacity": 2,
  "amenities": ["King Bed", "Sea View", "Mini Bar"],
  "images": ["https://storage.example.com/rooms/deluxe1.jpg"],
  "status": "AVAILABLE"
}
```

### UpdateRoomInput

**JSON Schema:** Same as `CreateRoomInput` but all properties are optional.

**Example Data:**
```json
{
  "price": 400,
  "status": "UNAVAILABLE"
}
```

---

## 7. Order Module (`order.schema.ts`)

### CreateOrderInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "serviceType": { "type": "string", "enum": ["RENT_A_CAR", "TRAVEL", "HOTEL_ROOM", "FOOD"] },
    "serviceId": { "type": "string", "minLength": 1 }
  },
  "required": ["serviceType", "serviceId"]
}
```

**Example Data:**
```json
{
  "serviceType": "HOTEL_ROOM",
  "serviceId": "room_abc123def456"
}
```

### AdvanceOrderStepInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "screen": { "type": "string", "minLength": 1 },
    "data": { "type": "object", "additionalProperties": true }
  },
  "required": ["screen", "data"]
}
```

**Example Data:**
```json
{
  "screen": "PERSONAL_INFO_SCREEN",
  "data": {
    "name": "John Doe",
    "phone": "+994501234567"
  }
}
```

### UpdateOrderStatusInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "status": { "type": "string", "enum": ["PENDING", "AWAITING_PAYMENT", "PROCESSING", "CONFIRMED", "CANCELLED", "EXPIRED"] }
  },
  "required": ["status"]
}
```

**Example Data:**
```json
{
  "status": "CONFIRMED"
}
```

### AdminOrderQuery

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "status": { "type": "string", "enum": ["PENDING", "AWAITING_PAYMENT", "PROCESSING", "CONFIRMED", "CANCELLED", "EXPIRED"] },
    "userId": { "type": "string" },
    "serviceType": { "type": "string" }
  },
  "required": []
}
```

**Example Data:**
```json
{
  "status": "PENDING",
  "userId": "user_abc123",
  "serviceType": "HOTEL_ROOM"
}
```

---

## 8. Payment Module (`payment.schema.ts`)

### AddCardInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "cardNumber": { "type": "string", "minLength": 13, "maxLength": 19 },
    "expiryMonth": { "type": "integer", "minimum": 1, "maximum": 12 },
    "expiryYear": { "type": "integer", "minimum": 2024 },
    "cvv": { "type": "string", "minLength": 3, "maxLength": 4 },
    "cardholderName": { "type": "string", "minLength": 1 }
  },
  "required": ["cardNumber", "expiryMonth", "expiryYear", "cvv", "cardholderName"]
}
```

**Example Data:**
```json
{
  "cardNumber": "4111111111111111",
  "expiryMonth": 12,
  "expiryYear": 2028,
  "cvv": "123",
  "cardholderName": "John Doe"
}
```

### PayInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "paymentMethodId": { "type": "string", "minLength": 1 }
  },
  "required": ["paymentMethodId"]
}
```

**Example Data:**
```json
{
  "paymentMethodId": "pm_card_abc123def456"
}
```

---

## 9. Rent-a-Car Module (`rentacar.schema.ts`)

### LocalizedMap (internal)

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "az": { "type": "string" },
    "en": { "type": "string" },
    "ru": { "type": "string" }
  },
  "required": ["az", "en", "ru"]
}
```

### CarsQuery

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "companyId": { "type": "string" },
    "minPrice": { "type": "number" },
    "maxPrice": { "type": "number" },
    "brand": { "type": "string" },
    "model": { "type": "string" },
    "category": { "type": "string" },
    "transmission": { "type": "string", "enum": ["AUTOMATIC", "MANUAL"] },
    "fuelType": { "type": "string", "enum": ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"] }
  },
  "required": []
}
```

**Example Data:**
```json
{
  "companyId": "rental_abc123",
  "minPrice": 50,
  "maxPrice": 200,
  "brand": "BMW",
  "model": "5 Series",
  "category": "Luxury",
  "transmission": "AUTOMATIC",
  "fuelType": "DIESEL"
}
```

### CreateRentACarCompanyInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "name": { "$ref": "#/definitions/LocalizedMap" },
    "about": { "$ref": "#/definitions/LocalizedMap" },
    "serviceType": { "type": "string", "enum": ["RENT_A_CAR"], "default": "RENT_A_CAR" },
    "sectionsOrder": { "type": "array", "items": { "type": "string" } },
    "profileImage": { "type": "string", "format": "uri" },
    "bannerImage": { "type": "string", "format": "uri" },
    "images": { "type": "array", "items": { "type": "string" } },
    "rating": { "type": "number", "minimum": 0, "maximum": 5, "default": 0 },
    "reviewCount": { "type": "integer", "minimum": 0, "default": 0 },
    "status": { "type": "string", "enum": ["ACTIVE", "INACTIVE"], "default": "ACTIVE" }
  },
  "required": ["name"]
}
```

**Example Data:**
```json
{
  "name": { "az": "Premium Avtomobil İcarə", "en": "Premium Car Rental", "ru": "Премиум Аренда Авто" },
  "about": { "az": "Etibarlı avtomobil icarəsi", "en": "Reliable car rental service", "ru": "Надежная аренда автомобилей" },
  "serviceType": "RENT_A_CAR",
  "sectionsOrder": ["cars", "about", "reviews"],
  "profileImage": "https://storage.example.com/rental/premium_logo.png",
  "bannerImage": "https://storage.example.com/rental/premium_banner.jpg",
  "images": ["https://storage.example.com/rental/img1.jpg"],
  "rating": 4.3,
  "reviewCount": 89,
  "status": "ACTIVE"
}
```

### UpdateRentACarCompanyInput

**JSON Schema:** Same as `CreateRentACarCompanyInput` but all properties are optional.

**Example Data:**
```json
{
  "rating": 4.5,
  "status": "ACTIVE"
}
```

### CreateCarInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "companyId": { "type": "string", "minLength": 1 },
    "brand": { "type": "string", "minLength": 1 },
    "model": { "type": "string", "minLength": 1 },
    "year": { "type": "integer", "minimum": 1990 },
    "category": { "type": "string", "minLength": 1 },
    "transmission": { "type": "string", "enum": ["AUTOMATIC", "MANUAL"] },
    "fuelType": { "type": "string", "enum": ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"] },
    "seats": { "type": "integer", "minimum": 1, "maximum": 50 },
    "price": { "type": "number", "minimum": 0, "maximum": 50000 },
    "images": { "type": "array", "items": { "type": "string" }, "minItems": 1 },
    "features": { "type": "array", "items": { "type": "string" } },
    "rating": { "type": "number", "minimum": 0, "maximum": 5, "default": 0 },
    "reviewCount": { "type": "integer", "minimum": 0, "default": 0 },
    "status": { "type": "string", "enum": ["AVAILABLE", "UNAVAILABLE"], "default": "AVAILABLE" }
  },
  "required": ["companyId", "brand", "model", "year", "category", "transmission", "fuelType", "seats", "price", "images"]
}
```

**Example Data:**
```json
{
  "companyId": "rental_abc123",
  "brand": "BMW",
  "model": "5 Series",
  "year": 2024,
  "category": "Luxury Sedan",
  "transmission": "AUTOMATIC",
  "fuelType": "DIESEL",
  "seats": 5,
  "price": 150,
  "images": ["https://storage.example.com/cars/bmw5_1.jpg", "https://storage.example.com/cars/bmw5_2.jpg"],
  "features": ["GPS", "Bluetooth", "Leather Seats"],
  "rating": 4.7,
  "reviewCount": 45,
  "status": "AVAILABLE"
}
```

### UpdateCarInput

**JSON Schema:** Same as `CreateCarInput` but all properties are optional.

**Example Data:**
```json
{
  "price": 180,
  "status": "UNAVAILABLE"
}
```

---

## 10. Reviews Module (`reviews.schema.ts`)

### CreateReviewInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "targetType": { "type": "string", "enum": ["RENT_A_CAR", "TRAVEL", "HOTEL", "FOOD", "COMPANY"] },
    "targetId": { "type": "string", "minLength": 1 },
    "rating": { "type": "integer", "minimum": 1, "maximum": 5 },
    "comment": { "type": "string", "minLength": 1, "maxLength": 2000 }
  },
  "required": ["targetType", "targetId", "rating", "comment"]
}
```

**Example Data:**
```json
{
  "targetType": "HOTEL",
  "targetId": "hotel_abc123",
  "rating": 5,
  "comment": "Excellent hotel with great service and amazing views!"
}
```

### ReviewQuery

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "targetType": { "type": "string", "enum": ["RENT_A_CAR", "TRAVEL", "HOTEL", "FOOD", "COMPANY"] },
    "targetId": { "type": "string", "minLength": 1 }
  },
  "required": []
}
```

**Example Data:**
```json
{
  "targetType": "HOTEL",
  "targetId": "hotel_abc123"
}
```

### UpdateReviewInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "rating": { "type": "integer", "minimum": 1, "maximum": 5 },
    "comment": { "type": "string", "minLength": 1, "maxLength": 2000 }
  },
  "required": [],
  "anyOf": [
    { "required": ["rating"] },
    { "required": ["comment"] }
  ]
}
```

**Example Data:**
```json
{
  "rating": 4,
  "comment": "Updated review - still great but room for improvement."
}
```

---

## 11. Travel Module (`travel.schema.ts`)

### LocalizedMap (internal)

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "az": { "type": "string" },
    "en": { "type": "string" },
    "ru": { "type": "string" }
  },
  "required": ["az", "en", "ru"]
}
```

### ToursQuery

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "companyId": { "type": "string" },
    "category": { "type": "string" },
    "minRating": { "type": "number" },
    "startDate": { "type": "string" },
    "endDate": { "type": "string" },
    "name": { "type": "string" }
  },
  "required": []
}
```

**Example Data:**
```json
{
  "companyId": "travel_abc123",
  "category": "Adventure",
  "minRating": 4,
  "startDate": "2026-08-01",
  "endDate": "2026-08-15",
  "name": "Mountain Trek"
}
```

### IncludedServicesParams

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "serviceType": { "type": "string", "enum": ["TRAVEL", "HOTEL"] }
  },
  "required": ["serviceType"]
}
```

**Example Data:**
```json
{
  "serviceType": "TRAVEL"
}
```

### CreateTravelCompanyInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "name": { "$ref": "#/definitions/LocalizedMap" },
    "about": { "$ref": "#/definitions/LocalizedMap" },
    "serviceType": { "type": "string", "enum": ["TRAVEL"], "default": "TRAVEL" },
    "sectionsOrder": { "type": "array", "items": { "type": "string" } },
    "profileImage": { "type": "string", "format": "uri" },
    "bannerImage": { "type": "string", "format": "uri" },
    "images": { "type": "array", "items": { "type": "string" } },
    "rating": { "type": "number", "minimum": 0, "maximum": 5, "default": 0 },
    "reviewCount": { "type": "integer", "minimum": 0, "default": 0 },
    "status": { "type": "string", "enum": ["ACTIVE", "INACTIVE"], "default": "ACTIVE" }
  },
  "required": ["name"]
}
```

**Example Data:**
```json
{
  "name": { "az": "Macəra Səyahət", "en": "Adventure Travel", "ru": "Приключенческие Путешествия" },
  "about": { "az": "Ən yaxşı səyahət təcrübəsi", "en": "Best travel experience", "ru": "Лучший опыт путешествий" },
  "serviceType": "TRAVEL",
  "sectionsOrder": ["tours", "about", "reviews"],
  "profileImage": "https://storage.example.com/travel/adventure_logo.png",
  "bannerImage": "https://storage.example.com/travel/adventure_banner.jpg",
  "images": ["https://storage.example.com/travel/img1.jpg"],
  "rating": 4.6,
  "reviewCount": 210,
  "status": "ACTIVE"
}
```

### UpdateTravelCompanyInput

**JSON Schema:** Same as `CreateTravelCompanyInput` but all properties are optional.

**Example Data:**
```json
{
  "rating": 4.7,
  "status": "ACTIVE"
}
```

### CreateTourInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "companyId": { "type": "string", "minLength": 1 },
    "categories": { "type": "array", "items": { "type": "string" }, "minItems": 1 },
    "title": { "$ref": "#/definitions/LocalizedMap" },
    "roadmap": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "lat": { "type": "number" },
          "long": { "type": "number" },
          "order": { "type": "integer" }
        },
        "required": ["lat", "long", "order"]
      }
    },
    "images": { "type": "array", "items": { "type": "string" }, "minItems": 1 },
    "duration": { "type": "string", "minLength": 1 },
    "startDate": { "type": "string", "minLength": 1 },
    "endDate": { "type": "string", "minLength": 1 },
    "includedServices": { "type": "array", "items": { "type": "string" } },
    "price": { "type": "number", "minimum": 0, "maximum": 50000 },
    "rating": { "type": "number", "minimum": 0, "maximum": 5, "default": 0 },
    "reviewCount": { "type": "integer", "minimum": 0, "default": 0 },
    "status": { "type": "string", "enum": ["ACTIVE", "INACTIVE", "SOLD_OUT"], "default": "ACTIVE" }
  },
  "required": ["companyId", "categories", "title", "images", "duration", "startDate", "endDate", "price"]
}
```

**Example Data:**
```json
{
  "companyId": "travel_abc123",
  "categories": ["Adventure", "Hiking"],
  "title": { "az": "Qafqaz Dağları Turu", "en": "Caucasus Mountains Tour", "ru": "Тур по Кавказским горам" },
  "roadmap": [
    { "lat": 40.4093, "long": 49.8671, "order": 1 },
    { "lat": 40.5788, "long": 49.6349, "order": 2 }
  ],
  "images": ["https://storage.example.com/tours/caucasus1.jpg", "https://storage.example.com/tours/caucasus2.jpg"],
  "duration": "7 days",
  "startDate": "2026-07-01",
  "endDate": "2026-07-07",
  "includedServices": ["Hotel", "Meals", "Guide"],
  "price": 1200,
  "rating": 4.8,
  "reviewCount": 56,
  "status": "ACTIVE"
}
```

### UpdateTourInput

**JSON Schema:** Same as `CreateTourInput` but all properties are optional.

**Example Data:**
```json
{
  "price": 1400,
  "status": "SOLD_OUT"
}
```

### CreateIncludedServiceInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "name": { "$ref": "#/definitions/LocalizedMap" },
    "icon": { "type": "string" },
    "serviceType": { "type": "string", "enum": ["TRAVEL", "HOTEL"] }
  },
  "required": ["name", "serviceType"]
}
```

**Example Data:**
```json
{
  "name": { "az": "Bələdçi Xidməti", "en": "Guide Service", "ru": "Услуги гида" },
  "icon": "https://storage.example.com/icons/guide.png",
  "serviceType": "TRAVEL"
}
```

### UpdateIncludedServiceInput

**JSON Schema:** Same as `CreateIncludedServiceInput` but all properties are optional.

**Example Data:**
```json
{
  "name": { "az": "Premium Bələdçi", "en": "Premium Guide", "ru": "Премиум гид" }
}
```

### IncludedServiceIdParams

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string", "minLength": 1 }
  },
  "required": ["id"]
}
```

**Example Data:**
```json
{
  "id": "service_abc123def456"
}
```

---

## 12. Users Module (`users.schema.ts`)

### UpdateProfileInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string", "minLength": 2, "maxLength": 100 },
    "phone": { "type": "string", "minLength": 7, "maxLength": 20 },
    "region": { "type": "string", "minLength": 1, "maxLength": 10 },
    "language": { "type": "string", "enum": ["az", "en", "ru"] },
    "personalInfo": {
      "type": "object",
      "properties": {
        "dateOfBirth": { "type": "string" },
        "address": { "type": "string" },
        "idNumber": { "type": "string" }
      },
      "required": []
    },
    "driverLicense": {
      "type": "object",
      "properties": {
        "licenseNumber": { "type": "string", "minLength": 1 },
        "expiryDate": { "type": "string", "minLength": 1 }
      },
      "required": ["licenseNumber", "expiryDate"]
    },
    "passport": {
      "type": "object",
      "properties": {
        "passportNumber": { "type": "string", "minLength": 1 },
        "expiryDate": { "type": "string", "minLength": 1 }
      },
      "required": ["passportNumber", "expiryDate"]
    }
  },
  "required": []
}
```

**Example Data:**
```json
{
  "name": "John Doe",
  "phone": "+994501234567",
  "region": "Baku",
  "language": "en",
  "personalInfo": {
    "dateOfBirth": "1990-01-15",
    "address": "Baku, Nizami Street 45",
    "idNumber": "AZE12345678"
  },
  "driverLicense": {
    "licenseNumber": "DL12345678",
    "expiryDate": "2028-05-20"
  },
  "passport": {
    "passportNumber": "P12345678",
    "expiryDate": "2030-11-10"
  }
}
```

### ProfileCompleteness

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "personalInfo": { "type": "boolean", "default": false },
    "driverLicense": { "type": "boolean", "default": false },
    "passport": { "type": "boolean", "default": false }
  },
  "required": []
}
```

**Example Data:**
```json
{
  "personalInfo": true,
  "driverLicense": false,
  "passport": true
}
```

---

## 13. Wishlist Module (`wishlist.schema.ts`)

### AddToWishlistInput

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "serviceId": { "type": "string", "minLength": 1 },
    "serviceType": { "type": "string", "enum": ["RENT_A_CAR", "TRAVEL", "HOTEL", "FOOD"] }
  },
  "required": ["serviceId", "serviceType"]
}
```

**Example Data:**
```json
{
  "serviceId": "hotel_abc123def456",
  "serviceType": "HOTEL"
}
```

---

## Summary

| #  | Module       | Schema File            | Number of Models |
|----|--------------|------------------------|-----------------:|
| 1  | Admin        | `admin.schema.ts`      | 2 |
| 2  | App Config   | `appConfig.schema.ts`  | 1 |
| 3  | Auth         | `auth.schema.ts`       | 4 |
| 4  | Food         | `food.schema.ts`       | 5 |
| 5  | Home         | `home.schema.ts`       | 1 |
| 6  | Hotel        | `hotel.schema.ts`      | 5 |
| 7  | Order        | `order.schema.ts`      | 4 |
| 8  | Payment      | `payment.schema.ts`    | 2 |
| 9  | Rent-a-Car   | `rentacar.schema.ts`   | 5 |
| 10 | Reviews      | `reviews.schema.ts`    | 3 |
| 11 | Travel       | `travel.schema.ts`     | 8 |
| 12 | Users        | `users.schema.ts`      | 2 |
| 13 | Wishlist     | `wishlist.schema.ts`   | 1 |

**Total: 13 schema files, 43 models**