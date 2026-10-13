import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { PageRoute, NavLink } from '../types';
import logoBlanco from '../assets/images/logoblanco.png';
import logoNegro from '../assets/images/logonegro.png';

interface NavbarProps {
  currentPath: PageRoute;
  onNavigate: (path: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [logoError, setLogoError] = useState(false);

  // Block body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 56) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks: NavLink[] = [
    { label: 'Vehículo', href: '/vehiculo' },
    { label: 'Únete al equipo', href: '/unete-al-equipo' },
    { label: 'Aliados & Proveedores', href: '/aliados-proveedores' },
    { label: 'Noticias', href: '/noticias' },
  ];

  const handleLinkClick = (href: PageRoute) => {
    onNavigate(href);
    setIsOpen(false);
  };

  const showNav = isVisible || isOpen;
  const isVehiculo = currentPath === '/vehiculo' || currentPath === '/noticias/primer-auto-electrico-solar-mexicano';
  const isAbsoluteNav = currentPath === '/vehiculo' || currentPath === '/design-ordenar' || currentPath === '/noticias/primer-auto-electrico-solar-mexicano';

  const navBgClass = isOpen
    ? "bg-white border-b border-gray-100"
    : isVehiculo
      ? "bg-transparent"
      : "bg-white/75 backdrop-blur-md border-b border-gray-100/50";

  const navPositionClass = isAbsoluteNav && !isOpen ? "absolute top-0 left-0 right-0" : "sticky top-0 left-0 right-0";

  return (
    <nav className={`${navPositionClass} ${navBgClass} z-50 h-[56px] flex items-center transition-all duration-300 ease-in-out ${
      !isAbsoluteNav && !isOpen && !showNav ? 'max-lg:-translate-y-full' : 'translate-y-0'
    }`}>
      <div className="w-full max-w-8xl mx-auto px-6 flex items-center justify-between relative h-full">
        {/* Left: Spacer for Mobile to center logo */}
        <div className="lg:hidden flex-1" />

        {/* Left: Navigation links (Desktop) - Centered in the left half space */}
        <div className="hidden lg:flex items-center justify-center gap-8 lg:flex-1">
          {navLinks.filter(link => link.label !== 'Únete al equipo' && !link.label.toLowerCase().includes('aliados')).map((link) => {
            const isActive = currentPath === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`font-sans font-medium text-sm transition-colors duration-200 relative py-1 cursor-pointer ${
                  isVehiculo
                    ? `${isActive ? 'text-white font-bold' : 'text-white/90 hover:text-white/80'}`
                    : `${isActive ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-navy-900'}`
                }`}
              >
                {link.label}
                {isActive && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isVehiculo ? 'bg-white' : 'bg-blue-600'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Center: Brand Logo (Centered on both mobile and desktop) */}
        <div 
          onClick={() => handleLinkClick('/')}
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer group z-10"
        >
          {logoError ? (
            <div className="flex items-center gap-1.5 font-display font-extrabold tracking-tight">
              <span className={`text-xl sm:text-2xl ${isVehiculo && !isOpen ? 'text-white' : 'text-navy-900'}`}>TT</span>
              <span className={`text-[10px] sm:text-xs tracking-widest font-mono uppercase ${isVehiculo && !isOpen ? 'text-white/70' : 'text-gray-500'}`}>AUTOMOTRIZ</span>
            </div>
          ) : (
            <img 
              src={isVehiculo && !isOpen ? logoBlanco : logoNegro}
              alt="TT Automotriz Logo"
              onError={() => setLogoError(true)}
              className="h-7 sm:h-8 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
            />
          )}
        </div>

        {/* Right Links (Desktop) - Centered in the right half space */}
        <div className="hidden lg:flex items-center justify-center gap-8 lg:flex-1">
          {navLinks.filter(link => link.label === 'Únete al equipo' || link.label.toLowerCase().includes('aliados')).map((link) => {
            const isActive = currentPath === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`font-sans font-medium text-sm transition-colors duration-200 relative py-1 cursor-pointer ${
                  isVehiculo
                    ? `${isActive ? 'text-white font-bold' : 'text-white/90 hover:text-white/80'}`
                    : `${isActive ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-navy-900'}`
                }`}
              >
                {link.label}
                {isActive && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isVehiculo ? 'bg-white' : 'bg-blue-600'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Section: CTA (Desktop - absolute right) and Hamburger (Mobile - flex-1) */}
        <div className="flex items-center justify-end z-10 lg:absolute lg:right-6 lg:top-1/2 lg:-translate-y-1/2 max-lg:flex-1">
          <div className="hidden sm:flex items-center">
            <Button 
              variant={isVehiculo ? "navbar-cta-dark" : "navbar-cta-light"} 
              onClick={() => handleLinkClick('/design-ordenar')}
              className="hover:scale-102 transition-transform"
            >
              Reservar
            </Button>
          </div>

          {/* Mobile Hamburger toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 focus:outline-none cursor-pointer ml-3 ${
              isVehiculo && !isOpen ? 'text-white hover:text-white/80' : 'text-gray-600 hover:text-navy-900'
            }`}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Expandable menu) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed top-[56px] left-0 right-0 bottom-0 bg-white lg:hidden flex flex-col z-40 overflow-y-auto h-[calc(100vh-56px)] w-full"
          >
            <div className="px-6 py-10 flex flex-col items-center w-full">

{/* ===== TARJETA PROMOCIONAL DEL VEHÍCULO (Solo Mobile) ===== */}
<button
  onClick={() => handleLinkClick('/vehiculo')}
  className="w-full flex items-center justify-center gap-4 py-4 mb-6 cursor-pointer"
>
  <img
    src="https://res.cloudinary.com/dpynwjc8f/image/upload/v1784138659/vehiculo_cortado_ljvs3m.png"
    alt="TT Model S01 Barrio"
    referrerPolicy="no-referrer"
    className="w-20 h-20 sm:w-39 sm:h-39 object-contain flex-shrink-0"
  />
  <div className="flex flex-col text-left">
    <span className="font-display text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight">
      S01 Bario
    </span>
    <span className="text-sm text-gray-500 underline underline-offset-2 mt-0.5">
      Más información
    </span>
  </div>
</button>
{/* ===== FIN TARJETA PROMOCIONAL DEL VEHÍCULO ===== */}

              {/* ===== LINKS DE NAVEGACIÓN PRINCIPALES ===== */}
              <div className="flex flex-col items-center justify-center gap-6 w-full flex-1">
                {navLinks
                  .filter(link => link.label !== 'Vehículo')
                  .map((link) => {
                    const isActive = currentPath === link.href;

                    return (
                      <button
                        key={link.href}
                        onClick={() => handleLinkClick(link.href)}
                        className={`w-full text-center font-display text-2xl sm:text-2xl md:text-2xl font-normal tracking-tight py-3 transition-colors duration-200 cursor-pointer ${
                          isActive ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'
                        }`}
                      >
                        {link.label}
                      </button>
                    );
                  })}
              </div>
              {/* ===== FIN LINKS DE NAVEGACIÓN PRINCIPALES ===== */}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};