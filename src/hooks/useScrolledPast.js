import { useEffect, useState } from 'react';

export function useScrolledPast(threshold) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      setPast(window.scrollY > threshold);
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return past;
}
