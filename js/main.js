/* ==========================================================================
   AETHERIA - ANTI-GRAVITY FUTURISTIC PODCAST & AUDIO MAGAZINE
   Master JavaScript File - Dynamic Podcast Audio Player, Interactive Soundwaves,
   Realtime Search, Episode Modals & Multi-Color Floating Particles
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initCursorGlow();
  initHeaderScroll();
  initLiveClock();
  initMobileNav();
  initCard3DTilt();
  initScrollReveals();
  initModalReader();
  initNewsletterForm();
  initNewsFilterAndSearch();
  initLoadMoreNews();
  initCategoryTabSwitcher();
  initContactForm();
  initGlobalAudioPlayer();
  initScrollNavigation();
});

/* -------------------------------------------------------------------------- */
/* 1. Multi-Color Podcast Particle Canvas                                      */
/* -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 70);

  // Multi-Color Podcast Palette
  const colors = [
    'rgba(168, 85, 247, ', // Neon Purple
    'rgba(6, 182, 212, ',  // Neon Cyan
    'rgba(236, 72, 153, ', // Hot Magenta
    'rgba(255, 107, 0, ',  // Vibrant Orange
    'rgba(16, 185, 129, '  // Neon Green
  ];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.4 - 0.2,
      floatOffset: Math.random() * Math.PI * 2
    });
  }

  let angle = 0;

  function animate() {
    ctx.clearRect(0, 0, width, height);
    angle += 0.012;

    particles.forEach((p, idx) => {
      p.x += p.vx + Math.sin(angle + p.floatOffset) * 0.3;
      p.y += p.vy;

      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color + '0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw soundwave connections between nearby particles
      for (let j = idx + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* -------------------------------------------------------------------------- */
/* 2. Spotlight Cursor Glow                                                   */
/* -------------------------------------------------------------------------- */
function initCursorGlow() {
  const cursorGlow = document.getElementById('cursor-glow');
  if (!cursorGlow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    cursorGlow.style.left = `${currentX}px`;
    cursorGlow.style.top = `${currentY}px`;
    requestAnimationFrame(render);
  }

  render();
}

/* -------------------------------------------------------------------------- */
/* 3. Header Scroll Shadow                                                    */
/* -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 4. Live UTC Broadcast Clock                                                */
/* -------------------------------------------------------------------------- */
function initLiveClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }).toUpperCase();
    const timeStr = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    clockEl.textContent = `LIVE AUDIO • ${dateStr} — ${timeStr} UTC`;
  }

  update();
  setInterval(update, 1000);
}

/* -------------------------------------------------------------------------- */
/* 5. Mobile Navigation Toggle                                                */
/* -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const menu = document.querySelector('.nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('mobile-open');
    const isOpen = menu.classList.contains('mobile-open');
    toggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('mobile-open');
      toggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 6. Anti-Gravity 3D Card Tilt Effect                                        */
/* -------------------------------------------------------------------------- */
function initCard3DTilt() {
  const cards = document.querySelectorAll('.anti-gravity-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 7. Scroll Reveals                                                          */
/* -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* -------------------------------------------------------------------------- */
/* 8. Podcast Episodes Database & Modal Reader                                */
/* -------------------------------------------------------------------------- */
const podcastEpisodes = {
  '1': {
    category: 'Technology',
    categoryClass: 'badge-tech',
    title: 'EP #142: Quantum Neural Substrates & Consciousness Audio Telemetry',
    host: 'Dr. Elena Vance',
    role: 'Quantum Physics Host',
    duration: '48 MIN EPISODE',
    listens: '34.2K LISTENERS',
    date: 'SEP 04, 2026',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
    audioSrc: 'quantum_audio.mp3',
    summary: 'In this breakthrough episode, European Synchrotron Lab researchers discuss the deployment of a 10,000-qubit neural audio substrate capable of processing complex ethical decisions without temporal latency.',
    showNotes: `
      <h4>EPISODE HIGHLIGHTS & SHOW NOTES:</h4>
      <ul>
        <li><strong>[00:00]</strong> Intro & Quantum Audio Telemetry Calibration</li>
        <li><strong>[12:35]</strong> Room-Temperature Superconducting Qubits</li>
        <li><strong>[28:40]</strong> Synthesizing Silicon Intuition with Guest Dr. Elena Vance</li>
        <li><strong>[41:10]</strong> Q&A: Autonomous Space Probes & Neural Audio Mesh</li>
      </ul>
    `
  },
  '2': {
    category: 'Business',
    categoryClass: 'badge-business',
    title: 'EP #141: The $1.2 Trillion Orbital Economy & Microgravity Factories',
    host: 'Marcus Vance',
    role: 'Orbital Markets Anchor',
    duration: '52 MIN EPISODE',
    listens: '28.9K LISTENERS',
    date: 'SEP 03, 2026',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80',
    audioSrc: 'orbital_business.mp3',
    summary: 'Marcus Vance sits down with Low-Earth Orbit hub founders to analyze how organoid tissue printing and high-purity optical fiber manufacturing reached record fiscal quarters.',
    showNotes: `
      <h4>EPISODE HIGHLIGHTS & SHOW NOTES:</h4>
      <ul>
        <li><strong>[00:00]</strong> Commercial Space Docks Market Breakdown</li>
        <li><strong>[15:20]</strong> Payload Launch Costs Drop Below $150/kg</li>
        <li><strong>[34:10]</strong> Decentralized Smart Contract Settlement in Orbit</li>
      </ul>
    `
  },
  '3': {
    category: 'Sports',
    categoryClass: 'badge-sports',
    title: 'EP #140: Inside the Zero-G Cyber League & Neural Exosuit Athletics',
    host: 'Jaxson Thorne',
    role: 'Cyber Athletics Host',
    duration: '42 MIN EPISODE',
    listens: '22.1K LISTENERS',
    date: 'SEP 02, 2026',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    audioSrc: 'zerog_sports.mp3',
    summary: 'A deep-dive into microgravity sports engineering, 3D vector maneuvering, and haptic torque feedback exosuits used by orbital athletes competing 400km above Earth.',
    showNotes: `
      <h4>EPISODE HIGHLIGHTS & SHOW NOTES:</h4>
      <ul>
        <li><strong>[00:00]</strong> Rules of Zero-G Velocity Ball</li>
        <li><strong>[18:45]</strong> Neural Muscle Memory & Exosuit Haptics</li>
        <li><strong>[33:10]</strong> Autonomous AI-Formula GP Traction Adjustments</li>
      </ul>
    `
  },
  '4': {
    category: 'Lifestyle',
    categoryClass: 'badge-lifestyle',
    title: 'EP #139: Biophilic Habitat Design & Bio-Luminescent Audio Domes',
    host: 'Aria Thorne',
    role: 'Culture & Design Host',
    duration: '55 MIN EPISODE',
    listens: '19.4K LISTENERS',
    date: 'SEP 01, 2026',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    audioSrc: 'biophilic_living.mp3',
    summary: 'Aria Thorne explores algae-powered ambient lighting, neuro-feedback meditation domes, and living acoustic air purifiers transforming modern homes into ecological sanctuaries.',
    showNotes: `
      <h4>EPISODE HIGHLIGHTS & SHOW NOTES:</h4>
      <ul>
        <li><strong>[00:00]</strong> Circadian Lighting for Space Habitat Residents</li>
        <li><strong>[21:15]</strong> Bio-Luminescent Urban Street Flora</li>
        <li><strong>[40:50]</strong> Acoustic Resonance Chambers in Neo-Tokyo</li>
      </ul>
    `
  }
};

function initModalReader() {
  const modal = document.getElementById('article-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const modalBody = modal.querySelector('.modal-body-content');

  // Define closeModal globally FIRST so onclick="closeModal()" works immediately
  window.closeModal = function() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-article-id]');
    // Check if user clicked direct play button or card info
    if (trigger && !e.target.closest('.podcast-play-btn') && !e.target.closest('.btn-listen-now')) {
      const episodeId = trigger.getAttribute('data-article-id');
      const ep = podcastEpisodes[episodeId] || podcastEpisodes['1'];

      modalBody.innerHTML = `
        <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <span class="badge-category ${ep.categoryClass}">${ep.category} PODCAST</span>
            <span style="margin-left: 1rem; color: var(--text-muted); font-size: 0.85rem;">${ep.date} • ${ep.duration}</span>
          </div>
          <div class="sound-wave-anim">
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
          </div>
        </div>

        <h2 style="font-family: var(--font-display); font-size: 2rem; line-height: 1.1; margin-bottom: 1.2rem; color: #fff;">${ep.title}</h2>

        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.8rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">
          <div style="font-weight: 700; color: var(--accent-cyan); font-size: 1.05rem;">Host: ${ep.host}</div>
          <div style="color: var(--text-muted); font-size: 0.85rem;">${ep.role} • ${ep.listens}</div>
        </div>

        <div style="position: relative; margin-bottom: 2rem; border-radius: 16px; overflow: hidden; height: 320px;">
          <img src="${ep.image}" alt="Podcast Cover" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, rgba(6,6,9,0.9), transparent); display: flex; align-items: flex-end; padding: 1.5rem;">
            <button class="btn-subscribe" onclick="playGlobalAudio('${ep.title.replace(/'/g, "\\'")}', '${ep.host}', '${ep.image}'); closeModal();" style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.95rem;">
              <i class="fas fa-play"></i> STREAM FULL EPISODE NOW
            </button>
          </div>
        </div>

        <p style="font-size: 1.1rem; line-height: 1.7; color: #cbd5e1; margin-bottom: 1.8rem;">${ep.summary}</p>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(168,85,247,0.3); border-radius: 16px; padding: 1.5rem; line-height: 1.8; color: var(--text-muted);">
          ${ep.showNotes}
        </div>

        <div style="margin-top: 2.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
          <button class="btn-subscribe" onclick="showToast('Episode saved to your Offline Audio Vault!')"><i class="fas fa-download"></i> Download Episode MP3</button>
          <button class="btn-load-more" onclick="showToast('Podcast link copied to clipboard!')"><i class="fas fa-share-alt"></i> Share Show</button>
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close button — both addEventListener AND direct close for reliability
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.closeModal();
    });
  }

  // Click outside modal container to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) window.closeModal();
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      window.closeModal();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 9. Newsletter Form & Toast                                                 */
/* -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value.trim() !== '') {
        showToast(`Subscribed! Weekly Podcast Digest sent to ${input.value.trim()}`);
        input.value = '';
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fas fa-podcast" style="color: var(--accent-cyan); font-size: 1.3rem;"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* -------------------------------------------------------------------------- */
/* 10. News & Episodes Filter & Realtime Search                               */
/* -------------------------------------------------------------------------- */
function initNewsFilterAndSearch() {
  const searchInput = document.getElementById('news-search-input');
  const filterTags = document.querySelectorAll('.filter-tag');
  const articles = document.querySelectorAll('.news-article-card');

  if (!articles.length) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function filterArticles() {
    articles.forEach((card) => {
      const cardCategory = card.getAttribute('data-category')?.toLowerCase() || '';
      const titleText = card.querySelector('.article-title')?.textContent.toLowerCase() || '';
      const snippetText = card.querySelector('.article-snippet')?.textContent.toLowerCase() || '';

      const matchesCat = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesSearch = searchQuery === '' || titleText.includes(searchQuery) || snippetText.includes(searchQuery);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterArticles();
    });
  }

  filterTags.forEach((tag) => {
    tag.addEventListener('click', () => {
      filterTags.forEach((t) => t.classList.remove('active'));
      tag.classList.add('active');
      activeCategory = tag.getAttribute('data-filter')?.toLowerCase() || 'all';
      filterArticles();
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 11. Load More Podcast Episodes Simulation                                  */
/* -------------------------------------------------------------------------- */
function initLoadMoreNews() {
  const btn = document.getElementById('btn-load-more-news');
  const container = document.getElementById('news-grid-container');

  if (!btn || !container) return;

  const extraArticles = [
    {
      category: 'Science',
      badgeClass: 'badge-science',
      title: 'EP #138: Tokamak Fusion Energy Grid & Sub-Ocean Power Vents',
      image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
      date: 'AUG 30, 2026',
      duration: '46 MIN EPISODE',
      host: 'Dr. Hiroshi Sato',
      snippet: 'Deep ocean geothermal pressure generators feed clean megawatts directly into coastal subterranean storage grids.'
    },
    {
      category: 'Entertainment',
      badgeClass: 'badge-entertainment',
      title: 'EP #137: Light-Field Hologram Cinema & Neural Synthesizers',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      date: 'AUG 28, 2026',
      duration: '39 MIN EPISODE',
      host: 'Chloe Bennet',
      snippet: 'Immersive light-field storytelling replaces flat screen viewing as audiences step directly into narrative soundscapes.'
    }
  ];

  btn.addEventListener('click', () => {
    btn.textContent = 'BUFFERING AUDIO FEEDS...';
    setTimeout(() => {
      extraArticles.forEach((art) => {
        const cardHtml = `
          <article class="anti-gravity-card news-article-card" data-category="${art.category.toLowerCase()}" data-article-id="1" style="display: flex; flex-direction: column;">
            <div class="podcast-cover-wrap">
              <img src="${art.image}" alt="${art.title}">
              <span class="badge-category ${art.badgeClass}" style="position: absolute; top: 1rem; left: 1rem; z-index: 2;">${art.category}</span>
              <div class="play-overlay">
                <button class="podcast-play-btn" onclick="playGlobalAudio('${art.title.replace(/'/g, "\\'")}', '${art.host}', '${art.image}')"><i class="fas fa-play"></i></button>
              </div>
            </div>
            <div class="article-card-body">
              <div class="article-meta">
                <span>${art.date}</span>
                <span><i class="fas fa-headphones"></i> ${art.duration}</span>
              </div>
              <h3 class="article-title">${art.title}</h3>
              <p class="article-snippet">${art.snippet}</p>
              <div class="article-footer">
                <span style="font-weight: 600; color: #fff;">Host: ${art.host}</span>
                <button class="btn-listen-now" onclick="playGlobalAudio('${art.title.replace(/'/g, "\\'")}', '${art.host}', '${art.image}')"><i class="fas fa-play"></i> PLAY</button>
              </div>
            </div>
          </article>
        `;
        container.insertAdjacentHTML('beforeend', cardHtml);
      });
      initCard3DTilt();
      btn.textContent = 'ALL EPISODES LOADED';
      btn.style.opacity = '0.5';
      btn.disabled = true;
      showToast('2 new podcast episodes added to feed!');
    }, 800);
  });
}

/* -------------------------------------------------------------------------- */
/* 12. Category Pill Switcher                                                 */
/* -------------------------------------------------------------------------- */
function initCategoryTabSwitcher() {
  const pills = document.querySelectorAll('.pill-btn');
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 13. Contact Form                                                           */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('about-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Podcast pitch transmitted! Our production desk will review within 24 hours.');
    form.reset();
  });
}

/* -------------------------------------------------------------------------- */
/* 14. Global Sticky Audio Player Logic                                       */
/* -------------------------------------------------------------------------- */
let isPlaying = false;
let playInterval = null;
let currentProgress = 35;

function initGlobalAudioPlayer() {
  // ✅ Do NOT inject the player bar on page load.
  // It is created lazily inside playGlobalAudio() on first click.

  // Intercept play button clicks across all cards
  document.addEventListener('click', (e) => {
    const playBtn = e.target.closest('.podcast-play-btn, .btn-listen-now');
    if (playBtn) {
      const card = playBtn.closest('.anti-gravity-card') || playBtn.closest('.hero-featured-card');
      if (card) {
        const title = card.querySelector('.article-title, .hero-title')?.textContent || 'Quantum Audio Episode';
        const host  = card.querySelector('.article-footer span, .author-name')?.textContent || 'AETHERIA Host';
        const img   = card.querySelector('img')?.src || 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=200&q=80';
        playGlobalAudio(title, host, img);
      }
    }
  });
}

/* Create the sticky player bar the first time it is needed */
function createPlayerIfNeeded() {
  if (document.getElementById('global-audio-player')) return; // already exists

  const playerHtml = `
    <div id="global-audio-player" class="sticky-audio-player sticky-player-hidden">
      <div class="player-track-info">
        <img id="player-thumb" src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=200&q=80" alt="Podcast Thumb" class="player-thumb">
        <div style="overflow: hidden;">
          <div id="player-title" class="player-title">Loading episode...</div>
          <div id="player-show" class="player-show-name">AETHERIA AUDIO</div>
        </div>
      </div>

      <div class="player-controls">
        <div class="player-btns">
          <button class="btn-player-action" onclick="showToast('Skipped back 15 sec')"><i class="fas fa-undo-alt"></i></button>
          <button id="main-play-btn" class="btn-player-play" onclick="toggleGlobalAudio()"><i class="fas fa-pause"></i></button>
          <button class="btn-player-action" onclick="showToast('Skipped forward 15 sec')"><i class="fas fa-redo-alt"></i></button>
        </div>

        <div class="player-progress-wrap">
          <span id="player-time-curr">0:00</span>
          <div class="player-bar" onclick="seekGlobalAudio(event)">
            <div id="player-fill" class="player-fill" style="width: 0%;"></div>
          </div>
          <span id="player-time-dur">0:00</span>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div class="sound-wave-anim" id="player-wave" style="opacity: 1;">
          <span class="wave-bar"></span>
          <span class="wave-bar"></span>
          <span class="wave-bar"></span>
          <span class="wave-bar"></span>
          <span class="wave-bar"></span>
        </div>
        <button class="btn-player-action" onclick="showToast('Added episode to queue')"><i class="fas fa-list-ul"></i></button>
        <button class="btn-player-close" onclick="closeGlobalPlayer()" title="Close Player" aria-label="Close audio player">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', playerHtml);

  // Slide in with a slight delay so CSS transition fires
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const player = document.getElementById('global-audio-player');
      if (player) player.classList.remove('sticky-player-hidden');
    });
  });
}


window.playGlobalAudio = function(title, host, img) {
  const titleEl = document.getElementById('player-title');
  const showEl = document.getElementById('player-show');
  const thumbEl = document.getElementById('player-thumb');
  const playBtn = document.getElementById('main-play-btn');
  const waveEl = document.getElementById('player-wave');

  if (titleEl) titleEl.textContent = title;
  if (showEl) showEl.textContent = `AETHERIA AUDIO • ${host}`;
  if (thumbEl && img) thumbEl.src = img;

  isPlaying = true;
  if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  if (waveEl) waveEl.style.opacity = '1';

  showToast(`Streaming: "${title.slice(0, 35)}..."`);
  startProgressTimer();
};

window.toggleGlobalAudio = function() {
  const playBtn = document.getElementById('main-play-btn');
  const waveEl = document.getElementById('player-wave');
  isPlaying = !isPlaying;

  if (isPlaying) {
    if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    if (waveEl) waveEl.style.opacity = '1';
    showToast('Podcast Resumed');
    startProgressTimer();
  } else {
    if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
    if (waveEl) waveEl.style.opacity = '0.4';
    showToast('Podcast Paused');
    clearInterval(playInterval);
  }
};

function startProgressTimer() {
  clearInterval(playInterval);
  playInterval = setInterval(() => {
    if (!isPlaying) return;
    currentProgress = (currentProgress + 0.2) % 100;
    const fill = document.getElementById('player-fill');
    if (fill) fill.style.width = `${currentProgress}%`;
  }, 1000);
}

window.seekGlobalAudio = function(e) {
  const bar = e.currentTarget;
  const rect = bar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  currentProgress = (clickX / rect.width) * 100;
  const fill = document.getElementById('player-fill');
  if (fill) fill.style.width = `${currentProgress}%`;
};

window.closeGlobalPlayer = function() {
  const player = document.getElementById('global-audio-player');
  if (!player) return;
  // Stop playback state
  isPlaying = false;
  clearInterval(playInterval);
  // Animate out then remove
  player.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease';
  player.style.transform = 'translateY(100%)';
  player.style.opacity = '0';
  setTimeout(() => player.remove(), 380);
};

window.toggleTaskoraMobileMenu = function() {
  const menu = document.getElementById('taskora-mobile-menu');
  if (menu) menu.classList.toggle('open');
};

/* -------------------------------------------------------------------------- */
/* Top-to-Bottom / Back-to-Top Floating Scroll Navigation                      */
/* -------------------------------------------------------------------------- */
function initScrollNavigation() {
  const scrollBtn = document.getElementById('floating-scroll-btn');
  if (!scrollBtn) return;

  const icon = scrollBtn.querySelector('i');

  function updateScrollState() {
    const scrollPos = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollPos > docHeight - 150) {
      if (icon) icon.className = 'fas fa-arrow-up';
      scrollBtn.setAttribute('title', 'Scroll to top');
      scrollBtn.setAttribute('data-direction', 'top');
    } else if (scrollPos < 200) {
      if (icon) icon.className = 'fas fa-arrow-down';
      scrollBtn.setAttribute('title', 'Scroll to bottom');
      scrollBtn.setAttribute('data-direction', 'bottom');
    } else {
      if (icon) icon.className = 'fas fa-arrow-up';
      scrollBtn.setAttribute('title', 'Scroll to top');
      scrollBtn.setAttribute('data-direction', 'top');
    }
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  scrollBtn.addEventListener('click', () => {
    const direction = scrollBtn.getAttribute('data-direction');
    if (direction === 'bottom') {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
}
