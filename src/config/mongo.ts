import { Bson, Collection, MongoClient } from "../deps.ts";
import { env } from "../deps.ts"; 

const client = new MongoClient();
await client.connect(`mongodb+srv://${env.DB_USER}:${env.DB_PASSWD}@${env.CLUSTER_NAME}.z2cjr.azure.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`);       
const db = client.database(env.DB_NAME)  // Almacenar la base de datos de mongo
export default db; // Exportar la base de datos para su uso extern

export async function insertEntry(collection:any, scene:any) {
    return await collection.insertOne({
        user: scene.user,
        email: scene.email,
        passwd: scene.passwd,
        date: new Date(Date.now())
    });
}

export async function updateEntry() {

}

export async function deleteEntry() {

}