
# Vaidya Vault — Ready-to-Deploy

**How to deploy (GitHub Pages):**
1) Create a repo named **VaidyaVault** and push these files to `main`.
2) Go to **Actions** → run the workflow **Deploy to GitHub Pages** (or push again).
3) In **Settings → Pages**, set **Source: GitHub Actions**.
4) Open your site: `https://<username>.github.io/VaidyaVault/`

If you use a different repo name, set Actions Variables:
- `NEXT_BASE_PATH=/<your-repo>`
- `NEXT_ASSET_PREFIX=/<your-repo>`

**Local dev**
```bash
npm install
npm run dev
```

**Export static**
```bash
npm run export
# outputs to ./out
```
Built on 2025-10-07.
