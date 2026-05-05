import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Skakel na ligmodus' : 'Skakel na donkermodus'}
      className="p-2 rounded-lg text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800 transition-colors"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
