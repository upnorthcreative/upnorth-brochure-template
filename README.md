# Up North Creative — Brochure Template

A Next.js brochure site template for local service businesses. Clone it, fill in `lib/content.ts`, deploy to Vercel.

## Tech Stack

- **Next.js 16** (App Router, statically exported pages)
- **Tailwind CSS 4**
- **TypeScript** (strict)
- **Resend** (contact form email delivery)

---

## New Client Workflow

### 1. Copy the template

```bash
cp -r upnorth-brochure-template client-name-website
cd client-name-website
```

Or clone and re-initialize:

```bash
git clone <template-repo> client-name-website
cd client-name-website
rm -rf .git && git init
```

### 2. Open in VS Code

```bash
code .
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env.local`

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the values. See [Environment Variables](#environment-variables).

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Configuration

Almost everything is in one file: **`lib/content.ts`**.

Open it and work through the sections top to bottom. TypeScript will tell you if anything is wrong.

### Business identity
Update `name`, `tagline`, `description`, `shortDescription`, `phone`, `phoneHref`, `email`, and `address`.

### Hours and emergency line
Update the `hours` array and the `emergency` string.

### Service areas
Update the `serviceAreas` array and `serviceRadius`.

### Social links
Update `social.facebook`, `social.instagram`, `social.google`. Set any unused ones to an empty string — the footer will hide them automatically.

### Branding
Update `brand`:
- `logo` — path to logo image in `/public`, or `null` to show the business name as text
- `logoDark` — alternate logo for dark backgrounds (falls back to `logo` if omitted)
- `favicon` — path to favicon in `/public` (default: `"/favicon.ico"`)
- `logoAlt` — alt text for the logo image

### OG image
Update `seo.ogImage` — path to the Open Graph image in `/public` (default: `"/og-image.png"`).

Replace `public/og-image.png` with a 1200×630 image for the client before launch.

### Hero image
`heroImageMode` controls where background images appear:
- `"none"` — dark backgrounds everywhere, no images (default)
- `"home"` — hero image on home page only
- `"all"` — same image across all page banners
- `"per-page"` — each page uses its own image from `images.pages`

When using images, set `images.hero` to a path like `"/images/hero.jpg"`.

### Services
Update the `services` array. Each service has a `slug`, `title`, `description`, and `icon`.

### Process steps
Update the `process` array. Keep it to 4 steps — the layout is designed for 4.

### Testimonials
Update the `testimonials` array.

### FAQs
Update the `faqs` array.

### About
Update `about.headline`, `about.body` (array of paragraphs), and `about.stats`.

### Google Maps
- `maps.profileUrl` — Google Business Profile URL (used for the "View on Google Maps" link)
- `maps.embedUrl` — paste the embed `src` URL from Google Maps → Share → Embed a map

Both can be set to `null` to hide the map section gracefully.

### Contact form
Update `contactForm`:
- `toEmail` — where submissions are delivered
- `fromEmail` — verified sending address in Resend (must be on a domain added to your Resend account)
- `fromName` — the "From" display name in email clients
- `emailSubject` — subject line prefix (submitter's name is appended automatically)
- UI copy fields: `submitLabel`, `loadingLabel`, `successHeading`, `successMessage`, `errorMessage`, `responseTime`, `placeholders`

### Analytics
Set `analytics.googleAnalyticsId` to a GA4 Measurement ID (e.g. `"G-XXXXXXXXXX"`) to enable Google Analytics. Leave as `null` to disable.

### SEO
Update `seo`:
- `defaultTitle` — page title shown on the home page
- `titleTemplate` — template for inner page titles (e.g. `"%s | Business Name"`)
- `defaultDescription` — meta description for the home page
- `siteUrl` — set via `NEXT_PUBLIC_SITE_URL` env variable (see below)
- `localBusinessType` — Schema.org `@type` (e.g. `"Plumber"`, `"Electrician"`, `"HVACBusiness"`)
- `openingHours` — Schema.org format (e.g. `["Mo-Fr 07:00-18:00", "Sa 08:00-16:00"]`)
- `privacyLastUpdated` — date shown on the Privacy Policy page

---

## Environment Variables

`.env.example` documents all required variables. Never commit `.env.local` — it is already gitignored.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Live site URL, no trailing slash — e.g. `https://clientdomain.com` |
| `RESEND_API_KEY` | Yes (for email) | Resend API key — get it from resend.com → API Keys |

**Locally:** copy `.env.example` to `.env.local` and fill in the values.

**On Vercel:** add both variables in Project Settings → Environment Variables.

---

## Resend Setup

Email delivery uses [Resend](https://resend.com).

1. Create a Resend account and add the client's domain.
2. Verify the domain (add the DNS records Resend provides).
3. Create an API key and add it to `.env.local` (locally) and Vercel env vars (production).
4. In `lib/content.ts`, set `contactForm.fromEmail` to an address on the verified domain.

The contact form API route at `app/api/contact/route.ts` reads `RESEND_API_KEY` server-side only — it is never exposed to the browser.

If `RESEND_API_KEY` is not set, the API route logs the submission to the console instead of sending an email. This is safe for local development without a key configured.

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Testing the Contact Form

1. Add `RESEND_API_KEY` to `.env.local`
2. Restart the dev server (`Ctrl+C` then `npm run dev`)
3. Go to `/contact` and submit the form
4. Check the `toEmail` inbox
5. If no email arrives, check the Resend dashboard → Logs for delivery status

The form validates name, email, and message client-side and server-side. Phone is optional.

---

## Claude Workflow

This project is set up for use with Claude Code.

### `/audit`

Run a full production audit across all checklist categories: code quality, accessibility, SEO, performance, security, configuration, forms, and deployment readiness.

Run before every client launch.

### `/update-config`

Applies a configuration update or content change to `lib/content.ts` from a description or set of values. Useful for quickly updating contact details, services, or copy without manually editing the file.

---

## Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial setup for [Client Name]"
git push origin main
```

### 2. Connect to Vercel

- Go to [vercel.com](https://vercel.com) → New Project
- Import the GitHub repository
- Framework preset: **Next.js** (auto-detected)

### 3. Add environment variables in Vercel

Add both variables in Project Settings → Environment Variables:
- `NEXT_PUBLIC_SITE_URL` — the live domain (e.g. `https://clientdomain.com`)
- `RESEND_API_KEY` — the Resend API key

### 4. Deploy

Vercel deploys automatically on push to `main`. The first deploy triggers automatically after connecting.

### 5. Test on production

After deploy, go to the live `/contact` page and submit a test form. Confirm the email arrives and the reply-to is set correctly.

---

## Client Customization Checklist

Work through this list before launch.

**Branding**
- [ ] Replace `app/favicon.ico` with client favicon, or set `brand.favicon` in `lib/content.ts`
- [ ] Add client logo to `/public` and set `brand.logo` (or leave `null` for text)
- [ ] Replace `public/og-image.png` with a client-specific 1200×630 image

**Business info**
- [ ] Business name, tagline, description
- [ ] Phone, email, address
- [ ] Hours and emergency line
- [ ] Service areas and radius
- [ ] Social links (or set to empty string to hide)

**Content**
- [ ] Services
- [ ] Process steps
- [ ] Testimonials
- [ ] FAQs
- [ ] About copy and stats

**SEO**
- [ ] `seo.defaultTitle`
- [ ] `seo.titleTemplate`
- [ ] `seo.defaultDescription`
- [ ] `seo.localBusinessType`
- [ ] `seo.openingHours`
- [ ] `seo.privacyLastUpdated`
- [ ] `NEXT_PUBLIC_SITE_URL` in Vercel env vars

**Email**
- [ ] `contactForm.toEmail`
- [ ] `contactForm.fromEmail` (must be on a verified Resend domain)
- [ ] `contactForm.fromName`
- [ ] `RESEND_API_KEY` in Vercel env vars

**Optional**
- [ ] `analytics.googleAnalyticsId` — add GA4 ID if tracking is needed
- [ ] `maps.embedUrl` — add Google Maps embed URL if the client wants a map
- [ ] `maps.profileUrl` — Google Business Profile link

---

## Pre-Launch Checklist

```bash
npm run lint    # must pass clean
npm run build   # must pass clean
```

Then run `/audit` in Claude Code for a full review.

**Manual checks**
- [ ] Contact form submits and email arrives
- [ ] Test on mobile (375px) and desktop (1440px)
- [ ] All nav links work
- [ ] No broken `#` placeholder links
- [ ] OG image loads (use [opengraph.xyz](https://www.opengraph.xyz) to preview)
- [ ] Favicon appears in browser tab
- [ ] Page titles and meta descriptions are correct
- [ ] `.env.local` is not committed (`git status` should not show it)
- [ ] No placeholder or demo content remains

---

## Project Structure

```
app/                    # Next.js App Router pages and API routes
  api/contact/          # Contact form email API (server-side only)
  about/                # About page
  contact/              # Contact page
  services/             # Services page
  privacy/              # Privacy policy
  layout.tsx            # Root layout — metadata, GA, fonts
  page.tsx              # Home page
components/
  layout/               # Header, Footer
  sections/             # Page sections (Hero, Services, FAQ, Contact, etc.)
  ui/                   # Primitive components (Button, Container, Section)
lib/
  content.ts            # ← All site configuration and copy lives here
  utils.ts              # cn() class utility
types/
  index.ts              # Shared TypeScript interfaces
public/                 # Static assets — favicon, logo, og-image.png, hero images
```
