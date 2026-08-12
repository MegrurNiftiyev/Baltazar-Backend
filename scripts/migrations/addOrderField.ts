import 'dotenv-flow/config';
import { db } from '../../src/config/firebase.js';
import { COLLECTIONS } from '../../src/config/collections.js';


const isDryRun = process.argv.includes('--dry-run');

async function processCollection(collectionName: string) {
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    console.log(`ℹ️ Collection '${collectionName}' is empty. Skipping.`);
    return 0;
  }

  let updatedCount = 0;
  let batch = db.batch();
  let batchSize = 0;

  let index = 0;
  for (const doc of snapshot.docs) {
    index++;
    const data = doc.data();

    // IDEMPOTENT CHECK: Skip documents that already have an `order` field defined
    if (typeof data.order === 'number') {
      continue;
    }

    const newOrder = index * 10;
    updatedCount++;

    console.log(`[${isDryRun ? 'DRY-RUN' : 'UPDATE'}] ${collectionName}/${doc.id} -> setting order: ${newOrder}`);

    if (!isDryRun) {
      batch.update(doc.ref, { order: newOrder });
      batchSize++;

      if (batchSize >= 400) {
        await batch.commit();
        batch = db.batch();
        batchSize = 0;
      }
    }
  }

  if (!isDryRun && batchSize > 0) {
    await batch.commit();
  }

  return updatedCount;
}

async function ensureHomeSections() {
  const homeSectionsRef = db.collection(COLLECTIONS.HOME_SECTIONS);
  const snapshot = await homeSectionsRef.get();

  if (!snapshot.empty) {
    console.log(`ℹ️ Collection '${COLLECTIONS.HOME_SECTIONS}' already exists with ${snapshot.size} sections.`);
    return await processCollection(COLLECTIONS.HOME_SECTIONS);
  }

  console.log(`🚀 Creating initial default '${COLLECTIONS.HOME_SECTIONS}' documents...`);
  const initialSections = [
    { id: 'sec-car', key: 'RENT_A_CAR', serviceType: 'RENT_A_CAR', order: 10, isActive: true },
    { id: 'sec-hotel', key: 'HOTEL', serviceType: 'HOTEL', order: 20, isActive: true },
    { id: 'sec-travel', key: 'TRAVEL', serviceType: 'TRAVEL', order: 30, isActive: true },
    { id: 'sec-food', key: 'FOOD', serviceType: 'FOOD', order: 40, isActive: true },
  ];

  if (isDryRun) {
    console.log(`[DRY-RUN] Would create ${initialSections.length} home sections.`);
    return initialSections.length;
  }

  const batch = db.batch();
  for (const section of initialSections) {
    const docRef = homeSectionsRef.doc(section.id);
    batch.set(docRef, section);
  }
  await batch.commit();
  return initialSections.length;
}

async function runMigration() {
  console.log(`\n📦 Starting Order Field Migration Script ${isDryRun ? '(DRY-RUN MODE)' : ''}...\n`);

  const collectionsToMigrate = [
    COLLECTIONS.HOTELS,
    COLLECTIONS.CARS,
    COLLECTIONS.FOOD_ITEMS,
    COLLECTIONS.TRAVELS,
    COLLECTIONS.CATEGORIES,
    COLLECTIONS.BANNERS,
    COLLECTIONS.COMPANIES,
  ];

  const stats: Record<string, number> = {};

  for (const collectionName of collectionsToMigrate) {
    console.log(`\n🔍 Processing collection '${collectionName}'...`);
    const count = await processCollection(collectionName);
    stats[collectionName] = count;
  }

  console.log(`\n🔍 Checking Home Sections...`);
  stats[COLLECTIONS.HOME_SECTIONS] = await ensureHomeSections();

  console.log('\n================ Migration Stats Summary ================');
  for (const [col, count] of Object.entries(stats)) {
    console.log(`  - ${col}: ${count} document(s) updated/created`);
  }
  console.log('=========================================================\n');
}

runMigration()
  .then(() => {
    console.log('✅ Migration process completed successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  });
