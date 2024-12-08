import { config } from "https://deno.land/x/dotenv/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Cargar variables de entorno
const env = config();

const supabaseUrl = env["SUPABASE_URL"];
const supabaseKey = env["SUPABASE_KEY"];

// Inicializar cliente
export const supabase = createClient(supabaseUrl, supabaseKey);