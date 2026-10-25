import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE_NAME = "migsak_admin_session";

function getJwtSecretKey() {
  const secret = process.env.SESSION_SECRET || "default_development_secret_must_be_at_least_32_chars!";
  return new TextEncoder().encode(secret);
}

/**
 * Creates an encrypted/signed JWT session token with an 8-hour expiry.
 */
export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getJwtSecretKey());
}

/**
 * Validates the JWT session token from the cookie.
 */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

/**
 * Timing-safe password verification using SHA-256 digest and constant-time comparison.
 * Works seamlessly across Edge and Node.js runtimes without leaking string length.
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || typeof password !== "string") {
    return false;
  }

  const encoder = new TextEncoder();
  const aBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(password));
  const bBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(adminPassword));

  const a = new Uint8Array(aBuffer);
  const b = new Uint8Array(bBuffer);

  if (a.length !== b.length) return false;

  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}
