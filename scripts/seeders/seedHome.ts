import fs from 'fs';
import path from 'path';
import type { SeedContext } from './utils.js';
import { clearBanners } from '../../src/modules/home/home.service.js';

export async function seedHome(ctx: SeedContext) {
  console.log('\n🎨 Cleaning old banners and seeding Home Banners...');
  await clearBanners();
  console.log('✅ Cleaned legacy banners from database!');

  const bannerDir = path.join(ctx.testImagesDir, 'banners');
  const bannerImages = fs.readdirSync(bannerDir).map((f) => path.join(bannerDir, f));

  const banners = [
    { serviceType: 'HOTEL' as const, order: 1, isActive: true },
    { serviceType: 'RENT_A_CAR' as const, order: 2, isActive: true },
    { serviceType: 'TRAVEL' as const, order: 3, isActive: true },
    { serviceType: 'FOOD' as const, order: 4, isActive: true },
  ];

  for (let i = 0; i < banners.length; i++) {
    const bannerImg = await ctx.uploadImageFile(bannerImages[i % bannerImages.length]!, 'banners');
    const bRes = await fetch(`${ctx.baseUrl}/api/home/banner`, {
      method: 'POST',
      headers: { ...ctx.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...banners[i],
        image: bannerImg,
      }),
    });
    const bData = await bRes.json();
    if (bRes.ok) {
      console.log(`✨ Created Banner #${i + 1} (${banners[i]!.serviceType}) -> ID: ${bData.data?.id}`);
    } else {
      console.error('❌ Banner error:', bData);
    }
  }
}
