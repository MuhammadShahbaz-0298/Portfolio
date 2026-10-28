// useCountUp: animates the numbers inside a stat string ("50+", "4s → 1.5s")
// from 0 up to their real value the first time the element is visible.
// Returns { ref, display } — put ref on the element and render display.
// Real value always wins at the end; reduced-motion users see it instantly.
import { useEffect, useRef, useState } from 'react';

const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);

// Keeps the original formatting: "4" stays integer, "1.5" keeps one decimal.
const formatNumber = (number, decimals) =>
  decimals > 0 ? number.toFixed(decimals) : String(Math.round(number));

// Splits "4s → 1.5s" into text + number targets (value and decimal places).
const parseTargets = (text) =>
  (text.match(/\d+(?:\.\d+)?/g) ?? []).map((token) => ({
    value: Number(token),
    decimals: token.includes('.') ? token.split('.')[1].length : 0,
  }));

// Rebuilds the string with the current (animating) number values.
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
