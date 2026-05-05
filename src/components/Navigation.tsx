import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Cpu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { to: '/begin-hier', label: 'Begin hier' },
  { label: 'Verstaan KI', to: '/kategorie/verstaan' },
  { label: 'Gebruik KI', to: '/kategorie/gebruik' },
  { label: 'Nuus', to: '/kategorie/nuus' },
  { label: 'Etiek & Geloof', to: '/kategorie/etiek' },
  { to: '/woordeboek', label: 'Woordeboek' },
  { to: '/oor-ons', label: 'Oor ons' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-900/90 backdrop-blur-md border-b border-surface-200 dark:border-surface-800 transition-colors">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-surface-900 dark:text-white hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-primary-600 flex items-center justify-center shadow-glow-purple">
                <Cpu className="h-4.5 w-4.5 text-white" style={{ width: '1.1rem', height: '1.1rem' }} />
              </div>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-bold text-base gradient-text-blue">Kunsmatige</span>
              <span className="font-bold text-base text-surface-700 dark:text-surface-300 -mt-0.5">Intelligensie</span>
            </div>
            <span className="font-bold text-lg sm:hidden gradient-text-blue">KI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300'
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right side: theme toggle + mobile button */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              aria-label={isOpen ? 'Sluit spyskaart' : 'Open spyskaart'}
              aria-expanded={isOpen}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                    isOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                  }`}
                >
                  <X className="h-6 w-6" />
                </span>
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                    isOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
                  }`}
                >
                  <Menu className="h-6 w-6" />
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-3 border-t border-surface-200 dark:border-surface-800 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300'
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
