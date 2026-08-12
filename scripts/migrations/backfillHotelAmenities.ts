import 'dotenv-flow/config';
import { db } from '../../src/config/firebase.js';
import { COLLECTIONS } from '../../src/config/collections.js';

async function backfillHotelAmenities() {
  console.log('\n📦 Starting Hotel Amenities Backfill...\n');

  const hotelsCol = db.collection(COLLECTIONS.HOTELS);
  const snapshot = await hotelsCol.get();

  if (snapshot.empty) {
    console.log('ℹ️ No hotels found in database.');
    return;
  }

  const sampleAmenitiesMap: Record<string, string[]> = {
    'Fairmont Flame Towers': ['WiFi', 'Pool', 'Spa & Wellness', 'Fitness Center', 'Restaurant', 'Bar', 'Valet Parking'],
    'Hilton Baku Executive': ['WiFi', 'Pool', 'Executive Lounge', 'Fitness Center', 'Restaurant', 'Room Service'],
    'Grand Hotel Europe Baku': ['WiFi', 'Spa & Wellness', 'Conference Room', 'Restaurant', 'Bar', 'Airport Transfer'],
  };

  const defaultAmenities = ['WiFi', 'Pool', 'Fitness Center', 'Restaurant', 'Bar'];

  let updatedCount = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    if (!Array.isArray(data.amenities) || data.amenities.length === 0) {
      const name = data.name || data.title || '';
      const amenities = sampleAmenitiesMap[name] || defaultAmenities;
      await doc.ref.update({ amenities });
      updatedCount++;
      console.log(`[UPDATED HOTEL AMENITIES] ${doc.id} (${name}) -> ${amenities.join(', ')}`);
    }
  }

  console.log(`\n✅ Hotel amenities backfill finished: ${updatedCount} hotel(s) updated.\n`);
}

backfillHotelAmenities()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Backfill failed:', err);
    process.exit(1);
  });
