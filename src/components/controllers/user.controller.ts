import { getQuery, Context, RouterContext } from "../../../_dependencies/oak.ts";
import { Query } from "../../../database/queries/mongo.queries.ts";
import { UserCollection } from "../models/user.model.ts"

export class UserController { 

    /**
     * 
     * @returns 
     */

    public static addUser() {
        return async (ctx: Context) => {
            if (!ctx.request.hasBody) ctx.throw(400, "Bad Request: body is missing");
            const value = await ctx.request.body().value;

            ctx.response.body = await Query.createEntry(value, UserCollection);
            ctx.response.status = 200;
        }
    }

    /**
     * 
     * @returns 
     */

    public static getAllUsers() {
        return async (ctx: Context) => {
            const { skip, limit } = getQuery(ctx);
            ctx.response.body = await Query.getEntries(+skip||0, +limit||0, UserCollection);
            ctx.response.status = 200;
        }
    }

    /**
     * 
     * @returns 
     */

    public static getUser() {
        return async (ctx: RouterContext) => {
            const name = ctx.params.user? ctx.params.user.substr(1, ctx.params.user.length):'';
            ctx.response.body = await Query.findByFilter("user", name, UserCollection);
            ctx.response.status = 200;
        }
    }

    /**
     * 
     * @returns 
     */

    public static updateUser() {
        return async (ctx: RouterContext) => {
            if (!ctx.request.hasBody) ctx.throw(400, "Bad Request: body is missing");
            const name = ctx.params.user? ctx.params.user.substr(1, ctx.params.user.length):'';
            const value = await ctx.request.body().value;

            console.log(value,name);
            ctx.response.body = await Query.updateEntry("user", name, value, UserCollection);
            ctx.response.status = 200;
        }
    }

    /**
     * 
     * @returns 
     */

    public static deleteUser() {
        return async (ctx: RouterContext) => {     
            const name = ctx.params.user? ctx.params.user.substr(1, ctx.params.user.length):'';
            ctx.response.body = await Query.deleteEntry("user", name, UserCollection);
            ctx.response.status = 200;
        }
    }
}