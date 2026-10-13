import React from 'react';
import { Rocket } from 'lucide-react';

// Placeholder images - reemplazar por las definitivas cuando estén listas
import solarRoof from '../assets/images/tt_solar_roof_1781751161759.jpg';
import chargePlug from '../assets/images/tt_charge_plug_1781751173453.jpg';
import negroCar from '../assets/images/negro.avif';
import blancoCar from '../assets/images/blanco.avif';
import mexicoMechanics from '../assets/images/mexico_mechanics_1782195152215.jpg';

const mexArch = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784693648/iamgenes_seccion_vehiiculo_13_cws1yw.jpg';


// ============================================================
// DATOS DE NOTICIAS
// Cada noticia debe redirigir a su propia página/artículo.
// Por ahora el link no está conectado a ninguna ruta real —
// busca el comentario "LINK DE LA NOTICIA AQUÍ" más abajo
// para saber exactamente dónde colocar la URL o navegación
// cuando exista la página individual de cada artículo.
// ============================================================
interface NewsItem {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
}

const featuredNews: NewsItem = {
  id: 'primer-auto-electrico-solar-mexicano',
  tag: 'Lanzamiento',
  title: 'El primer auto eléctrico solar mexicano',
  excerpt: 'Cuando Edgar subió al estrado por la mañana en Tlaxcala, no lo hizo para presentar un automóvil. Lo hizo para responder una pregunta que lleva décadas flotando sobre la...',
  image: mexArch,
};

// ===== NOTICIAS SECUNDARIAS (nombres sugeridos, solo de referencia visual) =====
interface SecondaryNewsItem {
  id: string;
  title: string;
  timeAgo: string;
  image: string;
}

const secondaryNews: SecondaryNewsItem[] = [
  {
    id: 'techo-solar-produccion',
    title: 'Así se fabrica el techo solar de TT',
    timeAgo: 'Hace 6 días',
    image: solarRoof,
  },
  {
    id: 'carga-en-casa-guia',
    title: 'Carga tu TT en casa sin instalación adicional',
    timeAgo: 'Hace 1 mes',
    image: chargePlug,
  },
  {
    id: 'reservas-abiertas',
    title: 'Abrimos reservas para el Model S01 Barrio',
    timeAgo: 'Hace 2 meses',
    image: negroCar,
  },
  {
    id: 'nuevo-color-blanco',
    title: 'TT presenta nuevo color: Blanco Puebla',
    timeAgo: 'Hace 3 meses',
    image: blancoCar,
  },
  {
    id: 'equipo-manufactura-mexico',
    title: 'Conoce al equipo detrás de la manufactura mexicana',
    timeAgo: 'Hace 3 meses',
    image: mexicoMechanics,
  },
  {
    id: 'primeros-100-apartados',
    title: 'TT llega a los primeros 100 apartados',
    timeAgo: 'Hace 4 meses',
    image: mexArch,
  },
];

interface NoticiasProps {
  onNavigate?: (path: any) => void;
}

export const Noticias: React.FC<NoticiasProps> = ({ onNavigate }) => {
  // ===== FECHA ACTUAL FORMATEADA =====
  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-14">

        {/* ===================================================== */}
        {/* ENCABEZADO / MENÚ DE LA PÁGINA DE NOTICIAS             */}
        {/* ===================================================== */}
        <div className="mb-8 md:mb-10">
          <p className="text-xs sm:text-sm text-gray-500 mb-2 capitalize">
            {formattedDate}
          </p>
          <div className="border-t-2 border-navy-900 pt-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-navy-900 tracking-tight">
              Noticias TT
            </h1>
          </div>
        </div>

        {/* ===================================================== */}
        {/* NOTICIA DESTACADA                                      */}
        {/* ===================================================== */}
        <button
          type="button"
          onClick={() => {
            onNavigate?.('/noticias/primer-auto-electrico-solar-mexicano');
          }}
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start text-left cursor-pointer group border-b border-gray-100 pb-8 md:pb-10"
        >
          {/* Texto */}
          <div className="flex flex-col gap-4 order-2 lg:order-1">
            <span className="inline-flex w-fit items-center px-3 py-1 rounded-md bg-[#538742] text-white text-xs sm:text-sm font-semibold">
              {featuredNews.tag}
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-navy-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
              {featuredNews.title}
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg">
              {featuredNews.excerpt}
            </p>
          </div>

          {/* Imagen */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </button>

        {/* ===================================================== */}
        {/* GRILLA DE NOTICIAS SECUNDARIAS                         */}
        {/* ===================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 mt-8 md:mt-10">
          {secondaryNews.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                // ============================================================
                // LINK DE LA NOTICIA AQUÍ
                // Cuando exista la página individual de este artículo,
                // reemplaza este comentario por la navegación real, por ejemplo:
                // navigateTo(`/noticias/${item.id}`)
                // o window.location / react-router según cómo esté armado el router.
                // ============================================================
              }}
              className="flex items-center gap-4 text-left cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Texto */}
              <div className="flex flex-col gap-1.5 min-w-0">
                <h3 className="text-sm sm:text-base font-display font-bold text-navy-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    {item.timeAgo}
                  </span>
                  <Rocket className="w-3.5 h-3.5 text-blue-600" />
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};