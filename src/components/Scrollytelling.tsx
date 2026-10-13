import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle2, DollarSign, Sun, Wrench } from 'lucide-react';

import mountainRoad from '../assets/images/caminomonte.png';
import solarRoof from '../assets/images/tt_solar_roof_1781751161759.jpg';
import chargePlug from '../assets/images/tt_charge_plug_1781751173453.jpg';
import mexicoMechanics from '../assets/images/mexico_mechanics_1782195152215.jpg';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ComponentType<any>;
}

export const Scrollytelling: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps: Step[] = [
    {
      id: 0,
      title: "Hecho para durar, equipado para disfrutar",
      subtitle: "DISEÑO INTELIGENTE",
      description: "Interior resistente al uso diario, asientos para toda la familia y conecta tu cel o pon la radio desde el primer día. Sin pantallas ni sensores que fallen, solo lo vital para un trayecto sin molestias.",
      image: mountainRoad,
      icon: CheckCircle2
    },
    {
      id: 1,
      title: "Recargar cuesta menos",
      subtitle: "EFICIENCIA ECONÓMICA",
      description: "Ser propietario de un TT cuesta menos que ser propietario de un auto o moto equivalente de gasolina. Menos gasto energético por kilómetro recorrido.",
      image: chargePlug,
      icon: DollarSign
    },
    {
      id: 2,
      title: "Prácticamente no requiere mantenimiento",
      subtitle: "TRANQUILIDAD ABSOLUTA",
      description: "No necesita cambios de aceite, afinaciones ni verificación de emisiones. Solo carga en casa o usando energía solar, y mantén tu vehículo siempre rodando sin complicaciones.",
      image: solarRoof,
      icon: Sun
    },
    {
      id: 3,
      title: "Menos piezas a reemplazar",
      subtitle: "INGENIERÍA SIMPLIFICADA",
      description: "El motor de un auto de gasolina tiene más de 1,000 piezas móviles — los trenes motrices de TT tienen alrededor de 20. Menos piezas móviles significan menos reparaciones con el tiempo y mayor confiabilidad.",
      image: mexicoMechanics,
      icon: Wrench
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0.1,
    };

    const observers: IntersectionObserver[] = [];

    steps.forEach((_, index) => {
      const element = document.getElementById(`scrolly-step-${index}`);
      if (element) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStep(index);
            }
          });
        }, observerOptions);
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-slate-950 overflow-visible">
      {/* Sticky Background Container (100vh) */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          return (
            <div
              key={step.id}
              className="absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <img
                src={step.image}
                alt={step.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out scale-102"
                style={{
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                }}
              />
              {/* Premium dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/75 z-10" />
            </div>
          );
        })}

        {/* Elegant Progress indicators (Apple/Rolex inspired vertical bullets) */}
        <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-5">
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <button
                key={step.id}
                onClick={() => {
                  const el = document.getElementById(`scrolly-step-${index}`);
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center justify-end gap-4 text-right cursor-pointer border-none bg-transparent focus:outline-none"
              >
                <span
                  className="text-xs font-mono font-medium tracking-widest text-white/50 group-hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 uppercase"
                  style={{ opacity: isActive ? 1 : undefined, color: isActive ? '#fff' : undefined }}
                >
                  {step.subtitle}
                </span>
                <div
                  className="w-2.5 h-2.5 rounded-full border border-white/30 transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? '#fff' : 'transparent',
                    transform: isActive ? 'scale(1.25)' : 'scale(1)',
                    borderColor: isActive ? '#fff' : undefined,
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrolling Text Content Layer (Moves dynamically above the sticky background) */}
      <div className="relative z-10 w-full pointer-events-none">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              id={`scrolly-step-${index}`}
              className="w-full h-[200vh] flex items-center justify-center px-4 sm:px-6 lg:px-8"
            >
              {/* Floating elegant Glassmorphism card */}
              <div className="sticky top-1/2 -translate-y-1/2 max-w-2xl w-full bg-black/45 backdrop-blur-xl border border-white/10 p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl text-white shadow-2xl pointer-events-auto transition-all duration-700 hover:border-white/20">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="p-2 sm:p-2.5 bg-white/10 rounded-xl">
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-blue-400 stroke-[1.5]" />
                  </div>
                  <span className="text-xs font-mono font-semibold tracking-widest text-blue-400 uppercase">
                    {step.subtitle}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-tight mb-3 sm:mb-4">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
