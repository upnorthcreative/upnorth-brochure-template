# New Project Setup — Up North Creative Template

Use this guide every time you spin up a new client website from this template.
It exists to prevent the most common mistake: **a copied template keeps the
template's Git remote**, which means client commits can accidentally be pushed
into the template repository. Follow these steps in order and that can't happen.

> Do this once, at the start of every new project, **before** writing any client code.

---

## 1. Copy the template

Copy the template directory to a new project folder (do **not** copy the
template's `.git` history into a shared location — you'll re-init below):

```bash
# From your Sites directory
cp -R upnorth-<template-name> my-new-client
cd my-new-client
```

Then update project identity:

- `package.json` → set the `name` field to your project slug (e.g. `my-new-client`).
- `README.md` → replace the template description with the client project name.

---

## 2. Reset Git history and remove the inherited remote

The copied folder still points `origin` at the template repo. Reset it so the
new project starts with clean history and **no inherited remote**:

```bash
# Remove the inherited git history and remotes
rm -rf .git

# Start a fresh history for this client project
git init
git add -A
git commit -m "Initial commit from Up North Creative template"
```

> ⚠️ If you prefer to keep history, instead run `git remote remove origin`
> (and remove any other inherited remotes shown by `git remote -v`). Either way,
> **verify `git remote -v` shows nothing template-related before pushing.**

---

## 3. Create the GitHub repository

Create a new, empty repo under the `upnorthcreative` GitHub org. Name it after
the client (e.g. `my-new-client`). Do **not** initialize it with a README,
`.gitignore`, or license — the template already has those.

Using the GitHub CLI (recommended):

```bash
gh repo create upnorthcreative/my-new-client --private --source=. --remote=origin
```

Or create it in the GitHub UI, then add the remote manually (see step 4).

---

## 4. Add the correct origin

If you didn't use `gh repo create --remote=origin` above, add the remote now:

```bash
git remote add origin https://github.com/upnorthcreative/my-new-client.git
git remote -v   # confirm origin points to the CLIENT repo, not a template
```

---

## 5. Create the `dev` branch and push both

This project uses the standard two-branch workflow (see `BRANCH_WORKFLOW.md`):

```bash
# Ensure the production branch is named main
git branch -M main

# Push main to GitHub
git push -u origin main

# Create dev from main and push it
git checkout -b dev
git push -u origin dev
```

You should now have `main` and `dev` on GitHub, and be checked out on `dev`.
**All client work happens on `dev`.**

---

## 6. Connect Vercel

1. In Vercel, **Add New → Project** and import the new GitHub repo.
2. Framework preset: **Next.js** (auto-detected). Leave build/output defaults.
3. Do **not** deploy yet — set the environment variables (step 8) first.

### Production branch = `main`

In **Vercel → Project → Settings → Git**:

- Set **Production Branch** to `main`.
- This guarantees the live site only ever deploys from `main`.

### Preview deployments from `dev`

- Every push to `dev` (and any non-`main` branch) automatically creates a
  **Preview** deployment with its own URL.
- This is where you test before shipping. Vercel posts the preview URL on the
  commit / pull request.
- Promote to production only by merging `dev → main` (see `BRANCH_WORKFLOW.md`).

---

## 7. Add a custom domain (when ready)

In **Vercel → Project → Settings → Domains**, add the client's domain and assign
it to the **Production** environment. Update DNS as Vercel instructs.

> Don't change DNS or domains on an existing client site without approval.

---

## 8. Add environment variables

Copy `.env.example` to `.env.local` for local development, then add the same
variables in Vercel under **Settings → Environment Variables** for **all three**
environments (Production, Preview, Development).

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | ✅ | Public site URL (no trailing slash). Used for sitemaps, `og:url`, JSON-LD. Set per-environment (preview URL vs production domain). |
| `RESEND_API_KEY` | ✅ | Resend API key for contact-form email delivery. The sending domain must be verified in Resend. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | ⬜ Optional | Cloudflare Turnstile site key (spam protection). Leave blank to disable; honeypot + rate limiting still apply. |
| `TURNSTILE_SECRET_KEY` | ⬜ Optional | Cloudflare Turnstile secret key. Pair with the site key above. |

Notes:
- Analytics IDs (GA4, GTM, Meta Pixel, Microsoft Clarity) are **not** env vars —
  they're set in `lib/content.ts` under `siteConfig.analytics`.
- Never commit `.env.local` or any secret. It's already in `.gitignore`.
- For local dev, use Turnstile's test keys (see `.env.example`).

---

## 9. First deployment checklist

Before the first real deployment, confirm:

- [ ] `git remote -v` shows the **client** repo as `origin` — nothing template-related.
- [ ] `main` and `dev` both exist locally and on GitHub.
- [ ] Checked out on `dev`; working tree clean.
- [ ] `package.json` `name` updated to the client slug.
- [ ] `lib/content.ts` updated with client identity, contact, and SEO values.
- [ ] `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY` set in Vercel (all environments).
- [ ] Turnstile keys set (or intentionally left blank).
- [ ] Resend sending domain verified.
- [ ] `npm run lint` passes (0 errors, 0 warnings).
- [ ] `npm run build` passes locally.
- [ ] Vercel **Production Branch = `main`**.
- [ ] Push `dev` → confirm a Vercel **Preview** deployment builds successfully.
- [ ] Test the contact form on the preview (submission, success, error states).
- [ ] No secrets, test keys, or placeholder content committed.
- [ ] Only after preview is verified: merge `dev → main` to deploy production.

---

See also: `BRANCH_WORKFLOW.md` for the day-to-day branch and release process.
