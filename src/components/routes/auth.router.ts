import { Router } from "../../../_dependencies/oak.ts";
import { AuthController } from "../controllers/auth.controller.ts"; 

// RUTAS, Ruta que permite el login desde el frontend
const AuthRouter = new Router();  
export default AuthRouter         // Asignación "(Nombre ruta, Método ruta)"
    .post("/auth", AuthController.login())  // Asigna /auth al método login del objeto Auth