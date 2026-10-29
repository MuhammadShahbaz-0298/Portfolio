import Button from '../ui/Button';
import Card from '../ui/Card';
import GitHubStats from '../ui/GitHubStats';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import { profile } from '../../data/profile';

const facts = [
  { id: 'role', label: 'Role', value: profile.role },
  { id: 'location', label: 'Location', value: profile.location },
  { id: 'availability', label: 'Availability', value: profile.availability },
];

export default function About() {
  return (
    <Section id="about" background="surface">
      <Reveal>
        <SectionHeading eyebrow="About me" title="Who I am" description={profile.about} />
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <Reveal delay={100} variant="left">
          <div className="flex h-full flex-col justify-between gap-4">
            {facts.map((fact) => (
              <div
                key={fact.id}
                className="glass-card flex items-baseline justify-between gap-6 rounded-2xl px-6 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  {fact.label}
                </p>
                <p className="text-right text-sm font-semibold text-ink">{fact.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180} variant="right">
          <Card hover className="h-full">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Let's connect
            </p>
            <p className="mt-3 text-lg font-semibold text-ink">
              You can find me on these platforms — or right in your inbox.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={profile.linkedin} variant="secondary" icon="linkedin">
                LinkedIn
              </Button>
              <Button href={profile.github} variant="secondary" icon="github">
                GitHub
              </Button>
              <Button href={`mailto:${profile.email}`} variant="secondary" icon="mail">
                Email
              </Button>
            </div>
          </Card>
        </Reveal>
      </div>

      <div className="mt-8">
        <GitHubStats username={profile.githubUsername} profileUrl={profile.github} />
      </div>
    </Section>
  );
}
