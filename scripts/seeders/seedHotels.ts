import fs from 'fs';
import path from 'path';
import type { SeedContext } from './utils.js';

export async function seedHotels(ctx: SeedContext) {
  console.log('\n🏨 Seeding Hotel Domain...');
  const jsonPath = path.join(process.cwd(), 'scripts', 'data', 'hotels.json');
  const hotelData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const hotelImagesDir = path.join(ctx.testImagesDir, 'hotels');
  const roomImagesDir = path.join(ctx.testImagesDir, 'hotlerooms');

  const hotelImages = fs.readdirSync(hotelImagesDir).map((f) => path.join(hotelImagesDir, f));
  const roomImages = fs.existsSync(roomImagesDir)
    ? fs.readdirSync(roomImagesDir).map((f) => path.join(roomImagesDir, f))
    : hotelImages;

  const createdServices: Array<{ serviceType: string; id: string; companyId?: string }> = [];

  for (let i = 0; i < hotelData.hotels.length; i++) {
    const hotel = hotelData.hotels[i];
    const logoUrl = await ctx.uploadImageFile(hotelImages[i % hotelImages.length]!, 'hotels');
    const img1 = await ctx.uploadImageFile(hotelImages[(i + 1) % hotelImages.length]!, 'hotels');
    const img2 = await ctx.uploadImageFile(hotelImages[(i + 2) % hotelImages.length]!, 'hotels');

    // 1. Create Hotel Company in COMPANIES collection
    const compRes = await fetch(`${ctx.baseUrl}/api/companies`, {
      method: 'POST',
      headers: { ...ctx.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: hotel.name,
        about: hotel.about,
        serviceType: 'HOTEL',
        logo: logoUrl,
        profileImage: logoUrl,
        bannerImage: img1,
        images: [img1, img2],
        address: hotel.address,
        status: 'ACTIVE',
        sectionOrder: ['ABOUT', 'GALLERY', 'ITEMS'],
      }),
    });
    const compResult = await compRes.json();
    let companyId: string | undefined = undefined;
    if (compRes.ok) {
      companyId = compResult.data.id;
      console.log(`✨ Created Hotel Company: ${hotel.name.en} (${companyId})`);
    } else {
      console.error('❌ Hotel company error:', compResult);
    }

    // 2. Create Hotel Item in HOTELS collection
    const hotelRes = await fetch(`${ctx.baseUrl}/api/services/hotel`, {
      method: 'POST',
      headers: { ...ctx.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyId,
        name: hotel.name,
        about: hotel.about,
        description: hotel.about,
        city: hotel.city,
        address: hotel.address,
        starRating: hotel.starRating,
        amenities: hotel.amenities || [],
        serviceType: 'HOTEL',
        logo: logoUrl,
        images: [img1, img2],
      }),
    });
    const hotelResult = await hotelRes.json();
    if (!hotelRes.ok) {
      console.error('Failed to create hotel:', hotelResult);
      continue;
    }
    const hotelId = hotelResult.data.id;
    console.log(`  🏨 Created Hotel: ${hotel.name.en} (${hotelId})`);

    // 3. Attach hotelId as relatedItemIds to the Hotel Company
    if (companyId) {
      await fetch(`${ctx.baseUrl}/api/companies/${companyId}`, {
        method: 'PUT',
        headers: { ...ctx.headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ relatedItemIds: [hotelId] }),
      });
      console.log(`  🔗 Attached relatedItemId ${hotelId} to Hotel Company ${companyId}`);
    }

    createdServices.push({ serviceType: 'HOTEL', id: hotelId, companyId });

    // Add Rooms with single room image uploaded from testimages/hotlerooms/
    for (let r = 0; r < hotel.rooms.length; r++) {
      const room = hotel.rooms[r];
      const roomImg = await ctx.uploadImageFile(roomImages[(i + r) % roomImages.length]!, 'hotels');

      const roomRes = await fetch(`${ctx.baseUrl}/api/services/hotel/rooms`, {
        method: 'POST',
        headers: { ...ctx.headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelId,
          roomType: room.roomType,
          name: room.name,
          price: room.price,
          capacity: room.capacity,
          amenities: room.amenities,
          image: roomImg,
          status: 'AVAILABLE',
        }),
      });
      const roomResult = await roomRes.json();
      if (roomRes.ok) {
        console.log(`  🛏️ Created Room: ${room.name.en}`);
      } else {
        console.error('  ❌ Room error:', roomResult);
      }
    }
  }

  return createdServices;
}
