import { Schema, model } from "mongoose";
import { IPost, PostModel } from "./posts.interface";

const postSchema = new Schema<IPost, PostModel>(
  {
    caption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    reach: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String, // Storing as string ID for now to match other patterns if used
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Posts = model<IPost, PostModel>("Posts", postSchema);
