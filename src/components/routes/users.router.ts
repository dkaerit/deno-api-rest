import { Router } from "../../../_dependencies/oak.ts";
import { UserController } from "../controllers/user.controller.ts"; 
import { guard } from "../../middlewares/guard.middleware.ts"; // Permite la protección de la ruta si no se dispone del token

// RUTAS
const UserRouter = new Router({prefix: '/users'});
export default UserRouter                                        // Rutas referidas al modelo "Usuario"
    .post("/create", UserController.addUser())                   // "/create"            → addUser()
    .get("/all", guard, UserController.getAllUsers())            // "/all"       ~guard~ → getAllUsers()
    .get("/user:user", guard, UserController.getUser())          // "/user:id"   ~guard~ → getUser()
    .put('/update:user', guard, UserController.updateUser())     // "/update:id" ~guard~ → updateUser()
    .delete('/delete:user', guard, UserController.deleteUser())  // "/delete:id" ~guard~ → deleteUser()
