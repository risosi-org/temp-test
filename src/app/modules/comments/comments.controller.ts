import { Request, Response } from "express";
import { CommentService } from "./comments.service";
import catchAsync from "../../../helpers/catchAsync";
import responseReturn from "../../../helpers/responseReturn";
import httpStatus from "http-status";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.createComment(req.body);
  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment created successfully",
    data: result,
  });
});

const getPostComments = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.getCommentsByPostId(req.params.postId);
  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comments retrieved successfully",
    data: result,
  });
});

const getAllComments = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.getAllComments();
  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All comments retrieved successfully",
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.deleteComment(req.params.id);
  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment deleted successfully",
    data: result,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.updateComment(
    req.params.id,
    req.body.content
  );
  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment updated successfully",
    data: result,
  });
});

export const CommentController = {
  createComment,
  getPostComments,
  getAllComments,
  deleteComment,
  updateComment,
};
