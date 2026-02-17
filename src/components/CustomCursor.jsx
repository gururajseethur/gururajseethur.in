import React, { useEffect, useRef } from 'react';

/**
 * Custom reticle cursor.
 * mix-blend-mode: difference
 * Locks slightly on interactive hover.
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onEnterInteractive = () => cursor.classList.add('locked');
    const onLeaveInteractive = () => cursor.classList.remove('locked');

    const animate = () => {
      // Slight lag for smoothness — minimal
      cursorX += (mouseX - cursorX) * 0.3;
      cursorY += (mouseY - cursorY) * 0.3;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    animate();

    // Attach hover listeners to interactive elements
    const interactives = document.querySelectorAll('a, button, [data-interactive]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  // Hide on touch devices
  const isTouch = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (isTouch) return null;

  return <div ref={cursorRef} className="custom-cursor" />;
}
