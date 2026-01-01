import { Router } from "express";
import authController from "./auth.controller";
import { USER_ROLE } from "../../../enum/user";
import auth from "../../middleware/auth";

const router: Router = Router();
router.route("/login").post(authController.login);

router.route("/logout").post(authController.logOut);
router.post(
  "/reset-password",
  auth(USER_ROLE.ADMIN),
  authController.resetPassword
);

router.patch(
  "/change-password",
  auth(USER_ROLE.ADMIN),
  authController.changePassword
);

export { router as authRoutes };
