import { Router } from "../deps.ts";
import { Auth } from "../models/auth.ts"; 

// RUTAS, Ruta que permite el login desde el frontend
const AuthRouter = new Router();  
export default AuthRouter         // Asignación "(Nombre ruta, Método ruta)"
    .post("/auth", Auth.login())  // Asigna /auth al método login del objeto Auth