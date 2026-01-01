import { Request, Response } from "express";
import { AudienceService } from "./audience.service";
import catchAsync from "../../../helpers/catchAsync";
import responseReturn from "../../../helpers/responseReturn";
import httpStatus from "http-status";

const createAudience = catchAsync(async (req: Request, res: Response) => {
  const { audience, isNew } = await AudienceService.createAudience(req.body);

  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: isNew
      ? "Audience created successfully"
      : "Audience already exists",
    data: audience,
  });
});

const getAllAudiences = catchAsync(async (req: Request, res: Response) => {
  const result = await AudienceService.getAllAudiences();

  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Audiences retrieved successfully",
    data: result,
  });
});

const getAudienceById = catchAsync(async (req: Request, res: Response) => {
  const result = await AudienceService.getAudienceById(req.params.id);

  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Audience retrieved successfully",
    data: result,
  });
});

const updateAudience = catchAsync(async (req: Request, res: Response) => {
  const result = await AudienceService.updateAudience(req.params.id, req.body);

  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Audience updated successfully",
    data: result,
  });
});

const deleteAudience = catchAsync(async (req: Request, res: Response) => {
  const result = await AudienceService.deleteAudience(req.params.id);

  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Audience deleted successfully",
    data: result,
  });
});

const checkMessageEnabled = catchAsync(async (req: Request, res: Response) => {
  const result = await AudienceService.checkMessageEnabled(req.params.id);

  if (!result) {
    responseReturn(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Audience not found",
      data: null,
    });
    return;
  }

  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message enabled status retrieved successfully",
    data: result,
  });
});

const checkCommentEnabled = catchAsync(async (req: Request, res: Response) => {
  const result = await AudienceService.checkCommentEnabled(req.params.id);

  if (!result) {
    responseReturn(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Audience not found",
      data: null,
    });
    return;
  }

  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment enabled status retrieved successfully",
    data: result,
  });
});

const getAdminAudience = catchAsync(async (req: Request, res: Response) => {
  const result = await AudienceService.getAdminAudience();

  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin audience retrieved successfully",
    data: result,
  });
});

const upsertAdminAudience = catchAsync(async (req: Request, res: Response) => {
  const result = await AudienceService.upsertAdminAudience(req.body);

  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin audience upserted successfully",
    data: result,
  });
});

export const AudienceController = {
  createAudience,
  getAllAudiences,
  getAudienceById,
  updateAudience,
  deleteAudience,
  checkMessageEnabled,
  checkCommentEnabled,
  getAdminAudience,
  upsertAdminAudience,
};
