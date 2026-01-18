import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

/**
 * Provides the application page layout wrapped with a HelmetProvider.
 *
 * Renders top Navigation, a main content area for child routes via `Outlet`, and a Footer inside a full-height vertical flex container.
 *
 * @returns The JSX element containing `HelmetProvider`, `Navigation`, `Outlet`, and `Footer`.
 */
export function Layout() {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col bg-surface-50">
        <Navigation />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}