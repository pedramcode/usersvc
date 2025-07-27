import { Router } from "express";
import {
    userLoginController,
    userRefreshController,
    userRegisterController,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", userRegisterController);
router.post("/login", userLoginController);
router.post("/refresh", userRefreshController);

export default router;
