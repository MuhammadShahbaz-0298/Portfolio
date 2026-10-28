// Card: the one frosted-glass surface (blur, hairline border, soft shadow).
// padding="md" (default), "lg" for big panels, "none" when the caller lays
// out its own padding (e.g. image frames).
// hover={true} adds the popular lift + glow effect (use on clickable cards).
const paddingClasses = {
  none: '',
  md: 'p-6',
  lg: 'p-8 sm:p-10',
};

export default function Card({ children, padding = 'md', hover = false, className = '' }) {
  const hoverClasses = hover
    ? 'transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_2px_4px_rgb(0_0_0/0.2),0_24px_64px_rgb(0_0_0/0.5),inset_0_1px_0_var(--card-top),0_0_60px_var(--glow)]'
    : '';

  return (
    <div
      className={`glass-card rounded-2xl ${paddingClasses[padding]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
