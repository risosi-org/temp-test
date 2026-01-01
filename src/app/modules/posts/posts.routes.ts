import express from "express";
import { PostController } from "./posts.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth(), PostController.createPost);
router.get("/", auth(), PostController.getAllPosts);
router.get("/:id", auth(), PostController.getPostById);

export const PostRoutes = router;
