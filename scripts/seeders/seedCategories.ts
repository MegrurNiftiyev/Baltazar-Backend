import fs from 'fs';
import path from 'path';
import type { SeedContext } from './utils.js';

export async function seedCategories(ctx: SeedContext) {
  console.log('\n🏷️ Seeding Categories...');
  const jsonPath = path.join(process.cwd(), 'scripts', 'data', 'categories.json');
  const categoriesData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const createdCategories: Record<string, string> = {}; // name.en -> id

  for (const cat of categoriesData) {
    const res = await fetch(`${ctx.baseUrl}/api/categories`, {
      method: 'POST',
      headers: { ...ctx.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(cat),
    });
    const result = await res.json();
    if (res.ok) {
      const id = result.data.id;
      createdCategories[cat.name.en] = id;
      console.log(`✨ Created Category: [${cat.serviceType}] ${cat.name.en} (${id})`);
    } else {
      console.error(`❌ Category error:`, result);
    }
  }

  return createdCategories;
}
