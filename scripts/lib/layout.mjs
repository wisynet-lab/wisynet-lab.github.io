import {esc, icon, arrow} from './components.mjs';

export function layout({site, page, body}) {
  const title = page.id === 'home' ? `${site.name} — ${site.fullName}` : `${page.label} · ${site.name}`;
  const canonical = site.url ? new URL(page.file, site.url.replace(/\/?$/, '/')).href : '';
  const nav = site.navigation.map(n => `<a href="${esc(n.file)}"${n.id === page.id ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title><meta name="description" content="${esc(site.description)}">
  <meta name="theme-color" content="#102c53"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(site.description)}"><meta property="og:type" content="website">
  ${canonical ? `<link rel="canonical" href="${esc(canonical)}"><meta property="og:url" content="${esc(canonical)}">` : ''}
  <link rel="icon" href="assets/images/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="assets/css/styles.css"><script src="assets/js/main.js" defer></script>
</head>
<body data-page="${esc(page.id)}">
<a class="skip-link" href="#main">Skip to content</a>
<div class="institution-bar"><div class="container"><span>POLITECNICO DI MILANO <span class="bar-separator">/</span> DEIB</span><a href="${esc(site.links.restart)}">A RESTART research laboratory ${arrow}</a></div></div>
<header class="site-header"><div class="container header-inner"><a class="brand" href="index.html" aria-label="WiSyNet home"><img src="assets/images/favicon.svg" width="42" height="42" alt=""><span>WiSy<span class="brand-net">Net</span><small>WIRELESS SYSTEM NETWORKS</small></span></a><button class="menu-toggle" aria-expanded="false" aria-controls="main-nav" hidden><span>Menu</span><span class="menu-lines" aria-hidden="true"></span></button><nav id="main-nav" aria-label="Main navigation">${nav}</nav></div></header>
<main id="main">${body}</main>
<footer class="site-footer"><div class="container footer-grid"><div class="footer-about"><a class="footer-brand" href="index.html">WiSyNet<span class="brand-dot">.</span></a><p>Wireless System Networks<br>A RESTART-funded research laboratory.</p><a class="department-link" href="${esc(site.links.deib)}">Department of Electronics,<br>Information and Bioengineering ${arrow}</a><div class="institution-logos"><a href="${esc(site.links.polimi)}"><img src="assets/images/polimi-logo.png" width="186" height="60" alt="Politecnico di Milano" loading="lazy"></a><a href="${esc(site.links.deib)}"><img src="assets/images/deib-logo.png" width="216" height="24" alt="Department of Electronics, Information and Bioengineering" loading="lazy"></a></div></div><div><h2>Find us</h2><address>DEIB · Politecnico di Milano<br>Via Ponzio 34/5<br>20133 Milano, Italy</address><a class="footer-link" href="${esc(site.links.directions)}">Directions to DEIB ${arrow}</a><p class="footer-phone">DEIB reception<br><a href="tel:+390223993400">+39 02 2399 3400</a></p></div><div><h2>Explore</h2><nav class="footer-nav" aria-label="Footer navigation">${nav}</nav></div><div><h2>Get in touch</h2><a class="email-link" href="mailto:${esc(site.email)}">Umberto Spagnolini ${arrow}</a><p>Principal investigator</p><a class="footer-link" href="${esc(site.links.restart)}">RESTART Foundation ${arrow}</a><a class="footer-link" href="sources.html">Sources &amp; image credits ${arrow}</a></div></div>
<div class="container footer-bottom"><p>© ${site.year} WiSyNet · Politecnico di Milano</p><div><a href="${esc(site.links.accessibility)}">DEIB accessibility</a><a href="${esc(site.links.privacy)}">DEIB privacy policy</a><a href="${esc(site.links.cookies)}">DEIB cookie policy</a><a href="sources.html#site-information">About this site</a></div></div><div class="container legal-line">Politecnico di Milano registered office: Piazza Leonardo da Vinci 32, 20133 Milano · VAT 04376620151 · Tax code 80057930150</div></footer>
</body></html>`;
}
