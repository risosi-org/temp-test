import { Request, Response, NextFunction } from "express";
import ApiError from "../../errors/ApiError";

const authApiKeys = (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = req.header("x-api-key");
    if (!apiKey) {
      throw new ApiError(401, "Access Denied. No token provided");
    }
  } catch (error) {
    next(error);
  }
  next();
};

export default authApiKeys;
