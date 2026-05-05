import { Link } from 'react-router-dom';
import { ArrowRight, BookMarked } from 'lucide-react';
import type { GlossaryTerm } from '../types/content';

interface TermCardProps {
  term: GlossaryTerm;
  compact?: boolean;
}

export function TermCard({ term, compact = false }: TermCardProps) {
  if (compact) {
    return (
      <Link
        to={`/woordeboek/${term.slug}`}
        className="group gradient-border block p-4 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-purple-100 to-primary-100 dark:from-purple-900/50 dark:to-primary-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <BookMarked className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-surface-900 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-primary-600 transition-all">
              {term.term}
            </h3>
            <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-2 leading-relaxed">
              {term.shortDefinition}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className="group gradient-border bg-white dark:bg-surface-800 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 p-5 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-primary-100 dark:from-purple-900/50 dark:to-primary-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
          <BookMarked className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <Link to={`/woordeboek/${term.slug}`}>
          <h3 className="font-semibold text-lg text-surface-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-primary-600 transition-all">
            {term.term}
          </h3>
        </Link>
      </div>

      <p className="text-surface-600 dark:text-surface-400 mb-4 line-clamp-3 text-sm leading-relaxed">
        {term.shortDefinition}
      </p>

      {term.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {term.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link
        to={`/woordeboek/${term.slug}`}
        className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      >
        Leer meer
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
