// Builds the site into dist/: renders every page in every language, copies public/, writes the
// sitemap, then checks that every internal link and #anchor points at something that exists.
// No dependencies: `node scripts/build.mjs`.
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const { site, languages } = await import('../src/site.mjs');
const pages = await import('../src/pages.mjs');
const { projects } = await import('../src/projects/index.mjs');

rmSync(dist, { recursive: true, force: true });
cpSync(join(root, 'public'), dist, { recursive: true });

const css = readFileSync(join(root, 'src/styles.css'), 'utf8');
const cssVersion = createHash('sha256').update(css).digest('hex').slice(0, 10);
mkdirSync(join(dist, 'assets'), { recursive: true });
writeFileSync(join(dist, 'assets/site.css'), css);

const routes = [
  { path: '/', render: pages.home },
  ...projects.flatMap((p) => [
    { path: `/${p.slug}/`, render: (lang) => pages.project(lang, p) },
    { path: `/${p.slug}/privacy/`, render: (lang) => pages.appPrivacy(lang, p) },
  ]),
  { path: '/privacy/', render: pages.privacy },
  { path: '/support/', render: pages.support },
];

const written = [];
const write = (file, html) => {
  const out = join(dist, file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  written.push(out);
};

for (const lang of languages) {
  for (const route of routes) {
    const page = { ...route.render(lang), cssVersion };
    write(join(pages.href(lang, route.path), 'index.html'), pages.layout(lang, route.path, page));
  }
}
write('404.html', pages.layout(languages[0], '/', { ...pages.notFound(), cssVersion }));

// Sitemap, with each page's translations.
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .flatMap((r) =>
    languages.map(
      (lang) => `  <url>
    <loc>${site.url}${pages.href(lang, r.path)}</loc>
    <lastmod>${today}</lastmod>
${languages.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${site.url}${pages.href(l, r.path)}"/>`).join('\n')}
  </url>`,
    ),
  )
  .join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

// ------------------------------------------------------------ checks

const problems = [];

const adsTxt = readFileSync(join(dist, 'app-ads.txt'), 'utf8');
if (!adsTxt.includes(site.admobPublisherId)) {
  problems.push(`public/app-ads.txt does not contain the AdMob publisher ID ${site.admobPublisherId} from src/site.mjs`);
}
if (readFileSync(join(dist, 'CNAME'), 'utf8').trim() !== site.domain) {
  problems.push(`public/CNAME must contain exactly ${site.domain}`);
}

const ids = new Map(); // file -> Set of ids
const idsOf = (file) => {
  if (!ids.has(file)) ids.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return ids.get(file);
};

const resolve = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const file = join(dist, clean);
  if (existsSync(file) && statSync(file).isFile()) return file;
  const index = join(file, 'index.html');
  return existsSync(index) ? index : null;
};

for (const file of written) {
  const html = readFileSync(file, 'utf8');
  const where = relative(dist, file);
  const seen = new Set();
  for (const [, id] of html.matchAll(/\sid="([^"]+)"/g)) {
    if (seen.has(id)) problems.push(`${where}: duplicate id="${id}"`);
    seen.add(id);
  }
  for (const [, attr, value] of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(value)) continue;
    const [path, hash] = value.split('#');
    let target = file;
    if (path) {
      if (!path.startsWith('/')) {
        problems.push(`${where}: relative ${attr} "${value}" (use a path starting with /)`);
        continue;
      }
      target = resolve(path);
      if (!target) {
        problems.push(`${where}: ${attr}="${value}" does not exist`);
        continue;
      }
    }
    if (hash && target.endsWith('.html') && !idsOf(target).has(hash)) {
      problems.push(`${where}: ${attr}="${value}" points at a missing #${hash}`);
    }
  }
}

if (problems.length) {
  console.error(`Build finished with ${problems.length} problem(s):\n- ${problems.join('\n- ')}`);
  process.exitCode = 1;
} else {
  const count = (dir) => readdirSync(dir, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? count(join(dir, e.name)) : 1), 0);
  console.log(`Built ${written.length} pages (${count(dist)} files) into dist/. All internal links resolve.`);
}
