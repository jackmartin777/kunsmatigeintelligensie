import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
        className="block p-4 rounded-lg bg-white border border-surface-200 hover:border-primary-300 hover:shadow-sm transition-all"
      >
        <h3 className="font-semibold text-surface-900 mb-1">{term.term}</h3>
        <p className="text-sm text-surface-600 line-clamp-2">
          {term.shortDefinition}
        </p>
      </Link>
    );
  }

  return (
    <article className="group bg-white rounded-xl shadow-sm border border-surface-200 p-5 hover:shadow-md transition-shadow">
      <Link to={`/woordeboek/${term.slug}`}>
        <h3 className="font-semibold text-lg text-surface-900 mb-2 group-hover:text-primary-600 transition-colors">
          {term.term}
        </h3>
      </Link>

      <p className="text-surface-600 mb-4 line-clamp-3">{term.shortDefinition}</p>

      {term.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {term.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-xs bg-surface-100 text-surface-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link
        to={`/woordeboek/${term.slug}`}
        className="flex items-center gap-1 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
      >
        Leer meer
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
