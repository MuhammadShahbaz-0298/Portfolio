import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from './ProjectCard';
import { projectList } from '../../data/projects';
import { profile } from '../../data/profile';

export default function Projects() {
  const featuredProjects = projectList.filter((project) => project.featured);
  const compactProjects = projectList.filter((project) => !project.featured);

  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading
          eyebrow="My work"
          title="Projects I've built"
          description="Full-stack apps and mobile projects — live demos and source code on GitHub."
        />
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 80} variant="scale">
            <ProjectCard project={project} index={index + 1} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 space-y-8">
        {compactProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 80} variant="scale">
            <ProjectCard project={project} index={featuredProjects.length + index + 1} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12 text-center">
          <Button href={profile.github} variant="ghost" icon="arrowUpRight">
            More on GitHub
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
