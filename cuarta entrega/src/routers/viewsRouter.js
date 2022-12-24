import { Router } from "express";
import { Pm } from "./productsRouter.js";

const router = Router();

router.get("/", (req, res) => {
  Pm.getProducts().then((listProducts) => {
    res.render("home", { listProducts });
  });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export default router;
