// ─────────────────────────────────────────────────────────────────────────────
// Shared types — kept in sync with lib/content.ts
// ─────────────────────────────────────────────────────────────────────────────

// ── Instagram / Behold ───────────────────────────────────────────────────────

export interface BeholdPost {
  id: string;
  permalink: string;
  mediaType: string;
  caption?: string;
  sizes: {
    medium: { width: number; height: number; mediaUrl: string };
  };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  /** Emoji or icon identifier — reserved for future icon rendering */
  icon: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BusinessHours {
  days: string;
  time: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ServiceArea {
  name: string;
  /** Approximate distance from base city, e.g. "15 km" */
  distance?: string;
}

// ── Brand & assets ────────────────────────────────────────────────────────────

export interface BrandConfig {
  /**
   * Path to logo image (relative to /public).
   * Set to null to render the site name as text.
   */
  logo: string | null;
  /** Alternate logo for dark backgrounds. Falls back to `logo` when omitted. */
  logoDark?: string | null;
  /**
   * Path to favicon served from /public (e.g. "/favicon.ico", "/favicon.png").
   * The default file lives at app/favicon.ico (Next.js convention — auto-wired).
   * For a custom favicon, place the file in /public and set the path here.
   */
  favicon?: string;
  /** Alt text for logo image */
  logoAlt?: string;
}

// ── Images ───────────────────────────────────────────────────────────────────

/**
 * Controls where hero images appear across the site.
 *
 * - "home"   — hero image on home page only; inner pages use a plain dark background
 * - "all"    — same image on every page (hero + all page banners)
 * - "per-page" — each page can specify its own image via pageImages
 * - "none"   — no hero images anywhere; pure dark backgrounds
 */
export type HeroImageMode = "home" | "all" | "per-page" | "none";

export interface ImageConfig {
  /** Hero background image (home page). Also used as fallback for "all" mode. */
  hero: string | null;
  /** Optional alternate hero image for mobile/tablet (< lg). Falls back to hero if not set. */
  heroMobile?: string | null;
  /** About page featured image */
  about: string | null;
  /** Per-page banner images — only used when heroImageMode is "per-page" */
  pages?: {
    about?: string;
    services?: string;
    contact?: string;
    privacy?: string;
    [key: string]: string | undefined;
  };
}

// ── Contact form ─────────────────────────────────────────────────────────────

export interface ContactFormConfig {
  // ── Email delivery (used by the API route / Resend) ──────────────────────
  /** Address that receives form submissions, e.g. "hello@clientdomain.com" */
  toEmail: string;
  /**
   * Verified sending address in Resend.
   * Must be on a domain added to your Resend account.
   * e.g. "website@clientdomain.com"
   */
  fromEmail: string;
  /** Display name shown in the From field, e.g. "Northbrook Plumbing" */
  fromName: string;
  /**
   * Reply-to address. Defaults to the submitter's email when omitted,
   * which lets clients reply directly to the enquirer.
   * Set explicitly when enquiries should route to a specific inbox.
   */
  replyTo?: string;
  /**
   * Subject line for notification emails.
   * The submitter's name is appended automatically: "New inquiry — Jane Smith"
   */
  emailSubject: string;

  // ── UI copy ──────────────────────────────────────────────────────────────
  submitLabel: string;
  /** Text shown on the submit button while the request is in flight */
  loadingLabel: string;
  /** Client-facing error shown when the API call fails */
  errorMessage: string;
  successHeading: string;
  successMessage: string;
  /** Shown below the submit button */
  responseTime: string;
  placeholders: {
    name: string;
    phone: string;
    email: string;
    message: string;
  };
}

// ── Trust / compliance ───────────────────────────────────────────────────────

export interface TrustConfig {
  licensed: boolean;
  insured: boolean;
  wsib: boolean;
  /** e.g. "1-year workmanship warranty" — set to null to omit */
  warranty: string | null;
  /** Any additional badges or trust signals */
  extras?: string[];
}

// ── Maps ─────────────────────────────────────────────────────────────────────

export interface MapsConfig {
  /** Google Business Profile URL (for the "View on Google Maps" link) */
  profileUrl: string | null;
  /** Google Maps embed src URL — paste from Share → Embed a map */
  embedUrl: string | null;
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export interface AnalyticsConfig {
  /** Google Analytics 4 Measurement ID, e.g. "G-XXXXXXXXXX" */
  googleAnalyticsId: string | null;
  /** Google Tag Manager ID, e.g. "GTM-XXXXXXX" — unused in basic package */
  googleTagManagerId?: string | null;
  /** Meta Pixel ID — unused in basic package */
  metaPixelId?: string | null;
  /** Microsoft Clarity ID — unused in basic package */
  microsoftClarityId?: string | null;
}

// ── Agency ───────────────────────────────────────────────────────────────────

export interface AgencyConfig {
  name: string;
  url: string;
  /** Set to false to remove the "Built by" footer credit */
  showCredit: boolean;
}
