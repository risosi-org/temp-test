import express from "express";
import { CommentController } from "./comments.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth(), CommentController.createComment);
router.get("/", auth(), CommentController.getAllComments);
router.get("/post/:postId", auth(), CommentController.getPostComments);
router.patch("/:id", auth(), CommentController.updateComment);
router.delete("/:id", auth(), CommentController.deleteComment);

export const CommentRoutes = router;
