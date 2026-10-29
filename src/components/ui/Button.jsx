import Icon from './Icon';

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 active:scale-95';

const sizeClasses = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

const variantClasses = {
  primary: 'gradient-bg text-on-accent hover:glow',
  secondary: 'border border-line bg-card text-ink backdrop-blur-xl hover:border-accent/50 hover:text-accent',
  ghost: 'text-muted hover:text-accent',
};

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...rest
}) {
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  const isExternal = typeof href === 'string' && href.startsWith('http');

  const content = (
    <>
      {icon && <Icon name={icon} className="size-4" />}
      <span>{children}</span>
    </>
  );

  if (typeof href === 'string') {
    return (
      <a
        href={href}
        className={classes}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
