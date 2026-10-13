import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { supabase } from '../utils/supabase';

// Placeholder image - reemplazar por la definitiva cuando esté lista

const colaborador = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784689099/iamgenes_seccion_vehiiculo_11_jpgpg9.jpg';


export const UneteAlEquipo: React.FC = () => {
  // ===== ESTADO DEL FORMULARIO =====
  const [nombre, setNombre] = useState('');
  const [educacion, setEducacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [areaInteres, setAreaInteres] = useState('');
  const [experiencia, setExperiencia] = useState<'si' | 'no' | ''>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const areaOptions = ['Ingeniería', 'Diseño', 'Operaciones', 'Ventas', 'Marketing', 'Otro'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !telefono || !correo || !areaInteres || !experiencia) {
      setErrorMessage('Por favor completa todos los campos requeridos.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    let backendSuccess = false;

    try {
      // 1. Intentar registrar a través de nuestro backend Express/Cloud Run
      const response = await fetch('/api/candidatos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          educacion,
          telefono,
          correo,
          area_interes: areaInteres,
          experiencia
        }),
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          if (result.success) {
            backendSuccess = true;
          }
        }
      }
    } catch (backendErr) {
      console.warn('Backend /api/candidatos no disponible o falló:', backendErr);
    }

    if (backendSuccess) {
      setIsSubmitting(false);
      setIsSubmitted(true);
      return;
    }

    try {
      // 2. Si el backend falla (por ejemplo, si no está disponible la ruta de la API en hosting estático), hacemos fallback directo al cliente de Supabase
      console.warn('Backend API no disponible o no retornó éxito, intentando inserción directa con cliente de Supabase...');
      
      // Intento 1: Tabla 'candidatos' con experiencia como string ('si'/'no')
      let { error } = await supabase
        .from('candidatos')
        .insert([
          {
            nombre,
            educacion,
            telefono,
            correo,
            area_interes: areaInteres,
            experiencia
          }
        ]);

      // Si falla, intentamos convertir 'experiencia' a boolean por si la columna en la base de datos es de tipo BOOLEAN
      if (error) {
        console.warn('Error en candidatos con string, intentando con experiencia como boolean...', error.message);
        const { error: boolError } = await supabase
          .from('candidatos')
          .insert([
            {
              nombre,
              educacion,
              telefono,
              correo,
              area_interes: areaInteres,
              experiencia: experiencia === 'si'
            }
          ]);
        
        if (!boolError) {
          error = null; // Éxito con boolean!
        } else {
          console.warn('Error en candidatos con boolean, intentando con tabla candidates...', boolError.message);
          
          // Intento 3: Tabla 'candidates' (en inglés) con experiencia como string
          const { error: engError } = await supabase
            .from('candidates')
            .insert([
              {
                nombre,
                educacion,
                telefono,
                correo,
                area_interes: areaInteres,
                experiencia
              }
            ]);
            
          if (!engError) {
            error = null; // Éxito con tabla en inglés!
          } else {
            console.warn('Error en candidates con string, intentando con candidates con boolean...', engError.message);
            
            // Intento 4: Tabla 'candidates' con experiencia como boolean
            const { error: engBoolError } = await supabase
              .from('candidates')
              .insert([
                {
                  nombre,
                  educacion,
                  telefono,
                  correo,
                  area_interes: areaInteres,
                  experiencia: experiencia === 'si'
                }
              ]);
              
            if (!engBoolError) {
              error = null; // Éxito!
            } else {
              // Si todo falló, reportamos
              throw new Error(`Error en 'candidatos' (string): ${error.message}. Error en 'candidatos' (bool): ${boolError.message}. Error en 'candidates' (string): ${engError.message}. Error en 'candidates' (bool): ${engBoolError.message}`);
            }
          }
        }
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error al enviar postulación:', err);
      setErrorMessage(err.message || 'No se pudo conectar con el servidor. Inténtalo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ===================================================== */}
          {/* COLUMNA IZQUIERDA: FORMULARIO                          */}
          {/* ===================================================== */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">

            {/* Encabezado */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight mb-3">
                Únete al equipo
              </h1>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-md">
                Revisamos cada postulación. Si tu perfil encaja con una vacante disponible, te contactaremos pronto.
              </p>
            </div>

            {isSubmitted ? (
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
                  <span className="font-bold text-navy-900">¡Solicitud recibida!</span> Tu información se ha enviado correctamente. Para completar tu postulación, envía tu CV a{' '}
                  <a
                    href="mailto:contacto@ttautomotriz.com"
                    className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
                  >
                    contacto@ttautomotriz.com
                  </a>
                  . Nos pondremos en contacto contigo si tu perfil coincide con la vacante.
                </p>
              </motion.div>
            ) : (
              /* ===== FORMULARIO ===== */
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Fila: Nombre completo + Educación */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Tu nombre completo"
                      className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Educación
                    </label>
                    <input
                      type="text"
                      value={educacion}
                      onChange={(e) => setEducacion(e.target.value)}
                      placeholder="Nombre de tu organización"
                      className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800"
                    />
                  </div>
                </div>

                {/* Fila: WhatsApp / Correo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      required
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      placeholder="correo@empresa.com"
                      className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800"
                    />
                  </div>
                </div>

                {/* Área de interés */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Área de interés
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={areaInteres}
                      onChange={(e) => setAreaInteres(e.target.value)}
                      className="appearance-none w-full h-11 px-4 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800 cursor-pointer"
                    >
                      <option value="">Selecciona un área</option>
                      {areaOptions.map((area) => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Experiencia en el sector */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    ¿Tienes experiencia en el sector automotriz?
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setExperiencia('si')}
                      className={`flex-1 h-11 rounded-md border text-sm font-medium transition-all cursor-pointer ${
                        experiencia === 'si'
                          ? 'border-blue-600 ring-1 ring-blue-600 text-blue-600 bg-blue-50'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      onClick={() => setExperiencia('no')}
                      className={`flex-1 h-11 rounded-md border text-sm font-medium transition-all cursor-pointer ${
                        experiencia === 'no'
                          ? 'border-blue-600 ring-1 ring-blue-600 text-blue-600 bg-blue-50'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-3">
                    {errorMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full h-12 mt-2 flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* ===================================================== */}
          {/* COLUMNA DERECHA: IMAGEN                                */}
          {/* ===================================================== */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
              <img
                src={colaborador}
                alt="Equipo TT trabajando"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>



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
                UNETE A NOSOTROS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-navy-900 tracking-tight leading-tight">
                Nuestro plan para tu vida
              </h2>
              <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed font-normal max-w-2xl mb-7 md:mb-9">
              En TT buscamos personas con sentido humano que aporten su talento e ideas para mejorar su entorno laboral y personal, dejando huella en lo que más nos apasiona:mover a México hacia un futuro más limpio.</p>
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
                  src={colaborador}
                  alt="Puebla Cathedral and colonial architecture"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};