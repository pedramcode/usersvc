import { Router } from "express";
import userRouter from "./user.route";
import permissionRouter from "./permission.route";
import superuserAuthMiddleware from "../middlewares/superuserAuthHandler";

const router = Router();
const adminRouter = Router({ mergeParams: true });

router.use("/users", userRouter);

router.use("/admin", superuserAuthMiddleware(), adminRouter);
adminRouter.use("/permission", permissionRouter);

export default router;
