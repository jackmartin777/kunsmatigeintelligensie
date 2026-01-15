import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

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
