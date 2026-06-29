"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { TurnstileWidget } from "@/components/ui/TurnstileWidget";

type Status = "idle" | "loading" | "error" | "fading" | "success";
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const TURNSTILE_ENABLED = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const inputBase =
  "w-full border bg-neutral-50 px-4 py-3.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white transition-colors duration-150";

function inputCls(hasError?: boolean) {
  return `${inputBase} ${hasError ? "border-red-300 focus:border-red-400" : "border-neutral-200 focus:border-neutral-950"}`;
}

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Name is required.";
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!message.trim()) errors.message = "Message is required.";
  return errors;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(
    TURNSTILE_ENABLED ? null : "no-key"
  );
  const [widgetKey, setWidgetKey] = useState(0);

  const pathname = usePathname();
  const { contactForm } = siteConfig;

  // Full remount — used after a submit attempt, since a Turnstile token is
  // single-use and we need a fresh challenge for the next submission.
  function resetWidget() {
    setTurnstileToken(null);
    setWidgetKey((k) => k + 1);
  }

  // Just invalidate the token (disables submit) without remounting. Used for
  // Turnstile's own error/expire callbacks — Cloudflare retries and refreshes
  // internally, so remounting here would create an infinite re-render loop
  // whenever the hostname is rejected (e.g. a Preview URL not yet allowlisted).
  function clearToken() {
    setTurnstileToken(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name     = (formData.get("name")    as string) ?? "";
    const email    = (formData.get("email")   as string) ?? "";
    const phone    = (formData.get("phone")   as string) ?? "";
    const message  = (formData.get("message") as string) ?? "";
    const honeypot = (formData.get("website") as string) ?? "";

    const errors = validate(name, email, message);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (!turnstileToken) return;

    setFieldErrors({});
    setApiError(null);
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          message,
          sourcePage: `${siteConfig.seo.siteUrl}${pathname}`,
          turnstileToken,
          honeypot: honeypot || undefined,
        }),
      });

      if (res.ok) {
        setStatus("fading");
        setTimeout(() => {
          setStatus("success");
          form.reset();
          resetWidget();
        }, 350);
      } else {
        const data = (await res.json()) as { error?: string };
        setApiError(data.error ?? contactForm.errorMessage);
        setStatus("error");
        resetWidget();
      }
    } catch {
      setApiError(contactForm.errorMessage);
      setStatus("error");
      resetWidget();
    }
  }

  if (status === "success") {
    return (
      <div className="animate-fade-in border border-neutral-200 p-12 text-center">
        <div className="w-10 h-10 border border-neutral-900 flex items-center justify-center mx-auto mb-5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-[17px] font-semibold mb-2">{contactForm.successHeading}</h3>
        <p className="text-neutral-500 text-[13px]">{contactForm.successMessage}</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={`space-y-5 transition-opacity duration-[350ms] ${status === "fading" ? "opacity-0" : "opacity-100"}`}
    >
      {/* Honeypot — hidden from real users, bots fill this in */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0, overflow: "hidden" }}
      >
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-[11px] text-neutral-500 uppercase tracking-[0.12em] mb-2">
            Name <span className="text-neutral-300">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={contactForm.placeholders.name}
            className={inputCls(!!fieldErrors.name)}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "error-name" : undefined}
          />
          {fieldErrors.name && (
            <p id="error-name" role="alert" className="mt-1.5 text-[12px] text-red-500">{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-[11px] text-neutral-500 uppercase tracking-[0.12em] mb-2">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={contactForm.placeholders.phone}
            className={inputCls()}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-[11px] text-neutral-500 uppercase tracking-[0.12em] mb-2">
          Email <span className="text-neutral-300">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={contactForm.placeholders.email}
          className={inputCls(!!fieldErrors.email)}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "error-email" : undefined}
        />
        {fieldErrors.email && (
          <p id="error-email" role="alert" className="mt-1.5 text-[12px] text-red-500">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-[11px] text-neutral-500 uppercase tracking-[0.12em] mb-2">
          Message <span className="text-neutral-300">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder={contactForm.placeholders.message}
          className={`${inputCls(!!fieldErrors.message)} resize-none`}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "error-message" : undefined}
        />
        {fieldErrors.message && (
          <p id="error-message" role="alert" className="mt-1.5 text-[12px] text-red-500">{fieldErrors.message}</p>
        )}
      </div>

      {TURNSTILE_ENABLED && (
        <TurnstileWidget
          key={widgetKey}
          onSuccess={setTurnstileToken}
          onError={clearToken}
          onExpire={clearToken}
        />
      )}

      {status === "error" && (
        <p className="text-[13px] text-red-500" role="alert">
          {apiError ?? contactForm.errorMessage}
        </p>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={status === "loading" || status === "fading" || !turnstileToken}
        >
          {status === "loading" ? contactForm.loadingLabel : contactForm.submitLabel}
        </Button>
      </div>

      <p className="text-[12px] text-neutral-400">{contactForm.responseTime}</p>
    </form>
  );
}
