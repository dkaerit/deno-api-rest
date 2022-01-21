// deno-lint-ignore-file no-explicit-any
import { RouterContext, create, getNumericDate, Header } from "../deps.ts";
import db, { Query } from "../database/mongodb.ts";
import type { UserSchema } from "./user.ts"

const collection = db.collection<UserSchema>("users");
export interface Payload {
    [key: string]: unknown;
    exp: number;
  }

export const Auth = {
    login() {
      return async (ctx: RouterContext) => {
        if (!ctx.request.hasBody) ctx.throw(400, "Bad Request: body is missing");
        const value = getValue(ctx, await ctx.request.body().value);  // {user, passwd}
        checkUser(ctx, await Query.findByFilters(value,collection));
        
        const {header,payload,secret} = makeEssentials(value.user) // Hacer los Essentials (valores necesarios para jwt)
        ctx.response.body = { token: await create(header, payload, secret) }; // Genera el token desde el server jwt
        ctx.response.status = 200;
      }
    }
}

// ————————————————————————————————————————————————— AUXILIARES
function makeEssentials(user:string) {
  const header = { alg: "HS512", typ: "JWT" } as Header;
  const expiry = getNumericDate(60*60*24); // 24 horas
  const payload = { user, exp } as Payload;
  const secret = Deno.env.get("TOKEN_SECRET") as string // Obtener el secreto en "env"
  return {header,payload,secret}
}

function getValue(ctx:RouterContext, value:any) {
  if(typeof value != typeof JSON) ctx.throw(400, "Bad format: request is not JSON");
  if (!value.user) ctx.throw(400, "Bad Request: username is missing");
  if (!value.passwd) ctx.throw(400, "Bad Request: password is missing");
  return value;
}

function checkUser(ctx:RouterContext, entry:any) {
  if(!entry) ctx.throw(422, "Invalid input: No match that username");
}
