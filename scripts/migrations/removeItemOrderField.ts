import 'dotenv-flow/config';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../src/config/firebase.js';
import { COLLECTIONS } from '../../src/config/collections.js';

const isDryRun = process.argv.includes('--dry-run');

async function processCollectionRemoveOrder(collectionName: string) {
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    console.log(`ℹ️ Collection '${collectionName}' is empty. Skipping.`);
    return 0;
  }

  let deletedCount = 0;
  let batch = db.batch();
  let batchSize = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    if (data.order !== undefined) {
      deletedCount++;
      console.log(`[${isDryRun ? 'DRY-RUN' : 'DELETE ORDER'}] ${collectionName}/${doc.id}`);

      if (!isDryRun) {
        batch.update(doc.ref, { order: FieldValue.delete() });
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

  return deletedCount;
}

async function runRemoveOrderMigration() {
  console.log(`\n📦 Starting Remove Item-Level Order Migration ${isDryRun ? '(DRY-RUN MODE)' : ''}...\n`);

  const collectionsToClean = [
    COLLECTIONS.HOTELS,
    COLLECTIONS.ROOMS,
    COLLECTIONS.CARS,
    COLLECTIONS.FOOD_ITEMS,
    COLLECTIONS.TRAVELS,
  ];

  const stats: Record<string, number> = {};

  for (const col of collectionsToClean) {
    console.log(`\n🔍 Processing collection '${col}'...`);
    const count = await processCollectionRemoveOrder(col);
    stats[col] = count;
  }

  console.log('\n================ Remove Order Summary ================');
  for (const [col, count] of Object.entries(stats)) {
    console.log(`  - ${col}: ${count} document(s) updated (order deleted)`);
  }
  console.log('======================================================\n');
}

runRemoveOrderMigration()
  .then(() => {
    console.log('✅ Remove item-level order migration completed successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  });
