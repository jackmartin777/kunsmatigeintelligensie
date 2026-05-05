import { useState, useMemo } from 'react';
import { Search as SearchIcon } from 'lucide-react';
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

  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof filteredTerms> = {};
    filteredTerms.forEach((term) => {
      const firstLetter = term.term[0].toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const letters = Object.keys(groupedTerms).sort((a, b) => a.localeCompare(b, 'af'));

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
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
            KI <span className="gradient-text-blue">Woordeboek</span>
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl">
            Alle KI-terme verduidelik in eenvoudige Afrikaans. Van "agent" tot "tokens" —
            vind die definisie wat jy soek.
          </p>
        </header>

        {/* Search */}
        <div className="mb-8 max-w-xl relative">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400 dark:text-surface-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Soek 'n term..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Letter navigation */}
        <nav className="mb-8 flex flex-wrap gap-2" aria-label="Alfabet-navigasie">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-9 h-9 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 font-semibold flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:text-purple-700 dark:hover:text-purple-300 transition-all text-sm"
            >
              {letter}
            </a>
          ))}
        </nav>

        <p className="text-sm text-surface-500 dark:text-surface-500 mb-6">
          {filteredTerms.length} term{filteredTerms.length !== 1 && 'e'} gevind
        </p>

        {filteredTerms.length > 0 ? (
          <div className="space-y-12">
            {letters.map((letter) => (
              <section key={letter} id={`letter-${letter}`}>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4 pb-2 border-b border-surface-200 dark:border-surface-700">
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
          <div className="text-center py-12 bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
            <p className="text-surface-600 dark:text-surface-400">
              Geen terme gevind vir "{searchQuery}" nie.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-purple-600 dark:text-purple-400 hover:text-purple-700 font-medium"
            >
              Wis soektog
            </button>
          </div>
        )}
      </div>
    </>
  );
}
