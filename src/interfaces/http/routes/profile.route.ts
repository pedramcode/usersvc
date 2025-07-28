import { Router } from "express";
import { profileUpdateController } from "../controllers/profile.controller";
import authMiddleware from "../middlewares/authHandler";

const router = Router();

router.put("/", authMiddleware(), profileUpdateController);

export default router;
