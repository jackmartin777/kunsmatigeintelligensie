import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Brain } from 'lucide-react';

const navItems = [
  { to: '/begin-hier', label: 'Begin hier' },
  {
    label: 'Verstaan KI',
    to: '/kategorie/verstaan',
  },
  {
    label: 'Gebruik KI',
    to: '/kategorie/gebruik',
  },
  {
    label: 'Nuus',
    to: '/kategorie/nuus',
  },
  {
    label: 'Etiek & Geloof',
    to: '/kategorie/etiek',
  },
  { to: '/woordeboek', label: 'Woordeboek' },
  { to: '/oor-ons', label: 'Oor ons' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-surface-900 hover:text-primary-600 transition-colors"
          >
            <Brain className="h-8 w-8 text-primary-600" />
            <span className="font-semibold text-lg hidden sm:block">
              Kunsmatige Intelligensie
            </span>
            <span className="font-semibold text-lg sm:hidden">KI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100"
            aria-label={isOpen ? 'Sluit spyskaart' : 'Open spyskaart'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-surface-200">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-surface-600 hover:bg-surface-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
