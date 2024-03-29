import { Application, oakCors } from "../_dependencies/oak.ts"; const app = new Application();
import { indexRoutes } from "./components/routes/_root.router.ts";
//import { authorized } from "./authorized.ts";

// ————————————————————————————————————————————————— DATOS DEL SERVIDOR
console.log(`\n`);
const t0 = performance.now();  
const projectName = `deno-api-rest`;
const versioning = `0.1.0`;                          // marca de tiempo inicial
const env = Deno.env.toObject();                     // Obtenemos objeto variables de entorno
const HOST = '0.0.0.0' || env.HOST;                  // IP del servidor
const PORT = 8081 || Number(env.PORT) ;              // Puerto


// ————————————————————————————————————————————————— MIDDLEWARES
console.log(`> ${projectName}@${versioning} applying middlewares`);
app.use(oakCors());


// ————————————————————————————————————————————————— RUTAS 
console.log(`> ${projectName}@${versioning} adding routes`);
indexRoutes(app);

// ————————————————————————————————————————————————— STARTING THE SERVER
var t1 = performance.now();                          // marca de tiempo final

console.log('\n\x1b[42m\x1b[30m',' DONE ','\x1b[0m\x1b[32m', ` Success starting the server ${(t1-t0).toFixed(4)}ms\n`,'\x1b[0m');
console.log('  🦕 Server running at:');
console.log(`  - Local:`, '\x1b[33m',`\thttp://localhost:${PORT}`,'\x1b[0m');
console.log(`  - Network:`, '\x1b[33m',`\thttp://${HOST}:${PORT}`,'\x1b[0m');
console.log("\n");

await app.listen({ port: PORT, hostname: HOST });