import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Sun, DollarSign, Home as HomeIcon, Zap, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/Button';
import { StatBlock } from '../components/StatBlock';
import { ImageOverlayCard } from '../components/ImageOverlayCard';
import { motion, AnimatePresence } from 'motion/react';

// Static image imports for reliable bundler resolution on Vercel/Vite production
import autoVFinal1 from '../assets/images/auto-v-final.jpeg';
import autoVFinal2 from '../assets/images/auto-v-final2.jpeg';
import banner3carros from '../assets/images/Modificaciones TERE (3).png';
import chargePlug from '../assets/images/tt_charge_plug_1781751173453.jpg';
import mexArch from '../assets/images/bluemex.png';
import ttMexArch from '../assets/images/tt_mex_arch_1781751185894.png';
import investorBg from '../assets/images/goldenima.png';
import bateriasphoto from '../assets/images/bateriasphoto.png';
import mountainRoad from '../assets/images/caminomonte.png';
import rojoCar from '../assets/images/tarjetasauto.png';
import blancoCar from '../assets/images/tarjetasauto2.png';
import negroCar from '../assets/images/tarjetasauto3.png';
import banerfinal from '../assets/images/mountainRoad.png';


const solarRoof = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784679614/iamgenes_seccion_vehiiculo_10_ollsar.jpg';
const interiorpiel = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784677261/iamgenes_seccion_vehiiculo_2_hmvnhl.jpg';

const heroCarouselImages = [autoVFinal1, autoVFinal2];

export const Home: React.FC = () => {
  // Hero Carousel State: rotación cada 3.5 segundos
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroCarouselImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [heroSlide]);

  // Hero title animated words
  const heroTitle = "1º Vehículo Eléctrico Solar En México";
  const words = heroTitle.split(" ");

  // Autonomías slider drag/scroll functionality
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftValue = useRef(0);
  const [scrollIndex, setScrollIndex] = useState<number>(0);

  // Monitor scroll movements on Autonomías slider to keep dots synchronized
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const clientWidth = el.clientWidth;
      const scrollWidth = el.scrollWidth;

      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft <= 0) return;

      // Find which card is closest to the left viewport boundary (accounting for padding)
      const cardElements = Array.from(el.children);
      const style = window.getComputedStyle(el);
      const paddingLeft = parseFloat(style.paddingLeft) || 0;

      let minDiff = Infinity;
      let activeIndex = 0;
      cardElements.forEach((card, idx) => {
        const cardElement = card as HTMLElement;
        const cardLeft = cardElement.offsetLeft - el.offsetLeft - paddingLeft;
        const diff = Math.abs(cardLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          activeIndex = idx;
        }
      });

      setScrollIndex(activeIndex);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDotClick = (index: number) => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    const cards = el.children;
    if (cards[index]) {
      const targetElement = cards[index] as HTMLElement;
      const style = window.getComputedStyle(el);
      const paddingLeft = parseFloat(style.paddingLeft) || 0;
      el.scrollTo({
        left: targetElement.offsetLeft - el.offsetLeft - paddingLeft,
        behavior: 'smooth'
      });
      setScrollIndex(index);
    }
  };

  const handlePrevClick = () => {
    const prevIndex = Math.max(0, scrollIndex - 1);
    handleDotClick(prevIndex);
  };

  const handleNextClick = () => {
    const nextIndex = Math.min(2, scrollIndex + 1);
    handleDotClick(nextIndex);
  };

  // Charging slider drag/scroll functionality
  const chargingSliderRef = useRef<HTMLDivElement>(null);
  const isChargingDown = useRef(false);
  const chargingStartX = useRef(0);
  const chargingScrollLeftValue = useRef(0);
  const [chargingScrollIndex, setChargingScrollIndex] = useState<number>(0);

  // Monitor scroll movements on Charging slider to keep dots synchronized
  useEffect(() => {
    const el = chargingSliderRef.current;
    if (!el) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const scrollLeft = el.scrollLeft;
        const clientWidth = el.clientWidth;
        const scrollWidth = el.scrollWidth;

        const maxScrollLeft = scrollWidth - clientWidth;
        if (maxScrollLeft <= 0) return;

        const cardElements = Array.from(el.children);
        const style = window.getComputedStyle(el);
        const paddingLeft = parseFloat(style.paddingLeft) || 0;

        let minDiff = Infinity;
        let activeIndex = 0;
        cardElements.forEach((card, idx) => {
          const cardElement = card as HTMLElement;
          const cardLeft = cardElement.offsetLeft - el.offsetLeft - paddingLeft;
          const diff = Math.abs(cardLeft - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            activeIndex = idx;
          }
        });

        setChargingScrollIndex(activeIndex);
      }, 100);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleChargingDotClick = (index: number) => {
    if (!chargingSliderRef.current) return;
    const el = chargingSliderRef.current;
    const cards = el.children;
    if (cards[index]) {
      const targetElement = cards[index] as HTMLElement;
      const style = window.getComputedStyle(el);
      const paddingLeft = parseFloat(style.paddingLeft) || 0;
      el.scrollTo({
        left: targetElement.offsetLeft - el.offsetLeft - paddingLeft,
        behavior: 'smooth'
      });
      setChargingScrollIndex(index);
    }
  };

  const handleChargingMouseDown = (e: React.MouseEvent) => {
    if (!chargingSliderRef.current) return;
    isChargingDown.current = true;
    chargingSliderRef.current.style.cursor = 'grabbing';
    chargingStartX.current = e.pageX - chargingSliderRef.current.offsetLeft;
    chargingScrollLeftValue.current = chargingSliderRef.current.scrollLeft;
  };

  const handleChargingMouseLeave = () => {
    isChargingDown.current = false;
    if (chargingSliderRef.current) {
      chargingSliderRef.current.style.cursor = 'grab';
    }
  };

  const handleChargingMouseUp = () => {
    isChargingDown.current = false;
    if (chargingSliderRef.current) {
      chargingSliderRef.current.style.cursor = 'grab';
    }
  };

  const handleChargingMouseMove = (e: React.MouseEvent) => {
    if (!isChargingDown.current || !chargingSliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - chargingSliderRef.current.offsetLeft;
    const walk = (x - chargingStartX.current) * 1.5; // Scroll speed multiplier
    chargingSliderRef.current.scrollLeft = chargingScrollLeftValue.current - walk;
  };

  // Requisite dialog system to prevent native window.alert block inside iframe sandboxes
  const [modalData, setModalData] = useState<{ title: string; message: string; icon?: React.ReactNode } | null>(null);

  const showAlert = (title: string, message: string, icon?: React.ReactNode) => {
    setModalData({ title, message, icon });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDown.current = true;
    sliderRef.current.style.cursor = 'grabbing';
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftValue.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseUp = () => {
    isDown.current = false;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeftValue.current - walk;
  };

  // Calculator state
  const [useSolar, setUseSolar] = useState<boolean>(true);
  const [kmPerDay, setKmPerDay] = useState<number>(60);
  const [isDraggingKm, setIsDraggingKm] = useState<boolean>(false);
  const [kmDirection, setKmDirection] = useState<number>(0);

  // States and refs for carousel dragging gesture
  const dragStartX = useRef<number | null>(null);
  const dragStartKm = useRef<number>(60);
  const [isDraggingKmCarousel, setIsDraggingKmCarousel] = useState<boolean>(false);

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

  // States to control the dynamic text gradient shine animation
  const calcRef = useRef<HTMLDivElement>(null);
  const [isShining, setIsShining] = useState<boolean>(false);
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState<boolean>(false);

  // Trigger animation when the user scrolls and enters the viewport for the first time
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasScrolledIntoView) {
          setHasScrolledIntoView(true);
          setIsShining(true);
          const timer = setTimeout(() => {
            setIsShining(false);
          }, 4000); // Shine for 4 seconds
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (calcRef.current) {
      observer.observe(calcRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasScrolledIntoView]);

  // Trigger animation when any of the inputs change (excluding initial render)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsShining(true);
    const timer = setTimeout(() => {
      setIsShining(false);
    }, 3000); // Shine for 3 seconds on interaction

    return () => clearTimeout(timer);
  }, [useSolar, kmPerDay, chargingScrollIndex]);

  // Dynamic calculations to match draft base value when at 60km/day and Eléctrico+Solar
  // Gasoline cost per year = km * 365 * 2.50 MXN (assuming average fuel consumption)
  // Electric consumption cost = km * 365 * 0.40 MXN
  // Net saving without solar = km * 365 * 2.10
  // If solar selected, we add an extra $10,800 MXN solar generation savings
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

  // ==========================================
  // SOLAR SECTION DYNAMIC COUNTER
  // ==========================================
  // This variable controls the speed of the increment counter in milliseconds.
  // Lower values make the counter faster. A value of 15 ms is fast and smooth.
  const COUNTER_SPEED_MS = 15;

  const [solarWh, setSolarWh] = useState<number>(1000);

  useEffect(() => {
    const timer = setInterval(() => {
      setSolarWh((prev) => prev + 1);
    }, COUNTER_SPEED_MS);
    return () => clearInterval(timer);
  }, []);

  // Symmetrical calculated value for savings:
  // Starts at $90 Pesos (at 1,000 Wh) and increases by $1 Peso for every +10 Wh (symmetric to 10,000 Wh and $900 Pesos).
  const solarSavings = 500 + Math.floor((solarWh - 1000) / 10);

  const formattedSolarWh = `${solarWh.toLocaleString('en-US')} Wh`;
  const formattedSolarSavings = `${solarSavings.toLocaleString('en-US')} Pesos`;

  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO SECTION WITH CAROUSEL IN CURVED BOX */}
      <section className="w-full pt-3 sm:pt-5 pb-4 px-3 sm:px-6 lg:px-8 max-w-[1550px] mx-auto">
        {/* DESKTOP / TABLET VERSION (md: and up): Contenedor con degradado horizontal #d8d5ca -> #fffcf5, texto e iconos a la izquierda, imagen al borde derecho */}
        <div 
          className="hidden md:flex relative w-full h-[76vh] lg:h-[82vh] min-h-[560px] rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-xl border border-stone-300/60 items-center justify-between"
          style={{
            background: 'linear-gradient(90deg, #d8d5ca 0%, #fffcf5 100%)'
          }}
        >
          {/* Columna Izquierda: Texto, 3 Iconos y Botones */}
          <div className="w-[50%] lg:w-[50%] xl:w-[52%] h-full flex flex-col justify-center items-center text-center px-6 lg:px-12 xl:px-16 z-10 py-8">
            <h2 className="text-base lg:text-xl font-display font-medium tracking-tight text-neutral-700">
              “Una nueva forma de moverte”
            </h2>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 text-2xl lg:text-4xl xl:text-5xl font-display font-bold text-navy-900 tracking-tighter leading-tight max-w-xl text-balance"
            >
              1er Mini Vehículo Eléctrico <br className="hidden sm:inline" /> Solar MVES 
            </motion.h2>
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 text-2xl lg:text-4xl xl:text-5xl font-display font-extrabold tracking-tighter leading-tight text-neutral-950"
            >
              Modelo TTe01
            </motion.h1>

            {/* Div de los 3 iconos con texto (en medio de texto y botones) */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 lg:gap-x-7 gap-y-2 text-xs lg:text-sm font-semibold text-neutral-800 mt-6 lg:mt-8">
              <div className="flex items-center gap-1.5 lg:gap-2">
                <Icon icon="simple-line-icons:energy" className="w-4 h-4 lg:w-5 lg:h-5 text-navy-900" />
                <span>Eléctrico</span>
              </div>
              <div className="flex items-center gap-1.5 lg:gap-2">
                <Icon icon="fluent:weather-sunny-32-regular" className="w-4 h-4 lg:w-5 lg:h-5 text-navy-900" />
                <span>Techo Solar</span>
              </div>
              <div className="flex items-center gap-1.5 lg:gap-2">
                <Icon icon="fluent:highway-20-filled" className="w-4 h-4 lg:w-5 lg:h-5 text-navy-900" />
                <span>+250km</span>
              </div>
            </div>

            {/* Botones dentro del div, debajo de los iconos */}
            <div className="mt-7 lg:mt-8 flex flex-row gap-3 lg:gap-4 items-center justify-center w-full max-w-[450px]">
              <Button 
                variant="primary" 
                className="w-[185px] lg:w-[210px] text-xs lg:text-sm px-4 lg:px-6 whitespace-nowrap shadow-sm" 
                onClick={() => {
                  window.history.pushState({}, '', '/design-ordenar');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
              >
                Apartar sin enganche
              </Button>
              <Button 
                variant="secondary-outline" 
                className="w-[185px] lg:w-[210px] text-xs lg:text-sm px-4 lg:px-6 whitespace-nowrap shadow-sm" 
                onClick={() => {
                  window.history.pushState({}, '', '/vehiculo');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
              >
                Más información
              </Button>
            </div>
          </div>

          {/* Columna Derecha: Imagen ocupando todo el borde derecho del div del degradado */}
          <div className="w-[50%] lg:w-[50%] xl:w-[48%] h-full relative overflow-hidden flex items-center justify-end">
            {heroCarouselImages.map((imgSrc, idx) => (
              <motion.img
                key={idx}
                src={imgSrc}
                alt={`Modelo TTe01 auto vista ${idx + 1}`}
                referrerPolicy="no-referrer"
                initial={false}
                animate={{
                  opacity: heroSlide === idx ? 1 : 0,
                  scale: heroSlide === idx ? 1 : 1.02,
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-left"
              />
            ))}

            {/* Puntos de navegación en medio del carrusel */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2.5">
              {heroCarouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    heroSlide === idx
                      ? 'w-8 bg-white shadow-md'
                      : 'w-2.5 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Ver imagen ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE VERSION (< md): Caja con bordes curvos, degradado lineal de #d8d5ca a #fffcf5, texto arriba e imagen ocupando todo el largo */}
        <div 
          className="md:hidden w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-stone-300/60 pt-6 sm:pt-8 flex flex-col items-center"
          style={{
            background: 'linear-gradient(180deg, #d8d5ca 0%, #fffcf5 100%)'
          }}
        >
          {/* 1. TEXTO ARRIBA */}
          <div className="w-full text-center flex flex-col items-center px-4 sm:px-6">
            <h2 className="text-sm sm:text-base font-display font-medium tracking-tight text-neutral-700">
              “Una nueva forma de moverte”
            </h2>
            
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-display font-bold text-navy-900 tracking-tighter leading-tight text-balance">
              1er Mini Vehículo Eléctrico Solar MVES
            </h2>
            
            <h1 className="mt-2 text-2xl sm:text-3xl font-display font-extrabold tracking-tighter leading-tight text-neutral-950">
              Modelo TTe01
            </h1>
          </div>

          {/* Div de los 3 iconos con texto (copia en versión móvil debajo del texto) */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs sm:text-sm font-semibold text-neutral-800 mt-3 sm:mt-4 px-3 z-10">
            <div className="flex items-center gap-1.5">
              <Icon icon="simple-line-icons:energy" className="w-4 h-4 sm:w-5 sm:h-5 text-navy-900" />
              <span>Eléctrico</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon icon="fluent:weather-sunny-32-regular" className="w-4 h-4 sm:w-5 sm:h-5 text-navy-900" />
              <span>Techo Solar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon icon="fluent:highway-20-filled" className="w-4 h-4 sm:w-5 sm:h-5 text-navy-900" />
              <span>+250km</span>
            </div>
          </div>

          {/* 2. IMAGEN DEL AUTO HORIZONTAL OCUPANDO TODO EL LARGO DEL DIV (más alta con aspecto 4/3) */}
          <div className="mt-4 sm:mt-5 w-full relative aspect-[4/3] xs:aspect-[4/3] overflow-hidden">
            {heroCarouselImages.map((imgSrc, idx) => (
              <motion.img
                key={idx}
                src={imgSrc}
                alt={`Modelo TTe01 auto vista ${idx + 1}`}
                referrerPolicy="no-referrer"
                initial={false}
                animate={{
                  opacity: heroSlide === idx ? 1 : 0,
                  scale: heroSlide === idx ? 1 : 1.02,
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            ))}

            {/* Puntos en medio debajo del auto (blancos, sin flechas) */}
            <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2">
              {heroCarouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    heroSlide === idx
                      ? 'w-7 bg-white shadow-md'
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Ver imagen ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* BOTONES AFUERA Y DEBAJO DEL DIV EN MÓVIL (manteniendo el tamaño original de los botones) */}
        <div className="md:hidden mt-4 flex flex-row gap-3 items-center justify-center w-full max-w-[450px] mx-auto px-1">
          <Button 
            variant="primary" 
            className="w-[180px] sm:w-[205px] text-xs sm:text-sm px-2 sm:px-6 whitespace-nowrap text-center justify-center shadow-sm" 
            onClick={() => {
              window.history.pushState({}, '', '/design-ordenar');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
          >
            Apartar sin enganche
          </Button>
          <Button 
            variant="secondary-outline" 
            className="w-[180px] sm:w-[205px] text-xs sm:text-sm px-2 sm:px-6 whitespace-nowrap text-center justify-center" 
            onClick={() => {
              window.history.pushState({}, '', '/vehiculo');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
          >
            Más información
          </Button>
        </div>
      </section>


      {/* 2. SOLAR CHARGING (48px desktop / 24px mobile vertical padding, alternating to cream background) */}
      <section id="solar-section" className="w-full py-8 md:py-14 bg-white px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32">
        <div className="max-w-6xl mx-auto">
          {/* Gray Rounded Container from Spec */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-gray-100 rounded-xl p-7 sm:p-12 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-14 overflow-hidden"
          >
            {/* Left Column (approx 45% width) */}
            <div className="w-full lg:w-[45%] flex flex-col">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-navy-900 leading-tight">
                Energía Solar  <br /> Inteligente
              </h1>
              <p className="text-sm sm:text-lg text-gray-600 mt-4 sm:mt-5 leading-relaxed font-normal">
                Cuando le integras el panel solar genera energía para ayudarte a reducir el costo
de cada kilometro.
              </p>

              {/* Two StatBlocks side-by-side (sin caja, texto más grande, alineado a la izquierda para versión móvil y web, icono a la izquierda del número) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-10 text-left items-start">
                <StatBlock
                  size="h1"
                  icon={<Sun className="w-8 h-8 sm:w-10 sm:h-10 text-black animate-pulse flex-shrink-0" />}
                  value={formattedSolarWh}
                  label="Energía generada"
                  labelClassName="text-blue-600 font-bold"
                  className="text-left items-start"
                />
                <StatBlock
                  size="h1"
                  icon={<DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-black animate-pulse flex-shrink-0" />}
                  value={formattedSolarSavings}
                  label="Esto ahorras"
                  labelClassName="text-blue-600 font-bold"
                  className="text-left items-start"
                />
              </div>
            </div>

            {/* Right Column (approx 50% width, utilizing negative margins to bleed closer to borders without increasing parent height) */}
            <div className="w-[calc(100%+3rem)] sm:w-[calc(100%+6rem)] lg:w-[50%] flex items-center justify-center lg:mx-0 -mb-6 -mx-6 sm:-mb-12 sm:-mx-12 lg:-my-16 lg:-mr-16 self-stretch">
              <div className="relative w-full h-full min-h-[240px] sm:min-h-[340px] lg:min-h-[380px] overflow-hidden rounded-b-xl sm:rounded-lg lg:rounded-none shadow-sm hover:shadow-md transition-all">
                <img
                  src={solarRoof}
                  alt="Gasta menos que una moto"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* 3. DESIGNED FOR YOU SECTION */}
      <section id="designed-for-you" className="w-full pt-8 pb-6 lg:py-8 bg-white px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
          
          {/* Charging Slider/Carousel (Unified for Mobile & Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:shrink-0 flex flex-col gap-4 mb-6 lg:mb-0"
          >
            {/* Box wrapper matching the calculator container on the right */}
            <div className="w-full max-w-md lg:max-w-none h-auto lg:h-auto lg:aspect-[44/15] bg-transparent lg:bg-gray-100 rounded-none lg:rounded-xl border-none lg:border lg:border-gray-100 p-0 lg:p-5 lg:px-7 lg:py-5 lg:space-y-0 space-y-5 flex flex-col justify-between">
              
              {/* MOBILE ONLY LAYOUT */}
              <div className="flex flex-col lg:hidden space-y-5 w-full">
                {/* Header */}
                <div className="flex flex-col mb-3 items-center text-center w-full">
                  <span className="text-blue-600 uppercase tracking-widest text-xs sm:text-sm font-bold mb-2 block">
                    El mini auto que se
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight w-full">
                    Adapta a ti 
                  </h2>
                </div>

                {/* Carousel wrapper for mobile */}
                <div className="block -mx-4 sm:mx-0 overflow-hidden">
                  <div 
                    ref={chargingSliderRef}
                    className="w-full overflow-x-auto scrollbar-none flex gap-5 pt-0 pb-3 snap-x snap-mandatory select-none px-4 sm:px-0 scroll-px-4 sm:scroll-px-0 scroll-smooth"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                    onMouseDown={handleChargingMouseDown}
                    onMouseLeave={handleChargingMouseLeave}
                    onMouseUp={handleChargingMouseUp}
                    onMouseMove={handleChargingMouseMove}
                  >
                    {/* Card 1 */}
                    <div className="min-w-[80%] sm:min-w-[300px] md:min-w-[340px] flex-shrink-0 snap-start">
                      <ImageOverlayCard
                        title="Elige tu autonomía"
                        description="Desde 75 km hasta 250 km"
                        bgImage={chargePlug}
                        className="w-full aspect-[4/3]"
                        hideTextOnDesktop={true}
                        contentPosition="top"
                      />
                    </div>
                    {/* Card 2 */}
                    <div className="min-w-[80%] sm:min-w-[300px] md:min-w-[340px] flex-shrink-0 snap-start">
                      <ImageOverlayCard
                        title="Elige el espacio interior"
                        description="Acabados en tela o piel"
                        bgImage={interiorpiel}
                        className="w-full aspect-[4/3]"
                        hideTextOnDesktop={true}
                        contentPosition="top"
                      />
                    </div>
                    {/* Card 3 */}
                    <div className="min-w-[80%] sm:min-w-[300px] md:min-w-[340px] flex-shrink-0 snap-start">
                      <ImageOverlayCard
                        title="Elige entre la configuración"
                        description="Eléctrica o eléctrica solar"
                        bgImage={solarRoof}
                        className="w-full aspect-[4/3]"
                        hideTextOnDesktop={true}
                        contentPosition="top"
                      />
                    </div>
                  </div>
                </div>

                {/* Slider Navigation Dots Indicators */}
                <div className="flex justify-center items-center gap-2 mt-2 sm:mt-3">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        chargingScrollIndex === index 
                          ? 'w-6 bg-blue-600 shadow-sm' 
                          : 'w-2 bg-gray-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Sliding switch for specifications */}
                <div className="relative flex bg-gray-200/80 p-1 rounded-lg w-full max-w-[280px] h-11 select-none mx-auto mt-2">
                  <motion.div
                    className="absolute top-1 bottom-1 left-1 bg-blue-600 shadow-sm"
                    style={{
                      width: 'calc(33.333% - 2.66px)',
                    }}
                    animate={{
                      x: `${chargingScrollIndex * 100}%`,
                      borderTopLeftRadius: chargingScrollIndex === 0 ? 8 : 0,
                      borderBottomLeftRadius: chargingScrollIndex === 0 ? 8 : 0,
                      borderTopRightRadius: chargingScrollIndex === 2 ? 8 : 0,
                      borderBottomRightRadius: chargingScrollIndex === 2 ? 8 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />

                  <button
                    type="button"
                    onClick={() => handleChargingDotClick(0)}
                    className={`relative z-10 w-1/3 h-full flex items-center justify-center transition-colors duration-200 focus:outline-none rounded-l-lg rounded-r-none ${
                      chargingScrollIndex === 0 ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                    aria-label="Diseñado para cualquier enchufe"
                  >
                    <HomeIcon className="w-4.5 h-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChargingDotClick(1)}
                    className={`relative z-10 w-1/3 h-full flex items-center justify-center transition-colors duration-200 focus:outline-none rounded-none ${
                      chargingScrollIndex === 1 ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                    aria-label="Sin costo de instalación"
                  >
                    <DollarSign className="w-4.5 h-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChargingDotClick(2)}
                    className={`relative z-10 w-1/3 h-full flex items-center justify-center transition-colors duration-200 focus:outline-none rounded-r-lg rounded-l-none ${
                      chargingScrollIndex === 2 ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                    aria-label="Carga completa en 5h"
                  >
                    <Zap className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* DESKTOP ONLY LAYOUT - TWO COLUMNS */}
              <div className="hidden lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center w-full h-full">
    
                
                {/* Left Column (Image & Dots Indicators) */}
                <div className="lg:col-span-6 relative">
                  <div className="w-full lg:max-w-[470px] mx-auto overflow-hidden rounded-xl">
                    <div className="relative w-full aspect-[2/1] lg:aspect-[1.55/1]">
                      <AnimatePresence>
                        <motion.div
                          key={chargingScrollIndex}
                          initial={{ x: "100%" }}
                          animate={{ x: 0 }}
                          exit={{ x: "-100%" }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 w-full h-full"
                        >
                          <ImageOverlayCard
                            title={
                              chargingScrollIndex === 0
                                ? "Elige tu autonomía"
                                : chargingScrollIndex === 1
                                ? "Elige el espacio interior"
                                : "Elige entre la configuración"
                            }
                            description={
                              chargingScrollIndex === 0
                                ? "Desde 75 km hasta 250 km"
                                : chargingScrollIndex === 1
                                ? "Acabados en tela o piel"
                                : "Eléctrica o eléctrica solar"
                            }
                            bgImage={
                              chargingScrollIndex === 0
                                ? chargePlug
                                : chargingScrollIndex === 1
                                ? interiorpiel
                                : solarRoof
                            }
                            className="w-full h-full"
                            hideTextOnDesktop={true}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                  

                  {/* Slider Navigation Dots Indicators */}
                  <div className="absolute left-0 right-0 top-full mt-2 flex justify-center items-center gap-2">
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          chargingScrollIndex === index 
                            ? 'w-6 bg-blue-600 shadow-sm' 
                            : 'w-2 bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Column (Header, Switch, Custom Text Box) */}
                <div className="lg:col-span-6 flex flex-col justify-center items-center text-center lg:space-y-4 space-y-6">
                  {/* Header */}
                  <div className="flex flex-col items-center text-center w-full">
                    <span className="text-blue-600 uppercase tracking-widest text-xs sm:text-sm font-bold lg:mb-1 mb-2 block">
                      El mini auto que se
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight w-full">
                      Adapta a ti
                    </h2>
                  </div>
                  

                  {/* Sliding switch for specifications */}
                  <div className="relative flex bg-gray-200/80 p-1 rounded-lg w-full max-w-[280px] h-11 select-none mx-auto lg:mt-0 mt-2">
                    <motion.div
                      className="absolute top-1 bottom-1 left-1 bg-blue-600 shadow-sm"
                      style={{
                        width: 'calc(33.333% - 2.66px)',
                      }}
                      animate={{
                        x: `${chargingScrollIndex * 100}%`,
                        borderTopLeftRadius: chargingScrollIndex === 0 ? 8 : 0,
                        borderBottomLeftRadius: chargingScrollIndex === 0 ? 8 : 0,
                        borderTopRightRadius: chargingScrollIndex === 2 ? 8 : 0,
                        borderBottomRightRadius: chargingScrollIndex === 2 ? 8 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />

                    <button
                      type="button"
                      onClick={() => handleChargingDotClick(0)}
                      className={`relative z-10 w-1/3 h-full flex items-center justify-center transition-colors duration-200 focus:outline-none rounded-l-lg rounded-r-none ${
                        chargingScrollIndex === 0 ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      aria-label="Elige tu autonomía"
                    >
                      <HomeIcon className="w-4.5 h-4.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChargingDotClick(1)}
                      className={`relative z-10 w-1/3 h-full flex items-center justify-center transition-colors duration-200 focus:outline-none rounded-none ${
                        chargingScrollIndex === 1 ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      aria-label="Elige el espacio interior"
                    >
                      <DollarSign className="w-4.5 h-4.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChargingDotClick(2)}
                      className={`relative z-10 w-1/3 h-full flex items-center justify-center transition-colors duration-200 focus:outline-none rounded-r-lg rounded-l-none ${
                        chargingScrollIndex === 2 ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      aria-label="Elige entre la configuración"
                    >
                      <Zap className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {/* Custom Text Box for Desktop only */}
                  <div className="w-full lg:max-w-[470px] mx-auto bg-[#173713] border border-[#173713] p-4 rounded-xl text-center lg:min-h-[110px] flex flex-col justify-center">
                    <motion.div
                      key={chargingScrollIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-white leading-tight">
                        {chargingScrollIndex === 0 && "Elige tu autonomía"}
                        {chargingScrollIndex === 1 && "Elige el espacio interior"}
                        {chargingScrollIndex === 2 && "Elige entre la configuración"}
                      </h3>
                      <p className="text-sm sm:text-base text-blue-100 mt-2.5 leading-relaxed font-normal max-w-[340px] mx-auto">
                        {chargingScrollIndex === 0 && "Desde 75 km hasta 250 km"}
                        {chargingScrollIndex === 1 && "Acabados en tela o piel"}
                        {chargingScrollIndex === 2 && "Eléctrica o eléctrica solar"}
                      </p>
                    </motion.div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </section>


      {/* 4. SAVINGS CALCULATOR SECTION */}
      <section id="calc" ref={calcRef} className="w-full pt-3 pb-8 lg:py-8 bg-white px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center w-full">

          {/* Right Column: Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col gap-4 mb-6 lg:mb-0"
          >
            
            {/* Solar autonomy showcase container - matching solar section style: bg-gray-100 rounded-xl, solo fondo sin bordes */}
            <div className="w-full bg-gray-100 rounded-xl p-8 sm:p-12 md:p-16 text-center flex flex-col items-center justify-center">
              <span className="text-blue-600 uppercase tracking-widest text-xs sm:text-sm font-bold mb-3 block">
                Autonomía Solar
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight max-w-3xl text-balance">
                Hasta <span className="font-bold text-blue-600 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">40 KM</span> de autonomía con 8 horas de exposición solar
              </h2>
            </div>

          </motion.div>

        </div>
      </section>




      {/* 5. HECHO EN MÉXICO */}
      <section className="w-full py-12 md:py-20 bg-[#e1eae8] px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left side: Text separated from image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left lg:max-w-md lg:mr-auto w-full order-2 lg:order-2"
            >
              <span className="text-blue-600 uppercase tracking-widest text-xs sm:text-sm font-bold mb-4">
               80% de los componentes son de origen Nacional
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight">
                Orgullosamente hecho en México para nuestros pueblos.
              </h2>

            </motion.div>

            {/* Right side: Image 3:2 with Frame and Separation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, x: -30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[3/2] bg-white rounded-xl border p-2 flex items-center justify-center order-1 lg:order-1"
              style={{ borderColor: '#d8d8d0' }}
            >
              {/* Reduced size image inside the frame with spacing */}
              <div className="w-full h-full overflow-hidden bg-gray-50 rounded-lg">
                <img
                  src={ttMexArch}
                  alt="Orgullosamente hecho en México - arquitectura y catedral"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>



      {/* 4. AUTONOMÍAS */}
      <section className="w-full py-8 md:py-14 bg-white px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header left aligned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col mb-7"
          >
            <span className="text-blue-600 uppercase tracking-widest text-xs sm:text-sm font-bold mb-3 block">
              Bateria de sobra
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight w-full lg:max-w-[calc(100%-14px)]">
              Autonomías acordes <br /> a tu recorrido 
            </h2>
      
          </motion.div>

          {/* Slider Row - aligned with global content margins */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative -mx-4 sm:mx-0 group"
          >
            {/* Desktop Navigation Arrows (Left) */}
            <button
              onClick={handlePrevClick}
              disabled={scrollIndex === 0}
              className={`hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-blue-600/30 text-blue-600 hover:bg-blue-50 hover:border-blue-600 items-center justify-center shadow-md transition-all duration-300 active:scale-95 cursor-pointer ${
                scrollIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              aria-label="Anterior autonomía"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-visible">
              <div 
                ref={sliderRef}
                className="w-full overflow-x-auto scrollbar-none flex gap-6 sm:gap-7 pt-0 pb-5 snap-x snap-mandatory select-none scroll-smooth pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-16 lg:pr-16 xl:pl-[max(96px,calc((100vw-1152px)/2))] xl:pr-[max(96px,calc((100vw-1152px)/2))] scroll-px-4 sm:scroll-px-6 lg:scroll-px-16 xl:scroll-px-[max(96px,calc((100vw-1152px)/2))]"
                style={{ WebkitOverflowScrolling: 'touch' }}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                <div className="min-w-[285px] sm:min-w-[340px] md:min-w-[380px] lg:min-w-[75%] lg:max-w-[75%] lg:flex-shrink-0 snap-start">
                  <ImageOverlayCard
                    title="75 KM"
                    contentPosition="mobile-top"
                    description="Para uso personal y trayectos cortos"
                    price={
                      <span className="text-sm sm:text-base md:text-lg font-medium text-white/95 flex items-baseline gap-1.5">
                        <span>Desde $99,800</span>
                        <span className="text-xs sm:text-sm text-gray-300 font-normal">+ IVA</span>
                      </span>
                    }
                    bgImage={negroCar}
                    className="w-full aspect-[5/4] lg:aspect-[2.2/1]"
                    titleClassName="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-white tracking-tight"
                    icon={<Icon icon="fluent:highway-20-filled" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-white"/>}
                  >
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-200 mt-2.5 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Icon icon="solar:sofa-linear" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        <span>Comodidad</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Icon icon="tdesign:secured" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        <span>Seguridad</span>
                      </div>
                    </div>
                  </ImageOverlayCard>
                </div>
                <div className="min-w-[285px] sm:min-w-[340px] md:min-w-[380px] lg:min-w-[75%] lg:max-w-[75%] lg:flex-shrink-0 snap-start">
                  <ImageOverlayCard
                    title="150 KM"
                    contentPosition="mobile-top"
                    description="Para uso laboral y trayectos medios"
                    price={
                      <span className="text-sm sm:text-base md:text-lg font-medium text-white/95 flex items-baseline gap-1.5">
                        <span>Desde $124,800</span>
                        <span className="text-xs sm:text-sm text-gray-300 font-normal">+ IVA</span>
                      </span>
                    }
                    bgImage={blancoCar}
                    className="w-full aspect-[5/4] lg:aspect-[2.2/1]"
                    titleClassName="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-white tracking-tight"
                    icon={<Icon icon="fluent:highway-20-filled" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-white"/>}
                  >
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-200 mt-2.5 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Icon icon="solar:shock-absorber-line-duotone" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        <span>Todoterreno</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Icon icon="streamline:dollar-coin-remix" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        <span>Ahorra</span>
                      </div>
                    </div>
                  </ImageOverlayCard>
                </div>
                <div className="min-w-[285px] sm:min-w-[340px] md:min-w-[380px] lg:min-w-[75%] lg:max-w-[75%] lg:flex-shrink-0 snap-start">
                  <ImageOverlayCard
                    title="250 KM"
                    contentPosition="mobile-top"
                    description="Para última milla, servicio de transporte"
                    price={
                      <span className="text-sm sm:text-base md:text-lg font-medium text-white/95 flex items-baseline gap-1.5">
                        <span>Desde $139,800</span>
                        <span className="text-xs sm:text-sm text-gray-300 font-normal">+ IVA</span>
                      </span>
                    }
                    bgImage={rojoCar}
                    className="w-full aspect-[5/4] lg:aspect-[2.2/1]"
                    titleClassName="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-white tracking-tight"
                    icon={<Icon icon="fluent:highway-20-filled" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-white"/>}
                  >
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-200 mt-2.5 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Icon icon="fluent:clock-20-regular" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        <span>Viajes largos</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Icon icon="fluent:gas-pump-20-filled" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        <span>Sin usar gasolina</span>
                      </div>
                    </div>
                  </ImageOverlayCard>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Arrows (Right) */}
            <button
              onClick={handleNextClick}
              disabled={scrollIndex === 2}
              className={`hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-blue-600/30 text-blue-600 hover:bg-blue-50 hover:border-blue-600 items-center justify-center shadow-md transition-all duration-300 active:scale-95 cursor-pointer ${
                scrollIndex === 2 ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              aria-label="Siguiente autonomía"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </motion.div>

          {/* Slider Navigation Dots Indicators */}
          <div className="flex justify-center items-center gap-2.5 mt-5">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  scrollIndex === index 
                    ? 'w-8 bg-blue-600 shadow-sm' 
                    : 'w-2.5 bg-gray-200 hover:bg-gray-400'
                }`}
                aria-label={`Ir a especificación ${index + 1}`}
              />
            ))}
          </div>

          {/* Below row, centered CTA buttons with 16px gap */}
          <div className="mt-10 flex flex-row justify-center gap-2 sm:gap-5 items-center w-full">
            <Button variant="primary" className="flex-1 sm:flex-initial sm:w-auto text-xs sm:text-sm px-2 sm:px-6" onClick={() => showAlert('Ficha Técnica Descargada', 'La ficha técnica oficial del modelo S01 Barrio se ha descargado en tus archivos. Si prefieres, podemos enviarla a tu WhatsApp.', <ShieldCheck className="w-10 h-10 text-blue-600" />)}>
              Ficha Técnica
            </Button>
            <Button variant="secondary-outline" className="flex-1 sm:flex-initial sm:w-auto text-xs sm:text-sm px-2 sm:px-6" onClick={() => {
              window.history.pushState({}, '', '/vehiculo');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}>
              Más información
            </Button>
          </div>
        </div>
      </section>

      {/* 6. INVERSIONISTA DEL FUTURO */}
      <section className="w-full py-12 md:py-20 bg-[#fcfaf9] px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Right side: Text separated from image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left lg:max-w-md lg:mr-auto w-full order-2 lg:order-2"
            >
              <span className="text-navy-900  uppercase tracking-widest text-xs sm:text-sm font-bold mb-4">
                La nueva era de la movilidad
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight">
                Pilas LiFePO4
              </h2>

              <div className="mt-8 w-full flex justify-center lg:justify-start">
                <Button
                  variant="black-outline"
                  className="w-full sm:w-[220px] text-xs py-2"
                  onClick={() => {
                    window.history.pushState({}, '', '/vehiculo');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                >
                  Conocer más → 
                </Button>
              </div>
            </motion.div>

            {/* Left side: Image 3:2 with Frame and Separation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, x: -30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[3/2] bg-white rounded-xl border p-2 flex items-center justify-center order-1 lg:order-1"
              style={{ borderColor: '#d6b724' }}
            >
              {/* Reduced size image inside the frame with spacing */}
              <div className="w-full h-full overflow-hidden bg-gray-50 rounded-lg">
                <img
                  src={bateriasphoto}
                  alt="Pilas LiFePO4 - Baterías"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* 7. BANNER FINAL */}
      <section className="relative w-full min-h-[420px] sm:min-h-[500px] lg:min-h-[620px] xl:min-h-[700px] flex flex-col justify-end lg:justify-center text-white overflow-hidden bg-black pt-[280px] sm:pt-[340px] lg:pt-16 pb-10 sm:pb-14 md:pb-16 px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32">
        <div className="absolute inset-x-0 top-0 h-[260px] sm:h-[320px] lg:h-full z-0 bg-black">
          <img

            src={banerfinal}
            alt="Mountain desert road sunset landscape background"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-right scale-125 lg:scale-100 lg:object-center"
          />
          
          {/* Filtro obscuro de izq a derecha, cargado para Escritorio */}

          <div className="scale-125 origin-right hidden lg:block absolute w-1/2 h-full left-0 top-0 bg-gradient-to-r from-black from-4% via-black/70 via-40% to-transparent" />

          {/* Filtro obscuro de abajo hacia arriba, exclusivo para Móvil/Tablet */}
          <div className="scale-125 block lg:hidden absolute inset-0 bg-gradient-to-t from-black from-4% via-black/70 via-40% to-transparent" />        </div>

        {/* Content stack */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col justify-center items-center gap-6 lg:gap-8">
          
          {/* Header: Product info (aligned to top) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center pb-4 w-full lg:max-w-xl self-center lg:self-start"
          >

           <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-white tracking-tight leading-tight max-w-4xl drop-shadow-md animate-fade-in">
            Modelo S01 Barrio
           </h1>

           <span className="text-white font-sans font-semibold tracking-widest text-sm sm:text-lg md:text-xl block mt-4">

          Vehículo Eléctrico Solar

            </span>

              <div className="w-12 h-px bg-transparent my-3"></div>

            <h2 className="text-white/90 font-sans font-medium text-sm sm:text-lg md:text-xl block leading-tight">

             En producción a partir de <br />

              diciembre de 2026

              </h2>
                      <div className="w-12 h-px bg-transparent my-3"></div>

                      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-gray-200 mt-5">
                       <div className="flex items-center gap-1.5">

                         <Icon icon="simple-line-icons:energy" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                         <span>Eléctrico</span>

                       </div>

                       <div className="flex items-center gap-1.5">
                         <Icon icon="fluent:weather-sunny-32-regular" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                         <span>Techo Solar</span>


                       </div>


                       <div className="flex items-center gap-1.5">
                         <Icon icon="fluent:highway-20-filled" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                         <span>+250km</span>


                       </div>
                     </div>

                     {/* CTA Buttons (centered and attached close to vehicle info) */}
                     <div className="flex flex-row gap-2 sm:gap-4 mt-8 w-full justify-center max-w-[420px] sm:max-w-none pt-2">
                       <Button
                         variant="white-outline"
                         className="flex-1 sm:flex-initial sm:w-[200px] text-xs sm:text-sm px-2 sm:px-6"
                         onClick={() => {
                           window.history.pushState({}, '', '/design-ordenar');
                           window.dispatchEvent(new PopStateEvent('popstate'));
                           window.scrollTo({ top: 0, behavior: 'instant' });
                         }}
                       >
                         Lo Quiero
                       </Button>
                       <Button
                         variant="white-filled"
                         onClick={() => {
                           window.history.pushState({}, '', '/vehiculo');
                           window.dispatchEvent(new PopStateEvent('popstate'));
                           window.scrollTo({ top: 0, behavior: 'instant' });
                         }}
                         className="flex-1 sm:flex-initial sm:w-[200px] text-xs sm:text-sm px-2 sm:px-6"
                       >
                         Explorar el modelo
                       </Button>
                     </div>
          </motion.div>



        </div>
      </section>

      {/* Absolute center dialog replacing blocking cross-origin alert calls */}
      <AnimatePresence>
        {modalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="custom-alert-modal">
            {/* Backdrop with transition */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalData(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-white rounded-xl p-6 sm:p-8 shadow-2xl z-10 border border-gray-100 flex flex-col items-center text-center"
            >
              {modalData.icon && (
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                  {modalData.icon}
                </div>
              )}
              
              <h3 className="text-xl sm:text-2xl font-display font-black text-navy-900">
                {modalData.title}
              </h3>
              
              <p className="text-sm text-gray-500 mt-3 leading-relaxed text-balance">
                {modalData.message}
              </p>

              <div className="w-full pt-6 flex flex-col gap-2">
                <Button
                  variant="primary"
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  onClick={() => {
                    setModalData(null);
                    window.history.pushState({}, '', '/vehiculo');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                >
                  Enviar al WhatsApp
                </Button>
                <Button
                  variant="secondary-outline"
                  className="w-full h-11 border border-gray-200 text-navy-900 rounded-xl hover:bg-gray-50 font-bold"
                  onClick={() => setModalData(null)}
                >
                  Entendido
                </Button>
              </div>
            </motion.div>
          </div>

          
        )}
      </AnimatePresence>
    </div>
  );
};
