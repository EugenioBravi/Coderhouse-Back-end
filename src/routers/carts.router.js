import { Router } from "express";
import * as CartsController from "../controllers/carts.controllers.js";

const cartsRouter = Router();
cartsRouter.get("/", CartsController.getCarts);
cartsRouter.get("/:cid", CartsController.getCart);
cartsRouter.post("/", CartsController.createCart);
cartsRouter.post("/:cid/product/:pid", CartsController.addProductToCart);
cartsRouter.delete("/:cid/product/:pid", CartsController.deleteProduct);
cartsRouter.delete("/:cid", CartsController.deleteProducts);

export default cartsRouter;
