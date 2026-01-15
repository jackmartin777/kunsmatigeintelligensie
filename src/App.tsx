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
