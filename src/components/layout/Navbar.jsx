import { useState } from 'react';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import ScriptName from '../ui/ScriptName';
import ThemeToggle from '../ui/ThemeToggle';
import { navigationLinks } from '../../data/navigation';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';

const sectionIds = navigationLinks.map((link) => link.href.slice(1));

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSectionId = useActiveSection(sectionIds);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-[calc(env(safe-area-inset-top)+1.5rem)] z-50 px-4 md:top-4">
      <div className="glass-card mx-auto flex w-full max-w-3xl items-center justify-between rounded-full py-2 pl-5 pr-2">
        <a href="#top" onClick={closeMenu} className="flex items-center text-ink">
          <ScriptName />
        </a>

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

        <div className="flex items-center gap-2">
          <ThemeToggle />
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
