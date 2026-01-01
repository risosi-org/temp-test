import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { AudienceRoutes } from "../modules/audience/audience.routes";
import { MessageRoutes } from "../modules/messages/messages.routes";
import { CommentRoutes } from "../modules/comments/comments.routes";
import { PostRoutes } from "../modules/posts/posts.routes";
import { MetaRoutes } from "../modules/meta/meta.routes";
import { OverviewRoutes } from "../modules/overview/overview.routes";

const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/audience",
    route: AudienceRoutes,
  },
  {
    path: "/messages",
    route: MessageRoutes,
  },
  {
    path: "/comments",
    route: CommentRoutes,
  },
  {
    path: "/posts",
    route: PostRoutes,
  },
  {
    path: "/meta",
    route: MetaRoutes,
  },
  {
    path: "/overview",
    route: OverviewRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
