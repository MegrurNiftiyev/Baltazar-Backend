import 'dotenv-flow/config';
import { db } from '../../src/config/firebase.js';
import { COLLECTIONS } from '../../src/config/collections.js';

const isDryRun = process.argv.includes('--dry-run');

async function setupExploreSections() {
  console.log(`\n📦 Starting Setup Explore Sections Migration ${isDryRun ? '(DRY-RUN MODE)' : ''}...\n`);

  const sectionsCol = db.collection(COLLECTIONS.HOME_SECTIONS);
  const snapshot = await sectionsCol.get();

  const defaultSections = [
    { id: 'sec-hotel', key: 'HOTEL', serviceType: 'HOTEL', order: 1, isActive: true },
    { id: 'sec-car', key: 'RENT_A_CAR', serviceType: 'RENT_A_CAR', order: 2, isActive: true },
    { id: 'sec-travel', key: 'TRAVEL', serviceType: 'TRAVEL', order: 3, isActive: true },
    { id: 'sec-food', key: 'FOOD', serviceType: 'FOOD', order: 4, isActive: true },
  ];

  let updatedCount = 0;
  const batch = db.batch();

  for (const sec of defaultSections) {
    const existing = snapshot.docs.find(
      (d) => d.id === sec.id || d.data().serviceType === sec.serviceType,
    );

    if (!existing) {
      updatedCount++;
      console.log(`[${isDryRun ? 'DRY-RUN' : 'CREATE SECTION'}] ${sec.serviceType} (order: ${sec.order})`);
      if (!isDryRun) {
        batch.set(sectionsCol.doc(sec.id), sec);
      }
    } else {
      updatedCount++;
      console.log(`[${isDryRun ? 'DRY-RUN' : 'UPDATE SECTION'}] ${sec.serviceType} -> order: ${sec.order}`);
      if (!isDryRun) {
        batch.update(existing.ref, { order: sec.order });
      }
    }
  }

  if (!isDryRun && updatedCount > 0) {
    await batch.commit();
  }

  console.log(`\n✅ Setup explore sections finished: ${updatedCount} section(s) configured.\n`);
}

setupExploreSections()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Setup explore sections failed:', err);
    process.exit(1);
  });
