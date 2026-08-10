import { db } from '../../config/firebase.js';
import { env } from '../../config/env.js';
import { AppError } from '../../errors/AppError.js';
import { hashPassword, comparePassword } from '../../utils/password.js';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  refreshTokenExpiresAt,
} from '../../utils/tokens.js';
import { OAuth2Client } from 'google-auth-library';
import type { RegisterInput, LoginInput, GoogleLoginInput } from './auth.schema.js';
import { COLLECTIONS } from '../../config/collections.js';

const usersCollection = db.collection(COLLECTIONS.USERS);
const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

// ── Helpers ────────────────────────────────────────────────────────────

async function findUserByEmail(email: string) {
  const snapshot = await usersCollection.where('email', '==', email).limit(1).get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0]!;
  return { id: doc.id, ...doc.data() } as {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: 'USER' | 'ADMIN';
    phone?: string;
    region?: string;
    language?: string;
    profileCompleteness?: {
      personalInfo: boolean;
      driverLicense: boolean;
      passport: boolean;
    };
    refreshToken?: string;
    refreshTokenExpiresAt?: Date;
    wishlist?: Array<{ serviceId: string; serviceType: string }>;
    createdAt: string;
  };
}

async function issueTokens(userId: string, role: 'USER' | 'ADMIN', language: 'az' | 'en' | 'ru') {
  const accessToken = signAccessToken({ userId, role, language });
  const refreshToken = signRefreshToken({ userId });
  const expiresAt = refreshTokenExpiresAt();

  // Store refresh token server-side (rotate: overwrite old one)
  await usersCollection.doc(userId).update({
    refreshToken,
    refreshTokenExpiresAt: expiresAt.toISOString(),
  });

  return { accessToken, refreshToken };
}

// ── Public API ─────────────────────────────────────────────────────────

/**
 * Register a new user.
 * Role is always hardcoded to 'USER' — even if a malicious client
 * somehow bypasses schema validation and sends role: "ADMIN",
 * the service layer ignores it.
 */
export async function register(input: RegisterInput) {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new AppError(409, 'USER_EXISTS');
  }

  const passwordHash = await hashPassword(input.password);

  const docRef = await usersCollection.add({
    name: input.name,
    email: input.email,
    passwordHash,
    role: 'USER', // ← hardcoded, non-negotiable
    phone: input.phone || null,
    region: input.region || 'AZ',
    language: input.language || 'az',
    wishlist: [],
    profileCompleteness: { personalInfo: false, driverLicense: false, passport: false },
    createdAt: new Date().toISOString(),
  });

  const tokens = await issueTokens(docRef.id, 'USER', input.language || 'az');

  return {
    user: {
      id: docRef.id,
      name: input.name,
      email: input.email,
      role: 'USER' as const,
    },
    ...tokens,
  };
}

/**
 * Login with email + password.
 */
export async function login(input: LoginInput) {
  const user = await findUserByEmail(input.email);
  if (!user) {
    throw new AppError(401, 'INVALID_CREDENTIALS');
  }

  // new guard — Google-only accounts have passwordHash: ''
  if (!user.passwordHash) {
    throw new AppError(401, 'INVALID_CREDENTIALS');
  }

  const passwordMatch = await comparePassword(input.password, user.passwordHash);
  if (!passwordMatch) {
    throw new AppError(401, 'INVALID_CREDENTIALS');
  }

  const tokens = await issueTokens(user.id, user.role, (user.language as 'az' | 'en' | 'ru') || 'az');

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    ...tokens,
  };
}

/**
 * Refresh token rotation.
 * The old refresh token is invalidated the moment a new one is issued.
 */
export async function refresh(refreshToken: string) {
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new AppError(401, 'INVALID_REFRESH_TOKEN');
  }

  const userDoc = await usersCollection.doc(payload.userId).get();
  if (!userDoc.exists) {
    throw new AppError(401, 'INVALID_REFRESH_TOKEN');
  }

  const userData = userDoc.data()!;

  // Verify that the presented refresh token matches the one stored server-side
  if (userData.refreshToken !== refreshToken) {
    // Possible token reuse attack — invalidate all refresh tokens for this user
    await usersCollection.doc(payload.userId).update({
      refreshToken: null,
      refreshTokenExpiresAt: null,
    });
    throw new AppError(401, 'INVALID_REFRESH_TOKEN');
  }

  // Check expiry (server-side, in addition to JWT expiry)
  if (
    userData.refreshTokenExpiresAt &&
    new Date(userData.refreshTokenExpiresAt) < new Date()
  ) {
    throw new AppError(401, 'INVALID_REFRESH_TOKEN');
  }

  const tokens = await issueTokens(
    payload.userId,
    userData.role as 'USER' | 'ADMIN',
    (userData.language as 'az' | 'en' | 'ru') || 'az',
  );

  return {
    user: {
      id: payload.userId,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    },
    ...tokens,
  };
}

/**
 * Google OAuth login.
 * Verifies the Google ID token, creates the user if they don't exist,
 * then issues JWT tokens.
 */
export async function googleLogin(input: GoogleLoginInput) {
  let ticket;
  try {
    ticket = await googleClient.verifyIdToken({
      idToken: input.idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });
  } catch {
    throw new AppError(401, 'INVALID_CREDENTIALS');
  }

  const googlePayload = ticket.getPayload();
  if (!googlePayload || !googlePayload.email) {
    throw new AppError(401, 'INVALID_CREDENTIALS');
  }

  let user = await findUserByEmail(googlePayload.email.toLowerCase());

  if (!user) {
    // Auto-register from Google
    const docRef = await usersCollection.add({
      name: googlePayload.name || googlePayload.email,
      email: googlePayload.email,
      passwordHash: '', // no password for Google-only accounts
      role: 'USER',
      phone: null,
      region: 'AZ',
      language: 'az',
      wishlist: [],
      profileCompleteness: { personalInfo: false, driverLicense: false, passport: false },
      createdAt: new Date().toISOString(),
    });

    user = {
      id: docRef.id,
      name: googlePayload.name || googlePayload.email,
      email: googlePayload.email,
      passwordHash: '',
      role: 'USER' as const,
      region: 'AZ',
      language: 'az',
      wishlist: [],
      createdAt: new Date().toISOString(),
    };
  }

  const tokens = await issueTokens(user.id, user.role, (user.language as 'az' | 'en' | 'ru') || 'az');

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    ...tokens,
  };
}

export async function revokeUserSessions(userId: string) {
  const doc = await usersCollection.doc(userId).get();
  if (!doc.exists) throw new AppError(404, 'NOT_FOUND');
  await usersCollection.doc(userId).update({
    refreshToken: null,
    refreshTokenExpiresAt: null,
  });
  return { userId, revoked: true };
}
