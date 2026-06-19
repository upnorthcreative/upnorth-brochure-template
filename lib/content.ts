// ============================================================
// SITE CONTENT — Edit this file to customize for each client
// ============================================================

import type {
  NavItem,
  Service,
  ProcessStep,
  Testimonial,
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
  name: "Northbrook Plumbing",
  tagline: "Reliable Plumbing, Done Right.",
  description:
    "Northbrook Plumbing provides expert residential and commercial plumbing services across the greater Northbrook area. Licensed, insured, and available 24/7 for emergencies.",
  shortDescription: "Licensed plumbers serving Northbrook and surrounding areas since 2008.",

  // ── Locale ─────────────────────────────────────────────────
  // BCP-47 language tag used on <html lang=""> and OG locale
  locale: "en-CA",
  // IETF locale for Open Graph (underscores, e.g. "en_CA")
  ogLocale: "en_CA",

  // ── Contact ────────────────────────────────────────────────
  phone: "(705) 555-0182",
  phoneHref: "tel:+17055550182",
  email: "hello@northbrookplumbing.ca",
  address: {
    street: "142 Mill Street",
    city: "Northbrook",
    province: "ON",
    postal: "K0H 2G0",
    full: "142 Mill Street, Northbrook, ON K0H 2G0",
  },

  // ── Hours ──────────────────────────────────────────────────
  hours: [
    { days: "Monday – Friday", time: "7:00 am – 6:00 pm" },
    { days: "Saturday", time: "8:00 am – 4:00 pm" },
    { days: "Sunday", time: "Emergency calls only" },
  ] satisfies BusinessHours[],
  emergency: "24/7 emergency service available",

  // ── Service Areas ──────────────────────────────────────────
  serviceAreas: [
    { name: "Northbrook" },
    { name: "Cloyne", distance: "15 km" },
    { name: "Flinton", distance: "20 km" },
    { name: "Kaladar", distance: "18 km" },
    { name: "Actinolite", distance: "30 km" },
    { name: "Tweed", distance: "45 km" },
  ] satisfies ServiceArea[],
  serviceRadius: "approximately 60 km",

  // ── Social ─────────────────────────────────────────────────
  social: {
    facebook: "https://facebook.com/northbrookplumbing",
    instagram: "https://instagram.com/northbrookplumbing",
    google: "https://g.page/northbrookplumbing",
  },

  // ── Brand ──────────────────────────────────────────────────
  brand: {
    // Set logo to a path like "/images/logo.svg" to use an image.
    // null = render site name as text (current default).
    logo: null,
    logoDark: null,
    favicon: "/favicon.ico",
    logoAlt: "Northbrook Plumbing",
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
    headline: "Expert Plumbing You Can Count On",
    subheadline:
      "Serving Northbrook and surrounding areas for over 15 years. From leaky faucets to full installations — we get it done.",
    cta: { label: "Get a Free Quote", href: "/contact" },
    secondaryCta: { label: "View Services", href: "/services" },
    stats: [
      { value: "15+", label: "Years in Business" },
      { value: "2,400+", label: "Jobs Completed" },
      { value: "24/7", label: "Emergency Service" },
      { value: "4.9 ★", label: "Google Rating" },
    ] satisfies Stat[],
  },

  // ── Services ───────────────────────────────────────────────
  services: [
    {
      slug: "emergency-repairs",
      title: "Emergency Repairs",
      description:
        "Burst pipes, major leaks, or no hot water? We respond fast — day or night — to get your home back to normal.",
      icon: "⚡",
    },
    {
      slug: "drain-cleaning",
      title: "Drain Cleaning",
      description:
        "Slow or blocked drains are no match for our professional equipment. We clear clogs quickly and completely.",
      icon: "🔧",
    },
    {
      slug: "water-heater",
      title: "Water Heater Service",
      description:
        "Installation, repair, and replacement of all water heater types including tankless and heat pump systems.",
      icon: "🌡️",
    },
    {
      slug: "bathroom-renovations",
      title: "Bathroom Renovations",
      description:
        "Full plumbing rough-in and fixture installation for new bathroom builds or complete renovations.",
      icon: "🚿",
    },
    {
      slug: "pipe-replacement",
      title: "Pipe Replacement",
      description:
        "Aging or corroded pipes replaced with modern, long-lasting materials. Minimal disruption to your home.",
      icon: "🏗️",
    },
    {
      slug: "inspections",
      title: "Plumbing Inspections",
      description:
        "Pre-purchase or annual inspections that give you a complete picture of your plumbing system's health.",
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
        "A licensed plumber visits your property, diagnoses the issue, and provides a clear, upfront quote.",
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
        "We follow up after every job to make sure you're completely satisfied with the work.",
    },
  ] satisfies ProcessStep[],

  // ── Testimonials ───────────────────────────────────────────
  testimonials: [
    {
      name: "Sarah M.",
      location: "Northbrook, ON",
      quote:
        "Called at 7 pm on a Friday with a burst pipe under my kitchen sink. They were here within the hour and had it fixed before 9. Absolutely lifesavers.",
      rating: 5,
    },
    {
      name: "Dave & Linda T.",
      location: "Cloyne, ON",
      quote:
        "Professional, clean, and honestly priced. They replaced all our old copper pipes and kept us informed every step of the way. Would recommend to anyone.",
      rating: 5,
    },
    {
      name: "James R.",
      location: "Flinton, ON",
      quote:
        "Used Northbrook Plumbing for a bathroom reno. The rough-in was perfect, they worked seamlessly with our other trades, and they showed up when they said they would.",
      rating: 5,
    },
  ] satisfies Testimonial[],

  // ── FAQs ───────────────────────────────────────────────────
  faqs: [
    {
      question: "Do you offer free estimates?",
      answer:
        "Yes — we provide free estimates for all non-emergency work. For emergency calls, there is a dispatch fee that is applied toward the cost of repairs.",
    },
    {
      question: "Are you licensed and insured?",
      answer:
        "Absolutely. All of our plumbers are licensed journeypersons or apprentices working under supervision. We carry full liability insurance and WSIB coverage.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve Northbrook and the surrounding communities including Cloyne, Flinton, Kaladar, Actinolite, and surrounding townships within approximately 60 km.",
    },
    {
      question: "How soon can you come out?",
      answer:
        "For emergencies, we aim to be on-site within 60–90 minutes. For scheduled work, we typically have availability within 2–5 business days.",
    },
    {
      question: "Do you offer a warranty on your work?",
      answer:
        "Yes. We back all labour with a 1-year workmanship warranty. Manufacturer warranties apply to all parts and fixtures we install.",
    },
  ] satisfies FAQ[],

  // ── About ──────────────────────────────────────────────────
  about: {
    headline: "Local Expertise. Honest Work.",
    body: [
      "Northbrook Plumbing was founded in 2008 by master plumber Tom Hargreaves. What started as a one-man operation has grown into a team of six dedicated tradespeople — all born and raised in the region.",
      "We believe in treating every home like our own. That means showing up on time, explaining what we're doing, and leaving the job site cleaner than we found it.",
      "When you call Northbrook Plumbing, you'll always speak to a real person — not a call centre. We're your neighbours, and we take that seriously.",
    ],
    stats: [
      { value: "15+", label: "Years in Business" },
      { value: "2,400+", label: "Jobs Completed" },
      { value: "100%", label: "Licensed & Insured" },
      { value: "4.9★", label: "Google Rating" },
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
    profileUrl: "https://g.page/northbrookplumbing",
    // To embed a map: go to maps.google.com → Share → Embed a map → copy src URL
    embedUrl: null,
  } satisfies MapsConfig,

  // ── Contact Form ───────────────────────────────────────────
  contactForm: {
    // ── Email delivery ────────────────────────────────────────
    toEmail: "hello@northbrookplumbing.ca",
    fromEmail: "website@northbrookplumbing.ca",
    fromName: "Northbrook Plumbing",
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
      phone: "(705) 555-0100",
      email: "jane@example.com",
      message: "Describe what you need help with…",
    },
  } satisfies ContactFormConfig,

  // ── CTA Banner ─────────────────────────────────────────────
  cta: {
    headline: "Ready to Get Started?",
    body: "Contact us today for a free estimate. No pressure, no obligation — just honest advice from a local plumber.",
    cta: { label: "Get a Free Quote", href: "/contact" },
  },

  // ── Footer ─────────────────────────────────────────────────
  footer: {
    tagline: "Reliable plumbing for Northbrook and beyond.",
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
    titleTemplate: "%s | Northbrook Plumbing",
    defaultTitle: "Northbrook Plumbing | Reliable Local Plumbers",
    defaultDescription:
      "Expert residential and commercial plumbing services in Northbrook, ON. Licensed, insured, available 24/7 for emergencies. Free estimates.",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://northbrookplumbing.ca",
    // Open Graph / social share image — relative path from /public, e.g. "/og-image.png"
    ogImage: "/og-image.png",
    // Schema.org @type — adjust per client trade
    // e.g. "Electrician", "HVACBusiness", "GeneralContractor", "RoofingContractor"
    localBusinessType: "Plumber",
    // schema.org OpeningHours format: https://schema.org/openingHours
    openingHours: ["Mo-Fr 07:00-18:00", "Sa 08:00-16:00"],
    // Privacy policy last-updated date shown on /privacy
    privacyLastUpdated: "January 1, 2025",
  },
};

export type SiteConfig = typeof siteConfig;
