import express from "express";
import cartsRouter from "./routers/cartsRouter.js";
import productsRouter from "./routers/productsRouter.js";

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
