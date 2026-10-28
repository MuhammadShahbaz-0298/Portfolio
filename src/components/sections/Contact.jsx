// Contact: big glass panel with the classic "Let's build something." call,
// the email as the primary gradient CTA plus a one-click "copy email"
// button (with "Copied!" feedback), and LinkedIn/GitHub buttons.
// No form and no backend — email is the fastest channel.
import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import { profile } from '../../data/profile';
import { contactLinks } from '../../data/links';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    // Modern clipboard API first; fallback keeps it working in older browsers.
    let copiedOk = false;
    try {
      await navigator.clipboard.writeText(profile.email);
      copiedOk = true;
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = profile.email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      copiedOk = document.execCommand('copy');
      textarea.remove();
    }

    if (copiedOk) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Section id="contact" background="surface">
      <Reveal>
        <Card padding="lg" className="relative mx-auto max-w-3xl overflow-hidden text-center">
          {/* Soft glow inside the panel */}
          <div
            className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-accent-soft blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something."
              description={`${profile.availability}.`}
            />

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={`mailto:${profile.email}`} size="lg" icon="mail">
                Email me
              </Button>
              {contactLinks.map((link) => (
                <Button
                  key={link.id}
                  href={link.href}
                  size="lg"
                  variant="secondary"
                  icon={link.icon}
                >
                  {link.label}
                </Button>
              ))}
            </div>

            {/* Direct email + one-click copy */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                <Icon name="mail" className="size-4" />
                <span className="break-all font-mono text-sm">{profile.email}</span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-live="polite"
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  copied
                    ? 'border-ok/50 bg-accent-soft text-ok'
                    : 'border-line text-muted hover:border-accent/50 hover:text-accent'
                }`}
              >
                <Icon name={copied ? 'check' : 'copy'} className="size-3.5" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
