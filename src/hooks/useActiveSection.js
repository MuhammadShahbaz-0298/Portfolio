import { useEffect, useState } from 'react';

const READ_OFFSET = 140;

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    let frame = 0;

    const readActive = () => {
      const scrollLine = window.scrollY + READ_OFFSET;
      let current = '';

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollLine) current = id;
      });

      setActiveId(current);
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(readActive);
    };

    readActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sectionIds]);

  return activeId;
}
