// State Management
const LANGS = ['pt', 'en', 'es'];
const HTML_LANG = { pt: 'pt-BR', en: 'en', es: 'es' };
let currentLang = getInitialLang();
let currentFilter = 'all';
let lastFocused = null;
let hasRendered = false;

// Brand logos come from Simple Icons (CC0), pinned so they never change underneath us.
// Entries without a slug use a generic line icon (no neutral SQL logo; Pentaho isn't in the set).
const SIMPLE_ICONS = 'https://cdn.jsdelivr.net/npm/simple-icons@9.21.0/icons/';
const GENERIC_ICONS = {
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
  pipeline: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M6 8l5 8M18 8l-5 8"/>'
};
const STACK = [
  { name: 'Python', slug: 'python' },
  { name: 'SQL', generic: 'database' },
  { name: 'SAP HANA', slug: 'sap' },
  { name: 'Apache Airflow', slug: 'apacheairflow' },
  { name: 'dbt', slug: 'dbt' },
  { name: 'Pentaho', generic: 'pipeline' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Linux', slug: 'linux' },
  { name: 'Power BI', slug: 'powerbi' },
  { name: 'SAP Analytics Cloud', slug: 'sap' },
  { name: 'AWS', slug: 'amazonaws' },
  { name: 'Databricks', slug: 'databricks' },
  { name: 'Apache Spark', slug: 'apachespark' },
  { name: 'Terraform', slug: 'terraform' },
  { name: 'FastAPI', slug: 'fastapi' },
  { name: 'PostgreSQL', slug: 'postgresql' }
];

// Thin-stroke line icons for the four highlight cards (same order as data.js)
const FEATURE_ICONS = [
  '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
  '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M6 8l5 8M18 8l-5 8"/>',
  '<path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/>',
  '<path d="M17.5 19H7a5 5 0 1 1 1.1-9.9A6 6 0 0 1 19.5 11a4 4 0 0 1-2 8z"/>'
];

const ICON_DOC = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>';
const ICON_GITHUB = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  initMobileMenu();
  renderBand();
  renderApp();
  initModalEvents();
  initEmailCopy();
  initActiveNav();
  initHeroMap();
});

function getInitialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (LANGS.includes(saved)) return saved;
  } catch (e) { /* storage unavailable */ }
  const nav = (navigator.language || 'pt').slice(0, 2).toLowerCase();
  return LANGS.includes(nav) ? nav : 'pt';
}

// Language switcher (PT / EN / ES)
function initLanguageToggle() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (!lang || lang === currentLang) return;
      currentLang = lang;
      try { localStorage.setItem('lang', lang); } catch (e) { /* ignore */ }
      renderApp();
    });
  });
}

// Mobile navigation
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setOpen(false);
  });
}

// Blue band: infinite stack marquee (content duplicated for a seamless loop)
function renderBand() {
  const track = document.getElementById('band-track');
  if (!track) return;
  const logo = (s) => s.slug
    ? `<i class="band-logo" style="--logo: url('${SIMPLE_ICONS}${s.slug}.svg')"></i>`
    : `<svg class="band-logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${GENERIC_ICONS[s.generic]}</svg>`;
  const items = STACK.map(s => `<span class="band-item">${logo(s)}${s.name}</span>`).join('');
  track.innerHTML = items + items.replace(/<span class="band-item">/g, '<span class="band-item" aria-hidden="true">');
}

// Render Entire UI
function renderApp() {
  const t = portfolioData[currentLang];
  const ui = t.ui;
  const projects = portfolioData.projects;

  document.documentElement.lang = HTML_LANG[currentLang];

  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.getAttribute('data-lang') === currentLang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  // Header Nav
  setText('nav-about', t.header.about);
  setText('nav-projects', t.header.projects);
  setText('nav-contact', t.header.contact);
  setText('header-contact-btn', t.header.getInTouch);
  setText('menu-toggle-label', ui.menu);

  // Hero Section
  setText('hero-available', ui.available);
  setText('hero-badge', t.hero.badge);
  setText('hero-title-line1', t.hero.titleLine1);
  setText('hero-title-accent', t.hero.titleGradient);
  setText('hero-desc', t.hero.description);
  setText('hero-projects-btn', t.hero.viewProjects);
  setText('hero-contact-label', t.hero.getInTouch);
  setText('stat-years', ui.statYears);
  setText('stat-projects', ui.statProjects);
  setText('stat-projects-value', String(projects.length).padStart(2, '0'));
  setText('stat-edu-value', ui.statEduValue);
  setText('stat-edu', ui.statEdu);

  // About Section
  setText('about-label', ui.aboutLabel);
  setText('about-title', t.about.title);
  setText('about-subtitle', t.about.subtitle);

  document.getElementById('about-paragraphs').innerHTML = t.about.paragraphs
    .map(p => `<p class="about-paragraph">${p}</p>`).join('');

  document.getElementById('about-spec').innerHTML = ui.spec
    .map(([k, v]) => `<div class="spec-row"><dt>${k}</dt><dd>${v}</dd></div>`).join('');

  document.getElementById('about-highlights').innerHTML = t.about.highlights.map((h, i) => `
    <article class="feature-card reveal">
      <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${FEATURE_ICONS[i] || ''}</svg>
      <h3 class="feature-title">${h.title}</h3>
      <p class="feature-desc">${h.description}</p>
    </article>
  `).join('');

  // Projects Section
  setText('projects-label', ui.projectsLabel);
  setText('projects-title', t.projects.title);
  setText('projects-subtitle', t.projects.subtitle);
  renderFilters();

  document.getElementById('projects-grid').innerHTML = projects.map((proj, i) => {
    const title = proj.title[currentLang] || proj.title.pt;
    const desc = proj.description[currentLang] || proj.description.pt;

    return `
      <article class="project-card reveal" data-category="${proj.category}">
        <div class="project-card-image-wrap">
          <img src="${proj.image}" alt="${title}" class="project-card-image" loading="lazy" />
          <span class="project-card-index">P/${String(i + 1).padStart(2, '0')} · ${ui.filters[proj.category]}</span>
        </div>
        <div class="project-card-content">
          <h3 class="project-card-title">${title}</h3>
          <p class="project-card-desc">${desc}</p>
          <div class="tag-list">
            ${proj.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <div class="project-card-actions">
            <button type="button" class="btn btn-primary btn-open-modal" data-id="${proj.id}">
              ${ICON_DOC}<span>${t.projects.viewDetails}</span>
            </button>
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
              ${ICON_GITHUB}<span>GitHub</span>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  document.querySelectorAll('.btn-open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => openModal(e.currentTarget.getAttribute('data-id')));
  });
  applyFilter();

  // Contact Section
  setText('contact-label', ui.contactLabel);
  setText('contact-title', t.contact.title);
  setText('contact-subtitle', t.contact.subtitle);
  setText('contact-email-btn', t.contact.sendEmail);
  const copyBtn = document.getElementById('email-copy');
  if (copyBtn && !copyBtn.classList.contains('copied')) setText('email-copy-hint', ui.copyEmail);

  // Footer
  setText('footer-copyright', `© ${new Date().getFullYear()} ${t.footer.name}. ${ui.rights}`);
  setText('footer-top', ui.backToTop);

  initReveal(hasRendered);
  hasRendered = true;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Project filters
function renderFilters() {
  const bar = document.getElementById('filter-bar');
  if (!bar) return;
  const labels = portfolioData[currentLang].ui.filters;
  const projects = portfolioData.projects;

  bar.innerHTML = Object.keys(labels).map(key => {
    const count = key === 'all' ? projects.length : projects.filter(p => p.category === key).length;
    const active = key === currentFilter;
    return `<button type="button" class="filter-pill${active ? ' active' : ''}" data-filter="${key}" aria-pressed="${active}">
      ${labels[key]} <span class="filter-count">${String(count).padStart(2, '0')}</span>
    </button>`;
  }).join('');

  bar.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.getAttribute('data-filter');
      bar.querySelectorAll('.filter-pill').forEach(b => {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      applyFilter();
    });
  });
}

function applyFilter() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.hidden = currentFilter !== 'all' && card.getAttribute('data-category') !== currentFilter;
  });
}

// Scroll reveal — skipped when re-rendering for a language change
let revealObserver = null;
function initReveal(immediate) {
  const staticTargets = document.querySelectorAll('.section-header, .about-split, .contact-inner');
  staticTargets.forEach(el => el.classList.add('reveal'));
  const targets = document.querySelectorAll('.reveal:not(.in-view)');

  if (immediate || prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in-view'));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }
  targets.forEach(el => revealObserver.observe(el));
}

// Highlight the nav link of the section currently in view
function initActiveNav() {
  if (!('IntersectionObserver' in window)) return;
  const links = document.querySelectorAll('.nav-link[data-section]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(l => l.classList.toggle('active', l.getAttribute('data-section') === entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['about', 'projects', 'contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

// Copy email to clipboard
function initEmailCopy() {
  const btn = document.getElementById('email-copy');
  if (!btn) return;
  let timer = null;
  btn.addEventListener('click', async () => {
    const email = btn.getAttribute('data-email');
    try {
      await navigator.clipboard.writeText(email);
    } catch (e) {
      window.location.href = `mailto:${email}`;
      return;
    }
    const ui = portfolioData[currentLang].ui;
    btn.classList.add('copied');
    setText('email-copy-hint', `✓ ${ui.copied}`);
    clearTimeout(timer);
    timer = setTimeout(() => {
      btn.classList.remove('copied');
      setText('email-copy-hint', portfolioData[currentLang].ui.copyEmail);
    }, 2000);
  });
}

// Modal Dialog Controls
function initModalEvents() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!modalOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') {
      closeModal();
      return;
    }
    // Keep keyboard focus inside the dialog
    if (e.key === 'Tab') {
      const focusables = modalOverlay.querySelectorAll('a[href], button:not([disabled])');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

function openModal(projectId) {
  const index = portfolioData.projects.findIndex(p => p.id === projectId);
  const proj = portfolioData.projects[index];
  if (!proj) return;

  const ui = portfolioData[currentLang].ui;
  const title = proj.title[currentLang] || proj.title.pt;
  const s = proj.summary[currentLang] || proj.summary.pt;
  const modalOverlay = document.getElementById('project-modal');

  setText('modal-index', `P/${String(index + 1).padStart(2, '0')} · ${ui.filters[proj.category]}`);
  setText('modal-title-text', title);

  const item = (num, heading, body) => `
    <div class="summary-item">
      <div class="summary-item-head">
        <span class="summary-item-num">${num}</span>
        <h4>${heading}</h4>
      </div>
      ${body}
    </div>`;

  document.getElementById('modal-summary-content').innerHTML = `
    <div class="modal-two-columns">
      <div class="modal-col-preview">
        <div class="modal-image-frame">
          <img src="${proj.image}" alt="${title}" class="modal-preview-img" />
        </div>
        <div class="tag-list">
          ${proj.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          ${ICON_GITHUB}<span>${ui.githubBtn}</span>
        </a>
      </div>

      <div class="summary-list">
        ${item('01', s.challenge.title, `<p>${s.challenge.description}</p>`)}
        ${item('02', s.solution.title, `<p>${s.solution.description}</p>`)}
        ${item('03', s.highlights.title, `<ul>${s.highlights.items.map(li => `<li>${li}</li>`).join('')}</ul>`)}
        ${item('04', s.impact.title, `<p>${s.impact.description}</p>`)}
      </div>
    </div>
  `;

  lastFocused = document.activeElement;
  modalOverlay.classList.add('active');
  modalOverlay.setAttribute('aria-hidden', 'false');
  modalOverlay.querySelector('.modal-body').scrollTop = 0;
  document.body.classList.add('is-locked');
  document.getElementById('modal-close-btn').focus();
}

function closeModal() {
  const modalOverlay = document.getElementById('project-modal');
  if (!modalOverlay.classList.contains('active')) return;
  modalOverlay.classList.remove('active');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-locked');
  if (lastFocused) lastFocused.focus();
}

/* ==========================================================================
   Hero ASCII world map
   Coarse continent outlines (lon, lat) rasterised into a character grid.
   Land cells are dense glyphs in electric blue; ocean is a sparse starfield.
   A lime cursor marks Brazil.
   ========================================================================== */
const LAND_POLYGONS = [
  // North America
  [[-168,66],[-162,70],[-140,70],[-125,72],[-95,72],[-80,74],[-62,66],[-55,52],[-66,45],[-70,42],[-76,35],[-81,31],[-80,26],[-82,25],[-84,30],[-90,29],[-97,27],[-97,22],[-92,18],[-87,21],[-88,16],[-83,10],[-79,8],[-80,7],[-85,11],[-92,14],[-105,20],[-110,23],[-112,30],[-117,32],[-124,40],[-124,48],[-132,55],[-140,60],[-152,58],[-165,54],[-160,60]],
  // Greenland
  [[-45,60],[-20,70],[-18,80],[-40,83],[-65,80],[-55,70]],
  // Iceland
  [[-24,64],[-14,64],[-15,66.5],[-22,66.5]],
  // South America
  [[-80,8],[-72,12],[-62,10],[-50,0],[-35,-5],[-38,-13],[-40,-22],[-48,-26],[-53,-34],[-58,-38],[-65,-42],[-68,-52],[-72,-54],[-75,-48],[-72,-30],[-71,-18],[-76,-14],[-81,-5],[-80,0],[-78,5]],
  // Eurasia
  [[-10,36],[-9,43],[-2,44],[-5,48],[0,50],[5,53],[8,57],[5,62],[15,69],[25,71],[40,68],[60,70],[70,73],[80,73],[100,78],[110,74],[130,72],[140,72],[160,70],[180,68],[180,65],[170,60],[162,57],[157,51],[143,59],[137,54],[140,48],[132,43],[128,38],[126,35],[121,40],[119,35],[122,30],[117,23],[108,21],[106,18],[109,12],[105,9],[100,13],[101,3],[104,1],[98,8],[98,16],[92,22],[87,21],[80,15],[77,8],[73,17],[72,21],[67,24],[57,25],[56,27],[50,30],[48,29],[51,24],[56,26],[59,22],[52,16],[43,13],[39,21],[35,28],[34,31],[36,36],[30,36],[27,37],[26,40],[23,38],[22,37],[20,40],[19,42],[13,45],[12,44],[16,40],[16,38],[12,38],[10,44],[6,43],[3,43],[0,39],[-2,37],[-5,36]],
  // Great Britain
  [[-5,50],[1,51],[-2,56],[-3,58.5],[-6,57],[-5,54]],
  // Africa
  [[-17,21],[-16,28],[-10,30],[-6,36],[10,37],[11,33],[20,31],[30,31],[32,31],[35,28],[43,12],[51,12],[48,5],[40,-3],[40,-15],[35,-24],[32,-29],[27,-34],[20,-35],[18,-32],[12,-18],[13,-10],[9,-1],[9,4],[4,6],[-8,4],[-13,8],[-17,14]],
  // Madagascar
  [[44,-25],[47,-25],[50,-15],[49,-12],[44,-17]],
  // Japan
  [[130,31],[135,34],[140,35],[142,40],[141,45],[140,41],[135,35.5],[130,33.5]],
  // Sumatra, Borneo, Java, New Guinea
  [[95,5],[98,4],[106,-6],[102,-4]],
  [[109,1],[117,7],[119,1],[116,-4],[110,-3]],
  [[106,-6],[114,-7],[114,-8.5],[106,-7.5]],
  [[131,-1],[141,-3],[150,-10],[141,-9],[137,-5]],
  // Australia
  [[114,-22],[122,-18],[130,-12],[137,-12],[136,-15],[141,-11],[146,-19],[153,-25],[153,-32],[150,-37],[145,-39],[139,-35],[134,-32],[129,-32],[115,-34],[113,-26]],
  // New Zealand
  [[172,-34],[178,-38],[174,-41],[167,-46],[171,-41]]
];

const MARKER = { lon: -46.63, lat: -23.55, label: 'BR · -23.55, -46.63' };
const LAND_GLYPHS = '01#%@*+=:';

function pointInPolygon(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function isLand(lon, lat) {
  for (const poly of LAND_POLYGONS) {
    if (pointInPolygon(lon, lat, poly)) return true;
  }
  return false;
}

function initHeroMap() {
  const canvas = document.getElementById('hero-map');
  if (!canvas || !canvas.getContext) return;
  const hero = canvas.parentElement;
  const ctx = canvas.getContext('2d');
  const CELL_W = 10;
  const CELL_H = 14;

  let cells = [];
  let w = 0;
  let h = 0;
  let marker = null;
  let mouse = null;
  let running = false;
  let rafId = 0;
  let lastTick = 0;
  let scanY = 0;

  function build() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `11px ${getComputedStyle(document.body).getPropertyValue('--font-mono') || 'monospace'}`;
    ctx.textBaseline = 'top';

    // Pacific-centred wrap puts the Americas right of the headline; Brazil sits at ~66% width on desktop
    const mobile = w < 768;
    const scale = Math.max(w / 330, h / 170);
    // Keep room on the right for the marker label (~180px)
    const anchorX = Math.min(w * (mobile ? 0.5 : 0.66), w - 190);
    const anchorY = h * (mobile ? 0.7 : 0.62);
    const toLon = x => MARKER.lon + (x - anchorX) / scale;
    const toLat = y => MARKER.lat - (y - anchorY) / scale;

    cells = [];
    const cols = Math.ceil(w / CELL_W);
    const rows = Math.ceil(h / CELL_H);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * CELL_W;
        const y = r * CELL_H;
        const lon = ((toLon(x + CELL_W / 2) + 540) % 360) - 180;
        const lat = toLat(y + CELL_H / 2);
        if (lat < 84 && lat > -58 && isLand(lon, lat)) {
          cells.push({ x, y, land: true, g: randomGlyph(), a: 0.3 + Math.random() * 0.45 });
        } else if (Math.random() < 0.035) {
          cells.push({ x, y, land: false, g: Math.random() < 0.7 ? '.' : '+', a: 0.12 + Math.random() * 0.2 });
        }
      }
    }

    marker = {
      x: Math.round(anchorX / CELL_W) * CELL_W,
      y: Math.round(anchorY / CELL_H) * CELL_H
    };
    draw(performance.now());
  }

  function randomGlyph() {
    return LAND_GLYPHS[(Math.random() * LAND_GLYPHS.length) | 0];
  }

  function draw(now) {
    ctx.clearRect(0, 0, w, h);
    const scanBand = 90;

    for (const cell of cells) {
      let alpha = cell.a;
      let color = cell.land ? '65, 65, 252' : '139, 139, 254';

      if (cell.land) {
        // Slow horizontal scan that lights up the landmass
        const d = Math.abs(cell.y - scanY);
        if (d < scanBand) alpha = Math.min(1, alpha + (1 - d / scanBand) * 0.35);
      }

      if (mouse) {
        const dx = cell.x - mouse.x;
        const dy = cell.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const k = 1 - dist / 120;
          alpha = Math.min(1, alpha + k * 0.6);
          if (cell.land && k > 0.55) color = '139, 139, 254';
        }
      }

      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.fillText(cell.g, cell.x, cell.y);
    }

    // Lime cursor marker (blinks at ~1.4s)
    if (marker) {
      const on = prefersReducedMotion || Math.floor(now / 700) % 2 === 0;
      ctx.fillStyle = '#7fd579';
      if (on) ctx.fillRect(marker.x, marker.y, 7, 12);
      ctx.strokeStyle = 'rgba(127, 213, 121, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(marker.x + 12, marker.y + 6.5);
      ctx.lineTo(marker.x + 32, marker.y + 6.5);
      ctx.stroke();
      ctx.fillText(MARKER.label, marker.x + 38, marker.y);
    }
  }

  function loop(now) {
    if (!running) return;
    rafId = requestAnimationFrame(loop);
    if (now - lastTick < 66) return; // ~15fps is plenty for a texture
    lastTick = now;

    // Flicker a handful of land glyphs so the texture feels like live data
    for (let i = 0; i < 18; i++) {
      const cell = cells[(Math.random() * cells.length) | 0];
      if (cell && cell.land) cell.g = randomGlyph();
    }
    scanY = (scanY + 3) % (h + 180);
    draw(now);
  }

  function start() {
    if (running || prefersReducedMotion) return;
    running = true;
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(rafId);
  }

  build();

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 150);
  });

  if (window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (prefersReducedMotion) draw(performance.now());
    });
    hero.addEventListener('pointerleave', () => {
      mouse = null;
      if (prefersReducedMotion) draw(performance.now());
    });
  }

  // Only animate while the hero is on screen and the tab is visible
  let heroVisible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      heroVisible && !document.hidden ? start() : stop();
    }).observe(hero);
  }
  document.addEventListener('visibilitychange', () => {
    document.hidden || !heroVisible ? stop() : start();
  });
  start();

  // Re-rasterise once web fonts are ready so glyph metrics are correct
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
}
