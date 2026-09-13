# Orders Mobile Implementation Guide

This document explains how mobile clients (iOS / Android / Flutter / React Native) integrate with the **Order & Payment System** in the Baltazar Backend.

---

## 1. Overview & Order Lifecycle

An order is created when a user initiates a booking or purchase for any of the 4 supported services:
`RENT_A_CAR`, `HOTEL`, `TRAVEL`, or `FOOD`.

### Order Status State Machine
- `PENDING`: Initial state upon creation.
- `AWAITING_PAYMENT`: User profile requirements filled, awaiting payment selection/execution.
- `PROCESSING`: Payment execution is currently in progress with the payment gateway.
- `CONFIRMED`: Payment succeeded, order is finalized and active.
- `CANCELLED`: User or system cancelled the order before confirmation.
- `EXPIRED`: Order exceeded 24-hour expiration (`expiresAt`) without payment completion.

### Verification Requirements Matrix per `serviceType`
| Service Type | Personal Info Required | Driver License Required | Passport Required | Delivery Address Required |
| :--- | :---: | :---: | :---: | :---: |
| `RENT_A_CAR` | **Yes** | **Yes** | No | No |
| `HOTEL` | **Yes** | No | No | No |
| `TRAVEL` | **Yes** | No | **Yes** | No |
| `FOOD` | **Yes** | No | No | **Yes** |

---

## 2. Dynamic Checkout Flow (`next-screen` Resolution & Step Payloads)

When an order is created, call `GET /api/orders/{id}/next-screen`. The backend automatically checks which prerequisite data is missing and returns a `screen` key indicating the exact screen to present to the user.

Below is the detailed breakdown of every screen condition, why it occurs, what endpoints/payloads must be sent by the mobile app to fulfill that step, and how to transition to the next step.

```text
                                  POST /api/orders
                                         |
                                         v
                         GET /api/orders/{id}/next-screen
                                         |
       +------------------+--------------+-------------------+-------------------+
       |                  |              |                   |                   |
"PERSONAL_INFO_SCREEN" "DRIVER_LICENSE_SCREEN" "PASSPORT_INFO_SCREEN" "DELIVERY_ADDRESS_SCREEN"
       |                  |              |                   |
PATCH /api/users/me/   PATCH /api/users/me/ PATCH /api/users/me/  PATCH /api/orders/{id}/
  personal-info        driver-license      passport           delivery-address
       |                  |              |                   |
       +------------------+--------------+-------------------+
                                         |
                                         v
                         GET /api/orders/{id}/next-screen
                                         |
                                         v
                                  "PAYMENT_SCREEN"
                                         |
                       1. PATCH /api/orders/{id}/payment-method
                       2. POST /api/payment/pay/{id}
                                         |
                                         v
                                  "CONFIRM_SCREEN"
```

---

### Step 1: `PERSONAL_INFO_SCREEN`

- **Condition (Vəziyyət):** `order.isPersonalInfoRequired === true` AND `order.personalInfo === null`.
- **Services (Xidmətlər):** All service types (`RENT_A_CAR`, `HOTEL`, `TRAVEL`, `FOOD`).
- **Why it occurs:** User's profile does not have complete personal details saved (`dateOfBirth`, `address`, `idNumber`).
- **Action Required (İcra ediləcək endpoint):**
  
  ```text
  PATCH /api/users/me/personal-info
  ```

- **Request Body (Göndəriləcək Data):**
  ```json
  {
    "dateOfBirth": "1995-04-12",
    "address": "Nizami str. 15, Baku",
    "idNumber": "AZE12345678"
  }
  ```

- **Next Action:** Upon receiving `{ "success": true }`, mobile calls `GET /api/orders/{id}/next-screen`. The backend auto-populates `order.personalInfo` from user profile and resolves the next missing requirement.

---

### Step 2: `DRIVER_LICENSE_SCREEN`

- **Condition (Vəziyyət):** `order.isDriverLicenseRequired === true` AND `order.driverLicense === null`.
- **Services (Xidmətlər):** `RENT_A_CAR` only.
- **Why it occurs:** Vehicle rentals require driver's license verification details.
- **Action Required (İcra ediləcək endpoint):**
  
  ```text
  PATCH /api/users/me/driver-license
  ```

- **Request Body (Göndəriləcək Data):**
  ```json
  {
    "licenseNumber": "DL12345678",
    "expiryDate": "2030-05-20"
  }
  ```

- **Next Action:** Mobile calls `GET /api/orders/{id}/next-screen` to proceed.

---

### Step 3: `PASSPORT_INFO_SCREEN`

- **Condition (Vəziyyət):** `order.isPassportRequired === true` AND `order.passport === null`.
- **Services (Xidmətlər):** `TRAVEL` only.
- **Why it occurs:** Tour & travel packages require international passport details.
- **Action Required (İcra ediləcək endpoint):**
  
  ```text
  PATCH /api/users/me/passport
  ```

- **Request Body (Göndəriləcək Data):**
  ```json
  {
    "passportNumber": "P9876543",
    "expiryDate": "2032-11-10"
  }
  ```

- **Next Action:** Mobile calls `GET /api/orders/{id}/next-screen` to proceed.

---

### Step 4: `DELIVERY_ADDRESS_SCREEN`

- **Condition (Vəziyyət):** `order.isDeliveryAddressRequired === true` AND `order.deliveryAddress === null`.
- **Services (Xidmətlər):** `FOOD` only.
- **Why it occurs:** Food delivery requires delivery GPS coordinates and street address name.
- **Action Required (İcra ediləcək endpoint):**
  
  ```text
  PATCH /api/orders/{id}/delivery-address
  ```

- **Request Body (Göndəriləcək Data):**
  ```json
  {
    "lat": 40.4092617,
    "lng": 49.8670924,
    "addressName": "Nizami str. 42, Apt 10, Baku"
  }
  ```

- **Next Action:** Mobile calls `GET /api/orders/{id}/next-screen` to proceed.

---

### Step 5: `PAYMENT_SCREEN`

- **Condition (Vəziyyət):** All required profile/delivery prerequisites are satisfied AND order payment is pending.
- **Services (Xidmətlər):** All service types.
- **Action Required (İcra ediləcək adımlar & endpoint-lər):**

  1. **(Optional) Fetch Saved Cards:**
     ```text
     GET /api/payment/all-cards
     ```

  2. **(Optional) Save New Card Token:**
     ```text
     POST /api/payment/add-card
     ```
     **Request Body:**
     ```json
     {
       "paymentMethodId": "pm_card_token_123",
       "brand": "Visa",
       "last4": "4242",
       "expiryMonth": 12,
       "expiryYear": 2028
     }
     ```

  3. **Attach Payment Method to Order:**
     ```text
     PATCH /api/orders/{id}/payment-method
     ```
     **Request Body:**
     ```json
     {
       "paymentMethodId": "pm_card_token_123"
     }
     ```

  4. **Execute Payment:**
     ```text
     POST /api/payment/pay/{id}
     ```
     **Request Body:**
     ```json
     {
       "paymentMethodId": "pm_card_token_123"
     }
     ```

- **Next Action:** If payment response returns `"status": "SUCCESS"`, the backend updates `order.status = "CONFIRMED"`. Mobile re-evaluates `GET /api/orders/{id}/next-screen`, which returns `"screen": "CONFIRM_SCREEN"`.

---

### Step 6: `CONFIRM_SCREEN`

- **Condition (Vəziyyət):** `order.status === 'CONFIRMED'`.
- **Action Required:** None. Mobile app displays order confirmation ticket / receipt screen.

---

## 3. Endpoints Reference

All endpoints require `Authorization: Bearer <jwt_token>` unless noted otherwise.  
Localized responses depend on `Accept-Language: az | en | ru`.

---

### 1. Create Order (Start Booking Flow)

Initiates a new order draft with a 24-hour expiration timer. Automatically populates requirement flags and existing user profile data.

```text
POST /api/orders
```

**Request Headers:**
```text
Authorization: Bearer <token>
Accept-Language: az | en | ru
Content-Type: application/json
```

**Request Body:**
```json
{
  "serviceType": "RENT_A_CAR",
  "serviceId": "car_abc123",
  "subItemId": null
}
```
*Note:* `subItemId` is required for `HOTEL` orders to specify the room ID. Pass `null` or omit for other services.

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "order_789xyz",
    "userId": "user_456",
    "serviceType": "RENT_A_CAR",
    "serviceId": "car_abc123",
    "subItemId": null,
    "status": "PENDING",
    "isPersonalInfoRequired": true,
    "isDriverLicenseRequired": true,
    "isPassportRequired": false,
    "isDeliveryAddressRequired": false,
    "personalInfo": {
      "name": "Ali Aliyev",
      "phone": "+994501234567",
      "dateOfBirth": "1995-04-12",
      "address": "Nizami str. 15, Baku",
      "idNumber": "AZE12345678"
    },
    "driverLicense": null,
    "passport": null,
    "paymentMethodId": null,
    "deliveryAddress": null,
    "serviceItemSnapshot": {
      "title": "BMW X5 2023",
      "image": "https://storage.googleapis.com/...",
      "price": 120,
      "priceSuffix": "AZN / day",
      "currency": "AZN"
    },
    "totalPrice": 120,
    "createdAt": "2026-09-14T00:00:00.000Z",
    "expiresAt": "2026-09-15T00:00:00.000Z",
    "paidAt": null,
    "updatedAt": null
  }
}
```

---

### 2. Get Next Navigation Screen (`next-screen`)

Returns the exact screen key the mobile app should present next during the checkout flow. Automatically re-evaluates missing fields against user profile data before returning.

```text
GET /api/orders/{id}/next-screen
```

**Request Headers:**
```text
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "screen": "DRIVER_LICENSE_SCREEN",
    "order": {
      "id": "order_789xyz",
      "status": "PENDING",
      "personalInfo": {
        "name": "Ali Aliyev",
        "phone": "+994501234567",
        "dateOfBirth": "1995-04-12",
        "address": "Nizami str. 15, Baku",
        "idNumber": "AZE12345678"
      },
      "driverLicense": null,
      "passport": null,
      "deliveryAddress": null,
      "paymentMethodId": null,
      "totalPrice": 120
    }
  }
}
```

**Possible `screen` values:**
- `"PERSONAL_INFO_SCREEN"`: Personal info is missing. Navigate user to Personal Info setup.
- `"DRIVER_LICENSE_SCREEN"`: Driver license is missing (`RENT_A_CAR`). Navigate to Driver License setup.
- `"PASSPORT_INFO_SCREEN"`: Passport info is missing (`TRAVEL`). Navigate to Passport info setup.
- `"DELIVERY_ADDRESS_SCREEN"`: Delivery address is missing (`FOOD`). Prompt user for delivery address.
- `"PAYMENT_SCREEN"`: All prerequisites are satisfied. Present payment method selection and Pay button.
- `"CONFIRM_SCREEN"`: Order is already paid (`CONFIRMED`). Show order confirmation / success screen.

**Error Responses:**
- `400 ORDER_EXPIRED`: Order expired before checkout completion.
- `400 ORDER_CANCELLED`: Order was cancelled.

---

### 3. Patch Payment Method

Attaches a selected saved payment method ID to the order.

```text
PATCH /api/orders/{id}/payment-method
```

**Request Body:**
```json
{
  "paymentMethodId": "pm_card_998877"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "orderId": "order_789xyz",
    "paymentMethodId": "pm_card_998877"
  }
}
```

---

### 4. Patch Delivery Address (FOOD orders only)

Sets or updates the delivery coordinates and address name for food orders.

```text
PATCH /api/orders/{id}/delivery-address
```

**Request Body:**
```json
{
  "lat": 40.4092617,
  "lng": 49.8670924,
  "addressName": "Nizami str. 42, Apt 10, Baku"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "orderId": "order_789xyz",
    "deliveryAddress": {
      "lat": 40.4092617,
      "lng": 49.8670924,
      "addressName": "Nizami str. 42, Apt 10, Baku"
    }
  }
}
```

---

### 5. Process Payment

Executes the payment transaction with the underlying payment gateway for the specified order.

```text
POST /api/payment/pay/{orderId}
```

**Request Body:**
```json
{
  "paymentMethodId": "pm_card_998877"
}
```

**Response (200 OK - Payment Success):**
```json
{
  "success": true,
  "data": {
    "id": "txn_334455",
    "orderId": "order_789xyz",
    "amount": 120,
    "currency": "AZN",
    "status": "SUCCESS"
  }
}
```
*Effect:* Changes order status to `CONFIRMED` and populates `paidAt`.

---

### 6. Get User Orders List

Returns paginated history of orders created by the authenticated user.

```text
GET /api/orders?serviceType=RENT_A_CAR&status=CONFIRMED&limit=20&cursor=<cursor>
```

**Query Parameters (Optional):**
- `status`: Filter by status (`PENDING`, `AWAITING_PAYMENT`, `PROCESSING`, `CONFIRMED`, `CANCELLED`, `EXPIRED`)
- `serviceType`: Filter by domain (`RENT_A_CAR`, `HOTEL`, `TRAVEL`, `FOOD`)
- `limit`: Number of items (default `20`)
- `cursor`: Pagination cursor for next page

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "order_789xyz",
      "userId": "user_456",
      "serviceType": "RENT_A_CAR",
      "serviceId": "car_abc123",
      "subItemId": null,
      "status": "CONFIRMED",
      "serviceItemSnapshot": {
        "title": "BMW X5 2023",
        "image": "https://storage.googleapis.com/...",
        "price": 120,
        "priceSuffix": "AZN / day",
        "currency": "AZN"
      },
      "totalPrice": 120,
      "createdAt": "2026-09-14T00:00:00.000Z",
      "expiresAt": "2026-09-15T00:00:00.000Z",
      "paidAt": "2026-09-14T00:05:00.000Z"
    }
  ],
  "pagination": {
    "nextCursor": "eyJjcmVhdGVkQXQiOiIyMDI2LTA5LTE0VDAwOjAwOjAwLjAwMFoifQ==",
    "hasMore": false,
    "limit": 20
  }
}
```

---

### 7. Get Order Details by ID

Retrieves full detailed document for a single order.

```text
GET /api/orders/{id}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "order_789xyz",
    "userId": "user_456",
    "serviceType": "RENT_A_CAR",
    "serviceId": "car_abc123",
    "subItemId": null,
    "status": "CONFIRMED",
    "isPersonalInfoRequired": true,
    "isDriverLicenseRequired": true,
    "isPassportRequired": false,
    "isDeliveryAddressRequired": false,
    "personalInfo": {
      "name": "Ali Aliyev",
      "phone": "+994501234567",
      "dateOfBirth": "1995-04-12",
      "address": "Nizami str. 15, Baku",
      "idNumber": "AZE12345678"
    },
    "driverLicense": {
      "licenseNumber": "DL123456",
      "expiryDate": "2030-01-01"
    },
    "passport": null,
    "paymentMethodId": "pm_card_998877",
    "deliveryAddress": null,
    "serviceItemSnapshot": {
      "title": "BMW X5 2023",
      "image": "https://storage.googleapis.com/...",
      "price": 120,
      "priceSuffix": "AZN / day",
      "currency": "AZN"
    },
    "totalPrice": 120,
    "createdAt": "2026-09-14T00:00:00.000Z",
    "expiresAt": "2026-09-15T00:00:00.000Z",
    "paidAt": "2026-09-14T00:05:00.000Z",
    "updatedAt": "2026-09-14T00:05:00.000Z"
  }
}
```

---

### 8. Cancel Order

Cancels an unpaid order. Cannot cancel an already confirmed order.

```text
PUT /api/orders/{id}/cancel
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "order_789xyz",
    "status": "CANCELLED"
  }
}
```

---

### 9. Get Payment Summary & Transaction History

Retrieves order payment breakdown and associated payment gateway transactions.

```text
GET /api/orders/{id}/payment-summary
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "orderId": "order_789xyz",
    "serviceType": "RENT_A_CAR",
    "serviceId": "car_abc123",
    "status": "CONFIRMED",
    "totalPrice": 120,
    "serviceItemSnapshot": {
      "title": "BMW X5 2023",
      "image": "https://storage.googleapis.com/...",
      "price": 120,
      "priceSuffix": "AZN / day",
      "currency": "AZN"
    },
    "transactions": [
      {
        "id": "txn_334455",
        "userId": "user_456",
        "orderId": "order_789xyz",
        "paymentMethodId": "pm_card_998877",
        "amount": 120,
        "currency": "AZN",
        "providerEventId": "ch_gateway_9911",
        "status": "SUCCESS",
        "createdAt": "2026-09-14T00:05:00.000Z"
      }
    ]
  }
}
```

---

### 10. Update Order Status (Admin Only)

Administrative status override endpoint.

```text
PUT /api/orders/{id}/status
```

**Request Body:**
```json
{
  "status": "CONFIRMED"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "order_789xyz",
    "status": "CONFIRMED"
  }
}
```
