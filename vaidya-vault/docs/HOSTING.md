
# Vaidya Vault — Free Hosting Guide

## 1) GitHub Pages (via GitHub Actions)
- Push this folder to a GitHub repo.
- Ensure your default branch is **main**.
- The included workflow `.github/workflows/deploy.yml` will build and publish to **gh-pages** when you push to main.
- In repo Settings → Pages: choose **gh-pages** branch, root.

If your site is served from a subpath, set:
```
NEXT_BASE_PATH=/yourrepo
NEXT_ASSET_PREFIX=/yourrepo
```
as Repository → Settings → Secrets and variables → Actions → Variables.

## 2) Vercel
- `npm install` then `vercel` (or connect repo). It auto-detects Next.js.
- Or export static: `npm run export` and drop the `out/` folder into any static host.

## 3) Netlify (static)
- `npm run export` → upload the `out/` folder or configure a build (npm run export) and publish directory `out`.
