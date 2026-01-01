import { Model } from "mongoose";

export interface IComment {
  postId: string;
  // commentId is likely the _id, so we don't need to define it explicitly in interface for creation
  content: string;
  parentId: string | null;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CommentModel = Model<IComment, Record<string, unknown>>;
