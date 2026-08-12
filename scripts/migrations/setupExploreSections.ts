import 'dotenv-flow/config';
import { db } from '../../src/config/firebase.js';
import { COLLECTIONS } from '../../src/config/collections.js';

const isDryRun = process.argv.includes('--dry-run');

async function setupExploreSections() {
  console.log(`\n📦 Starting Setup Explore Sections Migration ${isDryRun ? '(DRY-RUN MODE)' : ''}...\n`);

  const sectionsCol = db.collection(COLLECTIONS.HOME_SECTIONS);
  const snapshot = await sectionsCol.get();

  const defaultSections = [
    { id: 'sec-hotel', key: 'HOTEL', serviceType: 'HOTEL', order: 10, isActive: true },
    { id: 'sec-car', key: 'RENT_A_CAR', serviceType: 'RENT_A_CAR', order: 20, isActive: true },
    { id: 'sec-travel', key: 'TRAVEL', serviceType: 'TRAVEL', order: 30, isActive: true },
    { id: 'sec-food', key: 'FOOD', serviceType: 'FOOD', order: 40, isActive: true },
  ];

  let createdCount = 0;
  const batch = db.batch();

  for (const sec of defaultSections) {
    const existing = snapshot.docs.find(
      (d) => d.id === sec.id || d.data().serviceType === sec.serviceType,
    );

    if (!existing) {
      createdCount++;
      console.log(`[${isDryRun ? 'DRY-RUN' : 'CREATE SECTION'}] ${sec.serviceType} (order: ${sec.order})`);
      if (!isDryRun) {
        batch.set(sectionsCol.doc(sec.id), sec);
      }
    } else {
      console.log(`ℹ️ Section '${sec.serviceType}' already exists. Skipping.`);
    }
  }

  if (!isDryRun && createdCount > 0) {
    await batch.commit();
  }

  console.log(`\n✅ Setup explore sections finished: ${createdCount} section(s) created.\n`);
}

setupExploreSections()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Setup explore sections failed:', err);
    process.exit(1);
  });
