import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Reusable IntersectionObserver hook.
 *
 * @param {Object} options
 * @param {number} options.threshold  – visibility threshold (default 0.1)
 * @param {string} options.rootMargin – root margin (default '0px 0px -50px 0px')
 * @param {boolean} options.triggerOnce – unobserve after first trigger (default true)
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export default function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
