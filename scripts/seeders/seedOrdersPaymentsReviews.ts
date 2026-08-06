import fs from 'fs';
import path from 'path';
import type { SeedContext } from './utils.js';
import { ORDER_SCREENS } from '../../src/config/orderScreens.js';

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export async function seedOrdersPaymentsReviews(
  ctx: SeedContext,
  usersWithCards: Array<{ userId: string; token: string; paymentMethodId: string }>,
  createdServices: Array<{ serviceType: string; id: string; companyId?: string }>
) {
  console.log('\n🧾 Seeding Orders → Payments → Reviews...');

  const addressesSeedPath = path.join(process.cwd(), 'scripts', 'data', 'addresses.seed.json');
  const reviewCommentsSeedPath = path.join(process.cwd(), 'scripts', 'data', 'review-comments.seed.json');
  const addressesSeed = JSON.parse(fs.readFileSync(addressesSeedPath, 'utf8'));
  const reviewCommentsSeed = JSON.parse(fs.readFileSync(reviewCommentsSeedPath, 'utf8'));

  function mockDataForScreen(screen: string): Record<string, unknown> {
    switch (screen) {
      case 'ADDRESS_SCREEN':
        return { address: randomFrom(addressesSeed.ADDRESS_SCREEN) };
      case 'DELIVERY_ADDRESS_SCREEN':
        return { address: randomFrom(addressesSeed.DELIVERY_ADDRESS_SCREEN) };
      case 'CONFIRM_SCREEN':
        return { confirmed: true };
      case 'PAYMENT_SCREEN':
        return {}; // the actual charge happens separately via /api/payment/pay, this just records the step
      default:
        // PERSONAL_INFO_SCREEN / DRIVER_LICENSE_SCREEN / PASSPORT_INFO_SCREEN —
        // the profile is already complete (Part 3), the backend auto-skips these,
        // but we still send an object so the call never errors on an empty body
        return {};
    }
  }

  async function createAndCompleteOrder(
    ctx: SeedContext,
    user: { userId: string; token: string; paymentMethodId: string },
    service: { serviceType: string; id: string }
  ) {
    const headers = { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' };

    // 1. Create the order
    const orderRes = await fetch(`${ctx.baseUrl}/api/orders`, {
      method: 'POST', headers,
      body: JSON.stringify({ serviceType: service.serviceType, serviceId: service.id }),
    });
    const orderJson = await orderRes.json();
    if (!orderRes.ok) {
      console.error(`  ❌ Failed to create order (${service.serviceType}/${service.id}):`, orderJson);
      return null;
    }
    const orderId = orderJson.data.id;

    // 2. Submit every screen in order, stop when 'DONE' comes back
    const screens = ORDER_SCREENS[service.serviceType as keyof typeof ORDER_SCREENS];
    for (const screen of screens) {
      const stepRes = await fetch(`${ctx.baseUrl}/api/orders/${orderId}/step`, {
        method: 'PUT', headers,
        body: JSON.stringify({ screen, data: mockDataForScreen(screen) }),
      });
      const stepJson = await stepRes.json();
      if (!stepRes.ok) {
        console.error(`  ❌ Step ${screen} failed (order ${orderId}):`, stepJson);
        return null;
      }
      if (stepJson.data?.nextStep === 'DONE' || stepJson.data === 'DONE') break;
    }

    // 3. Pay
    const payRes = await fetch(`${ctx.baseUrl}/api/payment/pay/${orderId}`, {
      method: 'POST', headers,
      body: JSON.stringify({ paymentMethodId: user.paymentMethodId }),
    });
    const payJson = await payRes.json();
    if (!payRes.ok) {
      console.error(`  ❌ Payment failed (order ${orderId}):`, payJson);
      return null;
    }

    console.log(`  ✅ Order CONFIRMED: ${service.serviceType}/${service.id} (${orderId})`);
    return orderId;
  }

  async function createReviewForOrder(
    ctx: SeedContext,
    user: { token: string },
    service: { serviceType: string; id: string }
  ) {
    const headers = { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' };
    const rating = 3 + Math.floor(Math.random() * 3); // 3–5, keeps seed data looking realistic

    const res = await fetch(`${ctx.baseUrl}/api/reviews`, {
      method: 'POST', headers,
      body: JSON.stringify({
        targetType: service.serviceType,
        targetId: service.id,
        rating,
        comment: randomFrom(reviewCommentsSeed),
      }),
    });
    const json = await res.json();
    if (res.ok) {
      console.log(`  ⭐ Review (${rating}/5) — ${service.serviceType}/${service.id}`);
    } else if (json.errorCode === 'ALREADY_REVIEWED') {
      console.log(`  ⚠️  Already reviewed, skipping: ${service.serviceType}/${service.id}`);
    } else {
      console.error(`  ❌ Review failed:`, json);
    }
  }

  const byType = {
    FOOD: createdServices.filter((s) => s.serviceType === 'FOOD'),
    HOTEL: createdServices.filter((s) => s.serviceType === 'HOTEL'),
    RENT_A_CAR: createdServices.filter((s) => s.serviceType === 'RENT_A_CAR'),
    TRAVEL: createdServices.filter((s) => s.serviceType === 'TRAVEL'),
  };

  for (const [i, user] of usersWithCards.entries()) {
    console.log(`\n👤 ${user.userId}`);
    // one order per service type per user (round-robin), skip if that type has no services
    for (const type of ['FOOD', 'RENT_A_CAR', 'HOTEL', 'TRAVEL'] as const) {
      const pool = byType[type];
      if (pool.length === 0) continue;
      const service = pool[i % pool.length]!;

      const orderId = await createAndCompleteOrder(ctx, user, service);
      if (!orderId) continue;

      await createReviewForOrder(ctx, user, service);

      if ((type === 'RENT_A_CAR' || type === 'TRAVEL') && service.companyId) {
        await createReviewForOrder(ctx, user, { serviceType: 'COMPANY', id: service.companyId });
      }
    }
  }

  console.log('\n🎉 Orders/Payments/Reviews seed complete.');
}
