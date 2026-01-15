import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-white mb-4">
              <Brain className="h-8 w-8 text-primary-400" />
              <span className="font-semibold text-xl">Kunsmatige Intelligensie</span>
            </Link>
            <p className="text-surface-400 max-w-md">
              Die bron van alles KI in Afrikaans. Ons missie is om kunsmatige intelligensie
              toeganklik te maak vir elke Afrikaanssprekende.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Vinnige skakels</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/begin-hier" className="hover:text-white transition-colors">
                  Begin hier
                </Link>
              </li>
              <li>
                <Link to="/artikels" className="hover:text-white transition-colors">
                  Alle artikels
                </Link>
              </li>
              <li>
                <Link to="/woordeboek" className="hover:text-white transition-colors">
                  Woordeboek
                </Link>
              </li>
              <li>
                <Link to="/oor-ons" className="hover:text-white transition-colors">
                  Oor ons
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4">Kategorieë</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/kategorie/verstaan"
                  className="hover:text-white transition-colors"
                >
                  Verstaan KI
                </Link>
              </li>
              <li>
                <Link
                  to="/kategorie/gebruik"
                  className="hover:text-white transition-colors"
                >
                  Gebruik KI
                </Link>
              </li>
              <li>
                <Link
                  to="/kategorie/nuus"
                  className="hover:text-white transition-colors"
                >
                  Nuus & Ontwikkelings
                </Link>
              </li>
              <li>
                <Link
                  to="/kategorie/etiek"
                  className="hover:text-white transition-colors"
                >
                  Etiek & Geloof
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-surface-500">
            © {new Date().getFullYear()} kunsmatigeintelligensie.co.za. Alle regte voorbehou.
          </p>
          <p className="text-sm text-surface-500">
            Gemaak met sorg vir die Afrikaanse gemeenskap.
          </p>
        </div>
      </div>
    </footer>
  );
}
