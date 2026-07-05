# Cleanup Report

## SEO Landing Page Feature (Location + Service systems) — 2026-07-04

Scope: `components/LocationPage.tsx`, `components/ServicePage.tsx`,
`lib/locations.ts`, `lib/services.ts`, the 4 sample `app/<slug>/page.tsx`,
and the sitemap + footer strip wiring. This template's version is a bespoke
re-skin in the brochure's own design system (sans-only, neutral+brand palette,
no portfolio). Run right after the production audit.

### Verified clean (nothing removed)
| Checked | Finding |
|---------|---------|
| Dead code / unused exports | None — every exported type is referenced; `LocationData`/`ServiceData` consumed by the data files. |
| Unused imports | None (`tsc` + ESLint clean). |
| Debug / console / commented-out code | None. |
| Design-system leakage | None — 0 `font-serif` / `charcoal` / `ivory` / `champagne` / `stone` / `highlight` classes; no `RevealOnScroll`, `PageHero`, or `SeoProjectCard` (this template has no portfolio, so those sections are intentionally absent). |
| Stray files | None — only SEO-feature files changed (`git status` clean otherwise). |
| Unused assets / dependencies | None added. |

### Findings NOT actioned (deliberate)
| Finding | Decision |
|---------|----------|
| `Eyebrow`, `Heading2` helpers duplicated between `LocationPage.tsx` and `ServicePage.tsx` (~12 lines). | **Left as-is.** Not worth a shared module; keeps the two components independently editable. |
| Several interface sub-types are `export`ed but only used internally. | **Left as-is** — harmless, ESLint-clean, keeps the data-file contract explicit. |

### Verification
`tsc` clean · ESLint clean · `npm run build` green (16 pages) · all sample
pages 200 · no horizontal overflow @375px · 0 broken internal links · native
brochure look verified by screenshot.
