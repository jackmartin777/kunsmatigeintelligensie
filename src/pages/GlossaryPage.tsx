import { useState, useMemo } from 'react';
import { SEO } from '../components/SEO';
import { TermCard } from '../components/TermCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getAllTerms } from '../lib/content';

export function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const allTerms = getAllTerms();

  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return allTerms;

    const query = searchQuery.toLowerCase();
    return allTerms.filter(
      (term) =>
        term.term.toLowerCase().includes(query) ||
        term.shortDefinition.toLowerCase().includes(query)
    );
  }, [allTerms, searchQuery]);

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof filteredTerms> = {};

    filteredTerms.forEach((term) => {
      const firstLetter = term.term[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(term);
    });

    return groups;
  }, [filteredTerms]);

  const letters = Object.keys(groupedTerms).sort((a, b) =>
    a.localeCompare(b, 'af')
  );

  return (
    <>
      <SEO
        title="KI Woordeboek"
        description="'n Volledige Afrikaanse woordeboek van kunsmatige intelligensie terme - van A tot Z."
        canonical="/woordeboek"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Woordeboek' }]} />

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
            KI Woordeboek
          </h1>
          <p className="text-lg text-surface-600 max-w-2xl">
            Alle KI-terme verduidelik in eenvoudige Afrikaans. Van "agent" tot "tokens"
            - vind die definisie wat jy soek.
          </p>
        </header>

        {/* Search */}
        <div className="mb-8 max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Soek 'n term..."
            className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
          />
        </div>

        {/* Letter navigation */}
        <nav className="mb-8 flex flex-wrap gap-2">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-8 h-8 rounded-lg bg-surface-100 text-surface-700 font-medium flex items-center justify-center hover:bg-primary-100 hover:text-primary-700 transition-colors"
            >
              {letter}
            </a>
          ))}
        </nav>

        {/* Results count */}
        <p className="text-sm text-surface-500 mb-6">
          {filteredTerms.length} term{filteredTerms.length !== 1 && 'e'} gevind
        </p>

        {/* Terms grouped by letter */}
        {filteredTerms.length > 0 ? (
          <div className="space-y-12">
            {letters.map((letter) => (
              <section key={letter} id={`letter-${letter}`}>
                <h2 className="text-2xl font-bold text-surface-900 mb-4 pb-2 border-b border-surface-200">
                  {letter}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {groupedTerms[letter].map((term) => (
                    <TermCard key={term.slug} term={term} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-surface-50 rounded-xl">
            <p className="text-surface-600">
              Geen terme gevind vir "{searchQuery}" nie.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Wis soektog
            </button>
          </div>
        )}
      </div>
    </>
  );
}
