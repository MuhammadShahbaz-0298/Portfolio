// Badge: glass pill for tech stack and short labels.
// variant: 'glass' (default) | 'accent' (gradient-tinted)
export default function Badge({ children, variant = 'glass', className = '' }) {
  const variantClasses =
    variant === 'accent'
      ? 'border border-accent/40 bg-accent-soft text-accent'
      : 'border border-line bg-card text-muted backdrop-blur-xl';

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}
