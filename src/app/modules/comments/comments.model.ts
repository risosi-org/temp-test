import { Schema, model } from "mongoose";
import { IComment, CommentModel } from "./comments.interface";

const commentSchema = new Schema<IComment, CommentModel>(
  {
    postId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    parentId: {
      type: String, // Can be ObjectId of another comment if we want nested comments structure
      default: null,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Comments = model<IComment, CommentModel>(
  "Comments",
  commentSchema
);
