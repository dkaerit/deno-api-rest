// deno-lint-ignore-file no-explicit-any
import { Collection, MongoClient } from "../deps.ts";

// ————————————————————————————————————————————————— CONECTAR DATABASE
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
const db = client.database(Deno.env.get("DB_NAME") as string);
export default db;



// ————————————————————————————————————————————————— QUERIES GENERALIZATIONS
export const Query = { 
  async createEntry(entry:Record<string,unknown>, collection:Collection<any>): Promise<any> {
    return (await collection.insertOne(entry)).toString();
  },
  

  async getEntries(skip:number, limit:number, collection:Collection<any>): Promise<any> {
    return await collection.find(
      {}, 
      { noCursorTimeout: false } as Record<string,unknown>)
      .skip(skip).limit(limit).toArray();
  },


  async findByFilter(field:string, filter:string, collection:Collection<any>): Promise<any> {
    return await collection.findOne(
      { [field]: filter }, 
      { noCursorTimeout: false } as Record<string,unknown>);
  },


  async findByFilters(filter:Record<string,any>, collection:Collection<any>): Promise<any> {
    return await collection.findOne(
      filter, 
      { noCursorTimeout: false } as Record<string,unknown>);
  },


  async updateEntry(field:string, filter:string, entry:Record<string,unknown>, collection:Collection<any>): Promise<any> {
    const update = { $set: entry };
    return await collection.updateOne({ [field]: filter }, update);
  },


  async deleteEntry(field:string, filter:string, collection:Collection<any>): Promise<any> {
    return await collection.deleteOne(
      { [field]: filter });
  },

}