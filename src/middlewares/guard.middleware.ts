import { Context } from "../../_dependencies/oak.ts";
import { verify } from "../../_dependencies/djwt.ts";
import { JwtHelper } from "../helpers/jwt.helper.ts";

export const guard = async (ctx: Context, next: () => Promise<void>) => {
  const secret = Deno.env.get("TOKEN_SECRET") as string;  // Obtener el secreto en 'env'

  try {
    const jwt = JwtHelper.getToken(ctx.request.headers);  // obtener el token dado en el header desde el frontend
    if (!jwt) throw new Error("!jwt");                    // assert, token generado satisfactoriamente

    const payload = await verify(jwt, secret, "HS512");   // verificar el token jwt basado en codificación HS512
    if (!payload) throw new Error("!payload");            // assert, token válido
    await next();                                         // next() permite la espera de ejecuciones asíncronas

  } 
  catch (err) {
    console.error(err);
    ctx.throw(401, "Guard: You aren't authorized to access this route");
  }
}