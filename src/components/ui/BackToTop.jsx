// BackToTop: floating glass button that fades in after you scroll down and
// smooth-scrolls back to the top. Show/hide classes live in styles/index.css.
import Icon from './Icon';
import { useScrolledPast } from '../../hooks/useScrolledPast';

export default function BackToTop() {
  const isVisible = useScrolledPast(600);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`back-to-top glass-card fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full text-muted transition-all duration-200 hover:border-accent/50 hover:text-accent hover:glow ${
        isVisible ? 'is-visible' : ''
      }`}
      aria-label="Back to top"
      // Hidden from tab order until it appears on screen.
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
    >
      <Icon name="arrowUp" className="size-5" />
    </button>
  );
}
