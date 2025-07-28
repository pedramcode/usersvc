import { Router } from "express";
import {
    groupAssignController,
    groupCreateController,
    groupDeleteController,
    groupGetAllController,
    groupUpdateController,
} from "../controllers/group.controller";

const router = Router();

router.post("/", groupCreateController);
router.get("/", groupGetAllController);
router.put("/:id", groupUpdateController);
router.delete("/:id", groupDeleteController);
router.patch("/assign", groupAssignController);

export default router;
