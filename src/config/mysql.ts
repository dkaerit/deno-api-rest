import { Mysql, env } from "../deps.ts";

const client = await new Mysql().connect({
    hostname: env.DB_HOST,
    username: env.DB_USER,
    db: env.DB_NAME,
    password: env.DB_PASSWD,
  });

export async function insertEntry(collection:any, body:any) {
    return await client.execute(`INSERT INTO ${collection}(name) values(?)`, ["manyuanrong"]);
}

export async function updateEntry() {
    return await client.execute(`update users set ?? = ?`, ["name", "MYR"]);
}

export async function deleteEntry() {
    return await client.execute(`delete from users where ?? = ?`, ["id", 1]);
}