import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
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
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image,
  type = 'website',
  article,
  jsonLd,
}: SEOProps) {
  const pageTitle = title ? `${title} | Kunsmatige Intelligensie` : DEFAULT_TITLE;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const imageUrl = image ? `${BASE_URL}${image}` : DEFAULT_IMAGE;

  // Deduplicate tags to prevent duplicate React keys
  const uniqueTags = article?.tags ? Array.from(new Set(article.tags)) : [];

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
      <meta property="og:image" content={imageUrl} />

      {/* Article specific */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {uniqueTags.map((tag, index) => (
        <meta key={`article-tag-${index}`} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
