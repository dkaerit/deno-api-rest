// deno-lint-ignore-file no-explicit-any
import { RouterContext } from "../../../_dependencies/oak.ts";
import { Query } from "../../../database/queries/mongo.queries.ts";
import { UserCollection } from "../models/user.model.ts"
import { JwtHelper } from "../../helpers/jwt.helper.ts";

// La responsabilidad de los controllers es la de extraer los datos del Context y pasarlos los service

export class AuthController {
    
    /**
     * 
     * @returns 
     */

    public static login() {
        return async (ctx: RouterContext) => {
            if (!ctx.request.hasBody) ctx.throw(400, "Bad Request: body is missing");
            
            const value = await ctx.request.body().value; // {user, passwd}
            checkValue(ctx, value); 
            checkUser(ctx, await Query.findByFilters(value, UserCollection));
            
            ctx.response.body = await JwtHelper.generateToken(value.user, 24); // Genera el token desde el server jwt
            ctx.response.status = 200;
        }
    }
}


function checkValue(ctx:RouterContext, value:any) {
    if (typeof value != typeof JSON) ctx.throw(400, "Bad format: request body is not JSON");
    if (!value.user) ctx.throw(400, "Bad Request: username is missing");
    if (!value.passwd) ctx.throw(400, "Bad Request: password is missing");
  }
  
function checkUser(ctx:RouterContext, entry:any) {
    if (!entry) ctx.throw(422, "Invalid input: No match that username");
}