# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Project

**Kunsmatige Intelligensie** (`kunsmatigeintelligensie.co.za`) is an Afrikaans-language educational website about artificial intelligence. All user-facing content — UI labels, article text, glossary definitions, page titles, meta descriptions — must be written in Afrikaans.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (Vite, localhost:5173)
npm run build        # TypeScript check + production build
npm run lint         # ESLint
npm run preview      # Preview the production build locally
npm run sitemap      # Regenerate public/sitemap.xml from content/
```

There are no tests. `npm run build` is the primary correctness check (TypeScript compilation + Vite bundling).

## Architecture

### Content Pipeline

All content lives as Markdown files with YAML frontmatter in `content/`. They are **not fetched at runtime** — Vite's `import.meta.glob` imports them eagerly at build time as raw strings. `src/lib/content.ts` parses them with `gray-matter` (frontmatter) and `marked` (Markdown → HTML), then caches the results in module-level variables. All content access goes through functions exported from `src/lib/content.ts`.

- `content/articles/*.md` — Blog articles
- `content/glossary/*.md` — Glossary terms (woordeboek)

Because content is bundled at build time, adding or editing a Markdown file requires a dev server restart (or rebuild) to take effect.

### Routing

React Router v6 with a single `<Layout>` wrapper around all routes (defined in `src/App.tsx`). Routes follow Afrikaans URL paths:

| Path | Page |
|---|---|
| `/` | HomePage |
| `/begin-hier` | BeginHierPage |
| `/artikels` | ArticlesPage |
| `/artikels/:slug` | ArticleDetailPage |
| `/woordeboek` | GlossaryPage |
| `/woordeboek/:slug` | TermDetailPage |
| `/kategorie/:slug` | CategoryPage |
| `/oor-ons` | AboutPage |

### SEO

Every page uses `<SEO>` (`src/components/SEO.tsx`) which renders `react-helmet-async` tags: `<title>`, `<meta description>`, canonical URL, Open Graph, Twitter Card, and optional JSON-LD structured data. The `BASE_URL` constant in `SEO.tsx` and `scripts/generate-sitemap.js` must stay in sync.

### Styling

Tailwind CSS with a custom palette defined in `tailwind.config.js`:
- `primary-*` — Blue scale used for links, buttons, accents
- `surface-*` — Neutral slate scale used for backgrounds and text

Use these tokens rather than Tailwind's default colors for consistency.

## Content Conventions

### Article frontmatter

```yaml
---
title: "Titel"
description: "Kort beskrywing vir SEO en voorskou"
date: "2024-01-15"
category: "verstaan"   # verstaan | gebruik | nuus | etiek
tags: ["tag1", "tag2"]
slug: "artikel-slug"
---
```

### Glossary term frontmatter

```yaml
---
term: "Die Term"
slug: "die-term"
shortDefinition: "Kort definisie wat in kaarte gewys word"
related: ["verwante-term-slug"]
tags: ["tag1"]
---
```

### Slug rules

- Lowercase only, hyphens for spaces, no special characters
- Must be unique within their content type
- The `slug` field in frontmatter takes precedence over the filename

### Categories

| Slug | Meaning |
|---|---|
| `verstaan` | Concepts and explanations |
| `gebruik` | Practical guides |
| `nuus` | News and developments |
| `etiek` | Ethics, faith, societal impact |

## Icons & UI Libraries

Use `lucide-react` for all icons. Do not add other icon libraries or UI component libraries.
