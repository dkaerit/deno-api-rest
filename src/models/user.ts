import { bcrypt } from "../deps.ts";
import { RouterContext } from "../deps.ts";
import db from '../config/mongo.ts';


// subtipado estructural
interface UserSchema {
    _id: {$oid: string};
    user: string;
    email: string;
    passwd: string;
};

export default class UserClass<UserSchema> {
    constructor() {};
    
    // Atributes
    collection = db.collection<UserSchema>("users");
    
    // Controladores
    addUser() {
        return async (ctx: RouterContext) => {

            try {
                // Encriptar la pass
                const
                    body = await ctx.request.body().value, // capturamos el body
                    salt = await bcrypt.genSalt(10), 
                    passwd = await bcrypt.hash(body.passwd, salt); 

                // insertar datos en mongo
                const oid = await this.collection.insertOne({
                    user: body.user,
                    email: body.email,
                    passwd: passwd,
                    date: new Date(Date.now())
                });
                
                // mensaje de respuesta
                ctx.response.status = 200;
                ctx.response.body = {
                    status: ctx.response.status, 
                    message: {...oid, msg: `Created.`}
                };  
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
            if(ctx.params.user){
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