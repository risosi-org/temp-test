import express from "express";
import { MessageController } from "./messages.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth(), MessageController.createMessage);
router.get("/conversations", auth(), MessageController.getConversations); // ?userId=...
router.get("/", auth(), MessageController.getConversation); // ?userId=...&otherUserId=...
router.patch("/:id/read", auth(), MessageController.markAsRead);
router.patch(
  "/read/:otherUserId",
  auth(),
  MessageController.markConversationAsRead
);

export const MessageRoutes = router;
