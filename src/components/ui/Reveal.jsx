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
