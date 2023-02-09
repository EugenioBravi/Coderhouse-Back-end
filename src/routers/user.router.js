import { Router } from "express";
import * as usersControllers from "../controllers/user.controllers.js";

const router = Router();
router.post("/", usersControllers.createUser);
router.get("/", usersControllers.getUser);

export default router;
