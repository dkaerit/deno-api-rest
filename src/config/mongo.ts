import { Bson, Collection, MongoClient } from "../deps.ts";
import { env } from "../deps.ts"; 

console.log(`mongodb+srv://${env.DB_USER}:${env.DB_PASSWD}@${env.CLUSTER_NAME}.z2cjr.azure.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`);
const client = new MongoClient();
await client.connect(`mongodb+srv://${env.DB_USER}:${env.DB_PASSWD}@${env.CLUSTER_NAME}.z2cjr.azure.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`);       
const db = client.database(env.DB_NAME)  // Almacenar la base de datos de mongo
export default db; // Exportar la base de datos para su uso extern