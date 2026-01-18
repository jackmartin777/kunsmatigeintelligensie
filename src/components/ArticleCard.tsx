import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { Article } from '../types/content';
import { CATEGORIES } from '../types/content';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

/**
 * Render an article card in either a featured (prominent) or compact layout.
 *
 * Displays the article's category badge, formatted publication date, title, description,
 * and optional reading time; links navigate to category and article routes.
 *
 * @param article - The article to display. Uses `category`, `date`, `slug`, `title`, `description`, and optional `readingTime`.
 * @param featured - When `true`, renders the larger featured layout; otherwise renders the compact layout.
 * @returns A JSX element representing the article card.
 */
export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const category = CATEGORIES[article.category];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('af-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (featured) {
    return (
      <article className="group bg-white rounded-2xl shadow-sm border border-surface-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to={`/kategorie/${article.category}`}
              className="px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
            >
              {category?.title || article.category}
            </Link>
            <span className="flex items-center gap-1 text-sm text-surface-500">
              <Calendar className="h-4 w-4" />
              {formatDate(article.date)}
            </span>
          </div>

          <Link to={`/artikels/${article.slug}`}>
            <h2 className="text-2xl font-bold text-surface-900 mb-3 group-hover:text-primary-600 transition-colors">
              {article.title}
            </h2>
          </Link>

          <p className="text-surface-600 mb-4 line-clamp-3">{article.description}</p>

          <div className="flex items-center justify-between">
            {article.readingTime && (
              <span className="flex items-center gap-1 text-sm text-surface-500">
                <Clock className="h-4 w-4" />
                {article.readingTime} min lees
              </span>
            )}
            <Link
              to={`/artikels/${article.slug}`}
              className="flex items-center gap-1 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              Lees meer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-xl shadow-sm border border-surface-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <Link
          to={`/kategorie/${article.category}`}
          className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
        >
          {category?.title || article.category}
        </Link>
      </div>

      <Link to={`/artikels/${article.slug}`}>
        <h3 className="font-semibold text-surface-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
      </Link>

      <p className="text-sm text-surface-600 mb-3 line-clamp-2">
        {article.description}
      </p>

      <div className="flex items-center justify-between text-sm text-surface-500">
        <span>{formatDate(article.date)}</span>
        {article.readingTime && <span>{article.readingTime} min</span>}
      </div>
    </article>
  );
}