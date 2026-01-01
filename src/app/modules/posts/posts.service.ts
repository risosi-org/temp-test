import { IPost } from "./posts.interface";
import { Posts } from "./posts.model";

const createPost = async (payload: IPost): Promise<IPost> => {
  const result = await Posts.create(payload);
  return result;
};

const getAllPosts = async (): Promise<IPost[]> => {
  const result = await Posts.find().sort({ createdAt: -1 });
  return result;
};

const getPostById = async (id: string): Promise<IPost | null> => {
  const result = await Posts.findById(id);
  return result;
};

export const PostService = {
  createPost,
  getAllPosts,
  getPostById,
};
