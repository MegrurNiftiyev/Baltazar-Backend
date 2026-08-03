import fs from 'fs';
import path from 'path';
import type { SeedContext } from './utils.js';

export async function seedFood(ctx: SeedContext) {
  console.log('\n🍕 Seeding Food Domain...');
  const jsonPath = path.join(process.cwd(), 'scripts', 'data', 'food.json');
  const foodData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const companyDir = path.join(ctx.testImagesDir, 'foodCompanies');
  const itemDir = path.join(ctx.testImagesDir, 'foodItems');

  const companyImages = fs.readdirSync(companyDir).map((f) => path.join(companyDir, f));
  const itemImages = fs.readdirSync(itemDir).map((f) => path.join(itemDir, f));

  const createdCompanyIds: string[] = [];

  for (let i = 0; i < foodData.companies.length; i++) {
    const comp = foodData.companies[i];
    const logoUrl = await ctx.uploadImageFile(companyImages[i % companyImages.length]!, 'foodCompanies');
    const bannerUrl = await ctx.uploadImageFile(companyImages[(i + 1) % companyImages.length]!, 'foodCompanies');

    const res = await fetch(`${ctx.baseUrl}/api/services/food/companies`, {
      method: 'POST',
      headers: { ...ctx.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...comp,
        serviceType: 'FOOD',
        logo: logoUrl,
        images: [bannerUrl],
        status: 'ACTIVE',
      }),
    });
    const result = await res.json();
    if (res.ok) {
      createdCompanyIds.push(result.data.id);
      console.log(`✨ Created Food Company: ${comp.name.en} (${result.data.id})`);
    } else {
      console.error('❌ Food company error:', result);
    }
  }

  for (let i = 0; i < foodData.items.length; i++) {
    const item = foodData.items[i];
    const compId = createdCompanyIds[item.companyIndex];
    if (!compId) continue;

    const imgUrl = await ctx.uploadImageFile(itemImages[i % itemImages.length]!, 'foodItems');

    const res = await fetch(`${ctx.baseUrl}/api/services/food/items`, {
      method: 'POST',
      headers: { ...ctx.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyId: compId,
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price,
        ingredients: item.ingredients,
        calories: item.calories,
        protein: item.protein,
        fat: item.fat,
        carb: item.carb,
        images: [imgUrl],
        status: 'AVAILABLE',
      }),
    });
    const result = await res.json();
    if (res.ok) {
      console.log(`  🍔 Created Food Item: ${item.name.en}`);
    } else {
      console.error('  ❌ Food item error:', result);
    }
  }
}
