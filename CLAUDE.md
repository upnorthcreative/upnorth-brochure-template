@AGENTS.md

## Branch Workflow

This project uses a two-branch Git workflow — `main` (production) and `dev` (active development). All work happens on `dev`; `main` only ever receives changes via a merge from `dev`. See [BRANCH_WORKFLOW.md](./BRANCH_WORKFLOW.md) for the full day-to-day and release process.

When starting a **new client project** from this template, follow [NEW_PROJECT_SETUP.md](./NEW_PROJECT_SETUP.md) first — it covers resetting the inherited Git remote, creating the client repo, creating `dev`, and connecting Vercel.

## SEO Landing Pages (Location + Service)

Two data-driven, config-safe systems for local-SEO long-tail pages, built in the
brochure's own design language (no portfolio needed). Each page is a shared
component + a data object; the `page.tsx` files are ~3 lines.

**1. Location pages — `"<serviceNoun> in <City>"`** (e.g. `Home Services in Maplewood`)
- Component: `components/LocationPage.tsx` · Data: `lib/locations.ts`
- Service word comes from `siteConfig.serviceNoun` in `lib/content.ts` — set it
  to whatever the client sells (`"Plumbing"`, `"Roofing"`, `"HVAC"`, …). One
  setting rebrands every location page.
- Add one: add a `LocationData` object, register it, and create `app/<slug>/page.tsx`
  (copy `app/home-services-maplewood/page.tsx`).

**2. Service pages — a specific service, optionally in a city**
(e.g. `Emergency Plumbing`, or `Furnace Repair in Maplewood`)
- Component: `components/ServicePage.tsx` · Data: `lib/services.ts`
- Set the optional `city` field to make it a service-in-city page (cross-links to
  the matching location page + adds `areaServed` schema).
- **`valueProps` are client-defined** — write the real selling points ("licensed
  & insured, 24/7 response, upfront pricing").
- Add one: add a `ServiceData` object, register it, create `app/<slug>/page.tsx`
  (copy `app/emergency-plumbing/page.tsx`).

**Wiring (done):** both registries feed `app/sitemap.ts`; footer strips read
`siteConfig.footer.serviceLinks` / `areaLinks` (set `[]` to hide); every page
ships `Service`/`ProfessionalService` + `FAQPage` + `BreadcrumbList` JSON-LD,
canonical, OG/Twitter metadata, and phone CTAs from `siteConfig.phone`.

**Sample content (Maplewood / Cedarville locations, Emergency Plumbing / Furnace
Repair services) is PLACEHOLDER** — replace it, including slugs and `serviceNoun`,
per client. Delete the samples you don't need.
