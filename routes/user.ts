import { Router } from "https://deno.land/x/oak/mod.ts"; 
import UserClass from '../models/user.ts';               

const 
    user = new UserClass(), 
    UserRouter = new Router({prefix: '/user'});

// RUTAS
export default UserRouter // CRUD
    .post('/create',       user.addUser())  
    .get('/all',          user.getAllUsers())  
    .get('/read:user',      user.getUser())    
    .put('/update:user',   user.updateUser())    
    .delete('/delete:user', user.deleteUser())    