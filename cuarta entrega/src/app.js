import express from "express";
import cartsRouter from "./routers/cartsRouter.js";
import productsRouter from "./routers/productsRouter.js";
import viewsRouter from "./routers/viewsRouter.js";
import { Pm } from "./routers/productsRouter.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);

const socketServer = new Server(server);

socketServer.on("connection", (socket) => {
  console.log("Cliente Conectado");
  socket.on("disconnect", () => {
    console.log("Cliente Desconectado");
  });
  Pm.getProducts().then((products) => {
    socketServer.emit("upDate", products);
  });
});
