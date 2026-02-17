import { useState, useEffect } from 'react';

/**
 * Detect mobile / touch device for graceful degradation.
 */
export function useDeviceDetect() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const narrow = window.innerWidth < 768;
      setIsMobile(touch || narrow);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

/**
 * Particle count scaled to device capability.
 */
export function getParticleCount(isMobile) {
  return isMobile ? 8000 : 50000;
}

/**
 * DPR clamped for performance.
 */
export function getDevicePixelRatio(isMobile, override = false) {
  if (override) return 1;
  return isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
}
