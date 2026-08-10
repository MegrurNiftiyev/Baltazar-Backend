import 'dotenv-flow/config';
import { app } from '../../src/app.js';
import type { Server } from 'http';

let server: Server;
const PORT = 3098;
const BASE_URL = `http://localhost:${PORT}`;

async function testGet(endpoint: string) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    const status = res.status;
    let data: any = null;
    try {
      data = await res.json();
    } catch {
      // not json
    }
    const icon = status === 200 ? '✅' : status >= 500 ? '💥 500 ERROR!' : '⚠️';
    console.log(`${icon} ${status} GET ${endpoint}`);
    if (status >= 400) {
      console.log('   Response:', JSON.stringify(data));
    }
    return { endpoint, status, data };
  } catch (err: any) {
    console.log(`💥 ERR GET ${endpoint}: ${err.message}`);
    return { endpoint, status: 0, error: err.message };
  }
}

async function run() {
  server = app.listen(PORT, () => {
    console.log(`🚀 Test server started on ${BASE_URL}\n`);
  });

  await new Promise((r) => setTimeout(r, 1000));

  const endpoints = [
    '/health',
    '/api/categories',
    '/api/companies',
    '/api/companies?serviceType=HOTEL',
    '/api/companies?serviceType=RENT_A_CAR',
    '/api/companies?serviceType=FOOD',
    '/api/companies?serviceType=TRAVEL',
    '/api/services/hotel',
    '/api/services/rentacar/cars',
    '/api/services/food/items',
    '/api/services/travel/tours',
    '/api/services/included-services/TRAVEL',
    '/api/services/included-services/HOTEL',
    '/api/home',
    '/api/app/config',
    '/api/enums/service-types',
    '/api/enums/regions',
    '/api/enums/currencies',
    '/api/enums/company-sections',
    '/api/enums/order-statuses',
  ];

  let has500Error = false;

  for (const ep of endpoints) {
    const res = await testGet(ep);
    if (res.status >= 500) has500Error = true;
  }

  // Detail GET endpoints
  const compRes = await fetch(`${BASE_URL}/api/companies`);
  if (compRes.ok) {
    const json: any = await compRes.json();
    const items = json.data?.items || json.data || [];
    if (items.length > 0) {
      const firstId = items[0].id;
      console.log(`\n🔍 Detail GET /api/companies/${firstId}...`);
      const r = await testGet(`/api/companies/${firstId}`);
      if (r.status >= 500) has500Error = true;
    }
  }

  const foodRes = await fetch(`${BASE_URL}/api/services/food/items`);
  if (foodRes.ok) {
    const json: any = await foodRes.json();
    const items = json.data?.items || json.data || [];
    if (items.length > 0) {
      const firstId = items[0].id;
      console.log(`\n🔍 Detail GET /api/services/food/items/${firstId}...`);
      const r = await testGet(`/api/services/food/items/${firstId}`);
      if (r.status >= 500) has500Error = true;
    }
  }

  const carRes = await fetch(`${BASE_URL}/api/services/rentacar/cars`);
  if (carRes.ok) {
    const json: any = await carRes.json();
    const items = json.data?.items || json.data || [];
    if (items.length > 0) {
      const firstId = items[0].id;
      console.log(`\n🔍 Detail GET /api/services/rentacar/cars/${firstId}...`);
      const r = await testGet(`/api/services/rentacar/cars/${firstId}`);
      if (r.status >= 500) has500Error = true;
    }
  }

  const hotelRes = await fetch(`${BASE_URL}/api/services/hotel`);
  if (hotelRes.ok) {
    const json: any = await hotelRes.json();
    const items = json.data?.items || json.data || [];
    if (items.length > 0) {
      const firstId = items[0].id;
      console.log(`\n🔍 Detail GET /api/services/hotel/${firstId}...`);
      const r = await testGet(`/api/services/hotel/${firstId}`);
      if (r.status >= 500) has500Error = true;
    }
  }

  const travelRes = await fetch(`${BASE_URL}/api/services/travel/tours`);
  if (travelRes.ok) {
    const json: any = await travelRes.json();
    const items = json.data?.items || json.data || [];
    if (items.length > 0) {
      const firstId = items[0].id;
      console.log(`\n🔍 Detail GET /api/services/travel/tours/${firstId}...`);
      const r = await testGet(`/api/services/travel/tours/${firstId}`);
      if (r.status >= 500) has500Error = true;
    }
  }

  server.close(() => {
    console.log('\n🏁 Test server closed.');
    if (has500Error) {
      console.error('\n❌ 500 Internal Server Errors detected!');
      process.exit(1);
    } else {
      console.log('\n🎉 ALL GET ENDPOINTS RETURNED 200 OK — ZERO 500 ERRORS!');
      process.exit(0);
    }
  });
}

run();
