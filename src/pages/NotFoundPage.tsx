import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

/**
 * Render a localized 404 Not Found page with metadata and user navigation.
 *
 * Renders page metadata (title and description), a prominent "404" message, guidance text,
 * links to the home page and articles search, and a back navigation button.
 *
 * @returns A React element representing the 404 not-found page with SEO metadata and navigation controls.
 */
export function NotFoundPage() {
  return (
    <>
      <SEO
        title="Bladsy nie gevind"
        description="Die bladsy wat jy soek, bestaan nie of is verskuif."
      />

      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl font-bold text-surface-200 mb-4">404</div>

          <h1 className="text-2xl font-bold text-surface-900 mb-4">
            Bladsy nie gevind nie
          </h1>

          <p className="text-surface-600 mb-8">
            Die bladsy wat jy soek, bestaan nie of is verskuif. Kyk of die URL korrek
            is, of probeer een van die skakels hieronder.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="h-5 w-5" />
              Tuisblad
            </Link>

            <Link
              to="/artikels"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-surface-700 font-semibold border border-surface-200 hover:bg-surface-50 transition-colors flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              Soek artikels
            </Link>
          </div>

          <button
            onClick={() => window.history.back()}
            className="mt-8 text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Gaan terug
          </button>
        </div>
      </div>
    </>
  );
}