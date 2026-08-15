import 'dotenv-flow/config';
import fs from 'fs';
import path from 'path';
import { db } from '../src/config/firebase.js';
import { COLLECTIONS } from '../src/config/collections.js';

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

const DEFAULT_AUTHORS = [
  {
    name: 'Aydin Aliyev',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  },
  {
    name: 'Leyla Hasanova',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    name: 'Elvin Mammadov',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
  },
  {
    name: 'Nigar Guliyeva',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
  },
  {
    name: 'Tural Rzayev',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  {
    name: 'Gunel Kerimova',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  },
  {
    name: 'Rashad Gasimov',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  },
];

async function main() {
  console.log('🌟 Starting direct review seeding for all existing items...');

  const reviewCommentsSeedPath = path.join(process.cwd(), 'scripts', 'data', 'review-comments.seed.json');
  let reviewComments: string[] = [
    'Great experience, highly recommend!',
    'Everything went smoothly, arrived right on time.',
    'Very happy with the service, will book again.',
    'Good value for the price.',
    'Quality matched exactly what I expected.',
    'Staff were friendly and helpful throughout.',
    'Would use this again without hesitation.',
    'Excellent customer service and top notch quality!',
    'Super fast delivery and clean packaging.',
    'Comfortable, clean, and very convenient.',
    'Exceeded my expectations, 10/10 service!',
  ];
  if (fs.existsSync(reviewCommentsSeedPath)) {
    try {
      reviewComments = JSON.parse(fs.readFileSync(reviewCommentsSeedPath, 'utf8'));
    } catch (_) {}
  }

  // Get all registered users to use as real authors if available
  const usersSnap = await db.collection(COLLECTIONS.USERS).get();
  const realUsers = usersSnap.docs.map((d) => ({
    id: d.id,
    name: d.data().name || 'User',
    avatarUrl: d.data().avatarUrl || null,
  }));

  console.log(`Found ${realUsers.length} existing users in database.`);

  const DOMAINS: Array<{
    targetType: 'RENT_A_CAR' | 'TRAVEL' | 'HOTEL' | 'FOOD' | 'COMPANY';
    collection: string;
  }> = [
    { targetType: 'RENT_A_CAR', collection: COLLECTIONS.CARS },
    { targetType: 'HOTEL', collection: COLLECTIONS.HOTELS },
    { targetType: 'TRAVEL', collection: COLLECTIONS.TRAVELS },
    { targetType: 'FOOD', collection: COLLECTIONS.FOOD_ITEMS },
    { targetType: 'COMPANY', collection: COLLECTIONS.COMPANIES },
  ];

  let totalReviewsAdded = 0;

  for (const domain of DOMAINS) {
    const itemsSnap = await db.collection(domain.collection).get();
    console.log(`\n📂 Processing ${domain.collection} (${itemsSnap.size} items)...`);

    for (let i = 0; i < itemsSnap.docs.length; i++) {
      const itemDoc = itemsSnap.docs[i]!;
      const itemId = itemDoc.id;

      // Check existing reviews for this item
      const existingReviewsSnap = await db
        .collection(COLLECTIONS.REVIEWS)
        .where('targetType', '==', domain.targetType)
        .where('targetId', '==', itemId)
        .get();

      const existingCount = existingReviewsSnap.size;
      const targetCount = 2 + (i % 2); // 2 or 3 reviews

      const reviewsToAdd = Math.max(0, targetCount - existingCount);

      if (reviewsToAdd > 0) {
        let ratings: number[] = existingReviewsSnap.docs.map((d) => (d.data().rating as number) || 5);

        for (let r = 0; r < reviewsToAdd; r++) {
          const authorIdx = (i + r) % Math.max(realUsers.length, DEFAULT_AUTHORS.length);
          const author = realUsers.length > 0
            ? (realUsers[authorIdx % realUsers.length]!)
            : (DEFAULT_AUTHORS[authorIdx % DEFAULT_AUTHORS.length]!);

          const rating = 4 + (Math.random() > 0.3 ? 1 : 0); // 4 or 5 stars
          const comment = randomFrom(reviewComments);
          const createdAt = new Date(Date.now() - Math.floor(Math.random() * 10 * 86400000)).toISOString();

          await db.collection(COLLECTIONS.REVIEWS).add({
            userId: (author as any).id || `user-mock-${authorIdx}`,
            userName: author.name,
            avatarUrl: author.avatarUrl,
            targetType: domain.targetType,
            targetId: itemId,
            rating,
            comment,
            createdAt,
          });

          ratings.push(rating);
          totalReviewsAdded++;
        }

        // Recalculate rating on document
        const newCount = ratings.length;
        const newSum = ratings.reduce((a, b) => a + b, 0);
        const newAverage = newCount > 0 ? round2(newSum / newCount) : 5;

        await itemDoc.ref.update({
          rating: newAverage,
          ratingSum: newSum,
          reviewCount: newCount,
        });

        console.log(`  ⭐ Updated ${itemId}: ${newCount} reviews (avg rating: ${newAverage})`);
      } else {
        console.log(`  ✓ ${itemId} already has ${existingCount} reviews.`);
      }
    }
  }

  console.log(`\n🎉 Successfully added ${totalReviewsAdded} new reviews across all products!`);
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Error seeding reviews:', err);
  process.exit(1);
});
