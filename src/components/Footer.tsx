import { Link } from 'react-router-dom';
import { Cpu, Mail, Heart, Github, Twitter, Rss } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-surface-900 to-surface-950 text-surface-300">
      {/* Top gradient bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand — spans 2 cols */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-primary-600 flex items-center justify-center shadow-glow-purple group-hover:shadow-glow-purple-lg transition-shadow">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg gradient-text-blue">Kunsmatige</span>
                <span className="font-bold text-lg text-white -mt-0.5">Intelligensie</span>
              </div>
            </Link>

            <p className="text-surface-400 text-sm leading-relaxed mb-6 max-w-xs">
              Die bron van alles KI in Afrikaans. Ons missie is om kunsmatige intelligensie
              toeganklik te maak vir elke Afrikaanssprekende.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="mailto:hallo@kunsmatigeintelligensie.co.za"
                aria-label="E-pos"
                className="p-2.5 rounded-lg bg-surface-800 hover:bg-purple-900/50 hover:text-purple-400 transition-all"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="p-2.5 rounded-lg bg-surface-800 hover:bg-purple-900/50 hover:text-purple-400 transition-all"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter / X"
                className="p-2.5 rounded-lg bg-surface-800 hover:bg-purple-900/50 hover:text-purple-400 transition-all"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="RSS-voer"
                className="p-2.5 rounded-lg bg-surface-800 hover:bg-purple-900/50 hover:text-purple-400 transition-all"
              >
                <Rss className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Vinnige skakels
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/begin-hier', label: 'Begin hier' },
                { to: '/artikels', label: 'Alle artikels' },
                { to: '/woordeboek', label: 'Woordeboek' },
                { to: '/oor-ons', label: 'Oor ons' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-purple-400 transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Kategorieë
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/kategorie/verstaan', label: 'Verstaan KI' },
                { to: '/kategorie/gebruik', label: 'Gebruik KI' },
                { to: '/kategorie/nuus', label: 'Nuus & Ontwikkelings' },
                { to: '/kategorie/etiek', label: 'Etiek & Geloof' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Bly op hoogte
            </h3>
            <p className="text-sm text-surface-400 mb-4 leading-relaxed">
              Kry die nuutste KI-nuus in Afrikaans direk in jou inkassie.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="jou@epos.co.za"
                className="px-3 py-2.5 rounded-lg bg-surface-800 border border-surface-700 text-sm text-surface-200 placeholder-surface-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-primary-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-primary-500 transition-all"
              >
                Teken in
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-surface-500">
            © {new Date().getFullYear()} kunsmatigeintelligensie.co.za. Alle regte voorbehou.
          </p>
          <p className="text-sm text-surface-500 flex items-center gap-1.5">
            Gemaak met
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
            vir die Afrikaanse gemeenskap
          </p>
        </div>
      </div>
    </footer>
  );
}
