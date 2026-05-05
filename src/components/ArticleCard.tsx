import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { Article } from '../types/content';
import { CATEGORIES } from '../types/content';

const categoryAccent: Record<string, { bar: string; badge: string; darkBadge: string }> = {
  verstaan: {
    bar: 'from-primary-500 to-blue-500',
    badge: 'bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300',
    darkBadge: '',
  },
  gebruik: {
    bar: 'from-emerald-500 to-teal-500',
    badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    darkBadge: '',
  },
  nuus: {
    bar: 'from-amber-500 to-orange-500',
    badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    darkBadge: '',
  },
  etiek: {
    bar: 'from-purple-500 to-violet-500',
    badge: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
    darkBadge: '',
  },
};

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const category = CATEGORIES[article.category];
  const accent = categoryAccent[article.category] ?? categoryAccent.verstaan;

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
      <article className="group gradient-border bg-white dark:bg-surface-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
        {/* Category accent stripe */}
        <div className={`h-1 w-full bg-gradient-to-r ${accent.bar}`} />

        <div className="p-6 sm:p-8 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Link
              to={`/kategorie/${article.category}`}
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${accent.badge} hover:opacity-80 transition-opacity`}
            >
              {category?.title || article.category}
            </Link>
            <span className="flex items-center gap-1 text-sm text-surface-400 dark:text-surface-500">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(article.date)}
            </span>
          </div>

          <Link to={`/artikels/${article.slug}`} className="flex-1">
            <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-primary-600 transition-all line-clamp-2">
              {article.title}
            </h2>
          </Link>

          <p className="text-surface-600 dark:text-surface-400 mb-5 line-clamp-3 text-sm leading-relaxed flex-1">
            {article.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-surface-100 dark:border-surface-700">
            {article.readingTime && (
              <span className="flex items-center gap-1.5 text-xs text-surface-400 dark:text-surface-500">
                <Clock className="h-3.5 w-3.5" />
                {article.readingTime} min lees
              </span>
            )}
            <Link
              to={`/artikels/${article.slug}`}
              className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors ml-auto"
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
    <article className="group gradient-border bg-white dark:bg-surface-800 rounded-xl shadow-sm overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
      <div className={`h-0.5 w-full bg-gradient-to-r ${accent.bar}`} />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Link
            to={`/kategorie/${article.category}`}
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${accent.badge}`}
          >
            {category?.title || article.category}
          </Link>
          {article.readingTime && (
            <span className="text-xs text-surface-400 dark:text-surface-500 ml-auto flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readingTime} min
            </span>
          )}
        </div>

        <Link to={`/artikels/${article.slug}`}>
          <h3 className="font-semibold text-surface-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-primary-600 transition-all line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-sm text-surface-600 dark:text-surface-400 mb-3 line-clamp-2 leading-relaxed">
          {article.description}
        </p>

        <div className="flex items-center justify-between text-xs text-surface-400 dark:text-surface-500">
          <span>{formatDate(article.date)}</span>
          <Link
            to={`/artikels/${article.slug}`}
            className="flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
          >
            Lees
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
