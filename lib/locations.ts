import type { LocationData } from "@/components/LocationPage";

// ── Location registry ────────────────────────────────────────────────────────
// SEO service-area pages: "<serviceNoun> in <City>" (serviceNoun is set in
// lib/content.ts). PLACEHOLDER samples in the Maplewood Home Services voice —
// replace the content, cities, and slugs per client. To add a location: add a
// LocationData object, register it below, and create a matching
// app/<slug>/page.tsx (3 lines). See app/home-services-maplewood/page.tsx.

export const maplewood: LocationData = {
  slug: "home-services-maplewood",
  city: "Maplewood",
  title: "Home Services in Maplewood | Licensed & Insured Contractors",
  description:
    "Reliable home services in Maplewood — licensed, insured local contractors for repairs, installs, and renovations. Upfront pricing and free estimates.",
  hero: {
    intro:
      "Reliable, licensed home services for Maplewood homeowners and businesses — repairs, installations, and renovations done right, on time, and for a fair, upfront price.",
    trustSignal: "Licensed & insured · serving Maplewood since 2010",
  },
  positioning: {
    eyebrow: "Maplewood",
    heading: { line1: "Your local team", line2: "for the job done right." },
    body: [
      "When something breaks or needs doing around the house, you want someone who picks up the phone, shows up when they say they will, and does the job properly. That's us. We're a local Maplewood team that treats your home with respect and your time as valuable.",
      "From urgent repairs to planned projects, you get honest advice, a clear written quote, and workmanship we stand behind — no surprises, no runaround.",
    ],
  },
  processIntro:
    "No pressure and no surprises — just a simple process that gets your job done right, from the first call to the final walkthrough.",
  credibilityLocation: { value: "Maplewood", label: "Born & Based" },
  serving: {
    eyebrow: "Maplewood & Nearby",
    heading: { line1: "Proudly serving", line2: "Maplewood & area." },
    body: [
      "We're based right here in Maplewood and serve homeowners and businesses across town and the surrounding communities — Cedarville, Pinecrest, Elmwood, and beyond.",
      "Whether it's an emergency repair or a planned upgrade, you get the same reliable, licensed service and the same fair, upfront pricing every time.",
    ],
    industries: [
      "Emergency Repairs",
      "Plumbing",
      "Heating & Cooling",
      "Installations",
      "Renovations",
      "Maintenance",
      "Residential",
      "Commercial",
    ],
  },
  areas: {
    intro:
      "Based in Maplewood and serving the surrounding communities. Find your area below, or get in touch for a free estimate.",
    cards: [
      { name: "Maplewood", slug: "home-services-maplewood" },
      { name: "Cedarville", slug: "home-services-cedarville" },
    ],
  },
  faq: {
    intro: "Quick answers to the questions we hear most from Maplewood homeowners.",
    items: [
      { question: "Do you offer free estimates?", answer: "Yes. For most jobs we provide a free, no-obligation written estimate so you know exactly what to expect before any work begins — no hidden fees or surprise charges." },
      { question: "Are you licensed and insured?", answer: "Absolutely. We're fully licensed and insured for both residential and commercial work, so you and your property are protected on every job." },
      { question: "Do you handle emergency calls?", answer: "We do. If you have an urgent issue, call us and we'll get to you as quickly as we can. Emergencies don't wait, and neither do we." },
      { question: "How do I book?", answer: "Just give us a call or send a message through our contact page. We'll ask a few questions and get you scheduled — often with a ballpark quote right over the phone." },
    ],
  },
  cta: {
    body: "Need a reliable local team in Maplewood? Get a free estimate today — call us or send a message and we'll take care of the rest.",
    label: "Home Services · Maplewood",
  },
};

export const cedarville: LocationData = {
  slug: "home-services-cedarville",
  city: "Cedarville",
  title: "Home Services in Cedarville | Trusted Local Contractors",
  description:
    "Licensed, insured home services in Cedarville — repairs, installs, and renovations from a trusted local team. Upfront pricing and free estimates.",
  hero: {
    intro:
      "Trusted, licensed home services for Cedarville homeowners and businesses — repairs, installations, and renovations done right, on time, and for a fair, upfront price.",
    trustSignal: "Licensed & insured · serving Cedarville & area",
  },
  positioning: {
    eyebrow: "Cedarville",
    heading: { line1: "Reliable trades,", line2: "right next door." },
    body: [
      "Cedarville homeowners deserve a contractor who treats every job like it matters — because to us, it does. We show up on time, keep your home clean, and do the work properly the first time.",
      "From a leaky tap to a full renovation, you get honest advice, a clear written quote, and a team that stands behind its work long after the job is done.",
    ],
  },
  processIntro:
    "A straightforward process with no pressure and no surprises — from your first call to the final walkthrough.",
  credibilityLocation: { value: "Cedarville", label: "Proudly Serving" },
  serving: {
    eyebrow: "Cedarville & Nearby",
    heading: { line1: "Serving Cedarville", line2: "& the surrounding area." },
    body: [
      "We serve Cedarville and the nearby communities — Maplewood, Pinecrest, Elmwood, and beyond — with the same reliable, licensed service every time.",
      "Whether it's an emergency or a planned project, you get fair, upfront pricing and workmanship backed by a guarantee.",
    ],
    industries: [
      "Emergency Repairs",
      "Plumbing",
      "Heating & Cooling",
      "Installations",
      "Renovations",
      "Maintenance",
      "Residential",
      "Commercial",
    ],
  },
  areas: {
    intro:
      "Serving Cedarville and the surrounding communities. Find your area below, or get in touch for a free estimate.",
    cards: [
      { name: "Cedarville", slug: "home-services-cedarville" },
      { name: "Maplewood", slug: "home-services-maplewood" },
    ],
  },
  faq: {
    intro: "Quick answers to the questions we hear most from Cedarville homeowners.",
    items: [
      { question: "Do you serve Cedarville directly?", answer: "Yes. Cedarville is part of our core service area, and we're there regularly. Give us a call and we'll get you scheduled quickly." },
      { question: "Do you offer free estimates?", answer: "We do. For most jobs you'll get a free, no-obligation written estimate up front, so there are never any surprises on the final bill." },
      { question: "Are you licensed and insured?", answer: "Fully licensed and insured for residential and commercial work — you and your property are protected on every job we do." },
      { question: "How quickly can you come out?", answer: "For emergencies we move as fast as we can, often same-day. For planned work we'll book a time that suits your schedule. Just reach out and we'll sort it." },
    ],
  },
  cta: {
    body: "Looking for a dependable local team in Cedarville? Get a free estimate today — call us or send a message and we'll take it from there.",
    label: "Home Services · Cedarville",
  },
};

// Registry keyed by slug.
export const locations: Record<string, LocationData> = {
  [maplewood.slug]: maplewood,
  [cedarville.slug]: cedarville,
};

export const locationList: LocationData[] = Object.values(locations);

export function getLocation(slug: string): LocationData | undefined {
  return locations[slug];
}
