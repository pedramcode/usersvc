import { Router } from "express";
import {
    permissionCreateController,
    permissionGetAllController,
} from "../controllers/permission.controller";

const router = Router();

router.post("/", permissionCreateController);
router.get("/", permissionGetAllController);

export default router;
