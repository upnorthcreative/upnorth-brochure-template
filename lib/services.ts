import type { ServiceData } from "@/components/ServicePage";

// ── Service registry ─────────────────────────────────────────────────────────
// SEO service landing pages: one per specific service. A service can be plain
// ("Emergency Plumbing") or targeted to a city ("Furnace Repair in Maplewood")
// via the optional `city` field. PLACEHOLDER samples in the Maplewood Home
// Services voice — replace per client. valueProps are CLIENT-DEFINED (write the
// real selling points for the service). To add one: add a ServiceData object,
// register it, and create a matching app/<slug>/page.tsx (3 lines).

export const emergencyPlumbing: ServiceData = {
  slug: "emergency-plumbing",
  service: "Emergency Plumbing",
  breadcrumb: "Emergency Plumbing",
  h1: { line1: "Emergency", line2: "Plumbing" },
  title: "Emergency Plumbing | Fast, Licensed 24/7 Response",
  description:
    "Emergency plumbing you can count on — fast response, licensed plumbers, and upfront pricing for burst pipes, leaks, blockages, and no-hot-water calls.",
  hero: {
    eyebrow: "Service · Emergency Plumbing",
    intro:
      "A burst pipe or major leak can't wait. Our licensed plumbers respond fast, arrive prepared, and fix the problem right — with upfront pricing so you know the cost before we start, even in an emergency.",
    trustSignal: "Fast response · licensed plumbers · upfront pricing",
  },
  positioning: {
    eyebrow: "Emergency Plumbing",
    heading: { line1: "When it can't wait,", line2: "we're on our way." },
    body: [
      "Plumbing emergencies are stressful — water where it shouldn't be, and every minute costs you. What you need is someone who answers the phone, gets to you quickly, and knows how to stop the problem and fix it properly.",
      "We come prepared to diagnose and repair on the spot wherever possible, and we're straight with you about the cost before any work begins — no taking advantage of a bad moment.",
    ],
  },
  painPoints: {
    eyebrow: "Sound Familiar?",
    heading: { line1: "Plumbing problems", line2: "we solve fast." },
    items: [
      { problem: "A burst pipe or major leak flooding your home.", solution: "We respond fast, shut off the source, and repair the pipe properly — then help you deal with the aftermath so it doesn't happen again." },
      { problem: "No hot water and no idea why.", solution: "We diagnose water heater and supply issues quickly and get your hot water back, with an honest recommendation on repair vs. replace." },
      { problem: "A blocked or backed-up drain.", solution: "We clear stubborn blockages properly — not just a quick fix — and check what caused it so it doesn't return next week." },
      { problem: "Worried you'll be overcharged in a crisis.", solution: "We give you upfront pricing before we start, even on emergency calls. A bad moment is no excuse for a surprise bill." },
    ],
  },
  valueProps: [
    { title: "Fast, real response.", body: "When you call with an emergency, we answer and we move — because a leak at 8pm can't wait until next week." },
    { title: "Licensed & insured plumbers.", body: "Every job is handled by a licensed, insured professional, so it's done to code and you're fully protected." },
    { title: "Upfront pricing, even in a crisis.", body: "You'll know the cost before we start. We never take advantage of an emergency to pad the bill." },
    { title: "Fixed right the first time.", body: "We come prepared to diagnose and repair on the spot wherever possible, and we stand behind the work." },
  ],
  processIntro:
    "Even in an emergency, the process is simple and clear — so you know what's happening and what it costs, every step.",
  faq: {
    intro: "Quick answers about our emergency plumbing service.",
    items: [
      { question: "How fast can you get here?", answer: "For emergencies we move as quickly as we can, often same-day or sooner. Call us and we'll give you a realistic arrival time straight away." },
      { question: "Will I know the cost before you start?", answer: "Yes. Even on emergency calls we give you upfront pricing before any work begins — no surprise charges when you're already dealing with a stressful situation." },
      { question: "Are your plumbers licensed?", answer: "Every emergency call is handled by a licensed, insured plumber, so the repair is done to code and your home is protected." },
      { question: "What counts as an emergency?", answer: "Burst pipes, major leaks, no hot water, sewage backups, and anything actively damaging your home. If you're not sure, call us and we'll advise." },
    ],
  },
  related: {
    heading: "Explore more of what we do",
    intro: "Reliable, licensed home services across the area.",
    services: [{ name: "Furnace Repair in Maplewood", slug: "furnace-repair-maplewood" }],
    locations: [
      { name: "Maplewood", slug: "home-services-maplewood" },
      { name: "Cedarville", slug: "home-services-cedarville" },
    ],
  },
  cta: {
    body: "Got a plumbing emergency? Don't wait for it to get worse — call us now and we'll get someone out to you fast.",
    label: "Emergency Plumbing",
  },
  schema: {
    serviceType: "Emergency Plumbing",
    description: "Fast, licensed emergency plumbing — burst pipes, leaks, blockages, and no-hot-water calls, with upfront pricing and same-day response.",
  },
};

export const furnaceRepairMaplewood: ServiceData = {
  slug: "furnace-repair-maplewood",
  service: "Furnace Repair",
  city: "Maplewood",
  breadcrumb: "Furnace Repair in Maplewood",
  h1: { line1: "Furnace Repair", line2: "in Maplewood" },
  title: "Furnace Repair in Maplewood | Fast, Licensed Heating Service",
  description:
    "Furnace repair in Maplewood — fast, licensed heating technicians for no-heat calls, strange noises, and breakdowns. Upfront pricing and honest advice.",
  hero: {
    eyebrow: "Service · Furnace Repair · Maplewood",
    intro:
      "When your furnace quits on a cold Maplewood night, you need heat back fast. Our licensed technicians diagnose the problem quickly, fix it right, and give you an honest recommendation on repair versus replacement — with upfront pricing.",
    trustSignal: "Licensed heating techs · Maplewood · upfront pricing",
  },
  positioning: {
    eyebrow: "Furnace Repair · Maplewood",
    heading: { line1: "Heat back on,", line2: "fast and done right." },
    body: [
      "A furnace that fails in the middle of a Maplewood winter isn't just uncomfortable — it can be a real problem. You need a technician who responds quickly, finds the actual cause, and fixes it properly, not just a temporary patch.",
      "We diagnose furnace issues thoroughly and give you a straight answer on whether a repair makes sense or whether you'd be better off replacing — with upfront pricing either way.",
    ],
  },
  painPoints: {
    eyebrow: "Sound Familiar?",
    heading: { line1: "Furnace troubles", line2: "we fix." },
    items: [
      { problem: "No heat on the coldest night of the year.", solution: "We prioritise no-heat calls and get to you fast, diagnose the cause, and get your home warm again as quickly as possible." },
      { problem: "Strange noises, smells, or short-cycling.", solution: "We track down what's really going on — before it becomes a bigger, costlier failure — and fix it properly." },
      { problem: "Not sure whether to repair or replace.", solution: "We give you an honest assessment of your furnace's age, condition, and repair cost, so you can make the smart call, not a pressured one." },
      { problem: "Worried about a surprise bill.", solution: "You get upfront pricing before we start, so there are no unwelcome surprises when the work is done." },
    ],
  },
  valueProps: [
    { title: "Fast no-heat response.", body: "We prioritise no-heat calls in Maplewood, especially in winter, and get someone out to you quickly." },
    { title: "Licensed heating technicians.", body: "Furnace work is handled by licensed, insured techs who know how to diagnose and repair it safely and to code." },
    { title: "Honest repair-or-replace advice.", body: "We tell you the truth about your furnace's condition, so you spend your money wisely — no unnecessary upsells." },
    { title: "Upfront, fair pricing.", body: "You'll know the cost before we begin, with no hidden fees added on afterward." },
  ],
  processIntro:
    "A clear, simple process to get your heat back on — from your first call to a warm home and an honest bill.",
  faq: {
    intro: "Quick answers about furnace repair in Maplewood.",
    items: [
      { question: "How fast can you come out for no heat?", answer: "We prioritise no-heat calls, especially in cold weather, and aim for same-day service in Maplewood. Call us and we'll give you a realistic time right away." },
      { question: "Should I repair or replace my furnace?", answer: "It depends on age, condition, and repair cost. We'll give you an honest assessment and a clear recommendation — no pressure to replace if a repair makes more sense." },
      { question: "Are your technicians licensed?", answer: "Yes. All furnace and heating work is done by licensed, insured technicians, so it's safe, to code, and backed by our guarantee." },
      { question: "Do you service all furnace brands?", answer: "We work on most makes and models of gas and electric furnaces. Let us know what you have when you call and we'll come prepared." },
    ],
  },
  related: {
    heading: "Explore more of what we do",
    intro: "Reliable, licensed home services across Maplewood and the area.",
    services: [{ name: "Emergency Plumbing", slug: "emergency-plumbing" }],
    locations: [
      { name: "Maplewood", slug: "home-services-maplewood" },
      { name: "Cedarville", slug: "home-services-cedarville" },
    ],
  },
  cta: {
    body: "Furnace acting up in Maplewood? Don't wait for it to fail completely — call us for fast, honest furnace repair.",
    label: "Furnace Repair · Maplewood",
  },
  schema: {
    serviceType: "Furnace Repair",
    description: "Fast, licensed furnace repair in Maplewood — no-heat calls, breakdowns, and honest repair-or-replace advice with upfront pricing.",
  },
};

// Registry keyed by slug.
export const services: Record<string, ServiceData> = {
  [emergencyPlumbing.slug]: emergencyPlumbing,
  [furnaceRepairMaplewood.slug]: furnaceRepairMaplewood,
};

export const serviceList: ServiceData[] = Object.values(services);

export function getService(slug: string): ServiceData | undefined {
  return services[slug];
}
