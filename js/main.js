// State Management
let currentLang = 'pt';
let selectedProject = null;

// SVG Flag Icons
const flagBR = `<svg class="flag-icon" width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="15" rx="2" fill="#009B3A"/><polygon points="11,1.5 20.2,7.5 11,13.5 1.8,7.5" fill="#FEDF00"/><circle cx="11" cy="7.5" r="3.4" fill="#002776"/><path d="M 7.8 8 C 9.8 7.2, 12.2 7.2, 14.2 8" stroke="#FFFFFF" stroke-width="0.8" fill="none"/></svg>`;
const flagUS = `<svg class="flag-icon" width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="15" rx="2" fill="#B22234"/><rect y="2.3" width="22" height="1.15" fill="#FFFFFF"/><rect y="4.6" width="22" height="1.15" fill="#FFFFFF"/><rect y="6.9" width="22" height="1.15" fill="#FFFFFF"/><rect y="9.2" width="22" height="1.15" fill="#FFFFFF"/><rect y="11.5" width="22" height="1.15" fill="#FFFFFF"/><rect width="9.5" height="8.05" fill="#3C3B6E" rx="1"/><circle cx="2" cy="1.8" r="0.55" fill="#FFFFFF"/><circle cx="4.75" cy="1.8" r="0.55" fill="#FFFFFF"/><circle cx="7.5" cy="1.8" r="0.55" fill="#FFFFFF"/><circle cx="3.35" cy="4" r="0.55" fill="#FFFFFF"/><circle cx="6.1" cy="4" r="0.55" fill="#FFFFFF"/><circle cx="2" cy="6.2" r="0.55" fill="#FFFFFF"/><circle cx="4.75" cy="6.2" r="0.55" fill="#FFFFFF"/><circle cx="7.5" cy="6.2" r="0.55" fill="#FFFFFF"/></svg>`;
const flagES = `<svg class="flag-icon" width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="15" rx="2" fill="#AA1523"/><rect y="3.75" width="22" height="7.5" fill="#F1BF00"/><rect width="22" height="3.75" fill="#AA1523"/><rect y="11.25" width="22" height="3.75" fill="#AA1523"/><circle cx="6" cy="7.5" r="1.5" fill="#AA1523"/></svg>`;

document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  renderApp();
  initModalEvents();
});

// Initialize Language Switcher Dropdown
function initLanguageToggle() {
  const dropdown = document.getElementById('lang-dropdown');
  const trigger = document.getElementById('lang-dropdown-trigger');
  const items = document.querySelectorAll('.lang-dropdown-item');

  // Populate Menu Flags
  const menuFlagPT = document.getElementById('menu-flag-pt');
  const menuFlagEN = document.getElementById('menu-flag-en');
  const menuFlagES = document.getElementById('menu-flag-es');
  if (menuFlagPT) menuFlagPT.innerHTML = flagBR;
  if (menuFlagEN) menuFlagEN.innerHTML = flagUS;
  if (menuFlagES) menuFlagES.innerHTML = flagES;

  if (trigger && dropdown) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen);
    });

    items.forEach(item => {
      item.addEventListener('click', () => {
        const lang = item.getAttribute('data-lang');
        if (lang && lang !== currentLang) {
          currentLang = lang;
          renderApp();
        }
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// Render Entire UI
function renderApp() {
  const t = portfolioData[currentLang];
  const projects = portfolioData.projects;

  // Update Language Dropdown Display
  const selectedFlagEl = document.getElementById('selected-lang-flag');
  const selectedCodeEl = document.getElementById('selected-lang-code');
  if (selectedFlagEl) selectedFlagEl.innerHTML = currentLang === 'pt' ? flagBR : (currentLang === 'es' ? flagES : flagUS);
  if (selectedCodeEl) selectedCodeEl.textContent = currentLang.toUpperCase();

  document.querySelectorAll('.lang-dropdown-item').forEach(item => {
    const itemLang = item.getAttribute('data-lang');
    if (itemLang === currentLang) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Header Nav
  document.getElementById('nav-about').textContent = t.header.about;
  document.getElementById('nav-projects').textContent = t.header.projects;
  document.getElementById('nav-contact').textContent = t.header.contact;
  document.getElementById('header-contact-btn').textContent = t.header.getInTouch;

  // Hero Section
  document.getElementById('hero-title-line1').textContent = t.hero.titleLine1;
  document.getElementById('hero-title-accent').textContent = t.hero.titleGradient;
  document.getElementById('hero-desc').textContent = t.hero.description;
  document.getElementById('hero-projects-btn').textContent = t.hero.viewProjects;
  document.getElementById('hero-contact-btn').textContent = t.hero.getInTouch;

  // About Section
  document.getElementById('about-title').textContent = t.about.title;
  document.getElementById('about-subtitle').textContent = t.about.subtitle;

  const paragraphsContainer = document.getElementById('about-paragraphs');
  if (paragraphsContainer && t.about.paragraphs) {
    paragraphsContainer.innerHTML = t.about.paragraphs.map(p => `
      <p class="about-paragraph">${p}</p>
    `).join('');
  }

  const highlightsContainer = document.getElementById('about-highlights');
  if (highlightsContainer) {
    highlightsContainer.innerHTML = t.about.highlights.map(h => `
      <div class="highlight-card">
        <div class="highlight-title">${h.title}</div>
        <div class="highlight-desc">${h.description}</div>
      </div>
    `).join('');
  }

  // Projects Section
  document.getElementById('projects-title').textContent = t.projects.title;
  document.getElementById('projects-subtitle').textContent = t.projects.subtitle;

  const projectsContainer = document.getElementById('projects-grid');
  if (projectsContainer) {
    projectsContainer.innerHTML = projects.map(proj => {
      const title = proj.title[currentLang] || proj.title.pt;
      const desc = proj.description[currentLang] || proj.description.pt;

      return `
        <article class="project-card">
          <div class="project-card-image-wrap">
            <img src="${proj.image}" alt="${title}" class="project-card-image" loading="lazy" />
          </div>
          <div class="project-card-content">
            <div class="project-card-tags">
              ${proj.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <h3 class="project-card-title">${title}</h3>
            <p class="project-card-desc">${desc}</p>
            <div class="project-card-actions">
              <button type="button" class="btn btn-primary btn-open-modal" data-id="${proj.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <span>${t.projects.viewDetails}</span>
              </button>
              <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click handlers to "Ver detalhes" buttons
    document.querySelectorAll('.btn-open-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openModal(id);
      });
    });
  }

  // Contact Section
  document.getElementById('contact-title').textContent = t.contact.title;
  document.getElementById('contact-subtitle').textContent = t.contact.subtitle;
  document.getElementById('contact-email-btn').textContent = t.contact.sendEmail;

  // Footer
  const copyrightText = currentLang === 'pt' ? 'Todos os direitos reservados.' : (currentLang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.');
  document.getElementById('footer-copyright').textContent = `© ${new Date().getFullYear()} ${t.footer.name}. ${copyrightText}`;
}

// Modal Dialog Controls
function initModalEvents() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function openModal(projectId) {
  const proj = portfolioData.projects.find(p => p.id === projectId);
  if (!proj) return;

  selectedProject = proj;
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title-text');
  const summaryContainer = document.getElementById('modal-summary-content');

  if (modalTitle) modalTitle.textContent = proj.title[currentLang] || proj.title.pt;

  // Render 2-Column Executive Summary Modal
  if (summaryContainer && proj.summary) {
    const s = proj.summary[currentLang] || proj.summary.pt;
    const title = proj.title[currentLang] || proj.title.pt;

    summaryContainer.innerHTML = `
      <div class="modal-two-columns">
        <!-- Left Column: Image Preview & Details -->
        <div class="modal-col-preview">
          <div class="modal-image-frame">
            <img src="${proj.image}" alt="${title}" class="modal-preview-img" />
          </div>
          <div class="modal-preview-tags">
            ${proj.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary modal-github-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            <span>${currentLang === 'pt' ? 'Ver no GitHub' : (currentLang === 'es' ? 'Ver en GitHub' : 'View on GitHub')}</span>
          </a>
        </div>

        <!-- Right Column: Executive Summary Cards -->
        <div class="modal-col-summary">
          <div class="summary-cards-grid">
            <div class="summary-card challenge-card">
              <div class="summary-card-header">
                <span class="summary-icon">🎯</span>
                <h4>${s.challenge.title}</h4>
              </div>
              <p>${s.challenge.description}</p>
            </div>

            <div class="summary-card solution-card">
              <div class="summary-card-header">
                <span class="summary-icon">💡</span>
                <h4>${s.solution.title}</h4>
              </div>
              <p>${s.solution.description}</p>
            </div>

            <div class="summary-card highlights-card full-width">
              <div class="summary-card-header">
                <span class="summary-icon">✨</span>
                <h4>${s.highlights.title}</h4>
              </div>
              <ul>
                ${s.highlights.items.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>

            <div class="summary-card impact-card full-width">
              <div class="summary-card-header">
                <span class="summary-icon">📈</span>
                <h4>${s.impact.title}</h4>
              </div>
              <p>${s.impact.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (modalOverlay) {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modalOverlay = document.getElementById('project-modal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}
