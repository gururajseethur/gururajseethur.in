import React, { useRef, useEffect, useState } from 'react';

/**
 * ScrollReveal — Intersection Observer wrapper for scroll-triggered animations.
 *
 * Props:
 *   direction: 'up' | 'down' | 'left' | 'right'
 *   delay: ms delay before animation
 *   className: additional CSS classes
 */
export default function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transforms = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
  };

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-x-0 translate-y-0'
          : `opacity-0 ${transforms[direction] || transforms.up}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
