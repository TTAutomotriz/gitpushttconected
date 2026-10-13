import { createClient } from "@supabase/supabase-js";

// Safe check for browser/server environments to retrieve variables without crashing
const getEnvVar = (name: string): string | undefined => {
  if (typeof window !== "undefined") {
    const metaEnv = (import.meta as any).env || {};
    return (
      metaEnv[`VITE_${name}`] ||
      metaEnv[`NEXT_PUBLIC_${name}`] ||
      metaEnv[name]
    );
  }
  if (typeof process !== "undefined" && process.env) {
    return process.env[name] || process.env[`VITE_${name}`] || process.env[`NEXT_PUBLIC_${name}`];
  }
  return undefined;
};

const supabaseUrl = getEnvVar("SUPABASE_URL") || "";
const supabaseAnonKey = getEnvVar("SUPABASE_ANON_KEY") || getEnvVar("SUPABASE_PUBLISHABLE_KEY") || "";

// Safe URL validator/cleaner
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

const cleanUrl = getCleanUrl(supabaseUrl);

export const supabase = createClient(
  cleanUrl || "https://placeholder-not-configured.supabase.co", 
  supabaseAnonKey || "placeholder-key"
);
