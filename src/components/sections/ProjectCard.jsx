// ProjectCard: one project from src/data/projects.js.
// featured: true  -> glass card with the screenshot on top (2-column grid)
// featured: false -> compact glass card with a small thumbnail
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import SmartImage from '../ui/SmartImage';

export default function ProjectCard({ project, index }) {
  const { title, summary, stack, image, liveUrl, githubUrl, featured } = project;
  const number = `P.${String(index).padStart(2, '0')}`;

  const stackList = (
    <ul className="flex flex-wrap gap-2" aria-label={`${title} tech stack`}>
      {stack.map((technology) => (
        <li key={technology}>
          <Badge>{technology}</Badge>
        </li>
      ))}
    </ul>
  );

  const links = (
    // mt-auto: in flex cards the buttons sit on a shared bottom line
    <div className="mt-auto flex flex-wrap gap-3 pt-6">
      {liveUrl && (
        <Button href={liveUrl} icon="arrowUpRight">
          Live
        </Button>
      )}
      {githubUrl && (
        <Button href={githubUrl} variant="secondary" icon="github">
          GitHub
        </Button>
      )}
    </div>
  );

  if (!featured) {
    return (
      <Card hover padding="none" className="h-full overflow-hidden">
        <div className="grid gap-6 p-6 sm:grid-cols-[12rem_1fr] sm:items-center sm:p-8">
          {image && (
            <div className="rounded-xl border border-line bg-page/50 p-1.5">
              <SmartImage
                src={image}
                alt={`${title} repository screenshot`}
                width={400}
                height={250}
                fallbackLabel={title}
                className="aspect-[16/10] w-full rounded-lg object-cover"
              />
            </div>
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">{number}</p>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-ink">{title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{summary}</p>
            <div className="mt-4">{stackList}</div>
            {links}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card hover padding="none" className="flex h-full flex-col overflow-hidden">
      {/* Screenshot */}
      <div className="border-b border-line bg-page/50 p-1.5">
        <SmartImage
          src={image}
          alt={`${title} app screenshot`}
          width={800}
          height={500}
          fallbackLabel={`${title} screenshot`}
          className="aspect-[16/10] w-full rounded-xl object-cover"
        />
      </div>

      {/* Details grow so both cards end level and buttons share a baseline */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-bold tracking-tight text-ink">{title}</h3>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            {number}
          </span>
        </div>
        <p className="mt-2 leading-relaxed text-muted">{summary}</p>
        <div className="mt-4">{stackList}</div>
        {links}
      </div>
    </Card>
  );
}
