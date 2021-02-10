/* -- Entrantes -- */
import "https://deno.land/x/dotenv@v2.0.0/load.ts";
import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts"; const env = config();

/* -- Salientes -- */
export { env }
export { Application, Router } from "https://deno.land/x/oak@v6.5.0/mod.ts";
export type { RouterContext, Context } from "https://deno.land/x/oak@v6.5.0/mod.ts";
export { getQuery } from "https://deno.land/x/oak@v6.5.0/helpers.ts";

// BASES DE DATOS
export { Collection } from "https://deno.land/x/mongo@v0.21.0/src/collection/collection.ts";
export { Bson, MongoClient } from "https://deno.land/x/mongo@v0.21.0/mod.ts";
export { Client as Mysql }  from "https://deno.land/x/mysql@v2.7.0/mod.ts";

// Seguridad: Encriptaciçon, autenticación...
export * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts"; 
export {
  create,
  decode,
  getNumericDate,
  verify,
} from "https://deno.land/x/djwt@v2.1/mod.ts";

// Middlewares
//export { organ } from "https://raw.githubusercontent.com/denjucks/organ/master/mod.ts";
//export { oakCors } from "https://deno.land/x/cors/mod.ts";