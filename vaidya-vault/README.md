
# Vaidya Vault — Ultimate (Static, Free, Mobile-Ready)

**What it is**
- Next.js 14 + Tailwind UI
- Global map (Leaflet + OSM, free)
- Explorer with filters + era chips
- IIIF viewer (Mirador) when `iiifManifest` is provided
- Submissions (localStorage) + JSON export
- Exhibits (favorites → JSON)
- Static export for free hosting (GitHub Pages / Vercel / Netlify)
- Mobile-friendly by default

## Develop
```bash
npm install
npm run dev
```

## Static Export
```bash
npm run export
# site in ./out
```

## Deploy to GitHub Pages
- Push to a repo with default branch `main`.
- The provided workflow builds on push and publishes to `gh-pages`.
- Enable Pages in Settings → Pages → gh-pages branch.

If deploying under a subpath (e.g., /vaidya-vault), set env vars:
- `NEXT_BASE_PATH=/vaidya-vault`
- `NEXT_ASSET_PREFIX=/vaidya-vault`
Then push; the workflow will respect them.

## Add more archives
Edit `data/archives.json`. Each item supports:
```json
{
  "slug":"unique-id",
  "title":"Title",
  "region":"Region",
  "lat":0, "lng":0,
  "era":"Ancient|Medieval|Early Modern|Modern|Contemporary",
  "culture":"Group",
  "type":"Type",
  "institution":"Institution",
  "summary":"Short description",
  "languages":["..."],
  "media":["..."],
  "access":"...",
  "license":"...",
  "url":"https://...",
  "iiifManifest":"https://...(optional)"
}
```
