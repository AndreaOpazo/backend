import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import Utils from "./utils";
import { Server }from "socket.io"
import { Product } from "./data";

const app = express();
const server = http.createServer(app);
const ioServer = new Server(server);
const router = express.Router();

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

app.get("/productos/vista", (_: Request, res: Response) => {
  const data = Utils.getAllProducts();
  res.render("partials/table.hbs", { data });
});

router.get('/productos/listar', (_: Request, res: Response) => {
  const products = Utils.getAllProducts();
  res.json(products.length ? products : { error: 'No hay productos cargados.' });
});

router.get('/productos/listar/:id', (req: Request, res: Response) => {
  const product = Utils.getProductByID(Number(req.params.id));
  res.json(product ?? { error: 'Producto no encontrado.' });
});

router.post('/productos/guardar', (req: Request, res: Response) => {
  Utils.saveProduct(req.body);
  res.redirect('/');
});

router.put('/productos/actualizar/:id',(req: Request, res: Response) => {
  const updatedProduct = Utils.updateProduct(req.body, Number(req.params.id));
  res.send(updatedProduct);
});

router.delete('/productos/borrar/:id', (req: Request, res: Response) => {
  const deletedProduct = Utils.deleteProduct(Number(req.params.id));
  res.send(deletedProduct);
});