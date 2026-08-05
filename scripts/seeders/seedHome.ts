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
    { serviceType: 'HOTEL' as const, imageFile: 'hotel.png', order: 1, isActive: true },
    { serviceType: 'RENT_A_CAR' as const, imageFile: 'rentacar.png', order: 2, isActive: true },
    { serviceType: 'TRAVEL' as const, imageFile: 'travel.png', order: 3, isActive: true },
    { serviceType: 'FOOD' as const, imageFile: 'food.png', order: 4, isActive: true },
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
