import { db } from '../../config/firebase.js';
import { env } from '../../config/env.js';
import { AppError } from '../../errors/AppError.js';
import type { AddCardInput, PayInput } from './payment.schema.js';
import { COLLECTIONS } from '../../config/collections.js';

const paymentMethodsCollection = db.collection(COLLECTIONS.PAYMENT_METHODS);
const transactionsCollection = db.collection(COLLECTIONS.TRANSACTIONS);
const flowBoxesCollection = db.collection(COLLECTIONS.FLOW_BOXES);

// ── Helpers ────────────────────────────────────────────────────────────

/**
 * Proxy request to the external Payment Gateway Simulator.
 */
async function gatewayRequest(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${env.PAYMENT_GATEWAY_URL}${path}`, {
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

// ── Public API ─────────────────────────────────────────────────────────

/**
 * Get all saved payment methods (cards) for a user.
 * Only stores last4, brand, paymentMethodId — never raw card data.
 */
export async function getAllCards(userId: string) {
  const snapshot = await paymentMethodsCollection
    .where('userId', '==', userId)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/**
 * Add a card — proxies to the external gateway, stores only a tokenized reference.
 * Raw card data (full number, CVV) is NEVER persisted in Firestore.
 */
export async function addCard(userId: string, input: AddCardInput) {
  // Send raw card data to the payment gateway only
  const gatewayResponse = await gatewayRequest('/api/payments/methods', {
    cardNumber: input.cardNumber,
    expiryMonth: input.expiryMonth,
    expiryYear: input.expiryYear,
    cvv: input.cvv,
    cardholderName: input.cardholderName,
  }) as { paymentMethodId: string; brand: string; last4: string };

  // Store only the tokenized reference in Firestore
  const docRef = await paymentMethodsCollection.add({
    userId,
    paymentMethodId: gatewayResponse.paymentMethodId,
    brand: gatewayResponse.brand,
    last4: gatewayResponse.last4,
    cardholderName: input.cardholderName,
    createdAt: new Date().toISOString(),
  });

  return {
    id: docRef.id,
    paymentMethodId: gatewayResponse.paymentMethodId,
    brand: gatewayResponse.brand,
    last4: gatewayResponse.last4,
  };
}

/**
 * Process payment for a FlowBox.
 * Proxies to external gateway, creates a Transaction doc, updates FlowBox status.
 * Idempotent on `providerEventId` to prevent duplicate charges.
 */
export async function processPayment(userId: string, input: PayInput) {
  // Verify FlowBox exists and belongs to user
  const flowBoxDoc = await flowBoxesCollection.doc(input.flowBoxId).get();
  if (!flowBoxDoc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }

  const flowBox = flowBoxDoc.data()!;
  if (flowBox.userId !== userId) {
    throw new AppError(403, 'FORBIDDEN');
  }

  if (flowBox.status === 'CONFIRMED') {
    throw new AppError(400, 'FLOWBOX_ALREADY_PAID');
  }

  if (flowBox.status === 'CANCELLED' || flowBox.status === 'EXPIRED') {
    throw new AppError(400, 'VALIDATION_ERROR', `FlowBox is ${flowBox.status.toLowerCase()}`);
  }

  // Verify payment method belongs to user
  const methodSnapshot = await paymentMethodsCollection
    .where('userId', '==', userId)
    .where('paymentMethodId', '==', input.paymentMethodId)
    .limit(1)
    .get();

  if (methodSnapshot.empty) {
    throw new AppError(404, 'NOT_FOUND');
  }

  // Compute amount from FlowBox details
  const amount = flowBox.details?.serverComputedPrice;
  if (typeof amount !== 'number' || amount <= 0) {
    throw new AppError(400, 'PRICE_NOT_COMPUTED');
  }

  // Charge via gateway
  const chargeResponse = await gatewayRequest('/api/payments/charges', {
    paymentMethodId: input.paymentMethodId,
    amount,
    currency: 'USD',
    description: `FlowBox ${input.flowBoxId}`,
  }) as { chargeId: string; status: string };

  // Idempotency check — don't create duplicate transactions
  const existingTx = await transactionsCollection
    .where('providerEventId', '==', chargeResponse.chargeId)
    .limit(1)
    .get();

  if (!existingTx.empty) {
    return { id: existingTx.docs[0]!.id, ...existingTx.docs[0]!.data() };
  }

  // Create Transaction document
  const txRef = await transactionsCollection.add({
    userId,
    flowBoxId: input.flowBoxId,
    paymentMethodId: input.paymentMethodId,
    amount,
    currency: 'USD',
    providerEventId: chargeResponse.chargeId,
    status: chargeResponse.status === 'succeeded' ? 'SUCCESS' : 'FAILED',
    createdAt: new Date().toISOString(),
  });

  // Update FlowBox status on successful payment
  if (chargeResponse.status === 'succeeded') {
    await flowBoxesCollection.doc(input.flowBoxId).update({
      status: 'CONFIRMED',
      paidAt: new Date().toISOString(),
    });
  }

  return {
    id: txRef.id,
    flowBoxId: input.flowBoxId,
    amount,
    currency: 'USD',
    status: chargeResponse.status === 'succeeded' ? 'SUCCESS' : 'FAILED',
  };
}

/**
 * Get payment summary for a FlowBox.
 */
export async function getPaymentSummary(flowBoxId: string, userId: string) {
  const flowBoxDoc = await flowBoxesCollection.doc(flowBoxId).get();
  if (!flowBoxDoc.exists) {
    throw new AppError(404, 'NOT_FOUND');
  }

  const flowBox = flowBoxDoc.data()!;
  if (flowBox.userId !== userId) {
    throw new AppError(403, 'FORBIDDEN');
  }

  // Fetch related transactions
  const txSnapshot = await transactionsCollection
    .where('flowBoxId', '==', flowBoxId)
    .get();

  const transactions = txSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return {
    flowBoxId,
    serviceType: flowBox.serviceType,
    serviceId: flowBox.serviceId,
    status: flowBox.status,
    details: flowBox.details,
    transactions,
  };
}
