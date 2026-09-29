// Page templates. Each page function returns { title, description, body, ... } and layout()
// wraps it in the shared <head>, header and footer.
import { site, languages, defaultLanguage } from './site.mjs';
import { ui } from './i18n.mjs';
import { projects } from './projects/index.mjs';
import { icons } from './icons.mjs';
import { scenes } from '../art/scenes.mjs';

// ---------------------------------------------------------------- helpers

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Site path of `path` (always starting and ending with "/") in language `lang`. */
export const href = (lang, path) => (lang === defaultLanguage ? path : `/${lang}${path}`);

const formatDate = (lang, iso) =>
  new Intl.DateTimeFormat(ui[lang].htmlLang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));

const shot = (slug, lang, n) => `/img/${slug}/${lang}/shot-${n}.webp`;

/** A play-dough illustration from art/scenes.mjs. */
const art = (name, cls, { lazy = true, priority = false } = {}) =>
  `<img class="${cls}" src="/img/art/${name}.webp" alt="" width="${scenes[name].width}" height="${scenes[name].height}"${lazy ? ' loading="lazy"' : ''}${priority ? ' fetchpriority="high"' : ''} decoding="async">`;

const wordmark = () => `${art('logo', 'brand-mark', { lazy: false })}<span>${site.name.toLowerCase()}</span>`;

const storeButtons = (lang, p) => {
  const t = ui[lang].project;
  const out = [];
  const gp = p.links.googlePlay;
  if (gp?.live) {
    out.push(`<a class="btn btn-dark" href="${esc(gp.url)}">${icons.play}<span>${t.googlePlay}</span></a>`);
  } else if (gp) {
    out.push(`<span class="btn btn-soon" aria-disabled="true">${icons.play}<span>${t.googlePlaySoon}</span></span>`);
  }
  if (p.links.web) {
    out.push(`<a class="btn btn-light" href="${esc(p.links.web)}">${icons.globe}<span>${t.web}</span></a>`);
  }
  return out.join('');
};

const slabStyle = (p) => `--slab:${p.slab.light};--slab-dark:${p.slab.dark};--game-accent:${p.theme.accent}`;

const learnList = (items, cls = 'learn') => `<ul class="${cls}">${items.map((x) => `<li>${x}</li>`).join('')}</ul>`;

// ---------------------------------------------------------------- layout

export function layout(lang, path, page) {
  const t = ui[lang];
  const other = languages.find((l) => l !== lang);
  const url = (l) => site.url + href(l, path);
  const nav = [
    [href(lang, '/#games'), t.nav.games, '#games'],
    [href(lang, '/#studio'), t.nav.studio, '#studio'],
    [href(lang, '/support/'), t.nav.support, '/support/'],
  ];
  const navLinks = nav
    .map(([h, label, key]) => `<a href="${h}"${page.section === key ? ' aria-current="page"' : ''}>${label}</a>`)
    .join('');
  const image = site.url + (page.image || '/img/og.jpg');

  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url(lang)}">
${languages.map((l) => `<link rel="alternate" hreflang="${l}" href="${url(l)}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${url(defaultLanguage)}">`}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url(lang)}">
<meta property="og:image" content="${image}">
<meta property="og:locale" content="${t.locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#e8f4f1" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0a2220" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/dynapuff-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/lexend-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css?v=${page.cssVersion}">
${page.jsonLd ? `<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>` : ''}
</head>
<body>
<a class="skip-link" href="#main">${t.skip}</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="${href(lang, '/')}">${wordmark()}</a>
    <nav class="nav" aria-label="${t.menu}">${navLinks}</nav>
    <a class="lang-switch" href="${href(other, path)}" hreflang="${other}" lang="${other}">${icons.translate}<span>${t.switchTo}</span></a>
  </div>
</header>
<main id="main">
${page.body}
</main>
${footer(lang)}
</body>
</html>
`;
}

function footer(lang) {
  const t = ui[lang];
  const year = new Date().getUTCFullYear();
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <a class="brand" href="${href(lang, '/')}">${wordmark()}</a>
      <p>${t.footer.tagline}</p>
      <p><a href="mailto:${site.email}">${site.email}</a></p>
    </div>
    <div>
      <h2>${t.footer.apps}</h2>
      <ul>${projects.map((p) => `<li><a href="${href(lang, `/${p.slug}/`)}">${p.name}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2>${t.footer.studio}</h2>
      <ul>
        <li><a href="${href(lang, '/#studio')}">${t.nav.studio}</a></li>
        <li><a href="${href(lang, '/support/')}">${t.nav.support}</a></li>
        <li><a href="${site.github}">GitHub</a></li>
      </ul>
    </div>
    <div>
      <h2>${t.footer.legal}</h2>
      <ul>
        <li><a href="${href(lang, '/privacy/')}">${t.nav.privacy}</a></li>
        ${projects.map((p) => `<li><a href="${href(lang, `/${p.slug}/privacy/`)}">${p.name} · ${t.nav.privacy}</a></li>`).join('')}
      </ul>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <p>© ${site.foundedYear === year ? year : `${site.foundedYear}–${year}`} ${site.name}. ${t.footer.rights}</p>
    <p>${t.footer.trademark}</p>
  </div>
</footer>`;
}

// ---------------------------------------------------------------- home

export function home(lang) {
  const t = ui[lang];
  const h = t.home;

  const games = projects
    .map((p) => {
      const d = p[lang];
      const page = href(lang, `/${p.slug}/`);
      return `<article class="game" style="${slabStyle(p)}" aria-labelledby="game-${p.slug}">
        <a class="game-media" href="${page}" tabindex="-1" aria-hidden="true">${art(p.art, 'game-art')}</a>
        <div class="game-body">
          <p class="game-kind"><img class="app-icon" src="/img/${p.slug}/icon.webp" alt="" width="44" height="44" loading="lazy">${d.kind}</p>
          <h3 id="game-${p.slug}"><a href="${page}">${p.name}</a></h3>
          <p class="game-summary">${d.summary}</p>
          <h4>${t.project.learn}</h4>
          ${learnList(d.learn)}
          <div class="actions">
            <a class="btn btn-primary" href="${page}"><span>${t.project.learnMore}</span>${icons.arrow}</a>
            ${storeButtons(lang, p)}
          </div>
        </div>
      </article>`;
    })
    .join('');

  return {
    title: h.title,
    description: h.description,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.name,
      url: site.url + '/',
      logo: site.url + '/icon-512.png',
      email: site.email,
      description: h.description,
      address: { '@type': 'PostalAddress', addressCountry: 'TR' },
      sameAs: [site.github],
    },
    body: `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="kicker">${h.kicker}</p>
      <h1>${h.heading}</h1>
      <p class="lead">${h.lead}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" href="#games"><span>${h.ctaGames}</span>${icons.arrow}</a>
        <a class="hero-mail" href="mailto:${site.email}">${icons.mail}<span>${site.email}</span></a>
      </div>
    </div>
    <div class="hero-art">${art('hero', 'hero-img', { lazy: false, priority: true })}</div>
  </div>
</section>

<section class="section" id="games" aria-labelledby="games-title">
  <div class="wrap">
    <h2 class="section-title" id="games-title">${h.gamesTitle}</h2>
    <div class="games">${games}</div>
  </div>
</section>

<section class="section studio" id="studio" aria-labelledby="studio-title">
  <div class="wrap studio-grid">
    <div class="studio-copy">
      <h2 id="studio-title">${h.studioTitle}</h2>
      ${h.studio.map((p) => `<p>${p}</p>`).join('')}
    </div>
    <aside class="contact" aria-labelledby="contact-title">
      ${art('logo', 'contact-mark')}
      <h3 id="contact-title">${h.contactTitle}</h3>
      <p>${h.contactText}</p>
      <a class="contact-email" href="mailto:${site.email}">${site.email}</a>
      <a class="contact-support" href="${href(lang, '/support/')}">${icons.help}<span>${t.nav.support}</span></a>
    </aside>
  </div>
</section>`,
  };
}

// ---------------------------------------------------------------- project

export function project(lang, p) {
  const t = ui[lang];
  const d = p[lang];
  const privacy = href(lang, `/${p.slug}/privacy/`);
  const support = href(lang, '/support/') + `#${p.slug}`;
  const shots = Array.from({ length: p.screenshotCount }, (_, i) => i + 1);

  return {
    title: `${p.name} · ${d.kind} · ${site.name}`,
    description: `${d.tagline} ${d.summary}`,
    image: `/img/${p.slug}/${lang}/feature.jpg`,
    section: '#games',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: p.name,
      description: d.tagline,
      applicationCategory: p.schemaCategory,
      operatingSystem: p.platforms.map((k) => t.platforms[k]).join(', '),
      inLanguage: p.languageNames,
      image: site.url + `/img/${p.slug}/icon.webp`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: site.name, url: site.url + '/' },
      publisher: { '@type': 'Organization', name: site.name, url: site.url + '/' },
    },
    body: `
<section class="project-hero" style="${slabStyle(p)}">
  <div class="wrap project-hero-grid">
    <div class="project-hero-copy">
      <a class="back-link" href="${href(lang, '/#games')}">${icons.back}<span>${t.project.back}</span></a>
      <div class="project-title">
        <img class="app-icon app-icon-lg" src="/img/${p.slug}/icon.webp" alt="" width="88" height="88">
        <div>
          <h1>${p.name}</h1>
          <p class="kind">${d.kind} · ${site.name}</p>
        </div>
      </div>
      <p class="lead">${d.tagline}</p>
      <div class="actions">${storeButtons(lang, p)}</div>
    </div>
    <div class="project-hero-media">${art(p.art, 'game-art', { lazy: false, priority: true })}</div>
  </div>
</section>

<section class="section">
  <div class="wrap narrow intro">
    ${d.intro.map((x) => `<p>${x}</p>`).join('')}
  </div>
</section>

<section class="section learn-section" aria-labelledby="learn-title" style="${slabStyle(p)}">
  <div class="wrap learn-grid">
    <h2 id="learn-title">${t.project.learn}</h2>
    ${learnList(d.learn, 'learn learn-lg')}
  </div>
</section>

<section class="section" aria-labelledby="features-title">
  <div class="wrap">
    <h2 class="section-title" id="features-title">${t.project.features}</h2>
    <ul class="features">
      ${d.features.map((f) => `<li><h3>${f.title}</h3><p>${f.text}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section section-flush" aria-labelledby="shots-title">
  <div class="wrap">
    <h2 class="section-title" id="shots-title">${t.project.screenshots}</h2>
  </div>
  <ul class="gallery" tabindex="0" aria-labelledby="shots-title">
    ${shots
      .map((n) => `<li><figure class="phone"><img src="${shot(p.slug, lang, n)}" alt="${esc(d.screenshots[n - 1])}" width="540" height="960" loading="lazy" decoding="async"></figure></li>`)
      .join('')}
  </ul>
</section>

<section class="section" aria-labelledby="details-title">
  <div class="wrap details-grid">
    <div>
      <h2 class="section-title" id="details-title">${t.project.details}</h2>
      <dl class="facts">
        <div><dt>${t.project.developer}</dt><dd><a href="${href(lang, '/')}">${site.name}</a></dd></div>
        <div><dt>${t.project.platforms}</dt><dd>${p.platforms.map((k) => t.platforms[k]).join(', ')}</dd></div>
        <div><dt>${t.project.languages}</dt><dd>${p.languageNames.map((n) => `<span dir="auto">${n}</span>`).join(', ')}</dd></div>
        <div><dt>${t.project.price}</dt><dd>${d.facts.price}</dd></div>
        <div><dt>${t.project.category}</dt><dd>${d.facts.category}</dd></div>
        <div><dt>${t.project.privacy}</dt><dd><a href="${privacy}">${site.domain}${privacy}</a></dd></div>
      </dl>
    </div>
    <aside class="help">
      <h2>${t.project.helpTitle}</h2>
      <p>${t.project.helpText}</p>
      <div class="actions">
        <a class="btn btn-primary" href="${support}">${icons.help}<span>${t.project.support}</span></a>
        <a class="btn btn-light" href="${privacy}">${icons.shield}<span>${t.project.privacy}</span></a>
      </div>
    </aside>
  </div>
</section>`,
  };
}

// ---------------------------------------------------------------- app privacy policy

export function appPrivacy(lang, p) {
  const t = ui[lang];
  const sections = p.privacy[lang](site.email);
  return {
    title: `${p.name} · ${t.project.privacy} · ${site.name}`,
    description: `${t.privacy.policyFor} ${p.name}. ${site.name}.`,
    body: `
<article class="doc">
  <div class="wrap narrow">
    <header class="doc-head">
      <a class="back-link" href="${href(lang, `/${p.slug}/`)}">${icons.back}<span>${p.name}</span></a>
      <div class="project-title">
        <img class="app-icon" src="/img/${p.slug}/icon.webp" alt="" width="64" height="64">
        <div>
          <h1>${t.project.privacy}</h1>
          <p class="kind">${p.name} · ${site.name}</p>
        </div>
      </div>
      <p class="muted">${t.privacy.lastUpdated}: <time datetime="${p.privacy.updated}">${formatDate(lang, p.privacy.updated)}</time></p>
    </header>
    <nav class="toc" aria-labelledby="toc-title">
      <h2 id="toc-title">${t.privacy.onThisPage}</h2>
      <ol>${sections.map((s) => `<li><a href="#${s.id}">${s.title}</a></li>`).join('')}</ol>
    </nav>
    ${sections.map((s) => `<section id="${s.id}"><h2>${s.title}</h2>${s.html}</section>`).join('\n')}
  </div>
</article>`,
  };
}

// ---------------------------------------------------------------- studio privacy

export function privacy(lang) {
  const t = ui[lang];
  return {
    title: `${t.privacy.title} · ${site.name}`,
    description: t.privacy.description,
    body: `
<article class="doc">
  <div class="wrap narrow">
    <header class="doc-head">
      <h1>${t.privacy.heading}</h1>
      <p class="lead">${t.privacy.lead}</p>
    </header>
    <section aria-labelledby="apps-title">
      <h2 id="apps-title">${t.privacy.appsTitle}</h2>
      <ul class="link-list">
        ${projects
          .map(
            (p) => `<li><a href="${href(lang, `/${p.slug}/privacy/`)}" style="${slabStyle(p)}">
              <img class="app-icon" src="/img/${p.slug}/icon.webp" alt="" width="48" height="48">
              <span><strong>${p.name}</strong><small>${t.privacy.lastUpdated}: ${formatDate(lang, p.privacy.updated)}</small></span>
              ${icons.arrow}
            </a></li>`,
          )
          .join('')}
      </ul>
    </section>
    <section id="website" aria-labelledby="website-title">
      <h2 id="website-title">${t.privacy.siteTitle}</h2>
      ${t.privacy.site.map((x) => `<p>${x}</p>`).join('')}
      <p><a href="mailto:${site.email}">${site.email}</a></p>
    </section>
  </div>
</article>`,
  };
}

// ---------------------------------------------------------------- support

export function support(lang) {
  const t = ui[lang];
  return {
    title: `${t.support.title} · ${site.name}`,
    description: t.support.description,
    section: '/support/',
    body: `
<article class="doc">
  <div class="wrap narrow">
    <header class="doc-head">
      <h1>${t.support.heading}</h1>
      <p class="lead">${t.support.lead}</p>
    </header>
    <section class="contact contact-wide" aria-labelledby="email-title">
      ${art('logo', 'contact-mark')}
      <h2 id="email-title">${t.support.emailTitle}</h2>
      <p>${t.support.emailText}</p>
      <a class="contact-email" href="mailto:${site.email}">${site.email}</a>
    </section>
    <h2 class="faq-title">${t.support.faqTitle}</h2>
    ${projects
      .map((p) => {
        const privacyUrl = href(lang, `/${p.slug}/privacy/`);
        return `<section class="faq" id="${p.slug}" aria-labelledby="faq-${p.slug}">
          <div class="faq-head">
            <img class="app-icon" src="/img/${p.slug}/icon.webp" alt="" width="48" height="48">
            <h3 id="faq-${p.slug}"><a href="${href(lang, `/${p.slug}/`)}">${p.name}</a></h3>
          </div>
          ${p[lang].faq
            .map((f) => `<details><summary>${f.q}</summary><div>${f.a.replaceAll('{privacy}', privacyUrl)}</div></details>`)
            .join('')}
          <p class="faq-more"><a href="${privacyUrl}">${t.project.privacy}</a></p>
        </section>`;
      })
      .join('')}
  </div>
</article>`,
  };
}

// ---------------------------------------------------------------- 404

export function notFound() {
  // One page for every language: GitHub Pages serves /404.html for any missing address.
  const [a, b] = languages.map((l) => ui[l].notFound);
  return {
    title: `${a.title} · ${site.name}`,
    description: a.text,
    noindex: true,
    body: `
<section class="not-found">
  <div class="wrap narrow">
    ${art('logo', 'not-found-mark', { lazy: false })}
    <h1>${a.heading}</h1>
    <p>${a.text}</p>
    <p class="actions"><a class="btn btn-primary" href="/">${icons.back}<span>${a.home}</span></a></p>
    <div lang="${ui[languages[1]].htmlLang}" class="not-found-alt">
      <p><strong>${b.heading}</strong> ${b.text}</p>
      <p><a href="${href(languages[1], '/')}">${b.home}</a></p>
    </div>
  </div>
</section>`,
  };
}
