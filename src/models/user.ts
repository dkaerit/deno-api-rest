import { getQuery, Context, RouterContext } from "../deps.ts";
import db, { Query } from "../database/mongodb.ts";

const collection = db.collection<UserSchema>("users");
export interface UserSchema {
  _id: {$oid: string};
  user: string;
  email: string;
  passwd: string;
}

export const User = {


  addUser() {
    return async (ctx: Context) => {
      if (!ctx.request.hasBody) ctx.throw(400, "Bad Request: body is missing");
      const value = await ctx.request.body().value;

      ctx.response.body = await Query.createEntry(value, collection);
      ctx.response.status = 200;
    }
  },

  getAllUsers() {
    return async (ctx: Context) => {
      const { skip, limit } = getQuery(ctx);
      ctx.response.body = await Query.getEntries(+skip||0, +limit||0, collection);
      ctx.response.status = 200;
    }
  },


  getUser() {
    return async (ctx: RouterContext) => {
      const name = ctx.params.user? ctx.params.user.substr(1, ctx.params.user.length):'';
      ctx.response.body = await Query.findByFilter("user", name, collection);
      ctx.response.status = 200;
    }
  },

  updateUser() {
    return async (ctx: RouterContext) => {
      if (!ctx.request.hasBody) ctx.throw(400, "Bad Request: body is missing");
      const name = ctx.params.user? ctx.params.user.substr(1, ctx.params.user.length):'';
      const value = await ctx.request.body().value;

      console.log(value,name);
      ctx.response.body = await Query.updateEntry("user", name, value, collection);
      ctx.response.status = 200;
    }
  },

  deleteUser() {
    return async (ctx: RouterContext) => {     
      const name = ctx.params.user? ctx.params.user.substr(1, ctx.params.user.length):'';
      ctx.response.body = await Query.deleteEntry("user", name, collection);
      ctx.response.status = 200;
    }
  },
}

// ————————————————————————————————————————————————— AUXILIARES

