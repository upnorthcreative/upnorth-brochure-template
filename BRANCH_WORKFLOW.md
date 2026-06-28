# Branch Workflow — Up North Creative

A simple two-branch workflow. Keep it boring and predictable.

---

## Branches

| Branch | Purpose | Deploys to | Commit directly? |
|--------|---------|-----------|------------------|
| `main` | Production / live site | Vercel **Production** | ❌ Never — merge from `dev` only |
| `dev`  | Active development | Vercel **Preview** (preview URL) | ✅ Yes — this is where you work |

**Rules:**
- All changes start on `dev`.
- `main` only ever receives changes via a merge from `dev`.
- Never force-push. Never rewrite history on either branch.
- Never delete `main` or `dev`.

---

## Daily Workflow

```bash
# 1. Make sure you're on dev and up to date
git checkout dev
git pull

# 2. Do your work
#    ...edit files...

# 3. Clean up and audit (slash commands in Claude Code)
/cleanup
/audit

# 4. Commit to dev
git add -A
git commit -m "Describe the change"

# 5. Push dev — this triggers a Vercel preview deployment
git push

# 6. Verify the preview
#    Vercel posts a preview URL on the commit / GitHub.
/live-audit   # run against the preview URL

# 7. When the preview is verified, ship to production (see below)
```

---

## Shipping to Production

Only after the `dev` preview has been tested and the live audit passes:

```bash
git checkout main
git pull                 # ensure main is current
git merge dev            # fast-forward or merge commit
git push                 # Vercel deploys production from main
git checkout dev         # go back to dev for the next change
```

---

## Pre-Merge Checklist

Before merging `dev` into `main`, confirm:

- [ ] `npm run lint` passes (0 errors, 0 warnings)
- [ ] `npm run build` passes
- [ ] `/cleanup` has been run
- [ ] `/audit` has been run
- [ ] `dev` has been pushed and the Vercel preview built successfully
- [ ] `/live-audit` was run against the preview URL and passed
- [ ] Forms tested on the preview (submission, success, error states)
- [ ] No secrets or test keys committed
- [ ] Content reviewed — no placeholder text, correct pricing, correct contact info

---

## Emergency Hotfix

If production is broken and `dev` contains unfinished work you can't ship:

```bash
# 1. Branch a hotfix off main (not dev)
git checkout main
git pull
git checkout -b hotfix/short-description

# 2. Make the minimal fix, then verify
npm run lint && npm run build

# 3. Commit and push the hotfix branch
git add -A
git commit -m "Hotfix: describe the fix"
git push -u origin hotfix/short-description

# 4. Verify the hotfix preview on Vercel, then merge to main
git checkout main
git merge hotfix/short-description
git push                 # production deploys the fix

# 5. Bring the fix back into dev so it isn't lost on the next merge
git checkout dev
git merge main
git push
```

Keep hotfixes tiny and targeted. Anything larger goes through the normal `dev` flow.
