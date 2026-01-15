export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: 'verstaan' | 'gebruik' | 'nuus' | 'etiek';
  tags: string[];
  content: string;
  rawContent: string;
  readingTime?: number;
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  shortDefinition: string;
  related: string[];
  tags: string[];
  content: string;
  rawContent: string;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
}

export const CATEGORIES: Record<string, Category> = {
  verstaan: {
    slug: 'verstaan',
    title: 'Verstaan KI',
    description: 'Leer die grondbeginsels van kunsmatige intelligensie.',
  },
  gebruik: {
    slug: 'gebruik',
    title: 'Gebruik KI',
    description: 'Praktiese gidse om KI in jou lewe en werk te gebruik.',
  },
  nuus: {
    slug: 'nuus',
    title: 'Nuus & Ontwikkelings',
    description: 'Die nuutste ontwikkelings in die wêreld van KI.',
  },
  etiek: {
    slug: 'etiek',
    title: 'Etiek, Geloof & Samelewing',
    description: 'Besinning oor die impak van KI op ons lewe en waardes.',
  },
};

export interface SearchResult {
  type: 'article' | 'term';
  slug: string;
  title: string;
  description: string;
  category?: string;
}
