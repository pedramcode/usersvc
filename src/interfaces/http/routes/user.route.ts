import { Router } from "express";
import { userRegisterController } from "../controllers/user.controller";

const router = Router();

router.post("/register", userRegisterController);

export default router;
