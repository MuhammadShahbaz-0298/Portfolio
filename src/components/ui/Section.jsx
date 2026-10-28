// Section: a full-width page band with an anchor id and consistent spacing.
// background="surface" gives it a slightly tinted band.
import Container from './Container';

export default function Section({ id, children, background = 'page', className = '' }) {
  // Very subtle band — cards must read as floating over one continuous page.
  const backgroundClass = background === 'surface' ? 'bg-surface' : '';

  return (
    <section id={id} className={`py-24 sm:py-28 ${backgroundClass} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
