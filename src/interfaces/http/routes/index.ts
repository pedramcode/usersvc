import { Router } from "express";
import superuserAuthMiddleware from "../middlewares/superuserAuthHandler";
import userRouter from "./user.route";
import permissionRouter from "./permission.route";
import profileRouter from "./profile.route";
import groupRouter from "./group.route";

const router = Router();
const adminRouter = Router({ mergeParams: true });

router.use("/users", userRouter);
router.use("/profile", profileRouter);

router.use("/admin", superuserAuthMiddleware(), adminRouter);
adminRouter.use("/permission", permissionRouter);
adminRouter.use("/group", groupRouter);

export default router;
