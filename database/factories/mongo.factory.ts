import { MongoClient } from "../../_dependencies/mongo.ts";

/** 
 * @title Mongo Client (client)
 * @brief Conexión a la base de datos de mongo 
 * @var client - instancia de MongoClient con la configuración (cluster, dbname, buildInfo)
 */

const client = new MongoClient();
await client.connect({
  db: Deno.env.get("DB_NAME") as string,
  tls: true,
  servers: [{
      host: Deno.env.get("DB_HOST") as string,
      port: 27017,
    }],
  credential: {
    username: Deno.env.get("DB_USERNAME") as string,
    password: Deno.env.get("DB_PASSWORD") as string,
    db: Deno.env.get("DB_NAME") as string,
    mechanism: "SCRAM-SHA-1",
  },
});

/** 
 * @title Base de datos
 * @brief Instancia de la base de datos personal
 * @var db - instancia de Database
 */

const db = client.database(Deno.env.get("DB_NAME") as string);
export default db;
