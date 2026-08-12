import 'dotenv-flow/config';
import { db } from '../../src/config/firebase.js';
import { COLLECTIONS } from '../../src/config/collections.js';

const isDryRun = process.argv.includes('--dry-run');

const DEFAULT_PRICE_SUFFIXES: Record<string, string> = {
  [COLLECTIONS.HOTELS]: '/ gecə',
  [COLLECTIONS.CARS]: '/ gün',
  [COLLECTIONS.TRAVELS]: 'paket qiyməti',
  [COLLECTIONS.FOOD_ITEMS]: '',
};

async function processExploreCollection(collectionName: string) {
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    console.log(`ℹ️ Collection '${collectionName}' is empty. Skipping.`);
    return 0;
  }

  const defaultSuffix = DEFAULT_PRICE_SUFFIXES[collectionName] ?? '';
  let updatedCount = 0;
  let batch = db.batch();
  let batchSize = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const updates: Record<string, any> = {};

    // IDEMPOTENT CHECK: Only backfill priceSuffix if missing/undefined
    if (typeof data.priceSuffix !== 'string') {
      updates.priceSuffix = defaultSuffix;
    }

    // IDEMPOTENT CHECK: Ensure rating field is defined
    if (data.rating === undefined || data.rating === null) {
      updates.rating = { average: typeof data.starRating === 'number' ? data.starRating : 0, count: 0 };
    }

    if (Object.keys(updates).length > 0) {
      updatedCount++;
      console.log(
        `[${isDryRun ? 'DRY-RUN' : 'UPDATE'}] ${collectionName}/${doc.id} -> setting: ${JSON.stringify(
          updates,
        )}`,
      );

      if (!isDryRun) {
        batch.update(doc.ref, updates);
        batchSize++;

        if (batchSize >= 400) {
          await batch.commit();
          batch = db.batch();
          batchSize = 0;
        }
      }
    }
  }

  if (!isDryRun && batchSize > 0) {
    await batch.commit();
  }

  return updatedCount;
}

async function runExploreMigration() {
  console.log(`\n📦 Starting Explore Card Backfill Migration ${isDryRun ? '(DRY-RUN MODE)' : ''}...\n`);

  const collectionsToMigrate = [
    COLLECTIONS.HOTELS,
    COLLECTIONS.CARS,
    COLLECTIONS.TRAVELS,
    COLLECTIONS.FOOD_ITEMS,
  ];

  const stats: Record<string, number> = {};

  for (const collectionName of collectionsToMigrate) {
    console.log(`\n🔍 Processing collection '${collectionName}'...`);
    const count = await processExploreCollection(collectionName);
    stats[collectionName] = count;
  }

  console.log('\n================ Explore Backfill Summary ================');
  for (const [col, count] of Object.entries(stats)) {
    console.log(`  - ${col}: ${count} document(s) updated`);
  }
  console.log('==========================================================\n');
}

runExploreMigration()
  .then(() => {
    console.log('✅ Explore backfill migration completed successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Explore backfill migration failed:', err);
    process.exit(1);
  });
