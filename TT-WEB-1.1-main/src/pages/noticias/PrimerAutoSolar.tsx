import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';

// ============================================================
// IMAGEN DE LA NOTICIA
// Se usa vía URL (Cloudinary) en lugar de import local, ya que
// cada noticia tendrá su propia imagen hospedada externamente.
// La misma URL se usa en el hero, la imagen secundaria del
// cuerpo y el banner del CTA final — reemplázala cuando tengas
// las definitivas.
// ============================================================
const NEWS_IMAGE_URL = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784693648/iamgenes_seccion_vehiiculo_13_cws1yw.jpg';
const noticia = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1785128072/iamgenes_seccion_vehiiculo_xwsgz1.png';
const fotter = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784679614/iamgenes_seccion_vehiiculo_10_ollsar.jpg';


interface PrimerAutoSolarProps {
  onNavigate?: (path: any) => void;
}

export const PrimerAutoSolar: React.FC<PrimerAutoSolarProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-white">

      {/* ===================================================== */}
      {/* BANNER HERO COMPLETO (INSPIRADO EN VEHÍCULO)          */}
      {/* ===================================================== */}
      <section className="relative w-full min-h-[450px] md:h-[60vh] flex flex-col justify-between pt-24 sm:pt-28 pb-10 overflow-hidden">
        {/* Background Image with dark overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={NEWS_IMAGE_URL}
            alt="El primer auto eléctrico solar mexicano"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/80 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end h-full flex-grow text-white">
          
          {/* Back button inside hero */}
          <button
            onClick={() => onNavigate?.('/noticias')}
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-8 group cursor-pointer self-start"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver a Noticias
          </button>

          {/* Category & Date */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#538742] text-white text-xs sm:text-sm font-semibold">
              Lanzamiento
            </span>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-white/80">
              <Calendar className="w-4 h-4" />
              <span>Julio 2026</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-white/80">
              <User className="w-4 h-4" />
              <span>Equipo TT</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-white/60 mb-2 uppercase tracking-widest font-semibold">
            Elaborado por TT
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight mb-4 text-balance">
            El primer auto eléctrico solar mexicano
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed max-w-3xl">
            Cuando la eficiencia se convierte en justicia; El auto que México necesita
          </p>
        </div>
      </section>

      {/* ===================================================== */}
      {/* CUERPO DEL ARTÍCULO                                    */}
      {/* Texto centrado con márgenes gruesos estilo NYT en      */}
      {/* escritorio (max-w-2xl), más angosto que el hero.       */}
      {/* ===================================================== */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-14">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-navy-900 tracking-tight leading-tight text-center mb-4">
          El Sol como Motor: La Startup Mexicana que Desafía a los Gigantes de la Electromovilidad
        </h2>

        <p className="text-sm text-gray-500 text-center mb-3">
          29 de Mayo de 2026
        </p>

        <p className="text-base sm:text-lg font-bold text-navy-900 text-center leading-relaxed mb-8 md:mb-10">
          TT Automotriz presenta el Model 01 en Tlaxcala, un vehículo solar, que democratiza el acceso a la movilidad eléctrica
        </p>

        <div className="flex flex-col gap-5 text-sm sm:text-base text-gray-700 leading-relaxed text-left md:text-left">
          <p>
            Cuando Edgar subió al estrado por la mañana en Tlaxcala, no lo hizo para presentar un automóvil. Lo hizo para responder una pregunta que lleva décadas flotando sobre la industria nacional: ¿por qué tendría que venir de afuera lo que México es perfectamente capaz de construir?
          </p>

          <p>
            La respuesta fue el TT01.
          </p>

          <p>
            Un vehículo compacto, eléctrico, y —en lo que constituye su apuesta más audaz— alimentado por paneles solares integrados en su propia carrocería. Mientras las grandes marcas globales dominan los titulares del sector, TT Automotriz eligió otro camino. Uno más estrecho, sin duda, pero también más propio: componentes desarrollados con proveedores locales, un equipo reducido, y una convicción que funcionó como brújula durante todo el proceso.
          </p>

          <p>
            El objetivo no era el escaparate internacional. Era mover a los millones de mexicanos que hoy se trasladan en mototaxis sin cinturón de seguridad, en motocicletas con cuatro pasajeros, o simplemente no se trasladan porque no existe una opción viable.
          </p>

          <p>
            El TT01 puede cargarse en cualquier enchufe doméstico convencional, con la misma facilidad con la que se conecta un teléfono. No requiere infraestructura especial ni inversión adicional del usuario. Su sistema de baterías fue diseñado pensando en tres realidades distintas: el trabajador que recorre 70 kilómetros diarios entre casa y trabajo, el repartidor de última milla que necesita 150 kilómetros de autonomía, y el operador de transporte barrial que puede llegar a los 250. Cada configuración responde a una vida real, no a una proyección de laboratorio.
          </p>

          <p>
            Pero lo que distingue al TT01 de cualquier otro vehículo eléctrico en el mercado mexicano es lo que ocurre cuando el motor está apagado. Sus paneles solares capturan energía de forma continua, ya sea mientras el vehículo circula o permanece estacionado. Ocho horas de sol —algo que en buena parte del territorio nacional no exige mayor esfuerzo— generan autonomía suficiente para recorrer 50 kilómetros. Para el usuario promedio, eso significa desplazarse sin pagar ni gasolina ni electricidad.
          </p>

          <p>
            Al reducir en un 80 por ciento los componentes mecánicos respecto a un motor de combustión tradicional, el proyecto proyecta también un ahorro del 90 por ciento en costos de mantenimiento a lo largo de su vida útil. Una sola palabra orientó cada una de esas decisiones de diseño: eficiencia. No como concepto abstracto, sino como principio aplicado a una realidad concreta: un vehículo eléctrico no debería ser un lujo reservado para unos cuantos.
          </p>
        </div>

        {/* Imagen secundaria con pie de foto */}
        <div className="my-8 md:my-10">
          <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
            <img
              src={noticia}
              alt="Mtro. José Noe Altamirano Islas, Secretaría de Trabajo y Competitividad, Juan Carlos Coello"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            Mtro. José Noe Altamirano Islas, Secretaría de Trabajo y Competitividad, Juan Carlos Coello
          </p>
        </div>

        <div className="flex flex-col gap-5 text-sm sm:text-base text-gray-700 leading-relaxed text-left md:text-left mb-12 md:mb-16">
          <p>
            El proyecto, resguardado bajo propiedad intelectual nacional, sigue su proceso de desarrollo institucional. Sus creadores han extendido una invitación abierta a inversionistas, instituciones y aliados estratégicos, aunque la enmarcan menos como una oportunidad financiera y más como una decisión de pertenencia: la posibilidad de ser parte del momento en que México deja de manufacturar el futuro de otros para comenzar a construir el suyo propio.
          </p>
        </div>

        {/* Footer del artículo: volver / compartir */}
        <div className="border-t border-gray-100 mt-4 pt-6 mb-12 md:mb-16 flex justify-between items-center">
          <button
            onClick={() => onNavigate?.('/noticias')}
            className="text-sm font-bold text-blue-600 hover:underline cursor-pointer"
          >
            ← Ver otras publicaciones
          </button>

          <button className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-navy-900 uppercase tracking-wider cursor-pointer">
            <Share2 className="w-4 h-4" />
            Compartir
          </button>
        </div>

      </div>

      {/* ===================================================== */}
      {/* CTA FINAL: ÚNETE A NUESTRA MISIÓN                      */}
      {/* Imagen ancho completo + título + botón                */}
      {/* ===================================================== */}
      <div className="w-full">
        <div className="relative w-full aspect-[21/9] sm:aspect-[21/7] bg-gray-50">
          <img
            src={fotter}
            alt="Carga de vehículo eléctrico TT"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex flex-col items-center text-center gap-5">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-navy-900 tracking-tight">
            Únete a nuestra misión
          </h3>
          <button
            type="button"
            className="px-8 h-12 rounded-md bg-navy-900 text-white text-sm sm:text-base font-medium hover:bg-navy-800 transition-colors cursor-pointer"
          >
            Me interesa
          </button>
        </div>
      </div>

    </div>
  );
};