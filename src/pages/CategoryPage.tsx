import { useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArticleCard } from '../components/ArticleCard';
import { getArticlesByCategory } from '../lib/content';
import { CATEGORIES } from '../types/content';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? CATEGORIES[slug] : undefined;
  const articles = slug ? getArticlesByCategory(slug) : [];

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-surface-900 mb-4">
          Kategorie nie gevind nie
        </h1>
        <p className="text-surface-600">
          Die kategorie wat jy soek, bestaan nie.
        </p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={category.title}
        description={category.description}
        canonical={`/kategorie/${slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: category.title }]} />

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
            {category.title}
          </h1>
          <p className="text-lg text-surface-600 max-w-2xl">
            {category.description}
          </p>
        </header>

        {/* Articles */}
        {articles.length > 0 ? (
          <>
            <p className="text-sm text-surface-500 mb-6">
              {articles.length} artikel{articles.length !== 1 && 's'}
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-surface-50 rounded-xl">
            <p className="text-surface-600">
              Daar is nog geen artikels in hierdie kategorie nie.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
