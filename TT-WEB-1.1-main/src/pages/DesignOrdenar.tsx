import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Sun, Gauge, Check, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '../components/Button';
import { StatBlock } from '../components/StatBlock';

// Placeholder images - reemplazar por las definitivas cuando estén listas
import heroSuvs from '../assets/images/tt_hero_suvs_1781751145156.jpg';
import mexicoMechanics from '../assets/images/mexico_mechanics_1782195152215.jpg';
import mountainRoad from '../assets/images/caminomonte.png';


const solarRoof = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784679614/iamgenes_seccion_vehiiculo_10_ollsar.jpg';
const blancoCar = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784677661/iamgenes_seccion_vehiiculo_3_dwvj0q.jpg';
const portoncar = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784676443/iamgenes_seccion_vehiiculo_n22zqg.jpg';




export const DesignOrdenar: React.FC = () => {

  // ===== VELOCIDAD DE TRANSICIÓN DE LAS IMÁGENES =====
  // Modifica este valor (en segundos) para cambiar la velocidad de la animación
  const IMAGE_TRANSITION_DURATION = 0.3;

  // ===== VELOCIDAD DE APARICIÓN DE LA BARRA STICKY (MENÚ EMERGENTE) =====
  // Modifica este valor (en segundos) para cambiar la velocidad con la que baja o sube la barra de arriba
  const STICKY_BAR_DURATION = 0.8; // Por ejemplo, 0.6 o 0.8 para hacerla más suave y lenta

  // ===== ESPACIO EN BLANCO AL FINAL (ESCRITORIO) =====
  // Modifica esta clase de Tailwind (por ejemplo, lg:pb-[50vh], lg:pb-[75vh], lg:pb-[90vh])
  // para aumentar o disminuir el espacio vacío al final de la columna derecha en escritorio.
  const DESKTOP_BOTTOM_SPACE = 'lg:pb-[70vh]';




  // ===== BARRA STICKY: aparece al pasar el texto "Aparta gratis..." =====
const [showStickyBar, setShowStickyBar] = useState(false);
const heroTextRef = useRef<HTMLParagraphElement>(null);

useEffect(() => {
  const el = heroTextRef.current;
  if (!el) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      // Se muestra cuando el texto ya salió por arriba de la pantalla (scrolled past)
      setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    },
    { root: null, threshold: 0 }
  );

  observer.observe(el);
  return () => observer.disconnect();
}, []);



  // ===== ESTADO: DETECTAR DESPLAZAMIENTO PARA OCULTAR TITULO =====
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 15);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);



  // ===== ESTADO: SELECCIONES DEL CONFIGURADOR =====
  const [paymentMethod, setPaymentMethod] = useState<'semanal' | 'contado'>('semanal');
  const [selectedTerm, setSelectedTerm] = useState<string>('');
  const [selectedRange, setSelectedRange] = useState<'70' | '150' | '250'>('250');
  const [solarOption, setSolarOption] = useState<'no' | 'si'>('si');
  const [interiorOption, setInteriorOption] = useState<'tela' | 'cuero'>('tela');
  const [isGasSavingChecked, setIsGasSavingChecked] = useState(true);

  // ===== ESTADO: FORMULARIO FINAL =====
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [estado, setEstado] = useState('');
  const [unidades, setUnidades] = useState('1');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ===== CALCULA DE AHORROS MODAL =====
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [useSolar, setUseSolar] = useState<boolean>(true);
  const [kmPerDay, setKmPerDay] = useState<number>(60);
  const [isDraggingKm, setIsDraggingKm] = useState<boolean>(false);
  const [kmDirection, setKmDirection] = useState<number>(0);

  // States and refs for carousel dragging gesture
  const dragStartX = useRef<number | null>(null);
  const dragStartKm = useRef<number>(60);
  const [isDraggingKmCarousel, setIsDraggingKmCarousel] = useState<boolean>(false);

  // ===== DETERMINAR ALTURA DE IMAGEN MÓVIL CONGRUENTE CON LA PÁGINA VEHÍCULO =====
  const [imageHeight, setImageHeight] = useState<number>(190);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setImageHeight(190); // 285 * 2/3 = 190px
      } else if (width < 768) {
        setImageHeight(227); // 340 * 2/3 = 226.6px
      } else {
        setImageHeight(253); // 380 * 2/3 = 253.3px
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleKmCarouselPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    dragStartKm.current = kmPerDay;
  };

  const handleKmCarouselPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const deltaX = e.clientX - dragStartX.current;
    
    // Only activate dragging state if the user moved the pointer by more than 5 pixels
    if (!isDraggingKmCarousel && Math.abs(deltaX) > 5) {
      setIsDraggingKmCarousel(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (err) {}
    }

    if (isDraggingKmCarousel || Math.abs(deltaX) > 5) {
      const stepSize = 30; // 30px per km for super smooth and responsive control
      const steps = Math.round(deltaX / stepSize);
      
      // Dragging left (negative deltaX) advances to larger numbers, dragging right (positive deltaX) goes to smaller numbers
      const targetKm = dragStartKm.current - steps;
      const clampedKm = Math.max(2, targetKm);
      
      if (clampedKm !== kmPerDay) {
        setKmDirection(clampedKm > kmPerDay ? 1 : -1);
        setKmPerDay(clampedKm);
      }
    }
  };

  const handleKmCarouselPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    dragStartX.current = null;
    setIsDraggingKmCarousel(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  // Press and hold continuous change for kilometer selector
  const holdTimeoutRef = useRef<any>(null);
  const holdIntervalRef = useRef<any>(null);

  const startContinuousChange = (direction: 'increment' | 'decrement') => {
    if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);

    // Immediate initial step
    if (direction === 'increment') {
      setKmDirection(1);
      setKmPerDay(prev => prev + 1);
    } else {
      setKmDirection(-1);
      setKmPerDay(prev => Math.max(2, prev - 1));
    }

    // Start repeating if held for more than 350ms
    holdTimeoutRef.current = setTimeout(() => {
      holdIntervalRef.current = setInterval(() => {
        if (direction === 'increment') {
          setKmDirection(1);
          setKmPerDay(prev => prev + 1);
        } else {
          setKmDirection(-1);
          setKmPerDay(prev => {
            if (prev <= 2) {
              if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
              return 2;
            }
            return prev - 1;
          });
        }
      }, 75); // Fluid step every 75ms
    }, 350);
  };

  const stopContinuousChange = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  const calculateYearlySavings = () => {
    const baseSavingPerKm = 1.595; // Configured precisely to get ~ $45,691 at 60km/day with solar
    const solarSavingsBonus = 10801;
    
    let savings = kmPerDay * 365 * baseSavingPerKm;
    if (useSolar) {
      savings += solarSavingsBonus;
    }
    
    return Math.round(savings);
  };

  const yearlySavings = calculateYearlySavings();
  const monthlySavings = Math.round(yearlySavings / 12);
  const fiveYearSavings = Math.round(yearlySavings * 5);

  const formattedYearlySavings = `$${yearlySavings.toLocaleString()}`;
  const formattedMonthlySavings = `$${monthlySavings.toLocaleString()}`;
  const formattedFiveYearSavings = `$${fiveYearSavings.toLocaleString()}`;

  // ===== IMAGEN ACTIVA (Desktop: fija a la izquierda, cambia según sección) =====
  const [activeSection, setActiveSection] = useState(0);

  const sectionImages = [solarRoof, portoncar, mountainRoad, blancoCar];

  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.findIndex((ref) => ref.current === entry.target);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const rangeData = [
    { id: '70', label: '70 kilómetros', price: '$950 / Semanales' },
    { id: '150', label: '150 kilómetros', price: 'Desde 125,000' },
    { id: '250', label: '250 kilómetros', price: 'Desde 150,000' },
  ];

  const termOptions = ['90', '104', '130', '142'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre && apellido && telefono && estado) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3500);
    }
  };

  return (
    <div className="w-full bg-white pt-[56px]">
{/* ===================================================== */}
    {/* BARRA STICKY: aparece al hacer scroll pasado el hero   */}
    {/* Se oculta de nuevo al subir y ver "Aparta gratis..."   */}
    {/* ===================================================== */}
    <AnimatePresence>
      {showStickyBar && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: STICKY_BAR_DURATION, ease: [0.16, 1, 0.3, 1] }}
          className="sticky top-[0px] left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex flex-col gap-2">
            {/* Fila 1: Título + precio */}
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
              <h3 className="text-lg sm:text-xl font-display font-normal text-navy-900 tracking-tight text-center sm:text-left">
                Modelo Barrio 01
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                Desde $99,000 de contado o $950 a 142 Semanas
              </p>
            </div>

            {/* Divisor */}
            <div className="w-full h-px bg-gray-100" />

            {/* Fila 2: Producción + CTA */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-between lg:justify-end lg:self-end lg:w-auto">
              <p className="text-xs sm:text-sm text-gray-600">
                La producción empieza en <span className="text-[#538742] font-medium">2027</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  sectionRefs[3].current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="text-xs sm:text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                Aparta Hoy (Gratis)
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-4 pb-8 md:pt-6 md:pb-12">
      

        {/* ===== HEADER GLOBAL DE LA PÁGINA ===== */}


        <div className="mb-4 md:mb-5 lg:hidden">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-navy-900 tracking-tight leading-tight">
            Aparta tu carro eléctrico hoy <br className="hidden sm:block" />
            Sin enganche, por lanzamiento
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-16">


          {/* ===================================================== */}
          {/* COLUMNA IZQUIERDA (Desktop): IMAGEN FIJA (STICKY)      */}
          {/* No se muestra en mobile (cada sección trae su imagen) */}
          {/* ===================================================== */}
          <div className="hidden lg:block relative">
            <div className={`sticky top-[55%] -translate-y-1/2 w-full flex flex-col transition-all duration-300 ${isScrolled ? 'gap-0' : 'gap-6'}`}>
              <motion.h1
                animate={{
                  opacity: isScrolled ? 0 : 1,
                  y: isScrolled ? -20 : 0,
                  height: isScrolled ? 0 : 'auto',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="text-3xl font-display font-normal text-navy-900 tracking-tight leading-tight overflow-hidden"
              >
                Aparta tu carro eléctrico hoy <br />
                Sin enganche, por lanzamiento
              </motion.h1>
              <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                <AnimatePresence>
                  <motion.img
                    key={activeSection}
                    src={sectionImages[activeSection]}
                    alt="TT Model S01 Barrio"
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: IMAGE_TRANSITION_DURATION }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
          {/* ===================================================== */}
          {/* COLUMNA DERECHA: MENÚ / CONFIGURADOR (se desplaza)     */}
          {/* ===================================================== */}
          <div className={`flex flex-col gap-10 md:gap-14 lg:gap-36 ${DESKTOP_BOTTOM_SPACE}`}>

            {/* ---------- SECCIÓN 1: HERO / MODELO ---------- */}
            <div ref={sectionRefs[0]} className="flex flex-col gap-5 items-center text-center">
              {/* Imagen visible solo en mobile, arriba de la sección */}
              <div 
                className="lg:hidden relative w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-100"
                style={{ height: `${imageHeight}px` }}
              >
                <img
                  src={sectionImages[0]}
                  alt="TT Model S01 Barrio"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-normal text-navy-900 tracking-tight">
                Model S01 Barrio
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Electrico</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Techo Solar</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>+250km</span>
                </div>
              </div>

           <p ref={heroTextRef} className="text-sm sm:text-base text-gray-700">
          Desde $99,000 de contado o $950 a 142 Semanas.
          </p>
            </div>

            {/* ---------- SECCIÓN 2: FORMA DE PAGO + VERSIÓN ---------- */}
            <div ref={sectionRefs[1]} className="flex flex-col gap-5">
              {/* Imagen visible solo en mobile */}
              <div 
                className="lg:hidden relative w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-100"
                style={{ height: `${imageHeight}px` }}
              >
                <img
                  src={sectionImages[1]}
                  alt="Interior TT"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Forma de Pago */}
              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-navy-900 mb-3">
                  Forma de Pago
                </h3>
                <div className="flex flex-col gap-3">
                  <div
                    onClick={() => setPaymentMethod('semanal')}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'semanal'
                        ? 'border-blue-600 ring-1 ring-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm sm:text-base text-gray-900 font-medium">Pagos semanales</span>
                    {paymentMethod === 'semanal' && (
                      <div 
                        onClick={(e) => e.stopPropagation()}
                        className="relative flex items-center bg-gray-50 hover:bg-gray-100 rounded-lg px-2 py-1 border border-gray-200 transition-colors"
                      >
                        <select
                          value={selectedTerm}
                          onChange={(e) => setSelectedTerm(e.target.value)}
                          className="appearance-none bg-transparent pr-6 pl-2 py-0.5 text-xs sm:text-sm text-gray-700 hover:text-blue-600 font-medium cursor-pointer border-none outline-none focus:ring-0 text-left"
                        >
                          <option value="">Plazos</option>
                          {termOptions.map((term) => (
                            <option key={term} value={term}>
                              {term} semanas
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 pointer-events-none" />
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => setPaymentMethod('contado')}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'contado'
                        ? 'border-blue-600 ring-1 ring-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm sm:text-base text-gray-900 font-medium">De contado (Pago unico)</span>
                  </div>
                </div>
              </div>

              {/* Versión / Autonomía */}
              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-navy-900 mb-3">
                  Versión. <span className="font-normal text-gray-500">Elige la autonomía.</span>
                </h3>
                <div className="flex flex-col gap-3">
                  {rangeData.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedRange(item.id as '70' | '150' | '250')}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedRange === item.id
                          ? 'border-blue-600 ring-1 ring-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm sm:text-base text-gray-900 font-medium">{item.label}</span>
                      <span className="text-xs sm:text-sm text-gray-500">{item.price}</span>
                    </button>
                  ))}
                </div>
                <div 
                  onClick={() => setIsGasSavingChecked(!isGasSavingChecked)}
                  className="flex items-start gap-2 mt-3 cursor-pointer select-none group"
                >
                  <div className="mt-0.5 w-4 h-4 rounded-sm border border-gray-300 flex items-center justify-center flex-shrink-0 transition-colors group-hover:border-gray-400">
                    {isGasSavingChecked && <Check className="w-3 h-3 text-blue-600" />}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    *Incluye un ahorro estimado de $188,000 en gasolina en 5 años
                  </p>
                </div>
              </div>
            </div>

            {/* ---------- SECCIÓN 3: TECHO SOLAR + INTERIOR INCLUIDO ---------- */}
            <div ref={sectionRefs[2]} className="flex flex-col gap-5">
              {/* Imagen visible solo en mobile */}
              <div 
                className="lg:hidden relative w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-100"
                style={{ height: `${imageHeight}px` }}
              >
                <img
                  src={sectionImages[2]}
                  alt="TT en camino de terracería"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-navy-900 mb-1">
                  Techo Solar. <span className="font-normal text-gray-500">
                    Ahorra incluso estacionado.{' '}
                    <span 
                      onClick={() => setIsCalculatorModalOpen(true)}
                      className="text-gray-500 underline underline-offset-2 text-sm cursor-pointer hover:text-blue-600 transition-colors inline-block"
                    >
                      Más información
                    </span>
                  </span>
                </h3>
                <div className="flex flex-col gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => setSolarOption('no')}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-all cursor-pointer ${
                      solarOption === 'no'
                        ? 'border-blue-600 ring-1 ring-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm sm:text-base text-gray-900 font-medium">No quiero el ahorro, gracias</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSolarOption('si')}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-all cursor-pointer ${
                      solarOption === 'si'
                        ? 'border-blue-600 ring-1 ring-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm sm:text-base text-gray-900 font-medium">Si, me interesa</span>
                    <span className="text-xs sm:text-sm text-gray-500">+ $25,000</span>
                  </button>
                </div>
                <p className="text-xs text-gray-400 italic mt-3">
                  Apartarlo es gratis no pagaras nada
                </p>
              </div>

              {/* Interior */}
              <div className="flex flex-col items-center text-center bg-[#fbfaf8] rounded-xl p-6 mt-2 border border-gray-100 w-full">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                  {interiorOption === 'tela' ? 'Incluido' : '+$20,000'}
                </span>
                <h4 className="text-base sm:text-lg font-display font-bold text-navy-900">
                  Interior en negro mate
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {interiorOption === 'tela' ? 'Tela' : 'Cuero'}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  {/* Botón de Tela (Negro) */}
                  <button
                    type="button"
                    onClick={() => setInteriorOption('tela')}
                    className={`w-9 h-9 rounded-full bg-gray-900 border-2 border-white shadow-sm transition-all cursor-pointer focus:outline-none ${
                      interiorOption === 'tela'
                        ? 'ring-2 ring-[#538742] ring-offset-2'
                        : 'hover:scale-105'
                    }`}
                    title="Interior en Tela"
                  />
                  {/* Botón de Cuero (Gris) */}
                  <button
                    type="button"
                    onClick={() => setInteriorOption('cuero')}
                    className={`w-9 h-9 rounded-full bg-gray-200 border-2 border-white shadow-sm transition-all cursor-pointer focus:outline-none ${
                      interiorOption === 'cuero'
                        ? 'ring-2 ring-[#538742] ring-offset-2'
                        : 'hover:scale-105'
                    }`}
                    title="Interior en Cuero"
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-3">
                  interior de cinco asientos
                </p>
              </div>
            </div>

            {/* ---------- SECCIÓN 4: FORMULARIO "APARTALO GRATIS" ---------- */}
            <div ref={sectionRefs[3]} className="flex flex-col gap-5">
              {/* Imagen visible solo en mobile */}
              <div 
                className="lg:hidden relative w-full overflow-hidden rounded-2xl bg-gray-950"
                style={{ height: `${imageHeight}px` }}
              >
                <img
                  src={sectionImages[3]}
                  alt="TT circulando de noche"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
                <div className="relative z-10 h-full flex flex-col justify-between p-5 text-white">
                  <p className="text-lg sm:text-xl font-display leading-snug">
                    Tu <span className="font-bold not-italic">primer</span> vehiculo <br />
                    <span className="font-bold not-italic">electrico</span> es TT
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    Impulsado por el <span className="font-bold not-italic">Sol</span> <br />
                    Fabricado 100% en <span className="font-bold not-italic">México</span>
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center text-center py-10 gap-3">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-display font-black text-navy-900">
                    ¡Apartado exitoso!
                  </h3>
                  <p className="text-sm text-gray-500 max-w-xs">
                    Gracias {nombre}, hemos registrado tu preferencia. Un asesor TT te contactará pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-display font-bold text-navy-900">
                      Apartalo gratis. <span className="font-normal text-gray-500">Guarda tu eleccion y recibe actualizaciones</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Nombre
                      </label>
                      <input
                        type="text"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Tu nombre"
                        className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        &nbsp;
                      </label>
                      <input
                        type="text"
                        required
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        placeholder="Apellido"
                        className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      WhatsApp / Teléfono
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center justify-center h-11 px-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 flex-shrink-0">
                        🇲🇽 +52
                      </div>
                      <input
                        type="tel"
                        required
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="22 14 09 20 21"
                        className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Estado / Ciudad
                    </label>
                    <input
                      type="text"
                      required
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      placeholder="Dónde Vives?"
                      className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Cuantas unidades te interesa ?
                    </label>
                    <select
                      value={unidades}
                      onChange={(e) => setUnidades(e.target.value)}
                      className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800 cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full h-12 mt-2"
                  >
                    Apartar ahora Gratis
                  </Button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* VENTANA EMERGENTE DE CALCULADORA */}
      <AnimatePresence>
        {isCalculatorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto" id="calculator-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.01 } }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsCalculatorModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 5, transition: { duration: 0.05 } }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-white rounded-2xl p-5 sm:p-8 md:p-10 shadow-2xl z-10 border border-gray-100 flex flex-col max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsCalculatorModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full">
                
                {/* Calculator block logic directly mirrored */}
                <div className="w-full h-auto bg-gray-100 rounded-xl p-5 sm:p-7 md:p-8 lg:p-10 flex flex-col justify-between items-center">
                  
                  {/* MOBILE ONLY LAYOUT */}
                  <div className="flex flex-col lg:hidden space-y-6 w-full items-center">
                   

                    {/* Centered Result Block wrapped in a container */}
                    <div className="w-full bg-white border border-gray-200/60 rounded-xl p-4 sm:p-5 text-center space-y-1 sm:space-y-2 !mt-1 sm:!mt-2 overflow-hidden">
                      <p className="text-blue-600 text-xs sm:text-sm font-bold">
                        Ahorro con {useSolar ? 'eléctrico y techo solar' : 'solo eléctrico'}
                      </p>
                      <div className="flex flex-col items-center justify-center py-1 w-full">
                        <span className="h-12 sm:h-16 overflow-hidden inline-flex items-center">
                          <motion.span
                            key={`yearly-num-mob-${useSolar}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-blue-600 inline-block"
                          >
                            {formattedYearlySavings}
                          </motion.span>
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold text-black uppercase tracking-widest whitespace-nowrap mt-1">
                          Al año
                        </span>
                      </div>
                    </div>

                    {/* Two StatBlocks below */}
                    <div className="flex items-center justify-between w-full">
                      <div className="flex-1">
                        <StatBlock
                          size="normal"
                          className="flex flex-col items-center justify-center text-center bg-transparent border-none !p-1 sm:!p-2 !gap-1 text-xs sm:text-sm w-full"
                          value={formattedMonthlySavings}
                          label="Por mes"
                          animateValue={true}
                          animationKey={String(useSolar)}
                        />
                      </div>
                      {/* Fine blue vertical divider */}
                      <div className="w-[1.5px] h-10 bg-blue-600/40 self-center" />
                      <div className="flex-1">
                        <StatBlock
                          size="normal"
                          className="flex flex-col items-center justify-center text-center bg-transparent border-none !p-1 sm:!p-2 !gap-1 text-xs sm:text-sm w-full"
                          value={formattedFiveYearSavings}
                          label="En 5 años"
                          animateValue={true}
                          animationKey={String(useSolar)}
                        />
                      </div>
                    </div>

                    <p className="text-blue-600 text-xs sm:text-sm font-bold text-center">
                      Equipamiento
                    </p>

                    {/* Pill-Toggle for Electric / Electric+Solar as a sliding switch */}
                    <div className="relative flex bg-gray-200/80 p-1 rounded-lg w-full max-w-[280px] h-10 select-none">
                      {/* Sliding active background */}
                      <motion.div
                        className="absolute top-1 bottom-1 left-1 bg-blue-600 shadow-sm animate-none"
                        style={{
                          width: 'calc(50% - 4px)',
                        }}
                        animate={{
                          x: useSolar ? '100%' : '0%',
                          borderTopLeftRadius: useSolar ? 0 : 6,
                          borderBottomLeftRadius: useSolar ? 0 : 6,
                          borderTopRightRadius: useSolar ? 6 : 0,
                          borderBottomRightRadius: useSolar ? 6 : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />

                      <button
                        type="button"
                        onClick={() => setUseSolar(false)}
                        className={`relative z-10 w-1/2 h-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-colors duration-200 focus:outline-none rounded-l-lg rounded-r-none ${
                          !useSolar ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Solo eléctrico
                      </button>
                      <button
                        type="button"
                        onClick={() => setUseSolar(true)}
                        className={`relative z-10 w-1/2 h-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-colors duration-200 focus:outline-none rounded-r-lg rounded-l-none ${
                          useSolar ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Eléctrico Solar
                      </button>
                    </div>

                    <p className="text-blue-600 text-xs sm:text-sm font-bold text-center">
                      ¿Cuánta distancia recorres al día?
                    </p>

                    {/* Carousel kilometer selector within a centered card */}
                    <div className="w-full max-w-xs bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col items-center shadow-sm select-none">
                      <div className="relative w-full flex items-center justify-between">
                        {/* Left Navigation Arrow */}
                        <button
                          type="button"
                          onPointerDown={(e) => {
                            if (kmPerDay > 2) {
                              startContinuousChange('decrement');
                            }
                          }}
                          onPointerUp={stopContinuousChange}
                          onPointerLeave={stopContinuousChange}
                          onPointerCancel={stopContinuousChange}
                          disabled={kmPerDay <= 2}
                          className="z-10 p-2 rounded-full bg-gray-50 border border-gray-100 shadow-sm text-gray-500 hover:text-blue-600 hover:bg-white active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer select-none touch-none"
                        >
                          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                        </button>

                        {/* Carousel Display Area */}
                        <div className="relative flex-1 h-[92px] overflow-hidden flex flex-col items-center justify-between mx-2">
                          {/* Fixed "Uso" label outside of translating block */}
                          <div className="h-5 flex items-center justify-center select-none pointer-events-none">
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={kmPerDay <= 70 ? 'normal' : kmPerDay <= 120 ? 'moderado' : 'intensivo'}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 4 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="text-[10px] sm:text-[11px] font-bold text-blue-600 uppercase tracking-wider leading-none select-none whitespace-nowrap"
                              >
                                {kmPerDay <= 70 ? 'Uso normal' : kmPerDay <= 120 ? 'Uso moderado' : 'Uso intensivo'}
                              </motion.span>
                            </AnimatePresence>
                          </div>

                          <div 
                            onPointerDown={handleKmCarouselPointerDown}
                            onPointerMove={handleKmCarouselPointerMove}
                            onPointerUp={handleKmCarouselPointerUp}
                            onPointerCancel={handleKmCarouselPointerUp}
                            className={`relative w-full h-12 flex items-center justify-center overflow-hidden touch-none select-none transition-colors ${
                              isDraggingKmCarousel ? 'cursor-grabbing bg-blue-50/20 rounded-xl' : 'cursor-grab'
                            }`}
                          >
                            <AnimatePresence initial={false} mode="popLayout">
                              <motion.div
                                key={kmPerDay}
                                custom={kmDirection}
                                variants={{
                                  enter: (dir: number) => ({
                                    x: dir > 0 ? 40 : -40,
                                    opacity: 0,
                                    scale: 0.8
                                  }),
                                  center: {
                                    x: 0,
                                    opacity: 1,
                                    scale: 1
                                  },
                                  exit: (dir: number) => ({
                                    x: dir > 0 ? -40 : 40,
                                    opacity: 0,
                                    scale: 0.8
                                  })
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                                className="flex items-center justify-center gap-6 text-gray-300 font-mono"
                              >
                                {/* Adjacent left 2 */}
                                {kmPerDay - 2 >= 2 ? (
                                  <span
                                    onClick={() => {
                                      setKmDirection(-1);
                                      setKmPerDay(kmPerDay - 2);
                                    }}
                                    className="text-xs sm:text-sm font-semibold opacity-20 cursor-pointer hover:opacity-40 transition-opacity select-none"
                                  >
                                    {kmPerDay - 2}
                                  </span>
                                ) : (
                                  <span className="text-xs sm:text-sm font-semibold opacity-0 select-none pointer-events-none">-</span>
                                )}

                                {/* Adjacent left 1 */}
                                {kmPerDay - 1 >= 2 ? (
                                  <span
                                    onClick={() => {
                                      setKmDirection(-1);
                                      setKmPerDay(kmPerDay - 1);
                                    }}
                                    className="text-lg sm:text-xl font-semibold opacity-40 cursor-pointer hover:opacity-60 transition-opacity select-none"
                                  >
                                    {kmPerDay - 1}
                                  </span>
                                ) : (
                                  <span className="text-lg sm:text-xl font-semibold opacity-0 select-none pointer-events-none">-</span>
                                )}

                                {/* Highlighted Selected center value */}
                                <div className="flex flex-col items-center justify-center">
                                  <span className="text-4xl sm:text-5xl font-extrabold text-blue-600 px-3 select-none tracking-tight leading-none whitespace-nowrap">
                                    {kmPerDay}
                                  </span>
                                </div>

                                {/* Adjacent right 1 */}
                                <span
                                  onClick={() => {
                                    setKmDirection(1);
                                    setKmPerDay(kmPerDay + 1);
                                  }}
                                  className="text-lg sm:text-xl font-semibold opacity-40 cursor-pointer hover:opacity-60 transition-opacity select-none"
                                >
                                  {kmPerDay + 1}
                                </span>

                                {/* Adjacent right 2 */}
                                <span
                                  onClick={() => {
                                    setKmDirection(1);
                                    setKmPerDay(kmPerDay + 2);
                                  }}
                                  className="text-xs sm:text-sm font-semibold opacity-20 cursor-pointer hover:opacity-40 transition-opacity select-none"
                                >
                                  {kmPerDay + 2}
                                </span>
                              </motion.div>
                            </AnimatePresence>
                          </div>

                          {/* Fixed "kilómetros" label */}
                          <div className="h-4 select-none pointer-events-none flex items-center justify-center">
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                              kilómetros
                            </span>
                          </div>
                        </div>

                        {/* Right Navigation Arrow */}
                        <button
                          type="button"
                          onPointerDown={(e) => {
                            startContinuousChange('increment');
                          }}
                          onPointerUp={stopContinuousChange}
                          onPointerLeave={stopContinuousChange}
                          onPointerCancel={stopContinuousChange}
                          className="z-10 p-2 rounded-full bg-gray-50 border border-gray-100 shadow-sm text-gray-500 hover:text-blue-600 hover:bg-white active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer select-none touch-none"
                        >
                          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>

            
                  </div>

                  {/* DESKTOP ONLY LAYOUT - TWO COLUMNS */}
                  <div className="hidden lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center w-full h-full">
                    
                    {/* Left Column (Span, h2, Centered Result Block) */}
                    <div className="lg:col-span-6 flex flex-col justify-center items-center text-center lg:space-y-4 w-full h-full">
                      <div className="flex flex-col items-center text-center w-full">
                        <span className="text-blue-600 uppercase tracking-widest text-xs sm:text-sm font-bold lg:mb-1 block">
                          Un electrico para tod@s
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight w-full">
                          Tu ahorro con TT
                        </h2>
                      </div>

                      {/* Centered Result Block wrapped in a container */}
                      <div className="w-full lg:max-w-[360px] bg-white border border-gray-200/60 rounded-xl p-4 sm:p-5 text-center space-y-1 sm:space-y-2 overflow-hidden">
                        <p className="text-blue-600 text-xs sm:text-sm font-bold">
                          Ahorro con {useSolar ? 'eléctrico y techo solar' : 'solo eléctrico'}
                        </p>
                        <div className="flex flex-col items-center justify-center py-1 w-full">
                          <span className="h-12 sm:h-16 overflow-hidden inline-flex items-center">
                            <motion.span
                              key={`yearly-num-desk-${useSolar}`}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-blue-600 inline-block"
                            >
                              {formattedYearlySavings}
                            </motion.span>
                          </span>
                          <span className="text-[10px] sm:text-xs font-bold text-black uppercase tracking-widest whitespace-nowrap mt-1">
                            Al año
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column (StatBlocks, Equipamiento switch, Slider, Button) */}
                    <div className="lg:col-span-6 flex flex-col justify-center items-center text-center lg:space-y-4 w-full h-full">
                      
                      {/* Two StatBlocks */}
                      <div className="flex items-center justify-between w-full lg:max-w-[360px] lg:mt-2">
                        <div className="flex-1">
                          <StatBlock
                            size="normal"
                            className="flex flex-col items-center justify-center text-center bg-transparent border-none !p-1 sm:!p-2 !gap-1 text-xs sm:text-sm w-full"
                            value={formattedMonthlySavings}
                            label="Por mes"
                            animateValue={true}
                            animationKey={String(useSolar)}
                          />
                        </div>
                        {/* Fine blue vertical divider */}
                        <div className="w-[1.5px] h-10 bg-blue-600/40 self-center" />
                        <div className="flex-1">
                          <StatBlock
                            size="normal"
                            className="flex flex-col items-center justify-center text-center bg-transparent border-none !p-1 sm:!p-2 !gap-1 text-xs sm:text-sm w-full"
                            value={formattedFiveYearSavings}
                            label="En 5 años"
                            animateValue={true}
                            animationKey={String(useSolar)}
                          />
                        </div>
                      </div>

                      <p className="text-blue-600 text-xs sm:text-sm font-bold text-center lg:mt-1">
                        Equipamiento
                      </p>

                      {/* Pill-Toggle for Electric / Electric+Solar as a sliding switch */}
                      <div className="relative flex bg-gray-200/80 p-1 rounded-lg w-full max-w-[280px] h-10 select-none">
                        {/* Sliding active background */}
                        <motion.div
                          className="absolute top-1 bottom-1 left-1 bg-blue-600 shadow-sm"
                          style={{
                            width: 'calc(50% - 4px)',
                          }}
                          animate={{
                            x: useSolar ? '100%' : '0%',
                            borderTopLeftRadius: useSolar ? 0 : 6,
                            borderBottomLeftRadius: useSolar ? 0 : 6,
                            borderTopRightRadius: useSolar ? 6 : 0,
                            borderBottomRightRadius: useSolar ? 6 : 0,
                          }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />

                        <button
                          type="button"
                          onClick={() => setUseSolar(false)}
                          className={`relative z-10 w-1/2 h-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-colors duration-200 focus:outline-none rounded-l-lg rounded-r-none ${
                            !useSolar ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          Solo eléctrico
                        </button>
                        <button
                          type="button"
                          onClick={() => setUseSolar(true)}
                          className={`relative z-10 w-1/2 h-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-colors duration-200 focus:outline-none rounded-r-lg rounded-l-none ${
                            useSolar ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          Eléctrico Solar
                        </button>
                      </div>

                      <p className="text-blue-600 text-xs sm:text-sm font-bold text-center lg:mt-1">
                        ¿Cuánta distancia recorres al día?
                      </p>

                      {/* Slider with Labeled values - DESKTOP ONLY */}
                      <div className="w-full max-w-xs space-y-2 mx-auto">
                        <div className="relative w-full h-10 flex items-center">
                          {/* Custom Track */}
                          <div className="absolute left-0 right-0 h-1.5 bg-gray-200 rounded">
                            <div 
                              className="absolute left-0 h-full bg-blue-600 rounded" 
                              style={{ 
                                width: `${Math.max(0, Math.min(100, ((kmPerDay - 10) / 160) * 100))}%`,
                                transition: isDraggingKm 
                                  ? 'width 75ms cubic-bezier(0.1, 0.8, 0.3, 1)' 
                                  : 'width 300ms cubic-bezier(0.16, 1, 0.3, 1)'
                              }}
                            />
                          </div>

                          {/* Custom Thumb containing the value (square/rectangle box) */}
                          <div 
                            className="absolute top-1/2 pointer-events-none bg-blue-600 text-white font-mono rounded shadow-md flex flex-col items-center justify-center whitespace-nowrap px-2.5 py-1 min-w-[84px] h-12"
                            style={{ 
                              left: `calc(${Math.max(0, Math.min(100, ((kmPerDay - 10) / 160) * 100))}% + ${(42 - (Math.max(0, Math.min(100, ((kmPerDay - 10) / 160) * 100)) / 100 * 84))}px)`,
                              transform: 'translate(-50%, -50%)',
                              transition: isDraggingKm 
                                ? 'left 75ms cubic-bezier(0.1, 0.8, 0.3, 1)' 
                                : 'left 300ms cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                          >
                            <span className="text-[8px] uppercase tracking-wider font-bold opacity-90 leading-none mb-1 select-none whitespace-nowrap">
                              {kmPerDay <= 70 ? 'Uso normal' : kmPerDay <= 120 ? 'Uso moderado' : 'Uso intensivo'}
                            </span>
                            <span className="text-[11px] sm:text-xs font-bold leading-none select-none whitespace-nowrap">
                              {kmPerDay} km
                            </span>
                          </div>

                          {/* Invisible Native Input on Top */}
                          <input
                            type="range"
                            min="10"
                            max="170"
                            step="1"
                            value={kmPerDay < 10 ? 10 : kmPerDay}
                            onChange={(e) => setKmPerDay(parseInt(e.target.value))}
                            onMouseDown={() => setIsDraggingKm(true)}
                            onMouseUp={() => setIsDraggingKm(false)}
                            onMouseLeave={() => setIsDraggingKm(false)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400 font-medium px-1">
                          <span>10 km</span>
                          <span>80 km</span>
                          <span>170 km</span>
                        </div>
                      </div>

                      {/* CTA Close Button */}
                      <div className="w-full flex justify-center pt-1 lg:mt-2">
                        <Button variant="secondary-outline" className="w-full sm:w-[220px] text-xs py-2" onClick={() => setIsCalculatorModalOpen(false)}>
                          Entendido
                        </Button>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};