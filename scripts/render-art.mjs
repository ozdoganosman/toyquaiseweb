// Renders the play-dough illustrations in art/scenes.mjs to transparent WebP images in
// public/img/art/, plus the favicons and the social preview image. Needs Playwright with
// Chromium (`npm i -D playwright && npx playwright install chromium`); the site build does not.
//   node scripts/render-art.mjs            all scenes
//   node scripts/render-art.mjs hero car   only these
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/img/art');
const { scenes } = await import('../art/scenes.mjs');

// Playwright from the project, or else from the global npm folder.
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  try {
    const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
    ({ chromium } = createRequire(join(globalRoot, 'noop.js'))('playwright'));
  } catch {
    console.error('Playwright is missing: npm i -D playwright && npx playwright install chromium');
    process.exit(1);
  }
}

const fonts = pathToFileURL(join(root, 'public/fonts')).href;
const fontCss = `
  @font-face { font-family: DynaPuff; font-weight: 400 700; src: url(${fonts}/dynapuff-latin-wght-normal.woff2); }
  @font-face { font-family: DynaPuff; font-weight: 400 700; src: url(${fonts}/dynapuff-latin-ext-wght-normal.woff2); unicode-range: U+0100-02BA; }
  @font-face { font-family: Lexend; font-weight: 100 900; src: url(${fonts}/lexend-latin-wght-normal.woff2); }
  @font-face { font-family: Lexend; font-weight: 100 900; src: url(${fonts}/lexend-latin-ext-wght-normal.woff2); unicode-range: U+0100-02BA; }
  html, body { margin: 0; background: transparent; }`;

const browser = await chromium.launch();
const page = await browser.newPage();

/** Screenshot `html` (a full page) and save it as WebP and/or PNG at the given sizes. */
async function render(html, width, height, outputs) {
  await page.setViewportSize({ width, height });
  await page.goto(pathToFileURL(join(root, 'art')).href + '/');
  await page.setContent(`<!doctype html><meta charset="utf-8"><style>${fontCss}</style>${html}`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  const png = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width, height } });
  for (const { file, size, type = 'image/webp', quality = 0.9 } of outputs) {
    const data = await page.evaluate(
      async ({ src, size, type, quality }) => {
        const img = new Image();
        img.src = src;
        await img.decode();
        const [w, h] = size ?? [img.width, img.height];
        const canvas = Object.assign(document.createElement('canvas'), { width: w, height: h });
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, w, h);
        return canvas.toDataURL(type, quality).split(',')[1];
      },
      { src: `data:image/png;base64,${png.toString('base64')}`, size, type, quality },
    );
    const out = join(root, file);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, Buffer.from(data, 'base64'));
    console.log(`${file} (${Math.round(Buffer.byteLength(data, 'base64') / 1024)} KB)`);
  }
}

const only = process.argv.slice(2);
for (const [name, scene] of Object.entries(scenes)) {
  if (only.length && !only.includes(name)) continue;
  const outputs = [{ file: `public/img/art/${name}.webp` }];
  if (name === 'icon') {
    outputs.push(
      { file: 'public/icon-512.png', size: [512, 512], type: 'image/png' },
      { file: 'public/apple-touch-icon.png', size: [180, 180], type: 'image/png' },
      { file: 'public/favicon-32.png', size: [32, 32], type: 'image/png' },
    );
  }
  await render(scene.svg, scene.width, scene.height, outputs);
}

// Social preview (1200x630): the hero illustration with the studio name.
if (!only.length || only.includes('og')) {
  const hero = pathToFileURL(join(outDir, 'hero.webp')).href;
  const logo = pathToFileURL(join(outDir, 'logo.webp')).href;
  await render(
    `<div style="position:relative;width:1200px;height:630px;overflow:hidden;background:#e8f4f1;font-family:Lexend">
      <img src="${hero}" style="position:absolute;right:-40px;top:-20px;width:720px">
      <div style="position:absolute;left:72px;top:150px;width:560px">
        <div style="display:flex;align-items:center;gap:18px">
          <img src="${logo}" style="width:92px">
          <span style="font:700 78px/1 DynaPuff;color:#0c3f3b;letter-spacing:-0.01em">toyquaise</span>
        </div>
        <p style="margin:34px 0 0;font:600 44px/1.15 DynaPuff;color:#0c3f3b">Games you learn from.</p>
        <p style="margin:18px 0 0;font:400 26px/1.4 Lexend;color:#335f5b">Game studio · Türkiye</p>
      </div>
    </div>`,
    1200,
    630,
    [{ file: 'public/img/og.jpg', type: 'image/jpeg', quality: 0.88 }],
  );
}

await browser.close();
