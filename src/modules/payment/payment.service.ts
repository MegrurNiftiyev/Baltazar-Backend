import { db } from '../../config/firebase.js';
import { env } from '../../config/env.js';
import { AppError } from '../../errors/AppError.js';
import type { AddCardInput, PayInput } from './payment.schema.js';
import { COLLECTIONS } from '../../config/collections.js';

const paymentMethodsCollection = db.collection(COLLECTIONS.PAYMENT_METHODS);
const transactionsCollection = db.collection(COLLECTIONS.TRANSACTIONS);
const ordersCollection = db.collection(COLLECTIONS.ORDERS);

async function gatewayRequest(path: string, body: Record<string, unknown>) {
  const baseUrl = env.PAYMENT_GATEWAY_URL.replace(/\/+$/, '');
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new AppError(
      response.status >= 500 ? 502 : response.status,
      'PAYMENT_FAILED',
      (errorData as Record<string, string>).message || 'Payment gateway error',
    );
  }

  return response.json();
}

export async function getAllCards(userId: string) {
  let snapshot: FirebaseFirestore.QuerySnapshot;
  try {
    snapshot = await paymentMethodsCollection
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
  } catch (err: any) {
    if (err.code === 9 || (err.message && err.message.toLowerCase().includes('index'))) {
      snapshot = await paymentMethodsCollection
        .where('userId', '==', userId)
        .get();
    } else {
      throw err;
    }
  }

  const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  docs.sort((a: any, b: any) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  return docs;
}

export async function addCard(userId: string, input: AddCardInput) {
  // Check if card already exists for this user to avoid duplicate entries in Firestore
  let existingDoc: FirebaseFirestore.QueryDocumentSnapshot | undefined;
  try {
    const existingSnapshot = await paymentMethodsCollection
      .where('userId', '==', userId)
      .get();
    existingDoc = existingSnapshot.docs.find(
      (doc) => doc.data().paymentMethodId === input.paymentMethodId
    );
  } catch (_err) {
    // Proceed if query fails
  }

  if (existingDoc) {
    return { id: existingDoc.id, ...existingDoc.data() };
  }

  const createdAt = new Date().toISOString();
  const cardData = {
    userId,
    paymentMethodId: input.paymentMethodId,
    brand: input.brand,
    last4: input.last4,
    expiryMonth: input.expiryMonth,
    expiryYear: input.expiryYear,
    createdAt,
  };

  const docRef = await paymentMethodsCollection.add(cardData);

  return {
    id: docRef.id,
    ...cardData,
  };
}

export async function processPayment(userId: string, orderId: string, input: PayInput) {
  await db.runTransaction(async (tx) => {
    const orderRef = ordersCollection.doc(orderId);
    const orderSnap = await tx.get(orderRef);
    if (!orderSnap.exists) throw new AppError(404, 'NOT_FOUND');

    const order = orderSnap.data()!;
    if (order.userId !== userId) throw new AppError(403, 'FORBIDDEN');
    if (order.status === 'PROCESSING') throw new AppError(409, 'PAYMENT_IN_PROGRESS');
    if (order.status === 'CONFIRMED') throw new AppError(400, 'ORDER_ALREADY_PAID');
    if (order.status === 'CANCELLED' || order.status === 'EXPIRED') {
      throw new AppError(400, 'VALIDATION_ERROR', `Order is ${order.status.toLowerCase()}`);
    }

    tx.update(orderRef, { status: 'PROCESSING' });
  });

  const orderDoc = await ordersCollection.doc(orderId).get();
  if (!orderDoc.exists) throw new AppError(404, 'NOT_FOUND');

  const order = orderDoc.data()!;

  let chargeResponse: { chargeId?: string; transactionId?: string; status: string };
  let amount: number;
  try {
    let methodSnapshot: FirebaseFirestore.QuerySnapshot;
    try {
      methodSnapshot = await paymentMethodsCollection
        .where('userId', '==', userId)
        .where('paymentMethodId', '==', input.paymentMethodId)
        .limit(1)
        .get();
    } catch (err: any) {
      if (err.code === 9 || (err.message && err.message.toLowerCase().includes('index'))) {
        const userMethodsSnapshot = await paymentMethodsCollection
          .where('userId', '==', userId)
          .get();
        const matchingDocs = userMethodsSnapshot.docs.filter(
          (doc) => doc.data().paymentMethodId === input.paymentMethodId
        );
        methodSnapshot = {
          empty: matchingDocs.length === 0,
          docs: matchingDocs,
        } as any;
      } else {
        throw err;
      }
    }

    if (methodSnapshot.empty) throw new AppError(404, 'NOT_FOUND', 'Payment method not found or not owned by user');

    amount = order.totalPrice;
    if (typeof amount !== 'number' || amount <= 0) throw new AppError(400, 'PRICE_NOT_COMPUTED');

    chargeResponse = (await gatewayRequest('/api/payments/charges', {
      paymentMethodId: input.paymentMethodId,
      amount,
      currency: 'AZN',
      description: `Order ${orderId}`,
    })) as { chargeId?: string; transactionId?: string; status: string };
  } catch (err) {
    await ordersCollection.doc(orderId).update({ status: 'PENDING' });
    throw err;
  }

  const providerEventId = chargeResponse.transactionId || chargeResponse.chargeId || `txn_${Date.now()}`;

  const existingTx = await transactionsCollection
    .where('providerEventId', '==', providerEventId)
    .limit(1)
    .get();

  if (!existingTx.empty) {
    return { id: existingTx.docs[0]!.id, ...existingTx.docs[0]!.data() };
  }

  const status =
    chargeResponse.status === 'succeeded' || chargeResponse.status === 'SUCCESS' || chargeResponse.status === 'success'
      ? 'SUCCESS'
      : 'FAILED';
  const txRef = await transactionsCollection.add({
    userId,
    orderId,
    paymentMethodId: input.paymentMethodId,
    amount,
    currency: 'AZN',
    providerEventId,
    status,
    createdAt: new Date().toISOString(),
  });

  if (status === 'SUCCESS') {
    await ordersCollection.doc(orderId).update({
      status: 'CONFIRMED',
      paidAt: new Date().toISOString(),
    });
  } else {
    await ordersCollection.doc(orderId).update({ status: 'PENDING' });
  }

  return {
    id: txRef.id,
    orderId,
    amount,
    currency: 'AZN',
    status,
  };
}
