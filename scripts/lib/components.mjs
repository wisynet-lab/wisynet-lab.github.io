export const esc = (v = '') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const arrow = '<span aria-hidden="true">↗</span>';
export function icon(name, className = '') {
  const paths = {
    signal: '<path d="M5 15a10 10 0 0 1 14 0M2 11a15 15 0 0 1 20 0m-14 8a5 5 0 0 1 8 0"/><circle cx="12" cy="22" r="1"/>',
    network: '<path d="m5 5 14 2-7 13L5 5Zm0 0 7 8 7-6m-7 6v7"/><circle cx="5" cy="5" r="3"/><circle cx="19" cy="7" r="3"/><circle cx="12" cy="20" r="3"/>',
    radar: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><path d="m12 12 7-7M12 2v2M2 12h2m8 8v2m8-10h2"/><circle cx="12" cy="12" r="1"/>',
    wave: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M5 12h3l2-5 4 10 2-5h3"/>',
    book: '<path d="M12 21V5C8 2 4 3 2 4v15c4-2 7-1 10 2Zm0 0c3-3 6-4 10-2V4c-2-1-6-2-10 1"/>',
    search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7L22 6"/>',
    location: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    globe: '<circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="5" ry="10"/><path d="M2 12h20"/>'
  };
  return `<svg class="icon ${esc(className)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.signal}</svg>`;
}
export function pageIntro(section, title, intro) {
  return `<div class="page-banner"><header class="page-intro container"><p class="eyebrow"><span class="tiny-line"></span>${esc(section)}</p><h1>${esc(title)}</h1><p class="lead">${esc(intro)}</p></header></div>`;
}
export const badge = text => `<span class="badge">${esc(text)}</span>`;
export function memberCard(m, featured = false) {
  return `<article class="member-card ${featured ? 'featured-member' : ''}" id="${esc(m.id)}">
    <div class="member-photo-wrap"><img class="member-photo" src="${esc(m.image)}" alt="${esc(m.imageAlt)}" width="240" height="240" loading="lazy">${m.placeholder ? '<span class="photo-label">PHOTO TO COME</span>' : ''}</div>
    <div class="member-content"><p class="eyebrow">${esc(m.role)}</p><h${featured ? '2' : '3'}>${esc(m.name)}</h${featured ? '2' : '3'}>${m.title ? `<p class="member-title">${esc(m.title)}</p>` : ''}${m.placeholder ? badge('Sample profile') : ''}<p>${esc(m.bio)}</p><div class="tags">${m.topics.map(t => `<span>${esc(t)}</span>`).join('')}</div>
    <div class="member-links">${m.email ? `<a href="mailto:${esc(m.email)}">${icon('mail')} Email</a>` : ''}${m.profile ? `<a href="${esc(m.profile)}">DEIB profile ${arrow}</a>` : ''}${m.website ? `<a href="${esc(m.website)}">Personal website ${arrow}</a>` : ''}</div>${m.credit ? `<p class="attribution">${esc(m.credit)}</p>` : ''}</div></article>`;
}
export function newsCard(n) {
  const date = n.date ? new Date(`${n.date}T12:00:00Z`).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'}) : 'Coming soon';
  return `<article class="news-card" data-filter-item data-type="${esc(n.category)}"><div class="news-meta"><span>${esc(n.category)}</span>${n.date ? `<time datetime="${esc(n.date)}">${date}</time>` : `<span>${date}</span>`}</div>${n.placeholder ? badge('Sample story') : ''}<h3>${esc(n.title)}</h3><p>${esc(n.text)}</p>${n.url ? `<a class="text-link" href="${esc(n.url)}">${esc(n.linkLabel)} ${arrow}</a>` : '<span class="coming-soon">More from WiSyNet soon <span aria-hidden="true">→</span></span>'}${n.note ? `<small>${esc(n.note)}</small>` : ''}</article>`;
}
export function contactBand(site) {
  return `<section class="contact-band container"><div><p class="eyebrow">LET'S CONNECT</p><h2>Good ideas start<br>with a conversation.</h2></div><div><p>Interested in wireless research, collaboration<br class="desktop-break"> or a visit to the lab? Get in touch.</p><a class="button primary" href="mailto:${esc(site.email)}">Contact WiSyNet <span aria-hidden="true">↗</span></a></div></section>`;
}
export function getBookingLink(site, instrument = {}) {
  const candidate = instrument.bookingUrl || (site.booking.mode === 'external' ? site.booking.url : '');
  if (!candidate) return '';
  const url = new URL(candidate);
  if (url.protocol !== 'https:') throw new Error('Booking links must use HTTPS.');
  return url.href;
}
