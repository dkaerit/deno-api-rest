import { Router } from "../deps.ts";
import { User } from "../models/user.ts"; 
import { guard } from "../middlewares/guard.ts"; 

// RUTAS
const UserRouter = new Router({prefix: '/users'});
export default UserRouter                              // Rutas referidas al modelo Usuario
    .post("/create", User.addUser())                   // "/create"    → addUser()
    .get("/all", guard, User.getAllUsers())            // "/all"       → getAllUsers()
    .get("/user:user", guard, User.getUser())          // "/user:id"   → getUser()
    .put('/update:user', guard, User.updateUser())     // "/update:id" → updateUser()
    .delete('/delete:user', guard, User.deleteUser())  // "/delete:id" → deleteUser()
