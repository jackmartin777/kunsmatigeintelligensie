import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tag } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TermCard } from '../components/TermCard';
import { getTermBySlug, getRelatedTerms } from '../lib/content';

/**
 * Render the term detail page for the current URL slug.
 *
 * If a matching term exists, displays SEO metadata, breadcrumbs, the term title,
 * short definition, HTML content, optional tags, related terms, and a back link.
 * If no term is found, displays a centered Afrikaans not-found message with a back link to the dictionary.
 *
 * @returns The React element for the term detail view or the not-found message.
 */
export function TermDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const term = slug ? getTermBySlug(slug) : undefined;

  if (!term) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-surface-900 mb-4">
          Term nie gevind nie
        </h1>
        <p className="text-surface-600 mb-8">
          Die term wat jy soek, bestaan nie of is verskuif.
        </p>
        <Link
          to="/woordeboek"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Terug na woordeboek
        </Link>
      </div>
    );
  }

  const relatedTerms = getRelatedTerms(term);

  return (
    <>
      <SEO
        title={term.term}
        description={term.shortDefinition}
        canonical={`/woordeboek/${term.slug}`}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: 'Woordeboek', to: '/woordeboek' },
            { label: term.term },
          ]}
        />

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
            {term.term}
          </h1>

          <p className="text-lg text-surface-600 bg-primary-50 rounded-xl p-4 border-l-4 border-primary-500">
            {term.shortDefinition}
          </p>
        </header>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: term.content }}
        />

        {/* Tags */}
        {term.tags.length > 0 && (
          <div className="mb-8 pt-8 border-t border-surface-200">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-surface-500" />
              <span className="text-sm font-medium text-surface-700">Etikette</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {term.tags.map((tag) => (
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

        {/* Related terms */}
        {relatedTerms.length > 0 && (
          <section className="pt-8 border-t border-surface-200">
            <h2 className="text-2xl font-bold text-surface-900 mb-6">
              Verwante terme
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTerms.map((related) => (
                <TermCard key={related.slug} term={related} compact />
              ))}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-surface-200">
          <Link
            to="/woordeboek"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug na woordeboek
          </Link>
        </div>
      </article>
    </>
  );
}