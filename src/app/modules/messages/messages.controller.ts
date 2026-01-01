import { Request, Response } from "express";
import { MessageService } from "./messages.service";
import catchAsync from "../../../helpers/catchAsync";
import responseReturn from "../../../helpers/responseReturn";
import httpStatus from "http-status";

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.createMessage(req.body);
  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message sent successfully",
    data: result,
  });
});

const getConversation = catchAsync(async (req: Request, res: Response) => {
  const { otherUserId } = req.query;
  if (!otherUserId) {
    throw new Error("Both userId and otherUserId are required");
  }

  const result = await MessageService.getMessages(otherUserId as string);
  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Conversation retrieved successfully",
    data: result,
  });
});

const getConversations = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.getConversations();
  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Conversations retrieved successfully",
    data: result,
  });
});

const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.markAsRead(req.params.id);
  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message marked as read",
    data: result,
  });
});

const markConversationAsRead = catchAsync(
  async (req: Request, res: Response) => {
    const { otherUserId } = req.params;
    const result = await MessageService.markConversationAsRead(otherUserId);
    responseReturn(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Conversation marked as read",
      data: result,
    });
  }
);

export const MessageController = {
  createMessage,
  getConversation,
  markAsRead,
  getConversations,
  markConversationAsRead,
};
