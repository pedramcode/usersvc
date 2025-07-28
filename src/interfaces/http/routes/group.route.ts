import { Router } from "express";
import {
    groupCreateController,
    groupGetAllController,
    groupUpdateController,
} from "../controllers/group.controller";

const router = Router();

router.post("/", groupCreateController);
router.get("/", groupGetAllController);
router.put("/:id", groupUpdateController);

export default router;
