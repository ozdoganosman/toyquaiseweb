// Page templates. Each page function returns { title, description, body, ... } and layout()
// wraps it in the shared <head>, header and footer.
import { site, languages, defaultLanguage } from './site.mjs';
import { ui } from './i18n.mjs';
import { projects } from './projects/index.mjs';
import { logo, icons } from './icons.mjs';

// ---------------------------------------------------------------- helpers

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Site path of `path` (always starting and ending with "/") in language `lang`. */
export const href = (lang, path) => (lang === defaultLanguage ? path : `/${lang}${path}`);

const formatDate = (lang, iso) =>
  new Intl.DateTimeFormat(ui[lang].htmlLang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));

const img = (slug, lang, file) => `/img/${slug}/${lang}/${file}`;

const storeButtons = (lang, p, { compact = false } = {}) => {
  const t = ui[lang].project;
  const out = [];
  const gp = p.links.googlePlay;
  if (gp?.live) {
    out.push(`<a class="btn btn-store" href="${esc(gp.url)}">${icons.play}<span>${t.googlePlay}</span></a>`);
  } else if (gp) {
    out.push(`<span class="btn btn-store is-soon" aria-disabled="true">${icons.play}<span>${t.googlePlaySoon}</span></span>`);
  }
  if (p.links.web) {
    out.push(`<a class="btn ${compact ? 'btn-ghost' : 'btn-secondary'}" href="${esc(p.links.web)}">${icons.globe}<span>${t.web}</span></a>`);
  }
  return out.join('');
};

const platformChips = (lang, p) =>
  `<ul class="chips" aria-label="${ui[lang].project.platforms}">${p.platforms
    .map((k) => `<li>${k === 'web' ? icons.globe : icons.android}${ui[lang].platforms[k]}</li>`)
    .join('')}</ul>`;

const projectStyle = (p) =>
  `--p-accent:${p.theme.accent};--p-ink:${p.theme.ink};--p-surface:${p.theme.surface}`;

// ---------------------------------------------------------------- layout

export function layout(lang, path, page) {
  const t = ui[lang];
  const other = languages.find((l) => l !== lang);
  const url = (l) => site.url + href(l, path);
  const nav = [
    [href(lang, '/#projects'), t.nav.projects],
    [href(lang, '/#about'), t.nav.about],
    [href(lang, '/support/'), t.nav.support],
  ];
  const navLinks = nav
    .map(([h, label]) => `<a href="${h}"${page.section && h.includes(page.section) ? ' aria-current="page"' : ''}>${label}</a>`)
    .join('');
  const langLink = `<a class="lang-switch" href="${href(other, path)}" hreflang="${other}" lang="${other}">${icons.translate}<span>${t.switchTo}</span></a>`;
  const image = site.url + (page.image || '/img/og.png');

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
<meta name="theme-color" content="#f6f4ef" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0c1413" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/bricolage-grotesque-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css?v=${page.cssVersion}">
${page.jsonLd ? `<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>` : ''}
</head>
<body>
<a class="skip-link" href="#main">${t.skip}</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="${href(lang, '/')}">${logo(34)}<span>${site.name}</span></a>
    <nav class="nav-desktop" aria-label="${t.menu}">${navLinks}</nav>
    <div class="header-end">
      ${langLink}
      <details class="nav-mobile">
        <summary aria-label="${t.menu}">${icons.menu}</summary>
        <nav aria-label="${t.menu}">${navLinks}</nav>
      </details>
    </div>
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
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <a class="brand" href="${href(lang, '/')}">${logo(30)}<span>${site.name}</span></a>
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
        <li><a href="${href(lang, '/#about')}">${t.nav.about}</a></li>
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
    <p>© ${site.foundedYear === new Date().getUTCFullYear() ? site.foundedYear : `${site.foundedYear}–${new Date().getUTCFullYear()}`} ${site.name}. ${t.footer.rights}</p>
    <p>${t.footer.trademark}</p>
  </div>
</footer>`;
}

// ---------------------------------------------------------------- home

export function home(lang) {
  const t = ui[lang];
  const h = t.home;
  const principleIcons = [icons.userOff, icons.offline, icons.lock, icons.languages];

  const cards = projects
    .map((p) => {
      const d = p[lang];
      const page = href(lang, `/${p.slug}/`);
      return `<article class="project-card" style="${projectStyle(p)}">
        <a class="project-card-media" href="${page}" tabindex="-1" aria-hidden="true">
          <img src="${img(p.slug, lang, 'feature.webp')}" alt="" width="1024" height="500" loading="lazy" decoding="async">
        </a>
        <div class="project-card-body">
          <div class="project-card-head">
            <img class="app-icon" src="/img/${p.slug}/icon.webp" alt="" width="64" height="64" loading="lazy">
            <div>
              <h3><a href="${page}">${p.name}</a></h3>
              <p class="kind">${d.kind}</p>
            </div>
          </div>
          <p class="tagline">${d.tagline}</p>
          ${platformChips(lang, p)}
          <div class="actions">
            <a class="btn btn-primary" href="${page}"><span>${t.project.learnMore}</span>${icons.arrow}</a>
            ${storeButtons(lang, p, { compact: true })}
          </div>
        </div>
      </article>`;
    })
    .join('');

  const tiles = projects
    .map((p, i) => `<img class="hero-tile hero-tile-${i + 1}" src="/img/${p.slug}/icon.webp" alt="" width="160" height="160">`)
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
      sameAs: [site.github],
    },
    body: `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">${h.eyebrow}</p>
      <h1>${h.heading}</h1>
      <p class="lead">${h.lead}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" href="#projects"><span>${h.ctaProjects}</span>${icons.arrow}</a>
        <a class="btn btn-secondary btn-lg" href="mailto:${site.email}">${icons.mail}<span>${h.ctaContact}</span></a>
      </div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="hero-blob"></div>
      <div class="hero-shape hero-shape-ring"></div>
      <div class="hero-shape hero-shape-dot"></div>
      <div class="hero-shape hero-shape-bar"></div>
      ${tiles}
      <div class="hero-logo">${logo(120)}</div>
    </div>
  </div>
</section>

<section class="section" id="projects" aria-labelledby="projects-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="projects-title">${h.projectsTitle}</h2>
      <p>${h.projectsLead}</p>
    </div>
    <div class="project-grid">${cards}</div>
  </div>
</section>

<section class="section section-tint" aria-labelledby="principles-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="principles-title">${h.principlesTitle}</h2>
    </div>
    <ul class="principles">
      ${h.principles.map((x, i) => `<li><span class="principle-icon">${principleIcons[i]}</span><h3>${x.title}</h3><p>${x.text}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section" id="about" aria-labelledby="about-title">
  <div class="wrap about-grid">
    <div class="about-copy">
      <h2 id="about-title">${h.aboutTitle}</h2>
      ${h.about.map((p) => `<p>${p}</p>`).join('')}
    </div>
    <aside class="contact-card" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">${h.contactTitle}</h2>
      <p>${h.contactText}</p>
      <a class="contact-email" href="mailto:${site.email}">${icons.mail}<span>${site.email}</span></a>
      <a class="contact-link" href="${site.github}">${icons.github}<span>github.com/${site.github.split('/').pop()}</span></a>
      <a class="contact-link" href="${href(lang, '/support/')}">${icons.help}<span>${t.nav.support}</span></a>
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
    image: img(p.slug, lang, 'feature.jpg'),
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
<section class="project-hero" style="${projectStyle(p)}">
  <div class="wrap project-hero-grid">
    <div class="project-hero-copy">
      <a class="back-link" href="${href(lang, '/#projects')}">${icons.back}<span>${t.project.back}</span></a>
      <div class="project-title">
        <img class="app-icon app-icon-lg" src="/img/${p.slug}/icon.webp" alt="" width="96" height="96">
        <div>
          <h1>${p.name}</h1>
          <p class="kind">${d.kind} · ${site.name}</p>
        </div>
      </div>
      <p class="lead">${d.tagline}</p>
      <div class="actions">${storeButtons(lang, p)}</div>
    </div>
    <div class="project-hero-media">
      <figure class="phone"><img src="${img(p.slug, lang, 'shot-1.webp')}" alt="${esc(d.screenshots[0])}" width="540" height="960"></figure>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap narrow intro">
    ${d.intro.map((x) => `<p>${x}</p>`).join('')}
  </div>
</section>

<section class="section section-tint" aria-labelledby="features-title" style="${projectStyle(p)}">
  <div class="wrap">
    <div class="section-head"><h2 id="features-title">${t.project.features}</h2></div>
    <ul class="features">
      ${d.features.map((f) => `<li><h3>${f.title}</h3><p>${f.text}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="shots-title">
  <div class="wrap">
    <div class="section-head"><h2 id="shots-title">${t.project.screenshots}</h2></div>
  </div>
  <ul class="gallery" tabindex="0" aria-labelledby="shots-title">
    ${shots
      .map((n) => `<li><figure class="phone"><img src="${img(p.slug, lang, `shot-${n}.webp`)}" alt="${esc(d.screenshots[n - 1])}" width="540" height="960" loading="lazy" decoding="async"></figure></li>`)
      .join('')}
  </ul>
</section>

<section class="section section-tint" aria-labelledby="details-title">
  <div class="wrap details-grid">
    <div>
      <h2 id="details-title">${t.project.details}</h2>
      <dl class="facts">
        <div><dt>${t.project.developer}</dt><dd><a href="${href(lang, '/')}">${site.name}</a></dd></div>
        <div><dt>${t.project.platforms}</dt><dd>${p.platforms.map((k) => t.platforms[k]).join(', ')}</dd></div>
        <div><dt>${t.project.languages}</dt><dd>${p.languageNames.map((n) => `<span dir="auto">${n}</span>`).join(', ')}</dd></div>
        <div><dt>${t.project.price}</dt><dd>${d.facts.price}</dd></div>
        <div><dt>${t.project.category}</dt><dd>${d.facts.category}</dd></div>
        <div><dt>${t.project.privacy}</dt><dd><a href="${privacy}">${site.domain}${privacy}</a></dd></div>
      </dl>
    </div>
    <aside class="help-card">
      <h2>${t.project.helpTitle}</h2>
      <p>${t.project.helpText}</p>
      <div class="actions">
        <a class="btn btn-primary" href="${support}">${icons.help}<span>${t.project.support}</span></a>
        <a class="btn btn-secondary" href="${privacy}">${icons.shield}<span>${t.project.privacy}</span></a>
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
    section: '/privacy/',
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
    section: '/privacy/',
    body: `
<article class="doc">
  <div class="wrap narrow">
    <header class="doc-head">
      <h1>${t.privacy.heading}</h1>
      <p class="lead">${t.privacy.lead}</p>
    </header>
    <section aria-labelledby="apps-title">
      <h2 id="apps-title">${t.privacy.appsTitle}</h2>
      <ul class="link-cards">
        ${projects
          .map(
            (p) => `<li style="${projectStyle(p)}"><a href="${href(lang, `/${p.slug}/privacy/`)}">
              <img class="app-icon" src="/img/${p.slug}/icon.webp" alt="" width="48" height="48">
              <span><strong>${p.name}</strong><small>${t.project.privacy} · ${t.privacy.lastUpdated}: ${formatDate(lang, p.privacy.updated)}</small></span>
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
    <section class="contact-card contact-card-wide" aria-labelledby="email-title">
      <h2 id="email-title">${t.support.emailTitle}</h2>
      <p>${t.support.emailText}</p>
      <a class="contact-email" href="mailto:${site.email}">${icons.mail}<span>${site.email}</span></a>
    </section>
    <h2 class="faq-title">${t.support.faqTitle}</h2>
    ${projects
      .map((p) => {
        const privacyUrl = href(lang, `/${p.slug}/privacy/`);
        return `<section class="faq" id="${p.slug}" aria-labelledby="faq-${p.slug}" style="${projectStyle(p)}">
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
    <p class="code" aria-hidden="true">404</p>
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
