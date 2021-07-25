import { Application, oakCors } from "./src/deps.ts"; const app = new Application();
//import { authorized } from "./authorized.ts";

// ————————————————————————————————————————————————— DATOS DEL SERVIDOR
console.log(`\n`);
const t0 = performance.now();                        // marca de tiempo inicial
const projectName = `deno-api-rest`;
const versioning = `0.1.0`;
const env = Deno.env.toObject();                     // Obtenemos objeto variables de entorno
const HOST = '0.0.0.0' || env.HOST;                  // IP del servidor
const PORT = 8081 || Number(env.PORT) ;              // Puerto


// ————————————————————————————————————————————————— MIDDLEWARES
console.log(`> ${projectName}@${versioning} applying middlewares`);
app.use(oakCors());


// ————————————————————————————————————————————————— RUTAS 
console.log(`> ${projectName}@${versioning} adding routes`);
[                                                    // Incluír rutas
    await import('./src/routes/root.ts').then(module => module.default),
    await import('./src/routes/users.ts').then(module => module.default),
    await import('./src/routes/auth.ts').then(module => module.default)
].map(route => {                                     // por cada ruta:
    app.use(route.routes());                         // Usar las rutas creadas 
    app.use(route.allowedMethods());                 // POST, DELETE, GET, PUT
});


// ————————————————————————————————————————————————— STARTING THE SERVER
var t1 = performance.now();                          // marca de tiempo final

console.log('\n\x1b[42m\x1b[30m',' DONE ','\x1b[0m\x1b[32m', ` Success starting the server ${(t1-t0).toFixed(4)}ms\n`,'\x1b[0m');
console.log('  🦕 Server running at:');
console.log(`  - Local:`, '\x1b[33m',`\thttp://localhost:${PORT}`,'\x1b[0m');
console.log(`  - Network:`, '\x1b[33m',`\thttp://${HOST}:${PORT}`,'\x1b[0m');
console.log("\n");

await app.listen({ port: PORT, hostname: HOST });