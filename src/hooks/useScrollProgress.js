// useScrollProgress: returns a number 0 → 1 for how far the page has been
// scrolled. Drives the gradient reading-progress bar. Listens passively and
// skips redundant updates so scrolling stays smooth (no animation libraries).
import { useEffect, useState } from 'react';

const readProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 1;
  return Math.min(1, Math.max(0, window.scrollY / scrollable));
};

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setProgress(readProgress());
        frame = 0;
      });
    };

    setProgress(readProgress());
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return progress;
}
