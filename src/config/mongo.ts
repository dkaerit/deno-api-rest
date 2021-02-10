import { Bson, Collection, MongoClient } from "../deps.ts";
import { env } from "../deps.ts"; 

const client = new MongoClient();
await client.connect(`mongodb+srv://${env.DB_USER}:${env.DB_PASSWD}@${env.CLUSTER_NAME}.z2cjr.azure.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`); // Conectamos a la sesión con URI         
const db = client.database(env.DB_NAME)  // Almacenar la base de datos de mongo
export default db; // Exportar la base de datos para su uso extern