// ============================================================
// SITE CONTENT — Edit this file to customize for each client
// ============================================================

import type {
  NavItem,
  Service,
  ProcessStep,
  ReviewsConfig,
  FAQ,
  BusinessHours,
  Stat,
  ServiceArea,
  BrandConfig,
  ImageConfig,
  HeroImageMode,
  ContactFormConfig,
  TrustConfig,
  MapsConfig,
  AnalyticsConfig,
  AgencyConfig,
} from "@/types";

export const siteConfig = {
  // ── Identity ───────────────────────────────────────────────
  name: "Maplewood Home Services",
  tagline: "Quality Work. Fair Prices. Local Roots.",
  description:
    "Maplewood Home Services delivers reliable residential and commercial contracting across the Maplewood area. Fully licensed, insured, and ready to tackle any project.",
  shortDescription: "Trusted local contractors serving Maplewood and surrounding communities since 2010.",

  // ── Locale ─────────────────────────────────────────────────
  // BCP-47 language tag used on <html lang=""> and OG locale
  locale: "en-CA",
  // IETF locale for Open Graph (underscores, e.g. "en_CA")
  ogLocale: "en_CA",

  // ── Contact ────────────────────────────────────────────────
  phone: "(613) 555-0147",
  phoneHref: "tel:+16135550147",
  email: "hello@maplewoodhomeservices.ca",
  address: {
    street: "88 Ridgeline Road",
    city: "Maplewood",
    province: "ON",
    postal: "K0A 1B0",
    full: "88 Ridgeline Road, Maplewood, ON K0A 1B0",
  },

  // ── Hours ──────────────────────────────────────────────────
  hours: [
    { days: "Monday – Friday", time: "7:30 am – 5:30 pm" },
    { days: "Saturday", time: "8:00 am – 3:00 pm" },
    { days: "Sunday", time: "Closed" },
  ] satisfies BusinessHours[],
  emergency: "24/7 emergency service available" as string | null,

  // ── Service Areas ──────────────────────────────────────────
  serviceAreas: [
    { name: "Maplewood" },
    { name: "Cedarville", distance: "12 km" },
    { name: "Pinecrest", distance: "18 km" },
    { name: "Elmwood", distance: "22 km" },
    { name: "Birchton", distance: "35 km" },
    { name: "Stonehaven", distance: "50 km" },
  ] satisfies ServiceArea[],
  serviceRadius: "approximately 60 km",

  // ── Social ─────────────────────────────────────────────────
  social: {
    facebook: null,
    instagram: null as string | null,
    // Display handle shown in the UI, e.g. "@yourbusiness"
    instagramHandle: null as string | null,
    // Behold.so feed URL — paste from your Behold dashboard. Leave null to hide the section.
    instagramFeedUrl: null as string | null,
    // Optional: paste a raw embed snippet (LightWidget, EmbedSocial, etc.) to override the Behold feed
    instagramEmbedCode: null as string | null,
    google: null,
  },

  // ── Brand ──────────────────────────────────────────────────
  brand: {
    // Set logo to a path like "/images/logo.svg" to use an image.
    // null = render site name as text (current default).
    logo: null,
    logoDark: null,
    favicon: "/favicon.ico",
    logoAlt: "Maplewood Home Services",
  } satisfies BrandConfig,

  // ── Images ─────────────────────────────────────────────────
  // heroImageMode controls where background images appear:
  //   "none"     — dark backgrounds everywhere, no images
  //   "home"     — hero image on home only, plain dark on inner pages
  //   "all"      — same image on home + all page banners
  //   "per-page" — each page uses its own image from images.pages
  heroImageMode: "none" as HeroImageMode,

  images: {
    // Set to a path like "/images/hero.jpg" when heroImageMode !== "none"
    hero: null,
    about: null,
    pages: {
      about: undefined,
      services: undefined,
      contact: undefined,
    },
  } satisfies ImageConfig,

  // ── Navigation ─────────────────────────────────────────────
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  // ── Hero ───────────────────────────────────────────────────
  hero: {
    headline: "Local Trades You Can Count On",
    subheadline:
      "Serving Maplewood and surrounding communities for over 15 years. From small repairs to full renovations — we get it done right.",
    cta: { label: "Get a Free Quote", href: "/contact" },
    secondaryCta: { label: "View Services", href: "/services" },
    // Static, always-true stats. The live Google rating + review count are
    // prepended automatically when the API returns data (see components/sections/Hero.tsx).
    stats: [
      { value: "15+", label: "Years in Business" },
      { value: "1,800+", label: "Jobs Completed" },
      { value: "24/7", label: "Emergency Service" },
    ] satisfies Stat[],
  },

  // ── Services ───────────────────────────────────────────────
  services: [
    {
      slug: "home-repairs",
      title: "Home Repairs",
      description:
        "From leaky faucets to broken fixtures — fast, reliable repairs handled by experienced tradespeople.",
      icon: "🔧",
    },
    {
      slug: "interior-renovations",
      title: "Interior Renovations",
      description:
        "Kitchen, bathroom, and basement renovations completed on time and on budget, with minimal disruption.",
      icon: "🏠",
    },
    {
      slug: "exterior-work",
      title: "Exterior Work",
      description:
        "Siding, soffit, fascia, and exterior trim installed or replaced to protect and refresh your home's envelope.",
      icon: "🏗️",
    },
    {
      slug: "decks-outdoor",
      title: "Decks & Outdoor Spaces",
      description:
        "Custom decks, patios, and fencing built to last through Canadian winters and look great all summer.",
      icon: "🌿",
    },
    {
      slug: "painting",
      title: "Interior & Exterior Painting",
      description:
        "Professional prep, premium paint, and clean results — interior or exterior, residential or commercial.",
      icon: "🖌️",
    },
    {
      slug: "inspections",
      title: "Pre-Purchase Inspections",
      description:
        "Know exactly what you're buying. Our detailed assessments give you a clear picture before you sign.",
      icon: "📋",
    },
  ] satisfies Service[],

  // ── Process ────────────────────────────────────────────────
  process: [
    {
      step: "01",
      title: "Book a Call",
      description:
        "Reach out by phone or our contact form. We'll ask a few quick questions and get you on the schedule.",
    },
    {
      step: "02",
      title: "On-Site Assessment",
      description:
        "One of our tradespeople visits your property, reviews the scope, and provides a clear, upfront quote.",
    },
    {
      step: "03",
      title: "We Get to Work",
      description:
        "Once approved, we complete the job efficiently and cleanly. No hidden fees, no surprises.",
    },
    {
      step: "04",
      title: "Follow-Up",
      description:
        "We follow up after every job to make sure you're completely satisfied with the result.",
    },
  ] satisfies ProcessStep[],

  // ── Reviews (Google integration) ───────────────────────────
  // Live Google reviews, fetched server-side and cached. There is NO hardcoded
  // fallback content — when the integration is disabled or the API is
  // unavailable, the Reviews section hides itself entirely. API credentials
  // live in env vars (GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID) — never here.
  reviews: {
    enabled: true,
    provider: "places",
    eyebrow: "Client Reviews",
    heading: "What Our Clients Say",
    maxReviews: 6,
    reviewUrl: null, // "Write a review" → Google composer (from Place ID), then maps.profileUrl
  } satisfies ReviewsConfig,

  // ── FAQs ───────────────────────────────────────────────────
  faqs: [
    {
      question: "Do you offer free estimates?",
      answer:
        "Yes — we provide free estimates for all scheduled work. For emergency calls, there may be a dispatch fee that is applied toward the cost of the job.",
    },
    {
      question: "Are you licensed and insured?",
      answer:
        "Absolutely. All of our tradespeople are fully licensed and we carry comprehensive liability insurance and WSIB coverage.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve Maplewood and the surrounding communities including Cedarville, Pinecrest, Elmwood, Birchton, and Stonehaven — within approximately 60 km.",
    },
    {
      question: "How soon can you come out?",
      answer:
        "For emergencies, we aim to be on-site within 60–90 minutes. For scheduled work, we typically have availability within 2–5 business days.",
    },
    {
      question: "Do you offer a warranty on your work?",
      answer:
        "Yes. All labour is backed by a 1-year workmanship warranty. Manufacturer warranties apply to all materials and products we install.",
    },
  ] satisfies FAQ[],

  // ── About ──────────────────────────────────────────────────
  about: {
    headline: "Local Expertise. Honest Work.",
    body: [
      "Maplewood Home Services was founded in 2010 by a small crew of local tradespeople who believed good work and fair pricing shouldn't be hard to find. Today, we're a team of ten — all from the region, all committed to the same values.",
      "We treat every home like our own. That means arriving on time, explaining what we're doing, and leaving the job site cleaner than we found it.",
      "When you call us, you'll always reach a real person. We're your neighbours, and we take that seriously.",
    ],
    // Static, always-true stats. The live Google rating + review count are
    // prepended automatically when the API returns data (see app/about/page.tsx).
    stats: [
      { value: "15+", label: "Years in Business" },
      { value: "100%", label: "Licensed & Insured" },
    ] satisfies Stat[],
  },

  // ── Trust / Compliance ─────────────────────────────────────
  trust: {
    licensed: true,
    insured: true,
    wsib: true,
    warranty: "1-year workmanship warranty",
  } satisfies TrustConfig,

  // ── Google Maps ────────────────────────────────────────────
  maps: {
    profileUrl: null,
    // To embed a map: go to maps.google.com → Share → Embed a map → copy src URL
    embedUrl: null,
  } satisfies MapsConfig,

  // ── Contact Form ───────────────────────────────────────────
  contactForm: {
    // ── Email delivery ────────────────────────────────────────
    toEmail: "hello@maplewoodhomeservices.ca",
    fromEmail: "website@maplewoodhomeservices.ca",
    fromName: "Maplewood Home Services",
    // Set replyTo to route replies to a specific inbox (e.g. "owner@domain.com").
    // When undefined the API route uses the submitter's email, so clients can
    // reply directly to the person who enquired.
    replyTo: undefined,
    emailSubject: "New inquiry",

    // ── UI copy ───────────────────────────────────────────────
    submitLabel: "Send Message",
    loadingLabel: "Sending…",
    errorMessage: "Something went wrong. Please try again or call us directly.",
    successHeading: "Message Sent",
    successMessage: "Thank you — we'll be in touch within one business day.",
    responseTime: "We typically respond within one business day.",
    placeholders: {
      name: "Jane Smith",
      phone: "(613) 555-0100",
      email: "jane@example.com",
      message: "Describe what you need help with…",
    },
  } satisfies ContactFormConfig,

  // ── CTA Banner ─────────────────────────────────────────────
  cta: {
    headline: "Ready to Get Started?",
    body: "Contact us today for a free estimate. No pressure, no obligation — just honest advice from a local tradesperson.",
    cta: { label: "Get a Free Quote", href: "/contact" },
  },

  // ── Footer ─────────────────────────────────────────────────
  footer: {
    tagline: "Quality trades for Maplewood and beyond.",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ] satisfies NavItem[],
  },

  // ── Analytics ──────────────────────────────────────────────
  // All values here are optional — null disables the integration.
  // GTM, Meta Pixel, and Clarity are wired for future packages only.
  analytics: {
    googleAnalyticsId: null,
    googleTagManagerId: null,
    metaPixelId: null,
    microsoftClarityId: null,
  } satisfies AnalyticsConfig,

  // ── Agency ─────────────────────────────────────────────────
  agency: {
    name: "Up North Creative",
    url: "https://upnorthcreative.ca",
    showCredit: true,
  } satisfies AgencyConfig,

  // ── SEO ────────────────────────────────────────────────────
  seo: {
    titleTemplate: "%s | Maplewood Home Services",
    defaultTitle: "Maplewood Home Services | Trusted Local Contractors",
    defaultDescription:
      "Reliable residential and commercial contracting in Maplewood, ON. Licensed, insured, and available for emergencies. Free estimates.",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://maplewoodhomeservices.ca",
    // Open Graph / social share image — relative path from /public, e.g. "/og-image.png"
    ogImage: "/og-image.png",
    // Schema.org @type — adjust per client trade
    // e.g. "Electrician", "HVACBusiness", "GeneralContractor", "RoofingContractor"
    localBusinessType: "GeneralContractor",
    // schema.org OpeningHours format: https://schema.org/openingHours
    openingHours: ["Mo-Fr 07:30-17:30", "Sa 08:00-15:00"],
    // Privacy policy last-updated date shown on /privacy
    privacyLastUpdated: "January 1, 2025",
  },
};

export type SiteConfig = typeof siteConfig;
