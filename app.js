// Renders the page from window.CLINIC (config.js). No build step, no backend.
(() => {
  const c = window.CLINIC;
  // ?theme= lets the seller demo other looks to a clinic without editing config.js
  const theme = new URLSearchParams(location.search).get('theme') || c.theme || 'blue';
  document.documentElement.dataset.theme = ['blue', 'dark', 'warm'].includes(theme) ? theme : 'blue';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
  const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const money = (n) => (n ? `${n.toLocaleString('ru-RU')} ₸` : 'Бесплатно');

  // Glass-blue tooth, used until the clinic supplies its own 3D render (config.heroImage).
  const tooth = (id, flat) => `<svg viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${flat ? '#fff' : '#9fc0ff'}"/><stop offset=".45" stop-color="${flat ? '#fff' : '#2f63ff'}"/><stop offset="1" stop-color="${flat ? '#dfe7ff' : '#0b2a8f'}"/></linearGradient>
      <radialGradient id="h${id}" cx=".32" cy=".22" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    </defs>
    <path fill="url(#g${id})" d="M100 28c-18-14-44-20-64-8C12 34 8 70 18 104c8 26 16 40 20 70 4 30 10 52 26 52 18 0 18-30 24-54 4-14 8-20 12-20s8 6 12 20c6 24 6 54 24 54 16 0 22-22 26-52 4-30 12-44 20-70 10-34 6-70-18-84-20-12-46-6-64 8z"/>
    ${flat ? '' : '<path fill="url(#h' + id + ')" d="M100 28c-18-14-44-20-64-8C12 34 8 70 18 104c8 26 16 40 20 70 4 30 10 52 26 52 18 0 18-30 24-54 4-14 8-20 12-20s8 6 12 20c6 24 6 54 24 54 16 0 22-22 26-52 4-30 12-44 20-70 10-34 6-70-18-84-20-12-46-6-64 8z"/><path d="M60 44c-14 4-24 18-24 36" stroke="#fff" stroke-opacity=".8" stroke-width="6" stroke-linecap="round" fill="none"/>'}
  </svg>`;

  document.title = `${c.name} — ${c.tagline.toLowerCase()} в г. ${c.city}`;
  $('meta[name=description]').content = `${c.name}: ${c.lead}`;
  $$('[data-name]').forEach((el) => (el.textContent = c.name));
  $('[data-tooth]').innerHTML = tooth('l', true);
  $('[data-eyebrow]').textContent = c.branches[0] ? `${c.city}, ${c.branches[0].address}` : `${c.tagline} · ${c.city}`;
  $('[data-title1]').textContent = c.title[0];
  $('[data-title2]').textContent = c.title[1];
  $('[data-lead]').textContent = c.lead;
  $('.hero-art').classList.toggle('has-ring', !!(c.heroImage && c.heroRing));
  $('[data-hero-art]').innerHTML =c.heroImage ? `<img src="${esc(c.heroImage)}" alt="" />` : tooth('h');
  $$('[data-chip]').forEach((el) => (el.innerHTML = c.chips[el.dataset.chip] ? `<span>${esc(c.chips[el.dataset.chip])}</span>` : ''));
  if (c.bandImage) $('[data-band]').style.backgroundImage = `url("${encodeURI(c.bandImage)}")`;

  $('[data-stats]').innerHTML = c.stats.map(([n, t]) => `<li><b>${esc(n)}</b><span>${esc(t)}</span></li>`).join('');
  $('[data-adv]').innerHTML = c.advantages.map(([h, t]) => `<li><h3>${esc(h)}</h3><p>${esc(t)}</p></li>`).join('');
  $('[data-services]').innerHTML = c.services
    .map((s) => `<li${s.image ? ' class="has-img"' : ''}>${s.image ? `<img src="${esc(s.image)}" alt="" loading="lazy" />` : `<i class="ph ph-${esc(s.icon)}" aria-hidden="true"></i>`}<h3>${esc(s.name)}</h3><p>${esc(s.text)}</p><span class="from">от ${money(s.from)}</span></li>`)
    .join('');

  if (c.about) {
    const a = c.about;
    $('#about').hidden = false;
    $('[data-about-text]').innerHTML = a.text.map((p) => `<p>${esc(p)}</p>`).join('');
    $('[data-about-points]').innerHTML = a.points.map((p) => `<li><i class="ph ph-check-circle" aria-hidden="true"></i><span>${esc(p)}</span></li>`).join('');
    if (a.quote) Object.assign($('[data-about-quote]'), { hidden: false, innerHTML: `<blockquote>«${esc(a.quote.text)}»</blockquote><figcaption><b>${esc(a.quote.name)}</b>${esc(a.quote.role)}</figcaption>` });
  }

  if (c.doctors.length) {
    $('#doctors').hidden = false;
    $('[data-doctors]').innerHTML = c.doctors
      .map((d) => {
        const initials = d.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('');
        const photo = d.photo ? `<img src="${esc(d.photo)}" alt="" loading="lazy" />` : `<span class="doc-ph" aria-hidden="true">${esc(initials)}</span>`;
        return `<li>${photo}<div class="doc-foot"><a class="doc-book" href="#booking">Записаться</a><div class="doc-info"><b>${esc(d.name)}</b><span>${esc(d.role)}${d.exp ? ` · ${esc(d.exp)}` : ''}</span></div></div></li>`;
      })
      .join('');
  }

  $('[data-prices]').innerHTML = Object.entries(c.prices)
    .map(([cat, rows], i) => `<details${i ? '' : ' open'}><summary>${esc(cat)}<i class="ph ph-plus" aria-hidden="true"></i></summary><ul>${rows.map(([n, p]) => `<li><span>${esc(n)}</span><b>${money(p)}</b></li>`).join('')}</ul></details>`)
    .join('');

  if (c.reviews.length) {
    $('#reviews').hidden = false;
    $('[data-reviews]').innerHTML = c.reviews.map(([n, t]) => `<li><p>«${esc(t)}»</p><b>${esc(n)}</b></li>`).join('');
  }

  $('[data-branches]').innerHTML = c.branches
    .map((b) => `<li><b>${esc(b.address)}</b><a href="tel:${esc(b.phone.replace(/[^\d+]/g, ''))}">${esc(b.phone)}</a><span>${esc(b.hours)}</span>${b.map ? `<a href="${esc(b.map)}" target="_blank" rel="noopener">Открыть на карте</a>` : ''}</li>`)
    .join('');

  $('[data-branch-select]').innerHTML = c.branches.map((b) => `<option>${esc(b.address)}</option>`).join('');
  $('[data-branch-field]').hidden = c.branches.length < 2;

  $('[data-copy]').textContent = `© ${new Date().getFullYear()} ${c.name}`;
  if (c.instagram) Object.assign($('[data-insta]'), { href: c.instagram, hidden: false });

  // Carousel: native scroll-snap track + dots/arrows, one dot per reachable scroll position.
  // "is-active" card follows hover/tap/focus and the scroll position (touch has no hover).
  const carousel = (root) => {
    const track = root.querySelector('.track');
    const dots = root.querySelector('.dots');
    const [prev, next] = root.querySelectorAll('.arrow');
    const cards = track.children;
    let cur = 0;
    const step = () => (cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth);
    const max = () => track.scrollWidth - track.clientWidth;
    const activate = (li) => li && [...cards].forEach((x) => x.classList.toggle('is-active', x === li));
    const go = (i) => track.scrollTo({ left: i * step(), behavior: calm() ? 'auto' : 'smooth' });
    const sync = () => {
      const n = max() > 2 ? Math.ceil(max() / step() - 0.05) + 1 : 1;
      if (dots.children.length !== n) dots.innerHTML = Array.from({ length: n }, (_, j) => `<button type="button" aria-label="Позиция ${j + 1} из ${n}"></button>`).join('');
      const i = track.scrollLeft >= max() - 2 ? n - 1 : Math.round(track.scrollLeft / step());
      root.querySelector('.car-ctrl').hidden = n < 2;
      prev.disabled = i === 0;
      next.disabled = i === n - 1;
      [...dots.children].forEach((d, j) => d.setAttribute('aria-current', j === i));
      if (i !== cur) activate(cards[i]);
      cur = i;
    };
    activate(cards[0]);
    for (const ev of ['pointerover', 'focusin']) track.addEventListener(ev, (e) => activate(e.target.closest('li')));
    track.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync);
    prev.addEventListener('click', () => go(cur - 1));
    next.addEventListener('click', () => go(cur + 1));
    dots.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (b) go([...dots.children].indexOf(b));
    });
    sync();
  };
  $$('[data-carousel]').forEach(carousel);

  // Booking popup: every "#booking" link opens it (delegated, so rendered links work too); closing plays the slide-out before close().
  const modal = $('[data-modal]');
  const open = (e) => {
    e.preventDefault();
    modal.classList.remove('closing');
    modal.showModal();
  };
  const close = () => {
    if (!modal.open || modal.classList.contains('closing')) return;
    if (calm()) return modal.close();
    modal.classList.add('closing');
    modal.addEventListener('animationend', () => { modal.classList.remove('closing'); modal.close(); }, { once: true });
  };
  document.addEventListener('click', (e) => e.target.closest('a[href="#booking"]') && open(e));
  $('[data-close]').addEventListener('click', close);
  modal.addEventListener('cancel', (e) => { e.preventDefault(); close(); }); // Esc
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); }); // backdrop

  // Booking request goes to the clinic's WhatsApp; nothing is stored or sent anywhere else.
  $('[data-form]').addEventListener('submit', (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    const ok = d.name.trim() && d.phone.replace(/\D/g, '').length >= 10;
    $('[data-error]').hidden = !!ok;
    if (!ok) return;
    const lines = [`Здравствуйте! Хочу записаться на консультацию в ${c.name}.`, `Имя: ${d.name.trim()}`, `Телефон: ${d.phone.trim()}`];
    if (c.branches.length > 1) lines.push(`Филиал: ${d.branch}`);
    window.open(`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
    close();
  });
})();
