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

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((article) => article.tags.includes(tag));
}

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

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return getAllTerms().find((term) => term.slug === slug);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();

  getAllArticles().forEach((article) => {
    article.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, 'af'));
}

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

export function getRelatedTerms(term: GlossaryTerm): GlossaryTerm[] {
  return term.related
    .map((slug) => getTermBySlug(slug))
    .filter((t): t is GlossaryTerm => t !== undefined);
}

// Search functionality
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

// Featured content for homepage
export function getFeaturedArticles(limit = 3): Article[] {
  return getAllArticles().slice(0, limit);
}

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
