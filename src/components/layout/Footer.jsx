// Site footer: script signature, quick links, social links, copyright.
// Text comes from src/data/profile.js and src/data/navigation.js.
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
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <div className="text-center sm:text-left">
              <p className="text-ink">
                <ScriptName size="lg" />
              </p>
              <p className="mt-2 text-base text-muted">
                {profile.role} — {profile.location}
              </p>
            </div>
          </div>

          {/* Quick links + socials */}
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-14">
            <nav aria-label="Footer navigation">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted">Pages</p>
              <ul className="mt-3 space-y-2">
                {navigationLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-base text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted">Elsewhere</p>
              <ul className="mt-3 space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="inline-flex items-center gap-2 text-base text-muted transition-colors hover:text-accent"
                    >
                      <Icon name={link.icon} className="size-5" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-center text-sm text-muted">
          © {currentYear} <ScriptName size="xs" />. Built with React and Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}
