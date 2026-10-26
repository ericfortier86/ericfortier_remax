import { cp, mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';

// Run after a production build, with its local Wrangler preview serving.
// Exports only public assets and rendered pages, never Worker code or D1 data.
const origin = process.argv[2] || 'http://127.0.0.1:5174';
const destination = resolve(process.argv[3] || '.sites-runtime/github-pages');
if (!['localhost', '127.0.0.1'].includes(new URL(origin).hostname)) throw new Error('Export from a local preview of this build.');
const site = 'https://louer-ou-acheter.eric-fortier.com';
const paths = ['/', '/en/', '/guide-acheteur/', '/en/guide-acheteur/', '/confidentialite/', '/en/confidentialite/'];
const pages = [];
for (const path of paths) {
  const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(15000) });
  const html = await response.text();
  const lang = path.startsWith('/en/') ? 'en-CA' : 'fr-CA';
  if (!response.ok || !html.includes(`<html lang="${lang}">`) || !html.includes(`${site}${path}`)) throw new Error(`Invalid rendered page: ${path} (${response.status})`);
  if (!html.includes('</html>') || !html.includes('/_next/static/chunks/')) throw new Error(`Incomplete rendered page: ${path}`);
  pages.push({ path, html });
}
await mkdir(destination, { recursive: true });
for (const name of ['_next', 'images', 'favicon.svg']) await cp(join('dist/client', name), join(destination, name), { recursive: true });
for (const { path, html } of pages) {
  const folder = join(destination, path);
  await mkdir(folder, { recursive: true });
  await writeFile(join(folder, 'index.html'), html);
}
const urls = paths.map(path => `<url><loc>${site}${path}</loc><xhtml:link rel="alternate" hreflang="fr-CA" href="${site}${path.replace(/^\/en\//, '/')}"/><xhtml:link rel="alternate" hreflang="en-CA" href="${site}/en${path.replace(/^\/en\//, '/')}"/></url>`).join('');
await writeFile(join(destination, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`);
await writeFile(join(destination, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
await writeFile(join(destination, '.nojekyll'), '');
await writeFile(join(destination, 'CNAME'), 'louer-ou-acheter.eric-fortier.com\n');
await writeFile(join(destination, '404.html'), '<!doctype html><html lang="fr-CA"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page introuvable | Eric Fortier</title><body style="font:18px system-ui;max-width:650px;margin:15vh auto;padding:24px"><h1>Cette page est introuvable.</h1><p><a href="/">Revenir à Acheter ou louer →</a></p><p lang="en">Page not found. <a href="/en/">Visit the English home buying page →</a></p></body></html>');
let revision = 'local';
try { revision = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(); } catch { /* Git is optional for local exports. */ }
await writeFile(join(destination, 'source.json'), JSON.stringify({ repository: 'ericfortier86/ericfortier_remax', directory: 'acheter-ou-louer', revision, exportedAt: new Date().toISOString() }, null, 2));
console.log(`Exported ${pages.length} bilingual pages and their public assets to ${destination}`);
