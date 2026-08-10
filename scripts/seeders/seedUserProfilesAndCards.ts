import fs from 'fs';
import path from 'path';
import type { SeedContext } from './utils.js';
import { env } from '../../src/config/env.js';

export async function seedUserProfilesAndCards(
  ctx: SeedContext,
  testUsers: Array<{ userId: string; email: string; token: string }>
) {
  console.log('\n👤 Seeding User Profiles and Payment Cards...');
  const result = [];

  const cardsSeedPath = path.join(process.cwd(), 'scripts', 'data', 'cards.seed.json');
  const userProfilesSeedPath = path.join(process.cwd(), 'scripts', 'data', 'user-profiles.seed.json');
  const cardsSeed = JSON.parse(fs.readFileSync(cardsSeedPath, 'utf8'));
  const userProfilesSeed = JSON.parse(fs.readFileSync(userProfilesSeedPath, 'utf8'));

  for (let index = 0; index < testUsers.length; index++) {
    const user = testUsers[index]!;

    // Complete Profile
    const profile = userProfilesSeed[index % userProfilesSeed.length];

    const profileRes = await fetch(`${ctx.baseUrl}/api/users/me`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalInfo: {
          dateOfBirth: profile.dateOfBirth,
          address: profile.address,
          idNumber: profile.idNumber,
        },
        driverLicense: {
          licenseNumber: profile.driverLicenseNumber,
          expiryDate: profile.driverLicenseExpiry,
        },
        passport: {
          passportNumber: profile.passportNumber,
          expiryDate: profile.passportExpiry,
        },
      }),
    });

    if (!profileRes.ok) {
      const data = await profileRes.json();
      console.error(`❌ Failed to update profile for ${user.email}:`, data);
    }

    // Attach Card
    const card = cardsSeed[index % cardsSeed.length];

    // Ensure payment card exists on external Payment Gateway simulator
    try {
      await fetch(`${env.PAYMENT_GATEWAY_URL}/api/payments/cards/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardNumber: card.cardNumber,
          paymentMethodId: card.paymentMethodId,
          cardHolder: card.cardHolder,
          expiryMonth: card.expiryMonth,
          expiryYear: card.expiryYear,
          cvv: card.cvv,
          brand: card.brand,
          last4: card.last4,
          balance: card.balance ?? 100000,
          currency: card.currency ?? 'AZN',
          status: card.status ?? 'ACTIVE',
          forcedResult: card.forcedResult ?? null,
        }),
      });
    } catch {
      // Ignore if external gateway is unavailable
    }

    const cardRes = await fetch(`${ctx.baseUrl}/api/payment/add-card`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethodId: card.paymentMethodId,
        brand: card.brand,
        last4: card.last4,
        expiryMonth: card.expiryMonth,
        expiryYear: card.expiryYear,
      }),
    });

    if (!cardRes.ok) {
      const data = await cardRes.json();
      console.error(`❌ Failed to add card for ${user.email}:`, data);
    } else {
      console.log(`💳 ${user.email} → ${card.brand} •••• ${card.last4}`);
    }

    result.push({
      userId: user.userId,
      email: user.email,
      token: user.token,
      paymentMethodId: card.paymentMethodId,
    });
  }

  console.log('✅ Completed User Profiles and Cards seeding.\n');
  return result;
}
