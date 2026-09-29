// Local preview: builds the site, serves dist/ on http://localhost:4321 and rebuilds when
// anything in src/ or public/ changes. `npm run dev`, or `npm run preview` to serve without watching.
import { spawnSync } from 'node:child_process';
import { createReadStream, existsSync, statSync, watch } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const port = Number(process.env.PORT) || 4321;
const watching = !process.argv.includes('--no-watch');

const build = () => spawnSync(process.execPath, [join(root, 'scripts/build.mjs')], { stdio: 'inherit' });
build();

if (watching) {
  let timer;
  for (const dir of ['src', 'public']) {
    watch(join(root, dir), { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(build, 100);
    });
  }
}

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
};

createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join(dist, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  let status = 200;
  if (!existsSync(file)) {
    // Like GitHub Pages: a folder without a trailing slash redirects, anything else gets 404.html.
    if (existsSync(join(dist, path, 'index.html'))) {
      res.writeHead(301, { Location: path + '/' }).end();
      return;
    }
    file = join(dist, '404.html');
    status = 404;
  }
  res.writeHead(status, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`Serving dist/ at http://localhost:${port}${watching ? ' (rebuilds on change)' : ''}`));
