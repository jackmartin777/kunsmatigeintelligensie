import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://kunsmatigeintelligensie.co.za';

function getArticleSlugs() {
  const articlesDir = join(process.cwd(), 'content/articles');
  const files = readdirSync(articlesDir).filter((f) => f.endsWith('.md'));

  return files.map((file) => {
    const content = readFileSync(join(articlesDir, file), 'utf-8');
    const { data } = matter(content);
    return data.slug || basename(file, '.md');
  });
}

function getTermSlugs() {
  const glossaryDir = join(process.cwd(), 'content/glossary');
  const files = readdirSync(glossaryDir).filter((f) => f.endsWith('.md'));

  return files.map((file) => {
    const content = readFileSync(join(glossaryDir, file), 'utf-8');
    const { data } = matter(content);
    return data.slug || basename(file, '.md');
  });
}

function generateSitemap() {
  const articleSlugs = getArticleSlugs();
  const termSlugs = getTermSlugs();

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/begin-hier', priority: '0.9', changefreq: 'monthly' },
    { url: '/artikels', priority: '0.8', changefreq: 'weekly' },
    { url: '/woordeboek', priority: '0.8', changefreq: 'weekly' },
    { url: '/oor-ons', priority: '0.5', changefreq: 'monthly' },
    { url: '/kategorie/verstaan', priority: '0.7', changefreq: 'weekly' },
    { url: '/kategorie/gebruik', priority: '0.7', changefreq: 'weekly' },
    { url: '/kategorie/nuus', priority: '0.7', changefreq: 'weekly' },
    { url: '/kategorie/etiek', priority: '0.7', changefreq: 'weekly' },
  ];

  const articlePages = articleSlugs.map((slug) => ({
    url: `/artikels/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  }));

  const termPages = termSlugs.map((slug) => ({
    url: `/woordeboek/${slug}`,
    priority: '0.6',
    changefreq: 'monthly',
  }));

  const allPages = [...staticPages, ...articlePages, ...termPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  writeFileSync(join(process.cwd(), 'public/sitemap.xml'), sitemap);
  console.log(`Sitemap generated with ${allPages.length} URLs`);
}

generateSitemap();
