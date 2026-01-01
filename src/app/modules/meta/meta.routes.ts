import express from "express";
import { MetaController } from "./meta.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", auth(), MetaController.getMeta);
router.post("/", auth(), MetaController.upsertMeta);

export const MetaRoutes = router;
