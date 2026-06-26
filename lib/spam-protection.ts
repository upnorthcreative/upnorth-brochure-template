// ─────────────────────────────────────────────────────────────────────────────
// Spam protection utilities — server-side only.
//
// Three independent layers:
//   1. Honeypot  — catches dumb bots that fill every field
//   2. Rate limit — caps submissions per IP to reduce abuse
//   3. Turnstile — Cloudflare's bot challenge (verify server-side)
// ─────────────────────────────────────────────────────────────────────────────

export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipStore = new Map<string, RateLimitRecord>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipStore.get(ip);

  if (!record || now > record.resetAt) {
    ipStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) return false;

  record.count++;
  return true;
}

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.warn(
      "[spam-protection] TURNSTILE_SECRET_KEY is not set — skipping Turnstile verification. " +
      "Add the test secret (1x0000000000000000000000000000000AA) to .env.local for local dev."
    );
    return true;
  }

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token, remoteip: ip }),
    });

    if (!res.ok) {
      console.error("[spam-protection] Turnstile siteverify HTTP error:", res.status);
      return false;
    }

    const data = (await res.json()) as TurnstileVerifyResponse;
    return data.success === true;
  } catch (err) {
    console.error("[spam-protection] Turnstile siteverify network error:", err);
    return false;
  }
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
