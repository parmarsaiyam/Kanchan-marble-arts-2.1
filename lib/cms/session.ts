import { createHmac, timingSafeEqual } from "crypto"

/**
 * CMS session handling.
 *
 * The owner signs in with a single password. On success the server sets an
 * httpOnly cookie holding an expiry timestamp plus an HMAC of that timestamp,
 * so the cookie cannot be forged or extended by editing it in the browser.
 *
 * The check happens on the SERVER for every write. A password compared only in
 * React would be bypassable by calling the API routes directly.
 */

export const SESSION_COOKIE = "kma_cms_session"

/** Eight hours: long enough for a working session, short enough to expire. */
const SESSION_MS = 8 * 60 * 60 * 1000

function secret() {
  // Falls back to the password so the signature still changes when the
  // password does, which invalidates every old cookie on rotation.
  return process.env.CMS_SESSION_SECRET || `kma-fallback-${password()}`
}

export function password() {
  return process.env.CMS_PASSWORD || "admin"
}

/** True when the deployment is still on the placeholder password. */
export function usingDefaultPassword() {
  return !process.env.CMS_PASSWORD
}

function sign(expiry: number) {
  return createHmac("sha256", secret()).update(String(expiry)).digest("hex")
}

export function createSessionValue() {
  const expiry = Date.now() + SESSION_MS
  return `${expiry}.${sign(expiry)}`
}

export function isValidSessionValue(value: string | undefined): boolean {
  if (!value) return false
  const [expiryRaw, signature] = value.split(".")
  const expiry = Number(expiryRaw)
  if (!expiry || !signature || Number.isNaN(expiry)) return false
  if (Date.now() > expiry) return false

  const expected = sign(expiry)
  // Constant-time compare so the signature cannot be guessed byte by byte.
  const a = Buffer.from(signature, "hex")
  const b = Buffer.from(expected, "hex")
  return a.length === b.length && timingSafeEqual(a, b)
}

/** Compares a submitted password without leaking its length via timing. */
export function passwordMatches(submitted: string) {
  const expected = password()
  const a = Buffer.from(String(submitted))
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MS / 1000,
}
