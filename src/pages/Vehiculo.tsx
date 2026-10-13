import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@iconify/react';
import { ImageOverlayCard } from '../components/ImageOverlayCard';
import { Button } from '../components/Button';
import { 
  Sun, 
  BatteryCharging, 
  Home as HomeIcon, 
  Accessibility, 
  ShieldAlert, 
  Wrench,
  X,
  CheckCircle2,
  Cpu,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Settings,
  ShieldCheck,
  Car,
  Users,
  Radio,
  Clock,
  Fuel
} from 'lucide-react';

import mountainRoad from '../assets/images/caminomonte.png';
import banerfinal from '../assets/images/mountainRoad.png';

// Cloudinary images replacement for all other assets on this page
const solarRoof = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784679614/iamgenes_seccion_vehiiculo_10_ollsar.jpg';
const chargePlug = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784676443/iamgenes_seccion_vehiiculo_n22zqg.jpg';
const negroCar = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784090856/_Modificaciones_Web_Tere_lksrrt.png';
const blancoCar = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784677661/iamgenes_seccion_vehiiculo_3_dwvj0q.jpg';
const heroSuvs = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784090856/_Modificaciones_Web_Tere_lksrrt.png';
const rojoCar = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784090856/_Modificaciones_Web_Tere_lksrrt.png';
const mexArch = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784676762/Gemini_Generated_Image_y5gduzy5gduzy5gd_whgkkx.png';
const investorBg = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784090856/_Modificaciones_Web_Tere_lksrrt.png';
const mexicoMechanics = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784090856/_Modificaciones_Web_Tere_lksrrt.png';
const interior = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784676932/iamgenes_seccion_vehiiculo_1_k4ulxp.jpg';
const interiorpiel = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784677261/iamgenes_seccion_vehiiculo_2_hmvnhl.jpg';
const blancoproduct = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784678282/iamgenes_seccion_vehiiculo_4_etqoq1.jpg';
const puertas = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784677902/iamgenes_seccion_vehiiculo_5_wefe8w.jpg';
const suspencion = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784678841/iamgenes_seccion_vehiiculo_8_szv3nv.jpg';
const iso2026 = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784678604/iamgenes_seccion_vehiiculo_7_nalhkf.jpg';
const armazon = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784679270/Gemini_Generated_Image_nehsb3nehsb3nehs_ueqvul.png';
const llantarefac = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784679797/Gemini_Generated_Image_ptd6j3ptd6j3ptd6_kl69ax.png';


import { Scrollytelling } from '../components/Scrollytelling';


interface TechnicalDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bgImage: string;
  icon: React.ReactNode;
  extendedSpec: string;
  advantage: string;
}

export const Vehiculo: React.FC = () => {
  // Autonomías slider drag functionality for desktop (recycled from Home.tsx)
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftValue = useRef(0);

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


  const showAlert = (title: string, message: string, icon?: React.ReactNode) => {
    setModalData({ title, message, icon });
  };

    const handlePrevClick = () => {
    const prevIndex = Math.max(0, scrollIndex - 1);
    handleDotClick(prevIndex);
  };

  const handleNextClick = () => {
    const nextIndex = Math.min(features.length - 1, scrollIndex + 1);
    handleDotClick(nextIndex);
  };

  // Modal states
  const [modalData, setModalData] = useState<{ title: string; message: string; icon?: React.ReactNode } | null>(null);
  const [activeDetail, setActiveDetail] = useState<TechnicalDetail | null>(null);
  const [showReservationModal, setShowReservationModal] = useState<boolean>(false);
  const [reservationEmail, setReservationEmail] = useState<string>('');
  const [reservationName, setReservationName] = useState<string>('');
  const [reservationPhone, setReservationPhone] = useState<string>('');
  const [isReserved, setIsReserved] = useState<boolean>(false);

  // Active scroll position index
  const [scrollIndex, setScrollIndex] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);

  // Monitor the image size dynamically to center the indicators and arrows
  useEffect(() => {
    const updateHeight = () => {
      const imgContainer = document.getElementById('first-card-image-container');
      if (imgContainer) {
        setImageHeight(imgContainer.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    const timer = setTimeout(updateHeight, 350);

    return () => {
      window.removeEventListener('resize', updateHeight);
      clearTimeout(timer);
    };
  }, []);

  // Solar counter variables (synchronized with Home.tsx for consistent style)
  const COUNTER_SPEED_MS = 15;
  const [solarWh, setSolarWh] = useState<number>(1000);

  useEffect(() => {
    const timer = setInterval(() => {
      setSolarWh((prev) => prev + 1);
    }, COUNTER_SPEED_MS);
    return () => clearInterval(timer);
  }, []);

  const solarSavings = 500 + Math.floor((solarWh - 1000) / 10);
  const formattedSolarWh = `${solarWh.toLocaleString('en-US')} Wh`;
  const formattedSolarSavings = `${solarSavings.toLocaleString('en-US')} Pesos`;

  useEffect(() => {
    const hasScrollParam = window.location.search.includes('scroll=autonomias') || window.location.hash === '#autonomias-section';
    if (hasScrollParam) {
      setTimeout(() => {
        const element = document.getElementById('autonomias-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // Monitor scroll movements to keep index circles synchronized
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

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    const scrollAmount = el.clientWidth * 0.70;
    el.scrollTo({
      left: el.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth'
    });
  };



  const benefitsSliderRef = useRef<HTMLDivElement>(null);
const [benefitsScrollIndex, setBenefitsScrollIndex] = useState<number>(0);

const handleBenefitsDotClick = (index: number) => {
  if (!benefitsSliderRef.current) return;
  const el = benefitsSliderRef.current;
  const cards = el.children;
  if (cards[index]) {
    const targetElement = cards[index] as HTMLElement;
    const style = window.getComputedStyle(el);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    el.scrollTo({
      left: targetElement.offsetLeft - el.offsetLeft - paddingLeft,
      behavior: 'smooth'
    });
    setBenefitsScrollIndex(index);
  }
};

useEffect(() => {
  const el = benefitsSliderRef.current;
  if (!el) return;

  const handleScroll = () => {
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
    setBenefitsScrollIndex(activeIndex);
  };

  el.addEventListener('scroll', handleScroll, { passive: true });
  return () => el.removeEventListener('scroll', handleScroll);
}, []);

const benefitsData = [
  {
    id: 'recargar',
    icon: <DollarSign className="w-11 h-11 stroke-[1.5] text-gray-900" />,
    title: <>Recargar<br />cuesta menos</>,
    text1: 'Recargar un TT puede costar hasta cinco veces menos que llenar un tanque de gasolina',
    text2: 'Eso significa un ahorro que se nota cada vez que manejas.'
  },
  {
    id: 'piezas',
    icon: <Settings className="w-11 h-11 stroke-[1.5] text-gray-900" />,
    title: <>Menos piezas<br />que reemplazar</>,
    text1: 'Un auto de gasolina tiene más de 1,000 piezas en el motor. Un TT necesita muchas menos para funcionar.',
    text2: 'Menos piezas significan menos cosas que reparar y más tiempo disfrutando tu vehículo.'
  },
  {
    id: 'mantenimiento',
    icon: <Car className="w-11 h-11 stroke-[1.5] text-gray-900" />,
    title: <>Menos<br />mantenimiento</>,
    text1: 'No necesita cambios de aceite, afinaciones ni verificación de emisiones.',
    text2: 'Solo recarga las baterías en casa y haz rodar tus llantas.'
  }
];

const interiorSliderRef = useRef<HTMLDivElement>(null);
const [interiorScrollIndex, setInteriorScrollIndex] = useState<number>(0);

const handleInteriorDotClick = (index: number) => {
  if (!interiorSliderRef.current) return;
  const el = interiorSliderRef.current;
  const cards = el.children;
  if (cards[index]) {
    const targetElement = cards[index] as HTMLElement;
    const style = window.getComputedStyle(el);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    el.scrollTo({
      left: targetElement.offsetLeft - el.offsetLeft - paddingLeft,
      behavior: 'smooth'
    });
    setInteriorScrollIndex(index);
  }
};

useEffect(() => {
  const el = interiorSliderRef.current;
  if (!el) return;

  const handleScroll = () => {
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
    setInteriorScrollIndex(activeIndex);
  };

  el.addEventListener('scroll', handleScroll, { passive: true });
  return () => el.removeEventListener('scroll', handleScroll);
}, []);

const interiorData = [
  {
    id: 'lugar-cinco',
    icon: <Users className="w-11 h-11 stroke-[1.5] text-gray-900" />,
    title: <>Lugar<br />para cinco</>,
    text1: 'Lleva a tu familia y amigos. Hay asientos hasta para cinco personas.'
  },
  {
    id: 'acabados',
    icon: <ShieldCheck className="w-11 h-11 stroke-[1.5] text-gray-900" />,
    title: <>Acabados<br />resistentes</>,
    text1: 'Materiales pensados para el uso de todos los días. Fácil de limpiar, difícil de dañar.'
  },
  {
    id: 'musica',
    icon: <Radio className="w-11 h-11 stroke-[1.5] text-gray-900" />,
    title: <>Tu música o tu<br />radio, tú eliges</>,
    text1: 'Conecta tu celular o sintoniza tu estación favorita. Simple, sin complicaciones.'
  }
];

  // Technical features definitions matching prompt exactly
  const features: TechnicalDetail[] = [
    {
      id: 'techo-solar',
      title: 'Techo Solar',
      subtitle: 'Energía Diaria sin Costo',
      description: 'El panel integrado capta energía del sol todo el día, incluso estacionado. Cada trayecto bajo el sol suma autonomía extra sin costo.',
      bgImage: solarRoof,
      icon: <Sun className="w-6 h-6 text-blue-600" />,
      extendedSpec: 'Panel solar fotovoltaico monocristalino integrado de alta eficiencia que proporciona hasta 1,000 Wh al día bajo exposición solar directa.',
      advantage: 'Cero costos de electricidad adicional en tus traslados locales y nula huella de carbono.'
    },
    {
      id: 'bateria-inteligente',
      title: 'Suspención reforzada ',
      subtitle: 'Durabilidad y Gestión Avanzada',
      description: 'Diseñada para el camino mexicano real, no el de laboratorio. Absorbe baches y terracería sin sacrificar comodidad ni durabilidad.',
      bgImage: suspencion,
      icon: <BatteryCharging className="w-6 h-6 text-blue-600" />,
      extendedSpec: 'Paquete de celdas de ión-litio de ciclo profundo y doble blindaje con soporte para carga rápida regenerativa y monitor de salud térmica inteligente.',
      advantage: 'Máxima seguridad de viaje y vida útil superior a los 300,000 kilómetros recorridos.'
    },
    {
      id: 'carga-casa',
      title: 'Carga en Casa',
      subtitle: 'Conexión Directa y Práctica',
      description: 'Conecta el cargador TT a cualquier toma doméstica y listo. Sin instalación especial, sin costo adicional, sin depender de estaciones.',
      bgImage: chargePlug,
      icon: <HomeIcon className="w-6 h-6 text-blue-600" />,
      extendedSpec: 'Transformador portátil ultra eficiente compatible con tomas de voltaje común (110V / 220V). No necesita re-configurar la red eléctrica de tu hogar.',
      advantage: 'Cárgalo mientras duermes en cualquier rincón de México y despierta con tanque lleno.'
    },
    {
      id: 'silla-ruedas',
      title: 'Silla de ruedas',
      subtitle: 'Inclusión y Accesibilidad Universal',
      description: 'Puertas de doble apertura que eliminan barreras de entrada al vehículo. Pensadas para personas con movilidad limitada y quienes las acompañan.',
      bgImage: puertas,
      icon: <Accessibility className="w-6 h-6 text-blue-600" />,
      extendedSpec: 'Chasis bajo adaptado y apertura sincronizada de compuertas laterales de 180° que eliminan barreras de abordaje para sillas de ruedas o andaderas.',
      advantage: 'El único vehículo urbano solar diseñado pensando en la completa libertad de todos los pasajeros.'
    },
    {
      id: 'armazon-completo',
      title: 'Armazón completo',
      subtitle: 'Ingeniería Estructural Reforzada',
      description: 'Estructura de acero reforzado que protege a cada pasajero en su interior. Diseñada para absorber el impacto antes de que llegue a ti.',
      bgImage: armazon,
      icon: <ShieldAlert className="w-6 h-6 text-blue-600" />,
      extendedSpec: 'Estructura de jaula de seguridad compuesta de acero microaleado templado por inducción que absorbe y disipa las fuerzas en caso de colisión.',
      advantage: 'Máxima protección contra impactos laterales y volcamiento para resguardar lo más valioso: tú y tu familia.'
    },
    {
      id: 'llanta-refaccion',
      title: 'Llanta de refacción',
      subtitle: 'Prevención para el Camino Real',
      description: 'Incluida de fábrica porque conocemos el camino mexicano real. Viaja tranquilo sabiendo que un imprevisto no te deja varado.',
      bgImage: llantarefac,
      icon: <Wrench className="w-6 h-6 text-blue-600" />,
      extendedSpec: 'Incluye neumático de repuesto de tamaño completo sobre rin reforzado, kit de gato de fuerza hidráulica y llave dinamométrica en el subfondo.',
      advantage: 'Transita con absoluta tranquilidad física frente a baches, desniveles u obstáculos imprevistos.'
    }
  ];

  const handleOpenDetail = (feature: TechnicalDetail) => {
    setActiveDetail(feature);
  };

  const handleCloseDetail = () => {
    setActiveDetail(null);
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reservationEmail && reservationName && reservationPhone) {
      setIsReserved(true);
      setTimeout(() => {
        setIsReserved(false);
        setShowReservationModal(false);
        setReservationEmail('');
        setReservationName('');
        setReservationPhone('');
      }, 3500);
    }
  };


// Autonomías (km) slider - refs y estado propios
const rangeSliderRef = useRef<HTMLDivElement>(null);
const rangeIsDown = useRef(false);
const rangeStartX = useRef(0);
const rangeScrollLeftValue = useRef(0);
const [rangeScrollIndex, setRangeScrollIndex] = useState<number>(0);

const handleRangeMouseDown = (e: React.MouseEvent) => {
  if (!rangeSliderRef.current) return;
  rangeIsDown.current = true;
  rangeSliderRef.current.style.cursor = 'grabbing';
  rangeStartX.current = e.pageX - rangeSliderRef.current.offsetLeft;
  rangeScrollLeftValue.current = rangeSliderRef.current.scrollLeft;
};

const handleRangeMouseLeave = () => {
  rangeIsDown.current = false;
  if (rangeSliderRef.current) rangeSliderRef.current.style.cursor = 'grab';
};

const handleRangeMouseUp = () => {
  rangeIsDown.current = false;
  if (rangeSliderRef.current) rangeSliderRef.current.style.cursor = 'grab';
};

const handleRangeMouseMove = (e: React.MouseEvent) => {
  if (!rangeIsDown.current || !rangeSliderRef.current) return;
  e.preventDefault();
  const x = e.pageX - rangeSliderRef.current.offsetLeft;
  const walk = (x - rangeStartX.current) * 1.5;
  rangeSliderRef.current.scrollLeft = rangeScrollLeftValue.current - walk;
};

const handleRangeDotClick = (index: number) => {
  if (!rangeSliderRef.current) return;
  const el = rangeSliderRef.current;
  const cards = el.children;
  if (cards[index]) {
    const targetElement = cards[index] as HTMLElement;
    const style = window.getComputedStyle(el);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    el.scrollTo({
      left: targetElement.offsetLeft - el.offsetLeft - paddingLeft,
      behavior: 'smooth'
    });
    setRangeScrollIndex(index);
  }
};

const handleRangePrevClick = () => {
  handleRangeDotClick(Math.max(0, rangeScrollIndex - 1));
};

const handleRangeNextClick = () => {
  handleRangeDotClick(Math.min(rangeData.length - 1, rangeScrollIndex + 1));
};

useEffect(() => {
  const el = rangeSliderRef.current;
  if (!el) return;

  const handleScroll = () => {
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
    setRangeScrollIndex(activeIndex);
  };

  el.addEventListener('scroll', handleScroll, { passive: true });
  return () => el.removeEventListener('scroll', handleScroll);
}, []);

const rangeData = [
  {
    id: 'rango-250',
    bgImage: blancoCar,
    title: '250Km',
    description: 'Mayor autonomia para los trayectos mas largos.'
  },
  {
    id: 'rango-150',
    bgImage: blancoCar,
    title: '150Km',
    description: 'Transporta carga o pasajero menos que una moto'
  },
  {
    id: 'rango-70',
    bgImage: blancoCar,
    title: '70Km',
    description: 'El modelo más comodo, seguro y economico para trayectos cortos'
  }
];


      {/* 1. cons de interiores 2 botoens */}

const [interiorMaterial, setInteriorMaterial] = useState<'tela' | 'piel'>('tela');

const interiorImages = {
  tela: interior,
  piel: interiorpiel,
};

  // Scroll smooth to section helper
  const scrollToFeatures = () => {
    const el = document.getElementById('autonomias-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white flex flex-col">
      
      {/* 1. HERO / HEADER SECTION */}
      <section className="relative w-full h-[85vh] flex flex-col justify-between items-center pt-26 sm:pt-[110px] md:pt-[130px] pb-8 md:pb-12 overflow-hidden">
        {/* Background Landscape / Highway Image with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={mountainRoad}
            alt="Paisaje carretera montañosa de fondo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-102 filter brightness-[0.70] contrast-[1.02]"
          />
          {/* Subtle dark overlay to maximize text resolution and legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60 pointer-events-none" />
        </div>

        {/* Hero Content aligned and centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center -mt-8 sm:-mt-12 md:-mt-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight max-w-4xl text-balance drop-shadow-sm animate-fade-in">
            Modelo S01 Barrio
          </h1>

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

          
          <h2 className="mt-4 text-lg sm:text-2xl md:text-3xl font-display font-normal tracking-tight text-white underline">
            Desde $950 a 142 Semanas
          </h2>

        </motion.div>

         {/* Recycled and aligned global action buttons with 16px gap at the bottom */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
           className="relative z-10 w-full max-w-[420px] sm:max-w-none px-4 flex justify-center mt-auto"
         >
           <Button 
             variant="primary" 
             className="w-full sm:w-[240px] text-xs sm:text-sm whitespace-nowrap"
             onClick={() => {
               window.history.pushState({}, '', '/design-ordenar');
               window.dispatchEvent(new PopStateEvent('popstate'));
               window.scrollTo({ top: 0, behavior: 'instant' });
             }}
           >
             Lo Quiero
           </Button>
         </motion.div>
      </section>

      {/* 4. AUTONOMÍAS */}
      <section id="autonomias-section" className="w-full py-8 md:py-14 bg-white px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col mb-7 items-center text-center"
          >
            <span className="text-blue-600 uppercase tracking-widest text-xs sm:text-sm font-bold mb-3 block">
              Explora sus características
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight w-full">
              Te presentamos <br /> el Modelo 01
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

                 

                {/* Additional Feature Cards */}
                {features.map((feature, idx) => (
                  <div
                    key={feature.id}
                    id={`feature-card-${feature.id}`}
                    className="min-w-[285px] sm:min-w-[340px] md:min-w-[380px] lg:min-w-[calc((100vw-128px-2*28px)/2.15)] lg:max-w-[calc((100vw-128px-2*28px)/2.15)] xl:min-w-[calc((1152px-2*28px)/2.15)] xl:max-w-[calc((1152px-2*28px)/2.15)] lg:flex-shrink-0 snap-start flex flex-col justify-start"
                  >
                    <div className="flex flex-col group w-full h-full justify-between">
                      {/* Image Container with identical zoom animation & sizes */}
                      <div 
                        id={idx === 0 ? "first-card-image-container" : undefined}
                        className="relative w-full aspect-[3/2] overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-gray-50"
                      >
                        <img
                          src={feature.bgImage}
                          alt={feature.title}
                          referrerPolicy="no-referrer"
                          onLoad={idx === 0 ? () => {
                            const imgContainer = document.getElementById('first-card-image-container');
                            if (imgContainer) setImageHeight(imgContainer.clientHeight);
                          } : undefined}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Glassmorphic small category badge top left */}
                        <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-md border border-white/20 p-2.5 rounded-lg text-white shadow-xs">
                          {feature.icon}
                        </div>
                      </div>

                      {/* Text purely on the outside, at the bottom of the image container */}
                      <div className="px-3 pt-4 pb-2 flex-grow flex flex-col justify-start text-left">
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-gray-900 tracking-tight">
                            {feature.title}
                          </h2>
                        </div>
                        
                        <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-1.5 font-normal leading-relaxed text-balance">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Navigation Arrows (Right) */}
            <button
              onClick={handleNextClick}
              disabled={scrollIndex === features.length - 1}
              className={`hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-blue-600/30 text-blue-600 hover:bg-blue-50 hover:border-blue-600 items-center justify-center shadow-md transition-all duration-300 active:scale-95 cursor-pointer ${
                scrollIndex === features.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              aria-label="Siguiente autonomía"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </motion.div>

          {/* Slider Navigation Dots Indicators */}
          <div className="flex justify-center items-center gap-2.5 mt-5">
            {Array.from({ length: features.length }).map((_, index) => (
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

        </div>
      </section>



      {/* 3 & 4. MÁS ACCESIBLE QUE UNA MOTO */}
<section className="w-full py-8 md:py-14 bg-white px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32 overflow-hidden">
  <div className="max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col w-full"
    >
      {/* Imagen respetando margen global */}
      <div 
        className="relative w-full aspect-[16/9] sm:aspect-[16/7] md:aspect-auto overflow-hidden rounded-xl"
        style={imageHeight > 0 ? { height: `${imageHeight}px` } : undefined}
      >
        <img
          src={chargePlug}
          alt="TT estacionado en garage residencial"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header de texto */}
      <div className="mt-7 md:mt-9">
        <span className="text-blue-600 uppercase tracking-widest text-xs sm:text-sm font-bold mb-3 block">
          Ahorro Eléctrico
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight mb-7 md:mb-9">
          Más accesible que una moto
        </h2>
      </div>

      {/* Desktop: grid 3 columnas | Mobile: carrusel */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 md:w-full md:left-0 md:translate-x-0">
        <div
          ref={benefitsSliderRef}
          className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible scrollbar-none gap-5 sm:gap-7 md:gap-9 snap-x snap-mandatory md:snap-none select-none scroll-smooth px-4 sm:px-6 md:px-0 scroll-px-4 sm:scroll-px-6 md:scroll-px-0"
        >
          {benefitsData.map((item) => (
            <div
              key={item.id}
              className="w-[72vw] min-w-[240px] max-w-[285px] md:w-auto md:min-w-0 flex-shrink-0 md:flex-shrink snap-start flex flex-col bg-gray-50/60 p-5 rounded-2xl border border-gray-100/80 md:bg-transparent md:p-0 md:border-none md:rounded-none"
            >
              {item.icon}
              <h3 className="text-2xl sm:text-3xl md:text-[28px] font-display font-normal text-gray-900 tracking-tight mt-4 mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed font-normal">
                {item.text1}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed font-normal mt-3">
                {item.text2}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dots solo en mobile */}
      <div className="flex md:hidden justify-center items-center gap-2.5 mt-6">
        {benefitsData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleBenefitsDotClick(index)}
            className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
              benefitsScrollIndex === index
                ? 'w-8 bg-blue-600 shadow-sm'
                : 'w-2.5 bg-gray-200 hover:bg-gray-400'
            }`}
            aria-label={`Ir a beneficio ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  </div>
</section>





      {/* 5. BANNER: REPÁRALO A LA VUELTA */}
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
                REFACCIONES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight">
                Reparalo a la vuelta
              </h2>
              <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed font-normal max-w-2xl mb-7 md:mb-9">
              Las refacciones se producen en México, siempre disponibles, sin esperas. Al tener menos piezas que un carro de gasolina, hay menos cosas que fallen y menos dinero en reparaciones.        </p>
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
                  src={mexArch}
                  alt="Puebla Cathedral and colonial architecture"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>


{/* AUTONOMÍAS: PERFECTO PARA TU RECORRIDO */}
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
        Autonomias
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight w-full lg:max-w-[calc(100%-14px)]">
        Perfecto para tu recorrido
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
        onClick={handleRangePrevClick}
        disabled={rangeScrollIndex === 0}
        className={`hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-blue-600/30 text-blue-600 hover:bg-blue-50 hover:border-blue-600 items-center justify-center shadow-md transition-all duration-300 active:scale-95 cursor-pointer ${
          rangeScrollIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Anterior autonomía"
      >
        <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
      </button>

      <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-visible">
        <div 
          ref={rangeSliderRef}
          className="w-full overflow-x-auto scrollbar-none flex gap-6 sm:gap-7 pt-0 pb-5 snap-x snap-mandatory select-none scroll-smooth pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-16 lg:pr-16 xl:pl-[max(96px,calc((100vw-1152px)/2))] xl:pr-[max(96px,calc((100vw-1152px)/2))] scroll-px-4 sm:scroll-px-6 lg:scroll-px-16 xl:scroll-px-[max(96px,calc((100vw-1152px)/2))]"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onMouseDown={handleRangeMouseDown}
          onMouseLeave={handleRangeMouseLeave}
          onMouseUp={handleRangeMouseUp}
          onMouseMove={handleRangeMouseMove}
        >
          {rangeData.map((item) => (
            <div
              key={item.id}
              className="min-w-[285px] sm:min-w-[340px] md:min-w-[380px] lg:min-w-[75%] lg:max-w-[75%] lg:flex-shrink-0 snap-start"
            >
              <ImageOverlayCard
  title={item.title}
  description={item.description}
  bgImage={item.bgImage}
  className="w-full aspect-[5/4] lg:aspect-[2.2/1]"
  titleClassName="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-white tracking-tight"
  icon={<Icon icon="fluent:highway-20-filled" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-white"/>} 
  contentPosition="top"
  showOverlay={true}
  useRangeGradient={true}
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
          ))}
        </div>
      </div>

      {/* Desktop Navigation Arrows (Right) */}
      <button
        onClick={handleRangeNextClick}
        disabled={rangeScrollIndex === rangeData.length - 1}
        className={`hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-blue-600/30 text-blue-600 hover:bg-blue-50 hover:border-blue-600 items-center justify-center shadow-md transition-all duration-300 active:scale-95 cursor-pointer ${
          rangeScrollIndex === rangeData.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Siguiente autonomía"
      >
        <ChevronRight className="w-6 h-6 stroke-[2.5]" />
      </button>
    </motion.div>

    {/* Slider Navigation Dots Indicators */}
    <div className="flex justify-center items-center gap-2.5 mt-5">
      {rangeData.map((_, index) => (
        <button
          key={index}
          onClick={() => handleRangeDotClick(index)}
          className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
            rangeScrollIndex === index 
              ? 'w-8 bg-blue-600 shadow-sm' 
              : 'w-2.5 bg-gray-200 hover:bg-gray-400'
          }`}
          aria-label={`Ir a autonomía ${index + 1}`}
        />
      ))}
    </div>
  </div>
</section>

{/* 5B. INTERIORES: HECHO PARA DURAR */}
<section className="w-full py-8 md:py-14 bg-white px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32 overflow-hidden">
  <div className="max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col w-full"
    >
      {/* Imagen respetando margen global */}
      <div 
        className="relative w-full aspect-[16/9] sm:aspect-[16/7] md:aspect-auto overflow-hidden rounded-xl"
        style={imageHeight > 0 ? { height: `${imageHeight}px` } : undefined}
      >
        <img
          src={interior}
          alt="Interior del TT Model S01 Barrio"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header de texto centrado */}
      <div className="mt-7 md:mt-9 flex flex-col items-center text-center">
        <span className="text-blue-600 uppercase tracking-widest text-xs sm:text-sm font-bold mb-3 block">
          Interiores
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight mb-4 md:mb-5 max-w-2xl">
          Hecho para durar, equipado para disfrutar
        </h2>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-normal max-w-2xl mb-7 md:mb-9">
          Interior resistente al uso diario, asientos para toda la familia. Sin pantallas ni sensores que fallen, solo lo vital para un trayecto sin molestias.
        </p>
      </div>

      {/* Desktop: grid 3 columnas centrado | Mobile: carrusel */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 md:w-full md:left-0 md:translate-x-0">
        <div
          ref={interiorSliderRef}
          className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible scrollbar-none gap-5 sm:gap-7 md:gap-9 snap-x snap-mandatory md:snap-none select-none scroll-smooth pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-16 lg:pr-16 xl:pl-[max(96px,calc((100vw-1152px)/2))] xl:pr-[max(96px,calc((100vw-1152px)/2))] md:pl-0 md:pr-0 lg:pl-0 lg:pr-0 xl:pl-0 xl:pr-0 scroll-px-4 sm:scroll-px-6 md:scroll-px-0"
        >
          {interiorData.map((item) => (
            <div
              key={item.id}
              className="w-[72vw] min-w-[240px] max-w-[285px] md:w-auto md:min-w-0 flex-shrink-0 md:flex-shrink snap-start flex flex-col items-center text-center bg-gray-50/60 p-5 rounded-2xl border border-gray-100/80 md:bg-transparent md:p-0 md:border-none md:rounded-none"
            >
              {item.icon}
              <h3 className="text-2xl sm:text-3xl md:text-[28px] font-display font-normal text-gray-900 tracking-tight mt-4 mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed font-normal">
                {item.text1}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dots solo en mobile */}
      <div className="flex md:hidden justify-center items-center gap-2.5 mt-6">
        {interiorData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleInteriorDotClick(index)}
            className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
              interiorScrollIndex === index
                ? 'w-8 bg-blue-600 shadow-sm'
                : 'w-2.5 bg-gray-200 hover:bg-gray-400'
            }`}
            aria-label={`Ir a característica ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  </div>
</section>


{/* INTERIORES: CÓMODO PARA TODOS */}
<section className="w-full py-8 md:py-14 px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32" style={{ backgroundColor: '#fcfaf9' }}>
  <div className="max-w-6xl lg:max-w-4xl mx-auto">
    {/* Header centrado */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center mb-6 md:mb-8"
    >
      <span className="text-blue-600 uppercase tracking-widest text-xs sm:text-sm font-bold mb-3 block">
        Interiores
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight">
        Comodo Para Todos
      </h2>
    </motion.div>

    {/* Grid: mobile = solo columna, desktop = 2 columnas */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
      
      {/* Columna izquierda: 2 imágenes apiladas (bottom card oculta en mobile) */}
      <div className="flex flex-col gap-4 sm:gap-5 order-2 lg:order-1">
        {/* Top: auto con puerta abierta - visible en mobile y desktop */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[16/9] lg:aspect-[3/2] rounded-xl overflow-hidden bg-white border border-gray-100"
        >
          <img
            src={puertas}
            alt="TT vista lateral con puerta abierta"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        {/* Bottom: auto de perfil - oculta en mobile */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="hidden lg:block relative w-full aspect-[3/2] rounded-xl overflow-hidden bg-white border border-gray-100"
        >
          <img
            src={blancoproduct}
            alt="TT vista lateral completa"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Columna derecha: imagen grande del interior con selector de material */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:h-full min-h-[320px] sm:min-h-[350px] lg:min-h-0 rounded-xl overflow-hidden bg-white border border-gray-100 order-1 lg:order-2"
      >
        {/* Capa base de fondo (siempre visible para evitar destellos o fondos vacíos) */}
        <img
          src={interiorImages.tela}
          alt="Interior TT acabado tela mate"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Capa superior que se disuelve encima */}
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: interiorMaterial === 'piel' ? 1 : 0 }}
        >
          <img
            src={interiorImages.piel}
            alt="Interior TT acabado piel mate"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Selector de material overlay */}
        <div className="absolute bottom-5 sm:bottom-7 left-0 right-0 flex flex-col items-center gap-2.5 z-10">
          <span className="text-white text-xs sm:text-sm font-bold drop-shadow-sm">
            Interiores
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setInteriorMaterial('tela')}
              aria-label="Tela Mate"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-400 transition-all duration-200 cursor-pointer ${
                interiorMaterial === 'tela'
                  ? 'ring-2 ring-blue-600 ring-offset-2 ring-offset-white scale-105'
                  : 'opacity-80 hover:opacity-100'
              }`}
            />
            <button
              type="button"
              onClick={() => setInteriorMaterial('piel')}
              aria-label="Piel Mate"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 transition-all duration-200 cursor-pointer ${
                interiorMaterial === 'piel'
                  ? 'ring-2 ring-blue-600 ring-offset-2 ring-offset-white scale-105'
                  : 'opacity-80 hover:opacity-100'
              }`}
            />
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-white text-[11px] sm:text-xs font-semibold drop-shadow-sm">
            <span className={interiorMaterial === 'tela' ? 'opacity-100' : 'opacity-60'}>Tela Mate</span>
            <span className={interiorMaterial === 'piel' ? 'opacity-100' : 'opacity-60'}>Piel Mate</span>
          </div>
        </div>

        {/* Sombra inferior para legibilidad del overlay */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  </div>
</section>

{/* SEGURIDAD: DISEÑAMOS PARA TU SEGURIDAD */}
<section className="w-full py-12 md:py-20 bg-white px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32">
  <div className="max-w-6xl mx-auto">
    {/* Header centrado */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center mb-8 md:mb-12"
    >
      <span className="text-blue-600 uppercase tracking-widest text-xs sm:text-sm font-bold mb-3 block">
        Seguridad
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight">
        Diseñamos para <br className="hidden sm:block" /> Tu Seguridad
      </h2>
    </motion.div>

    {/* Grid 2 columnas */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

      {/* Card 1: Soporte Anti Vuelco */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col"
      >
        <div
          className="relative w-full aspect-[3/2] bg-white rounded-xl border"
          style={{ borderColor: '#d8d8d0' }}
        >
          <div className="absolute inset-2 overflow-hidden bg-gray-50 rounded-lg">
            <img
              src={armazon}
              alt="TT en carretera de montaña"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            {/* Badge de ícono inferior izquierdo */}
            <div className="absolute bottom-4 left-4 text-white">
              <Icon icon="mingcute:mountain-2-line" className="w-10 h-10" />
              </div>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl md:text-[26px] font-display font-bold text-navy-900 tracking-tight mt-5 mb-2">
          Soporte Anti Vuelco
        </h3>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-normal">
          Protección adicional gracias a una estructura diseñada para mantener la integridad del vehículo.
        </p>
      </motion.div>

      {/* Card 2: Suspensión de Verdad */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="flex flex-col"
      >
        <div
          className="relative w-full aspect-[3/2] bg-white rounded-xl border"
          style={{ borderColor: '#d8d8d0' }}
        >
          <div className="absolute inset-2 overflow-hidden bg-gray-50 rounded-lg">
            <img
              src={iso2026}
              alt="Chasis y suspensión del TT"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay superior: NOM 2026 badge */}
            <div className="absolute top-4 left-4 right-4 flex items-start gap-3">
              <div className="bg-white rounded-md px-2.5 py-1.5 shadow-sm flex flex-col items-center leading-none">
                <span className="text-[10px] sm:text-xs font-black text-gray-900 tracking-tight">NOM</span>
                <span className="text-sm sm:text-base font-black text-gray-900 leading-none">2026</span>
                <span className="text-[8px] sm:text-[9px] font-bold text-gray-500 tracking-tight">194 - SE</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-800 font-semibold leading-snug bg-white/70 backdrop-blur-sm rounded-md px-2 py-1.5">
                El TT S1 es considerado el más seguro en su categoria
              </p>
            </div>

            {/* Badge de ícono inferior izquierdo */}
            <div className="absolute bottom-4 left-4 text-white">
              <Icon icon="tabler:car-suspension" className="w-10 h-10" />
              </div>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl md:text-[26px] font-display font-bold text-navy-900 tracking-tight mt-5 mb-2">
          Suspensión de Verdad.
        </h3>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-normal">
          Diseñada para las calles de México. Baches, topes y caminos de terracería.
        </p>
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
                         variant="white-filled"
                         className="w-full sm:w-[240px] text-xs sm:text-sm px-6 py-3"
                         onClick={() => {
                           window.history.pushState({}, '', '/design-ordenar');
                           window.dispatchEvent(new PopStateEvent('popstate'));
                           window.scrollTo({ top: 0, behavior: 'instant' });
                         }}
                       >
                         Lo Quiero
                       </Button>
                     </div>
          </motion.div>



        </div>
      </section>




      {/* Complete Interactive Reservation & Lo Quiero Flow Overlay Modal */}
      <AnimatePresence>
        {showReservationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isReserved) setShowReservationModal(false);
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Custom Interactive Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-md bg-white rounded-xl overflow-hidden p-6 sm:p-8 shadow-2xl z-10 border border-gray-100"
            >
              {/* Reset view on close */}
              {!isReserved && (
                <button
                  onClick={() => setShowReservationModal(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors focus:outline-none"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Toggle success or regular entry state */}
              {isReserved ? (
                <div className="py-6 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-5"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-gray-900">
                    ¡Pre-Registro Exitoso!
                  </h3>
                  <p className="text-sm text-gray-500 mt-2.5 leading-relaxed text-balance">
                    Felicidades, <span className="font-semibold text-gray-800">{reservationName}</span>. Hemos reservado tu lugar exclusivo para el <span className="font-semibold text-gray-800">Model S01 Barrio</span>.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-6 border border-gray-100/80 w-full text-left space-y-1.5 font-mono text-xs text-gray-600">
                    <p><strong>Clave:</strong> TT-RESERVA-{Math.floor(100000 + Math.random() * 900000)}</p>
                    <p><strong>Monto Semanal:</strong> $950 MXN nominal</p>
                    <p><strong>Plazo:</strong> 142 Semanas continuas</p>
                    <p><strong>Contacto registrado:</strong> {reservationPhone}</p>
                    <p><strong>Correo enviado a:</strong> {reservationEmail}</p>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-5 italic">
                    Un asesor TT te marcará en menos de 24 horas para validar tu dirección de entrega.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReserveSubmit} className="space-y-5">
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-display font-black text-navy-900">
                      Aparta tu S01 Barrio
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Completa tu pre-registro gratuito para garantizar tasa y semana promocional de $950 MXN.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        required
                        value={reservationName}
                        onChange={(e) => setReservationName(e.target.value)}
                        placeholder="ej. Juan Pérez G."
                        className="w-full h-11 px-4 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all font-sans text-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        required
                        value={reservationEmail}
                        onChange={(e) => setReservationEmail(e.target.value)}
                        placeholder="ej. juan.perez@dominio.com"
                        className="w-full h-11 px-4 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all font-sans text-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Teléfono Móvil (WhatsApp)
                      </label>
                      <input
                        type="tel"
                        required
                        value={reservationPhone}
                        onChange={(e) => setReservationPhone(e.target.value)}
                        placeholder="ej. 55 1234 5678"
                        className="w-full h-11 px-4 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all font-sans text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100/50 flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      id="opt-in-terms"
                      className="mt-1 accent-blue-600 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="opt-in-terms" className="text-[11px] text-gray-600 leading-normal cursor-pointer">
                      Acepto registrar mi contacto para recibir bases legales, planes de enganche cero de TT y aviso de privacidad de datos.
                    </label>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full h-12 hover:scale-101 shadow-md bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Confirmar mi Pre-Registro
                    </Button>
                    <p className="text-[10px] text-gray-400 text-center mt-3">
                      Seguridad SSL Encriptada. Sin costos ni penalizaciones ocultas.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Absolute center dialog replacing blocking cross-origin alert calls */}
      <AnimatePresence>
        {modalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="custom-alert-modal-vehiculo">
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
