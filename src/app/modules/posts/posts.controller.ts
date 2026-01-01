import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import responseReturn from "../../../helpers/responseReturn";
import { PostService } from "./posts.service";

const createPost = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.createPost(req.body);
  responseReturn(res, {
    success: true,
    message: "Post created successfully",
    data: result,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.getAllPosts();
  responseReturn(res, {
    success: true,
    message: "Posts retrieved successfully",
    data: result,
  });
});

const getPostById = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.getPostById(req.params.id);
  responseReturn(res, {
    success: true,
    message: "Post retrieved successfully",
    data: result,
  });
});

export const PostController = {
  createPost,
  getAllPosts,
  getPostById,
};
