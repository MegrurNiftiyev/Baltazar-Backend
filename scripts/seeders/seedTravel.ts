import fs from 'fs';
import path from 'path';
import type { SeedContext } from './utils.js';

export async function seedTravel(ctx: SeedContext, createdIncludedServiceIds: Record<string, string>) {
  console.log('\n✈️ Seeding Travel Domain...');
  const jsonPath = path.join(process.cwd(), 'scripts', 'data', 'travel.json');
  const travelData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const companyDir = path.join(ctx.testImagesDir, 'travelCompanies');
  const tourDir = path.join(ctx.testImagesDir, 'travelTours');
  const fallbackDir = path.join(ctx.testImagesDir, 'travel');

  const companyImages = fs.readdirSync(companyDir).map((f) => path.join(companyDir, f));
  const tourImages = fs.existsSync(tourDir)
    ? fs.readdirSync(tourDir).map((f) => path.join(tourDir, f))
    : fs.readdirSync(fallbackDir).map((f) => path.join(fallbackDir, f));

  const createdCompanyIds: string[] = [];

  for (let i = 0; i < travelData.companies.length; i++) {
    const comp = travelData.companies[i];
    const profileUrl = await ctx.uploadImageFile(companyImages[i % companyImages.length]!, 'travelCompanies');
    const bannerUrl = await ctx.uploadImageFile(companyImages[(i + 1) % companyImages.length]!, 'travelCompanies');

    const sectionOrders = [
      ['ABOUT', 'GALLERY', 'ITEMS'],
      ['ITEMS', 'ABOUT'],
      ['GALLERY'],
      ['ABOUT', 'ITEMS']
    ];
    const sectionOrder = sectionOrders[i % sectionOrders.length];

    const res = await fetch(`${ctx.baseUrl}/api/companies`, {
      method: 'POST',
      headers: { ...ctx.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...comp,
        serviceType: 'TRAVEL',
        profileImage: profileUrl,
        bannerImage: bannerUrl,
        status: 'ACTIVE',
        sectionOrder,
      }),
    });
    const result = await res.json();
    if (res.ok) {
      createdCompanyIds.push(result.data.id);
      console.log(`✨ Created Travel Company: ${comp.name.en} (${result.data.id})`);
    } else {
      console.error('❌ Travel company error:', result);
    }
  }

  // Get included service IDs array
  const incServiceIds = Object.values(createdIncludedServiceIds);

  const createdServices: Array<{ serviceType: string; id: string; companyId?: string }> = [];

  for (let i = 0; i < travelData.tours.length; i++) {
    const tour = travelData.tours[i];
    const compId = createdCompanyIds[tour.companyIndex];
    if (!compId) continue;

    const img1 = await ctx.uploadImageFile(tourImages[i % tourImages.length]!, 'travelTours');
    const img2 = await ctx.uploadImageFile(tourImages[(i + 1) % tourImages.length]!, 'travelTours');

    const res = await fetch(`${ctx.baseUrl}/api/services/travel/tours`, {
      method: 'POST',
      headers: { ...ctx.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyId: compId,
        categories: tour.categories,
        title: tour.title,
        duration: tour.duration,
        startDate: tour.startDate,
        endDate: tour.endDate,
        includedServices: incServiceIds.slice(0, 3), // Attach first 3 included services
        price: tour.price,
        roadmap: tour.roadmap,
        images: [img1, img2],
        status: 'ACTIVE',
      }),
    });
    const result = await res.json();
    if (res.ok) {
      console.log(`  🗺️ Created Tour: ${tour.title.en}`);
      createdServices.push({ serviceType: 'TRAVEL', id: result.data.id, companyId: compId });
    } else {
      console.error('  ❌ Tour error:', result);
    }
  }

  return createdServices;
}
