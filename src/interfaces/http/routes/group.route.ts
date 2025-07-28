import { Router } from "express";
import {
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

export default router;
