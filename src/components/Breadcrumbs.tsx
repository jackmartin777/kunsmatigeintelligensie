import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Renders a horizontal breadcrumb navigation starting with a Home link.
 *
 * @param items - Array of breadcrumb entries; each entry has `label` and an optional `to` path. Entries with `to` render as links, entries without `to` render as bold text.
 * @returns A navigation element containing the breadcrumb trail.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Broodkrummels" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 text-surface-500 hover:text-primary-600 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Tuis</span>
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <ChevronRight className="h-4 w-4 text-surface-400" />
            {item.to ? (
              <Link
                to={item.to}
                className="text-surface-500 hover:text-primary-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-surface-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}