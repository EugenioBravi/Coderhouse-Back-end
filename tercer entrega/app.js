import express from "express";
import ProductManager from "./ProductManager.js";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Pm = new ProductManager("./products.json");
app.get("/products", (req, res) => {
  let limit = req.query.limit;
  if (limit) {
    Pm.getProducts().then((limitedProductList) =>
      res.json(limitedProductList.slice(0, limit))
    );
  } else {
    Pm.getProducts().then((producList) => res.json(producList));
  }
});
app.get("/products/:pid", (req, res) => {
  let productId = req.params.pid;
  Pm.getProductById(Number(productId)).then((product) => res.send(product));
});
app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
