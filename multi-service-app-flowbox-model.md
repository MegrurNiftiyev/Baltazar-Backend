# Multi-Service App — Yekun Model, Flow və Endpoint Sənədi (FlowBox versiyası)

Bu sənəd əvvəlki bütün müzakirələrin yekunudur. `Booking` adı **`FlowBox`**-a çevrilib. Əsas dəyişikliklər:

1. `IncludedService` servis-scoped edilib + many-to-many join table-lar əlavə olunub
2. `Review` → `targetType`/`targetId` ilə polymorphic, aydın adlandırma
3. Tək, unified `POST /api/flowboxes` — servis-spesifik nested create endpoint-ləri ləğv edilib
4. Status modeli genişləndirilib: `PENDING → AWAITING_PAYMENT → CONFIRMED / CANCELLED / EXPIRED`, üstəlik `isCompleted` flag
5. Auth tələb olunan hal (`LOGIN`) ayrıca exception deyil, `nextStep` axınının bir hissəsi kimi modelləşdirilib
6. Payment fazası tam service-agnostic, `payment-summary` endpoint-i ilə dəstəklənir
7. User-facing və Admin-facing API-lər ayrı sənədləşdirilir (eyni resurslar, fərqli icazə/scope)

---

## 1. DBML — Bütün cədvəllər

```dbml
Table Servisler {
  id varchar [pk]
  key varchar
  name json
  icon varchar
  sortOrder int   // "order" reserved keyword olduğu üçün adı dəyişdirildi
}

Table Company {
  id varchar [pk]
  serviceId varchar [ref: > Servisler.id]
  name varchar
  about json
  images json
  sectionsOrder json
  rating float
  reviewCount int
}

Table Car {
  id varchar [pk]
  companyId varchar [ref: > Company.id]
  brand varchar
  model varchar
  year int
  category varchar
  transmission varchar // MANUAL | AUTOMATIC
  fuelType varchar
  seatCount int
  price float
  images json
  rating float
  reviewCount int
}

Table Travel {
  id varchar [pk]
  companyId varchar [ref: > Company.id]
  categories json
  title json
  roadmap json // [{ lat, long, order }]
  images json
  duration varchar
  startDate date
  endDate date
  price float
  rating float
  reviewCount int
  status varchar
}

Table Hotel {
  id varchar [pk]
  name json
  about json
  sectionsOrder json
  images json
  starRating int
  city varchar
  coordinates varchar
  rating float
  reviewCount int
  status varchar
  roomType varchar
  price float
}

Table Food {
  id varchar [pk]
  companyId varchar [ref: > Company.id]
  name json
  description json
  category varchar // Fast Food, Soup, Dessert, Drinks
  price float
  images json
  preparationTime int
  rating float
  reviewCount int
  status varchar // AVAILABLE | OUT_OF_STOCK
}

// ---- IncludedService: servis-scoped, many-to-many join table-lar ilə ----

Table IncludedService {
  id varchar [pk]
  serviceType varchar   // TRAVEL | HOTEL — hansı servisə aid xüsusiyyət siyahısıdır
  name json
  icon varchar
}

Table TravelIncludedService {
  travelId varchar [ref: > Travel.id]
  includedServiceId varchar [ref: > IncludedService.id]
  indexes { (travelId, includedServiceId) [pk] }
}

Table HotelIncludedService {
  hotelId varchar [ref: > Hotel.id]
  includedServiceId varchar [ref: > IncludedService.id]
  indexes { (hotelId, includedServiceId) [pk] }
}

Table User {
  id varchar [pk]
  name varchar
  phone varchar
  email varchar
  refreshToken varchar
  region varchar
  language varchar
}

Table Wishlist {
  id varchar [pk]
  userId varchar [ref: - User.id]
  createdAt datetime
}

Table WishlistItem {
  id varchar [pk, note: "Listing.id — detal səhifəsinə keçid üçün"]
  wishlistId varchar [ref: > Wishlist.id]
  serviceType varchar // CAR | TRAVEL | HOTEL | FOOD
  title json
  image varchar
  price float
  rating float
  category varchar
  description varchar
  addedAt datetime

  indexes {
    (wishlistId, id) [pk]
  }
}

// ---- Review: targetType/targetId ilə polymorphic ----

Table Review {
  id varchar [pk]
  userId varchar [ref: > User.id]
  targetType varchar   // COMPANY | CAR | TRAVEL | HOTEL | FOOD
  targetId varchar
  rating int
  comment varchar
  createdAt datetime

  indexes {
    (targetType, targetId)
  }
}

// ---- FlowBox (əvvəlki "Booking"/"Order") ----

Table FlowBox {
  id varchar [pk]
  userId varchar [ref: > User.id]
  serviceType varchar     // CAR | TRAVEL | HOTEL | FOOD
  serviceId varchar       // Car.id / Travel.id / Hotel.id / Food.id
  status varchar          // PENDING | AWAITING_PAYMENT | CONFIRMED | CANCELLED | EXPIRED
  isCompleted bool         // true olanda flow tam bitib (CONFIRMED ya CANCELLED-dən sonra)
  currentStep varchar     // PERSONAL_INFO | DRIVER_LICENSE | ID_CARD | ADDRESS | PAYMENT | CONFIRM
  details json            // hər addımda toplanan, servisə görə fərqli struktur (kod tərəfdə Zod/interface ilə tipləndirilir)
  totalPrice float
  currency varchar
  createdAt datetime
  updatedAt datetime
  expiresAt datetime      // uzun müddət toxunulmayan PENDING flowbox-lar üçün TTL
}

// ---- Payment ----

Table PaymentMethod {
  id varchar [pk]
  userId varchar [ref: > User.id]
  provider varchar         // STRIPE | PAYRIFF | KAPITAL_BANK
  providerToken varchar
  last4 varchar
  brand varchar            // VISA | MASTERCARD
  expiryMonth int
  expiryYear int
  isDefault bool
  createdAt datetime
}

Table Transaction {
  id varchar [pk]
  flowBoxId varchar [ref: > FlowBox.id]
  paymentMethodId varchar [ref: > PaymentMethod.id]
  amount float
  currency varchar
  status varchar          // SUCCESS | FAILED | PENDING
  errorCode varchar
  providerEventId varchar // webhook idempotency üçün — eyni event iki dəfə emal olunmasın
  processedAt datetime
}
```

---

## 2. Status modeli — yarımçıq FlowBox-lar nə olur

FlowBox heç vaxt real DELETE edilmir. Bunun əvəzinə:

| Status | Nə vaxt | isCompleted |
|---|---|---|
| `PENDING` | Yaradılıb, addımlar doldurulur | false |
| `AWAITING_PAYMENT` | Bütün lazımi data toplanıb, payment gözlənilir | false |
| `CONFIRMED` | Ödəniş uğurlu, flow bitib | true |
| `CANCELLED` | İstifadəçi ya sistem ləğv edib | true |
| `EXPIRED` | `expiresAt` keçib, istifadəçi uzun müddət geri qayıtmayıb | true |

**Davranış qaydaları:**
- İstifadəçi ortada çıxıb gedirsə → status `PENDING` qalır, `expiresAt` təyin olunur (məs. yaradılmadan 48 saat sonra).
- Background cron job müntəzəm olaraq `expiresAt` keçmiş `PENDING` flowbox-ları `EXPIRED`-ə çevirir.
- İstifadəçi eyni servis üçün yenidən `POST /api/flowboxes` çağırsa (əvvəlki `EXPIRED`/`CANCELLED` olsa belə) → **yeni** FlowBox yaradılır, köhnəsinə toxunulmur. Beləliklə "yarımçıqlar toplanır" narahatlığı analitika üçün müsbətə çevrilir: hansı addımda, hansı servisdə istifadəçilər ən çox tərk edir — bunu `PENDING`+`EXPIRED` FlowBox-ların `currentStep` dağılımından ölçə bilərsiniz.
- Geri qayıdan istifadəçi üçün: `GET /api/flowboxes?status=PENDING&mine=true` — "davam et" siyahısı göstərmək istəsəniz, bu sorğu ilə asanlıqla qurula bilər (məcburi deyil, UX qərarınızdır).

---

## 3. FlowBox yaradılması — unified giriş nöqtəsi

Servis-spesifik nested create endpoint-ləri (`/api/services/rent-car/{id}/booking` və s.) **ləğv olunur**. Yerinə tək bir endpoint:

```
POST /api/flowboxes
Body: { "serviceType": "CAR", "serviceId": "car_123" }
```

Backend məntiqi:
1. `serviceType` + `serviceId` cütünün doğruluğunu yoxlayır (`serviceId` doğrudan da `serviceType`-ə uyğun cədvəldə mövcuddurmu).
2. Auth yoxdursa → `401` + `{ nextStep: { screen: "LOGIN" } }`.
3. Auth varsa → yeni `FlowBox` yaradılır, `serviceType`-ə uyğun ilk `currentStep` təyin olunur, cavab qaytarılır:

```json
{
  "flowBoxId": "fbx_1",
  "status": "PENDING",
  "nextStep": { "screen": "PERSONAL_INFO" }
}
```

### Auth flow-un modelləşdirilməsi

Login tələbi ayrıca exception-handling kimi deyil, elə bu `nextStep` axınının bir hissəsi kimi işlədilir. Mobil tərəfdə tək bir generic handler kifayətdir:

```
nextStep.screen === "LOGIN"   → login/register ekranına yönləndir,
                                  orijinal sorğunu (serviceType+serviceId) müvəqqəti saxla,
                                  auth uğurlu olandan sonra EYNİ POST /api/flowboxes-i təkrar göndər
nextStep.screen === "PERSONAL_INFO" / "DRIVER_LICENSE" / ... → müvafiq ekrana keç
nextStep.screen === "PAYMENT" → payment mini-flow-a keç (aşağıda)
```

Beləliklə `LOGIN` da sadəcə switch-in içində bir `case`-dir, ayrıca try/catch-based redirect logic-ə ehtiyac qalmır.

---

## 4. Data toplama fazası

```
GET /api/flowboxes/{id}              → hazırkı details + currentStep-i fresh çək (ekrana daxil olanda, pre-fill üçün)
PUT /api/flowboxes/{id}/step         → addımı tamamla (ekranı tərk edəndə göndər)
```

`PUT .../step` body-si:
```json
{ "screen": "PERSONAL_INFO", "data": { "name": "...", "surname": "..." } }
```

Backend cavabı:
```json
{
  "flowBoxId": "fbx_1",
  "status": "PENDING",
  "nextStep": { "screen": "DRIVER_LICENSE", "reason": "Sürücülük vəsiqəsi tapılmadı" }
}
```

Servis tipinə görə addım ardıcıllığı fərqlidir (məs. `FOOD` üçün `DRIVER_LICENSE` heç vaxt gəlmir) — bu ardıcıllıq backend-də `serviceType`-ə görə konfiqurasiya olunmuş step-sequence cədvəli/məntiqi ilə idarə olunur.

Bütün lazımi data toplananda backend bunu qaytarır:
```json
{ "flowBoxId": "fbx_1", "status": "AWAITING_PAYMENT", "nextStep": { "screen": "PAYMENT" } }
```

`PAYMENT`-ə çatan andan servis fərqi bitir — bundan sonrakı bütün call-lar tam generic-dir.

---

## 5. Payment fazası — tam service-agnostic

```
GET  /api/flowboxes/{id}/payment-summary
GET  /api/users/me/payment-methods
POST /api/users/me/payment-methods        (yeni kart əlavə et)
POST /api/flowboxes/{id}/pay              { "paymentMethodId": "pm_..." }
```

`payment-summary` — payment ekranının servis tipindən asılı olmadan eyni formatda data alması üçün backend `FlowBox.serviceType`+`serviceId`-yə görə müvafiq cədvəldən (Car/Travel/Hotel/Food) ad+şəkil çəkib birləşdirir:

```json
{
  "flowBoxId": "fbx_1",
  "targetType": "CAR",
  "targetName": { "az": "BMW 5 Series" },
  "targetImage": "https://...",
  "totalPrice": 250.0,
  "currency": "AZN",
  "durationOrQty": "3 gün"
}
```

`POST .../pay` cavabı:
```json
{ "flowBoxId": "fbx_1", "status": "CONFIRMED", "isCompleted": true }
```

Kart tokenləşdirmə client tərəfindən birbaşa ödəniş provayderinə gedir — backend tam kart nömrəsini/CVV-ni görmür, yalnız `providerToken` + `last4` + `brand` saxlanılır. Webhook-lar `Transaction.providerEventId` ilə idempotent emal olunur — eyni event iki dəfə gəlsə belə status ikiqat dəyişmir.

---

## 6. Ümumi FlowBox idarəetməsi

```
GET /api/flowboxes                       → istifadəçinin bütün flowbox-ları (bütün servis tipləri birlikdə, "Sifarişlərim" ekranı)
GET /api/flowboxes?status=PENDING        → yarımçıq qalanlar ("davam et" siyahısı, opsional UX)
GET /api/flowboxes/{id}                  → tək flowbox detalı
PUT /api/flowboxes/{id}/cancel           → ləğv et
```

---

## 7. Endpoint-lər — Servislər (dəyişməz qalan hissə)

```
GET    /api/services
POST   /api/services

GET    /api/services/companies
GET    /api/services/companies/{id}
POST   /api/services/companies
PUT    /api/services/companies/{id}
DELETE /api/services/companies/{id}

GET    /api/services/rent-car
GET    /api/services/rent-car/{id}
POST   /api/services/rent-car
PUT    /api/services/rent-car/{id}
DELETE /api/services/rent-car/{id}

GET    /api/services/travel
GET    /api/services/travel/{id}
POST   /api/services/travel
PUT    /api/services/travel/{id}
DELETE /api/services/travel/{id}

GET    /api/services/hotel
GET    /api/services/hotel/{id}
POST   /api/services/hotel
PUT    /api/services/hotel/{id}
DELETE /api/services/hotel/{id}

GET    /api/services/food
GET    /api/services/food/{id}
POST   /api/services/food
PUT    /api/services/food/{id}
DELETE /api/services/food/{id}
```

### Included Services (servis-scoped)

```
GET    /api/services/travel/included-services
POST   /api/services/travel/included-services
GET    /api/services/hotel/included-services
POST   /api/services/hotel/included-services
```

### Filtrləmə (query params, AND məntiqi)

```
GET /api/services/hotel?includedServices=wifi_id,pool_id&minPrice=50&maxPrice=200
```
Backend join table üzərindən `GROUP BY hotelId HAVING COUNT(DISTINCT includedServiceId) = N` ilə "hamısı mövcud olsun" (AND) məntiqini tətbiq edir.

---

## 8. Endpoint-lər — User, Wishlist, Review

```
GET    /api/users/me
PUT    /api/users/me

GET    /api/user/wishlist
POST   /api/user/wishlist
DELETE /api/user/wishlist/{id}

GET    /api/reviews?targetType=HOTEL&targetId=htl_1
GET    /api/reviews?targetType=COMPANY&targetId=cmp_1
POST   /api/reviews
DELETE /api/reviews/{id}
```

---

## 9. User-facing vs Admin-facing API ayrımı

İki ayrı API sənədi/namespace tövsiyə olunur — resurslar eynidir, amma icazə səviyyəsi və görünən sahələr fərqlənir:

**User API** (`/api/...` — yuxarıda göstərilənlər):
- Yalnız öz `userId`-sinə aid FlowBox/Wishlist/Review-lara giriş.
- `GET /api/flowboxes` avtomatik `WHERE userId = <current user>` filtri ilə işləyir.

**Admin API** (`/api/admin/...` — ayrı namespace, ayrı sənəd):
```
GET    /api/admin/flowboxes                  → bütün istifadəçilərin FlowBox-ları, filtrlənə bilən (status, serviceType, tarix aralığı)
GET    /api/admin/flowboxes/{id}
PUT    /api/admin/flowboxes/{id}/status      → admin əl ilə status dəyişə bilər (məs. refund üçün CANCELLED)
GET    /api/admin/transactions
GET    /api/admin/reviews                    → moderasiya üçün bütün review-lar
DELETE /api/admin/reviews/{id}
```

Bu ayrım niyə vacibdir: user-facing endpoint-lərdə scope-u səhv unudarsansa (məs. `userId` filtrini), bütün istifadəçilərin datası açıq qala bilər. Ayrı namespace + ayrı middleware (`requireAdminRole`) bu riski əvvəlcədən aradan qaldırır, həm də iki komanda (mobile vs admin-panel) paralel işləyəndə API contract-ları bir-birinə qarışmır.

---

## 10. Ümumi axın xülasəsi (yekun)

1. İstifadəçi servis siyahısına baxır → `GET /api/services/...` (public, login lazım deyil).
2. Detala baxır → `GET /api/services/{type}/{id}` (public).
3. "Al" düyməsi → **hər yerdə eyni çağırış**: `POST /api/flowboxes` `{ serviceType, serviceId }`.
   - Login yoxdursa → `401` + `nextStep: LOGIN` → auth bitəndə eyni sorğu təkrarlanır.
   - Login varsa → `flowBoxId` + ilk `nextStep` qaytarılır.
4. Hər addım → `GET /api/flowboxes/{id}` (fresh pre-fill) + `PUT /api/flowboxes/{id}/step` (ekranı tərk edəndə).
5. Bütün data toplananda → `status: AWAITING_PAYMENT`, `nextStep: PAYMENT`.
6. Payment mini-flow: `payment-summary` → kart seç/əlavə et → `POST /api/flowboxes/{id}/pay`.
7. `status: CONFIRMED`, `isCompleted: true`, `Transaction` qeydi yaranır.
8. İstənilən mərhələdə tərk edilərsə → FlowBox `PENDING` qalır, silinmir, `expiresAt`-ə görə sonradan `EXPIRED`-ə keçir — analitika üçün saxlanılır.
