// Floating pill navbar (the standard modern look): glass capsule with the
// logo mark, mono-free anchor links, theme toggle and a gradient CTA.
// Links come from src/data/navigation.js so the menu can never disagree
// with the sections that exist on the page.
import { useState } from 'react';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import ScriptName from '../ui/ScriptName';
import ThemeToggle from '../ui/ThemeToggle';
import { navigationLinks } from '../../data/navigation';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';

// Section ids from the link list (module scope: stable for the hook).
const sectionIds = navigationLinks.map((link) => link.href.slice(1));

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSectionId = useActiveSection(sectionIds);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      {/* The pill */}
      <div className="glass-card mx-auto flex w-full max-w-3xl items-center justify-between rounded-full py-2 pl-5 pr-2">
        {/* Brand: the handwritten signature (no image, no monogram) */}
        <a href="#top" onClick={closeMenu} className="flex items-center text-ink">
          <ScriptName />
        </a>

        {/* Desktop links (active section is highlighted while scrolling) */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {navigationLinks.map((link) => {
            const isActive = link.id === activeSectionId;
            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:text-ink ${
                  isActive ? 'bg-accent-soft text-ink' : 'text-muted hover:bg-accent-soft'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Theme toggle + menu button */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Wrapper owns show/hide: Button's own inline-flex can't be hidden reliably */}
          <span className="hidden md:inline-flex">
            <Button href={`mailto:${profile.email}`}>Hire me</Button>
          </span>
          <button
            type="button"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            className="rounded-full border border-line p-2 text-muted transition-colors hover:border-accent/50 hover:text-accent md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={isMenuOpen ? 'close' : 'menu'} className="size-4" />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="glass-card mx-auto mt-2 max-w-3xl rounded-2xl p-2 md:hidden"
        >
          {navigationLinks.map((link) => {
            const isActive = link.id === activeSectionId;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={closeMenu}
                aria-current={isActive ? 'true' : undefined}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:text-ink ${
                  isActive ? 'bg-accent-soft text-ink' : 'text-muted hover:bg-accent-soft'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
