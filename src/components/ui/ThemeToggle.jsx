import { useTheme } from '../../hooks/useTheme';
import Icon from './Icon';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-md border border-line p-2 text-muted transition-all duration-300 hover:rotate-90 hover:border-accent hover:text-accent active:scale-90"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Icon name={isDark ? 'sun' : 'moon'} className="size-4" />
    </button>
  );
}
