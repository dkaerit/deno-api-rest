import { Router } from "https://deno.land/x/oak/mod.ts"; 

const IndexRouter = new Router();

// RUTAS
export default IndexRouter 
    .get('/', version())    

// CONTROLADORES
function version() {
    return async ({response}: {response: any}) => {
        response.body = "STACK DVOM V. 0.1.0";
    }
} 