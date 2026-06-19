import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/content";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  sourcePage?: unknown;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { name, email, phone, message, sourcePage } = body;

    // ── Validation ───────────────────────────────────────────────────────────
    if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const { contactForm } = siteConfig;

    // ── No API key: log and return success (useful during local dev) ─────────
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set — logging submission instead of sending email.");
      console.log("Contact form submission:", { name, email, phone, message, sourcePage });
      return NextResponse.json({ success: true });
    }

    // ── Build and send email ─────────────────────────────────────────────────
    // Resend is initialised here (not at module scope) so that the build
    // succeeds without RESEND_API_KEY present in the build environment.
    const resend = new Resend(process.env.RESEND_API_KEY);

    const timestamp = new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" });
    const phoneDisplay = isNonEmptyString(phone) ? escapeHtml(phone) : "Not provided";
    const sourceDisplay = isNonEmptyString(sourcePage) ? escapeHtml(sourcePage) : escapeHtml(siteConfig.seo.siteUrl);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    await resend.emails.send({
      from: `${contactForm.fromName} <${contactForm.fromEmail}>`,
      to: contactForm.toEmail,
      replyTo: contactForm.replyTo ?? email,
      subject: `${contactForm.emailSubject} — ${name}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#171717;">
  <h2 style="margin:0 0 24px;font-size:18px;font-weight:600;">
    New contact form submission
  </h2>
  <table style="width:100%;border-collapse:collapse;">
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;width:120px;color:#737373;font-size:13px;">Name</td>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;">${safeName}</td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#737373;font-size:13px;">Email</td>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;">
        <a href="mailto:${safeEmail}" style="color:#171717;">${safeEmail}</a>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#737373;font-size:13px;">Phone</td>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;">${phoneDisplay}</td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#737373;font-size:13px;vertical-align:top;">Message</td>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;white-space:pre-wrap;">${safeMessage}</td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#737373;font-size:13px;">Source</td>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;">${sourceDisplay}</td>
    </tr>
    <tr>
      <td style="padding:10px 0;color:#737373;font-size:13px;">Received</td>
      <td style="padding:10px 0;font-size:14px;">${timestamp}</td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
