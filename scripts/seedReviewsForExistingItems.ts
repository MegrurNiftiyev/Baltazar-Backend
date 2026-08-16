import 'dotenv-flow/config';
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
    name: 'Aydın Əliyev',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  },
  {
    name: 'Leyla Həsənova',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    name: 'Elvin Məmmədov',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
  },
  {
    name: 'Nigar Quliyeva',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
  },
  {
    name: 'Tural Rzayev',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  {
    name: 'Günel Kərimova',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  },
  {
    name: 'Rəşad Qasımov',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  },
  {
    name: 'Sevinc İsmayılova',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
  },
];

const DOMAIN_COMMENTS: Record<string, string[]> = {
  FOOD: [
    'Çox ləzzətli idi, yemək isti və vaxtında çatdırıldı!',
    'Porsiyalar böyük və təzədir. Hər kəsə tövsiyə edirəm.',
    'Təamlar möhtəşəmdir, xidmət səviyyəsi çox xoşuma gəldi.',
    'Super sürətli çatdırılma və səliqəli qablaşdırma!',
    'Həqiqətən yüksək keyfiyyət və əla dad, təkrar sifariş edəcəyəm.',
    'Delicious food, arrived fresh and right on time!',
    'Great portion size and fantastic flavors. Highly recommended.',
  ],
  RENT_A_CAR: [
    'Avtomobil tam saz vəziyyətdə və təmiz təhvil verildi. Çox razı qaldım.',
    'Proses çox rahat və sürətli oldu, heç bir problem yaşamadıq.',
    'Mükəmməl avtomobil, uzun yolda çox rahat və qənaətcil oldu.',
    'Xidmət çox peşəkar idi, açarları operativ təhvil aldıq.',
    'Car was spotless and drove smoothly throughout our entire trip!',
    'Quick check-in, smooth ride, and excellent condition.',
  ],
  HOTEL: [
    'Otaq çox səliqəli və geniş idi, mənzərə heyranedicidir.',
    'Xidmət yüksək səviyyədədir, səhər yeməyi çox dadlı idi.',
    'Hər şey yüksək səviyyədə təşkil olunmuşdu, təkrar qalacağıq.',
    'Rahat yataqlar, təmiz otaqlar və çox nəzakətli personal.',
    'Wonderful stay, comfortable room and amazing amenities.',
    'Top notch hospitality and very relaxing atmosphere!',
  ],
  TRAVEL: [
    'Tur bələdçisi çox peşəkar və mehriban idi. Unudulmaz xatirələr qaldı.',
    'Marşrut çox maraqlı təşkil edilmişdi, hər dəqiqəsindən zövq aldıq.',
    'Hər kəsə bu turu tövsiyə edirəm, çox əla təcrübə oldu!',
    'Təşkilatçılıq çox yüksək səviyyədə idi, rahat nəqliyyat və gözəl yerlər.',
    'Incredible tour experience with a wonderful guide!',
    'Well organized trip with stunning views and great stops.',
  ],
  COMPANY: [
    'Etibarlı və peşəkar şirkət, operativ dəstək göstərdilər.',
    'Xidmət keyfiyyəti və müştəriyə münasibət ən yüksək səviyyədədir.',
    'Hər zaman ilk seçimimizdir, təşəkkürlər!',
    'Peşəkar komanda və dürüst xidmət, hamıya tövsiyə edirəm.',
    'Professional team, reliable service, and always responsive.',
    'Excellent partner with consistently high standards!',
  ],
};

const BANNERS_DATA = [
  {
    serviceType: 'HOTEL',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
    order: 1,
    isActive: true,
    title: { az: 'Ən Yaxşı Otellər', en: 'Best Hotels', ru: 'Лучшие Отели' },
    desc: { az: 'Rahatlığınız üçün mükəmməl seçimlər', en: 'Perfect choices for your comfort', ru: 'Идеальный выбор для вашего комфорта' },
  },
  {
    serviceType: 'RENT_A_CAR',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
    order: 2,
    isActive: true,
    title: { az: 'Avtomobil İcarəsi', en: 'Car Rental', ru: 'Аренда Автомобилей' },
    desc: { az: 'Səyahətiniz üçün ən uyğun avtomobillər', en: 'Best cars for your journey', ru: 'Лучшие автомобили для вашей поездки' },
  },
  {
    serviceType: 'TRAVEL',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80',
    order: 3,
    isActive: true,
    title: { az: 'Unudulmaz Səyahətlər', en: 'Unforgettable Travels', ru: 'Незабываемые Путешествия' },
    desc: { az: 'Yeni yerlər kəşf edin', en: 'Discover new places', ru: 'Откройте для себя новые места' },
  },
  {
    serviceType: 'FOOD',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
    order: 4,
    isActive: true,
    title: { az: 'Dadlı Təamlar', en: 'Delicious Meals', ru: 'Вкусные Блюда' },
    desc: { az: 'Ən ləzzətli yeməklər qapınızda', en: 'The most delicious food at your door', ru: 'Самая вкусная еда у вашей двери' },
  },
];

async function updateHomeBanners() {
  console.log('\n🎨 Updating Home Banners with high quality images...');
  const bannersSnap = await db.collection(COLLECTIONS.BANNERS).get();
  const batch = db.batch();
  bannersSnap.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();

  for (const b of BANNERS_DATA) {
    await db.collection(COLLECTIONS.BANNERS).add({
      ...b,
      createdAt: new Date().toISOString(),
    });
  }
  console.log('✅ Home Banners successfully updated with 1600px Unsplash photography!');
}

async function main() {
  console.log('🌟 Starting direct review & banner seeding for all items and companies...');

  await updateHomeBanners();

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

    const commentsPool = DOMAIN_COMMENTS[domain.targetType] || DOMAIN_COMMENTS.COMPANY!;

    for (let i = 0; i < itemsSnap.docs.length; i++) {
      const itemDoc = itemsSnap.docs[i]!;
      const itemId = itemDoc.id;

      // Ensure hotel amenities & about are populated
      if (domain.targetType === 'HOTEL') {
        const hotelData = itemDoc.data();
        const updates: Record<string, any> = {};
        if (!hotelData.amenities || hotelData.amenities.length === 0) {
          updates.amenities = ['Free WiFi', 'Swimming Pool', 'Spa & Wellness', 'Airport Shuttle', 'Fitness Center', 'Room Service'];
        }
        if (!hotelData.about && hotelData.description) {
          updates.about = hotelData.description;
        }
        if (Object.keys(updates).length > 0) {
          await itemDoc.ref.update(updates);
          console.log(`  ✨ Backfilled amenities & about for HOTEL/${itemId}`);
        }
      }

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
          const comment = randomFrom(commentsPool);
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

        console.log(`  ⭐ Updated ${domain.targetType}/${itemId}: ${newCount} reviews (avg rating: ${newAverage})`);
      } else {
        console.log(`  ✓ ${domain.targetType}/${itemId} already has ${existingCount} reviews.`);
      }
    }
  }

  console.log(`\n🎉 Successfully added ${totalReviewsAdded} new reviews across all products and companies!`);
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Error seeding reviews & banners:', err);
  process.exit(1);
});
