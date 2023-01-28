import { Router } from "express";
import * as CartsController from "../controllers/carts.controllers.js";

const cartsRouter = Router();
cartsRouter.get("/:cid", CartsController.getCart);
cartsRouter.post("/", CartsController.createCart);
cartsRouter.post("/:cid/product/:pid", CartsController.updateCart);
cartsRouter.delete("/:cid", CartsController.deleteCart);

export default cartsRouter;
