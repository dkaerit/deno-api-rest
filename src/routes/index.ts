import { Router } from "../deps.ts";
import { RouterContext } from "../deps.ts";

const IndexRouter = new Router();

// RUTAS
export default IndexRouter 
    .get('/', version())    

// CONTROLADORES
function version() {
    return async (ctx: RouterContext) => {
        ctx.response.body = "STACK DVOM V. 0.1.0";
    }
} 