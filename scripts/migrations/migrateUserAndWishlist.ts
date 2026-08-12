import 'dotenv-flow/config';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../src/config/firebase.js';
import { COLLECTIONS } from '../../src/config/collections.js';

const isDryRun = process.argv.includes('--dry-run');

async function migrateUserAndWishlist() {
  console.log(`\n📦 Starting User Flattening & Wishlist Migration ${isDryRun ? '(DRY-RUN MODE)' : ''}...\n`);

  const usersCol = db.collection(COLLECTIONS.USERS);
  const wishlistCol = db.collection(COLLECTIONS.WISHLIST);

  const snapshot = await usersCol.get();
  if (snapshot.empty) {
    console.log(`ℹ️ Collection '${COLLECTIONS.USERS}' is empty.`);
    return;
  }

  let updatedUsersCount = 0;
  let migratedWishlistCount = 0;

  for (const userDoc of snapshot.docs) {
    const userId = userDoc.id;
    const data = userDoc.data();
    const updates: Record<string, any> = {};

    // 1. Flatten profileCompleteness
    const hasPersonalInfo = Boolean(data.personalInfo ?? data.profileCompleteness?.personalInfo ?? false);
    const hasDriverLicense = Boolean(data.driverLicense ?? data.profileCompleteness?.driverLicense ?? false);
    const hasPassport = Boolean(data.passport ?? data.profileCompleteness?.passport ?? false);

    if (data.personalInfo !== hasPersonalInfo) updates.personalInfo = hasPersonalInfo;
    if (data.driverLicense !== hasDriverLicense) updates.driverLicense = hasDriverLicense;
    if (data.passport !== hasPassport) updates.passport = hasPassport;

    if (data.profileCompleteness !== undefined) {
      updates.profileCompleteness = FieldValue.delete();
    }

    // 2. Migrate embedded wishlist array to dedicated wishlist collection
    if (Array.isArray(data.wishlist)) {
      for (const item of data.wishlist) {
        if (item && item.serviceId && item.serviceType) {
          const docId = `${userId}_${item.serviceType}_${item.serviceId}`;
          migratedWishlistCount++;
          console.log(`  [${isDryRun ? 'DRY-RUN' : 'WISHLIST CREATE'}] ${docId}`);

          if (!isDryRun) {
            await wishlistCol.doc(docId).set(
              {
                userId,
                serviceId: item.serviceId,
                serviceType: item.serviceType,
                createdAt: data.createdAt || new Date().toISOString(),
              },
              { merge: true },
            );
          }
        }
      }
      updates.wishlist = FieldValue.delete();
    }

    if (Object.keys(updates).length > 0) {
      updatedUsersCount++;
      console.log(`[${isDryRun ? 'DRY-RUN' : 'UPDATE USER'}] ${userId} -> keys: ${Object.keys(updates).join(', ')}`);

      if (!isDryRun) {
        await usersCol.doc(userId).update(updates);
      }
    }
  }

  console.log('\n================ Migration Summary ================');
  console.log(`  - Users updated: ${updatedUsersCount}`);
  console.log(`  - Wishlist items migrated: ${migratedWishlistCount}`);
  console.log('===================================================\n');
}

migrateUserAndWishlist()
  .then(() => {
    console.log('✅ User & Wishlist migration completed successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  });
