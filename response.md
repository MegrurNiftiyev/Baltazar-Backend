PS C:\Users\megru\Desktop\Programlar\Github\Baltazar\Backend> npm run seed
>>
npm notice run baltazar-backend@1.0.0 seed
npm notice run npm run seed:audit && npm run seed:normalize-images && tsx scripts/seedAll.ts
npm notice run baltazar-backend@1.0.0 seed:audit
npm notice run tsx scripts/auditSeedData.ts
🔍 Auditing seed data...

✅ addresses.seed.json — used by [seedOrdersPaymentsReviews.ts]      
✅ review-comments.seed.json — used by [seedOrdersPaymentsReviews.ts]
✅ cards.seed.json — used by [seedUserProfilesAndCards.ts]
✅ user-profiles.seed.json — used by [seedUserProfilesAndCards.ts]   

🔍 Auditing domain seed data (scripts/data/)...

✅ categories.json

✅ Seed data audit passed — seeders and JSON are in sync.
npm notice run baltazar-backend@1.0.0 seed:normalize-images
npm notice run tsx scripts/normalizeTestImages.ts

📂 foodItems — 29 files
✅ foodItems/big_mac_style_burger.png — trimmed 1328x865 → normalized 1000x1000 (subject 850x55
4)
✅ foodItems/cheeseburger (2).png — trimmed 1001x772 → normalized 1000x1000 (subject 850x656)
✅ foodItems/chocolate_cake.png — trimmed 616x464 → normalized 1000x1000 (subject 850x640)
✅ foodItems/chocolate_cake_slice.png — trimmed 575x601 → normalized 1000x1000 (subject 813x850
)
✅ foodItems/club_sandwich.png — trimmed 7353x4734 → normalized 1000x1000 (subject 850x547)
✅ foodItems/coca_cola_bottle.png — trimmed 1256x1702 → normalized 1000x1000 (subject 627x850)✅ foodItems/coffee_cup.png — trimmed 3587x3262 → normalized 1000x1000 (subject 850x773)
✅ foodItems/coffee_cup_alt.png — trimmed 910x766 → normalized 1000x1000 (subject 850x715)
✅ foodItems/coffee_mug.png — trimmed 595x510 → normalized 1000x1000 (subject 850x729)
✅ foodItems/deli_sandwich.png — trimmed 3417x2271 → normalized 1000x1000 (subject 850x565)
✅ foodItems/donut_classic.png — trimmed 3630x3477 → normalized 1000x1000 (subject 850x814)
✅ foodItems/double_burger.png — trimmed 1958x1235 → normalized 1000x1000 (subject 850x536)
✅ foodItems/french_fries.png — trimmed 2369x1073 → normalized 1000x1000 (subject 850x385)
✅ foodItems/french_fries_alt.png — trimmed 3395x1805 → normalized 1000x1000 (subject 850x452)✅ foodItems/fried_chicken.png — trimmed 541x347 → normalized 1000x1000 (subject 850x545)
✅ foodItems/fried_chicken_bucket.png — trimmed 4865x3015 → normalized 1000x1000 (subject 850x5
27)
✅ foodItems/fried_chicken_pieces.png — trimmed 960x478 → normalized 1000x1000 (subject 850x423
)
✅ foodItems/glazed_donut.png — trimmed 3233x2204 → normalized 1000x1000 (subject 850x579)
✅ foodItems/hot_dog.png — trimmed 3184x1689 → normalized 1000x1000 (subject 850x451)
✅ foodItems/hot_dog_large.png — trimmed 6903x2208 → normalized 1000x1000 (subject 850x272)
✅ foodItems/ice_cream_cone.png — trimmed 7000x5935 → normalized 1000x1000 (subject 850x721)
✅ foodItems/margherita_pizza.png — trimmed 2426x1138 → normalized 1000x1000 (subject 850x399)✅ foodItems/pepperoni_pizza.png — trimmed 1491x972 → normalized 1000x1000 (subject 850x554)
✅ foodItems/pizza_extra.png — trimmed 3099x3468 → normalized 1000x1000 (subject 760x850)
✅ foodItems/pizza_slice.png — trimmed 2916x1871 → normalized 1000x1000 (subject 850x545)
✅ foodItems/sandwich_alt.png — trimmed 1913x904 → normalized 1000x1000 (subject 850x402)
✅ foodItems/sushi_platter.png — trimmed 414x415 → normalized 1000x1000 (subject 848x850)
✅ foodItems/sushi_roll.png — trimmed 1418x795 → normalized 1000x1000 (subject 850x477)
✅ foodItems/sushi_set.png — trimmed 701x598 → normalized 1000x1000 (subject 850x725)

📂 rentacarCars — 23 files
✅ rentacarCars/ferrari_488.png — trimmed 952x468 → normalized 1200x900 (subject 960x472)
✅ rentacarCars/ferrari_alt.png — trimmed 465x216 → normalized 1200x900 (subject 960x446)
✅ rentacarCars/ferrari_black.png — trimmed 425x169 → normalized 1200x900 (subject 960x382)
✅ rentacarCars/ferrari_red.png — trimmed 568x262 → normalized 1200x900 (subject 960x443)
✅ rentacarCars/ford_mustang.png — trimmed 1280x960 → normalized 1200x900 (subject 960x720)
✅ rentacarCars/ford_mustang_alt.png — trimmed 1760x857 → normalized 1200x900 (subject 960x467)
✅ rentacarCars/honda_alt.png — trimmed 1201x561 → normalized 1200x900 (subject 960x448)
✅ rentacarCars/honda_civic_type_r.png — trimmed 433x281 → normalized 1200x900 (subject 960x623
)
✅ rentacarCars/lamborghini_aventador.png — trimmed 1449x420 → normalized 1200x900 (subject 960
x278)
✅ rentacarCars/lamborghini_huracan.png — trimmed 1467x563 → normalized 1200x900 (subject 960x3
68)
✅ rentacarCars/lamborghini_red.png — trimmed 892x340 → normalized 1200x900 (subject 960x366)
✅ rentacarCars/lamborghini_white.png — trimmed 1750x513 → normalized 1200x900 (subject 960x281
)
✅ rentacarCars/mercedes_amg.png — trimmed 1858x1139 → normalized 1200x900 (subject 960x589)
✅ rentacarCars/mercedes_luxury.png — trimmed 3382x2299 → normalized 1200x900 (subject 960x653)
✅ rentacarCars/mercedes_sedan.png — trimmed 1783x1219 → normalized 1200x900 (subject 960x656)✅ rentacarCars/nissan_gtr_style.png — trimmed 1993x1213 → normalized 1200x900 (subject 960x584
)
✅ rentacarCars/porsche_911.png — trimmed 624x271 → normalized 1200x900 (subject 960x417)
✅ rentacarCars/porsche_911_alt.png — trimmed 786x392 → normalized 1200x900 (subject 960x479)
✅ rentacarCars/porsche_clean.png — trimmed 1793x870 → normalized 1200x900 (subject 960x466)
✅ rentacarCars/tesla_model_s.png — trimmed 1144x580 → normalized 1200x900 (subject 960x487)
✅ rentacarCars/toyota_alt.png — trimmed 590x287 → normalized 1200x900 (subject 960x467)
✅ rentacarCars/toyota_blue.png — trimmed 407x228 → normalized 1200x900 (subject 960x538)
✅ rentacarCars/toyota_supra_style.png — trimmed 400x144 → normalized 1200x900 (subject 960x346
)

🎉 Image normalization complete.
🚀 Master Seeding Server running on http://localhost:3099
🔑 Logging in as Admin (megrurniftieyv@gmail.com)...
✅ Admin authenticated successfully!
🗑️  Resetting database...
[10:59:47] INFO: POST /login 200
    req: {
      "id": 1,
      "method": "POST",
      "url": "/api/auth/login",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "62"
      },
      "remoteAddress": "::1",
      "remotePort": 51257
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "546",
        "etag": "W/\"222-4qy+7mEJ8hAi9JWv5ibBAdVkZT0\""
      }
    }
    responseTime: 1290
✅ Database reset complete.


🏷️ Seeding Categories...
[10:59:53] INFO: POST /reset-database 200
    req: {
      "id": 2,
      "method": "POST",
      "url": "/api/admin/reset-database",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "0"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "56",
        "etag": "W/\"38-gzG5yZ8ITzcIreZkb6z3XBsWlXY\""
      }
    }
    responseTime: 5759
✨ Created Category: [FOOD] Fast Food (L4oXfpVuYcMCF6ZXuEXq)
[10:59:53] INFO: POST / 201
    req: {
      "id": 3,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "87"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "139",
        "etag": "W/\"8b-d3O/kRdwhYTC9dvOfsBRejVAo48\""
      }
    }
    responseTime: 264
✨ Created Category: [FOOD] Sushi & Asian (Yr06Xbtwj1SqDgTfbSeF)
[10:59:54] INFO: POST / 201
    req: {
      "id": 4,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "134"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "186",
        "etag": "W/\"ba-luBaxcUTsi96x455yOZt+V05kZ8\""
      }
    }
    responseTime: 197
✨ Created Category: [FOOD] Desserts (Lt3riEbHP2CKxI7jkZ1v)
[10:59:54] INFO: POST / 201
    req: {
      "id": 5,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "90"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "142",
        "etag": "W/\"8e-zok2ABkH/kAtC0ufTcA2ECf6y54\""
      }
    }
    responseTime: 235
✨ Created Category: [FOOD] Drinks (RN7fKK33mhY05jQI32LL)
[10:59:54] INFO: POST / 201
    req: {
      "id": 6,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "85"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "137",
        "etag": "W/\"89-ge37Q/es3TeWvrGKpzjsJI79hRo\""
      }
    }
    responseTime: 184
✨ Created Category: [FOOD] National Cuisine (LrHU3wbxiZfBEjlvfVCE)
[10:59:54] INFO: POST / 201
    req: {
      "id": 7,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "120"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "172",
        "etag": "W/\"ac-EmwTnlkt2k0Q9nFd5mqx5IWSqIg\""
      }
    }
    responseTime: 152
✨ Created Category: [FOOD] Pizza (mykX0zK0Yfz4ClZx1OUR)
[10:59:54] INFO: POST / 201
    req: {
      "id": 8,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "75"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "127",
        "etag": "W/\"7f-qsEK91CLEbwaEPZrxZk7P19rsDo\""
      }
    }
    responseTime: 151
✨ Created Category: [FOOD] Burger (PM3BWHwZQ6LDhOU95NVe)
[10:59:55] INFO: POST / 201
    req: {
      "id": 9,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "81"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "133",
        "etag": "W/\"85-ok7XxbR0FN9RCBk2Xn87xK4TuGQ\""
      }
    }
    responseTime: 183
✨ Created Category: [FOOD] Seafood (8fGf9DTwG0OjIjdU8pHP)
[10:59:55] INFO: POST / 201
    req: {
      "id": 10,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "105"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "157",
        "etag": "W/\"9d-LtF6o2aY/JNPKvUlr0S6HrgjzL8\""
      }
    }
    responseTime: 157
✨ Created Category: [FOOD] Vegetarian & Vegan (FzSvnpAsyURr8JtCaIUA)
[10:59:55] INFO: POST / 201
    req: {
      "id": 11,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "143"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "195",
        "etag": "W/\"c3-KnOGSjmBzuwD4eixIORMp2B6HTk\""
      }
    }
    responseTime: 163
✨ Created Category: [FOOD] Kebab & Grill (PW84nqWqEq97TrAztUKb)
[10:59:55] INFO: POST / 201
    req: {
      "id": 12,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "107"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "159",
        "etag": "W/\"9f-Dr4dBMTrqjyEoTRZE3U7AHZwCiU\""
      }
    }
    responseTime: 171
✨ Created Category: [FOOD] Salads (ik3qDDSjsqpkWhaCnrjV)
[10:59:55] INFO: POST / 201
    req: {
      "id": 13,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "81"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "133",
        "etag": "W/\"85-D5uTxLeQQFzyyJM7LPXQfpqprzU\""
      }
    }
    responseTime: 150
✨ Created Category: [FOOD] Coffee (MFZw2S7WnaFDvkhCxNR7)
[10:59:55] INFO: POST / 201
    req: {
      "id": 14,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "76"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "128",
        "etag": "W/\"80-gmE4S2T/nA8KKQo3OBKxf3dH+zU\""
      }
    }
    responseTime: 168
✨ Created Category: [FOOD] Breakfast (aHWdSuLpbXWM2sRQ91YM)
[10:59:56] INFO: POST / 201
    req: {
      "id": 15,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "93"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "145",
        "etag": "W/\"91-SMWEhlKCZaFfql0xu2AshPtz80c\""
      }
    }
    responseTime: 150
✨ Created Category: [FOOD] Bakery & Pastry (5qN0Xsts7y0QmJ2YTxYP)
[10:59:56] INFO: POST / 201
    req: {
      "id": 16,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "152"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "204",
        "etag": "W/\"cc-jORnETbX7CISr65IYashbx21CQw\""
      }
    }
    responseTime: 137
✨ Created Category: [FOOD] Italian Cuisine (12WKAwjxgc9rJBxRmDlf)
[10:59:56] INFO: POST / 201
    req: {
      "id": 17,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "121"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "173",
        "etag": "W/\"ad-8swKh452tGP1D4LuU5Ko5e9qFMs\""
      }
    }
    responseTime: 200
✨ Created Category: [FOOD] Chinese Cuisine (vRsqwEsbL8UFB3GnHcx7)
[10:59:56] INFO: POST / 201
    req: {
      "id": 18,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "113"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "165",
        "etag": "W/\"a5-7n9Whi1Jul2Vo5VrNrtc8wzv4Qg\""
      }
    }
    responseTime: 147
✨ Created Category: [FOOD] Indian Cuisine (00T3w4JSh2abR3q58a6n)
[10:59:56] INFO: POST / 201
    req: {
      "id": 19,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "117"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "169",
        "etag": "W/\"a9-2ifrhq7qOiANM3MqVHRd0/0WWdk\""
      }
    }
    responseTime: 146
✨ Created Category: [FOOD] Mexican Cuisine (QZIs1Y84ZOoq0q7vtaOI)
[10:59:56] INFO: POST / 201
    req: {
      "id": 20,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "122"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "174",
        "etag": "W/\"ae-qjf9wcrYhUDL8D/SxuWrAHZGg6U\""
      }
    }
    responseTime: 150
✨ Created Category: [FOOD] Turkish Cuisine (FrxHSdEHYxN1B53Vxbr8)
[10:59:57] INFO: POST / 201
    req: {
      "id": 21,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "112"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "164",
        "etag": "W/\"a4-uc0KOFPCeOWCgXokOuqLsFAMWqc\""
      }
    }
    responseTime: 143
✨ Created Category: [FOOD] Georgian Cuisine (Yp3bosDxsSIT4iBF81VW)
[10:59:57] INFO: POST / 201
    req: {
      "id": 22,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "119"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "171",
        "etag": "W/\"ab-o5yKo3O6i/dPnJZ5AAK+KwBoNGo\""
      }
    }
    responseTime: 151
✨ Created Category: [FOOD] Steakhouse (WcdPFNpjYprfHXETfp94)
[10:59:57] INFO: POST / 201
    req: {
      "id": 23,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "93"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "145",
        "etag": "W/\"91-W7j5BYj3qDd6K9bq1XW0Lp1KodU\""
      }
    }
    responseTime: 162
✨ Created Category: [FOOD] Halal (1ON5ei38s0fqSWYQzfaP)
[10:59:57] INFO: POST / 201
    req: {
      "id": 24,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "77"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "129",
        "etag": "W/\"81-Nna70NvhSMO4+N099MUdYjhxLdE\""
      }
    }
    responseTime: 137
✨ Created Category: [FOOD] Street Food (YOdZXb2CDJD56It5Ji5M)
[10:59:57] INFO: POST / 201
    req: {
      "id": 25,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "106"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "158",
        "etag": "W/\"9e-253jXyj2h71YgsvL9HFtHwlsKiM\""
      }
    }
    responseTime: 181
✨ Created Category: [FOOD] Soups (SQVV1ovJFK7hW1jV217G)
[10:59:57] INFO: POST / 201
    req: {
      "id": 26,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "77"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "129",
        "etag": "W/\"81-R0IuKeMjzkjokUCSytFOUNqSVj4\""
      }
    }
    responseTime: 164
✨ Created Category: [FOOD] Healthy Food (RyUePGLEB9JEcVv6La1M)
[10:59:58] INFO: POST / 201
    req: {
      "id": 27,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "115"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "167",
        "etag": "W/\"a7-alrQl1R40RIGfmGJjMOu2hNp4lM\""
      }
    }
    responseTime: 153
✨ Created Category: [FOOD] Ice Cream (MNkuwIe6TvBKKeW6ylZ1)
[10:59:58] INFO: POST / 201
    req: {
      "id": 28,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "90"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "142",
        "etag": "W/\"8e-V+Hbd4fdVal1NLud4uM748tD75s\""
      }
    }
    responseTime: 142
✨ Created Category: [FOOD] Sandwiches (IHLJfcBVtelws2qgXKoo)
[10:59:58] INFO: POST / 201
    req: {
      "id": 29,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "93"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "145",
        "etag": "W/\"91-BH1X8D4YX50m9I2HdCUcQIJs3a4\""
      }
    }
    responseTime: 161
✨ Created Category: [FOOD] Noodles & Pasta (ZOMowUMbED5ys0SVbh6E)
[10:59:58] INFO: POST / 201
    req: {
      "id": 30,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "112"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "164",
        "etag": "W/\"a4-SPYZypINTHWgGXTybx22Fh2LuBw\""
      }
    }
    responseTime: 159
✨ Created Category: [FOOD] BBQ (xR4KczJUIkkJDiOcE1wx)
[10:59:58] INFO: POST / 201
    req: {
      "id": 31,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "86"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "138",
        "etag": "W/\"8a-G6gVedj+2YMMM5AdG5aYM7T7Jgw\""
      }
    }
    responseTime: 175
✨ Created Category: [HOTEL] 5 Star Resort (HEAkJdgcL3IYqIE8ATym)
[10:59:58] INFO: POST / 201
    req: {
      "id": 32,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "120"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "172",
        "etag": "W/\"ac-R4t6KbkXComyRx+gjDW/krjhN74\""
      }
    }
    responseTime: 197
✨ Created Category: [HOTEL] Boutique Hotel (QjAHYArmp3QjJbm3tjLa)
[10:59:59] INFO: POST / 201
    req: {
      "id": 33,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "101"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "153",
        "etag": "W/\"99-YEsOKHZy6N1LofI58CjbCLFGAis\""
      }
    }
    responseTime: 188
✨ Created Category: [HOTEL] Business Hotel (gXHrgBbHxBoiWw59As30)
[10:59:59] INFO: POST / 201
    req: {
      "id": 34,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "104"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "156",
        "etag": "W/\"9c-CvaVpZIUKXDNP9HkTv401HvgytU\""
      }
    }
    responseTime: 169
✨ Created Category: [HOTEL] Apart Hotel (nCNA1gz06MoUSU5hxmfB)
[10:59:59] INFO: POST / 201
    req: {
      "id": 35,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "98"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "150",
        "etag": "W/\"96-VNeaLcvwD0ficoPuPDU7DeYeg30\""
      }
    }
    responseTime: 135
✨ Created Category: [HOTEL] Hostel (XmeFVZD1bd4JnStBWLSv)
[10:59:59] INFO: POST / 201
    req: {
      "id": 36,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "80"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "132",
        "etag": "W/\"84-zwYMwwH8tcdG7IrdIGXKrbDx1Eg\""
      }
    }
    responseTime: 139
✨ Created Category: [HOTEL] Villa (iJMSEv3dfcWnNRM1zBbB)
[10:59:59] INFO: POST / 201
    req: {
      "id": 37,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "76"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "128",
        "etag": "W/\"80-fk7qjqGfhIfUf0FGFNL+hgkCi3Q\""
      }
    }
    responseTime: 138
✨ Created Category: [HOTEL] Spa Hotel (Kw48RRcCCy6wSBWuxJzc)
[10:59:59] INFO: POST / 201
    req: {
      "id": 38,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "90"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "142",
        "etag": "W/\"8e-aRXFXg71+CFqpI98RbMg/s4Mo8s\""
      }
    }
    responseTime: 135
✨ Created Category: [HOTEL] Family Hotel (PsIqWTEkGc86PbKBeq6h)
[11:00:00] INFO: POST / 201
    req: {
      "id": 39,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "106"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "158",
        "etag": "W/\"9e-L8asFmjllPMNx71DRSCJd426mzU\""
      }
    }
    responseTime: 153
✨ Created Category: [HOTEL] Budget Hotel (OlWp6BiotWK4KQtgCWQV)
[11:00:00] INFO: POST / 201
    req: {
      "id": 40,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "110"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "162",
        "etag": "W/\"a2-je0dD7TvxFssJd3WOZ5UPcpzDIs\""
      }
    }
    responseTime: 136
✨ Created Category: [HOTEL] Airport Hotel (IvuW3UdjlIQX3B2XH9Fd)
[11:00:00] INFO: POST / 201
    req: {
      "id": 41,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "131"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "183",
        "etag": "W/\"b7-nnVnptuR+SDZ00s9W79OqQ8eTN0\""
      }
    }
    responseTime: 153
✨ Created Category: [HOTEL] Beach Hotel (5tbLkMkzHQlnQOViJrSj)
[11:00:00] INFO: POST / 201
    req: {
      "id": 42,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "108"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "160",
        "etag": "W/\"a0-bCDdQmFBXS0SoTGCdAdPfTWk/dk\""
      }
    }
    responseTime: 130
✨ Created Category: [HOTEL] Mountain Lodge (VODQvPMETiyAEIpUjvxv)
[11:00:00] INFO: POST / 201
    req: {
      "id": 43,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "103"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "155",
        "etag": "W/\"9b-sKTCTp2dZLOP1OwbpfLEcaIUq7I\""
      }
    }
    responseTime: 139
✨ Created Category: [HOTEL] All-Inclusive Resort (Yogx3A1uKMCr2hMsaxFa)
[11:00:00] INFO: POST / 201
    req: {
      "id": 44,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "138"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "190",
        "etag": "W/\"be-5AbIGBdO4L7xcG7NbO5EIPD00SI\""
      }
    }
    responseTime: 142
✨ Created Category: [HOTEL] Guesthouse (wzc1h6jzvUzhqxX8z21c)
[11:00:00] INFO: POST / 201
    req: {
      "id": 45,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "98"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "150",
        "etag": "W/\"96-vDEtGphnWwiGOUZJH3JKHgaiEyU\""
      }
    }
    responseTime: 135
✨ Created Category: [HOTEL] Extended Stay (CQ9lD158T7ASbK3tfvog)
[11:00:01] INFO: POST / 201
    req: {
      "id": 46,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "139"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "191",
        "etag": "W/\"bf-LfhZUfeuSECoZCpc1W+REEQw0lw\""
      }
    }
    responseTime: 139
✨ Created Category: [HOTEL] Eco Hotel (DKiEPhf7cVaFWNYlSkJO)
[11:00:01] INFO: POST / 201
    req: {
      "id": 47,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "90"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "142",
        "etag": "W/\"8e-mpzYK0SJ/x8D7EKrBSWgDLYeec8\""
      }
    }
    responseTime: 137
✨ Created Category: [HOTEL] Historic Hotel (LGfxIPzIkWzInUPz22ea)
[11:00:01] INFO: POST / 201
    req: {
      "id": 48,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "116"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "168",
        "etag": "W/\"a8-HH9whBg/hsixxswuNxEanS0OEIU\""
      }
    }
    responseTime: 117
✨ Created Category: [HOTEL] Casino Hotel (50vY5bZJWrLu92XmX1fJ)
[11:00:01] INFO: POST / 201
    req: {
      "id": 49,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "106"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "158",
        "etag": "W/\"9e-fnK6XTjoPPLwPibhvj2thP/DASI\""
      }
    }
    responseTime: 132
✨ Created Category: [RENT_A_CAR] Sedan (6syrRK4sOgVpS7A1ljo5)
[11:00:01] INFO: POST / 201
    req: {
      "id": 50,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "81"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "133",
        "etag": "W/\"85-v/jf/TiyjAmT0nouvSHGVQv0POw\""
      }
    }
    responseTime: 147
✨ Created Category: [RENT_A_CAR] SUV & Crossover (LnzJ2gSfQiWD9bHr8NLy)
[11:00:01] INFO: POST / 201
    req: {
      "id": 51,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "137"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "189",
        "etag": "W/\"bd-qukDzTN6DQIuc2d6TyUL6WGjdAQ\""
      }
    }
    responseTime: 141
✨ Created Category: [RENT_A_CAR] Luxury (kSFkOdB1a0Ivll5cw4hd)
[11:00:02] INFO: POST / 201
    req: {
      "id": 52,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "80"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "132",
        "etag": "W/\"84-yRN0mijH/JlVSqeUi/v77qbHAvU\""
      }
    }
    responseTime: 136
✨ Created Category: [RENT_A_CAR] Economy (zI2BnEsb6PqSakGntodO)
[11:00:02] INFO: POST / 201
    req: {
      "id": 53,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "86"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "138",
        "etag": "W/\"8a-Muf+OeNkg6XEPyQKL3HgmKA6Uig\""
      }
    }
    responseTime: 173
✨ Created Category: [RENT_A_CAR] Minivan (SNNRSgoCHAvV4m8w76JY)
[11:00:02] INFO: POST / 201
    req: {
      "id": 54,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "89"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "141",
        "etag": "W/\"8d-KTVLZ4R9DoczDzJkheHkbR1koe4\""
      }
    }
    responseTime: 183
✨ Created Category: [RENT_A_CAR] Pickup (Rb8u5DYExpnWcaskQPrr)
[11:00:02] INFO: POST / 201
    req: {
      "id": 55,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "83"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "135",
        "etag": "W/\"87-kBEoOKOlV68WIKqd9d/w/Ptg/jc\""
      }
    }
    responseTime: 136
✨ Created Category: [RENT_A_CAR] Sports Car (QaOeAwZvYa8KTtYJEk5C)
[11:00:02] INFO: POST / 201
    req: {
      "id": 56,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "129"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "181",
        "etag": "W/\"b5-RcFxNilAlBy3O7W403mUnbWadd8\""
      }
    }
    responseTime: 140
✨ Created Category: [RENT_A_CAR] Electric (ugUrLBSX9J4Tzxc00qJG)
[11:00:02] INFO: POST / 201
    req: {
      "id": 57,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "105"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "157",
        "etag": "W/\"9d-oI7mVj/SxeTTQMJf4pnWKUYroyY\""
      }
    }
    responseTime: 135
✨ Created Category: [RENT_A_CAR] Classic (wZe13OWZSo1dog312C2N)
[11:00:03] INFO: POST / 201
    req: {
      "id": 58,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "99"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "151",
        "etag": "W/\"97-uyr30RH+ACpzy2kdK+ZuDYbE7uw\""
      }
    }
    responseTime: 251
✨ Created Category: [RENT_A_CAR] Hatchback (yET2RkxRg5WdcC979hE2)
[11:00:03] INFO: POST / 201
    req: {
      "id": 59,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "92"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "144",
        "etag": "W/\"90-gA4RvxTGwJDYLQ8ul8/ZWkdAFXw\""
      }
    }
    responseTime: 173
✨ Created Category: [RENT_A_CAR] Convertible (xxmCXQPrulQef5ggdQUM)
[11:00:03] INFO: POST / 201
    req: {
      "id": 60,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "99"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "151",
        "etag": "W/\"97-Y7SVgJD1/EvpiCglfaoeXjDahsQ\""
      }
    }
    responseTime: 137
✨ Created Category: [RENT_A_CAR] Van (NEHuug16IfKjEV5DJsam)
[11:00:03] INFO: POST / 201
    req: {
      "id": 61,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "82"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "134",
        "etag": "W/\"86-KJptS+TDaJ6zG49JxF4kyWYAIto\""
      }
    }
    responseTime: 134
✨ Created Category: [RENT_A_CAR] Off-road & 4x4 (ODSa9ApbPIVm14Wf4DqS)
[11:00:03] INFO: POST / 201
    req: {
      "id": 62,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "117"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "169",
        "etag": "W/\"a9-sCSeJFHF70ArS2Hy2QbP41xjv1c\""
      }
    }
    responseTime: 152
✨ Created Category: [RENT_A_CAR] Business Class (b9oISAUyjWvdFsYPOOc0)
[11:00:03] INFO: POST / 201
    req: {
      "id": 63,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "109"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "161",
        "etag": "W/\"a1-gpVWXisSFcIIqj/mprueOxaR5pA\""
      }
    }
    responseTime: 135
✨ Created Category: [RENT_A_CAR] Wedding Cars (lAiMjZOxHsxNZBM0A71W)
[11:00:04] INFO: POST / 201
    req: {
      "id": 64,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "130"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "182",
        "etag": "W/\"b6-LUkKeDP1IxEdYVSk4D+ihTVmE/Y\""
      }
    }
    responseTime: 177
✨ Created Category: [RENT_A_CAR] Chauffeur Service (hM1hA51ozA8L8eQHiaoZ)
[11:00:04] INFO: POST / 201
    req: {
      "id": 65,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "124"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "176",
        "etag": "W/\"b0-ZtSWqSKb1wJQiAqUapJLhkLwn30\""
      }
    }
    responseTime: 168
✨ Created Category: [RENT_A_CAR] Motorcycle (pcoiZv1HP9OEFxwbIP4h)
[11:00:04] INFO: POST / 201
    req: {
      "id": 66,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "97"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-3IkFDwITSReNFQnFc2keIXzOEx8\""
      }
    }
    responseTime: 149
✨ Created Category: [RENT_A_CAR] Long-term Rental (8S7zAoKJpyqiX6si8AU0)
[11:00:04] INFO: POST / 201
    req: {
      "id": 67,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "136"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "188",
        "etag": "W/\"bc-0aia61ADvGaPzAzWs0xUFENxxgY\""
      }
    }
    responseTime: 150
✨ Created Category: [RENT_A_CAR] Short-term Rental (7Vg9zpws5spyVx8aJZcJ)
[11:00:04] INFO: POST / 201
    req: {
      "id": 68,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "140"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "192",
        "etag": "W/\"c0-cgFCTPSpiCy2o6T3F1Nr4m4nxVM\""
      }
    }
    responseTime: 152
✨ Created Category: [RENT_A_CAR] Family Car (izKrmvgNlr2qIndz69sP)
[11:00:04] INFO: POST / 201
    req: {
      "id": 69,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "124"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "176",
        "etag": "W/\"b0-gOu4UfNh7R+zZc1LQAcABnHKR6c\""
      }
    }
    responseTime: 156
✨ Created Category: [TRAVEL] Historical & Cultural (a3QTTKOoDP8U7oF4bVkn)
[11:00:05] INFO: POST / 201
    req: {
      "id": 70,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "145"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "197",
        "etag": "W/\"c5-v8JFq4nz2iEf4LIurJtDaABc+9g\""
      }
    }
    responseTime: 125
✨ Created Category: [TRAVEL] Nature & Adventure (8q7cBaCGpUfCf3LHCYiH)
[11:00:05] INFO: POST / 201
    req: {
      "id": 71,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "135"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "187",
        "etag": "W/\"bb-/mucLrcEQTMvcJRrs/CPtryAO14\""
      }
    }
    responseTime: 139
✨ Created Category: [TRAVEL] City Tour (7WBRMoeOLnoL7IYV5T53)
[11:00:05] INFO: POST / 201
    req: {
      "id": 72,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "104"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "156",
        "etag": "W/\"9c-QRq4MtlOswzsZDEHrOrMjkvoopM\""
      }
    }
    responseTime: 135
✨ Created Category: [TRAVEL] Food Tour (Ay8YVYfvyTV4Q9hHaH8r)
[11:00:05] INFO: POST / 201
    req: {
      "id": 73,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "122"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "174",
        "etag": "W/\"ae-DgjFd3LCLi1f0PUjqdJ5bS95UdI\""
      }
    }
    responseTime: 151
✨ Created Category: [TRAVEL] Mountain Tourism (kVV4QrUNCyXUPhwfHGfA)
✨ Created Category: [TRAVEL] Beach Tour (uddy9HxGOPhIf0nblRyf)
[11:00:05] INFO: POST / 201
    req: {
      "id": 74,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "110"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "162",
        "etag": "W/\"a2-2cEa5FZmIvuyFfT9Fx41DN2aygg\""
      }
    }
    responseTime: 414
[11:00:06] INFO: POST / 201
    req: {
      "id": 75,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "103"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "155",
        "etag": "W/\"9b-W0wTChDkwhXua1crTlEdcNZSNuE\""
      }
    }
    responseTime: 160
✨ Created Category: [TRAVEL] Extreme Tour (B9dKt99C0zKw1vZAyxEn)
[11:00:06] INFO: POST / 201
    req: {
      "id": 76,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "113"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "165",
        "etag": "W/\"a5-WPkkOsU8apf0X7AM5Z5VgmchP3k\""
      }
    }
    responseTime: 154
✨ Created Category: [TRAVEL] Group Tour (jY2fPuuCkwWOBEoILQBa)
[11:00:06] INFO: POST / 201
    req: {
      "id": 77,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "101"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "153",
        "etag": "W/\"99-mutfetwNHrmOEHcsAYqDIfPgulc\""
      }
    }
    responseTime: 127
✨ Created Category: [TRAVEL] Private Tour (7rTxlDnMTvxTAnZyjhJZ)
[11:00:06] INFO: POST / 201
    req: {
      "id": 78,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "114"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "166",
        "etag": "W/\"a6-LZLbukC7pHrv+cSXzX0Fprmz6yg\""
      }
    }
    responseTime: 148
✨ Created Category: [TRAVEL] Honeymoon Package (yHatwSf8bBZUvjTnAcMK)
[11:00:06] INFO: POST / 201
    req: {
      "id": 79,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "114"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "166",
        "etag": "W/\"a6-KO1C+4ivjPOMvYRuLpfiNbonuQw\""
      }
    }
    responseTime: 135
✨ Created Category: [TRAVEL] Ski Tour (dourpvOIFUgY8pJBbQS9)
[11:00:06] INFO: POST / 201
    req: {
      "id": 80,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "95"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "147",
        "etag": "W/\"93-kYY1AqP4Re0wEKW8iHC9T2kO3Y0\""
      }
    }
    responseTime: 130
✨ Created Category: [TRAVEL] Cruise (8hVeco3pCi1YpMgjS0aD)
[11:00:06] INFO: POST / 201
    req: {
      "id": 81,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "89"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "141",
        "etag": "W/\"8d-DLOxkaRefB/QfKpccnN+nOd/Jno\""
      }
    }
    responseTime: 144
✨ Created Category: [TRAVEL] Religious Tourism (QzhjwwxcU5p2PNXBAIuH)
[11:00:07] INFO: POST / 201
    req: {
      "id": 82,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "120"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "172",
        "etag": "W/\"ac-qV0xx14q4UPj1Erp0zfjzFg4d5w\""
      }
    }
    responseTime: 140
✨ Created Category: [TRAVEL] Wildlife Safari (YNDqkCQNxOhMUwnTzAB0)
[11:00:07] INFO: POST / 201
    req: {
      "id": 83,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "109"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "161",
        "etag": "W/\"a1-3tL+P5xidEQE70BrjmXPR1XhR5E\""
      }
    }
    responseTime: 140
✨ Created Category: [TRAVEL] Photography Tour (6iAOVR2rCoszayhdufEA)
[11:00:07] INFO: POST / 201
    req: {
      "id": 84,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "103"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "155",
        "etag": "W/\"9b-SbXz1Pr/xpszwm+wF+HWgqruDQc\""
      }
    }
    responseTime: 125
✨ Created Category: [TRAVEL] Wine Tour (Ba5uB2V0Tm3cwbFaaLQo)
[11:00:07] INFO: POST / 201
    req: {
      "id": 85,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "97"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-/ZBDb2ZWSSQYnsKVEWnvkNnf6t0\""
      }
    }
    responseTime: 134
✨ Created Category: [TRAVEL] Family Package (QAPCJgaueQck5BrnMd7O)
[11:00:07] INFO: POST / 201
    req: {
      "id": 86,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "110"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "162",
        "etag": "W/\"a2-4adf4PL1AWyjdsxa/iosDaRmwSw\""
      }
    }
    responseTime: 148
✨ Created Category: [TRAVEL] Weekend Getaway (8K02GeLZqqp1iy51iQRu)

🧰 Seeding Included Services...
[11:00:07] INFO: POST / 201
    req: {
      "id": 87,
      "method": "POST",
      "url": "/api/categories",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "122"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "174",
        "etag": "W/\"ae-Pg9sC8qEjeEFnXt284Ux1ud2SSw\""
      }
    }
    responseTime: 134
✨ Created Included Service: [HOTEL] Free Wi-Fi (VCIhnZBJrtuhzdD6FZhT)
[11:00:07] INFO: POST /HOTEL 201
    req: {
      "id": 88,
      "method": "POST",
      "url": "/api/services/included-services/HOTEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "104"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "95",
        "etag": "W/\"5f-3Xw6eij4Wu1MPnN2hfpOHfpDuyg\""
      }
    }
    responseTime: 121
✨ Created Included Service: [HOTEL] Buffet Breakfast (SxZNeQBp4F7hFHAMDd0I)
[11:00:08] INFO: POST /HOTEL 201
    req: {
      "id": 89,
      "method": "POST",
      "url": "/api/services/included-services/HOTEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "110"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "101",
        "etag": "W/\"65-YM1T3YZYHOCirY4RmR+L1VyWH5o\""
      }
    }
    responseTime: 143
✨ Created Included Service: [HOTEL] Swimming Pool (zNPFqEVCM7LN2vzUct6q)
[11:00:08] INFO: POST /HOTEL 201
    req: {
      "id": 90,
      "method": "POST",
      "url": "/api/services/included-services/HOTEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "104"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "98",
        "etag": "W/\"62-2xqubJbjA1VsvnSNsrKEs54J4h8\""
      }
    }
    responseTime: 134
✨ Created Included Service: [HOTEL] Spa & Massage (UFu2FlQ8f6klRQK0Vz2a)
[11:00:08] INFO: POST /HOTEL 201
    req: {
      "id": 91,
      "method": "POST",
      "url": "/api/services/included-services/HOTEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "104"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "98",
        "etag": "W/\"62-wjMuhbwoFh3XFyKoh8g6817w468\""
      }
    }
    responseTime: 128
✨ Created Included Service: [HOTEL] Fitness Center (ZjR3NmJ1DgyhZQzNc1HD)
[11:00:08] INFO: POST /HOTEL 201
    req: {
      "id": 92,
      "method": "POST",
      "url": "/api/services/included-services/HOTEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "110"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "99",
        "etag": "W/\"63-NlxtETLObQZRr9GqGConPrWfYIA\""
      }
    }
    responseTime: 143
✨ Created Included Service: [HOTEL] Air Conditioning (82oAbbRUVp5NNJo7W25p)
[11:00:08] INFO: POST /HOTEL 201
    req: {
      "id": 93,
      "method": "POST",
      "url": "/api/services/included-services/HOTEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "105"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "101",
        "etag": "W/\"65-loIvcenDL++jRkWjVge9nDO4YW8\""
      }
    }
    responseTime: 131
✨ Created Included Service: [HOTEL] Bar & Restaurant (wKDuvwg2u4rXzKriZqPP)
[11:00:08] INFO: POST /HOTEL 201
    req: {
      "id": 94,
      "method": "POST",
      "url": "/api/services/included-services/HOTEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "114"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "101",
        "etag": "W/\"65-TfJYITjGXvMQZrCr11vPjoukJ4o\""
      }
    }
    responseTime: 137
✨ Created Included Service: [HOTEL] Parking (ED3N8JKi949fO0mzRLju)
[11:00:09] INFO: POST /HOTEL 201
    req: {
      "id": 95,
      "method": "POST",
      "url": "/api/services/included-services/HOTEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "92"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "92",
        "etag": "W/\"5c-uBYb0pgztan+du9mUx3VBy3oLXk\""
      }
    }
    responseTime: 146
✨ Created Included Service: [HOTEL] Room Service 24/7 (Qv1l63Ns2S25Kl1ouIRw)
[11:00:09] INFO: POST /HOTEL 201
    req: {
      "id": 96,
      "method": "POST",
      "url": "/api/services/included-services/HOTEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "130"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "102",
        "etag": "W/\"66-kcz8DvngJ8X1EdNzA3205J28p3c\""
      }
    }
    responseTime: 247
✨ Created Included Service: [HOTEL] Sea View (zR4xya3I3eVnRTU8dVlS)
[11:00:09] INFO: POST /HOTEL 201
    req: {
      "id": 97,
      "method": "POST",
      "url": "/api/services/included-services/HOTEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "103"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "93",
        "etag": "W/\"5d-EmV7WHjKmLAXfoGeKO9wrSe/V2o\""
      }
    }
    responseTime: 133
✨ Created Included Service: [TRAVEL] Professional Guide (LV0EOEOrk9uw95sZNSHY)
[11:00:09] INFO: POST /TRAVEL 201
    req: {
      "id": 98,
      "method": "POST",
      "url": "/api/services/included-services/TRAVEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "134"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "104",
        "etag": "W/\"68-laVXouh9NvQTl5pU5aLS+V2AZmA\""
      }
    }
    responseTime: 226
✨ Created Included Service: [TRAVEL] VIP Transfer (eFHJ5H4RxjAfz7BeUBPu)
[11:00:09] INFO: POST /TRAVEL 201
    req: {
      "id": 99,
      "method": "POST",
      "url": "/api/services/included-services/TRAVEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "105"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "98",
        "etag": "W/\"62-B62BaxUgQoJOQsR5CogMRp3GKKg\""
      }
    }
    responseTime: 121
✨ Created Included Service: [TRAVEL] Museum Tickets (9A4T98EG1KyvM06BuxSP)
[11:00:09] INFO: POST /TRAVEL 201
    req: {
      "id": 100,
      "method": "POST",
      "url": "/api/services/included-services/TRAVEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "113"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "100",
        "etag": "W/\"64-sS8IY+pN5F0QlnMTYwwl9V2G1VI\""
      }
    }
    responseTime: 164
✨ Created Included Service: [TRAVEL] National Lunch (YV1zbjHaziYHPzX3oTao)
[11:00:10] INFO: POST /TRAVEL 201
    req: {
      "id": 101,
      "method": "POST",
      "url": "/api/services/included-services/TRAVEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "115"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "100",
        "etag": "W/\"64-Lo6XoQXBsKfV7R4nI69JQ9kShY8\""
      }
    }
    responseTime: 124
✨ Created Included Service: [TRAVEL] Travel Insurance (feDGekgyquLVwRESc6mv)
[11:00:10] INFO: POST /TRAVEL 201
    req: {
      "id": 102,
      "method": "POST",
      "url": "/api/services/included-services/TRAVEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "104"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "102",
        "etag": "W/\"66-M00ZVm01Nhwd0tdyIZMi19Wb+pA\""
      }
    }
    responseTime: 151
✨ Created Included Service: [TRAVEL] Photo Service (XnRLblvgtnL9811frwK1)
[11:00:10] INFO: POST /TRAVEL 201
    req: {
      "id": 103,
      "method": "POST",
      "url": "/api/services/included-services/TRAVEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "105"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "99",
        "etag": "W/\"63-+6u0ddCKUOMLBBFtb7IVQkvCsXs\""
      }
    }
    responseTime: 144
✨ Created Included Service: [TRAVEL] Wine Tasting (pNnKniL0b6gDkTTXecAz)
[11:00:10] INFO: POST /TRAVEL 201
    req: {
      "id": 104,
      "method": "POST",
      "url": "/api/services/included-services/TRAVEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "109"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "98",
        "etag": "W/\"62-Xq0ccihRUOgZgCimeUV6FYhUH1g\""
      }
    }
    responseTime: 148
✨ Created Included Service: [TRAVEL] Cable Car Ticket (sccWAb8HN8D7NG59gMd8)

🍕 Seeding Food Domain...
[11:00:10] INFO: POST /TRAVEL 201
    req: {
      "id": 105,
      "method": "POST",
      "url": "/api/services/included-services/TRAVEL",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "122"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "102",
        "etag": "W/\"66-xQPbIsf1iuoHlMIdT22hhC9zgQs\""
      }
    }
    responseTime: 161
  📸 Uploaded food-co-1.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/foodCompanies%2F5f5c57f8-3d5b-498e-95d6-9a34eb65de8f.png
[11:00:12] INFO: POST /image?folder=foodCompanies 201
    req: {
      "id": 106,
      "method": "POST",
      "url": "/api/uploads/image?folder=foodCompanies",
      "query": {
        "folder": "foodCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-096549210415",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "2185"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "156",
        "etag": "W/\"9c-2lIxbLBO6j8Ff1yV/hpEty/0POQ\""
      }
    }
    responseTime: 1894
  📸 Uploaded food-co-2.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/foodCompanies%2F94432fa9-ebe9-414a-b661-29ceb307a22d.png
❌ Food company error: { success: false, errorCode: 'NOT_FOUND', message: 'Not found' }
[11:00:13] INFO: POST /image?folder=foodCompanies 201
    req: {
      "id": 107,
      "method": "POST",
      "url": "/api/uploads/image?folder=foodCompanies",
      "query": {
        "folder": "foodCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-031060653617",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1639"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "156",
        "etag": "W/\"9c-fW/OVjKtAJ/BWBHxboo3GNv9Bng\""
      }
    }
    responseTime: 1312
[11:00:13] WARN: POST /api/companies 404
    req: {
      "id": 108,
      "method": "POST",
      "url": "/api/companies",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "745"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "63",
        "etag": "W/\"3f-35P9NfJ0HOowTKDo5twz1DRpy88\""
      }
    }
    responseTime: 1
  📸 Uploaded food-co-2.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/foodCompanies%2Fcd7307d6-6be2-4cc7-9893-cd8fc473e8c6.png
[11:00:15] INFO: POST /image?folder=foodCompanies 201
    req: {
      "id": 109,
      "method": "POST",
      "url": "/api/uploads/image?folder=foodCompanies",
      "query": {
        "folder": "foodCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-024116164019",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1639"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "156",
        "etag": "W/\"9c-5zojeDzMocR9uIQgUKgR+ZLy4xA\""
      }
    }
    responseTime: 1051
  📸 Uploaded food-co-3.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/foodCompanies%2F837d49f4-814c-4cc5-8c1c-6d370d7e750b.png
❌ Food company error: { success: false, errorCode: 'NOT_FOUND', message: 'Not found' }
[11:00:16] INFO: POST /image?folder=foodCompanies 201
    req: {
      "id": 110,
      "method": "POST",
      "url": "/api/uploads/image?folder=foodCompanies",
      "query": {
        "folder": "foodCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-068993523946",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1473"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "156",
        "etag": "W/\"9c-VOean8z7kyKYzY6+5c9dUyMz3hw\""
      }
    }
    responseTime: 1094
[11:00:16] WARN: POST /api/companies 404
    req: {
      "id": 111,
      "method": "POST",
      "url": "/api/companies",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "700"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "63",
        "etag": "W/\"3f-35P9NfJ0HOowTKDo5twz1DRpy88\""
      }
    }
    responseTime: 1
  📸 Uploaded food-co-3.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/foodCompanies%2Fa98a927c-34e4-453c-9ece-2c7298e4095a.png
[11:00:17] INFO: POST /image?folder=foodCompanies 201
    req: {
      "id": 112,
      "method": "POST",
      "url": "/api/uploads/image?folder=foodCompanies",
      "query": {
        "folder": "foodCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-025303773725",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1473"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "156",
        "etag": "W/\"9c-6I9lRRqnJ5iyzkdO/F2/DPk7CO4\""
      }
    }
    responseTime: 1058
  📸 Uploaded food-co-4.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/foodCompanies%2Fcfb184e2-5080-4ebd-bcdc-1efd310a170a.png
❌ Food company error: { success: false, errorCode: 'NOT_FOUND', message: 'Not found' }
[11:00:18] INFO: POST /image?folder=foodCompanies 201
    req: {
      "id": 113,
      "method": "POST",
      "url": "/api/uploads/image?folder=foodCompanies",
      "query": {
        "folder": "foodCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-053907122217",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "2091"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "156",
        "etag": "W/\"9c-twQKxVKvn5tnbQtMcn0cer7FyNA\""
      }
    }
    responseTime: 1102
[11:00:18] WARN: POST /api/companies 404
    req: {
      "id": 114,
      "method": "POST",
      "url": "/api/companies",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "718"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "63",
        "etag": "W/\"3f-35P9NfJ0HOowTKDo5twz1DRpy88\""
      }
    }
    responseTime: 1
  📸 Uploaded food-co-4.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/foodCompanies%2F5856518a-a49d-4175-ac00-9d9389e56b96.png
[11:00:20] INFO: POST /image?folder=foodCompanies 201
    req: {
      "id": 115,
      "method": "POST",
      "url": "/api/uploads/image?folder=foodCompanies",
      "query": {
        "folder": "foodCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-096955193421",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "2091"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "156",
        "etag": "W/\"9c-7qZcdYxxMuDk6i8mi0bIJ0w6o7I\""
      }
    }
    responseTime: 1852
  📸 Uploaded food-co-5.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/foodCompanies%2F328da9f7-efc7-4e79-8b69-fce40eb0d255.png
❌ Food company error: { success: false, errorCode: 'NOT_FOUND', message: 'Not found' }

🏨 Seeding Hotel Domain...
[11:00:21] INFO: POST /image?folder=foodCompanies 201
    req: {
      "id": 116,
      "method": "POST",
      "url": "/api/uploads/image?folder=foodCompanies",
      "query": {
        "folder": "foodCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-072400290553",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1655"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "156",
        "etag": "W/\"9c-Cke/j5a5zQW8PRaMGCBXoh7vHmY\""
      }
    }
    responseTime: 1181
[11:00:21] WARN: POST /api/companies 404
    req: {
      "id": 117,
      "method": "POST",
      "url": "/api/companies",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "732"
      },
      "remoteAddress": "::1",
      "remotePort": 51263
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "63",
        "etag": "W/\"3f-35P9NfJ0HOowTKDo5twz1DRpy88\""
      }
    }
    responseTime: 1
  📸 Uploaded hotel-1.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F453b3425-a439-4651-8b18-960d8155b297.jpg
[11:00:25] INFO: POST /image?folder=hotels 201
    req: {
      "id": 118,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-074527227690",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "264941"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-gP5JvxJa3eEx+XLr/shbm5IkaBE\""
      }
    }
    responseTime: 3835
  📸 Uploaded hotel-2.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2Fc0e149a9-17ad-4c4d-b769-69b9074c9cdf.jpg
[11:00:27] INFO: POST /image?folder=hotels 201
    req: {
      "id": 119,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-013337010317",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "222226"
      },
      "remoteAddress": "::1",
      "remotePort": 51307
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-ukM7wBvwHS9XNXErHAj/2OoqfVg\""
      }
    }
    responseTime: 2566
  📸 Uploaded hotel-3.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2Fc53a7425-3cdb-486e-a0a6-73f51699fc23.jpg
✨ Created Hotel: Grand Hotel Europe Baku (jjsORYT8xPwQ045zL942)
[11:00:30] INFO: POST /image?folder=hotels 201
    req: {
      "id": 120,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-003828529393",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "174163"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-ncLpCw+QX8U/Soawd3xJrN+fIcE\""
      }
    }
    responseTime: 2265
[11:00:30] INFO: POST / 201
    req: {
      "id": 121,
      "method": "POST",
      "url": "/api/services/hotel",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "878"
      },
      "remoteAddress": "::1",
      "remotePort": 51307
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "750",
        "etag": "W/\"2ee-AKfxPe0QEwF2Vg+FEi8lmy83IJg\""
      }
    }
    responseTime: 750
  📸 Uploaded room_1.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F90d75b6a-fdb7-415d-85b3-6c2d6aad552c.jpg
[11:00:45] INFO: POST /image?folder=hotels 201
    req: {
      "id": 122,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-061050040456",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1435270"
      },
      "remoteAddress": "::1",
      "remotePort": 51260
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-yR0NEP42jyNc7av0TPJldZKONM0\""
      }
    }
    responseTime: 14396
  📸 Uploaded room_2.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F8c9a5583-bcd4-4948-9547-63c49dd03e0e.jpg
  🛏️ Created Room: Deluxe King Room with Sea View (with 2 images)
[11:00:56] INFO: POST /image?folder=hotels 201
    req: {
      "id": 123,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-072061310881",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1243943"
      },
      "remoteAddress": "::1",
      "remotePort": 51326
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-BK5BL8xR75wXNgcDL/9f5EEpBwY\""
      }
    }
    responseTime: 11096
[11:00:56] INFO: POST /rooms 201
    req: {
      "id": 124,
      "method": "POST",
      "url": "/api/services/hotel/rooms",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "773"
      },
      "remoteAddress": "::1",
      "remotePort": 51334
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "567",
        "etag": "W/\"237-W4DoLMtMf/39lHTmxyFgScjQ/Ag\""
      }
    }
    responseTime: 601
  📸 Uploaded room_2.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F5a7ba64f-d15d-433f-859b-1a0a0862940f.jpg
[11:01:08] INFO: POST /image?folder=hotels 201
    req: {
      "id": 125,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-010255502816",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1243943"
      },
      "remoteAddress": "::1",
      "remotePort": 51326
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-kKil3uzaI2AFK4CETgBwgPZyEm0\""
      }
    }
    responseTime: 11069
  📸 Uploaded room_3.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F735a3c33-1136-47fe-92df-f1870aaae16a.jpg
[11:01:09] INFO: POST /image?folder=hotels 201
    req: {
      "id": 126,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-020011729955",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "67296"
      },
      "remoteAddress": "::1",
      "remotePort": 51341
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-Px+HJPIhS9DxKvG8fGls17qYN9g\""
      }
    }
    responseTime: 1355
  🛏️ Created Room: Executive Suite with Lounge Access (with 2 images)
[11:01:10] INFO: POST /rooms 201
    req: {
      "id": 127,
      "method": "POST",
      "url": "/api/services/hotel/rooms",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "761"
      },
      "remoteAddress": "::1",
      "remotePort": 51326
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "562",
        "etag": "W/\"232-y1I6tnQVNp3OpDO7ROF77a/zf0Q\""
      }
    }
    responseTime: 645
  📸 Uploaded room_3.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F5cacc025-94b5-4842-ada2-16ef7685270f.jpg
[11:01:11] INFO: POST /image?folder=hotels 201
    req: {
      "id": 128,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-025106529954",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "67296"
      },
      "remoteAddress": "::1",
      "remotePort": 51341
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-TvC+rdOqn0CGEqfThRFxeoxDhvg\""
      }
    }
    responseTime: 1272
  📸 Uploaded room_4.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2Fa8f6e2b9-a75d-47b0-97c3-bfca1ac31aeb.jpg
[11:01:14] INFO: POST /image?folder=hotels 201
    req: {
      "id": 129,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-074200178455",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "249510"
      },
      "remoteAddress": "::1",
      "remotePort": 51326
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-LsTQ5R7idWGs3mzCdtnN/EXxBTA\""
      }
    }
    responseTime: 2762
  🛏️ Created Room: Standard Twin Room (with 2 images)
[11:01:14] INFO: POST /rooms 201
    req: {
      "id": 130,
      "method": "POST",
      "url": "/api/services/hotel/rooms",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "763"
      },
      "remoteAddress": "::1",
      "remotePort": 51341
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "551",
        "etag": "W/\"227-wrJmQKiJEBIrBMIyV9q5Dk5Y8XQ\""
      }
    }
    responseTime: 601
  📸 Uploaded room_4.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F41ce6fa5-cd4d-45ad-86e7-4c8708d846d8.jpg
[11:01:17] INFO: POST /image?folder=hotels 201
    req: {
      "id": 131,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-083846187675",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "249510"
      },
      "remoteAddress": "::1",
      "remotePort": 51326
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-wU2kt/9Gck/haGeMtT1gTBqwUJQ\""
      }
    }
    responseTime: 2725
  📸 Uploaded room_1.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2Fb5838df0-d50f-4cac-8d82-8897153faf75.jpg
[11:01:30] INFO: POST /image?folder=hotels 201
    req: {
      "id": 132,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-074678278771",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1435270"
      },
      "remoteAddress": "::1",
      "remotePort": 51341
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-b1wsY6GqnLZA53n3FbGPkEOfmos\""
      }
    }
    responseTime: 13224
  🛏️ Created Room: Superior Family Suite (with 2 images)
[11:01:31] INFO: POST /rooms 201
    req: {
      "id": 133,
      "method": "POST",
      "url": "/api/services/hotel/rooms",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "712"
      },
      "remoteAddress": "::1",
      "remotePort": 51365
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "548",
        "etag": "W/\"224-jzgfIh2hUNlQOlTeYcudlCt8AK8\""
      }
    }
    responseTime: 668
  📸 Uploaded hotel-2.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2Fd5186801-8352-4378-b5f5-bd962c01ad46.jpg
[11:01:34] INFO: POST /image?folder=hotels 201
    req: {
      "id": 134,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-028233634689",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "222226"
      },
      "remoteAddress": "::1",
      "remotePort": 51341
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-DhpA+AhqLg4lE01f4d8XXoXLWLM\""
      }
    }
    responseTime: 2731
  📸 Uploaded hotel-3.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2Ff3573a8d-4d43-4ae3-8636-4b1a0d9a809f.jpg
[11:01:36] INFO: POST /image?folder=hotels 201
    req: {
      "id": 135,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-016249882460",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "174163"
      },
      "remoteAddress": "::1",
      "remotePort": 51365
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-RnGPQLWDHdkwcAhzOniebwREd38\""
      }
    }
    responseTime: 2401
  📸 Uploaded hotel-4.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2Fd5376404-fb4f-4605-98ef-41c2b815cc12.jpg
[11:01:38] INFO: POST /image?folder=hotels 201
    req: {
      "id": 136,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-005816064417",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "147945"
      },
      "remoteAddress": "::1",
      "remotePort": 51341
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-pc57/ejvtMXygKCppWodhw/4G8k\""
      }
    }
    responseTime: 2221
✨ Created Hotel: Hilton Baku Executive (EBoQWOMEngZqAJuWSirg)
[11:01:39] INFO: POST / 201
    req: {
      "id": 137,
      "method": "POST",
      "url": "/api/services/hotel",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "879"
      },
      "remoteAddress": "::1",
      "remotePort": 51365
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "728",
        "etag": "W/\"2d8-EuUbMP5GsUoASbQe7Bdf0W81zYM\""
      }
    }
    responseTime: 744
  📸 Uploaded room_2.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2Fd352e5ee-3254-4f5a-b579-7f494dffc056.jpg
[11:01:51] INFO: POST /image?folder=hotels 201
    req: {
      "id": 138,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-083932862248",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1243943"
      },
      "remoteAddress": "::1",
      "remotePort": 51341
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-DD7a9qVgrvs2q81ByJ7dgXZLKW8\""
      }
    }
    responseTime: 12019
  📸 Uploaded room_3.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F14b66117-535c-44ac-a092-ecf8183fa162.jpg
[11:01:52] INFO: POST /image?folder=hotels 201
    req: {
      "id": 139,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-048584957161",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "67296"
      },
      "remoteAddress": "::1",
      "remotePort": 51403
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-PW2pdw5J+wLml3CM4Uwt3muAXZw\""
      }
    }
    responseTime: 1317
  🛏️ Created Room: King Guest Room (with 2 images)
[11:01:53] INFO: POST /rooms 201
    req: {
      "id": 140,
      "method": "POST",
      "url": "/api/services/hotel/rooms",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "711"
      },
      "remoteAddress": "::1",
      "remotePort": 51341
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "550",
        "etag": "W/\"226-oi7F2kzAY6lVu2E2bTP950xjOKw\""
      }
    }
    responseTime: 599
  📸 Uploaded room_3.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2Fa2b22ca6-968f-4c8d-91bf-6cea27681384.jpg
[11:01:54] INFO: POST /image?folder=hotels 201
    req: {
      "id": 141,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-069351365122",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "67296"
      },
      "remoteAddress": "::1",
      "remotePort": 51403
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-ekkLo/ekI+al7n0vYBatW0bBCGI\""
      }
    }
    responseTime: 1362
  📸 Uploaded room_4.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F2eeec521-77cc-46be-8f40-ae44f5f728f3.jpg
  🛏️ Created Room: Executive King Suite (with 2 images)
[11:01:57] INFO: POST /image?folder=hotels 201
    req: {
      "id": 142,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-078102258776",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "249510"
      },
      "remoteAddress": "::1",
      "remotePort": 51341
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-1UFT3rNmtI1WXpsSeqdCHeANCpc\""
      }
    }
    responseTime: 3047
[11:01:58] INFO: POST /rooms 201
    req: {
      "id": 143,
      "method": "POST",
      "url": "/api/services/hotel/rooms",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "792"
      },
      "remoteAddress": "::1",
      "remotePort": 51405
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "579",
        "etag": "W/\"243-hyy/ktAw4BckeVuzNT+G4y9rSMQ\""
      }
    }
    responseTime: 633
  📸 Uploaded room_4.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2Fbb00051c-af3e-498b-9b55-08ac58253efb.jpg
[11:02:01] INFO: POST /image?folder=hotels 201
    req: {
      "id": 144,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-043932042832",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "249510"
      },
      "remoteAddress": "::1",
      "remotePort": 51341
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-hl7hnEvQWTbEWYhWoUTFWvjU1Tk\""
      }
    }
    responseTime: 2961
  📸 Uploaded room_1.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2Ff15e48bb-6c86-4380-a3a3-a6d1203b1b52.jpg
  🛏️ Created Room: Presidential Suite (with 2 images)
[11:02:16] INFO: POST /image?folder=hotels 201
    req: {
      "id": 145,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-025984809502",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1435270"
      },
      "remoteAddress": "::1",
      "remotePort": 51405
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-7Oq/seusr1rpymsrY/a8KBlqsis\""
      }
    }
    responseTime: 14879
[11:02:17] INFO: POST /rooms 201
    req: {
      "id": 146,
      "method": "POST",
      "url": "/api/services/hotel/rooms",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "722"
      },
      "remoteAddress": "::1",
      "remotePort": 51430
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "552",
        "etag": "W/\"228-jOvMuNPOmydESc1BUoBo1EKBcw4\""
      }
    }
    responseTime: 825
  📸 Uploaded hotel-3.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2Ff0efd751-47ee-47eb-a5ba-e62fa894534c.jpg
[11:02:20] INFO: POST /image?folder=hotels 201
    req: {
      "id": 147,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-045011313655",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "174163"
      },
      "remoteAddress": "::1",
      "remotePort": 51405
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-KDJzOuJKn+t1cj6ikdNeGdDaIH4\""
      }
    }
    responseTime: 3180
  📸 Uploaded hotel-4.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F635b2f0c-da32-4bb0-b90d-15eadf0e9701.jpg
[11:02:23] INFO: POST /image?folder=hotels 201
    req: {
      "id": 148,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-055294227711",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "147945"
      },
      "remoteAddress": "::1",
      "remotePort": 51431
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-gz/OlqyEHqXP45J/4jIcne2OYTc\""
      }
    }
    responseTime: 3156
  📸 Uploaded hotel-5.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F921c990e-d1be-4ae0-bc8a-7d35b2c7e9a7.jpg
[11:02:28] INFO: POST /image?folder=hotels 201
    req: {
      "id": 149,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-048170361264",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "165600"
      },
      "remoteAddress": "::1",
      "remotePort": 51447
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-F2HV6SqiF038ky3pYCP4olzeNkc\""
      }
    }
    responseTime: 4732
✨ Created Hotel: Fairmont Flame Towers (JoY3gaVYWmSt6ACruNgd)
[11:02:29] INFO: POST / 201
    req: {
      "id": 150,
      "method": "POST",
      "url": "/api/services/hotel",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "841"
      },
      "remoteAddress": "::1",
      "remotePort": 51451
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "724",
        "etag": "W/\"2d4-wAQvkZJAWMcX3IW//IC0AAcg5r4\""
      }
    }
    responseTime: 873
  📸 Uploaded room_3.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F8a92714a-df22-4334-8a67-20a768c865e4.jpg
[11:02:30] INFO: POST /image?folder=hotels 201
    req: {
      "id": 151,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-058673423375",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "67296"
      },
      "remoteAddress": "::1",
      "remotePort": 51447
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-jzmnPTUE47bZwBikQqFaXbl/J8A\""
      }
    }
    responseTime: 1365
  📸 Uploaded room_4.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F0af4bc50-2489-4fa5-8204-f2fbafd3803b.jpg
[11:02:34] INFO: POST /image?folder=hotels 201
    req: {
      "id": 152,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-010870232580",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "249510"
      },
      "remoteAddress": "::1",
      "remotePort": 51451
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-EAshk6Sv23MK/0o4COqH+C8Vwl0\""
      }
    }
    responseTime: 3498
  🛏️ Created Room: Deluxe City View Room (with 2 images)
[11:02:34] INFO: POST /rooms 201
    req: {
      "id": 153,
      "method": "POST",
      "url": "/api/services/hotel/rooms",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "784"
      },
      "remoteAddress": "::1",
      "remotePort": 51455
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "558",
        "etag": "W/\"22e-hdF/NYwmfqsXXWhEpROG3srLFOM\""
      }
    }
    responseTime: 697
  📸 Uploaded room_4.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F2b0c90f6-4df0-4e11-8cad-fe742d6443b0.jpg
[11:02:38] INFO: POST /image?folder=hotels 201
    req: {
      "id": 154,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-009391218420",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "249510"
      },
      "remoteAddress": "::1",
      "remotePort": 51451
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-6NdymX+x83Dd+Oa7hv8RjfhGgXk\""
      }
    }
    responseTime: 3789
  📸 Uploaded room_1.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/hotels%2F488334d5-60aa-4a38-99ac-808c4e385ecd.jpg
[11:02:54] INFO: POST /image?folder=hotels 201
    req: {
      "id": 155,
      "method": "POST",
      "url": "/api/uploads/image?folder=hotels",
      "query": {
        "folder": "hotels"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-016905807263",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1435270"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "149",
        "etag": "W/\"95-0fw48K8NTyq8pswLPsV0qzW9QZ4\""
      }
    }
    responseTime: 15452
  🛏️ Created Room: Flame Towers Grand Suite (with 2 images)

🚗 Seeding Rent-A-Car Domain...
[11:02:54] INFO: POST /rooms 201
    req: {
      "id": 156,
      "method": "POST",
      "url": "/api/services/hotel/rooms",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "781"
      },
      "remoteAddress": "::1",
      "remotePort": 51495
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "586",
        "etag": "W/\"24a-JWdI0C2z/TcF1MvciCvGqlsA0QY\""
      }
    }
    responseTime: 736
  📸 Uploaded rentacar-co-1.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/rentacarCompanies%2F6abaaa6a-3ee7-400e-94ef-3504d5584c19.jpg
[11:02:56] INFO: POST /image?folder=rentacarCompanies 201
    req: {
      "id": 157,
      "method": "POST",
      "url": "/api/uploads/image?folder=rentacarCompanies",
      "query": {
        "folder": "rentacarCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-096124656411",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "91342"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "160",
        "etag": "W/\"a0-lI1mD46pkq76LigKxILc3XNV9j8\""
      }
    }
    responseTime: 1541
  📸 Uploaded rentacar-co-2.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/rentacarCompanies%2F3e10f0fd-2114-4a53-8e00-76372b3681d6.jpg
❌ Car rental company error: { success: false, errorCode: 'NOT_FOUND', message: 'Not found' }
[11:02:58] INFO: POST /image?folder=rentacarCompanies 201
    req: {
      "id": 158,
      "method": "POST",
      "url": "/api/uploads/image?folder=rentacarCompanies",
      "query": {
        "folder": "rentacarCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-088574560982",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "117998"
      },
      "remoteAddress": "::1",
      "remotePort": 51495
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "160",
        "etag": "W/\"a0-0wgp1PLVluT/qOo3YDlAK62NMeE\""
      }
    }
    responseTime: 1843
[11:02:58] WARN: POST /api/companies 404
    req: {
      "id": 159,
      "method": "POST",
      "url": "/api/companies",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "695"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "63",
        "etag": "W/\"3f-35P9NfJ0HOowTKDo5twz1DRpy88\""
      }
    }
    responseTime: 1
  📸 Uploaded rentacar-co-2.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/rentacarCompanies%2F183111ea-443a-46e7-8bfa-a29572ada5b3.jpg
[11:03:00] INFO: POST /image?folder=rentacarCompanies 201
    req: {
      "id": 160,
      "method": "POST",
      "url": "/api/uploads/image?folder=rentacarCompanies",
      "query": {
        "folder": "rentacarCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-001883103907",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "117998"
      },
      "remoteAddress": "::1",
      "remotePort": 51495
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "160",
        "etag": "W/\"a0-rlrceykMCpxPleETgjbxCtAWW24\""
      }
    }
    responseTime: 1826
  📸 Uploaded rentacar-co-3.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/rentacarCompanies%2F0f2501e3-1393-4a8c-b682-0632a46d8865.jpg
❌ Car rental company error: { success: false, errorCode: 'NOT_FOUND', message: 'Not found' }
[11:03:01] INFO: POST /image?folder=rentacarCompanies 201
    req: {
      "id": 161,
      "method": "POST",
      "url": "/api/uploads/image?folder=rentacarCompanies",
      "query": {
        "folder": "rentacarCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-079239658064",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "48260"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "160",
        "etag": "W/\"a0-bAeG9Oi4TOuDOfXfMtKw6/Z+Mqk\""
      }
    }
    responseTime: 1291
[11:03:01] WARN: POST /api/companies 404
    req: {
      "id": 162,
      "method": "POST",
      "url": "/api/companies",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "691"
      },
      "remoteAddress": "::1",
      "remotePort": 51495
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "63",
        "etag": "W/\"3f-35P9NfJ0HOowTKDo5twz1DRpy88\""
      }
    }
    responseTime: 1
  📸 Uploaded rentacar-co-3.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/rentacarCompanies%2F59019413-fbc2-411c-a810-27190976551d.jpg
[11:03:02] INFO: POST /image?folder=rentacarCompanies 201
    req: {
      "id": 163,
      "method": "POST",
      "url": "/api/uploads/image?folder=rentacarCompanies",
      "query": {
        "folder": "rentacarCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-066828714497",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "48260"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "160",
        "etag": "W/\"a0-7oH7Qs+4WcBOCY3Df4FNjUG8bxg\""
      }
    }
    responseTime: 1577
  📸 Uploaded rentacar-co-4.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/rentacarCompanies%2Fc46e07f0-ae5f-4b0b-ac5d-72dcc8cf8e4e.jpg
❌ Car rental company error: { success: false, errorCode: 'NOT_FOUND', message: 'Not found' }
[11:03:04] INFO: POST /image?folder=rentacarCompanies 201
    req: {
      "id": 164,
      "method": "POST",
      "url": "/api/uploads/image?folder=rentacarCompanies",
      "query": {
        "folder": "rentacarCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-096340603586",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "112359"
      },
      "remoteAddress": "::1",
      "remotePort": 51495
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "160",
        "etag": "W/\"a0-tiBUxwsN7xjiM/+O7uZJxJ3QzQQ\""
      }
    }
    responseTime: 1773
[11:03:04] WARN: POST /api/companies 404
    req: {
      "id": 165,
      "method": "POST",
      "url": "/api/companies",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "705"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "63",
        "etag": "W/\"3f-35P9NfJ0HOowTKDo5twz1DRpy88\""
      }
    }
    responseTime: 0
  📸 Uploaded rentacar-co-4.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/rentacarCompanies%2Fbe4671a7-c209-4ce7-8b8b-007b2fe0cfab.jpg
[11:03:06] INFO: POST /image?folder=rentacarCompanies 201
    req: {
      "id": 166,
      "method": "POST",
      "url": "/api/uploads/image?folder=rentacarCompanies",
      "query": {
        "folder": "rentacarCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-000295991759",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "112359"
      },
      "remoteAddress": "::1",
      "remotePort": 51495
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "160",
        "etag": "W/\"a0-6SreiiyUs/6hmRNFw62pPoEYZqk\""
      }
    }
    responseTime: 1629
  📸 Uploaded rentacar-co-5.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/rentacarCompanies%2Fba77c0b0-c66d-4ad3-8306-4ff0c00888f6.jpg
❌ Car rental company error: { success: false, errorCode: 'NOT_FOUND', message: 'Not found' }

✈️ Seeding Travel Domain...
[11:03:07] INFO: POST /image?folder=rentacarCompanies 201
    req: {
      "id": 167,
      "method": "POST",
      "url": "/api/uploads/image?folder=rentacarCompanies",
      "query": {
        "folder": "rentacarCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-038058034801",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "79295"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "160",
        "etag": "W/\"a0-rV5Qd4dq1ZNXYg+Jb3BD01KdDAk\""
      }
    }
    responseTime: 1385
[11:03:07] WARN: POST /api/companies 404
    req: {
      "id": 168,
      "method": "POST",
      "url": "/api/companies",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "705"
      },
      "remoteAddress": "::1",
      "remotePort": 51495
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "63",
        "etag": "W/\"3f-35P9NfJ0HOowTKDo5twz1DRpy88\""
      }
    }
    responseTime: 1
  📸 Uploaded travel-co-1.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/travelCompanies%2Ff9d4b4e4-a286-4bc6-b1ef-7fbc95ee3dbf.png
[11:03:08] INFO: POST /image?folder=travelCompanies 201
    req: {
      "id": 169,
      "method": "POST",
      "url": "/api/uploads/image?folder=travelCompanies",
      "query": {
        "folder": "travelCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-094347894563",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "2474"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "158",
        "etag": "W/\"9e-p7+39i3NM5lqEMbI/H4Bm7v3J88\""
      }
    }
    responseTime: 731
  📸 Uploaded travel-co-2.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/travelCompanies%2F2b8583c8-8209-4688-a960-7596b600f5d1.png
❌ Travel company error: { success: false, errorCode: 'NOT_FOUND', message: 'Not found' }
[11:03:09] INFO: POST /image?folder=travelCompanies 201
    req: {
      "id": 170,
      "method": "POST",
      "url": "/api/uploads/image?folder=travelCompanies",
      "query": {
        "folder": "travelCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-084933793276",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1475"
      },
      "remoteAddress": "::1",
      "remotePort": 51495
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "158",
        "etag": "W/\"9e-AMGYp+wlm/II+CsOxw+MqjehtV8\""
      }
    }
    responseTime: 764
[11:03:09] WARN: POST /api/companies 404
    req: {
      "id": 171,
      "method": "POST",
      "url": "/api/companies",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "761"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "63",
        "etag": "W/\"3f-35P9NfJ0HOowTKDo5twz1DRpy88\""
      }
    }
    responseTime: 1
  📸 Uploaded travel-co-2.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/travelCompanies%2Fbfdbb77e-4406-4cfa-a0ab-9df494a714a1.png
[11:03:09] INFO: POST /image?folder=travelCompanies 201
    req: {
      "id": 172,
      "method": "POST",
      "url": "/api/uploads/image?folder=travelCompanies",
      "query": {
        "folder": "travelCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-060222616492",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1475"
      },
      "remoteAddress": "::1",
      "remotePort": 51495
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "158",
        "etag": "W/\"9e-66ymmLB5Jah4misFmKFMIHXg+Fw\""
      }
    }
    responseTime: 651
  📸 Uploaded travel-co-3.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/travelCompanies%2F99fbca6b-ffb3-4bc3-a9ce-5634bb43e7ec.png
❌ Travel company error: { success: false, errorCode: 'NOT_FOUND', message: 'Not found' }
[11:03:10] INFO: POST /image?folder=travelCompanies 201
    req: {
      "id": 173,
      "method": "POST",
      "url": "/api/uploads/image?folder=travelCompanies",
      "query": {
        "folder": "travelCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-031537334577",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1455"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "158",
        "etag": "W/\"9e-KPVhw3MyqwJ8umTDG1ej2GIjeTE\""
      }
    }
    responseTime: 713
[11:03:10] WARN: POST /api/companies 404
    req: {
      "id": 174,
      "method": "POST",
      "url": "/api/companies",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "672"
      },
      "remoteAddress": "::1",
      "remotePort": 51495
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "63",
        "etag": "W/\"3f-35P9NfJ0HOowTKDo5twz1DRpy88\""
      }
    }
    responseTime: 0
  📸 Uploaded travel-co-3.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/travelCompanies%2F16d809a9-dbfc-4482-8642-f057457a1ccd.png
[11:03:11] INFO: POST /image?folder=travelCompanies 201
    req: {
      "id": 175,
      "method": "POST",
      "url": "/api/uploads/image?folder=travelCompanies",
      "query": {
        "folder": "travelCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-011329650005",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1455"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "158",
        "etag": "W/\"9e-dIqhOz1cwNUWTNoCq4vibdGUCLI\""
      }
    }
    responseTime: 666
  📸 Uploaded travel-co-4.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/travelCompanies%2F148fbe2a-68ed-42a7-a06e-1bc16bd66839.png
❌ Travel company error: { success: false, errorCode: 'NOT_FOUND', message: 'Not found' }
[11:03:12] INFO: POST /image?folder=travelCompanies 201
    req: {
      "id": 176,
      "method": "POST",
      "url": "/api/uploads/image?folder=travelCompanies",
      "query": {
        "folder": "travelCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-085653567159",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1657"
      },
      "remoteAddress": "::1",
      "remotePort": 51495
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "158",
        "etag": "W/\"9e-pSbhCLnWZWsUG2FydiVgGDCaqsQ\""
      }
    }
    responseTime: 685
[11:03:12] WARN: POST /api/companies 404
    req: {
      "id": 177,
      "method": "POST",
      "url": "/api/companies",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "688"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "63",
        "etag": "W/\"3f-35P9NfJ0HOowTKDo5twz1DRpy88\""
      }
    }
    responseTime: 0
  📸 Uploaded travel-co-4.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/travelCompanies%2F7b75911a-c02a-4be2-b64e-6423e2a3196b.png
[11:03:12] INFO: POST /image?folder=travelCompanies 201
    req: {
      "id": 178,
      "method": "POST",
      "url": "/api/uploads/image?folder=travelCompanies",
      "query": {
        "folder": "travelCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-016453061352",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1657"
      },
      "remoteAddress": "::1",
      "remotePort": 51495
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "158",
        "etag": "W/\"9e-BAs1A6ag6nCHP+1yL2I6f9ffvkI\""
      }
    }
    responseTime: 709
  📸 Uploaded travel-co-5.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/travelCompanies%2Ffb7cf6cc-804c-4237-b01c-daa310576728.png
❌ Travel company error: { success: false, errorCode: 'NOT_FOUND', message: 'Not found' }

🎨 Cleaning old banners and seeding Home Banners...
✅ Cleaned legacy banners from database!
[11:03:13] INFO: POST /image?folder=travelCompanies 201
    req: {
      "id": 179,
      "method": "POST",
      "url": "/api/uploads/image?folder=travelCompanies",
      "query": {
        "folder": "travelCompanies"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-086022061978",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1633"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "158",
        "etag": "W/\"9e-WnyheseiAeZuo2xqrno6BUPvbyc\""
      }
    }
    responseTime: 679
[11:03:13] WARN: POST /api/companies 404
    req: {
      "id": 180,
      "method": "POST",
      "url": "/api/companies",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "687"
      },
      "remoteAddress": "::1",
      "remotePort": 51495
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "63",
        "etag": "W/\"3f-35P9NfJ0HOowTKDo5twz1DRpy88\""
      }
    }
    responseTime: 0
  📸 Uploaded hotel.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/banners%2Fbda8709c-bb9e-4721-bf3e-6b5f69b2cbd6.png
✨ Created Banner #1 (HOTEL) with hotel.png -> ID: 7rS4pVBZFDxe4EVOacdI
[11:03:32] INFO: POST /image?folder=banners 201
    req: {
      "id": 181,
      "method": "POST",
      "url": "/api/uploads/image?folder=banners",
      "query": {
        "folder": "banners"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-088695433549",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "1878194"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "150",
        "etag": "W/\"96-oc/O7YsmcXByfch+kqLZlY/g4Ds\""
      }
    }
    responseTime: 18675
[11:03:32] INFO: POST /banner 201
    req: {
      "id": 182,
      "method": "POST",
      "url": "/api/home/banner",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "176"
      },
      "remoteAddress": "::1",
      "remotePort": 51503
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "267",
        "etag": "W/\"10b-8SJYfizRQuL6U08Mt7debwKz95U\""
      }
    }
    responseTime: 434
  📸 Uploaded rentacar.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/banners%2F8604a525-0bd2-4a6f-9c79-2b6a82ef8e52.png
[11:03:53] INFO: POST /image?folder=banners 201
    req: {
      "id": 183,
      "method": "POST",
      "url": "/api/uploads/image?folder=banners",
      "query": {
        "folder": "banners"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-067300514601",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "2155338"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "150",
        "etag": "W/\"96-fjTi0icToWtHDWc9QJXE14Ulrtg\""
      }
    }
    responseTime: 20401
✨ Created Banner #2 (RENT_A_CAR) with rentacar.png -> ID: Fi7kpLIpFlzXn1EkGO5d
[11:03:53] INFO: POST /banner 201
    req: {
      "id": 184,
      "method": "POST",
      "url": "/api/home/banner",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "181"
      },
      "remoteAddress": "::1",
      "remotePort": 51523
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "272",
        "etag": "W/\"110-JvnxNexcWv0KGuGF45CaUfti9f4\""
      }
    }
    responseTime: 450
  📸 Uploaded travel.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/banners%2Fb8ccf52c-8fc3-4a34-8699-430c71c5854c.png
✨ Created Banner #3 (TRAVEL) with travel.png -> ID: rfV9Yp9PHnEt46xf1vI1
[11:04:13] INFO: POST /image?folder=banners 201
    req: {
      "id": 185,
      "method": "POST",
      "url": "/api/uploads/image?folder=banners",
      "query": {
        "folder": "banners"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-063665469865",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "2133284"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "150",
        "etag": "W/\"96-umQ5mDKNISHwYmS5xoD3gMZhAhA\""
      }
    }
    responseTime: 19350
[11:04:13] INFO: POST /banner 201
    req: {
      "id": 186,
      "method": "POST",
      "url": "/api/home/banner",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "177"
      },
      "remoteAddress": "::1",
      "remotePort": 51524
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "268",
        "etag": "W/\"10c-novUeEkbYrwEFekwxN186uCDj7g\""
      }
    }
    responseTime: 452
  📸 Uploaded food.png -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/banners%2F22a33687-09b8-43d6-9531-fda3a6c67dc7.png
[11:04:35] INFO: POST /image?folder=banners 201
    req: {
      "id": 187,
      "method": "POST",
      "url": "/api/uploads/image?folder=banners",
      "query": {
        "folder": "banners"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-022710020978",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "2210403"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "150",
        "etag": "W/\"96-htTQWsBmmFMdzzYqlzx/corZrrg\""
      }
    }
    responseTime: 21628
✨ Created Banner #4 (FOOD) with food.png -> ID: pdoaJItiAFh4nQBXGgXO

👥 Seeding Test Users...
[11:04:35] INFO: POST /banner 201
    req: {
      "id": 188,
      "method": "POST",
      "url": "/api/home/banner",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "175"
      },
      "remoteAddress": "::1",
      "remotePort": 51556
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "266",
        "etag": "W/\"10a-/7hpYfCq5xcaVvrvIIGr79HnnoI\""
      }
    }
    responseTime: 443
[11:04:36] INFO: POST /register 201
    req: {
      "id": 189,
      "method": "POST",
      "url": "/api/auth/register",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "137"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "549",
        "etag": "W/\"225-ZMAzBGhOz4gSiOKKNqJ+0EceK08\""
      }
    }
    responseTime: 792
  📸 Uploaded avatar-1.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/avatars%2Fc30596dd-3c61-481e-8142-a29b2750656d.jpg
[11:04:37] INFO: POST /image?folder=avatars 201
    req: {
      "id": 190,
      "method": "POST",
      "url": "/api/uploads/image?folder=avatars",
      "query": {
        "folder": "avatars"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-023866237031",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "16413"
      },
      "remoteAddress": "::1",
      "remotePort": 51556
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "150",
        "etag": "W/\"96-D1M68kfHq0bLIlxEEGb9NJXicoM\""
      }
    }
    responseTime: 1014
❌ Failed to set avatar for testuser1@baltazar.test: {
  success: false,
  errorCode: 'IMAGE_NOT_FOUND',
  message: 'The referenced image could not be found, has expired, or does not belong to you'  
}
✅ Test user: testuser1@baltazar.test
[11:04:37] WARN: PUT /api/users/me/avatar 403
    req: {
      "id": 191,
      "method": "PUT",
      "url": "/api/users/me/avatar",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "129"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 403,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "139",
        "etag": "W/\"8b-7jqwMZqh2Pkep4dWKyvp87c80PY\""
      }
    }
    responseTime: 165
[11:04:38] INFO: POST /register 201
    req: {
      "id": 192,
      "method": "POST",
      "url": "/api/auth/register",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "139"
      },
      "remoteAddress": "::1",
      "remotePort": 51556
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "551",
        "etag": "W/\"227-YHxjlmy72hKNPGDPDwXEapbfNqY\""
      }
    }
    responseTime: 823
  📸 Uploaded avatar-10.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/avatars%2Fce9809b3-65d9-48ce-8912-3dba1d508c2b.jpg
[11:04:39] INFO: POST /image?folder=avatars 201
    req: {
      "id": 193,
      "method": "POST",
      "url": "/api/uploads/image?folder=avatars",
      "query": {
        "folder": "avatars"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-044309627787",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "9112"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "150",
        "etag": "W/\"96-zIjNedz/IaaLhtg5/Nn1gIbZc1s\""
      }
    }
    responseTime: 796
❌ Failed to set avatar for testuser2@baltazar.test: {
  success: false,
  errorCode: 'IMAGE_NOT_FOUND',
  message: 'The referenced image could not be found, has expired, or does not belong to you'  
}
[11:04:39] WARN: PUT /api/users/me/avatar 403
    req: {
      "id": 194,
      "method": "PUT",
      "url": "/api/users/me/avatar",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "129"
      },
      "remoteAddress": "::1",
      "remotePort": 51556
    }
    res: {
      "statusCode": 403,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "139",
        "etag": "W/\"8b-7jqwMZqh2Pkep4dWKyvp87c80PY\""
      }
    }
    responseTime: 139
✅ Test user: testuser2@baltazar.test
[11:04:40] INFO: POST /register 201
    req: {
      "id": 195,
      "method": "POST",
      "url": "/api/auth/register",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "139"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "551",
        "etag": "W/\"227-yy2vf+sCDHW8V5yI9WoXl2V/Tuw\""
      }
    }
    responseTime: 854
  📸 Uploaded avatar-2.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/avatars%2F939b95ce-7505-4f1e-a41c-e4117345896a.jpg
❌ Failed to set avatar for testuser3@baltazar.test: {
  success: false,
  errorCode: 'IMAGE_NOT_FOUND',
  message: 'The referenced image could not be found, has expired, or does not belong to you'  
}
✅ Test user: testuser3@baltazar.test
[11:04:41] INFO: POST /image?folder=avatars 201
    req: {
      "id": 196,
      "method": "POST",
      "url": "/api/uploads/image?folder=avatars",
      "query": {
        "folder": "avatars"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-002808746044",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "14620"
      },
      "remoteAddress": "::1",
      "remotePort": 51556
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "150",
        "etag": "W/\"96-bTVn66LCZMCfvd8cZwVPPfKjPuQ\""
      }
    }
    responseTime: 882
[11:04:41] WARN: PUT /api/users/me/avatar 403
    req: {
      "id": 197,
      "method": "PUT",
      "url": "/api/users/me/avatar",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "129"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 403,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "139",
        "etag": "W/\"8b-7jqwMZqh2Pkep4dWKyvp87c80PY\""
      }
    }
    responseTime: 144
[11:04:42] INFO: POST /register 201
    req: {
      "id": 198,
      "method": "POST",
      "url": "/api/auth/register",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "139"
      },
      "remoteAddress": "::1",
      "remotePort": 51556
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "551",
        "etag": "W/\"227-9fBfSoaUGMTi7pnzzMaQXp9+SxU\""
      }
    }
    responseTime: 773
  📸 Uploaded avatar-3.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/avatars%2F5067a41c-cb1b-4fab-a7a2-3404a9e10388.jpg
❌ Failed to set avatar for testuser4@baltazar.test: {
  success: false,
  errorCode: 'IMAGE_NOT_FOUND',
  message: 'The referenced image could not be found, has expired, or does not belong to you'  
}
✅ Test user: testuser4@baltazar.test
[11:04:42] INFO: POST /image?folder=avatars 201
    req: {
      "id": 199,
      "method": "POST",
      "url": "/api/uploads/image?folder=avatars",
      "query": {
        "folder": "avatars"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-078880097948",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "13984"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "150",
        "etag": "W/\"96-M+PmfPgmk5FhNjAifOZJKm6byWs\""
      }
    }
    responseTime: 770
[11:04:42] WARN: PUT /api/users/me/avatar 403
    req: {
      "id": 200,
      "method": "PUT",
      "url": "/api/users/me/avatar",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "129"
      },
      "remoteAddress": "::1",
      "remotePort": 51556
    }
    res: {
      "statusCode": 403,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "139",
        "etag": "W/\"8b-7jqwMZqh2Pkep4dWKyvp87c80PY\""
      }
    }
    responseTime: 128
[11:04:43] INFO: POST /register 201
    req: {
      "id": 201,
      "method": "POST",
      "url": "/api/auth/register",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "137"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "549",
        "etag": "W/\"225-QkNtcFOPcetGkvcu2bmsWfrcuOs\""
      }
    }
    responseTime: 828
  📸 Uploaded avatar-4.jpg -> https://storage.googleapis.com/baltazar-a28a4.firebasestorage.app/avatars%2Fc77d6c7d-5df3-4e1c-80b8-e60bcd4817b7.jpg
❌ Failed to set avatar for testuser5@baltazar.test: {
  success: false,
  errorCode: 'IMAGE_NOT_FOUND',
  message: 'The referenced image could not be found, has expired, or does not belong to you'  
}
✅ Test user: testuser5@baltazar.test

👤 Seeding User Profiles and Payment Cards...
[11:04:44] INFO: POST /image?folder=avatars 201
    req: {
      "id": 202,
      "method": "POST",
      "url": "/api/uploads/image?folder=avatars",
      "query": {
        "folder": "avatars"
      },
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "multipart/form-data; boundary=----formdata-undici-073817323152",     
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "15309"
      },
      "remoteAddress": "::1",
      "remotePort": 51556
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "150",
        "etag": "W/\"96-aENNMXzctoen260x5A+VdLewMbw\""
      }
    }
    responseTime: 839
[11:04:44] WARN: PUT /api/users/me/avatar 403
    req: {
      "id": 203,
      "method": "PUT",
      "url": "/api/users/me/avatar",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "129"
      },
      "remoteAddress": "::1",
      "remotePort": 51466
    }
    res: {
      "statusCode": 403,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "139",
        "etag": "W/\"8b-7jqwMZqh2Pkep4dWKyvp87c80PY\""
      }
    }
    responseTime: 145
[11:04:45] INFO: PUT /me 200
    req: {
      "id": 204,
      "method": "PUT",
      "url": "/api/users/me",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "241"
      },
      "remoteAddress": "::1",
      "remotePort": 51556
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "328",
        "etag": "W/\"148-AWYpSbWgiepseJPl9Qvr9Ka1VwM\""
      }
    }
    responseTime: 445
💳 testuser1@baltazar.test → VISA •••• 8311
[11:05:06] INFO: POST /add-card 201
    req: {
      "id": 205,
      "method": "POST",
      "url": "/api/payment/add-card",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "104"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "117",
        "etag": "W/\"75-fb0v0FfBVewU0dhDgJOhsn4Xjh8\""
      }
    }
    responseTime: 143
[11:05:07] INFO: PUT /me 200
    req: {
      "id": 206,
      "method": "PUT",
      "url": "/api/users/me",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "251"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "330",
        "etag": "W/\"14a-F67uh0QYZUG7iLUv/pZxSRUxkbQ\""
      }
    }
    responseTime: 461
💳 testuser2@baltazar.test → MASTERCARD •••• 2601
[11:05:07] INFO: POST /add-card 201
    req: {
      "id": 207,
      "method": "POST",
      "url": "/api/payment/add-card",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "110"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "123",
        "etag": "W/\"7b-Rg6/Mz+ZkOkyXyt6QdhmJr15qrI\""
      }
    }
    responseTime: 136
[11:05:08] INFO: PUT /me 200
    req: {
      "id": 208,
      "method": "PUT",
      "url": "/api/users/me",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "261"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "330",
        "etag": "W/\"14a-+a+HTaJO+lescP0jvq7bXrqDD50\""
      }
    }
    responseTime: 412
💳 testuser3@baltazar.test → VISA •••• 5940
[11:05:08] INFO: POST /add-card 201
    req: {
      "id": 209,
      "method": "POST",
      "url": "/api/payment/add-card",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "104"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "117",
        "etag": "W/\"75-3CUKHlcuJVg4r4jvyTY97kSTa2w\""
      }
    }
    responseTime: 129
[11:05:09] INFO: PUT /me 200
    req: {
      "id": 210,
      "method": "PUT",
      "url": "/api/users/me",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "257"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "330",
        "etag": "W/\"14a-/veMxYsuUI5pUU/9y5mRG64MndY\""
      }
    }
    responseTime: 466
💳 testuser4@baltazar.test → VISA •••• 7022
[11:05:09] INFO: POST /add-card 201
    req: {
      "id": 211,
      "method": "POST",
      "url": "/api/payment/add-card",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "104"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "117",
        "etag": "W/\"75-TOcS9oZy1Kgt/la4SDxP2CJCU6U\""
      }
    }
    responseTime: 130
[11:05:09] INFO: PUT /me 200
    req: {
      "id": 212,
      "method": "PUT",
      "url": "/api/users/me",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "256"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "328",
        "etag": "W/\"148-vrWpTqlUOa6eWKVqVsQxMu0mU5g\""
      }
    }
    responseTime: 443
💳 testuser5@baltazar.test → MASTERCARD •••• 4254
✅ Completed User Profiles and Cards seeding.


🧾 Seeding Orders → Payments → Reviews...

👤 gricMFmxl7qskwfzSNGe
[11:05:10] INFO: POST /add-card 201
    req: {
      "id": 213,
      "method": "POST",
      "url": "/api/payment/add-card",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "110"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "123",
        "etag": "W/\"7b-zARxof2GAqqsAsmwPGI/dwSaY8s\""
      }
    }
    responseTime: 149
[11:05:10] INFO: POST / 201
    req: {
      "id": 214,
      "method": "POST",
      "url": "/api/orders",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "58"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "216",
        "etag": "W/\"d8-2VZle6+7Z/QZ5FoY86BwyqA0LTI\""
      }
    }
    responseTime: 262
[11:05:11] INFO: PUT /NVL9T1yF3miKeUEnk4d5/step 200
    req: {
      "id": 215,
      "method": "PUT",
      "url": "/api/orders/NVL9T1yF3miKeUEnk4d5/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "43"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "116",
        "etag": "W/\"74-6TcFeUHd/b6bQhOuN70v+l4s8Bg\""
      }
    }
    responseTime: 450
[11:05:11] INFO: PUT /NVL9T1yF3miKeUEnk4d5/step 200
    req: {
      "id": 216,
      "method": "PUT",
      "url": "/api/orders/NVL9T1yF3miKeUEnk4d5/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "37"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "116",
        "etag": "W/\"74-Jh9Sh3kiu0tf8ZdahZoVdsdw1zU\""
      }
    }
    responseTime: 435
[11:05:12] INFO: PUT /NVL9T1yF3miKeUEnk4d5/step 200
    req: {
      "id": 217,
      "method": "PUT",
      "url": "/api/orders/NVL9T1yF3miKeUEnk4d5/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "53"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "95",
        "etag": "W/\"5f-fuVcS3qHgiw16fNEHCXYGBZHLXk\""
      }
    }
    responseTime: 721
  ❌ Payment failed (order NVL9T1yF3miKeUEnk4d5): {
  success: false,
  errorCode: 'PAYMENT_FAILED',
  message: 'Payment failed'
}

👤 X9ouYzgY7ssukOlACYvf
[11:05:13] WARN: POST /api/payment/pay/NVL9T1yF3miKeUEnk4d5 404
    req: {
      "id": 218,
      "method": "POST",
      "url": "/api/payment/pay/NVL9T1yF3miKeUEnk4d5",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "35"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-LQzUAhRAP25SpHnDP4DPVwXKkqc\""
      }
    }
    responseTime: 1071
[11:05:13] INFO: POST / 201
    req: {
      "id": 219,
      "method": "POST",
      "url": "/api/orders",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "58"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "216",
        "etag": "W/\"d8-mJaiDqNIA8Ccwv09R8FO1gfq8Xs\""
      }
    }
    responseTime: 285
[11:05:14] INFO: PUT /jnDoJrcjaozgmhSGczmq/step 200
    req: {
      "id": 220,
      "method": "PUT",
      "url": "/api/orders/jnDoJrcjaozgmhSGczmq/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "43"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "116",
        "etag": "W/\"74-tBhvmwDm10cpxx9izbg0sB5xsbk\""
      }
    }
    responseTime: 388
[11:05:14] INFO: PUT /jnDoJrcjaozgmhSGczmq/step 200
    req: {
      "id": 221,
      "method": "PUT",
      "url": "/api/orders/jnDoJrcjaozgmhSGczmq/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "37"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "116",
        "etag": "W/\"74-TDaxr1hsXIeVhRL7VifUOoyyv+w\""
      }
    }
    responseTime: 392
[11:05:14] INFO: PUT /jnDoJrcjaozgmhSGczmq/step 200
    req: {
      "id": 222,
      "method": "PUT",
      "url": "/api/orders/jnDoJrcjaozgmhSGczmq/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "53"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "95",
        "etag": "W/\"5f-vIl4vznWge6bhZu3DyMjd+50xCQ\""
      }
    }
    responseTime: 501
  ❌ Payment failed (order jnDoJrcjaozgmhSGczmq): {
  success: false,
  errorCode: 'PAYMENT_FAILED',
  message: 'Payment failed'
}

👤 8SudvYcfgyt0VEl7ar7N
[11:05:15] WARN: POST /api/payment/pay/jnDoJrcjaozgmhSGczmq 404
    req: {
      "id": 223,
      "method": "POST",
      "url": "/api/payment/pay/jnDoJrcjaozgmhSGczmq",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "35"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-LQzUAhRAP25SpHnDP4DPVwXKkqc\""
      }
    }
    responseTime: 932
[11:05:16] INFO: POST / 201
    req: {
      "id": 224,
      "method": "POST",
      "url": "/api/orders",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "58"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "216",
        "etag": "W/\"d8-kdUn+giYjSGyqrCX8CNpAu0K0bU\""
      }
    }
    responseTime: 258
[11:05:16] INFO: PUT /TEINP3oayOxQKwAhoeRc/step 200
    req: {
      "id": 225,
      "method": "PUT",
      "url": "/api/orders/TEINP3oayOxQKwAhoeRc/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "43"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "116",
        "etag": "W/\"74-igadphkxPjIwhhcjNkeiloX+VCQ\""
      }
    }
    responseTime: 467
[11:05:17] INFO: PUT /TEINP3oayOxQKwAhoeRc/step 200
    req: {
      "id": 226,
      "method": "PUT",
      "url": "/api/orders/TEINP3oayOxQKwAhoeRc/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "37"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "116",
        "etag": "W/\"74-dt/n3VFPnMdI1R37ywQ7TckoSOk\""
      }
    }
    responseTime: 376
[11:05:17] INFO: PUT /TEINP3oayOxQKwAhoeRc/step 200
    req: {
      "id": 227,
      "method": "PUT",
      "url": "/api/orders/TEINP3oayOxQKwAhoeRc/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "53"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "95",
        "etag": "W/\"5f-ka4p6QBMLXppveehzAenvyP8yZE\""
      }
    }
    responseTime: 642
  ❌ Payment failed (order TEINP3oayOxQKwAhoeRc): {
  success: false,
  errorCode: 'PAYMENT_FAILED',
  message: 'Payment failed'
}

👤 6wlsqeQTOF9PV6QLP56N
[11:05:18] WARN: POST /api/payment/pay/TEINP3oayOxQKwAhoeRc 404
    req: {
      "id": 228,
      "method": "POST",
      "url": "/api/payment/pay/TEINP3oayOxQKwAhoeRc",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "35"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-LQzUAhRAP25SpHnDP4DPVwXKkqc\""
      }
    }
    responseTime: 942
[11:05:18] INFO: POST / 201
    req: {
      "id": 229,
      "method": "POST",
      "url": "/api/orders",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "58"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "216",
        "etag": "W/\"d8-6IKfQBVK8HCkF3JNihwE4V5E7T8\""
      }
    }
    responseTime: 257
[11:05:19] INFO: PUT /oU3kpS1ZvnssPZuTaqzx/step 200
    req: {
      "id": 230,
      "method": "PUT",
      "url": "/api/orders/oU3kpS1ZvnssPZuTaqzx/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "43"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "116",
        "etag": "W/\"74-+nqzQ6r3lVRtaDsaQ9daS0xb3S0\""
      }
    }
    responseTime: 403
[11:05:19] INFO: PUT /oU3kpS1ZvnssPZuTaqzx/step 200
    req: {
      "id": 231,
      "method": "PUT",
      "url": "/api/orders/oU3kpS1ZvnssPZuTaqzx/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "37"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "116",
        "etag": "W/\"74-dtXdV30Viog5P5RxPhjTBaFgw0o\""
      }
    }
    responseTime: 377
[11:05:20] INFO: PUT /oU3kpS1ZvnssPZuTaqzx/step 200
    req: {
      "id": 232,
      "method": "PUT",
      "url": "/api/orders/oU3kpS1ZvnssPZuTaqzx/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "53"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "95",
        "etag": "W/\"5f-klB1eE7FxV9q6F04vvRmXar8Ez8\""
      }
    }
    responseTime: 481
  ❌ Payment failed (order oU3kpS1ZvnssPZuTaqzx): {
  success: false,
  errorCode: 'PAYMENT_FAILED',
  message: 'Payment failed'
}

👤 6J3I1UuYS2Pk8HoCeeqv
[11:05:21] WARN: POST /api/payment/pay/oU3kpS1ZvnssPZuTaqzx 404
    req: {
      "id": 233,
      "method": "POST",
      "url": "/api/payment/pay/oU3kpS1ZvnssPZuTaqzx",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "35"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-LQzUAhRAP25SpHnDP4DPVwXKkqc\""
      }
    }
    responseTime: 982
[11:05:21] INFO: POST / 201
    req: {
      "id": 234,
      "method": "POST",
      "url": "/api/orders",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "58"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 201,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "216",
        "etag": "W/\"d8-EuKCAKOwPlQVVT6X8bZgaTXeDpI\""
      }
    }
    responseTime: 269
[11:05:21] INFO: PUT /CglAGSACeXw9oJ2e3jKr/step 200
    req: {
      "id": 235,
      "method": "PUT",
      "url": "/api/orders/CglAGSACeXw9oJ2e3jKr/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "43"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "116",
        "etag": "W/\"74-qsrXHgOD4O9xs6B8aRHWGXgNGQc\""
      }
    }
    responseTime: 414
[11:05:22] INFO: PUT /CglAGSACeXw9oJ2e3jKr/step 200
    req: {
      "id": 236,
      "method": "PUT",
      "url": "/api/orders/CglAGSACeXw9oJ2e3jKr/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "37"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "116",
        "etag": "W/\"74-npawHWUFl+zgCSnqOHtcPz+shSA\""
      }
    }
    responseTime: 357
[11:05:22] INFO: PUT /CglAGSACeXw9oJ2e3jKr/step 200
    req: {
      "id": 237,
      "method": "PUT",
      "url": "/api/orders/CglAGSACeXw9oJ2e3jKr/step",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "53"
      },
      "remoteAddress": "::1",
      "remotePort": 51562
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "origin-agent-cluster": "?1",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "95",
        "etag": "W/\"5f-bhx0JYUCj6pMPsx6YkwJCl8ETh0\""
      }
    }
    responseTime: 459
  ❌ Payment failed (order CglAGSACeXw9oJ2e3jKr): {
  success: false,
  errorCode: 'PAYMENT_FAILED',
  message: 'Payment failed'
}

🎉 Orders/Payments/Reviews seed complete.

🎉 ALL DOMAIN SEEDERS EXECUTED SUCCESSFULLY!
🏁 Master Seeding Server closed.
[11:05:23] WARN: POST /api/payment/pay/CglAGSACeXw9oJ2e3jKr 404
    req: {
      "id": 238,
      "method": "POST",
      "url": "/api/payment/pay/CglAGSACeXw9oJ2e3jKr",
      "query": {},
      "params": {},
      "headers": {
        "host": "localhost:3099",
        "connection": "keep-alive",
        "authorization": "[REDACTED]",
        "content-type": "application/json",
        "accept": "*/*",
        "accept-language": "*",
        "sec-fetch-mode": "cors",
        "user-agent": "node",
        "accept-encoding": "gzip, deflate",
        "content-length": "35"
      },
      "remoteAddress": "::1",
      "remotePort": 51563
    }
    res: {
      "statusCode": 404,
      "headers": {
        "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: 
data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-resource-policy": "same-origin",
        "referrer-policy": "no-referrer",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-dns-prefetch-control": "off",
        "x-download-options": "noopen",
        "x-frame-options": "SAMEORIGIN",
        "x-permitted-cross-domain-policies": "none",
        "x-xss-protection": "0",
        "vary": "Origin",
        "access-control-allow-credentials": "true",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-LQzUAhRAP25SpHnDP4DPVwXKkqc\""
      }
    }
    responseTime: 909