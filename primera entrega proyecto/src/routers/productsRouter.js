import { Router } from "express";
import ProductManager from "../services/ProductManager.js";

let Pm = new ProductManager("src/products.json");

const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  const limit = req.query.limit;
  if (limit) {
    Pm.getProducts().then((limitedProductList) =>
      res.json(limitedProductList.slice(0, limit))
    );
  } else {
    Pm.getProducts().then((producList) => res.json(producList));
  }
  res.status(200);
});
productsRouter.get("/:pid", (req, res) => {
  const productId = req.params.pid;
  Pm.getProductById(Number(productId)).then((product) => res.send(product));
});
productsRouter.post("/", (req, res) => {
  const data = req.body;

  const status = Pm.addProduct(
    data.title,
    data.description,
    data.code,
    data.price,
    data.status,
    data.stock,
    data.category,
    data.thumbnail
  );
  status.then((status) => res.status(status).json(data));
});
productsRouter.put("/:pid", (req, res) => {
  const id = req.params.pid;
  const data = req.body;
  Pm.updateProduct(Number(id), data.key, data.value).then((product) =>
    res.status(200).json(product)
  );
});
productsRouter.delete("/:pid", (req, res) => {
  const { pid } = req.params;
  Pm.deleteProduct(Number(pid)).then((products) => res.json(products));
});
export default productsRouter;
