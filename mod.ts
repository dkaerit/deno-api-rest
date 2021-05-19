import { Application } from "./src/deps.ts"; const app = new Application();
//import { authorized } from "./authorized.ts";

// ————————————————————————————————————————————————— DATOS DEL SERVIDOR
const env = Deno.env.toObject();                     // Obtenemos objeto variables de entorno
const HOST = '127.0.0.1' || env.HOST;                // IP del servidor
const PORT = 8081 || Number(env.PORT) ;              // Puerto


// ————————————————————————————————————————————————— MIDDLEWARES
//app.use(organ());
//app.use(oakCors());


// ————————————————————————————————————————————————— RUTAS 
import RootRouter from './src/routes/root.ts';
import UserRouter from './src/routes/users.ts';

[                                                    // Incluír rutas
    RootRouter,
    UserRouter
].map(route => {                                     // por cada ruta:
    app.use(route.routes());                         // Usar las rutas creadas 
    app.use(route.allowedMethods());                 // POST, DELETE, GET
});


// ————————————————————————————————————————————————— STARTING THE SERVER
console.log(` 🦕 Escuchando en http://${HOST}:${PORT}`);
await app.listen({ port: PORT, hostname: HOST });