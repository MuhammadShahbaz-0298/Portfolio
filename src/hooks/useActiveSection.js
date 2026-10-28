// useActiveSection: scroll-spy for the navbar. Pass the section ids
// (from src/data/navigation.js) and it returns the id of the section
// currently in the reading zone. Scroll-based (not IntersectionObserver)
// so it works with smooth anchor scrolling too.
import { useEffect, useState } from 'react';

// Matches the scroll-padding-top in styles/index.css (navbar clearance).
const READ_OFFSET = 140;

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    let frame = 0;

    const readActive = () => {
      const scrollLine = window.scrollY + READ_OFFSET;
      // '' while still in the hero (its section id is not in the navbar).
      let current = '';

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollLine) current = id;
      });

      // The last section whose top passed the reading line wins
      // (stays active through the footer).
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
