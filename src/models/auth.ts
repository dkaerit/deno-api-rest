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
        const value = await ctx.request.body().value;

        if(typeof value != typeof JSON) ctx.throw(400, "Bad format: request is not JSON");
        if (!value.user) ctx.throw(400, "Bad Request: username is missing");
        if (!value.passwd) ctx.throw(400, "Bad Request: password is missing");

        const entry = await Query.findByFilters(value,collection);
        if(!entry) ctx.throw(422, "Invalid input: No match that username");
        
        const {header,payload} = makeEssentials(value.user)
        const secret = Deno.env.get("TOKEN_SECRET") as string
        ctx.response.body = { token: await create(header, payload, secret) };
        ctx.response.status = 200;
      }
    }
}

// ————————————————————————————————————————————————— AUXILIARES
function makeEssentials(user:string) {
  const exp = getNumericDate(60*60*24); // 24 horas
  const header = { alg: "HS512", typ: "JWT" } as Header;
  const payload = { user, exp } as Payload;
  return {header,payload}
}