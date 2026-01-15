import { useState, useMemo } from 'react';
import { SEO } from '../components/SEO';
import { Search } from '../components/Search';
import { ArticleCard } from '../components/ArticleCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getAllArticles, getAllTags } from '../lib/content';
import { CATEGORIES } from '../types/content';

export function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allArticles = getAllArticles();
  const allTags = getAllTags();

  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      if (selectedCategory && article.category !== selectedCategory) return false;
      if (selectedTag && !article.tags.includes(selectedTag)) return false;
      return true;
    });
  }, [allArticles, selectedCategory, selectedTag]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
  };

  return (
    <>
      <SEO
        title="Alle artikels"
        description="Verken al ons artikels oor kunsmatige intelligensie - van basiese konsepte tot praktiese gidse."
        canonical="/artikels"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Artikels' }]} />

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
            Alle artikels
          </h1>
          <p className="text-lg text-surface-600 max-w-2xl">
            Verken ons volledige versameling artikels oor kunsmatige intelligensie.
          </p>
        </header>

        {/* Search */}
        <div className="mb-8 max-w-xl">
          <Search />
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Category filters */}
          <div>
            <h2 className="text-sm font-medium text-surface-700 mb-2">Kategorieë</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(CATEGORIES).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === key ? null : key)
                  }
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === key
                      ? 'bg-primary-600 text-white'
                      : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tag filters */}
          <div>
            <h2 className="text-sm font-medium text-surface-700 mb-2">Etikette</h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-primary-600 text-white'
                      : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Clear filters */}
          {(selectedCategory || selectedTag) && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Verwyder alle filters
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-surface-500 mb-6">
          {filteredArticles.length} artikel{filteredArticles.length !== 1 && 's'}{' '}
          gevind
        </p>

        {/* Articles grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-surface-50 rounded-xl">
            <p className="text-surface-600">
              Geen artikels gevind met hierdie filters nie.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Verwyder filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
