import { Request, Response, NextFunction } from "express";
import ApiError from "../../errors/ApiError";
import JWTOperation from "../../util/jwtOperation";
import config from "../../config";
import { IVerifyPayload } from "../modules/auth/auth.interface";
import User from "../modules/users/user.model";

const auth =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

    (...rules: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.header("x-auth-token") || req.cookies?.accessToken;
        if (!token) {
          throw new ApiError(401, "Access Denied. No token provided");
        }
        const jwt = new JWTOperation(
          config.jwt_secret as string,
          config.jwt_expire_in as string
        );
        const decoded = jwt.verifyToken(token) as IVerifyPayload;
        if (!decoded || !decoded.email) {
          throw new ApiError(401, "Invalid token");
        }

        // Check if user exists in database
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
          throw new ApiError(401, "User not found or authorized");
        }

        req.user = decoded;

        next();
      } catch (error) {
        next(error);
      }
    };

export default auth;
