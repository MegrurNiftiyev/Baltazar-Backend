import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export interface AccessTokenPayload {
  userId: string;
  role: 'USER' | 'ADMIN';
}

export interface RefreshTokenPayload {
  userId: string;
}

/**
 * Sign an access token — 15 minutes, contains userId + role so
 * requireRole doesn't need a DB round-trip per request.
 */
export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
}

/**
 * Sign a refresh token — 30 days, signed with a separate secret.
 * Stored server-side in Firestore, rotated on every refresh.
 */
export function signRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
}

/**
 * Verify an access token — returns the decoded payload or throws.
 */
export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
}

/**
 * Verify a refresh token — returns the decoded payload or throws.
 */
export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
}

/**
 * Compute the expiry date for a refresh token (30 days from now).
 */
export function refreshTokenExpiresAt(): Date {
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
}
