import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import responseReturn from "../../../helpers/responseReturn";
import httpStatus from "http-status";
import { OverviewService } from "./overview.service";

const getOverviewStats = catchAsync(async (req: Request, res: Response) => {
  const result = await OverviewService.getOverviewStats();

  responseReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Overview statistics retrieved successfully",
    data: result,
  });
});

export const OverviewController = {
  getOverviewStats,
};
