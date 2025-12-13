/**
 * YouTube Portfolio Utilities
 * Handles YouTube video ID extraction and thumbnail URL generation
 * for professional video portfolio displays
 */

/**
 * Extract YouTube video ID from various URL formats
 * Supports: youtube.com, youtu.be, youtube-nocookie.com
 * 
 * @param {string} url - Full YouTube video URL
 * @returns {string|null} Video ID or null if invalid
 */
function extractYouTubeID(url) {
  if (!url || typeof url !== 'string') return null;
  
  // Remove whitespace
  url = url.trim();
  
  // Pattern 1: youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  
  // Pattern 2: youtube.com?v=VIDEO_ID
  const standardMatch = url.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (standardMatch) return standardMatch[1];
  
  // Pattern 3: Just the video ID
  const idMatch = url.match(/^([a-zA-Z0-9_-]{11})$/);
  if (idMatch) return idMatch[0];
  
  return null;
}

/**
 * Generate YouTube thumbnail URL using public endpoint
 * Returns high-quality thumbnail (maxresdefault when available, falls back to hq)
 * 
 * @param {string} videoID - YouTube video ID
 * @returns {string} Thumbnail image URL
 */
function getYouTubeThumbnail(videoID) {
  if (!videoID || typeof videoID !== 'string') return '';
  
  // YouTube's public CDN thumbnail endpoint
  // maxresdefault: highest quality (1280x720)
  // hqdefault: fallback (480x360)
  return `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
}

/**
 * Generate watch URL for opening video in new tab
 * 
 * @param {string} videoID - YouTube video ID
 * @returns {string} Full YouTube watch URL
 */
function getYouTubeWatchURL(videoID) {
  if (!videoID || typeof videoID !== 'string') return '';
  return `https://www.youtube.com/watch?v=${videoID}`;
}

/**
 * Create a portfolio card element from video data
 * 
 * @param {Object} videoData - { youtubeUrl, title, description }
 * @returns {HTMLElement|null} Portfolio card element or null if invalid
 */
function createPortfolioCard(videoData) {
  const { youtubeUrl, title, description } = videoData;
  
  if (!youtubeUrl || !title) {
    console.warn('Portfolio card requires youtubeUrl and title');
    return null;
  }
  
  const videoID = extractYouTubeID(youtubeUrl);
  if (!videoID) {
    console.warn(`Invalid YouTube URL: ${youtubeUrl}`);
    return null;
  }
  
  const watchURL = getYouTubeWatchURL(videoID);
  const thumbnailURL = getYouTubeThumbnail(videoID);
  
  // Create card element
  const card = document.createElement('a');
  card.href = watchURL;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.className = 'video-portfolio-card';
  
  // Create image container
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'video-portfolio-image';
  
  // Create lazy-load image
  const img = document.createElement('img');
  img.className = 'video-portfolio-thumbnail';
  img.setAttribute('data-src', thumbnailURL);
  img.alt = title;
  // Fallback placeholder (1x1 transparent pixel)
  img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  
  // Play button overlay
  const playButton = document.createElement('div');
  playButton.className = 'video-portfolio-play';
  playButton.innerHTML = '▶';
  
  imageWrapper.appendChild(img);
  imageWrapper.appendChild(playButton);
  
  // Create content section
  const content = document.createElement('div');
  content.className = 'video-portfolio-content';
  
  const titleEl = document.createElement('h4');
  titleEl.className = 'video-portfolio-title';
  titleEl.textContent = title;
  
  const descEl = document.createElement('p');
  descEl.className = 'video-portfolio-description';
  descEl.textContent = description || '';
  
  content.appendChild(titleEl);
  if (description) content.appendChild(descEl);
  
  // Assemble card
  card.appendChild(imageWrapper);
  card.appendChild(content);
  
  return card;
}

/**
 * Initialize lazy loading for portfolio images
 * Uses Intersection Observer for performance
 */
function initPortfolioLazyLoad() {
  const images = document.querySelectorAll('.video-portfolio-thumbnail[data-src]');
  
  if (!('IntersectionObserver' in window)) {
    // Fallback: load immediately if IntersectionObserver not supported
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px'
  });
  
  images.forEach(img => observer.observe(img));
}

/**
 * Render portfolio grid with video data
 * 
 * @param {string} containerId - ID of container element
 * @param {Array} videoItems - Array of { youtubeUrl, title, description }
 */
function renderVideoPortfolio(containerId, videoItems) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID "${containerId}" not found`);
    return;
  }
  
  // Clear existing content
  container.innerHTML = '';
  
  // Create cards
  videoItems.forEach(item => {
    const card = createPortfolioCard(item);
    if (card) container.appendChild(card);
  });
  
  // Initialize lazy loading
  initPortfolioLazyLoad();
}

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    extractYouTubeID,
    getYouTubeThumbnail,
    getYouTubeWatchURL,
    createPortfolioCard,
    initPortfolioLazyLoad,
    renderVideoPortfolio
  };
}
