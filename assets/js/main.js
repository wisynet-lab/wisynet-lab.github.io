/* Progressive enhancements; all page content is generated as plain HTML. */
document.documentElement.classList.add('js');

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (menu && nav) {
  menu.hidden = false;
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
}

document.querySelectorAll('[data-carousel]').forEach(gallery => {
  const cards = [...gallery.querySelectorAll('[data-slide]')];
  if (!cards.length) return;
  const stage = gallery.querySelector('.postcard-stage');
  const dots = [...gallery.querySelectorAll('[data-gallery-go]')];
  const count = gallery.querySelector('.gallery-count');
  const selection = gallery.querySelector('.gallery-selection');
  const play = gallery.querySelector('[data-gallery-play]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let timer;
  let playing = false;
  let start = null;
  let swiped = false;
  gallery.classList.add('is-enhanced');
  gallery.querySelector('.gallery-controls').hidden = cards.length < 2;

  function render() {
    const width = stage.clientWidth;
    // Upright planes on a depth track. No photo is rotated or tilted.
    const spread = width * (width < 650 ? .30 : .26);
    cards.forEach((card, i) => {
      let offset = (i - current + cards.length) % cards.length;
      if (offset > cards.length / 2) offset -= cards.length;
      const distance = Math.abs(offset);
      const active = offset === 0;
      const visible = distance <= 1;
      card.style.setProperty('--x', `${offset * spread}px`);
      card.style.setProperty('--y', active ? '0px' : '16px');
      card.style.setProperty('--z', active ? '0px' : `${-distance * 140}px`);
      card.style.setProperty('--scale', active ? '1' : '.84');
      card.style.setProperty('--stack', active ? '10' : String(5 - distance));
      card.style.setProperty('--opacity', visible ? '1' : '0');
      card.style.pointerEvents = visible ? '' : 'none';
      card.setAttribute('aria-pressed', String(active));
      card.setAttribute('aria-hidden', String(!visible));
      card.tabIndex = visible ? 0 : -1;
    });
    dots.forEach((dot,i) => dot.setAttribute('aria-pressed',String(i===current)));
    count.textContent = `${String(current+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
    for (const part of ['caption', 'credit', 'label']) {
      const target = gallery.querySelector(`[data-gallery-${part}]`);
      const source = cards[current].querySelector(`.postcard-${part === 'label' ? 'meta' : part}`);
      if (target) target.textContent = source?.textContent || '';
    }
  }
  function stop() {
    clearInterval(timer);
    playing = false;
    play.textContent = '▶';
    play.setAttribute('aria-label','Play slideshow');
    play.setAttribute('aria-pressed','false');
    selection?.setAttribute('aria-live','polite');
  }
  function go(index, user = true) {
    if (user) stop();
    current = (index + cards.length) % cards.length;
    render();
  }
  gallery.querySelector('[data-gallery-prev]').addEventListener('click', () => go(current-1));
  gallery.querySelector('[data-gallery-next]').addEventListener('click', () => go(current+1));
  dots.forEach((dot,i) => dot.addEventListener('click', () => go(i)));
  cards.forEach((card,i) => card.addEventListener('click', event => {
    if (swiped) { event.preventDefault(); return; }
    go(i);
  }));
  play.addEventListener('click', () => {
    if (playing) return stop();
    playing = true;
    play.textContent = 'Ⅱ';
    play.setAttribute('aria-label','Pause slideshow');
    play.setAttribute('aria-pressed','true');
    selection?.setAttribute('aria-live','off');
    timer = setInterval(() => go(current+1, false), 5500);
  });
  stage.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? cards.length-1 : current + (event.key === 'ArrowLeft' ? -1 : 1);
    go(next);
    stage.focus({preventScroll:true});
  });
  stage.addEventListener('pointerdown', event => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    swiped = false;
    start = {x:event.clientX, y:event.clientY};
  });
  stage.addEventListener('pointerup', event => {
    if (!start) return;
    const dx = event.clientX-start.x, dy = event.clientY-start.y;
    start = null;
    if (Math.abs(dx)>35 && Math.abs(dx)>Math.abs(dy)*1.3) {
      swiped = true;
      go(current+(dx<0 ? 1 : -1));
      setTimeout(() => { swiped=false; }, 100);
    }
  });
  stage.addEventListener('pointercancel', () => { start=null; });
  gallery.addEventListener('focusin', event => { if (event.target !== play) stop(); });
  stage.addEventListener('pointerenter', stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  reducedMotion.addEventListener('change', stop);
  if ('ResizeObserver' in window) new ResizeObserver(render).observe(stage);
  else window.addEventListener('resize',render);
  render();
});

document.querySelectorAll('[data-filter-list]').forEach(list => {
  const items = [...list.querySelectorAll('[data-filter-item]')];
  const search = list.querySelector('[data-search]');
  const year = list.querySelector('[data-year]');
  const chips = [...list.querySelectorAll('[data-filter]')];
  let type = 'All';
  list.querySelector('.filter-bar').hidden = false;
  function update() {
    const term = (search?.value || '').trim().toLocaleLowerCase();
    let total = 0;
    items.forEach(item => {
      const matches = (type==='All' || item.dataset.type===type) && (!year || year.value==='all' || item.dataset.year===year.value) && item.textContent.toLocaleLowerCase().includes(term);
      item.hidden = !matches;
      if (matches) total++;
    });
    chips.forEach(chip => chip.setAttribute('aria-pressed',String(chip.dataset.filter===type)));
    list.querySelector('[data-result-count]').textContent = `${total} ${total===1 ? 'entry' : 'entries'}`;
    list.querySelector('[data-empty]').hidden = total > 0;
  }
  chips.forEach(chip => chip.addEventListener('click', () => { type=chip.dataset.filter; update(); }));
  search?.addEventListener('input',update);
  year?.addEventListener('change',update);
  list.querySelector('[data-reset]')?.addEventListener('click', () => {
    type='All';
    if(search) search.value='';
    if(year) year.value='all';
    update();
    (search || chips[0])?.focus();
  });
});

// One-time entrance animations; no framework, render loop or scroll listener.
// Content stays visible without this API or when reduced motion is preferred.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const targets = document.querySelectorAll('.research-card, .news-card, .member-card, .course-card, .instrument-card, .about-section, .contact-band');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .08});
  targets.forEach(target => {
    target.classList.add('reveal-ready');
    observer.observe(target);
  });
  motionPreference.addEventListener('change', event => {
    if (event.matches) {
      targets.forEach(target => target.classList.add('is-revealed'));
      observer.disconnect();
    }
  });
}
