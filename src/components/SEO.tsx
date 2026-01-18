import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
  };
  jsonLd?: object;
}

const BASE_URL = 'https://kunsmatigeintelligensie.co.za';
const DEFAULT_TITLE = 'Kunsmatige Intelligensie - Die tuiste van KI in Afrikaans';
const DEFAULT_DESCRIPTION =
  'Die bron van alles KI in Afrikaans. Leer oor kunsmatige intelligensie, van basiese konsepte tot praktiese toepassings.';

/**
 * Sets SEO-related head tags (standard meta, Open Graph, Twitter) and optional JSON-LD for a page.
 *
 * @param title - Page title; when provided it is suffixed with " | Kunsmatige Intelligensie".
 * @param description - Meta description used for search engines and social previews.
 * @param canonical - Path appended to the site base URL to form the canonical URL; when omitted the site base URL is used.
 * @param type - Open Graph type, either `website` or `article`.
 * @param article - Article metadata containing optional `publishedTime`, `modifiedTime` (ISO 8601 strings), and `tags` to emit article-specific meta tags.
 * @param jsonLd - Structured data object to embed as `application/ld+json`.
 * @returns A React element that injects SEO and social-sharing meta tags into the document head.
 */
export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  type = 'website',
  article,
  jsonLd,
}: SEOProps) {
  const pageTitle = title ? `${title} | Kunsmatige Intelligensie` : DEFAULT_TITLE;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  return (
    <Helmet>
      {/* Basic meta */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="language" content="af" />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="af_ZA" />
      <meta property="og:site_name" content="Kunsmatige Intelligensie" />

      {/* Article specific */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}