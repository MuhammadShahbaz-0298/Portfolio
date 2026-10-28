// Site footer: centered script signature (the focal point), quick links,
// social links, copyright. Text comes from src/data/profile.js and
// src/data/navigation.js — edit those, not this file.
import Container from '../ui/Container';
import Icon from '../ui/Icon';
import ScriptName from '../ui/ScriptName';
import { navigationLinks } from '../../data/navigation';
import { socialLinks } from '../../data/links';
import { profile } from '../../data/profile';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-12">
      <Container>
        {/* Brand: the signature, centered, with a one-line tagline */}
        <div className="flex flex-col items-center text-center">
          <ScriptName size="lg" className="text-ink" />
          <p className="mt-4 text-sm font-semibold text-ink">
            {profile.role} — {profile.location}
          </p>
          <p className="mt-2 max-w-md text-sm text-muted">{profile.headline}</p>
        </div>

        {/* Quick links + socials, centered under the brand */}
        <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center sm:gap-16">
          <nav aria-label="Footer navigation" className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Pages
            </p>
            <ul className="mt-3 space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Elsewhere
            </p>
            <ul className="mt-3 space-y-2">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                  >
                    <Icon name={link.icon} className="size-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-center text-sm text-muted">
          © {currentYear} <ScriptName size="xs" />. Built with React and Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}
