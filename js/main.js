// State Management
let currentLang = 'pt';
let selectedProject = null;

document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  renderApp();
  initModalEvents();
});

// Initialize Language Switcher
function initLanguageToggle() {
  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'pt' ? 'en' : 'pt';
      langBtn.textContent = currentLang === 'pt' ? 'EN' : 'PT';
      renderApp();
    });
  }
}

// Render Entire UI
function renderApp() {
  const t = portfolioData[currentLang];
  const projects = portfolioData.projects;

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
      const title = proj.title[currentLang];
      const desc = proj.description[currentLang];

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
  document.getElementById('footer-copyright').textContent = `© ${new Date().getFullYear()} ${t.footer.name}. ${currentLang === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}`;
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

  if (modalTitle) modalTitle.textContent = proj.title[currentLang];

  // Render Structured Summary
  if (summaryContainer && proj.summary) {
    const s = proj.summary[currentLang] || proj.summary.pt;
    summaryContainer.innerHTML = `
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
