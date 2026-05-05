# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**kunsmatigeintelligensie** is a React-based knowledge resource website about artificial intelligence in Afrikaans. The site features two primary content types:
- **Articles** (content/articles/) - Educational pieces with categories, tags, and reading time
- **Glossary Terms** (content/glossary/) - AI terminology with related term links

The site uses **Vite + React 18 + TypeScript + Tailwind CSS + React Router** for a fast, type-safe, SEO-optimized experience.

## Essential Commands

```bash
# Install dependencies
npm install

# Development server (hot reload, typically http://localhost:5173)
npm run dev

# Production build
npm run build

# Lint code (ESLint with TypeScript support)
npm run lint

# Preview production build locally
npm run preview

# Generate sitemap.xml from content/
npm run sitemap
```

## Architecture: The Big Picture

### Content → React Pipeline

Content is **static markdown loaded at build time**, not runtime:

1. **Markdown Files** (content/articles/*.md, content/glossary/*.md)
   - Each file has YAML frontmatter (metadata) + Markdown body
   - Vite glob imports: `import.meta.glob('/content/**/*.md', { query: '?raw', eager: true })`

2. **Parsing Layer** (src/lib/content.ts)
   - `gray-matter` extracts frontmatter → JavaScript objects
   - `marked` converts Markdown body → HTML
   - Parsing happens during build, not at runtime

3. **Caching & Computation** (src/lib/content.ts)
   - `articlesCache` and `termsCache` store parsed content (lazy-initialized)
   - `getAllArticles()`, `getAllTerms()` are the main accessors
   - Related articles scored by category + tag overlap
   - Featured content hardcoded in `getFeaturedTerms()` (popular slugs array)

4. **Pages & Components** render HTML + SEO tags
   - Routes: `/artikels/:slug`, `/woordeboek/:slug`, `/kategorie/:slug`
   - Breadcrumbs, search, related content links all derive from parsed data

### Why This Design

- **No runtime markdown parsing** → faster load, smaller JS
- **All content known at build time** → enables SEO (sitemaps, schema.org)
- **Content as code** → version control, CI/CD friendly

## Content Management Conventions

### Adding a New Article

1. Create file in `content/articles/your-slug.md`
2. Include frontmatter block:
   ```yaml
   ---
   title: "Article Title in Afrikaans"
   description: "Short description for SEO (~160 chars)"
   date: "2024-05-05"
   category: "verstaan"  # verstaan | gebruik | nuus | etiek
   tags: ["tag1", "tag2"]
   slug: "your-slug"
   ---
   ```
3. Markdown body (uses `marked` syntax)
4. Slug must match filename (minus .md); lowercase, hyphens only
5. Run `npm run sitemap` to rebuild sitemap (also runs on build)

### Adding a Glossary Term

1. Create file in `content/glossary/term-slug.md`
2. Include frontmatter:
   ```yaml
   ---
   term: "Die Term"
   slug: "die-term"
   shortDefinition: "One-line definition for term cards"
   related: ["related-term-slug", "another-slug"]  # must exist or they won't render
   tags: ["tag1"]
   ---
   ```
3. Markdown body for full explanation
4. `related` array links to other terms; broken links are silently skipped

### Featured Content (Homepage)

- **Featured Articles**: `getFeaturedArticles(3)` returns first 3 by date (newest first)
- **Featured Terms**: hardcoded popular slugs in `getFeaturedTerms()` in src/lib/content.ts
  - To change homepage glossary: edit the `popularSlugs` array
  - If a slug doesn't exist, it's silently skipped

## Key Type Definitions

Located in `src/types/content.ts`:

```typescript
interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;  // ISO 8601
  category: 'verstaan' | 'gebruik' | 'nuus' | 'etiek';
  tags: string[];
  content: string;  // HTML (from marked)
  readingTime?: number;  // auto-calculated from word count
}

interface GlossaryTerm {
  slug: string;
  term: string;
  shortDefinition: string;
  related: string[];  // array of term slugs
  tags: string[];
  content: string;  // HTML
}

// Category metadata
const CATEGORIES: Record<string, Category> = {
  verstaan: { slug, title, description },
  // ...
};
```

## Data Flow Patterns

### Fetching Articles by Category

```typescript
// Returns articles filtered to category, sorted newest-first
getArticlesByCategory('verstaan')
```

### Search

```typescript
// Fuzzy search across title, description, content, tags (both articles & terms)
// Returns mixed array of SearchResult (type: 'article' | 'term')
// Ranks: title matches first, terms before articles
search('kunsmatige')
```

### Related Content

```typescript
// Articles: scored by shared category (+2) and tag overlap (+1 per tag)
getRelatedArticles(article, limit = 3)

// Terms: uses hardcoded `related` array in frontmatter
getRelatedTerms(term)
```

## SEO & Build Artifacts

- **Sitemap** (`public/sitemap.xml`): Generated from content slugs
  - Static pages: /, /begin-hier, /artikels, /woordeboek, /oor-ons, category pages (0.5–1.0 priority)
  - Article pages: 0.7 priority, monthly changefreq
  - Term pages: 0.6 priority, monthly changefreq
  - Regenerate with `npm run sitemap` or `npm run build`

- **Meta Tags**: Each page rendered via `SEO.tsx` component
  - Title, description, canonical URLs
  - OpenGraph (og:title, og:description, og:image)
  - JSON-LD structured data for articles

- **Markdown Assets**: Vite includes .md files as assets (vite.config.ts: `assetsInclude: ['**/*.md']`)

## Common Development Workflows

### Adding a New Feature

1. Check if it needs new content properties → update `Article` or `GlossaryTerm` type
2. Update frontmatter schema in README.md and CLAUDE.md
3. Extend `parseArticle()` or `parseTerm()` if new properties require computation
4. Add query/filter function in `src/lib/content.ts` if needed
5. Create component or page; use `getArticleBySlug()` etc. to fetch

### Modifying Search or Related Content Logic

- Search: `src/lib/content.ts` line ~142 (`search()` function)
- Related articles: scoring algorithm at line ~119
- Related terms: uses frontmatter `related` array (line ~135)

### Debugging Content Issues

- **Content not appearing**: Check that markdown is in content/ directories before build
- **Broken slugs**: Verify frontmatter `slug` matches filename (lowercase, hyphens)
- **Missing articles on homepage**: Check date format is ISO 8601 (YYYY-MM-DD)
- **Related terms empty**: Verify `related` array slugs exist in content/glossary/

## Vite & Build Specifics

- **Glob imports** (src/lib/content.ts lines 6–16) load all .md files at build time
  - `eager: true` → files parsed immediately, not lazily
  - `query: '?raw'` → imports raw file content (not processed by Vite)
  - Glob paths are relative to project root (e.g., `/content/articles/*.md`)

- **Alias** (`@` → `src/`) can be used in imports: `import { useReducedMotion } from '@/hooks'`

- **TypeScript paths** in tsconfig.app.json also include `@/*` alias

- **Production optimization**: Lucide React icons excluded from optimization (vite.config.ts) to prevent runtime errors

## ESLint & Code Style

- **Config**: eslint.config.js (flat config format)
- **Extends**: @eslint/js recommended + typescript-eslint recommended
- **React hooks**: Plugin enforces dependency rules; React Refresh plugin warns on non-component exports
- **Run**: `npm run lint` (no auto-fix; review manually)

## When Adding Content, Avoid

- Hardcoding dates in article frontmatter that aren't ISO 8601 (YYYY-MM-DD)
- Using non-existent slugs in `related` arrays (silently skipped, unclear to users)
- Modifying `getFeaturedTerms()` without confirming the term slugs exist
- Editing markdown content without updating frontmatter if you change title/description
- Category values other than the four defined (verstaan, gebruik, nuus, etiek)

## Deployment Context

- Dockerfile and compose.yaml present; built and deployed via Docker
- BASE_URL in generate-sitemap.js: https://kunsmatigeintelligensie.co.za
  - Update if domain changes

## Glossary of Key Files

- `src/lib/content.ts` – Core data layer; all content queries originate here
- `src/types/content.ts` – TypeScript interfaces for Article, GlossaryTerm, Category
- `src/pages/*` – Route handlers (HomePage, ArticleDetailPage, GlossaryPage, etc.)
- `src/components/Layout.tsx` – Root layout with Navigation, Footer
- `src/components/SEO.tsx` – Meta tag injection via react-helmet-async
- `src/components/Search.tsx` – Search UI; calls `search()` from content.ts
- `content/articles/`, `content/glossary/` – Markdown source files
- `scripts/generate-sitemap.js` – Sitemap generator (Node.js, not part of build)
- `vite.config.ts` – Vite build config; note glob imports & Lucide optimization
