import { Model } from "mongoose";

export type IUser = {
  email: string;
  password: string | undefined;
};

export type UserModel = Model<IUser>;
