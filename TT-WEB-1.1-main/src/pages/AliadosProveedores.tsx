import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { supabase } from '../utils/supabase';

// Placeholder image - reemplazar por la definitiva cuando esté lista
import negroCar from '../assets/images/negro.avif';

const maquinaria = 'https://res.cloudinary.com/dpynwjc8f/image/upload/v1784689294/iamgenes_seccion_vehiiculo_12_uvelmz.jpg';

export const AliadosProveedores: React.FC = () => {
  // ===== ESTADO DEL FORMULARIO =====
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [tipoColaboracion, setTipoColaboracion] = useState('');
  const [estado, setEstado] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const colaboracionOptions = ['Proveeduría de partes', 'Manufactura', 'Logística', 'Distribución', 'Servicios', 'Otro'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !telefono || !correo || !tipoColaboracion || !estado) {
      setErrorMessage('Por favor completa todos los campos requeridos.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    let backendSuccess = false;

    try {
      // 1. Intentamos registrar a través del backend (/api/proveedores) para evitar CORS/Fetch en iframes de navegadores
      const response = await fetch('/api/proveedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          empresa,
          telefono,
          correo,
          tipo_colaboracion: tipoColaboracion,
          estado,
          mensaje
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
      console.warn('Backend /api/proveedores no disponible o falló:', backendErr);
    }

    if (backendSuccess) {
      setIsSubmitting(false);
      setIsSubmitted(true);
      return;
    }

    try {
      // 2. Si el backend falla (por ejemplo, si no está disponible la ruta de la API o es un host estático como Vercel), hacemos fallback directo al cliente de Supabase
      console.warn('Backend API no disponible o no retornó éxito, intentando inserción directa con cliente de Supabase...');
      const { error } = await supabase
        .from('proveedores')
        .insert([
          {
            nombre,
            empresa,
            telefono,
            correo,
            tipo_colaboracion: tipoColaboracion,
            estado,
            mensaje
          }
        ]);

      if (error) {
        console.warn('Error guardando en Supabase (tabla proveedores), intentando fallback con providers:', error);
        
        // Intentar alternativamente con 'providers' por si acaso la tabla tiene otro nombre
        const { error: altError } = await supabase
          .from('providers')
          .insert([
            {
              nombre,
              empresa,
              telefono,
              correo,
              tipo_colaboracion: tipoColaboracion,
              estado,
              mensaje
            }
          ]);
          
        if (altError) {
          throw new Error(`Error en 'proveedores': ${error.message} (Detalles: ${error.details || 'ninguno'}). Error en 'providers': ${altError.message} (Detalles: ${altError.details || 'ninguno'})`);
        }
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error detallado de envío:', err);
      setErrorMessage(err?.message || 'Ocurrió un error al enviar tu registro. Por favor, intenta de nuevo o contáctanos directamente.');
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
                Contacto para <span className="font-bold">Provedores</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-md">
                Nuestro equipo de alianzas revisará tu información y se pondrá en contacto contigo.
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
                  <span className="font-bold text-navy-900">¡Tu solicitud ha sido enviada con éxito!</span> Para completar tu registro como proveedor, envía tu propuesta comercial o portafolio de productos y servicios al correo{' '}
                  <a
                    href="mailto:contacto@ttautomotriz.com"
                    className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
                  >
                    contacto@ttautomotriz.com
                  </a>
                  . Nuestro equipo evaluará tu información y, si existe una oportunidad de colaboración, se pondrá en contacto contigo.
                </p>
              </motion.div>
            ) : (
              /* ===== FORMULARIO ===== */
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Fila: Nombre completo + Empresa */}
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
                      Empresa
                    </label>
                    <input
                      type="text"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
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

                {/* Fila: Tipo de colaboración / Estado */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Tipo de colaboración
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={tipoColaboracion}
                        onChange={(e) => setTipoColaboracion(e.target.value)}
                        className="appearance-none w-full h-11 px-4 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800 cursor-pointer"
                      >
                        <option value="">Selecciona una opción</option>
                        {colaboracionOptions.map((tipo) => (
                          <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                      placeholder="Ciudad y estado"
                      className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800"
                    />
                  </div>
                </div>

                {/* Cuéntanos qué ofrece tu empresa */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Cuéntanos qué ofrece tu empresa
                  </label>
                  <input
                    type="text"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Mensaje breve"
                    className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-gray-800"
                  />
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
                    'Enviar registro'
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* ===================================================== */}
          {/* COLUMNA DERECHA: IMAGEN                                */}
          {/* ===================================================== */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-950 border border-gray-100">
              <img
                src={maquinaria}
                alt="Nave industrial de proveedores TT"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};