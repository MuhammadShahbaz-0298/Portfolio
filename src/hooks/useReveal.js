// useReveal: returns a ref for an element that should fade in when it first
// scrolls into view. It adds the "is-visible" class (see src/styles/index.css).
// Uses a tiny IntersectionObserver — no animation libraries.
import { useEffect, useRef } from 'react';

export function useReveal() {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    // No animation at all for users who prefer reduced motion.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      element.classList.add('is-visible');
      return undefined;
    }

    // Content already on screen at load shows instantly (better first paint).
    const rectangle = element.getBoundingClientRect();
    const isOnScreen = rectangle.top < window.innerHeight && rectangle.bottom > 0;
    if (isOnScreen) {
      element.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return elementRef;
}
