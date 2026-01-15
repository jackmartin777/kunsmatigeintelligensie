import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Sparkles, GraduationCap } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Search } from '../components/Search';
import { ArticleCard } from '../components/ArticleCard';
import { TermCard } from '../components/TermCard';
import { getFeaturedArticles, getFeaturedTerms } from '../lib/content';

export function HomePage() {
  const featuredArticles = getFeaturedArticles(3);
  const featuredTerms = getFeaturedTerms(6);

  return (
    <>
      <SEO canonical="/" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 mb-6 animate-fade-in">
              Die tuiste van kunsmatige intelligensie{' '}
              <span className="text-primary-600">in Afrikaans</span>
            </h1>
            <p className="text-lg sm:text-xl text-surface-600 mb-8 animate-slide-up">
              Verstaan KI sonder die jargon. Leer hoe om dit veilig en effektief te
              gebruik. Verken die etiese vrae wat dit bring.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto mb-8">
              <Search />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/begin-hier"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <GraduationCap className="h-5 w-5" />
                Begin hier
              </Link>
              <Link
                to="/artikels/wat-is-kunsmatige-intelligensie"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-surface-700 font-semibold border border-surface-200 hover:bg-surface-50 transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                Wat is KI?
              </Link>
              <Link
                to="/woordeboek"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-surface-700 font-semibold border border-surface-200 hover:bg-surface-50 transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen className="h-5 w-5" />
                Woordeboek
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900">
              Nuutste artikels
            </h2>
            <Link
              to="/artikels"
              className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1"
            >
              Sien alles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Terms */}
      <section className="py-16 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900">
              Gewilde terme
            </h2>
            <Link
              to="/woordeboek"
              className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1"
            >
              Vol woordeboek
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTerms.map((term) => (
              <TermCard key={term.slug} term={term} compact />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-8 text-center">
            Verken ons onderwerpe
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/kategorie/verstaan"
              className="group p-6 rounded-xl bg-gradient-to-br from-blue-50 to-primary-50 border border-blue-100 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg text-surface-900 mb-2 group-hover:text-primary-600 transition-colors">
                Verstaan KI
              </h3>
              <p className="text-surface-600 text-sm">
                Leer die grondbeginsels van kunsmatige intelligensie.
              </p>
            </Link>

            <Link
              to="/kategorie/gebruik"
              className="group p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg text-surface-900 mb-2 group-hover:text-primary-600 transition-colors">
                Gebruik KI
              </h3>
              <p className="text-surface-600 text-sm">
                Praktiese gidse om KI in jou lewe te gebruik.
              </p>
            </Link>

            <Link
              to="/kategorie/nuus"
              className="group p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg text-surface-900 mb-2 group-hover:text-primary-600 transition-colors">
                Nuus & Ontwikkelings
              </h3>
              <p className="text-surface-600 text-sm">
                Bly op hoogte van die nuutste KI-ontwikkelings.
              </p>
            </Link>

            <Link
              to="/kategorie/etiek"
              className="group p-6 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg text-surface-900 mb-2 group-hover:text-primary-600 transition-colors">
                Etiek & Geloof
              </h3>
              <p className="text-surface-600 text-sm">
                Besinning oor KI se impak op ons waardes.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
