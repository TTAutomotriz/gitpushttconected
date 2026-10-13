import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundPaths } from '../../components/ui/background-paths';
import { Button } from '../components/Button';
import { ImageOverlayCard } from '../components/ImageOverlayCard';
import { Icon } from '@iconify/react';


import heroSuvs from '../assets/images/tt_hero_suvs_1781751145156.jpg';
import blancoCar from '../assets/images/tarjetasauto2.png';
import negroCar from '../assets/images/tarjetasauto3.png';


import { 
  TrendingUp, 
  Award, 
  Landmark, 
  Globe, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Settings,
  Car,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { supabase } from '../utils/supabase';


const evento = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784693648/iamgenes_seccion_vehiiculo_13_cws1yw.jpg';
const planta = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784697541/iamgenes_seccion_vehiiculo_14_ctarwc.jpg';
const colaborador = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784689099/iamgenes_seccion_vehiiculo_11_jpgpg9.jpg';
const solarRoof = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784679614/iamgenes_seccion_vehiiculo_10_ollsar.jpg';
const maquinaria = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784689294/iamgenes_seccion_vehiiculo_12_uvelmz.jpg';
const vehiculo = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784677661/iamgenes_seccion_vehiiculo_3_dwvj0q.jpg';



export const InvierteEnTT: React.FC = () => {
  const [modalData, setModalData] = useState<{ title: string; message: string; icon?: React.ReactNode } | null>(null);
  const [isRevelationOpen, setIsRevelationOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState<{ 
    title: string; 
    subtitle: string; 
    tag: string; 
    bgImage: string; 
    description: string; 
    highlights: { title: string; desc: string }[] 
  } | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', amount: '10k-50k', phone: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // ===== ESTADO DEL FORMULARIO INVIERTE EN TT =====
  const [invNombre, setInvNombre] = useState('');
  const [invCorreo, setInvCorreo] = useState('');
  const [invTelefono, setInvTelefono] = useState('');
  const [invEmpresa, setInvEmpresa] = useState('');
  const [invMonto, setInvMonto] = useState('');
  const [invPerfil, setInvPerfil] = useState('');
  const [invMensaje, setInvMensaje] = useState('');
  const [invIsSubmitted, setInvIsSubmitted] = useState(false);
  const [invIsSubmitting, setInvIsSubmitting] = useState(false);
  const [invErrorMessage, setInvErrorMessage] = useState<string | null>(null);

  const montoOptions = [
    'Menos de $500,000',
    '$500,000 – $2,000,000',
    '$2,000,000 – $10,000,000',
    'Más de $10,000,000',
  ];

  const perfilOptions = [
    'Inversionista individual',
    'Family Office',
    'Fondo institucional',
    'Otro',
  ];

  const handleInvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invNombre || !invCorreo || !invTelefono || !invMonto || !invPerfil) {
      setInvErrorMessage('Por favor completa todos los campos requeridos.');
      return;
    }

    setInvIsSubmitting(true);
    setInvErrorMessage(null);

    let backendSuccess = false;

    try {
      const response = await fetch('/api/inversionistas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: invNombre,
          correo: invCorreo,
          telefono: invTelefono,
          empresa: invEmpresa,
          monto_inversion: invMonto,
          perfil: invPerfil,
          mensaje: invMensaje,
        }),
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          if (result.success) {
            backendSuccess = true;
          }
        }
      }
    } catch (backendErr) {
      console.warn('Backend /api/inversionistas no disponible o falló:', backendErr);
    }

    if (backendSuccess) {
      setInvIsSubmitting(false);
      setInvIsSubmitted(true);
      return;
    }

    try {
      const { error } = await supabase
        .from('inversionistas')
        .insert([
          {
            nombre: invNombre,
            correo: invCorreo,
            telefono: invTelefono,
            empresa: invEmpresa,
            monto_inversion: invMonto,
            perfil: invPerfil,
            mensaje: invMensaje,
          },
        ]);

      if (error) {
        console.warn('Error en supabase inversionistas:', error);
        await supabase.from('investors').insert([
          {
            nombre: invNombre,
            correo: invCorreo,
            telefono: invTelefono,
            empresa: invEmpresa,
            monto_inversion: invMonto,
            perfil: invPerfil,
            mensaje: invMensaje,
          },
        ]);
      }

      setInvIsSubmitted(true);
    } catch (err: any) {
      console.error('Error guardando en Supabase:', err);
      setInvIsSubmitted(true);
    } finally {
      setInvIsSubmitting(false);
    }
  };

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
    const nextIndex = Math.min(3, scrollIndex + 1);
    handleDotClick(nextIndex);
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

  const showAlert = (title: string, message: string, icon?: React.ReactNode) => {
    setModalData({ title, message, icon });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showAlert('Campos requeridos', 'Por favor ingresa tu nombre y correo electrónico para contactarte.', <ShieldCheck className="w-10 h-10 text-red-500" />);
      return;
    }
    
    setIsFormSubmitted(true);
    showAlert(
      '¡Registro Exitoso!',
      `Gracias ${formData.name}. Hemos recibido tu registro de interés por un monto de $${formData.amount} USD. Un asesor de Relación con Inversionistas se pondrá en contacto contigo muy pronto.`,
      <TrendingUp className="w-10 h-10 text-dorado-100 animate-bounce" />
    );
    // Reset form
    setFormData({ name: '', email: '', amount: '10k-50k', phone: '' });
    setIsFormSubmitted(false);
  };

  // State, effects, and references for "Más accesible que una moto" section
  const [imageHeight, setImageHeight] = useState<number>(0);
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
      title: <>40 millones </>,
      text1: 'de personas esperando una opción que nadie ha construido.',
      text2: 'Nadie ha diseñado una solución real para la movilidad accesible en México. No por falta de mercado, sino por falta de visión. Hoy existe y seremos los lideres.'
    },
    {
      id: 'piezas',
      icon: <Settings className="w-11 h-11 stroke-[1.5] text-gray-900" />,
      title: <>La Ley </>,
      text1: 'puso las condiciones claras para 2030',
      text2: 'Los compromisos de descarbonización de México para 2030 no son una intención, son una hoja de ruta. Incentivos, política pública y contratos institucionales llegarán. La pregunta es quién estará listo para recibirlos.'
    },
    {
      id: 'mantenimiento',
      icon: <Car className="w-11 h-11 stroke-[1.5] text-gray-900" />,
      title: <>México</>,
      text1: 'Hara hoy lo que China aprendió hace diez años',
      text2: 'Las industrias eléctricas que hoy son referencia mundial no nacieron grandes. Nacieron en el momento correcto, con visión de largo plazo y decisiones tempranas. México está exactamente en ese punto.'
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-dorado-100" />,
      title: "Alto Crecimiento",
      description: "El mercado de electromovilidad en América Latina se proyecta con tasas de crecimiento anuales de doble dígito para la próxima década."
    },
    {
      icon: <Award className="w-6 h-6 text-dorado-100" />,
      title: "Garantía y Calidad",
      description: "La primera armadora de vehículos comerciales eléctricos hechos en México, diseñados específicamente para resolver la logística local."
    },
    {
      icon: <Landmark className="w-6 h-6 text-dorado-100" />,
      title: "Certidumbre Fiscal",
      description: "Inversión respaldada con incentivos de transición energética, deducibilidad inmediata y alto valor residual."
    },
    {
      icon: <Globe className="w-6 h-6 text-dorado-100" />,
      title: "Impacto Sustentable",
      description: "Alineado con criterios ESG. Cada vehículo TT en circulación ahorra toneladas de CO2 y reduce significativamente la contaminación sonora."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      

      {/* 1. HERO SECTION WITH BACKGROUND PATHS */}
      <div className="relative dark">
        <BackgroundPaths 
          title="Inmpulsando a México" 
          subtitle="Únete a la primera armadora mexicana de electromovilidad utilitaria. Invierte hoy en la infraestructura del mañana."
          buttonText="Invertir ahora"
          onButtonClick={() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }}
        />
      </div>


      {/* ===================================================== */}
{/* SECCIÓN: PARA LOS QUE CREEN EN UN MÉXICO ELÉCTRICO     */}
{/* ===================================================== */}
<section className="w-full py-12 md:py-20 bg-white px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32">
  <div className="max-w-6xl mx-auto">

    {/* Título */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight mb-6 md:mb-8"
    >
      Para los que creen en un México <br className="hidden sm:block" />
      Eléctrico, Sostenible y Soberano.
    </motion.h2>

    {/* Imagen */}
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full aspect-[16/9] lg:aspect-[2.2/1] rounded-xl overflow-hidden bg-gray-50 border border-gray-100"
    >
      <img
        src={evento}
        alt="Revelación de vehículo TT"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </motion.div>

    {/* Pie de foto + botón */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
      <div>
        <p className="text-base sm:text-lg font-display font-bold italic text-navy-900 leading-snug">
          Revelación de vehiculo TT 20256
        </p>
        <p className="text-sm sm:text-base italic text-gray-600">
          Emanuel Arbisu, Fundador
        </p>
      </div>

      <Button
        variant="black-outline"
        className="w-full sm:w-auto"
        onClick={() => setIsVideoOpen(true)}
      >
        Ver evento
      </Button>
    </div>

  </div>
</section>

      {/* 4. AUTONOMÍAS */}
      <section className="w-full py-8 md:py-14 bg-[#121212] px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header left aligned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col mb-7"
          >
            <span className="text-dorado-100 uppercase tracking-widest text-xs sm:text-sm font-bold mb-3 block">
              Empresa Nacional
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-white tracking-tight leading-tight w-full lg:max-w-[calc(100%-14px)]">
              Impulsando a México
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
              className={`hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-dorado-100/30 text-dorado-100 hover:bg-dorado-100/10 hover:border-dorado-100 items-center justify-center shadow-md transition-all duration-300 active:scale-95 cursor-pointer ${
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
                     title="Planta de producción"
                     description="Mayor autonomía para los trayectos más largos garantizando tu seguridad."
                     bgImage={planta}
                     className="w-full aspect-[5/4] lg:aspect-[2.2/1]"
                     titleClassName="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-white tracking-tight"
                     onExpand={() => setExpandedCard({
                       title: "Planta de producción",
                       subtitle: "Primer EV de carga ligera en México.",
                       tag: "Manufactura e Infraestructura",
                       bgImage: planta,
                       description: "Ensamblamos ingeniería 100% mexicana bajo estándares globales de manufactura sustentable.",
                       highlights: [
                         { title: "Soberanía", desc: "Diseño local e independiente." },
                         { title: "Robótica", desc: "Corte automatizado de alta precisión." }
                       ]
                     })}
                  />
                 </div>
                 <div className="min-w-[285px] sm:min-w-[340px] md:min-w-[380px] lg:min-w-[75%] lg:max-w-[75%] lg:flex-shrink-0 snap-start">
                   <ImageOverlayCard
                     title="Más Empleos Dignos"
                     description="Transporta pasajeros gastando menos en combustible que un taxi tradicional."
                     bgImage={colaborador}
                     className="w-full aspect-[5/4] lg:aspect-[2.2/1]"
                     titleClassName="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-white tracking-tight"
                     onExpand={() => setExpandedCard({
                       title: "Más Empleos Dignos",
                       subtitle: "Impulsando el talento local calificado.",
                       tag: "Impacto Social",
                       bgImage: colaborador,
                       description: "Capacitamos activamente a nuestras comunidades en ensamblaje de alta tecnología y energías limpias.",
                       highlights: [
                         { title: "Inclusión", desc: "Programas de capacitación y equidad." },
                         { title: "Desarrollo", desc: "Impulso de la economía regional." }
                       ]
                     })}
                   />
                 </div>
                 <div className="min-w-[285px] sm:min-w-[340px] md:min-w-[380px] lg:min-w-[75%] lg:max-w-[75%] lg:flex-shrink-0 snap-start">
                   <ImageOverlayCard
                     title="Energia Renovable"
                     description="El modelo más cómodo y seguro para trayectos cortos dentro de tu localidad."
                     bgImage={solarRoof}
                     className="w-full aspect-[5/4] lg:aspect-[2.2/1]"
                     titleClassName="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-white tracking-tight"
                     onExpand={() => setExpandedCard({
                       title: "Energía Renovable",
                       subtitle: "Movilidad limpia y balanceada.",
                       tag: "Sustentabilidad",
                       bgImage: solarRoof,
                       description: "Maximizamos cada trayecto mediante tecnologías de frenado regenerativo y celdas fotovoltaicas.",
                       highlights: [
                         { title: "Regenerativo", desc: "Recupera energía cinética en cada frenada." },
                         { title: "Eco-Diseño", desc: "Uso prioritario de materiales sustentables." }
                       ]
                     })}
                   />
                 </div>
                 <div className="min-w-[285px] sm:min-w-[340px] md:min-w-[380px] lg:min-w-[75%] lg:max-w-[75%] lg:flex-shrink-0 snap-start">
                   <ImageOverlayCard
                     title="Proveedores Locales"
                     description="El modelo más cómodo y seguro para trayectos cortos dentro de tu localidad."
                     bgImage={maquinaria}
                     className="w-full aspect-[5/4] lg:aspect-[2.2/1]"
                     titleClassName="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-white tracking-tight"
                     onExpand={() => setExpandedCard({
                       title: "Proveedores Locales",
                       subtitle: "Cadena de suministro nacional.",
                       tag: "Soberanía",
                       bgImage: maquinaria,
                       description: "Fortalecemos la industria mexicana colaborando estrechamente con socios y distribuidores en toda la república.",
                       highlights: [
                         { title: "Socio Local", desc: "Más del 70% de componentes de origen nacional." },
                         { title: "Calidad", desc: "Soporte inmediato y refacciones siempre garantizadas." }
                       ]
                     })}
                   />
                 </div>
              </div>
            </div>

            {/* Desktop Navigation Arrows (Right) */}
            <button
              onClick={handleNextClick}
              disabled={scrollIndex === 3}
              className={`hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-dorado-100/30 text-dorado-100 hover:bg-dorado-100/10 hover:border-dorado-100 items-center justify-center shadow-md transition-all duration-300 active:scale-95 cursor-pointer ${
                scrollIndex === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              aria-label="Siguiente autonomía"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </motion.div>

          {/* Slider Navigation Dots Indicators */}
          <div className="flex justify-center items-center gap-2.5 mt-5">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  scrollIndex === index 
                    ? 'w-8 bg-dorado-100 shadow-sm' 
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Ir a especificación ${index + 1}`}
              />
            ))}
          </div>

          {/* Below row, centered CTA buttons with 16px gap */}
          
        </div>
      </section>


      {/* 5. DIALOG SYSTEM */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="revelation-video-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-black/60 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl z-10 border border-white/10 flex flex-col p-4 sm:p-5 lg:p-6"
            >
              {/* Header Bar inside the Glass Box */}
              <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs text-[#d6b724] uppercase font-bold tracking-widest mb-0.5">Presentación Especial</span>
                  <span className="text-white font-display text-sm sm:text-base font-normal tracking-wide">Revelación de Vehículo TT 2026</span>
                </div>
                <button 
                  onClick={() => setIsVideoOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5 text-gray-200 hover:text-white" />
                </button>
              </div>

              {/* YouTube Iframe Video Player Container */}
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/90 shadow-2xl relative border border-white/5">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/o2p6YK_MudY?autoplay=1&rel=0"
                  title="TT Revelación Evento"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        )}

        {isRevelationOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" id="revelation-details-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRevelationOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-neutral-900 text-white rounded-[2rem] overflow-hidden shadow-2xl z-10 border border-neutral-800 flex flex-col"
            >
              {/* Cover Image inside the modal */}
              <div className="relative h-48 sm:h-64 bg-slate-950 overflow-hidden">
                <img 
                  src={heroSuvs} 
                  alt="Vehículo TT 20256" 
                  className="w-full h-full object-cover opacity-70"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                <button 
                  onClick={() => setIsRevelationOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/40 hover:bg-black/70 rounded-full flex items-center justify-center text-white border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  ✕
                </button>
                
                <div className="absolute bottom-4 left-6 sm:left-8">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-dorado-100/20 text-dorado-100 border border-dorado-100/20 uppercase tracking-wider mb-2">
                    Lanzamiento Oficial
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black font-display text-white">Vehículo TT 20256</h4>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h5 className="text-xs uppercase tracking-widest text-dorado-100 font-bold mb-2">La Visión</h5>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                    El vehículo comercial utilitario TT 20256 representa la cumbre de la transición energética nacional. Diseñado y construido bajo los pilares de soberanía tecnológica, resiliencia local e impacto ambiental cero.
                  </p>
                </div>

                {/* Key features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-800/50 border border-neutral-800 rounded-xl">
                    <p className="text-xs font-bold text-dorado-100 uppercase tracking-wider">Carga Solar Integrada</p>
                    <p className="text-sm text-neutral-300 mt-1">Sistemas fotovoltaicos de última generación que añaden hasta 40 km adicionales de autonomía gratis cada día.</p>
                  </div>
                  <div className="p-4 bg-neutral-800/50 border border-neutral-800 rounded-xl">
                    <p className="text-xs font-bold text-dorado-100 uppercase tracking-wider">Manufactura Soberana</p>
                    <p className="text-sm text-neutral-300 mt-1">Orgullosamente desarrollado en México, garantizando cadena de suministro local y refacciones inmediatas.</p>
                  </div>
                  <div className="p-4 bg-neutral-800/50 border border-neutral-800 rounded-xl">
                    <p className="text-xs font-bold text-dorado-100 uppercase tracking-wider">Costo Operativo Reducido</p>
                    <p className="text-sm text-neutral-300 mt-1">Hasta un 85% de ahorro en comparación con camiones de diésel o gasolina convencionales.</p>
                  </div>
                  <div className="p-4 bg-neutral-800/50 border border-neutral-800 rounded-xl">
                    <p className="text-xs font-bold text-dorado-100 uppercase tracking-wider">Telemetría IoT 24/7</p>
                    <p className="text-sm text-neutral-300 mt-1">Monitoreo continuo de salud de batería, ubicación exacta y optimización de rutas inteligentes.</p>
                  </div>
                </div>


              </div>
            </motion.div>
          </div>
        )}

        {expandedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="card-details-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedCard(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg md:max-w-3xl bg-black/60 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl z-10 border border-white/10 flex flex-col p-4 sm:p-6 text-white"
            >
              {/* Header Bar inside the Glass Box */}
              <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs text-[#d6b724] uppercase font-bold tracking-widest mb-0.5">
                    {expandedCard.tag}
                  </span>
                  <span className="text-white font-display text-sm sm:text-base font-normal tracking-wide">
                    {expandedCard.title}
                  </span>
                </div>
                <button 
                  onClick={() => setExpandedCard(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5 text-gray-200 hover:text-white" />
                </button>
              </div>

              {/* Cover Image inside the modal */}
              <div className="relative w-full h-36 sm:h-44 md:h-52 rounded-xl overflow-hidden bg-slate-950/40 mb-4 border border-white/5">
                <img 
                  src={expandedCard.bgImage} 
                  alt={expandedCard.title} 
                  className="w-full h-full object-cover opacity-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Content Grid to keep it compact and not too long */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
                {/* Left column: Subtitle and description */}
                <div className="space-y-1">
                  <h5 className="text-[11px] sm:text-xs uppercase tracking-widest text-[#d6b724]/90 font-bold">
                    {expandedCard.subtitle}
                  </h5>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    {expandedCard.description}
                  </p>
                </div>

                {/* Right column: Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
                  {expandedCard.highlights.map((highlight, idx) => (
                    <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-center">
                      <p className="text-[10px] font-bold text-[#d6b724] uppercase tracking-wider">{highlight.title}</p>
                      <p className="text-xs text-neutral-300 mt-0.5">{highlight.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {modalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="invest-alert-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalData(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl z-10 border border-gray-100 flex flex-col items-center text-center"
            >
              {modalData.icon && (
                <div className="w-16 h-16 bg-dorado-100/10 rounded-full flex items-center justify-center mb-5">
                  {modalData.icon}
                </div>
              )}
              
              <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900">
                {modalData.title}
              </h3>
              
              <p className="text-sm text-gray-500 mt-3 leading-relaxed text-balance">
                {modalData.message}
              </p>

              <div className="w-full pt-6">
                <Button
                  variant="default"
                  className="w-full h-11 bg-dorado-100 hover:bg-dorado-100/90 text-neutral-950 rounded-xl cursor-pointer"
                  onClick={() => setModalData(null)}
                >
                  Entendido
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      
      {/* Un momento de trans */}
<section className="w-full py-8 md:py-14 bg-white px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32 overflow-hidden">
  <div className="max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col w-full"
    >
    

      {/* Header de texto */}
      <div className="mt-7 md:mt-9">
        <span className="text-dorado-100 uppercase tracking-widest text-xs sm:text-sm font-bold mb-3 block">
          Oportunidad
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight mb-7 md:mb-9">
          Un momento de <span className="font-bold">transformación</span> único.
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-gray-900 tracking-tight mb-3 leading-tight">
                {item.title}
              </h2>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-relaxed">
                {item.text1}
              </h3>
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
                ? 'w-8 bg-dorado-100 shadow-sm'
                : 'w-2.5 bg-gray-200 hover:bg-gray-400'
            }`}
            aria-label={`Ir a beneficio ${index + 1}`}
          />
        ))}
      </div>


    </motion.div>
  </div>
</section>


      {/* ===== SECCIÓN: FORMULARIO INVIERTE EN TT ===== */}
      <section id="formulario-inversion" className="w-full bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* COLUMNA IZQUIERDA: FORMULARIO */}
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight mb-3">
                  Invierte en <span className="font-bold">TT</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-md">
                  Conoce la oportunidad de invertir en la primera movilidad eléctrica solar hecha en México.
                </p>
              </div>

              {invIsSubmitted ? (
                /* ===== MENSAJE DE CONFIRMACIÓN ===== */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-6"
                >
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    ¡Gracias por tu interés! Hemos recibido tu solicitud. Nuestro equipo de relaciones con inversionistas revisará tu perfil y se pondrá en contacto contigo en los próximos días para compartir el deck completo y agendar una conversación.
                  </p>
                </motion.div>
              ) : (
                /* ===== FORMULARIO ===== */
                <form onSubmit={handleInvSubmit} className="flex flex-col gap-5">

                  {/* Fila: Nombre completo + Correo electrónico */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        required
                        value={invNombre}
                        onChange={(e) => setInvNombre(e.target.value)}
                        placeholder="Tu nombre completo"
                        className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        required
                        value={invCorreo}
                        onChange={(e) => setInvCorreo(e.target.value)}
                        placeholder="correo@ejemplo.com"
                        className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Fila: Teléfono / WhatsApp + Empresa o fondo (opcional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Teléfono / WhatsApp
                      </label>
                      <div className="flex gap-2">
                        <div className="flex items-center justify-center h-11 px-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 flex-shrink-0">
                          🇲🇽 +52
                        </div>
                        <input
                          type="tel"
                          required
                          value={invTelefono}
                          onChange={(e) => setInvTelefono(e.target.value)}
                          placeholder="22 14 09 20 21"
                          className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Empresa o fondo <span className="normal-case font-normal text-gray-400">(Opcional)</span>
                      </label>
                      <input
                        type="text"
                        value={invEmpresa}
                        onChange={(e) => setInvEmpresa(e.target.value)}
                        placeholder="Nombre de tu empresa o fondo"
                        className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Fila: Monto de inversión de interés + Perfil */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Monto de inversión de interés
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={invMonto}
                          onChange={(e) => setInvMonto(e.target.value)}
                          className="appearance-none w-full h-11 px-4 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800 cursor-pointer"
                        >
                          <option value="">Selecciona un monto</option>
                          {montoOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Perfil
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={invPerfil}
                          onChange={(e) => setInvPerfil(e.target.value)}
                          className="appearance-none w-full h-11 px-4 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800 cursor-pointer"
                        >
                          <option value="">Selecciona tu perfil</option>
                          {perfilOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Mensaje breve (opcional) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Mensaje breve <span className="normal-case font-normal text-gray-400">(Opcional)</span>
                    </label>
                    <input
                      type="text"
                      value={invMensaje}
                      onChange={(e) => setInvMensaje(e.target.value)}
                      placeholder="Cuéntanos qué te interesa conocer sobre TT"
                      className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800"
                    />
                  </div>

                  {invErrorMessage && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-3">
                      {invErrorMessage}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full h-12 mt-2 flex items-center justify-center gap-2 cursor-pointer"
                    disabled={invIsSubmitting}
                  >
                    {invIsSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      'Solicitar información'
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* COLUMNA DERECHA: IMAGEN */}
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-950 border border-gray-100">
                <img
                  src={vehiculo}
                  alt="Inversión TT Automotriz"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
              </div>
            </div>

          </div>
        </div>
      </section>


    </div>
  );
};
