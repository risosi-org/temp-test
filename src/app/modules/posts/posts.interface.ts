import { Model } from "mongoose";

export interface IPost {
  caption: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  userId?: string; // Optional linkage to a user
  createdAt?: Date;
  updatedAt?: Date;
}

export type PostModel = Model<IPost, Record<string, unknown>>;
