import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import responseReturn from "../../../helpers/responseReturn";
import httpStatus from "http-status";
import { MetaService } from "./meta.service";

const upsertMeta = catchAsync(async (req: Request, res: Response) => {
  const result = await MetaService.upsertMeta(req.body);

  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Meta information updated successfully",
    data: result,
  });
});

const getMeta = catchAsync(async (req: Request, res: Response) => {
  const result = await MetaService.getMeta();

  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Meta information retrieved successfully",
    data: result,
  });
});

export const MetaController = {
  upsertMeta,
  getMeta,
};
