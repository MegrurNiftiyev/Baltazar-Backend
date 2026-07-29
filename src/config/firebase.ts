import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { env } from './env.js';

const serviceAccount: ServiceAccount = {
  projectId: env.FIREBASE_PROJECT_ID,
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
});

/**
 * Firestore database instance — used across all modules.
 */
export const db = getFirestore();
export const bucket: ReturnType<ReturnType<typeof getStorage>['bucket']> = getStorage().bucket(
  env.FIREBASE_STORAGE_BUCKET,
);
