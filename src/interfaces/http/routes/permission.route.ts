import { Router } from "express";
import {
    permissionCreateController,
    permissionDeleteController,
    permissionGetAllController,
    permissionUpdateController,
} from "../controllers/permission.controller";

const router = Router();

router.post("/", permissionCreateController);
router.get("/", permissionGetAllController);
router.delete("/:id", permissionDeleteController);
router.put("/:id", permissionUpdateController);

export default router;
