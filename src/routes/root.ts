import { Router, RouterContext } from "../deps.ts";
// ---- Ruta raíz ----

// RUTAS
const RootRouter = new Router();
export default RootRouter 
    .get('/', version())    

// CONTROLADORES
function version() {
    return (ctx: RouterContext) => {
        ctx.response.body = `
              𝗦𝗲𝗿𝘃𝗲𝗿 𝗿𝘂𝗻𝗻𝗶𝗻𝗴 𝗼𝗻 🦕
        
              Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.
              -  Secure by default. No file, network, or environment access, unless explicitly enabled.
              -  Supports TypeScript out of the box
              -  Ships only a single executable file.
              -  Has built-in utilities like a dependency inspector (deno info) and a code formatter (deno fmt).
              -  Has a set of reviewed (audited) standard modules that are guaranteed to work with Deno: deno.land/std`;
    }
} 