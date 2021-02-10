import { bcrypt } from "../deps.ts";
import { RouterContext } from "../deps.ts";
import db from '../config/mongo.ts';
import { insertEntry } from '../config/mongo.ts';

// subtipado estructural
export interface UserSchema {
    _id: {$oid: string};
    user: string;
    email: string;
    passwd: string;
};

export default class UserClass<UserSchema> {
    collection:any;
    constructor(mode:string) {
        switch(mode) {
            case "MONGO": // Si la BDD es mongo, collection se asigna a la colección de la BDD
                this.collection = db.collection<UserSchema>("users");
                break;
            case "MYSQL": // Si la BDD es relacional, collection se asigna a la tabla asociada
                this.collection = "USUARIO"; 
            default: 
                throw "Se esperaba una base de datos específica";
        }
    };
    
    // Controladores
    addUser() {
        return async (ctx: RouterContext) => {
            try {
                const body = await ctx.request.body().value; // capturar el body
                const passwd = encrypt(body.passwd);  // Encriptar la pass 
                const oid = await insertEntry(this.collection, {...body, passwd}); // insertar datos en mongo
                
                // mensaje de respuesta
                ctx.response.status = 200;
                ctx.response.body = {...oid, msg: `Created.`};
            } catch(err) {
                switch(ctx.response.status) {
                    case 400: ctx.throw(400, "Bad Request: content is missing");
                    default: ctx.throw(500, "Something else went wrong");
                }
            }
        }
    } 

    getAllUsers() {
        return async (ctx: RouterContext) => {
            ctx.response.body = this.collection.find({ email: { $ne: null } });
            ctx.response.status = 200; 
        }
    } 

    getUser() {
        return async (ctx: RouterContext) => {
            if(ctx.params.user)
            ctx.response.body = this.collection.find({"user": ctx.params.user.substr(1, ctx.params.user.length)});
            ctx.response.status = 200;             
        }
    } 

    updateUser() {
        return async (ctx: RouterContext) => {
            if(ctx.params.user) {
                const oid = await this.collection.updateOne(
                    { "user": ctx.params.user.substr(1, ctx.params.user.length) },
                    { $set: await ctx.request.body().value}
                );

                ctx.response.status = 200; 
                ctx.response.body = {status: ctx.response.status, message: {
                    ...oid,
                    ctx: `Updated.`
                }};   
            }
        }
    }
    
    deleteUser() {
        return async (ctx: RouterContext) => {
            if(ctx.params.user)
            await this.collection.deleteOne({"uid": ctx.params.user.substr(1, ctx.params.user.length)});

            ctx.response.status = 200; 
            ctx.response.body = {status: ctx.response.status, message: "OK."};
        }
    } 
}

async function encrypt(passwd: any) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(passwd, salt); 
}