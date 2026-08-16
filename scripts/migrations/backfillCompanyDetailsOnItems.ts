import 'dotenv-flow/config';
import { db } from '../../src/config/firebase.js';
import { COLLECTIONS } from '../../src/config/collections.js';

async function main() {
  console.log('🔄 Starting backfill of companyName and companyProfilePhoto on all domain items...');

  // Fetch all companies to create a lookup map
  const companiesSnap = await db.collection(COLLECTIONS.COMPANIES).get();
  const companyMap = new Map<string, { name: any; profileImage: string; logo: string }>();

  for (const doc of companiesSnap.docs) {
    const data = doc.data();
    companyMap.set(doc.id, {
      name: data.name,
      profileImage: data.profileImage || data.logo || '',
      logo: data.logo || data.profileImage || '',
    });
  }

  console.log(`Found ${companyMap.size} companies in database.`);

  const DOMAINS = [
    { name: 'CARS', collection: COLLECTIONS.CARS },
    { name: 'HOTELS', collection: COLLECTIONS.HOTELS },
    { name: 'TRAVELS', collection: COLLECTIONS.TRAVELS },
    { name: 'FOOD_ITEMS', collection: COLLECTIONS.FOOD_ITEMS },
  ];

  let totalUpdated = 0;

  for (const domain of DOMAINS) {
    const snap = await db.collection(domain.collection).get();
    console.log(`\n📂 Processing ${domain.name} (${snap.size} items)...`);

    for (const doc of snap.docs) {
      const data = doc.data();
      const companyId = data.companyId;

      if (!companyId) {
        console.warn(`  ⚠️ Item ${doc.id} has no companyId, skipping.`);
        continue;
      }

      const compInfo = companyMap.get(companyId);
      if (!compInfo) {
        console.warn(`  ⚠️ Company ${companyId} not found for item ${doc.id}`);
        continue;
      }

      const updates: Record<string, any> = {
        companyName: compInfo.name,
        companyProfilePhoto: compInfo.profileImage || compInfo.logo,
      };

      await doc.ref.update(updates);
      totalUpdated++;
      console.log(`  ✅ Updated ${domain.name}/${doc.id} with company: ${compInfo.name?.en || compInfo.name}`);
    }
  }

  console.log(`\n🎉 Successfully backfilled company details on ${totalUpdated} items without deleting existing data!`);
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Error during backfill:', err);
  process.exit(1);
});
