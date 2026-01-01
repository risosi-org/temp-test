import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import JWTOperation from "../../../util/jwtOperation";
import config from "../../../config";
import User from "../users/user.model";
import encryptionOperation from "../../../util/encryptionOperation";
import { JwtPayload } from "jsonwebtoken";

class AuthService {
  jwtSecret: string;
  jwtExpiresIn: string;
  jwt: JWTOperation;
  encryption: typeof encryptionOperation;
  constructor(jwtSecret: string, jwtExpiresIn: string) {
    this.jwtSecret = jwtSecret;
    this.jwtExpiresIn = jwtExpiresIn;
    this.jwt = new JWTOperation(this.jwtSecret, this.jwtExpiresIn);
    this.encryption = encryptionOperation;
  }

  async login(payload: { email: string; password: string }) {
    const { email, password } = payload;
    const isExist = await User.findOne({
      email,
    });
    if (!isExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User Not Found");
    }
    const isPasswordMatch = await encryptionOperation.comparePassword(
      password,
      isExist.password as string
    );

    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Wrong credentials");
    }
    const accessToken = this.jwt.createToken(
      {
        email: isExist.email,
      },
      "7d"
    );
    const refreshToken = this.jwt.createToken(
      {
        email: isExist.email,
      },
      "30d"
    );

    isExist.password = undefined;

    return { accessToken, refreshToken, user: isExist };
  }

  resetPassword = async (
    payload: { password: string; confirmPassword: string },
    user: JwtPayload | { userId: string }
  ) => {
    const isExist = await User.findOne({ _id: user?.userId });
    if (!isExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User Not Found");
    }
    const { password, confirmPassword } = payload;
    if (password !== confirmPassword) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Password and Confirm Password not match"
      );
    }

    const hashedPassword = await this.encryption.hashPassword(password);

    const result = await User.findOneAndUpdate(
      { _id: user?.userId },
      { $set: { password: hashedPassword } },
      { new: true }
    );
    return result;
  };

  changePassword = async (
    payload: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    },
    user: JwtPayload | { email: string }
  ) => {
    const isExist = await User.findOne({ email: user?.email });
    if (!isExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User Not Found");
    }
    const { currentPassword, newPassword, confirmPassword } = payload;

    const isPasswordMatch = await encryptionOperation.comparePassword(
      currentPassword,
      isExist.password as string
    );

    if (!isPasswordMatch) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Current password does not match"
      );
    }

    if (newPassword !== confirmPassword) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "New password and confirm password do not match"
      );
    }

    const hashedPassword = await this.encryption.hashPassword(newPassword);

    await User.findOneAndUpdate(
      { email: user?.email },
      { $set: { password: hashedPassword } }
    );

    return { success: true };
  };
}

const authService = new AuthService(
  config.jwt_secret as string,
  config.jwt_expire_in as string
);
export { AuthService };
export default authService;
