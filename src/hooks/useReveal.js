import { useEffect, useRef } from 'react';

export function useReveal() {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      element.classList.add('is-visible');
      return undefined;
    }

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
