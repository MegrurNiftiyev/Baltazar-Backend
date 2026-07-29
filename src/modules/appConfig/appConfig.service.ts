import { db } from '../../config/firebase.js';
import { COLLECTIONS } from '../../config/collections.js';
import type { AppConfigInput } from './appConfig.schema.js';

const appConfigDoc = db.collection(COLLECTIONS.APP_CONFIG).doc('current');

export async function getAppConfig() {
  const doc = await appConfigDoc.get();
  if (!doc.exists) {
    return { latestVersion: '1.0.0', minSupportedVersion: '1.0.0' };
  }
  return doc.data();
}

export async function updateAppConfig(input: AppConfigInput) {
  await appConfigDoc.set({ ...input, updatedAt: new Date().toISOString() }, { merge: true });
  return getAppConfig();
}
