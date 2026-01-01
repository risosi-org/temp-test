import express from "express";
import { OverviewController } from "./overview.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", auth(), OverviewController.getOverviewStats);

export const OverviewRoutes = router;
