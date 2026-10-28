// Experience: stats cards on top (each counts up + scales in with a stagger),
// then the jobs on a gradient timeline (each job slides in as you reach it).
// To add a job or a stat, edit src/data/experience.js — nothing here.
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import StatCard from '../ui/StatCard';
import TimelineItem from './TimelineItem';
import { experienceList, experienceStats } from '../../data/experience';

export default function Experience() {
  return (
    <Section id="experience" background="surface">
      <Reveal>
        <SectionHeading
          eyebrow="My journey"
          title="Where I've worked"
          description="Results from client work, product teams and the classroom."
        />
      </Reveal>

      {/* Stats: one Reveal per card for a staggered pop-in */}
      <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {experienceStats.map((stat, index) => (
          <Reveal key={stat.id} delay={index * 90} variant="scale">
            <StatCard value={stat.value} label={stat.label} />
          </Reveal>
        ))}
      </div>

      {/* Gradient timeline (each item reveals itself with its own delay) */}
      <ol className="relative mx-auto mt-14 max-w-3xl space-y-8 before:absolute before:inset-y-0 before:-left-px before:w-px before:bg-gradient-to-b before:from-accent/60 before:via-accent/25 before:to-transparent">
        {experienceList.map((item, index) => (
          <TimelineItem key={item.id} item={item} index={index} />
        ))}
      </ol>
    </Section>
  );
}
