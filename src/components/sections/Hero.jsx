// Hero: centered layout — status pill, avatar with a gradient glow ring,
// gradient headline, subline, CTA buttons and social icon links.
// Content comes from src/data/profile.js.
import Button from '../ui/Button';
import Container from '../ui/Container';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import ScriptName from '../ui/ScriptName';
import SmartImage from '../ui/SmartImage';
import { profile } from '../../data/profile';
import { socialLinks } from '../../data/links';

export default function Hero() {
  return (
    <section id="top" className="pb-24 pt-36 sm:pt-44">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Status pill */}
          <Reveal>
            <span className="label glass-card inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-muted">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-ok" />
              </span>
              Open to work
            </span>
          </Reveal>

          {/* Avatar with gradient ring + glow (floats gently, blurs in) */}
          <Reveal delay={80} variant="blur">
            <div className="float-soft relative mt-10">
              <div
                className="absolute -inset-3 rounded-full bg-accent-soft blur-2xl"
                aria-hidden="true"
              />
              <div className="gradient-bg relative rounded-full p-1 shadow-soft">
                <div className="rounded-full bg-page p-1.5">
                  <SmartImage
                    src={profile.photo}
                    alt={profile.photoAlt}
                    width={480}
                    height={600}
                    priority
                    srcSetWidths={[360]}
                    sizes="(min-width: 640px) 192px, 160px"
                    fallbackLabel="Photo coming soon"
                    className="size-40 rounded-full object-cover sm:size-48"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Name + role */}
          <Reveal delay={140}>
            <p className="mt-8 text-lg font-semibold text-muted">
              Hi, I'm <ScriptName size="lg" className="text-ink" />
            </p>
          </Reveal>

          {/* Gradient headline */}
          <Reveal delay={200}>
            <h1 className="gradient-text gradient-pan mt-3 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {profile.headline}
            </h1>
          </Reveal>

          {/* Subline */}
          <Reveal delay={260}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.subline}</p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href="#projects" size="lg" icon="arrowRight">
                View my work
              </Button>
              <Button href="#contact" size="lg" variant="secondary">
                Contact me
              </Button>
              <Button
                href={profile.cvFile}
                size="lg"
                variant="secondary"
                icon="download"
                download
              >
                Download CV
              </Button>
            </div>
          </Reveal>

          {/* Socials */}
          <Reveal delay={380}>
            <ul className="mt-10 flex items-center gap-3" aria-label="Social links">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    aria-label={link.label}
                    className="glass-card flex size-11 items-center justify-center rounded-full text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent hover:glow"
                  >
                    <Icon name={link.icon} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Location */}
          <Reveal delay={440}>
            <p className="label mt-10 flex items-center gap-2 text-muted">
              <Icon name="mapPin" className="size-3.5 text-accent" />
              {profile.location}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
