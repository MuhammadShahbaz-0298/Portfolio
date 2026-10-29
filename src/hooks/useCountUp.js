import { useEffect, useRef, useState } from 'react';

const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);

const formatNumber = (number, decimals) =>
  decimals > 0 ? number.toFixed(decimals) : String(Math.round(number));

const parseTargets = (text) =>
  (text.match(/\d+(?:\.\d+)?/g) ?? []).map((token) => ({
    value: Number(token),
    decimals: token.includes('.') ? token.split('.')[1].length : 0,
  }));

const buildText = (text, targets, progress) => {
  let index = 0;
  return text.replace(/\d+(?:\.\d+)?/g, (token) => {
    const target = targets[index++];
    return formatNumber(target.value * progress, target.decimals);
  });
};

export function useCountUp(finalText) {
  const elementRef = useRef(null);
  const [display, setDisplay] = useState(finalText);

  useEffect(() => {
    const element = elementRef.current;
    const targets = parseTargets(finalText);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!element || targets.length === 0 || prefersReducedMotion || !('IntersectionObserver' in window)) {
      setDisplay(finalText);
      return undefined;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const duration = 1100;
        const startedAt = performance.now();
        const tick = (now) => {
          const progress = Math.min(1, (now - startedAt) / duration);
          setDisplay(buildText(finalText, targets, easeOutCubic(progress)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [finalText]);

  return { ref: elementRef, display };
}
