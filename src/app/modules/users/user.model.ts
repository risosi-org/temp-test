import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel>({
  email: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = model<IUser, UserModel>("User", userSchema);
export default User;
