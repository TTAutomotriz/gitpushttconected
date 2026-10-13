import React from 'react';
import { PageRoute } from '../types';
import { Facebook, Instagram, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6 relative z-10 w-full">
      <div className="max-w-8xl mx-auto flex flex-col gap-6">
        
        {/* Fila superior */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left w-full">
          {/* Menú de navegación horizontal izquierdo (con links: Empleo, Proveedores, Noticias) */}
          <div className="flex flex-row flex-nowrap justify-center sm:justify-start items-center gap-x-3.5 sm:gap-x-8 w-full sm:w-auto">
            <button 
              onClick={() => onNavigate('/unete-al-equipo')} 
              className="text-gray-500 font-sans text-[10px] sm:text-sm font-normal hover:text-black transition-colors duration-150 whitespace-nowrap"
            >
              Empleo
            </button>
            <button 
              onClick={() => onNavigate('/aliados-proveedores')} 
              className="text-gray-500 font-sans text-[10px] sm:text-sm font-normal hover:text-black transition-colors duration-150 whitespace-nowrap"
            >
              Proveedores
            </button>
            <a 
              href="#noticias"
              className="text-gray-500 font-sans text-[10px] sm:text-sm font-normal hover:text-black transition-colors duration-150 whitespace-nowrap"
            >
              Noticias
            </a>
          </div>

          {/* Tres botones redondos blancos a la derecha, estos son los del final */}
          <div className="flex items-center justify-center gap-3">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md border border-gray-100 flex items-center justify-center text-gray-800 hover:text-blue-600 transition-all duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md border border-gray-100 flex items-center justify-center text-gray-800 hover:text-pink-600 transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="tel:+11234567890" 
              className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md border border-gray-100 flex items-center justify-center text-gray-800 hover:text-green-600 transition-all duration-200"
              aria-label="Teléfono"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="border-t border-gray-200 w-full" />

        {/* Fila inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left w-full">
          {/* Copyright izquierdo */}
          <span className="text-gray-500 text-xs sm:text-sm font-normal font-sans w-full md:w-auto text-center md:text-left">
            TT Automotriz © 2026
          </span>

          {/* Tres links en línea derechos */}
          <div className="flex flex-row flex-nowrap justify-center md:justify-end items-center gap-x-3.5 sm:gap-x-8 w-full md:w-auto">
            <a 
              href="#portal" 
              className="text-gray-500 font-sans text-[10px] sm:text-sm font-normal hover:text-black transition-colors duration-150 whitespace-nowrap"
            >
              Portal
            </a>
            <button 
              onClick={() => onNavigate('/aliados-proveedores')} 
              className="text-gray-500 font-sans text-[10px] sm:text-sm font-normal hover:text-black transition-colors duration-150 whitespace-nowrap"
            >
              Atención & Servicio
            </button>
            <a 
              href="/aviso-de-privacidad" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/aviso-de-privacidad');
              }}
              className="text-gray-500 font-sans text-[10px] sm:text-sm font-normal hover:text-black transition-colors duration-150 whitespace-nowrap cursor-pointer"
            >
              Aviso de Privacidad Integral
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
