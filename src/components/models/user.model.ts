import db from "../../../database/factories/mongo.factory.ts";

export const UserCollection = db.collection<UserSchema>("users");
export interface UserSchema {
  _id: {$oid: string};
  user: string;
  email: string;
  passwd: string;
}