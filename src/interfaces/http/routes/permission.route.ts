import { Router } from "express";
import { permissionCreateController } from "../controllers/permission.controller";

const router = Router();

router.post("/", permissionCreateController);

export default router;
