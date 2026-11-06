import {esc,pageIntro,badge,icon,getBookingLink} from '../lib/components.mjs';
export default ({site,instruments}) => `${pageIntro('INSIDE THE LAB','Made for experimentation.',instruments.intro)}

<section class="container section-content" data-filter-list aria-label="Instruments">




<div class="filter-bar" hidden><label class="search-field">${icon('search')}<span class="sr-only">Search instruments</span><input type="search" data-search placeholder="Find an instrument or capability…"></label><div class="filter-chips" aria-label="Instrument category">${['All',...new Set(instruments.items.map(item=>item.category))].map((t,i)=>`<button data-filter="${esc(t)}" aria-pressed="${i===0}">${esc(t)}</button>`).join('')}</div></div><p class="result-count" data-result-count aria-live="polite">${instruments.items.length} entries</p><div class="instrument-grid">${instruments.items.map(i=>{const booking=getBookingLink(site,i);return `<article class="instrument-card" data-filter-item data-type="${esc(i.category)}">

<div class="instrument-visual">
  ${icon(i.icon)}

  ${i.image
    ? `<img
         class="instrument-thumbnail"
         src="${esc(i.image)}"
         alt="${esc(i.imageAlt || i.name)}"
         width="280"
         height="110"
         loading="lazy"
         decoding="async"
       >`
    : ''
  }

  <span>${esc(i.category)}</span>
  <span class="instrument-grid-pattern" aria-hidden="true"></span>
</div>

<div class="instrument-body"><p class="eyebrow">${esc(i.spec)}</p><h2>${esc(i.name)}</h2><p>${esc(i.description)}</p><p class="instrument-details">${esc(i.details)}</p>${booking?`<a class="button secondary" href="${esc(booking)}">${esc(site.booking.label)} <span aria-hidden="true">↗</span></a>`:'<span class="booking-pending">Booking information coming soon</span>'}</div></article>`}).join('')}</div><div class="empty-state" data-empty hidden><h2>No matching instruments</h2><p>Try another term or category.</p><button class="button secondary" data-reset>Reset filters</button></div><div class="access-note"><div><p class="eyebrow">LAB ACCESS</p><h2>Planning an experiment?</h2><p>Contact the principal investigator to discuss your requirements and the appropriate lab contact.</p></div><a class="button primary" href="mailto:${esc(site.email)}?subject=WiSyNet%20lab%20access%20enquiry">Enquire about lab access <span aria-hidden="true">↗</span></a></div><p class="source-note">Capability descriptions: <a href="${esc(site.links.directory)}">RESTART Mission 2 laboratory directory</a>. These listings do not represent live availability.</p></section>`;
