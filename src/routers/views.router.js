import { Router } from "express";
import * as ViewsController from "../controllers/view.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/login", ViewsController.login);
router.get("/register", ViewsController.register);
router.get("/", authMiddleware, ViewsController.getHomeProducts);
router.get("/products", authMiddleware, ViewsController.getProducts);
router.get("/carts/:cid", authMiddleware, ViewsController.getCart);

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
