# Kunsmatige Intelligensie

Die bron van alles KI in Afrikaans - [kunsmatigeintelligensie.co.za](https://kunsmatigeintelligensie.co.za)

## Oorsig

Hierdie webwerf is 'n Afrikaanse hulpbron vir kunsmatige intelligensie. Dit bevat:

- **Artikels** oor KI-konsepte, praktiese gidse, en etiese besinnings
- **Woordeboek** van KI-terme in eenvoudige Afrikaans
- **Kategorieë** vir verskillende onderwerpe (Verstaan KI, Gebruik KI, Nuus, Etiek)

## Tegnologie

- **Vite** - Build tool
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **gray-matter + marked** - Markdown parsing

## Begin

```bash
# Installeer dependencies
npm install

# Start development server
npm run dev

# Build vir produksie
npm run build

# Lint die kode
npm run lint

# Preview produksie build
npm run preview
```

## Projek Struktuur

```
├── content/
│   ├── articles/        # Markdown artikels
│   └── glossary/        # Markdown woordeboek terme
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── generate-sitemap.js
├── src/
│   ├── components/      # React komponente
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Data layer en utilities
│   ├── pages/           # Page komponente
│   ├── types/           # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
```

## Nuwe Inhoud Byvoeg

### Nuwe Artikel

1. Skep 'n nuwe `.md` lêer in `content/articles/`
2. Voeg frontmatter by:

```yaml
---
title: "Jou Artikel Titel"
description: "Kort beskrywing vir SEO en voorskou"
date: "2024-01-15"
category: "verstaan" # verstaan | gebruik | nuus | etiek
tags: ["tag1", "tag2"]
slug: "jou-artikel-slug"
---
```

3. Skryf jou inhoud in Markdown onder die frontmatter

### Nuwe Woordeboek Term

1. Skep 'n nuwe `.md` lêer in `content/glossary/`
2. Voeg frontmatter by:

```yaml
---
term: "Die Term"
slug: "die-term"
shortDefinition: "Kort definisie wat in kaarte gewys word"
related: ["verwante-term-slug", "ander-term-slug"]
tags: ["tag1", "tag2"]
---
```

3. Skryf die volledige verduideliking in Markdown onder die frontmatter

### Slug Konvensies

- Gebruik slegs kleinletters
- Gebruik koppeltekens (`-`) vir spasies
- Vermy spesiale karakters behalwe koppeltekens
- Hou dit kort maar beskrywend

**Voorbeelde:**
- `wat-is-kunsmatige-intelligensie` ✓
- `groot-taalmodel-llm` ✓
- `Wat Is KI` ✗
- `wat_is_ki` ✗

## Sitemap Regenereer

Die sitemap word outomaties gegenereer tydens die build proses, maar jy kan dit ook handmatig doen:

```bash
npm run sitemap
```

Dit sal 'n nuwe `public/sitemap.xml` skep gebaseer op die inhoud in `content/`.

## Kategorieë

- **verstaan** - Konsepte en verduidelikings
- **gebruik** - Praktiese gidse
- **nuus** - Nuus en ontwikkelings
- **etiek** - Etiek, geloof en samelewingsimplikasies

## SEO

- Elke bladsy het `<title>` en `<meta description>` tags
- OpenGraph tags vir sosiale media
- JSON-LD structured data vir artikels
- `robots.txt` en `sitemap.xml` in `/public`

## Lisensie

Alle inhoud is © kunsmatigeintelligensie.co.za. Alle regte voorbehou.
