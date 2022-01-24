// deno-lint-ignore-file no-explicit-any
import { RouterContext } from "../../_dependencies/oak.ts";

export function checkValue(ctx:RouterContext, value:any) {
    if (typeof value != typeof JSON) ctx.throw(400, "Bad format: request body is not JSON");
    if (!value.user) ctx.throw(400, "Bad Request: username is missing");
    if (!value.passwd) ctx.throw(400, "Bad Request: password is missing");
  }
  
export function checkUser(ctx:RouterContext, entry:any) {
    if (!entry) ctx.throw(422, "Invalid input: No match that username");
    if (entry instanceof Error) {
        console.log(entry)
        ctx.throw(422, `Mongo Error: ${
        JSON.parse(CJSON.fixStringFormat("{"+entry.message+"}")).MongoError.errmsg
        }`);
    }
}

export const CJSON = {
    fixStringFormat(message:string) {
        return message
        .replace(/:\s*"([^"]*)"/g, (_, p1) => ': "' + p1.replace(/:/g, '@colon@') + '"') // Replace ":" with "@colon@" if it's between double-quotes
        .replace(/:\s*'([^']*)'/g, (_, p1) => ': "' + p1.replace(/:/g, '@colon@') + '"') // Replace ":" with "@colon@" if it's between single-quotes
        .replace(/(['"])?([a-z0-9A-Z$_]+)(['"])?\s*:/g, '"$2": ') // Add double-quotes around any tokens before the remaining ":"
        .replace(/@colon@/g, ':') // Turn "@colon@" back into ":"
    }
}