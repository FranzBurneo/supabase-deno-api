import { serve } from "https://deno.land/std/http/server.ts";
import { supabase } from "./supabaseClient.ts";

const PORT = 8000;

// Crear servidor HTTP
const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const method = req.method;

  if (pathname === "/posts" && method === "GET") {
    // Obtener publicaciones
    const { data, error } = await supabase.from("posts").select("*");

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (pathname === "/posts" && method === "POST") {
    // Crear nueva publicación
    const body = await req.json();
    const { title, content } = body;

    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content }]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Not Found", { status: 404 });
};

// Iniciar el servidor
console.log(`Listening on http://localhost:${PORT}`);
serve(handler, { port: PORT });
