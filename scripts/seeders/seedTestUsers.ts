import fs from 'fs';
import path from 'path';
import type { SeedContext } from './utils.js';

const TEST_USER_COUNT = 5;

const TEST_USER_NAMES = [
  'Aydin Aliyev',
  'Leyla Hasanova',
  'Elvin Mammadov',
  'Nigar Guliyeva',
  'Tural Rzayev',
];

export async function seedTestUsers(ctx: SeedContext) {
  console.log('\n👥 Seeding Test Users...');

  const avatarDir = path.join(ctx.testImagesDir, 'avatars');
  const avatarFiles = fs.readdirSync(avatarDir).map((f) => path.join(avatarDir, f));

  const testUsers: Array<{ userId: string; email: string; token: string }> = [];

  for (let i = 0; i < TEST_USER_COUNT; i++) {
    const email = `testuser${i + 1}@baltazar.test`;
    const password = 'Password123@';

    // Register (each run needs a fresh DB — see #3 below — otherwise this 409s)
    const regRes = await fetch(`${ctx.baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: TEST_USER_NAMES[i % TEST_USER_NAMES.length],
        email,
        password,
        phone: `+99450${1000000 + i}`,
        region: 'AZ',
        language: 'en',
      }),
    });
    const regJson = await regRes.json();
    if (!regRes.ok) {
      console.error(`❌ Failed to register ${email}:`, regJson);
      continue;
    }

    const userId = regJson.data.user.id;
    const token = regJson.data.accessToken;

    // Avatar — upload the image, then reference its URL on the profile
    const avatarPath = avatarFiles[i % avatarFiles.length]!;
    const avatarUrl = await ctx.uploadImageFile(avatarPath, 'avatars');

    const avatarRes = await fetch(`${ctx.baseUrl}/api/users/me/avatar`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatar: avatarUrl }),
    });
    if (!avatarRes.ok) {
      console.error(`❌ Failed to set avatar for ${email}:`, await avatarRes.json());
    }

    console.log(`✅ Test user: ${email}`);
    testUsers.push({ userId, email, token });
  }

  return testUsers;
}
