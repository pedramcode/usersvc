import { Router } from "express";
import {
    permissionCreateController,
    permissionDeleteController,
    permissionGetAllController,
} from "../controllers/permission.controller";

const router = Router();

router.post("/", permissionCreateController);
router.get("/", permissionGetAllController);
router.delete("/:id", permissionDeleteController);

export default router;
