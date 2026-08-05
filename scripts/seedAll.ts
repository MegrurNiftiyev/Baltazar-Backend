import 'dotenv-flow/config';
import path from 'path';
import type { Server } from 'http';
import { app } from '../src/app.js';
import { uploadImageFileHelper, type SeedContext } from './seeders/utils.js';
import { seedCategories } from './seeders/seedCategories.js';
import { seedIncludedServices } from './seeders/seedIncludedServices.js';
import { seedFood } from './seeders/seedFood.js';
import { seedHotels } from './seeders/seedHotels.js';
import { seedRentACar } from './seeders/seedRentACar.js';
import { seedTravel } from './seeders/seedTravel.js';
import { seedHome } from './seeders/seedHome.js';
import { seedUserProfilesAndCards } from './seeders/seedUserProfilesAndCards.js';
import { seedOrdersPaymentsReviews } from './seeders/seedOrdersPaymentsReviews.js';
import { seedTestUsers } from './seeders/seedTestUsers.js';
const PORT = 3099;
const BASE_URL = `http://localhost:${PORT}`;

async function main() {
  const server: Server = app.listen(PORT, async () => {
    console.log(`🚀 Master Seeding Server running on ${BASE_URL}`);

    try {
      // 1. Authenticate (Login as Admin)
      console.log('🔑 Logging in as Admin (megrurniftieyv@gmail.com)...');
      let loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'megrurniftieyv@gmail.com',
          password: 'Password123@',
        }),
      });

      let loginData = await loginRes.json();
      if (!loginRes.ok) {
        console.log('Login failed, creating account...');
        const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Admin User',
            email: 'megrurniftieyv@gmail.com',
            password: 'Password123@',
            phone: '+994501234567',
            region: 'AZ',
            language: 'en',
          }),
        });
        const regData = await regRes.json();
        if (!regRes.ok) {
          console.error('Registration failed:', regData);
          process.exit(1);
        }
        loginData = regData;
      }

      const token = loginData.data?.accessToken;
      if (!token) {
        console.error('Failed to obtain access token:', loginData);
        process.exit(1);
      }
      console.log('✅ Admin authenticated successfully!');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const ctx: SeedContext = {
        baseUrl: BASE_URL,
        token,
        headers,
        testImagesDir: path.resolve('testimages'),
        uploadImageFile: (filePath: string, folder: string) => uploadImageFileHelper(BASE_URL, token, filePath, folder),
      };

      console.log('🗑️  Resetting database...');
      const resetRes = await fetch(`${BASE_URL}/api/admin/reset-database`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!resetRes.ok) {
        console.error('❌ Database reset failed:', await resetRes.json());
        process.exit(1);
      }
      console.log('✅ Database reset complete.\n');

      // 2. Seed Categories & Included Services first
      await seedCategories(ctx);
      const createdIncServices = await seedIncludedServices(ctx);

      // 3. Execute domain seeders
      const allCreatedServices: Array<{ serviceType: string; id: string; companyId?: string }> = [];
      const foodServices = await seedFood(ctx);
      allCreatedServices.push(...foodServices);
      const hotelServices = await seedHotels(ctx);
      allCreatedServices.push(...hotelServices);
      const rentACarServices = await seedRentACar(ctx);
      allCreatedServices.push(...rentACarServices);
      const travelServices = await seedTravel(ctx, createdIncServices);
      allCreatedServices.push(...travelServices);

      await seedHome(ctx);

      const testUsers = await seedTestUsers(ctx);
      const usersWithCards = await seedUserProfilesAndCards(ctx, testUsers);
      await seedOrdersPaymentsReviews(ctx, usersWithCards, allCreatedServices);

      console.log('\n🎉 ALL DOMAIN SEEDERS EXECUTED SUCCESSFULLY!');
    } catch (err) {
      console.error('❌ Fatal error during master seeding:', err);
    } finally {
      server.close(() => {
        console.log('🏁 Master Seeding Server closed.');
        process.exit(0);
      });
    }
  });
}

main();
