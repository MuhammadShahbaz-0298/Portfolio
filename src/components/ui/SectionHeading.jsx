export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <span className="label glass-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-muted">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
