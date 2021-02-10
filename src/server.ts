import { 
    Application
} from "./deps.ts"; const app = new Application();


// DATOS DEL SERVIDOR
const env = Deno.env.toObject();      // Obtenemos objeto variables de entorno
const HOST = env.HOST || '0.0.0.0';   // IP del servidor
const PORT = env.PORT || 8081;        // Puerto



// MIDDLEWARES
//app.use(organ());
//app.use(oakCors());



// RUTAS 
import IndexRouter from './routes/index.ts';
//import UserRouter from './routes/user.ts';

[ 
IndexRouter
//UserRouter
].map(route => {
    app.use(route.routes());         // Usar las rutas creadas 
    app.use(route.allowedMethods());
});

// STARTING THE SERVER
console.log(`Escuchando en http://127.0.0.1:${PORT}`)
await app.listen(`${HOST}:${PORT}`);