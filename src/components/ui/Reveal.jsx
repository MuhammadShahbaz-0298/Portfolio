// Reveal: wraps any content and fades it in the first time it scrolls into
// view. Pass delay (ms) for a gentle stagger and pick how it enters:
//   variant: 'up' (default) | 'left' | 'right' | 'scale' | 'blur'
// Motion is skipped entirely for users with prefers-reduced-motion
// (see useReveal / index.css).
import { useReveal } from '../../hooks/useReveal';

export default function Reveal({ children, className = '', delay = 0, variant = 'up' }) {
  const elementRef = useReveal();
  const delayStyle = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;
  const variantClass = variant === 'up' ? '' : `reveal-${variant}`;

  return (
    <div ref={elementRef} className={`reveal ${variantClass} ${className}`} style={delayStyle}>
      {children}
    </div>
  );
}
