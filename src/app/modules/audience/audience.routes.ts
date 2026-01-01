import express from "express";
import { AudienceController } from "./audience.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth(), AudienceController.createAudience);
router.get("/", auth(), AudienceController.getAllAudiences);
router.get("/admin", auth(), AudienceController.getAdminAudience);
router.post("/admin", auth(), AudienceController.upsertAdminAudience);
router.get(
  "/:id/message-enabled",
  auth(),
  AudienceController.checkMessageEnabled
);
router.get(
  "/:id/comment-enabled",
  auth(),
  AudienceController.checkCommentEnabled
);
router.get("/:id", auth(), AudienceController.getAudienceById);
router.patch("/:id", auth(), AudienceController.updateAudience);
router.delete("/:id", auth(), AudienceController.deleteAudience);

export const AudienceRoutes = router;
