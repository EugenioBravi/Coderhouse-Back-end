import { Router } from "express";
import * as ViewsController from "../controllers/view.controllers.js";

const router = Router();
router.get("/", ViewsController.getHomeProducts);
router.get("/products", ViewsController.getProducts);
router.get("/carts/:cid", ViewsController.getCart);
router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
