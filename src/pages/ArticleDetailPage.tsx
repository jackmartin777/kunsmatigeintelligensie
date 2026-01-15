import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArticleCard } from '../components/ArticleCard';
import { getArticleBySlug, getRelatedArticles } from '../lib/content';
import { CATEGORIES } from '../types/content';

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-surface-900 mb-4">
          Artikel nie gevind nie
        </h1>
        <p className="text-surface-600 mb-8">
          Die artikel wat jy soek, bestaan nie of is verskuif.
        </p>
        <Link
          to="/artikels"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Terug na artikels
        </Link>
      </div>
    );
  }

  const category = CATEGORIES[article.category];
  const relatedArticles = getRelatedArticles(article, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('af-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      '@type': 'Organization',
      name: 'Kunsmatige Intelligensie',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kunsmatige Intelligensie',
      url: 'https://kunsmatigeintelligensie.co.za',
    },
  };

  return (
    <>
      <SEO
        title={article.title}
        description={article.description}
        canonical={`/artikels/${article.slug}`}
        type="article"
        article={{
          publishedTime: article.date,
          tags: article.tags,
        }}
        jsonLd={jsonLd}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: 'Artikels', to: '/artikels' },
            { label: category?.title || article.category, to: `/kategorie/${article.category}` },
            { label: article.title },
          ]}
        />

        {/* Header */}
        <header className="mb-8">
          <Link
            to={`/kategorie/${article.category}`}
            className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors mb-4"
          >
            {category?.title || article.category}
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
            {article.title}
          </h1>

          <p className="text-lg text-surface-600 mb-6">{article.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-surface-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(article.date)}
            </span>
            {article.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readingTime} min lees
              </span>
            )}
          </div>
        </header>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mb-12 pt-8 border-t border-surface-200">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-surface-500" />
              <span className="text-sm font-medium text-surface-700">Etikette</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-surface-100 text-surface-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <section className="pt-8 border-t border-surface-200">
            <h2 className="text-2xl font-bold text-surface-900 mb-6">
              Lees ook
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((related) => (
                <ArticleCard key={related.slug} article={related} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
