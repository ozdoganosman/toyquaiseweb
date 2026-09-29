// Play-dough illustrations, drawn as plain SVG shapes. The "clay" filter warps the outlines a
// little, lights them like soft matte dough and drops a contact shadow. scripts/render-art.mjs
// renders every scene to a transparent image in public/img/art/.

export const clayColors = {
  turquoise: '#16ae9f',
  teal: '#0e5c56',
  yellow: '#f3b52a',
  coral: '#ec5a3f',
  pink: '#ee82b0',
  grape: '#7a5fdc',
  cream: '#f1e6d2',
  charcoal: '#2e3336',
  brick: '#c4442f',
  wood: '#dfae78',
  glass: '#a7d2dc',
  line: '#cdbb9d',
};
const c = clayColors;

// ------------------------------------------------------------ filter

/** A clay filter. `blur` sets how rounded the edges look, `depth` how deep the shading goes.
 *  The filter region is fixed and large so thin rolled strands are not clipped. */
const clayFilter = (id, { blur = 8, warp = 8, seed = 3, grain = 0.045, depth = 7, shadow = 12 } = {}) => `
  <filter id="${id}" filterUnits="userSpaceOnUse" x="-1200" y="-1200" width="3600" height="3600" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="${seed}" result="wobble"/>
    <feDisplacementMap in="SourceGraphic" in2="wobble" scale="${warp}" xChannelSelector="R" yChannelSelector="G" result="shape"/>
    <feGaussianBlur in="shape" stdDeviation="${blur}" result="soft"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.3" numOctaves="2" seed="${seed + 11}" result="grain"/>
    <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${grain} 0" result="grainAlpha"/>
    <feComposite in="soft" in2="grainAlpha" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="bump"/>
    <feDiffuseLighting in="bump" surfaceScale="${depth}" diffuseConstant="1" lighting-color="#fff" result="diffuse">
      <feDistantLight azimuth="235" elevation="50"/>
    </feDiffuseLighting>
    <feSpecularLighting in="bump" surfaceScale="${depth}" specularConstant="0.32" specularExponent="10" lighting-color="#fff" result="spec">
      <feDistantLight azimuth="235" elevation="60"/>
    </feSpecularLighting>
    <feComposite in="shape" in2="diffuse" operator="arithmetic" k1="1.18" k2="0" k3="0" k4="0" result="lit"/>
    <feComposite in="spec" in2="shape" operator="in" result="shine"/>
    <feComposite in="lit" in2="shine" operator="arithmetic" k1="0" k2="1" k3="0.42" k4="0" result="dough"/>
    <feComposite in="dough" in2="shape" operator="in" result="object"/>
    <feGaussianBlur in="shape" stdDeviation="${shadow * 0.6}" result="shadowBlur"/>
    <feOffset in="shadowBlur" dx="${shadow * 0.45}" dy="${shadow}" result="shadowOffset"/>
    <feColorMatrix in="shadowOffset" type="matrix" values="0 0 0 0 0.03  0 0 0 0 0.16  0 0 0 0 0.15  0 0 0 0.26 0" result="shadow"/>
    <feMerge><feMergeNode in="shadow"/><feMergeNode in="object"/></feMerge>
  </filter>`;

const filters = [
  clayFilter('clay-xl', { blur: 17, warp: 12, seed: 2, depth: 11, shadow: 18, grain: 0.028 }),
  clayFilter('clay-lg', { blur: 10, warp: 10, depth: 8, shadow: 14, grain: 0.04 }),
  clayFilter('clay-md', { blur: 7, warp: 7, seed: 5, depth: 6, shadow: 10 }),
  clayFilter('clay-sm', { blur: 4, warp: 4, seed: 8, depth: 4, shadow: 6, grain: 0.03 }),
].join('');

// ------------------------------------------------------------ shapes

const piece = (size, body, transform = '') => `<g filter="url(#clay-${size})"${transform ? ` transform="${transform}"` : ''}>${body}</g>`;
const ball = (cx, cy, r, fill) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
const rect = (x, y, w, h, r, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
const snake = (d, width, stroke) => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const letter = (x, y, size, fill, text) =>
  `<text x="${x}" y="${y}" font-family="DynaPuff" font-weight="700" font-size="${size}" text-anchor="middle" fill="${fill}">${text}</text>`;

function gearPath(teeth, outer, inner, hole) {
  const pts = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    for (const [da, r] of [[-0.3, inner], [-0.17, outer], [0.17, outer], [0.3, inner]]) {
      const t = a + da * step * 1.6;
      pts.push(`${(Math.cos(t) * r).toFixed(1)} ${(Math.sin(t) * r).toFixed(1)}`);
    }
  }
  return `M${pts.join('L')}Z M${hole} 0 A${hole} ${hole} 0 1 0 ${-hole} 0 A${hole} ${hole} 0 1 0 ${hole} 0Z`;
}
const gear = (x, y, scale, fill, rotate = 0) =>
  piece('md', `<path d="${gearPath(9, 110, 84, 34)}" fill="${fill}" fill-rule="evenodd"/>`, `translate(${x} ${y}) rotate(${rotate}) scale(${scale})`);

const gamepad = (x, y, scale, rotate) => {
  const t = `translate(${x} ${y}) rotate(${rotate}) scale(${scale})`;
  const body = 'M-120 -92H120C182 -92 206 -42 216 18L234 104C244 156 190 180 150 142L108 102H-108L-150 142C-190 180-244 156-234 104L-216 18C-206 -42-182 -92-120 -92Z';
  return [
    piece('xl', `<path d="${body}" fill="${c.turquoise}"/>`, t),
    piece('sm', rect(-162, -17, 88, 34, 12, c.cream) + rect(-135, -44, 34, 88, 12, c.cream), t),
    piece('sm', ball(122, -36, 19, c.yellow) + ball(158, 0, 19, c.coral) + ball(122, 36, 19, c.grape) + ball(86, 0, 19, c.pink), t),
    piece('sm', rect(-44, -54, 30, 15, 7, c.teal) + rect(14, -54, 30, 15, 7, c.teal), t),
  ].join('');
};

const openBook = (x, y, scale, rotate) => {
  const t = `translate(${x} ${y}) rotate(${rotate}) scale(${scale})`;
  const lines = [-78, -44, -10, 24, 58]
    .map((dy, i) => `M-160 ${dy + 6}Q-100 ${dy - 12}-${i === 4 ? 70 : 34} ${dy}M34 ${dy}Q100 ${dy - 12} ${i === 2 ? 110 : 160} ${dy + 6}`)
    .join('');
  return [
    piece('xl', `<path d="M-212 -112Q-104 -146 0 -114Q104 -146 212 -112L224 124Q106 98 0 130Q-106 98-224 124Z" fill="${c.coral}"/>`, t),
    piece('md', `<path d="M-190 -124Q-98 -154-6 -120V110Q-98 82-196 106Z" fill="${c.cream}"/><path d="M190 -124Q98 -154 6 -120V110Q98 82 196 106Z" fill="${c.cream}"/>`, t),
    piece('sm', snake(lines, 9, c.line), t),
  ].join('');
};

const pencil = (x, y, scale, rotate) => {
  const t = `translate(${x} ${y}) rotate(${rotate}) scale(${scale})`;
  return [
    piece('md', rect(-70, -27, 90, 54, 24, c.pink), t),
    piece('md', rect(0, -27, 300, 54, 22, c.yellow), t),
    piece('md', `<path d="M292 -26L388 0L292 26Z" fill="${c.wood}" stroke="${c.wood}" stroke-width="10" stroke-linejoin="round"/>`, t),
    piece('sm', `<path d="M356 -9L392 0L356 9Z" fill="${c.charcoal}" stroke="${c.charcoal}" stroke-width="6" stroke-linejoin="round"/>`, t),
  ].join('');
};

const block = (x, y, size, rotate, fill, text, ink = c.cream) => {
  const t = `translate(${x} ${y}) rotate(${rotate})`;
  return piece('md', rect(-size / 2, -size / 2, size, size, size * 0.26, fill), t) + piece('sm', letter(0, size * 0.27, size * 0.7, ink, text), t);
};

const car = (x, y, scale) => {
  const t = `translate(${x} ${y}) scale(${scale})`;
  return [
    piece('xl', `<path d="M150 172Q150 138 184 138H468Q500 138 506 170L522 304H138Z" fill="${c.brick}"/>`, t),
    piece('sm', rect(190, 176, 128, 96, 22, c.glass) + rect(344, 176, 134, 96, 22, c.glass), t),
    piece('xl', `<path d="M92 296H776Q836 296 836 350V390Q836 424 802 424H92Q58 424 58 390V334Q58 296 92 296Z" fill="${c.brick}"/>`, t),
    piece('sm', snake('M60 440H836', 20, c.charcoal) + ball(820, 330, 20, c.yellow), t),
    piece('md', ball(236, 440, 72, c.charcoal) + ball(652, 440, 72, c.charcoal), t),
    piece('sm', ball(236, 440, 30, c.wood) + ball(652, 440, 30, c.wood), t),
  ].join('');
};

const bookStack = (x, y, scale) => {
  const t = `translate(${x} ${y}) scale(${scale})`;
  return [
    piece('xl', rect(0, 170, 540, 96, 30, c.turquoise), t),
    piece('sm', snake('M40 218H500', 12, c.cream), t),
    piece('xl', rect(40, 86, 470, 88, 28, c.cream), t),
    piece('sm', snake('M80 130H470', 10, c.line), t),
    piece('xl', rect(18, 4, 500, 86, 28, c.grape), t),
    piece('sm', snake('M60 47H476', 12, c.yellow), t),
  ].join('');
};

const logoT = (x, y, scale, stroke = c.turquoise, dot = c.yellow) => {
  const t = `translate(${x} ${y}) scale(${scale})`;
  return piece('lg', snake('M120 60V230Q120 300 190 300H214M60 118H200', 70, stroke), t) + piece('md', ball(236, 66, 36, dot), t);
};

// ------------------------------------------------------------ scenes

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${filters}</defs>${body}</svg>`;

export const scenes = {
  // Home page hero: learning things and a game controller, rolled from the same dough.
  hero: {
    width: 1200,
    height: 980,
    svg: svg(1200, 980, [
      gear(240, 240, 1, c.yellow, 8),
      openBook(840, 270, 1.15, 7),
      piece('md', ball(520, 120, 30, c.grape)),
      piece('md', ball(1110, 560, 32, c.pink)),
      piece('md', snake('M60 520Q100 470 140 515T230 505', 38, c.pink)),
      gamepad(560, 530, 1.4, -8),
      pencil(150, 880, 0.9, -8),
      piece('md', ball(560, 900, 36, c.coral)),
      block(890, 830, 140, -8, c.coral, 'A'),
      block(1040, 810, 130, 7, c.yellow, 'B', c.teal),
      block(960, 700, 120, 14, c.turquoise, 'C'),
    ].join('')),
  },
  // CarFacTycoon: a period car and a gear.
  car: {
    width: 960,
    height: 620,
    svg: svg(960, 620, [gear(790, 170, 0.62, c.yellow, 12), car(30, 60, 1)].join('')),
  },
  // RapidReader: a stack of books with the app's R and focus mark on top.
  books: {
    width: 760,
    height: 660,
    svg: svg(760, 660, [
      bookStack(90, 330, 1),
      piece('lg', letter(370, 330, 300, c.coral, 'R')),
      piece('sm', rect(350, 30, 26, 58, 13, c.coral)),
    ].join('')),
  },
  // The studio mark on its own.
  logo: {
    width: 340,
    height: 380,
    svg: svg(340, 380, logoT(10, 20, 1)),
  },
  // App icon and favicons: the mark on a turquoise slab of dough.
  icon: {
    width: 600,
    height: 600,
    svg: svg(600, 600, piece('xl', rect(50, 40, 500, 500, 130, c.turquoise)) + logoT(130, 110, 1.15, c.cream, c.yellow)),
  },
};
