import bcrypt from 'bcrypt';

/** bcrypt cost factor — at least 12 per spec. */
const SALT_ROUNDS = 12;

/**
 * Hash a plain-text password with bcrypt.
 * The plain-text is never logged or persisted.
 */
export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, SALT_ROUNDS);
}

/**
 * Compare a plain-text password against a bcrypt hash.
 */
export async function comparePassword(
  plaintext: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}
