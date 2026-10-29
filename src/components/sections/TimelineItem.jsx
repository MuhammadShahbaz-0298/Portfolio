import { useReveal } from '../../hooks/useReveal';

export default function TimelineItem({ item, index = 0 }) {
  const { role, company, location, period, highlights } = item;
  const revealRef = useReveal();
  const delayStyle = index > 0 ? { transitionDelay: `${index * 120}ms` } : undefined;

  return (
    <li ref={revealRef} className="reveal reveal-right relative pl-10" style={delayStyle}>
      <span
        className="absolute -left-1.5 top-2 block size-3 rounded-full bg-accent shadow-[0_0_0_4px_var(--page),0_0_18px_var(--glow)]"
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
          {period}
        </span>
        <span className="text-sm text-muted">{location}</span>
      </div>

      <div className="glass-card mt-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_2px_4px_rgb(0_0_0/0.2),0_24px_64px_rgb(0_0_0/0.5),inset_0_1px_0_var(--card-top),0_0_60px_var(--glow)]">
        <h3 className="text-lg font-bold tracking-tight text-ink">{role}</h3>
        <p className="mt-1 text-sm font-semibold text-accent">{company}</p>

        <ul className="mt-4 space-y-2">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
