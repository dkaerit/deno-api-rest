import { Context } from "../../_dependencies/oak.ts";
import { verify } from "../../_dependencies/djwt.ts";
import { JwtHelper } from "../helpers/jwt.helper.ts";



  /**
   * @brief Comprobar que una petición http trae en sus headers la autorización con el token
   * @param ctx { request, response, ... }
   */

export const guard = async (ctx: Context, next: () => Promise<void>) => {
  try {
    // ej. "Bearer l$dasXldkVñdlañd..."
    const auth = ctx.request.headers.get("Authorization"); 
    if (!auth) throw new Error("Headers without Authorization");

    // ["Beaarer", "l$dasXldkVñdlañd..."]
    const [method, token] = auth? auth.split(" "): [null, null]; 
    if (method !== "Bearer") throw new Error(`"${method}" is wrong method`); 
    if (!token)              throw new Error("missing json web token"); 
    
    await next(); // next() permite la espera de ejecuciones asíncronas
  } 
  catch (err) {
    console.error(err);
    ctx.throw(401, err.message);
  }
}