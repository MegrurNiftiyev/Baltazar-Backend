# Wishlist Mobile Implementation

This document covers only the mobile-facing Wishlist APIs. Admin endpoints are excluded.

All Wishlist endpoints require authentication.

## Get wishlist

```text
GET /api/user/wishlist?limit=20&cursor=<cursor>
```

Send `Accept-Language: az`, `en` or `ru`.

Response:

```json
{
  "success": true,
  "data": [
    {
      "wishlistItemId": "FOOD_food123",
      "serviceType": "FOOD",
      "serviceId": "food123",
      "title": "Zinger Burger",
      "image": "https://...",
      "price": 8.5
    }
  ],
  "pagination": {
    "nextCursor": "20",
    "hasMore": true,
    "limit": 20
  }
}
```

Wishlist service types are `RENT_A_CAR`, `TRAVEL`, `HOTEL` and `FOOD`.

## Add item

```text
POST /api/user/wishlist
```

Body:

```json
{
  "serviceId": "food123",
  "serviceType": "FOOD"
}
```

Successful response:

```json
{
  "success": true,
  "data": {
    "wishlistItemId": "FOOD_food123",
    "serviceId": "food123",
    "serviceType": "FOOD",
    "added": true
  }
}
```

If the item already exists, the API returns `409 ALREADY_IN_WISHLIST`.

## Remove item

```text
DELETE /api/user/wishlist/{wishlistItemId}
```

Example:

```text
DELETE /api/user/wishlist/FOOD_food123
```

The response is:

```json
{
  "success": true,
  "data": {
    "itemId": "FOOD_food123",
    "removed": true
  }
}
```

## Recommended mobile state flow

```text
Open service card
        |
        |-- heart is inactive --> POST /api/user/wishlist
        |                         set heart active
        |
        |-- heart is active -----> DELETE /api/user/wishlist/{wishlistItemId}
                                  set heart inactive

Open Wishlist screen
        |
        v
GET /api/user/wishlist
        |
        v
Render cards grouped or filtered by serviceType
```

The list response contains full service details. Localized fields are resolved according to `Accept-Language`.
