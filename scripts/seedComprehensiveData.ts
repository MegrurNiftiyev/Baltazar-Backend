import 'dotenv-flow/config';
import fs from 'fs';
import path from 'path';
import { app } from '../src/app.js';
import type { Server } from 'http';

const PORT = 3099;
const BASE_URL = `http://localhost:${PORT}`;

function loc(enStr: string, azStr?: string, ruStr?: string) {
  return {
    az: azStr || enStr,
    en: enStr,
    ru: ruStr || enStr,
  };
}

async function main() {
  const server: Server = app.listen(PORT, async () => {
    console.log(`🚀 Seeding server started on ${BASE_URL}`);

    try {
      // 1. Authenticate (Login as Admin)
      console.log('🔑 Logging in as Admin (megrurniftieyv@gmail.com)...');
      let loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'megrurniftieyv@gmail.com',
          password: 'Password123@',
        }),
      });

      let loginData = await loginRes.json();
      if (!loginRes.ok) {
        console.log('Login failed, creating account...');
        const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Admin User',
            email: 'megrurniftieyv@gmail.com',
            password: 'Password123@',
            phone: '+994501234567',
            region: 'AZ',
            language: 'en',
          }),
        });
        const regData = await regRes.json();
        if (!regRes.ok) {
          console.error('Registration failed:', regData);
          process.exit(1);
        }
        loginData = regData;
      }

      const token = loginData.data?.accessToken;
      if (!token) {
        console.error('Failed to obtain access token:', loginData);
        process.exit(1);
      }
      console.log('✅ Admin authenticated successfully!');

      const authHeaders = {
        Authorization: `Bearer ${token}`,
      };

      // Helper function to upload image file
      async function uploadImageFile(filePath: string, folder: string): Promise<string> {
        const fileBuffer = fs.readFileSync(filePath);
        const fileName = path.basename(filePath);
        const mimeType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';

        const formData = new FormData();
        formData.append('image', new Blob([fileBuffer], { type: mimeType }), fileName);

        const res = await fetch(`${BASE_URL}/api/uploads/image?folder=${folder}`, {
          method: 'POST',
          headers: authHeaders,
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          console.error(`❌ Upload failed for ${filePath} (${folder}):`, data);
          throw new Error(data.message || 'Upload failed');
        }
        console.log(`  📸 Uploaded ${fileName} -> ${data.data.url}`);
        return data.data.url;
      }

      const testImagesDir = path.resolve('testimages');

      // ── 2. SEED FOOD DOMAIN ─────────────────────────────────────────
      console.log('\n🍔 Seeding Food Domain...');
      const foodCoDir = path.join(testImagesDir, 'foodCompanies');
      const foodItemDir = path.join(testImagesDir, 'foodItems');

      const foodCoImages = fs.readdirSync(foodCoDir).map((f) => path.join(foodCoDir, f));
      const foodItemImages = fs.readdirSync(foodItemDir).map((f) => path.join(foodItemDir, f));

      const foodCompanies = [
        {
          name: loc('Baku Gourmet Burger', 'Baku Gourmet Burger', 'Baku Gourmet Burger'),
          about: loc('Premium artisan burgers crafted with 100% Angus beef.', 'Premium artisan burqerlər 100% Angus ətindən hazırlanıb.', 'Премиум бургеры из 100% говядины Ангус.'),
          cuisineTypes: ['Burgers', 'Fast Food'],
          address: '28 May Street 14, Baku',
          serviceType: 'FOOD' as const,
        },
        {
          name: loc('Sushi Master Baku', 'Sushi Master Baku', 'Sushi Master Baku'),
          about: loc('Authentic Japanese sushi and fusion rolls prepared by master chefs.', 'Təcrübəli usta aşpazlar tərəfindən hazırlanan orijinal yapon suşiləri.', 'Аутентичные японские суши от шеф-поваров.'),
          cuisineTypes: ['Japanese', 'Sushi', 'Asian'],
          address: 'Nizami Street 88, Baku',
          serviceType: 'FOOD' as const,
        },
        {
          name: loc('Shah Sultan Traditional Restaurant', 'Şah Sultan Milli Restoranı', 'Ресторан Шах Султан'),
          about: loc('Traditional Azerbaijani cuisine serving authentic Plov, Dolma, and Kebabs.', 'Əsl milli Azərbaycan mətbəxi: Plov, Dolma, Kabablar.', 'Традиционная азербайджанская кухня: плов, долма, кебабы.'),
          cuisineTypes: ['Azerbaijani', 'Caucasian', 'Traditional'],
          address: 'Icherisheher, Kichik Gala 22, Baku',
          serviceType: 'FOOD' as const,
        },
      ];

      for (let i = 0; i < foodCompanies.length; i++) {
        const logoUrl = await uploadImageFile(foodCoImages[i % foodCoImages.length]!, 'foodCompanies');

        const companyRes = await fetch(`${BASE_URL}/api/services/food/companies`, {
          method: 'POST',
          headers: { ...authHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...foodCompanies[i],
            logo: logoUrl,
          }),
        });
        const companyData = await companyRes.json();
        if (!companyRes.ok) {
          console.error('Failed to create food company:', companyData);
          continue;
        }
        const companyId = companyData.data.id;
        console.log(`✨ Created Food Company: ${foodCompanies[i]!.name.en} (${companyId})`);

        // Add Food Items
        const itemImg1 = await uploadImageFile(foodItemImages[(i * 2) % foodItemImages.length]!, 'foodItems');
        const itemImg2 = await uploadImageFile(foodItemImages[(i * 2 + 1) % foodItemImages.length]!, 'foodItems');

        const items = [
          {
            companyId: companyId,
            name: loc(`${foodCompanies[i]!.name.en} Signature Dish`, `${foodCompanies[i]!.name.az} Xüsusi Yeməyi`, `${foodCompanies[i]!.name.ru} Фирменное блюдо`),
            description: loc('Chef recommendation with premium fresh ingredients.', 'Aşpazın təzə inqrediyentlərlə hazırladığı xüsusi tövsiyəsi.', 'Рекомендация шефа из свежих ингредиентов.'),
            category: 'Main Course',
            price: 18.50,
            images: [itemImg1, itemImg2],
            ingredients: ['Fresh Meat', 'House Sauce', 'Organic Vegetables'],
            status: 'AVAILABLE' as const,
          },
          {
            companyId: companyId,
            name: loc(`${foodCompanies[i]!.name.en} Special Combo`, `${foodCompanies[i]!.name.az} Xüsusi Kombo`, `${foodCompanies[i]!.name.ru} Комбо Набор`),
            description: loc('Full combo set including main dish, side dish and drink.', 'Əsas yemək, qarnir və içki daxil olan tam kombo dəst.', 'Полный комбо-набор с основным блюдом и напитком.'),
            category: 'Combos',
            price: 24.00,
            images: [itemImg2],
            ingredients: ['Combo Selection', 'French Fries', 'Beverage'],
            status: 'AVAILABLE' as const,
          },
        ];

        for (const item of items) {
          const itemRes = await fetch(`${BASE_URL}/api/services/food/items`, {
            method: 'POST',
            headers: { ...authHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          });
          const itemResult = await itemRes.json();
          if (itemRes.ok) {
            console.log(`  🍔 Created Food Item: ${item.name.en}`);
          } else {
            console.error('  ❌ Food Item error:', itemResult);
          }
        }
      }

      // ── 3. SEED HOTEL DOMAIN ────────────────────────────────────────
      console.log('\n🏨 Seeding Hotel Domain...');
      const hotelImagesDir = path.join(testImagesDir, 'hotels');
      const hotelImages = fs.readdirSync(hotelImagesDir).map((f) => path.join(hotelImagesDir, f));

      const hotels = [
        {
          name: loc('Grand Hotel Europe Baku', 'Grand Hotel Europe Baku', 'Grand Hotel Europe Baku'),
          about: loc('5-star luxury hotel offering panoramic Caspian Sea views.', 'Xəzər dənizinə möhtəşəm mənzərəsi olan 5 ulduzlu lüks otel.', '5-звездочный отель с панорамным видом на Каспийское море.'),
          city: 'Baku',
          address: 'Neftchilar Avenue 34, Baku',
          starRating: 5,
          price: 180.00,
          amenities: ['Free WiFi', 'Swimming Pool', 'Spa & Wellness', 'Airport Shuttle'],
          serviceType: 'HOTEL' as const,
        },
        {
          name: loc('Hilton Baku Executive', 'Hilton Baku Executive', 'Hilton Baku Executive'),
          about: loc('Contemporary elegance featuring rooftop revolving bar and luxury suites.', 'Dama çıxan fırlanan barı və lüks lyuks otaqları ilə müasir otel.', 'Современный отель с вращающимся баром на крыше.'),
          city: 'Baku',
          address: 'Azadliq Avenue 1, Baku',
          starRating: 5,
          price: 240.00,
          amenities: ['Rooftop Bar', 'Executive Lounge', 'Fitness Center', 'Concierge'],
          serviceType: 'HOTEL' as const,
        },
        {
          name: loc('Fairmont Flame Towers', 'Fairmont Flame Towers', 'Fairmont Flame Towers'),
          about: loc('Iconic luxury hotel located inside the famous Flame Towers skyline.', 'Məşhur Alov Qüllələrində yerləşən ikonik lüks otel.', 'Роскошный отель в знаменитых Пламенных Башнях.'),
          city: 'Baku',
          address: 'Mehdi Huseyn Street 1A, Baku',
          starRating: 5,
          price: 320.00,
          amenities: ['City View Suites', 'Jazz Club', 'Indoor Pool', 'Sauna'],
          serviceType: 'HOTEL' as const,
        },
      ];

      for (let i = 0; i < hotels.length; i++) {
        const logoUrl = await uploadImageFile(hotelImages[i % hotelImages.length]!, 'hotels');
        const img1 = await uploadImageFile(hotelImages[(i + 1) % hotelImages.length]!, 'hotels');
        const img2 = await uploadImageFile(hotelImages[(i + 2) % hotelImages.length]!, 'hotels');

        const hotelRes = await fetch(`${BASE_URL}/api/services/hotel`, {
          method: 'POST',
          headers: { ...authHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...hotels[i],
            logo: logoUrl,
            images: [img1, img2],
          }),
        });
        const hotelResult = await hotelRes.json();
        if (!hotelRes.ok) {
          console.error('Failed to create hotel:', hotelResult);
          continue;
        }
        const hotelId = hotelResult.data.id;
        console.log(`✨ Created Hotel: ${hotels[i]!.name.en} (${hotelId})`);

        // Add Rooms
        const rooms = [
          {
            hotelId: hotelId,
            roomType: 'Deluxe King Room',
            name: loc('Deluxe King Room with Sea View', 'Dəniz Mənzərəli Deluxe King Otağı', 'Номер Делюкс с видом на море'),
            description: loc('Spacious room with king bed and marble bathroom.', 'Böyük çarpayılı və mərmər hamamlı geniş otaq.', 'Просторный номер с большой кроватью.'),
            price: 160.00,
            capacity: 2,
            amenities: ['Sea View', 'King Bed', 'Coffee Machine'],
            images: [img1],
            status: 'AVAILABLE' as const,
          },
          {
            hotelId: hotelId,
            roomType: 'Executive Suite',
            name: loc('Executive Suite with Lounge Access', 'Lounge Girişli Executive Suite', 'Номер Представительский Люкс'),
            description: loc('High-floor suite with separate living room.', 'Ayrıca qonaq otağı olan yüksək mərtəbəli lyuks otaq.', 'Люкс на высоком этаже с гостиной.'),
            price: 350.00,
            capacity: 4,
            amenities: ['Jacuzzi', 'Lounge Access', 'Balcony'],
            images: [img2],
            status: 'AVAILABLE' as const,
          },
        ];

        for (const room of rooms) {
          const roomRes = await fetch(`${BASE_URL}/api/services/hotel/rooms`, {
            method: 'POST',
            headers: { ...authHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify(room),
          });
          const roomResult = await roomRes.json();
          if (roomRes.ok) {
            console.log(`  🛏️ Created Room: ${room.name.en}`);
          } else {
            console.error('  ❌ Room error:', roomResult);
          }
        }
      }

      // ── 4. SEED RENT-A-CAR DOMAIN ───────────────────────────────────
      console.log('\n🚗 Seeding Rent-a-Car Domain...');
      const carCoDir = path.join(testImagesDir, 'rentacarCompanies');
      const carDir = path.join(testImagesDir, 'rentacarCars');

      const carCoImages = fs.readdirSync(carCoDir).map((f) => path.join(carCoDir, f));
      const carImages = fs.readdirSync(carDir).map((f) => path.join(carDir, f));

      const carCompanies = [
        {
          name: loc('Baku Luxury Auto Rent', 'Baku Luxury Auto Rent', 'Baku Luxury Auto Rent'),
          about: loc('Premium sports and luxury car rentals with VIP service.', 'VIP xidmətlə premium idman və lüks avtomobil icarəsi.', 'Аренда премиум спортивных и люксовых авто.'),
          serviceType: 'RENT_A_CAR' as const,
        },
        {
          name: loc('Avis Rent a Car Azerbaijan', 'Avis Rent a Car Azerbaijan', 'Avis Rent a Car Azerbaijan'),
          about: loc('Reliable sedan and SUV rentals for business and leisure.', 'Biznes və istirahət üçün etibarlı sedan və SUV icarəsi.', 'Надежная аренда седанов и внедорожников.'),
          serviceType: 'RENT_A_CAR' as const,
        },
      ];

      for (let i = 0; i < carCompanies.length; i++) {
        const profileUrl = await uploadImageFile(carCoImages[i % carCoImages.length]!, 'rentacarCompanies');
        const bannerUrl = await uploadImageFile(carCoImages[(i + 1) % carCoImages.length]!, 'rentacarCompanies');

        const companyRes = await fetch(`${BASE_URL}/api/services/rentacar/companies`, {
          method: 'POST',
          headers: { ...authHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...carCompanies[i],
            profileImage: profileUrl,
            bannerImage: bannerUrl,
            images: [profileUrl],
          }),
        });
        const companyResult = await companyRes.json();
        if (!companyRes.ok) {
          console.error('Failed to create car company:', companyResult);
          continue;
        }
        const companyId = companyResult.data.id;
        console.log(`✨ Created Rent-a-Car Company: ${carCompanies[i]!.name.en} (${companyId})`);

        // Add Cars
        const carImg1 = await uploadImageFile(carImages[(i * 3) % carImages.length]!, 'rentacarCars');
        const carImg2 = await uploadImageFile(carImages[(i * 3 + 1) % carImages.length]!, 'rentacarCars');

        const cars = [
          {
            companyId: companyId,
            brand: 'BMW',
            model: '5 Series M Sport',
            year: 2024,
            category: 'Luxury Sedan',
            transmission: 'AUTOMATIC' as const,
            fuelType: 'PETROL' as const,
            seats: 5,
            price: 120.00,
            images: [carImg1, carImg2],
            features: ['Leather Interior', 'GPS Navigation', '360 Camera'],
            status: 'AVAILABLE' as const,
          },
          {
            companyId: companyId,
            brand: 'Toyota',
            model: 'Land Cruiser Prado',
            year: 2023,
            category: 'SUV 4x4',
            transmission: 'AUTOMATIC' as const,
            fuelType: 'DIESEL' as const,
            seats: 7,
            price: 150.00,
            images: [carImg2],
            features: ['4WD Offroad', 'Sunroof', '7 Seats'],
            status: 'AVAILABLE' as const,
          },
        ];

        for (const car of cars) {
          const carRes = await fetch(`${BASE_URL}/api/services/rentacar/cars`, {
            method: 'POST',
            headers: { ...authHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
          });
          const carResult = await carRes.json();
          if (carRes.ok) {
            console.log(`  🚘 Created Car: ${car.brand} ${car.model}`);
          } else {
            console.error('  ❌ Car error:', carResult);
          }
        }
      }

      // ── 5. SEED INCLUDED SERVICES ────────────────────────────────────
      console.log('\n🎒 Seeding Included Services...');
      const sharedServices = [
        { name: loc('Hotel Pickup & Dropoff', 'Otelə Çatdırılma və Geri Dönüş', 'Трансфер из отеля и обратно'), icon: 'bus', serviceType: 'TRAVEL' as const },
        { name: loc('Professional English Guide', 'Peşəkar Bələdçi', 'Профессиональный гид'), icon: 'user-check', serviceType: 'TRAVEL' as const },
        { name: loc('Traditional Lunch Included', 'Milli Nahar Daxildir', 'Традиционный обед включен'), icon: 'utensils', serviceType: 'TRAVEL' as const },
      ];

      const createdServiceIds: string[] = [];
      for (const service of sharedServices) {
        const svcRes = await fetch(`${BASE_URL}/api/services/included-services`, {
          method: 'POST',
          headers: { ...authHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify(service),
        });
        const svcData = await svcRes.json();
        if (svcRes.ok) {
          console.log(`  ✔️ Created Included Service: ${service.name.en} (${svcData.data.id})`);
          createdServiceIds.push(svcData.data.id);
        } else {
          console.error('  ❌ Service error:', svcData);
        }
      }

      // ── 6. SEED TRAVEL DOMAIN ───────────────────────────────────────
      console.log('\n✈️ Seeding Travel Domain...');
      const travelCoDir = path.join(testImagesDir, 'travelCompanies');
      const travelTourDir = path.join(testImagesDir, 'travelTours');

      const travelCoImages = fs.readdirSync(travelCoDir).map((f) => path.join(travelCoDir, f));
      const travelTourImages = fs.readdirSync(travelTourDir).map((f) => path.join(travelTourDir, f));

      const travelCompanies = [
        {
          name: loc('Silk Road Travel Azerbaijan', 'Silk Road Travel Azerbaijan', 'Silk Road Travel Azerbaijan'),
          about: loc('Top-rated travel agency offering guided tours and excursions.', 'Ekskursiya və turlar təklif edən yüksək reytinqli səyahət agentliyi.', 'Туристическое агентство с гидами и экскурсиями.'),
          serviceType: 'TRAVEL' as const,
        },
        {
          name: loc('Gobustan & Baku Tours', 'Qobustan və Bakı Turları', 'Туры в Гобустан и Баку'),
          about: loc('Specialized eco-tours and cultural heritage experiences.', 'Xüsusi eko-turlar və mədəni irs ekskursiyaları.', 'Специализированные эко-туры и культурные экскурсии.'),
          serviceType: 'TRAVEL' as const,
        },
      ];

      for (let i = 0; i < travelCompanies.length; i++) {
        const profileUrl = await uploadImageFile(travelCoImages[i % travelCoImages.length]!, 'travelCompanies');
        const bannerUrl = await uploadImageFile(travelCoImages[(i + 1) % travelCoImages.length]!, 'travelCompanies');

        const companyRes = await fetch(`${BASE_URL}/api/services/travel/companies`, {
          method: 'POST',
          headers: { ...authHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...travelCompanies[i],
            profileImage: profileUrl,
            bannerImage: bannerUrl,
            images: [profileUrl],
          }),
        });
        const companyResult = await companyRes.json();
        if (!companyRes.ok) {
          console.error('Failed to create travel company:', companyResult);
          continue;
        }
        const companyId = companyResult.data.id;
        console.log(`✨ Created Travel Company: ${travelCompanies[i]!.name.en} (${companyId})`);

        // Add Tours
        const tourImg1 = await uploadImageFile(travelTourImages[(i * 3) % travelTourImages.length]!, 'travelTours');
        const tourImg2 = await uploadImageFile(travelTourImages[(i * 3 + 1) % travelTourImages.length]!, 'travelTours');

        const tours = [
          {
            companyId: companyId,
            categories: ['Day Tours', 'Historical'],
            title: loc('Gobustan & Mud Volcanoes Tour', 'Qobustan və palçıq vulkanları turu', 'Тур в Гобустан и грязевые вулканы'),
            duration: '1 Day',
            startDate: '2026-09-01T09:00:00.000Z',
            endDate: '2026-09-01T18:00:00.000Z',
            price: 75.00,
            images: [tourImg1, tourImg2],
            includedServices: createdServiceIds,
            status: 'ACTIVE' as const,
          },
          {
            companyId: companyId,
            categories: ['Mountain', 'Nature'],
            title: loc('Gabala & Sheki Mountain Excursion', 'Qəbələ və Şəki dağ ekskursiyası', 'Горная экскурсия в Габалу и Шеки'),
            duration: '2 Days',
            startDate: '2026-09-10T08:00:00.000Z',
            endDate: '2026-09-11T20:00:00.000Z',
            price: 190.00,
            images: [tourImg2],
            includedServices: createdServiceIds,
            status: 'ACTIVE' as const,
          },
        ];

        for (const tour of tours) {
          const tourRes = await fetch(`${BASE_URL}/api/services/travel/tours`, {
            method: 'POST',
            headers: { ...authHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify(tour),
          });
          const tourResult = await tourRes.json();
          if (tourRes.ok) {
            console.log(`  🚩 Created Tour: ${tour.title.en}`);
          } else {
            console.error('  ❌ Tour error:', tourResult);
          }
        }
      }

      // ── 7. SEED HOME BANNERS ─────────────────────────────────────────
      console.log('\n🎨 Seeding Homepage Banners...');
      const bannerDir = path.join(testImagesDir, 'banners');
      const bannerImages = fs.readdirSync(bannerDir).map((f) => path.join(bannerDir, f));

      const banners = [
        { link: '/services/hotel', order: 1, isActive: true },
        { link: '/services/rentacar', order: 2, isActive: true },
        { link: '/services/travel', order: 3, isActive: true },
      ];

      for (let i = 0; i < banners.length; i++) {
        const bannerImg = await uploadImageFile(bannerImages[i % bannerImages.length]!, 'banners');
        const bRes = await fetch(`${BASE_URL}/api/home/banner`, {
          method: 'POST',
          headers: { ...authHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...banners[i],
            image: bannerImg,
          }),
        });
        if (bRes.ok) {
          console.log(`✨ Created Banner #${i + 1} (${banners[i]!.link})`);
        } else {
          const err = await bRes.json();
          console.error('❌ Banner error:', err);
        }
      }

      console.log('\n🎉 ALL DOMAIN SEEDING COMPLETED SUCCESSFULLY!');
    } catch (err) {
      console.error('❌ Fatal error during seeding:', err);
    } finally {
      server.close(() => {
        console.log('🏁 Server closed.');
        process.exit(0);
      });
    }
  });
}

main();
