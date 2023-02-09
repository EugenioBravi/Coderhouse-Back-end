import express from "express";
import { engine } from "express-handlebars";
import viewsRouter from "../src/routers/views.router.js";
import authRouter from "../src/routers/auth.router.js";
import userRouter from "../src/routers/user.router.js";
import productsRouter from "../src/routers/products.router.js";
import cartsRouter from "../src/routers/carts.router.js";
import * as ProductsService from "../src/dao/services/product.service.js";
import * as ChatsService from "../src/dao/services/chat.service.js";
import { Server } from "socket.io";
import dotenv from "dotenv";
import "./config/db.js";
import __dirname from "./utils.js";
import cookie from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookie());
app.use(
  session({
    store: new mongoStore({
      mongoUrl: process.env.MONGO_URI,
      options: {
        userNewUrlparser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "C0d3r@#$",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 100000 },
  })
);

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", engine());

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

const PORT = process.env.PORT;
const server = app.listen(PORT, () =>
  console.log(` 🚀 Server started on port http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));

const socketServer = new Server(server);
const messages = [];

socketServer.on("connection", (socket) => {
  console.log("Cliente Conectado");

  socket.on("disconnect", () => {
    console.log("Cliente Desconectado");
  });

  let products = ProductsService;
  products.getProducts().then((products) => {
    socketServer.emit("upDate", products);
  });

  let chats = ChatsService;
  chats.getChats().then((chats) => {
    socketServer.emit("loadChats", chats);
  });

  socket.on("message", (data) => {
    messages.push(data);
    let chats = ChatsService;
    chats.createChat(data).then((chat) => {
      console.log(chat);
    });
    socketServer.emit("message", data);
  });

  socket.on("newUser", (nombre) => {
    socket.broadcast.emit("newUser", nombre);
  });
});
