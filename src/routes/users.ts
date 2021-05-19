import { Router } from "../deps.ts";
import { User } from "../models/user.ts"; 

// RUTAS
const UserRouter = new Router({prefix: '/users'});
export default UserRouter 
    .post("/create", User.addUser())
    .get("/all", User.getAllUsers())
    .get("/user:user", User.getUser())
    .put('/update:user',   User.updateUser())    
    .delete('/delete:user', User.deleteUser()) 
