import fs from 'fs';
import path from 'path';
import type { SeedContext } from './utils.js';
import { clearBanners } from '../../src/modules/home/home.service.js';

export async function seedHome(ctx: SeedContext) {
  console.log('\n🎨 Cleaning old banners and seeding Home Banners...');
  await clearBanners();
  console.log('✅ Cleaned legacy banners from database!');

  const bannerDir = path.join(ctx.testImagesDir, 'banners');

  const banners = [
    {
      serviceType: 'HOTEL' as const,
      imageFile: 'hotel.png',
      order: 1,
      isActive: true,
      title: { az: 'Ən Yaxşı Otellər', en: 'Best Hotels', ru: 'Лучшие Отели' },
      desc: { az: 'Rahatlığınız üçün mükəmməl seçimlər', en: 'Perfect choices for your comfort', ru: 'Идеальный выбор для вашего комфорта' }
    },
    {
      serviceType: 'RENT_A_CAR' as const,
      imageFile: 'rentacar.png',
      order: 2,
      isActive: true,
      title: { az: 'Avtomobil İcarəsi', en: 'Car Rental', ru: 'Аренда Автомобилей' },
      desc: { az: 'Səyahətiniz üçün ən uyğun avtomobillər', en: 'Best cars for your journey', ru: 'Лучшие автомобили для вашей поездки' }
    },
    {
      serviceType: 'TRAVEL' as const,
      imageFile: 'travel.png',
      order: 3,
      isActive: true,
      title: { az: 'Unudulmaz Səyahətlər', en: 'Unforgettable Travels', ru: 'Незабываемые Путешествия' },
      desc: { az: 'Yeni yerlər kəşf edin', en: 'Discover new places', ru: 'Откройте для себя новые места' }
    },
    {
      serviceType: 'FOOD' as const,
      imageFile: 'food.png',
      order: 4,
      isActive: true,
      title: { az: 'Dadlı Təamlar', en: 'Delicious Meals', ru: 'Вкусные Блюда' },
      desc: { az: 'Ən ləzzətli yeməklər qapınızda', en: 'The most delicious food at your door', ru: 'Самая вкусная еда у вашей двери' }
    },
  ];

  for (let i = 0; i < banners.length; i++) {
    const banner = banners[i]!;
    const imagePath = path.join(bannerDir, banner.imageFile);
    if (!fs.existsSync(imagePath)) {
      console.error(`❌ Banner image file missing: ${imagePath}`);
      continue;
    }

    const bannerImgUrl = await ctx.uploadImageFile(imagePath, 'banners');
    const bRes = await fetch(`${ctx.baseUrl}/api/home/banner`, {
      method: 'POST',
      headers: { ...ctx.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceType: banner.serviceType,
        title: banner.title,
        desc: banner.desc,
        order: banner.order,
        isActive: banner.isActive,
        image: bannerImgUrl,
      }),
    });
    const bData = await bRes.json();
    if (bRes.ok) {
      console.log(`✨ Created Banner #${banner.order} (${banner.serviceType}) with ${banner.imageFile} -> ID: ${bData.data?.id}`);
    } else {
      console.error('❌ Banner error:', bData);
    }
  }
}
