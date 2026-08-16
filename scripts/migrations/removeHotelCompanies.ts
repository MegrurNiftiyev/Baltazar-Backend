import 'dotenv-flow/config';
import { db } from '../../src/config/firebase.js';
import { COLLECTIONS } from '../../src/config/collections.js';
import { FieldValue } from 'firebase-admin/firestore';

async function main() {
  console.log('🧹 Removing hotel companies from COMPANIES collection and unlinking from HOTELS...');

  // 1. Delete companies with serviceType == 'HOTEL'
  const hotelCompaniesSnap = await db.collection(COLLECTIONS.COMPANIES).where('serviceType', '==', 'HOTEL').get();
  console.log(`Found ${hotelCompaniesSnap.size} hotel companies to delete from COMPANIES collection.`);

  for (const doc of hotelCompaniesSnap.docs) {
    const data = doc.data();
    await doc.ref.delete();
    console.log(`  🗑️ Deleted Hotel Company: ${data.name?.en || data.name} (${doc.id})`);
  }

  // 2. Remove company fields from HOTELS collection
  const hotelsSnap = await db.collection(COLLECTIONS.HOTELS).get();
  console.log(`Found ${hotelsSnap.size} hotels in HOTELS collection.`);

  for (const doc of hotelsSnap.docs) {
    await doc.ref.update({
      companyId: FieldValue.delete(),
      companyName: FieldValue.delete(),
      companyProfilePhoto: FieldValue.delete(),
    });
    console.log(`  ✨ Cleaned company fields from Hotel: ${doc.data().name?.en || doc.data().name} (${doc.id})`);
  }

  console.log('🎉 Successfully removed hotel companies and cleaned hotel records!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Error during cleanup:', err);
  process.exit(1);
});
