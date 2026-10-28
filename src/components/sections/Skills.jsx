// Skills: a scrolling marquee of glass chips (pauses on hover, stops for
// reduced-motion users). To add a skill, copy one line in src/data/skills.js.
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import { skillList } from '../../data/skills';

function SkillChips() {
  return (
    <>
      {skillList.map((skill) => (
        <span
          key={skill.id}
          className="glass-card mx-2 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:text-accent"
        >
          {skill.name}
        </span>
      ))}
    </>
  );
}

export default function Skills() {
  return (
    <Section id="skills">
      <Reveal>
        <SectionHeading
          eyebrow="My toolkit"
          title="Tools I work with"
          description="The technologies I use every day to ship fast, clean interfaces."
        />
      </Reveal>

      <Reveal>
        {/* Two identical rows: the animation shifts by exactly 50% for a seamless loop */}
        <div className="marquee relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="marquee-track">
            <div className="flex py-1">
              <SkillChips />
            </div>
            <div className="flex py-1" aria-hidden="true">
              <SkillChips />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
