import 'dotenv-flow/config';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../src/config/firebase.js';
import { COLLECTIONS } from '../../src/config/collections.js';

const isDryRun = process.argv.includes('--dry-run');

async function restructureRooms() {
  const roomsCol = db.collection(COLLECTIONS.ROOMS);
  const snapshot = await roomsCol.get();

  if (snapshot.empty) {
    console.log(`ℹ️ Collection '${COLLECTIONS.ROOMS}' is empty.`);
    return 0;
  }

  let updatedCount = 0;
  let batch = db.batch();
  let batchSize = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const updates: Record<string, any> = {};

    // Convert images: string[] -> single image: string (images[0])
    if (Array.isArray(data.images)) {
      if (!data.image && data.images.length > 0) {
        updates.image = data.images[0];
      }
      updates.images = FieldValue.delete();
    }

    // Delete description field if present
    if (data.description !== undefined) {
      updates.description = FieldValue.delete();
    }

    if (Object.keys(updates).length > 0) {
      updatedCount++;
      console.log(`[${isDryRun ? 'DRY-RUN' : 'UPDATE ROOM'}] ${doc.id}`);

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

async function restructureHotels() {
  const hotelsCol = db.collection(COLLECTIONS.HOTELS);
  const roomsCol = db.collection(COLLECTIONS.ROOMS);
  const snapshot = await hotelsCol.get();

  if (snapshot.empty) {
    console.log(`ℹ️ Collection '${COLLECTIONS.HOTELS}' is empty.`);
    return 0;
  }

  let updatedCount = 0;
  let batch = db.batch();
  let batchSize = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const updates: Record<string, any> = {};

    // Convert single image -> images: [image]
    if (!Array.isArray(data.images)) {
      updates.images = typeof data.image === 'string' && data.image.length > 0 ? [data.image] : [];
    }

    // Delete logo field on Hotel if present
    if (data.logo !== undefined) {
      updates.logo = FieldValue.delete();
    }

    // Delete single price field on Hotel if present
    if (data.price !== undefined) {
      updates.price = FieldValue.delete();
    }

    // Calculate initial priceRange from rooms
    const roomsSnap = await roomsCol.where('hotelId', '==', doc.id).get();
    const prices = roomsSnap.docs
      .map((rDoc) => rDoc.data().price)
      .filter((p) => typeof p === 'number');

    const minPrice = prices.length > 0 ? Math.min(...prices) : typeof data.price === 'number' ? data.price : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : typeof data.price === 'number' ? data.price : 0;
    updates.priceRange = { min: minPrice, max: maxPrice };

    if (Object.keys(updates).length > 0) {
      updatedCount++;
      console.log(`[${isDryRun ? 'DRY-RUN' : 'UPDATE HOTEL'}] ${doc.id} -> priceRange: ${JSON.stringify(updates.priceRange)}`);

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

async function runHotelsRoomsRestructure() {
  console.log(`\n📦 Starting Hotels & Rooms Restructure Migration ${isDryRun ? '(DRY-RUN MODE)' : ''}...\n`);

  console.log(`🔍 Restructuring Rooms...`);
  const roomCount = await restructureRooms();

  console.log(`\n🔍 Restructuring Hotels...`);
  const hotelCount = await restructureHotels();

  console.log('\n================ Restructure Summary ================');
  console.log(`  - Rooms updated: ${roomCount}`);
  console.log(`  - Hotels updated: ${hotelCount}`);
  console.log('=====================================================\n');
}

runHotelsRoomsRestructure()
  .then(() => {
    console.log('✅ Hotels & Rooms restructure migration completed successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Restructure migration failed:', err);
    process.exit(1);
  });
