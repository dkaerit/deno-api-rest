import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import db from '../config/database.ts';

// subtipado estructural
interface UserSchema {
    _id: {$oid: string};
    user: string;
    email: string;
    passwd: string;
}

export default class UserClass<UserSchema> {
    constructor() {};
    
    // Atributes
    collection = db.collection("users");
    
    // Controladores
    addUser() {
        return async ({ request, response }: { request: any; response: any }) => {

            try
            {
                // Encriptar la pass
                const 
                    salt = await bcrypt.genSalt(10),
                    passwd = await bcrypt.hash(await request.body().passwd, salt);

                // insertar datos en mongo
                const oid = await this.collection.insertOne({
                    user: await request.body().user,
                    email: await request.body().email,
                    passwd: passwd,
                    date: new Date(Date.now())
                });
                
                // mensaje de respuesta
                response.status = 200;
                response.body = {
                    status: response.status, 
                    message: {...oid, ctx: `Created.`}
                };  
            } catch(e) {
                response.body = {
                    status: response.status, 
                    message: {error: e, ctx: `Error.`}
                };  
            }
                   
            
        }
    } 

    getAllUsers() {
        return async ({ response }: { response: any }) => {
            response.body = await this.collection.find({ email: { $ne: null } });
            response.status = 200; 
        }
    } 

    getUser() {
        return async ({ params, response }: { params: {user: string}; response: any }) => {
            response.body = await this.collection.find({"user": params.user.substr(1, params.user.length)});
            response.status = 200; 
        }
    } 

    updateUser() {
        return async ({params, request, response}: {params: {user: string}; request: any; response: any}) => {

            const oid = await this.collection.updateOne(
                { "user": params.user.substr(1, params.user.length) },
                { $set: await request.body().value}
            );

            response.status = 200; 
            response.body = {status: response.status, message: {
                ...oid,
                ctx: `Updated.`
            }};      
        }
    }
    
    deleteUser() {
        return async ({params, response}: {params: {user: string}; response: any}) => {
            await this.collection.deleteOne({"uid": params.user.substr(1, params.user.length)});

            response.status = 200; 
            response.body = {status: response.status, message: "OK."};
        }
    } 
}