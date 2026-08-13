# Companies Mobile Implementation

This document covers only the mobile-facing Company screens and APIs. Admin CRUD endpoints are intentionally excluded.

## Company list

```text
GET /api/companies?serviceType=FOOD&limit=20&cursor=<cursor>
```

Authentication is optional. Send `Accept-Language: az`, `en` or `ru`.

Company localized fields such as `name` and `about` are returned as a single string according to the requested language.

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "company123",
      "name": "KFC",
      "about": "Fast food chain...",
      "serviceType": "FOOD",
      "logo": "https://...",
      "profileImage": "https://...",
      "bannerImage": "https://...",
      "status": "ACTIVE",
      "rating": 4.5,
      "reviewCount": 120,
      "cuisineTypes": ["Fast Food"]
    }
  ],
  "pagination": { "nextCursor": null, "hasMore": false, "limit": 20 }
}
```

## Company details

```text
GET /api/companies/{companyId}
```

The response includes `fullSectionOrder`, which is used to render the sections in order:

```json
{
  "fullSectionOrder": ["HEADER", "ABOUT", "GALLERY", "ITEMS", "REVIEWS"],
  "reviewEligibility": {
    "eligible": true,
    "alreadyReviewed": false,
    "canSubmit": true
  }
}
```

## Company related items

```text
GET /api/companies/{companyId}/related-items
```

Returns up to 10 selected items as common explore cards. The mobile app can use the same card component for all service types.

## Items section

Use the company's `serviceType` to request its items:

```text
FOOD       GET /api/services/food/items?companyId={companyId}
RENT_A_CAR GET /api/services/rentacar/cars?companyId={companyId}
TRAVEL     GET /api/services/travel/tours?companyId={companyId}
HOTEL      GET /api/services/hotel/{hotelId}/rooms
```

All list responses except hotel rooms include pagination. Hotel rooms accept only `roomType` and return a plain `data` array.

## Reviews section

```text
GET /api/reviews?targetType=COMPANY&targetId={companyId}&limit=20&cursor=<cursor>
```

Authentication is optional. Reviews return `data` and `pagination`.

## Mobile rendering flow

```text
GET /api/companies
        |
        v
GET /api/companies/{id}
        |
        |-- HEADER / ABOUT / GALLERY: render company data
        |-- ITEMS: call related-items or service-specific list endpoint
        |-- REVIEWS: call reviews endpoint
```

Company and service item GET endpoints return localized fields as single strings using `Accept-Language`.

For `/api/companies/{companyId}/related-items`, the card mapper also receives the resolved language and returns localized string fields directly.
