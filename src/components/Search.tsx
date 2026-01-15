import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, FileText, BookOpen } from 'lucide-react';
import { search } from '../lib/content';
import type { SearchResult } from '../types/content';

interface SearchProps {
  onClose?: () => void;
  autoFocus?: boolean;
}

export function Search({ onClose, autoFocus = false }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = search(query);
      setResults(searchResults.slice(0, 8));
      setIsOpen(true);
      setSelectedIndex(0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    const path =
      result.type === 'article'
        ? `/artikels/${result.slug}`
        : `/woordeboek/${result.slug}`;
    navigate(path);
    setQuery('');
    setIsOpen(false);
    onClose?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        e.preventDefault();
        handleSelect(results[selectedIndex]);
        break;
      case 'Escape':
        setIsOpen(false);
        setQuery('');
        onClose?.();
        break;
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Soek artikels en terme..."
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-surface-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-surface-400 hover:text-surface-600 hover:bg-surface-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-surface-200 overflow-hidden z-50">
          <ul className="divide-y divide-surface-100">
            {results.map((result, index) => (
              <li key={`${result.type}-${result.slug}`}>
                <button
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full px-4 py-3 flex items-start gap-3 text-left transition-colors ${
                    index === selectedIndex ? 'bg-primary-50' : 'hover:bg-surface-50'
                  }`}
                >
                  {result.type === 'article' ? (
                    <FileText className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <BookOpen className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-surface-900 truncate">
                      {result.title}
                    </p>
                    <p className="text-sm text-surface-500 truncate">
                      {result.description}
                    </p>
                  </div>
                  <span className="ml-auto text-xs text-surface-400 flex-shrink-0">
                    {result.type === 'article' ? 'Artikel' : 'Term'}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No results message */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-surface-200 p-4 text-center text-surface-500">
          Geen resultate gevind vir "{query}"
        </div>
      )}
    </div>
  );
}
