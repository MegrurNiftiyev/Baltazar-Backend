import fs from 'fs';
import path from 'path';
import type { SeedContext } from './utils.js';

export async function seedIncludedServices(ctx: SeedContext) {
  console.log('\n🧰 Seeding Included Services...');
  const jsonPath = path.join(process.cwd(), 'scripts', 'data', 'includedServices.json');
  const servicesData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const createdServices: Record<string, string> = {}; // name.en -> id

  for (const item of servicesData) {
    const res = await fetch(`${ctx.baseUrl}/api/services/included-services/${item.serviceType}`, {
      method: 'POST',
      headers: { ...ctx.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    const result = await res.json();
    if (res.ok) {
      const id = result.data.id;
      createdServices[item.name.en] = id;
      console.log(`✨ Created Included Service: [${item.serviceType}] ${item.name.en} (${id})`);
    } else {
      console.error(`❌ Included Service error:`, result);
    }
  }

  return createdServices;
}
