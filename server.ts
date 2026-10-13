import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: path.join(process.cwd(), 'TT-WEB-1.1-main', '.env') });
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Inicialización de Supabase en el backend con limpieza de URL para evitar ENOTFOUND
const getCleanUrl = (rawUrl: string): string => {
  if (!rawUrl) return "";
  try {
    let urlStr = rawUrl.trim().replace(/^["']|["']$/g, "");
    if (!urlStr) return "";
    if (!/^https?:\/\//i.test(urlStr)) {
      urlStr = `https://${urlStr}`;
    }
    const parsed = new URL(urlStr);
    let host = parsed.host;
    
    const supabaseCoIndex = host.indexOf('.supabase.co');
    if (supabaseCoIndex !== -1) {
      host = host.substring(0, supabaseCoIndex + '.supabase.co'.length);
    }
    return `${parsed.protocol}//${host}`;
  } catch {
    let urlStr = rawUrl.trim().replace(/^["']|["']$/g, "");
    const supabaseCoIndex = urlStr.indexOf('.supabase.co');
    if (supabaseCoIndex !== -1) {
      urlStr = urlStr.substring(0, supabaseCoIndex + '.supabase.co'.length);
    }
    if (!/^https?:\/\//i.test(urlStr)) {
      urlStr = `https://${urlStr}`;
    }
    return urlStr;
  }
};

const supabaseUrlRaw = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseUrl = getCleanUrl(supabaseUrlRaw);
// Usamos el Service Role Key si existe para saltar RLS en el backend, si no, usamos el Anon Key normal.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

const supabase = createClient(
  supabaseUrl || "https://placeholder-not-configured.supabase.co", 
  supabaseKey || "placeholder-key"
);

// Helper para evitar que las llamadas a Supabase se queden colgadas (timeout de 8 segundos)
const promiseWithTimeout = async (promiseOrThenable: PromiseLike<any>, ms: number, errorMsg: string): Promise<any> => {
  return Promise.race([
    Promise.resolve(promiseOrThenable),
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error(errorMsg)), ms))
  ]);
};

// API endpoint para evitar CORS / iframe "Failed to fetch" en el navegador
app.post('/api/proveedores', async (req, res) => {
  try {
    const { nombre, empresa, telefono, correo, tipo_colaboracion, estado, mensaje } = req.body;
    console.log('Recibida petición de proveedor en el servidor:', { nombre, empresa, correo });
    
    const record = {
      nombre,
      empresa,
      telefono,
      correo,
      tipo_colaboracion,
      estado,
      mensaje
    };

    console.log('Intentando guardar en la tabla "proveedores"...');
    const insertPromise = supabase
      .from('proveedores')
      .insert([record]);

    const result = await promiseWithTimeout(
      insertPromise,
      8000,
      'Tiempo de espera agotado al conectar con Supabase (tabla proveedores)'
    );

    if (result.error) {
      console.error('Error de Supabase al insertar en proveedores:', result.error);
      return res.status(400).json({ 
        success: false, 
        message: result.error.message, 
        details: result.error.details,
        hint: result.error.hint
      });
    }

    console.log('Inserción exitosa en la tabla proveedores!');
    return res.json({ success: true });
  } catch (err: any) {
    console.error('Error crítico en /api/proveedores:', err);
    return res.status(500).json({ 
      success: false, 
      message: err.message || 'Error interno del servidor' 
    });
  }
});

// API endpoint para postulaciones / candidatos "Únete al equipo"
app.post('/api/candidatos', async (req, res) => {
  try {
    const { nombre, educacion, telefono, correo, area_interes, experiencia } = req.body;
    console.log('Recibida petición de candidato en el servidor:', { nombre, correo, area_interes });
    
    const record = {
      nombre,
      educacion,
      telefono,
      correo,
      area_interes,
      experiencia
    };

    console.log('Intentando guardar en la tabla "candidatos"...');
    const insertPromise = supabase
      .from('candidatos')
      .insert([record]);

    const result = await promiseWithTimeout(
      insertPromise,
      8000,
      'Tiempo de espera agotado al conectar con Supabase (tabla candidatos)'
    );

    if (result.error) {
      console.error('Error de Supabase al insertar en candidatos:', result.error);
      return res.status(400).json({ 
        success: false, 
        message: result.error.message, 
        details: result.error.details,
        hint: result.error.hint
      });
    }

    console.log('Inserción exitosa en la tabla candidatos!');
    return res.json({ success: true });
  } catch (err: any) {
    console.error('Error crítico en /api/candidatos:', err);
    return res.status(500).json({ 
      success: false, 
      message: err.message || 'Error interno del servidor' 
    });
  }
});

// API endpoint para solicitudes de inversión "Invierte en TT"
app.post('/api/inversionistas', async (req, res) => {
  try {
    const { nombre, correo, telefono, empresa, monto_inversion, perfil, mensaje } = req.body;
    console.log('Recibida petición de inversionista en el servidor:', { nombre, correo, monto_inversion, perfil });
    
    const record = {
      nombre,
      correo,
      telefono,
      empresa,
      monto_inversion,
      perfil,
      mensaje
    };

    console.log('Intentando guardar en la tabla "inversionistas"...');
    const insertPromise = supabase
      .from('inversionistas')
      .insert([record]);

    const result = await promiseWithTimeout(
      insertPromise,
      8000,
      'Tiempo de espera agotado al conectar con Supabase (tabla inversionistas)'
    );

    if (result.error) {
      console.error('Error de Supabase al insertar en inversionistas:', result.error);
      return res.status(400).json({ 
        success: false, 
        message: result.error.message, 
        details: result.error.details,
        hint: result.error.hint
      });
    }

    console.log('Inserción exitosa en la tabla inversionistas!');
    return res.json({ success: true });
  } catch (err: any) {
    console.error('Error crítico en /api/inversionistas:', err);
    return res.status(500).json({ 
      success: false, 
      message: err.message || 'Error interno del servidor' 
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      root: process.cwd(),
      server: { 
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
