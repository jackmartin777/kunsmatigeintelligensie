import matter from 'gray-matter';
import { marked } from 'marked';
import type { Article, GlossaryTerm, SearchResult } from '../types/content';

// Import all markdown files at build time using Vite's glob import
const articleFiles = import.meta.glob('/content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const glossaryFiles = import.meta.glob('/content/glossary/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/**
 * Parse an article markdown file's front matter and body into an Article object.
 *
 * Derives the slug from front matter `slug` if present, otherwise from `filename` by removing a trailing `.md`.
 *
 * @param content - Raw markdown file contents including front matter
 * @param filename - Source filename used to derive a slug when front matter `slug` is absent
 * @returns An Article populated from front matter and rendered HTML content. Fields:
 * - `slug`: derived slug
 * - `title`, `description`, `date`: taken from front matter or empty string when missing
 * - `category`: front matter value or `"verstaan"` when missing
 * - `tags`: front matter array or empty array when missing
 * - `content`: body converted to HTML
 * - `readingTime`: estimated minutes (integer, rounded up) based on ~200 words per minute
 */
function parseArticle(content: string, filename: string): Article {
  const { data, content: body } = matter(content);
  const slug = data.slug || filename.replace(/\.md$/, '');

  // Calculate reading time (roughly 200 words per minute)
  const wordCount = body.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    category: data.category || 'verstaan',
    tags: data.tags || [],
    content: marked(body) as string,
    readingTime,
  };
}

/**
 * Create a GlossaryTerm from raw markdown source with front matter.
 *
 * @param content - Raw markdown text that includes YAML front matter and the term body
 * @param filename - Source filename used to derive the term slug when front matter does not provide one
 * @returns A GlossaryTerm object containing `slug`, `term`, `shortDefinition`, `related`, `tags`, and `content` (HTML)
 */
function parseTerm(content: string, filename: string): GlossaryTerm {
  const { data, content: body } = matter(content);
  const slug = data.slug || filename.replace(/\.md$/, '');

  return {
    slug,
    term: data.term || '',
    shortDefinition: data.shortDefinition || '',
    related: data.related || [],
    tags: data.tags || [],
    content: marked(body) as string,
  };
}

// Cache parsed content
let articlesCache: Article[] | null = null;
let termsCache: GlossaryTerm[] | null = null;

/**
 * Load and return all articles parsed from the source markdown files, sorted newest first.
 *
 * The result is cached after the first call to avoid re-parsing on subsequent calls.
 *
 * @returns An array of `Article` objects parsed from the markdown content, sorted by `date` with the newest articles first.
 */
export function getAllArticles(): Article[] {
  if (articlesCache) return articlesCache;

  const articles: Article[] = [];

  for (const [path, content] of Object.entries(articleFiles)) {
    const filename = path.split('/').pop() || '';
    articles.push(parseArticle(content as string, filename));
  }

  // Sort by date, newest first
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  articlesCache = articles;
  return articles;
}

/**
 * Retrieve an article by its slug.
 *
 * @returns The Article whose `slug` matches the provided value, or `undefined` if no match is found.
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

/**
 * Retrieve articles belonging to a specific category.
 *
 * @param category - The category to match; comparison is exact and case-sensitive.
 * @returns An array of Article objects whose `category` equals the provided `category`.
 */
export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((article) => article.category === category);
}

/**
 * Retrieve articles that have the specified tag.
 *
 * @param tag - The tag to filter articles by
 * @returns Articles whose `tags` include the given `tag`
 */
export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((article) => article.tags.includes(tag));
}

/**
 * Load, parse, and return all glossary terms from the project's markdown files.
 *
 * This function parses each glossary markdown file into a GlossaryTerm, caches the result,
 * and sorts the returned terms alphabetically by `term` using the Afrikaans locale.
 *
 * @returns An array of parsed GlossaryTerm objects sorted alphabetically by `term`.
 */
export function getAllTerms(): GlossaryTerm[] {
  if (termsCache) return termsCache;

  const terms: GlossaryTerm[] = [];

  for (const [path, content] of Object.entries(glossaryFiles)) {
    const filename = path.split('/').pop() || '';
    terms.push(parseTerm(content as string, filename));
  }

  // Sort alphabetically by term
  terms.sort((a, b) => a.term.localeCompare(b.term, 'af'));

  termsCache = terms;
  return terms;
}

/**
 * Retrieve a glossary term by its slug.
 *
 * @returns The `GlossaryTerm` whose `slug` matches the provided value, `undefined` if none is found.
 */
export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return getAllTerms().find((term) => term.slug === slug);
}

/**
 * Collects all unique tags used by articles and sorts them alphabetically using the Afrikaans ('af') locale.
 *
 * @returns The unique tag values as a sorted array of strings (alphabetical order using the 'af' locale).
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>();

  getAllArticles().forEach((article) => {
    article.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, 'af'));
}

/**
 * Selects articles related to the given article by matching category and tags.
 *
 * @param article - The reference article to find related articles for
 * @param limit - Maximum number of related articles to return
 * @returns An array of up to `limit` articles most related to `article`, ordered by relevance. Relevance scores give +2 for matching category and +1 for each shared tag; only articles with a positive score are returned.
 */
export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const allArticles = getAllArticles();

  // Score articles by relevance (same category or shared tags)
  const scored = allArticles
    .filter((a) => a.slug !== article.slug)
    .map((a) => {
      let score = 0;
      if (a.category === article.category) score += 2;
      const sharedTags = a.tags.filter((tag) => article.tags.includes(tag));
      score += sharedTags.length;
      return { article: a, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.article);
}

/**
 * Resolves a term's related-slug list into the corresponding glossary term objects.
 *
 * @param term - The glossary term whose `related` slugs should be resolved
 * @returns An array of `GlossaryTerm` objects corresponding to `term.related`, in the same order; slugs that have no matching term are omitted
 */
export function getRelatedTerms(term: GlossaryTerm): GlossaryTerm[] {
  return term.related
    .map((slug) => getTermBySlug(slug))
    .filter((t): t is GlossaryTerm => t !== undefined);
}

/**
 * Search articles and glossary terms for the given query and return matching results.
 *
 * @param query - The search text to match against article titles, descriptions, content, tags, and glossary term fields
 * @returns An array of `SearchResult` objects for matching items, ordered with title matches first and, for equal relevance, glossary terms before articles
 */
export function search(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  // Search articles
  getAllArticles().forEach((article) => {
    const titleMatch = article.title.toLowerCase().includes(normalizedQuery);
    const descMatch = article.description.toLowerCase().includes(normalizedQuery);
    const contentMatch = article.content.toLowerCase().includes(normalizedQuery);
    const tagMatch = article.tags.some((tag) =>
      tag.toLowerCase().includes(normalizedQuery)
    );

    if (titleMatch || descMatch || contentMatch || tagMatch) {
      results.push({
        type: 'article',
        slug: article.slug,
        title: article.title,
        description: article.description,
        category: article.category,
      });
    }
  });

  // Search glossary
  getAllTerms().forEach((term) => {
    const termMatch = term.term.toLowerCase().includes(normalizedQuery);
    const defMatch = term.shortDefinition.toLowerCase().includes(normalizedQuery);
    const contentMatch = term.content.toLowerCase().includes(normalizedQuery);

    if (termMatch || defMatch || contentMatch) {
      results.push({
        type: 'term',
        slug: term.slug,
        title: term.term,
        description: term.shortDefinition,
      });
    }
  });

  // Sort: title matches first, then by type (terms before articles)
  results.sort((a, b) => {
    const aTitle = a.title.toLowerCase().includes(normalizedQuery) ? 0 : 1;
    const bTitle = b.title.toLowerCase().includes(normalizedQuery) ? 0 : 1;
    if (aTitle !== bTitle) return aTitle - bTitle;
    if (a.type !== b.type) return a.type === 'term' ? -1 : 1;
    return 0;
  });

  return results;
}

/**
 * Selects the top articles to feature on the homepage.
 *
 * @param limit - Maximum number of articles to return (defaults to 3)
 * @returns An array of Article objects in newest-first order, containing at most `limit` items
 */
export function getFeaturedArticles(limit = 3): Article[] {
  return getAllArticles().slice(0, limit);
}

/**
 * Selects a curated list of popular glossary terms.
 *
 * @param limit - Maximum number of terms to return
 * @returns An array of up to `limit` GlossaryTerm objects matching a hard-coded set of popular slugs
 */
export function getFeaturedTerms(limit = 6): GlossaryTerm[] {
  // Return a mix of popular terms
  const popularSlugs = [
    'prompt',
    'groot-taalmodel-llm',
    'hallusinasie',
    'agent',
    'masjienleer',
    'tokens',
  ];

  const terms = getAllTerms();
  const featured: GlossaryTerm[] = [];

  popularSlugs.forEach((slug) => {
    const term = terms.find((t) => t.slug === slug);
    if (term && featured.length < limit) {
      featured.push(term);
    }
  });

  return featured;
}