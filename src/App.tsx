import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { BeginHierPage } from './pages/BeginHierPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { TermDetailPage } from './pages/TermDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * Top-level application component that provides document head context and client-side routing.
 *
 * Configures BrowserRouter with a Layout wrapper and routes for home, getting-started, articles
 * (including article detail by `:slug`), glossary (including term detail by `:slug`),
 * category pages (by `:slug`), an about page, and a catch-all not-found page.
 *
 * @returns The root JSX element containing HelmetProvider and the application's router configuration.
 */
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/begin-hier" element={<BeginHierPage />} />
            <Route path="/artikels" element={<ArticlesPage />} />
            <Route path="/artikels/:slug" element={<ArticleDetailPage />} />
            <Route path="/woordeboek" element={<GlossaryPage />} />
            <Route path="/woordeboek/:slug" element={<TermDetailPage />} />
            <Route path="/kategorie/:slug" element={<CategoryPage />} />
            <Route path="/oor-ons" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;