
import fs from 'fs';
const site = process.env.SITE_URL || 'https://example.com/VaidyaVault';
const data = JSON.parse(fs.readFileSync('./data/cultures.json','utf-8'));
const updated = new Date().toISOString();
const items = data.slice(0, 50).map(c => `
  <entry>
    <title>${c.name}</title>
    <link href="${site}/archives/${c.id}"/>
    <id>tag:vaidya-vault:${c.id}</id>
    <updated>${updated}</updated>
    <summary>${(c.summary||'').replace(/&/g,'&amp;').replace(/</g,'&lt;')}</summary>
  </entry>
`).join('\n');
const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Vaidya Vault — New Entries</title>
  <link href="${site}/feed.xml" rel="self"/>
  <updated>${updated}</updated>
  <id>tag:vaidya-vault:feed</id>
  ${items}
</feed>`;
fs.mkdirSync('./public', { recursive: true });
fs.writeFileSync('./public/feed.xml', feed);
console.log('Feed written to public/feed.xml');
