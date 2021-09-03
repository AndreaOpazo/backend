import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import { Server }from "socket.io"
import { Product } from "./data";

const app = express();
const server = http.createServer(app);
const ioServer = new Server(server);

server.listen(8080, () => {
  console.log("Server ON");
});

app.use(express.static("./public"));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile("index.html", { root: path.join(__dirname, './public') });
});

const productos: Product[] = [];
ioServer.on("connection", (socket) => {
  ioServer.sockets.emit("productList", productos);

  socket.on("input", (data: Product) => {
    if (data.title === '' || data.price === 0 || data.thumbnail === '') {
      socket.emit('notificacion', 'Todos los campos son requeridos!')
    } else {
      productos.push(data);
      socket.emit("clearFields")
      ioServer.sockets.emit("productList", productos);
    }
  })
});