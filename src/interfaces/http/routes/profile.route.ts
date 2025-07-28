import { Router } from "express";
import {
    profileGetMeController,
    profileGetOtherController,
    profileUpdateController,
} from "../controllers/profile.controller";
import authMiddleware from "../middlewares/authHandler";

const router = Router();

router.put("/", authMiddleware(), profileUpdateController);
router.get("/", authMiddleware(), profileGetMeController);
router.get("/:username", profileGetOtherController);

export default router;
