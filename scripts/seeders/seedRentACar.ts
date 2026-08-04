import fs from 'fs';
import path from 'path';
import type { SeedContext } from './utils.js';

export async function seedRentACar(ctx: SeedContext) {
  console.log('\n🚗 Seeding Rent-A-Car Domain...');
  const jsonPath = path.join(process.cwd(), 'scripts', 'data', 'rentacar.json');
  const carData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const companyDir = path.join(ctx.testImagesDir, 'rentacarCompanies');
  const carDir = path.join(ctx.testImagesDir, 'rentacarCars');

  const companyImages = fs.readdirSync(companyDir).map((f) => path.join(companyDir, f));
  const carImages = fs.readdirSync(carDir).map((f) => path.join(carDir, f));

  const createdCompanyIds: string[] = [];

  for (let i = 0; i < carData.companies.length; i++) {
    const comp = carData.companies[i];
    const profileUrl = await ctx.uploadImageFile(companyImages[i % companyImages.length]!, 'rentacarCompanies');
    const bannerUrl = await ctx.uploadImageFile(companyImages[(i + 1) % companyImages.length]!, 'rentacarCompanies');

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
        serviceType: 'RENT_A_CAR',
        profileImage: profileUrl,
        bannerImage: bannerUrl,
        status: 'ACTIVE',
        sectionOrder,
      }),
    });
    const result = await res.json();
    if (res.ok) {
      createdCompanyIds.push(result.data.id);
      console.log(`✨ Created Car Rental Company: ${comp.name.en} (${result.data.id})`);
    } else {
      console.error('❌ Car rental company error:', result);
    }
  }

  for (let i = 0; i < carData.cars.length; i++) {
    const car = carData.cars[i];
    const compId = createdCompanyIds[car.companyIndex];
    if (!compId) continue;

    const img1 = await ctx.uploadImageFile(carImages[i % carImages.length]!, 'rentacarCars');
    const img2 = await ctx.uploadImageFile(carImages[(i + 1) % carImages.length]!, 'rentacarCars');

    const res = await fetch(`${ctx.baseUrl}/api/services/rentacar/cars`, {
      method: 'POST',
      headers: { ...ctx.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyId: compId,
        brand: car.brand,
        model: car.model,
        year: car.year,
        category: car.category,
        transmission: car.transmission,
        fuelType: car.fuelType,
        seats: car.seats,
        price: car.price,
        features: car.features,
        images: [img1, img2],
        status: 'AVAILABLE',
      }),
    });
    const result = await res.json();
    if (res.ok) {
      console.log(`  🚘 Created Car: ${car.brand} ${car.model}`);
    } else {
      console.error('  ❌ Car error:', result);
    }
  }
}
