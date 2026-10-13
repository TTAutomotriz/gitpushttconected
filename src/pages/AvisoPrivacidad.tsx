import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Phone, MapPin, ArrowLeft, Calendar, FileText } from 'lucide-react';
import { Button } from '../components/Button';

export const AvisoPrivacidad: React.FC = () => {
  const handleBackHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="w-full bg-white text-gray-800 font-sans min-h-screen py-10 md:py-16 px-4 sm:px-6 lg:px-16">
      <div className="max-w-4xl mx-auto">
        
        {/* Botón Volver */}
        <div className="mb-8">
          <Button
            variant="glass"
            onClick={handleBackHome}
            className="flex items-center gap-2 text-xs sm:text-sm h-9 px-4 rounded-full text-gray-700 hover:text-black cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>
        </div>

        {/* Encabezado Principal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-gray-200 pb-8 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#538742]/10 text-[#538742] uppercase tracking-widest mb-3">
            <ShieldCheck className="w-4 h-4" />
            Legal y Cumplimiento
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy-900 tracking-tight leading-tight mb-3">
            Aviso de Privacidad Integral
          </h1>

          <p className="text-base sm:text-lg text-gray-600 font-medium mb-3">
            TT Automotriz · Sitio web y preventa de vehículos
          </p>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Última actualización: 12 de octubre de 2026</span>
          </div>
        </motion.div>

        {/* Introducción */}
        <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed space-y-6 text-sm sm:text-base">
          <p>
            En <strong>TT Automotriz</strong> sabemos que usted nos confía información personal al visitar nuestro sitio web, registrarse en la lista de interés o apartar un vehículo en preventa. Este Aviso de Privacidad explica quién es responsable de sus datos, cuáles recabamos, para qué los usamos, con quién los compartimos y cómo puede ejercer sus derechos. Se emite en cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (la "Ley"), su Reglamento y demás disposiciones aplicables.
          </p>
          <p className="text-gray-600 italic bg-gray-50 p-4 rounded-xl border border-gray-100">
            Este Aviso aplica exclusivamente al tratamiento de datos personales realizado a través del sitio web <span className="font-semibold text-gray-800">https://ttautomotriz.com</span> y de los formularios, botones de contacto y herramientas de preventa disponibles en él (el "Sitio").
          </p>
        </div>

        {/* Secciones del Aviso */}
        <div className="mt-12 space-y-12 text-sm sm:text-base leading-relaxed text-gray-700">
          
          {/* 1. Identidad y domicilio */}
          <section className="scroll-mt-20 border-t border-gray-100 pt-8" id="seccion-1">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="text-[#d6b724] font-mono">1.</span> Identidad y domicilio del responsable
            </h2>
            <div className="bg-gray-50/80 rounded-2xl p-5 sm:p-6 border border-gray-200/80 space-y-3">
              <p>
                <strong>Responsable:</strong> TT Automotriz, S.A.P.I. de C.V., que opera la marca <strong>TT Automotriz</strong> (en adelante, "TT", "nosotros" o el "Responsable").
              </p>
              <p className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <span><strong>Domicilio:</strong> Av. Insurgentes Sur 1602, Crédito Constructor, Benito Juárez, C.P. 03940, Ciudad de México, México.</span>
              </p>
              <p className="flex items-start gap-2.5">
                <FileText className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <span><strong>Área encargada:</strong> Departamento de Privacidad y Cumplimiento Normativo.</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <span><strong>Correo electrónico:</strong> <a href="mailto:privacidad@ttautomotriz.com" className="text-blue-600 underline">privacidad@ttautomotriz.com</a></span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <span><strong>Teléfono:</strong> +52 (55) 8000 8828</span>
              </p>
            </div>
          </section>

          {/* 2. Datos personales que recabamos */}
          <section className="scroll-mt-20 border-t border-gray-100 pt-8" id="seccion-2">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="text-[#d6b724] font-mono">2.</span> Datos personales que recabamos
            </h2>
            <p className="mb-4">
              Recabamos los datos personales estrictamente necesarios para las finalidades descritas en este Aviso, por las siguientes vías:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">2.1 Datos que usted nos proporciona directamente</h3>
                <p className="mb-3 text-gray-600">
                  Cuando se registra, solicita información, agenda una prueba o experiencia, realiza una preventa o se comunica con nosotros por el Sitio, correo electrónico o WhatsApp, podemos recabar:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Datos de identificación y contacto:</strong> nombre completo, correo electrónico, número de teléfono (incluido WhatsApp), ciudad, estado y código postal.</li>
                  <li><strong>Datos para la preventa:</strong> modelo, versión, color, accesorios y demás configuración del vehículo elegida; fecha y monto del apartado; preferencias de entrega.</li>
                  <li><strong>Datos fiscales (solo si solicita factura):</strong> razón social o nombre, RFC, régimen fiscal, código postal fiscal, uso de CFDI y correo para envío de factura.</li>
                  <li><strong>Datos de domicilio de entrega:</strong> calle, número, colonia, municipio, estado, código postal, y referencias, cuando sean necesarios para la entrega o gestión del vehículo.</li>
                  <li><strong>Contenido de sus comunicaciones:</strong> mensajes, comentarios, consultas o solicitudes que nos envíe.</li>
                  <li><strong>Datos de verificación de identidad:</strong> copia de identificación oficial y comprobante de domicilio, únicamente cuando sean necesarios para formalizar el contrato de compraventa, el registro del vehículo o para cumplir obligaciones legales.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">2.2 Datos financieros o patrimoniales</h3>
                <p>
                  Para procesar el pago del apartado o anticipo de preventa, el pago se realiza a través de un procesador de pagos autorizado (como Stripe o Mercado Pago). TT Automotriz no almacena en sus servidores el número completo de su tarjeta ni su código de seguridad; estos datos son capturados y resguardados directamente por el procesador de pagos bajo sus propios estándares de seguridad (incluido PCI DSS). Nosotros recibimos únicamente la confirmación del pago, los últimos cuatro dígitos de la tarjeta, el monto, la fecha y el identificador de la transacción. Si el pago se hace por transferencia, recabamos los datos de la operación (referencia, banco emisor, fecha y monto).
                </p>
                <p className="mt-2 text-gray-600">
                  Estos datos se consideran financieros o patrimoniales y su tratamiento requiere su consentimiento expreso, que se le solicitará de forma separada antes de realizar el pago.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">2.3 Datos que recabamos automáticamente</h3>
                <p>
                  Al navegar por el Sitio podemos recabar automáticamente: dirección IP, tipo y versión de navegador, sistema operativo, tipo de dispositivo, idioma, páginas visitadas, tiempo de permanencia, clics, origen de la visita (por ejemplo, anuncio, buscador o red social), fecha y hora de acceso y ubicación aproximada derivada de la IP. Para ello utilizamos cookies y tecnologías similares (ver sección 4).
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">2.4 Datos obtenidos de otras fuentes</h3>
                <p>
                  Podemos recibir datos de proveedores que nos prestan servicios (por ejemplo, plataformas de pago, de publicidad o de análisis) y de plataformas de redes sociales cuando usted interactúa con nuestros anuncios o formularios de contacto, en la medida permitida por su configuración de privacidad en dichas plataformas.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">2.5 Datos personales sensibles</h3>
                <p>
                  No solicitamos ni tratamos datos personales sensibles (por ejemplo, origen racial o étnico, estado de salud, información genética, creencias religiosas, filosóficas o morales, afiliación sindical, opiniones políticas o preferencia sexual) a través del Sitio. Le pedimos no incluirlos en los campos de texto libre o mensajes. Si llegáramos a requerir alguno, lo solicitaremos con su consentimiento expreso y por escrito, y le informaremos previamente.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Finalidades del tratamiento */}
          <section className="scroll-mt-20 border-t border-gray-100 pt-8" id="seccion-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="text-[#d6b724] font-mono">3.</span> Finalidades del tratamiento
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">3.1 Finalidades primarias (necesarias para la relación con usted)</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Registrarlo en la lista de interés y darle seguimiento a su solicitud de información.</li>
                  <li>Procesar, administrar y confirmar su preventa o apartado del vehículo, incluyendo el cobro del anticipo y el envío de comprobantes.</li>
                  <li>Contactarlo por correo electrónico, teléfono o WhatsApp para dar seguimiento a su preventa, informarle sobre el estatus de producción, fechas estimadas de entrega y cambios relevantes.</li>
                  <li>Elaborar el contrato o documentación de compraventa y gestionar la entrega, facturación y trámites relacionados con el vehículo.</li>
                  <li>Emitir facturas y cumplir obligaciones fiscales, contables y legales.</li>
                  <li>Atender consultas, aclaraciones, solicitudes de cancelación, devoluciones, reclamaciones y servicio al cliente.</li>
                  <li>Verificar su identidad y prevenir fraude, suplantación de identidad, operaciones indebidas y abusos en el uso del Sitio.</li>
                  <li>Garantizar la seguridad, el correcto funcionamiento y el soporte técnico del Sitio.</li>
                  <li>Cumplir con requerimientos de autoridades competentes y con las obligaciones previstas en la legislación aplicable.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">3.2 Finalidades secundarias (no necesarias, pero que nos ayudan a brindarle un mejor servicio)</h3>
                <p className="mb-2">Adicionalmente, y solo si usted no se opone, utilizaremos sus datos para:</p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Enviarle boletines, novedades del producto, invitaciones a eventos, lanzamientos, promociones y publicidad de TT por correo electrónico, WhatsApp, SMS o llamada.</li>
                  <li>Realizar estudios de mercado, encuestas de satisfacción y análisis estadísticos para mejorar nuestros productos, servicios y el Sitio.</li>
                  <li>Elaborar perfiles de interés para personalizar contenidos y comunicaciones.</li>
                  <li>Medir la efectividad de nuestras campañas publicitarias y mostrarle anuncios de TT en otros sitios y plataformas (remarketing).</li>
                </ol>
                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80 text-amber-900 text-xs sm:text-sm">
                  <strong>Cómo negarse a las finalidades secundarias:</strong> al registrarse encontrará una casilla separada, sin marcar por defecto, para autorizar las finalidades secundarias. Si no la marca, o si desea dejar de recibir estas comunicaciones en cualquier momento, puede escribir a <a href="mailto:privacidad@ttautomotriz.com" className="underline font-semibold">privacidad@ttautomotriz.com</a> con el asunto "Oposición a finalidades secundarias", o usar el enlace para cancelar suscripción incluido en nuestros correos. Su negativa no afectará su preventa ni el acceso a los servicios que solicitó.
                  <br className="my-1.5" />
                  También puede inscribirse en el Registro Público para Evitar Publicidad (REPEP) de la Procuraduría Federal del Consumidor (PROFECO) para limitar la publicidad telefónica de proveedores.
                </div>
              </div>
            </div>
          </section>

          {/* 4. Cookies, web beacons y tecnologías de rastreo */}
          <section className="scroll-mt-20 border-t border-gray-100 pt-8" id="seccion-4">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="text-[#d6b724] font-mono">4.</span> Cookies, web beacons y tecnologías de rastreo
            </h2>
            <p className="mb-4">
              El Sitio utiliza cookies (pequeños archivos de texto que se almacenan en su dispositivo), píxeles, web beacons y tecnologías similares que permiten recabar datos de forma automática. Las categorías son:
            </p>

            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-5">
              <table className="min-w-full divide-y divide-gray-200 text-left text-xs sm:text-sm">
                <thead className="bg-gray-100 font-bold text-gray-800">
                  <tr>
                    <th scope="col" className="px-4 py-3">Categoría</th>
                    <th scope="col" className="px-4 py-3">Finalidad</th>
                    <th scope="col" className="px-4 py-3">¿Requiere su consentimiento?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-900">Estrictamente necesarias</td>
                    <td className="px-4 py-3 text-gray-600">Funcionamiento del Sitio, seguridad, sesión, carrito o proceso de preventa, preferencias básicas.</td>
                    <td className="px-4 py-3 text-red-600 font-medium">No</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3 font-semibold text-gray-900">Analíticas</td>
                    <td className="px-4 py-3 text-gray-600">Medir visitas y comportamiento de navegación para mejorar el Sitio (Google Analytics).</td>
                    <td className="px-4 py-3 text-green-700 font-medium">Sí</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-900">Publicitarias y de remarketing</td>
                    <td className="px-4 py-3 text-gray-600">Medir campañas y mostrar anuncios en otras plataformas (Meta Pixel, Google Ads).</td>
                    <td className="px-4 py-3 text-green-700 font-medium">Sí</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-600">
              Al ingresar al Sitio se le mostrará un banner para aceptar, rechazar o configurar las cookies no necesarias. Puede cambiar su decisión en cualquier momento mediante la configuración de su navegador. Si desactiva las cookies estrictamente necesarias, algunas funciones del Sitio, como el proceso de preventa, podrían no funcionar correctamente.
            </p>
          </section>

          {/* 5. Remisiones y transferencias de datos personales */}
          <section className="scroll-mt-20 border-t border-gray-100 pt-8" id="seccion-5">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="text-[#d6b724] font-mono">5.</span> Remisiones y transferencias de datos personales
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">5.1 Proveedores que tratan datos por cuenta de TT (remisiones)</h3>
                <p className="mb-3">
                  Para operar el Sitio y la preventa contratamos proveedores que tratan datos personales por nuestra cuenta y bajo nuestras instrucciones. Estas remisiones no requieren su consentimiento, y dichos proveedores están obligados contractualmente a guardar confidencialidad y a proteger los datos. Incluyen:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-gray-700">
                  <li>Servicios de alojamiento y nube del Sitio.</li>
                  <li>Procesadores de pago autorizados con certificación PCI DSS.</li>
                  <li>Herramientas de correo electrónico, CRM y mensajería (incluido WhatsApp Business).</li>
                  <li>Herramientas de analítica y publicidad digital.</li>
                  <li>Asesores contables, fiscales y legales.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">5.2 Transferencias a terceros</h3>
                <p className="mb-4">
                  No vendemos sus datos personales. Solo los transferimos a terceros en los siguientes casos:
                </p>

                <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
                  <table className="min-w-full divide-y divide-gray-200 text-left text-xs sm:text-sm">
                    <thead className="bg-gray-100 font-bold text-gray-800">
                      <tr>
                        <th scope="col" className="px-4 py-3">Destinatario</th>
                        <th scope="col" className="px-4 py-3">Finalidad</th>
                        <th scope="col" className="px-4 py-3">¿Requiere consentimiento?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-900">Autoridades competentes (fiscales, judiciales, PROFECO)</td>
                        <td className="px-4 py-3 text-gray-600">Cumplir requerimientos y obligaciones legales</td>
                        <td className="px-4 py-3 text-gray-700">No, conforme a la Ley</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="px-4 py-3 font-semibold text-gray-900">Sociedades del mismo grupo corporativo de TT</td>
                        <td className="px-4 py-3 text-gray-600">Operar la preventa y atención al cliente</td>
                        <td className="px-4 py-3 text-gray-700">No, bajo las mismas políticas</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-900">Instituciones financieras o aseguradoras aliadas</td>
                        <td className="px-4 py-3 text-gray-600">Ofrecerle opciones de financiamiento o seguro solicitadas</td>
                        <td className="px-4 py-3 text-green-700 font-medium">Sí, se pedirá por separado</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="px-4 py-3 font-semibold text-gray-900">Distribuidores o centros de entrega y servicio autorizados</td>
                        <td className="px-4 py-3 text-gray-600">Entregar y dar servicio a su vehículo</td>
                        <td className="px-4 py-3 text-gray-700">Sí, salvo que sea indispensable para el contrato</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-900">Autoridades de tránsito, registro vehicular y placas</td>
                        <td className="px-4 py-3 text-gray-600">Trámites del vehículo solicitados</td>
                        <td className="px-4 py-3 text-gray-700">Sí, salvo que sea necesario para el contrato</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm">
                  Si usted no desea que sus datos se transfieran en los casos que requieren consentimiento, puede manifestarlo escribiendo a <a href="mailto:privacidad@ttautomotriz.com" className="text-blue-600 underline">privacidad@ttautomotriz.com</a>.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Medidas de seguridad */}
          <section className="scroll-mt-20 border-t border-gray-100 pt-8" id="seccion-6">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="text-[#d6b724] font-mono">6.</span> Medidas de seguridad
            </h2>
            <p>
              Protegemos sus datos personales con medidas de seguridad administrativas, técnicas y físicas para evitar su daño, pérdida, alteración, destrucción, uso, acceso o tratamiento no autorizado. Entre ellas: cifrado en la transmisión de datos mediante protocolo HTTPS/TLS, control de accesos por roles y contraseñas, autenticación reforzada para el personal con acceso, respaldos, confidencialidad contractual con el personal y los proveedores, y revisión periódica de nuestras prácticas de seguridad.
            </p>
            <p className="mt-3 text-gray-600">
              Ninguna transmisión por internet es completamente segura. Le recomendamos proteger sus credenciales y dispositivos. En caso de una vulneración de seguridad que afecte de forma significativa sus derechos patrimoniales o morales, se lo notificaremos sin dilación.
            </p>
          </section>

          {/* 7. Conservación y supresión de datos */}
          <section className="scroll-mt-20 border-t border-gray-100 pt-8" id="seccion-7">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="text-[#d6b724] font-mono">7.</span> Conservación y supresión de datos
            </h2>
            <p className="mb-3">
              Conservamos sus datos únicamente durante el tiempo necesario para cumplir las finalidades de este Aviso y las obligaciones legales aplicables:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Datos de contacto de la lista de interés:</strong> hasta que usted solicite su cancelación o hasta 24 meses sin interacción.</li>
              <li><strong>Datos de preventa, contrato y facturación:</strong> durante la vigencia de la relación y, posteriormente, el plazo que exijan las disposiciones fiscales, mercantiles y de protección al consumidor (cinco años de forma general).</li>
              <li><strong>Datos para finalidades secundarias:</strong> hasta que usted revoque su consentimiento o se oponga.</li>
              <li><strong>Datos de navegación y cookies:</strong> conforme a la vigencia de cada cookie, que no excede de 13 meses.</li>
            </ul>
          </section>

          {/* 8. Derechos ARCO */}
          <section className="scroll-mt-20 border-t border-gray-100 pt-8" id="seccion-8">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="text-[#d6b724] font-mono">8.</span> Derechos ARCO
            </h2>
            <p className="mb-4">
              Usted tiene derecho a:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/70">
                <h4 className="font-bold text-navy-900 mb-1">Acceso</h4>
                <p className="text-xs sm:text-sm text-gray-600">Conocer qué datos personales tenemos de usted, para qué los usamos y las condiciones del tratamiento.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/70">
                <h4 className="font-bold text-navy-900 mb-1">Rectificación</h4>
                <p className="text-xs sm:text-sm text-gray-600">Solicitar la corrección de sus datos cuando sean inexactos o estén incompletos.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/70">
                <h4 className="font-bold text-navy-900 mb-1">Cancelación</h4>
                <p className="text-xs sm:text-sm text-gray-600">Solicitar que eliminemos sus datos de nuestros registros y bases de datos una vez concluido el periodo de bloqueo legal.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/70">
                <h4 className="font-bold text-navy-900 mb-1">Oposición</h4>
                <p className="text-xs sm:text-sm text-gray-600">Oponerse al tratamiento de sus datos para fines específicos, incluidas las finalidades secundarias.</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-4">
              <h3 className="font-bold text-gray-900 text-base">Cómo ejercerlos</h3>
              <p>
                Envíe su solicitud al correo <a href="mailto:privacidad@ttautomotriz.com" className="text-blue-600 underline font-semibold">privacidad@ttautomotriz.com</a> o por escrito a nuestro domicilio señalado en la sección 1, a la atención del Departamento de Privacidad. La solicitud debe contener:
              </p>
              <ol className="list-decimal pl-6 space-y-1.5 text-xs sm:text-sm text-gray-700">
                <li>Su nombre completo y un medio para comunicarle la respuesta (correo electrónico o domicilio).</li>
                <li>Copia de una identificación oficial vigente (INE, pasaporte u otra) o acreditación de representación legal.</li>
                <li>La descripción clara y precisa de los datos respecto de los cuales busca ejercer alguno de los derechos.</li>
                <li>Cualquier elemento que facilite la localización de sus datos.</li>
                <li>Para rectificación, las modificaciones a realizar y la documentación soporte.</li>
              </ol>

              <h3 className="font-bold text-gray-900 text-base pt-2">Plazos y costos</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Le daremos respuesta en un máximo de <strong>20 días hábiles</strong> contados desde su recepción. Si resulta procedente, se hará efectiva dentro de los <strong>15 días hábiles</strong> siguientes. El ejercicio de sus derechos es gratuito.
              </p>
            </div>
          </section>

          {/* 9. Revocación del consentimiento y limitación */}
          <section className="scroll-mt-20 border-t border-gray-100 pt-8" id="seccion-9">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="text-[#d6b724] font-mono">9.</span> Revocación del consentimiento y limitación del uso o divulgación
            </h2>
            <p>
              Usted puede revocar en cualquier momento el consentimiento que nos haya otorgado enviando una solicitud a <a href="mailto:privacidad@ttautomotriz.com" className="text-blue-600 underline font-semibold">privacidad@ttautomotriz.com</a>. Para limitar el uso o divulgación de sus datos puede: (a) cancelar su suscripción mediante el enlace incluido en nuestros correos; (b) responder "BAJA" a nuestros mensajes de WhatsApp o SMS; (c) escribir a nuestro correo de privacidad; o (d) inscribirse en el REPEP de PROFECO.
            </p>
          </section>

          {/* 10. Menores de edad */}
          <section className="scroll-mt-20 border-t border-gray-100 pt-8" id="seccion-10">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="text-[#d6b724] font-mono">10.</span> Menores de edad
            </h2>
            <p>
              El Sitio y la preventa están dirigidos exclusivamente a personas mayores de 18 años con capacidad legal para contratar. No recabamos intencionalmente datos de menores de edad. Si usted considera que un menor nos ha proporcionado datos personales, contáctenos en <a href="mailto:privacidad@ttautomotriz.com" className="text-blue-600 underline font-semibold">privacidad@ttautomotriz.com</a> para eliminarlos.
            </p>
          </section>

          {/* 11. Consentimiento para datos financieros o patrimoniales */}
          <section className="scroll-mt-20 border-t border-gray-100 pt-8" id="seccion-11">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="text-[#d6b724] font-mono">11.</span> Consentimiento para datos financieros o patrimoniales
            </h2>
            <p>
              Al realizar el pago de su apartado o anticipo en el Sitio se le solicitará, mediante una casilla separada y sin marcar de antemano, su consentimiento expreso para el tratamiento de sus datos financieros o patrimoniales conforme a este Aviso. Sin este consentimiento no será posible procesar el pago ni concluir la preventa a través del Sitio.
            </p>
          </section>

          {/* 12. Decisiones automatizadas */}
          <section className="scroll-mt-20 border-t border-gray-100 pt-8" id="seccion-12">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="text-[#d6b724] font-mono">12.</span> Decisiones automatizadas
            </h2>
            <p>
              TT Automotriz no toma decisiones que produzcan efectos jurídicos sobre usted ni lo afecten de manera significativa basadas únicamente en tratamientos automatizados de sus datos personales.
            </p>
          </section>

          {/* 13. Autoridad en materia de protección de datos */}
          <section className="scroll-mt-20 border-t border-gray-100 pt-8" id="seccion-13">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="text-[#d6b724] font-mono">13.</span> Autoridad en materia de protección de datos personales
            </h2>
            <p>
              Si considera que su derecho a la protección de datos personales ha sido vulnerado o que no hemos atendido adecuadamente su solicitud, puede acudir ante la autoridad competente en materia de protección de datos personales en posesión de particulares en México, actualmente la Secretaría Anticorrupción y Buen Gobierno o el organismo garante que en su momento resulte competente conforme a la legislación vigente.
            </p>
          </section>

          {/* 14. Cambios al Aviso de Privacidad */}
          <section className="scroll-mt-20 border-t border-gray-100 pt-8 pb-12" id="seccion-14">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="text-[#d6b724] font-mono">14.</span> Cambios al Aviso de Privacidad
            </h2>
            <p>
              Este Aviso puede modificarse por cambios legales, nuevas funcionalidades del Sitio o ajustes en nuestras prácticas. Cualquier cambio se publicará en esta misma página con la fecha de actualización y, cuando afecte de manera relevante sus derechos o las finalidades, se lo informaremos por correo electrónico o mediante un aviso visible en el Sitio.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
