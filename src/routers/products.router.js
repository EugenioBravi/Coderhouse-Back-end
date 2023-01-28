import { Router } from "express";
import * as ProductsController from "../controllers/products.controllers.js";

const productsRouter = Router();

productsRouter.get("/", ProductsController.getProducts);
productsRouter.get("/:pid", ProductsController.getProduct);
productsRouter.post("/", ProductsController.createProducts);
productsRouter.put("/:pid", ProductsController.updateProduct);
productsRouter.delete("/:pid", ProductsController.deleteProduct);

export default productsRouter;
