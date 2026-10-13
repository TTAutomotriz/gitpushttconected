/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Vehiculo } from './pages/Vehiculo';
import { UneteAlEquipo } from './pages/UneteAlEquipo';
import { AliadosProveedores } from './pages/AliadosProveedores';
import { Noticias } from './pages/Noticias';
import { DesignOrdenar } from './pages/DesignOrdenar';
import { PrimerAutoSolar } from './pages/noticias/PrimerAutoSolar';
import { AvisoPrivacidad } from './pages/AvisoPrivacidad';

export default function App() {
  const [path, setPath] = useState<PageRoute>(() => {
    // Redirige automáticamente al Home '/' al cargar o refrescar la página para evitar 404s y errores de ruta
    if (window.location.pathname !== '/') {
      window.history.replaceState({}, '', '/');
    }
    return '/';
  });

  const navigateTo = (newPath: PageRoute) => {
    window.history.pushState({}, '', newPath);
    setPath(newPath);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const current = window.location.pathname as PageRoute;
      const validPaths: PageRoute[] = [
        '/',
        '/vehiculo',
        '/unete-al-equipo',
        '/aliados-proveedores',
        '/noticias',
        '/noticias/primer-auto-electrico-solar-mexicano',
        '/design-ordenar',
        '/aviso-de-privacidad',
      ];
      setPath(validPaths.includes(current) ? current : '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    switch (path) {
      case '/':
        return <Home />;
      case '/vehiculo':
        return <Vehiculo />;
      case '/unete-al-equipo':
        return <UneteAlEquipo />;
      case '/aliados-proveedores':
        return <AliadosProveedores />;
      case '/noticias':
        return <Noticias onNavigate={navigateTo} />;
      case '/noticias/primer-auto-electrico-solar-mexicano':
        return <PrimerAutoSolar onNavigate={navigateTo} />;
      case '/design-ordenar':
        return <DesignOrdenar />;
      case '/aviso-de-privacidad':
        return <AvisoPrivacidad />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none antialiased text-gray-600">
      {/* Shared Navbar identical across all routes */}
      <Navbar currentPath={path} onNavigate={navigateTo} />

      {/* Dynamic Page Render Area */}
      <main className="flex-grow overflow-x-clip">
        {renderPage()}
      </main>

      {/* Shared Footer identical across all routes */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

