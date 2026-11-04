import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";

export const DESK_COOKIE = "mb_desk";
const SESSION_PAYLOAD = "merit-desk-v1";
const SESSION_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() || "";
}

function getPassword() {
  return process.env.ADMIN_PASSWORD?.trim() || "";
}

function toHex(buffer: ArrayBuffer) {
  return Buffer.from(buffer).toString("hex");
}

async function hmacHex(secret: string, payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return toHex(signature);
}

function safeEqualHex(a: string, b: string) {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export function adminAuthConfigured() {
  return Boolean(getPassword() && getSecret());
}

export async function passwordsMatch(provided: string) {
  const expected = getPassword();
  if (!expected || !provided) return false;

  const [providedDigest, expectedDigest] = await Promise.all([
    crypto.subtle.digest("SHA-256", new TextEncoder().encode(provided)),
    crypto.subtle.digest("SHA-256", new TextEncoder().encode(expected)),
  ]);

  return timingSafeEqual(
    Buffer.from(providedDigest),
    Buffer.from(expectedDigest),
  );
}

export async function createSessionToken() {
  const secret = getSecret();
  if (!secret) throw new Error("Missing ADMIN_SESSION_SECRET");
  return hmacHex(secret, SESSION_PAYLOAD);
}

export async function isAdminSessionValid() {
  const secret = getSecret();
  if (!secret || !getPassword()) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(DESK_COOKIE)?.value;
  if (!token) return false;

  const expected = await hmacHex(secret, SESSION_PAYLOAD);
  return safeEqualHex(token, expected);
}

export async function setAdminSessionCookie() {
  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(DESK_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/desk",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(DESK_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/desk",
    maxAge: 0,
  });
}
