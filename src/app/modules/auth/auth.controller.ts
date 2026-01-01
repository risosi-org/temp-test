import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import authService from "./auth.service";
import responseReturn from "../../../helpers/responseReturn";
import { IUser } from "../users/user.interface";
import { JwtPayload } from "jsonwebtoken";

class AuthController {
  private authService: typeof authService;
  private cookieOptions: {
    secure: boolean;
    httpOnly: boolean;
    sameSite: "none";
  };

  constructor() {
    this.authService = authService;
    this.cookieOptions = {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    };
  }

  login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.authService.login({
      email,
      password,
    });
    const { accessToken, refreshToken, ...restData } = result;
    res.cookie("accessToken", accessToken, this.cookieOptions);
    res.cookie("refreshToken", refreshToken, this.cookieOptions);
    responseReturn(res, {
      success: true,
      message: "Login Success",
      data: { ...restData, token: accessToken },
    });
  });

  resetPassword = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.resetPassword(
      req.body,
      req?.user as JwtPayload
    );
    responseReturn<IUser | null>(res, {
      success: true,
      message: "password reset successfully",
      data: result,
    });
  });

  changePassword = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.changePassword(
      req.body,
      req?.user as JwtPayload
    );
    responseReturn(res, {
      success: true,
      statusCode: 200,
      message: "password changed successfully",
      data: result,
    });
  });

  logOut = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    responseReturn(res, {
      success: true,
      message: "Logout Successfully",
      data: null,
    });
  });
}

const authController = new AuthController();
export default authController;
