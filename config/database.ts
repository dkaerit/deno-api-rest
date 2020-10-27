/*mongoose*/    import { MongoClient } from "https://deno.land/x/mongo/mod.ts";
/*dotenv*/      import { config } from "https://deno.land/x/dotenv/mod.ts";

const 
    env = config(), 
    client = new MongoClient(),
    uri = `mongodb+srv://${env.DB_USER}:${env.DB_PASSWD}@${env.CLUSTER_NAME}.z2cjr.azure.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`;       

await client.connectWithUri(uri)                // Conectamos a la sesión con URI            
const db = await client.database(env.DB_NAME);  // Almacenar la base de datos de mongo
export default db;                              // Exportar la base de datos para su uso externo