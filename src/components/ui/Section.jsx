import Container from './Container';

export default function Section({ id, children, background = 'page', className = '' }) {
  const backgroundClass = background === 'surface' ? 'bg-surface' : '';

  return (
    <section id={id} className={`py-24 sm:py-28 ${backgroundClass} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
