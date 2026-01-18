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
 * Parses a markdown article file and extracts its metadata and content.
 * Calculates reading time based on word count (approximately 200 words per minute).
 * 
 * @param content - Raw markdown content string from the article file
 * @param filename - Name of the markdown file (used as fallback for slug)
 * @returns Parsed Article object with all metadata and HTML content
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
 * Parses a markdown glossary term file and extracts its metadata and content.
 * 
 * @param content - Raw markdown content string from the glossary file
 * @param filename - Name of the markdown file (used as fallback for slug)
 * @returns Parsed GlossaryTerm object with all metadata and HTML content
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
 * Retrieves all articles from the content directory.
 * Results are cached after the first call for performance.
 * Articles are sorted by date, with the newest articles first.
 * 
 * @returns Array of all Article objects sorted by date (newest first)
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
 * Finds and returns a specific article by its slug identifier.
 * 
 * @param slug - The unique slug identifier for the article
 * @returns The Article object if found, undefined otherwise
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

/**
 * Retrieves all articles belonging to a specific category.
 * 
 * @param category - The category identifier (e.g., 'verstaan', 'gebruik', 'nuus', 'etiek')
 * @returns Array of Article objects in the specified category
 */
export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((article) => article.category === category);
}

/**
 * Retrieves all articles that have been tagged with a specific tag.
 * 
 * @param tag - The tag to filter articles by
 * @returns Array of Article objects that contain the specified tag
 */
export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((article) => article.tags.includes(tag));
}

/**
 * Retrieves all glossary terms from the content directory.
 * Results are cached after the first call for performance.
 * Terms are sorted alphabetically using Afrikaans locale.
 * 
 * @returns Array of all GlossaryTerm objects sorted alphabetically
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
 * Finds and returns a specific glossary term by its slug identifier.
 * 
 * @param slug - The unique slug identifier for the glossary term
 * @returns The GlossaryTerm object if found, undefined otherwise
 */
export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return getAllTerms().find((term) => term.slug === slug);
}

/**
 * Retrieves all unique tags used across all articles.
 * Tags are sorted alphabetically using Afrikaans locale.
 * 
 * @returns Array of unique tag strings sorted alphabetically
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>();

  getAllArticles().forEach((article) => {
    article.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, 'af'));
}

/**
 * Finds articles related to the given article based on category and shared tags.
 * Articles are scored by relevance: same category adds 2 points, each shared tag adds 1 point.
 * Returns the highest scoring articles up to the specified limit.
 * 
 * @param article - The article to find related articles for
 * @param limit - Maximum number of related articles to return (default: 3)
 * @returns Array of related Article objects sorted by relevance score
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
 * Retrieves all related terms for a given glossary term.
 * Uses the term's 'related' field which contains slugs of related terms.
 * 
 * @param term - The glossary term to find related terms for
 * @returns Array of related GlossaryTerm objects
 */
export function getRelatedTerms(term: GlossaryTerm): GlossaryTerm[] {
  return term.related
    .map((slug) => getTermBySlug(slug))
    .filter((t): t is GlossaryTerm => t !== undefined);
}

/**
 * Searches through all articles and glossary terms for matches to the query string.
 * Searches in titles, descriptions, content, and tags for articles.
 * Searches in terms, short definitions, and content for glossary terms.
 * Results are sorted with title matches first, then terms before articles.
 * 
 * @param query - The search query string
 * @returns Array of SearchResult objects matching the query, sorted by relevance
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
 * Retrieves the most recent articles to feature on the homepage.
 * Returns the newest articles based on date, up to the specified limit.
 * 
 * @param limit - Maximum number of articles to return (default: 3)
 * @returns Array of the most recent Article objects
 */
export function getFeaturedArticles(limit = 3): Article[] {
  return getAllArticles().slice(0, limit);
}

/**
 * Retrieves a curated selection of popular glossary terms to feature on the homepage.
 * Returns commonly referenced AI terms that are useful for beginners.
 * 
 * @param limit - Maximum number of terms to return (default: 6)
 * @returns Array of curated GlossaryTerm objects
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
