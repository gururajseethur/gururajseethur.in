// ===== DOM ELEMENTS =====
const document = window.document;

// ===== SMOOTH SCROLLING & ACTIVE NAV =====
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('[data-section]');

  // Smooth scroll on click
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        // Update active nav
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // Update active nav on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('data-section');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// ===== SCROLL REVEAL ANIMATION =====
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });
}

// ===== FORM VALIDATION & SUBMISSION =====
function initForms() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Simulate API call (replace with actual backend)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Success message
    showNotification("Message sent successfully! I'll respond within 24 hours.", 'success');
    form.reset();
  } catch (error) {
    showNotification('Error sending message. Please try again.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'success') {
  const notif = document.createElement('div');
  notif.className = `notification notification-${type}`;
  notif.textContent = message;

  // Add styles inline if not in CSS
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 3000;
      animation: slideInRight 0.3s ease-out;
    }
    .notification-success {
      background: rgba(74, 222, 128, 0.1);
      border: 1px solid rgba(74, 222, 128, 0.3);
      color: #4ade80;
    }
    .notification-error {
      background: rgba(248, 113, 113, 0.1);
      border: 1px solid rgba(248, 113, 113, 0.3);
      color: #f87171;
    }
  `;
  if (!document.querySelector('style[data-notification]')) {
    style.setAttribute('data-notification', 'true');
    document.head.appendChild(style);
  }

  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

// ===== MODAL FUNCTIONALITY =====
function initModals() {
  const modals = document.querySelectorAll('.modal-overlay');

  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');
    const openButtons = document.querySelectorAll(`[data-modal="${modal.id}"]`);

    openButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.add('active');
      });
    });

    closeBtn?.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Close modal with Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
      });
    }
  });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16);

        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current);
          }
        }, 16);

        observer.unobserve(counter);
      }
    });
  });

  counters.forEach(counter => observer.observe(counter));
}

// ===== PARALLAX EFFECT =====
function initParallax() {
  window.addEventListener('scroll', () => {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = el.getAttribute('data-parallax');
      const yPos = window.pageYOffset * speed;
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
  const toggleBtn = document.querySelector('.theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggleBtn.textContent = newTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
  });

  toggleBtn.textContent = savedTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
}

// ===== COPY TO CLIPBOARD =====
function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        const original = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
          btn.textContent = original;
        }, 2000);
      });
    });
  });
}

// ===== LAZY LOAD IMAGES =====
function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ===== TYPING EFFECT =====
function typeText(element, text, speed = 50) {
  let index = 0;
  element.textContent = '';

  const type = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  };

  type();
}

// ===== PAGE TRANSITIONS =====
function initPageTransitions() {
  const links = document.querySelectorAll('a[href*=".html"]');

  links.forEach(link => {
    link.addEventListener('click', e => {
      if (link.target !== '_blank' && !link.href.includes('mailto')) {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease-out';

        setTimeout(() => {
          window.location.href = link.href;
        }, 300);
      }
    });
  });

  // Fade in on page load
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
}

// ===== VIDEO PORTFOLIO UTILITIES =====
// Extract YouTube video ID from various URL formats
function extractYouTubeVideoId(url) {
  if (!url) return null;
  
  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID (11 characters)
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

// Generate YouTube thumbnail URL with fallback strategy
function getYouTubeThumbnailUrl(videoId, quality = 'hq') {
  if (!videoId) return null;
  
  const qualityMap = {
    'max': `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    'sd': `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    'hq': `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    'mq': `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    'default': `https://img.youtube.com/vi/${videoId}/default.jpg`
  };
  
  return qualityMap[quality] || qualityMap['hq'];
}

// Initialize video portfolio with lazy loading
function initVideoPortfolio() {
  const container = document.getElementById('videoPortfolioContainer');
  if (!container) return;

  // Sample video portfolio data - Replace with actual YouTube links
  const videoPortfolioData = [
    {
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Professional Editing Demo',
      description: 'High-quality post-production work demonstrating color grading, transitions, and audio synchronization.'
    },
    {
      youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      title: 'Brand Storytelling',
      description: 'Cinematic narrative production showcasing conceptual development and creative execution.'
    },
    {
      youtubeUrl: 'https://youtu.be/jNQXAC9IVRw',
      title: 'Commercial Production',
      description: 'Professional commercial video demonstrating client vision interpretation and technical precision.'
    },
    {
      youtubeUrl: 'https://www.youtube.com/watch?v=tYzD26wJnYQ',
      title: 'Content Optimization',
      description: 'Multi-platform video content creation optimized for various distribution channels and audiences.'
    },
    {
      youtubeUrl: 'https://www.youtube.com/watch?v=8jwH_yKuWqI',
      title: 'Motion Graphics Integration',
      description: 'Seamless integration of motion graphics, text animation, and visual effects for enhanced storytelling.'
    },
    {
      youtubeUrl: 'https://www.youtube.com/watch?v=ZyhrYis509A',
      title: 'Documentary Style Production',
      description: 'Long-form narrative content with interview integration and atmospheric sound design.'
    }
  ];

  // Generate portfolio cards
  videoPortfolioData.forEach(item => {
    const videoId = extractYouTubeVideoId(item.youtubeUrl);
    if (!videoId) return;

    const thumbnailUrl = getYouTubeThumbnailUrl(videoId, 'hq');
    
    const card = document.createElement('a');
    card.className = 'video-portfolio-card';
    card.href = item.youtubeUrl;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.setAttribute('title', `Watch: ${item.title}`);
    
    card.innerHTML = `
      <img 
        class="video-portfolio-card-image" 
        src="${thumbnailUrl}" 
        alt="${item.title}"
        loading="lazy"
        decoding="async"
      />
      <div class="video-portfolio-card-play-icon"></div>
      <div class="video-portfolio-card-overlay">
        <h3 class="video-portfolio-card-title">${item.title}</h3>
        <p class="video-portfolio-card-description">${item.description}</p>
      </div>
    `;
    
    container.appendChild(card);
  });

  // Implement lazy loading with intersection observer
  const images = container.querySelectorAll('.video-portfolio-card-image');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Image is already in src due to simplicity, but we can add loading state
        img.style.opacity = '1';
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });

  images.forEach(img => {
    img.style.opacity = '0.8';
    img.style.transition = 'opacity 0.3s ease-out';
    imageObserver.observe(img);
  });
}

// ===== PAGE TRANSITIONS =====

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initForms();
  initModals();
  initThemeToggle();
  initCopyButtons();
  initLazyLoad();
  initParallax();
  animateCounters();
  initVideoPortfolio();
  initPageTransitions();
});
