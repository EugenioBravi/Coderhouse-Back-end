import { Router } from "express";
import * as ViewsController from "../controllers/view.controllers.js";

const router = Router();
router.get("/", ViewsController.getProducts);

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
