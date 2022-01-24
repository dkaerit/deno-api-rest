import type { Application } from "../../../_dependencies/oak.ts";

export const indexRoutes = async (app: Application) => {
    [   // Incluír rutas
        await import('./_version.router.ts').then(module => module.default),
        await import('./users.router.ts').then(module => module.default),
        await import('./auth.router.ts').then(module => module.default)
    ].map(route => {                     // por cada ruta:
        app.use(route.routes());         // Usar las rutas creadas 
        app.use(route.allowedMethods()); // POST, DELETE, GET, PUT
    });
};