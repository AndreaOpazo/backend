import express from "express";
import handlebars from "express-handlebars";
import http from "http";
import path from "path";
import { Server }from "socket.io";

const app = express();
const router = express.Router();
const server = http.createServer(app);
const ioServer = new Server(server);

server.listen(8080, () => {
  console.log("Server ON");
});

server.on("error", () => {
  console.log("Error iniciando el server");
});

const ENGINE_NAME = "hbs";

app.engine(
  ENGINE_NAME,
  handlebars({
    extname: `.${ENGINE_NAME}`,
    layoutsDir: `${__dirname}/views/layouts`,
    defaultLayout: "index.hbs",
  })
);

app.set("view engine", ENGINE_NAME);
app.set("views", "./views"); 

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

app.get("/", (_req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, './public') });
});

const messages = [];
ioServer.on("connection", (socket) => {
  socket.emit("productList", Utils.getAllProducts());
  socket.emit("messageList", messages);
  
  socket.on("new-message", (data) => {
    data.date = getActualDate();
    messages.push(data);
    ioServer.sockets.emit("messageList", messages);
  });
});

app.get("/productos/vista", (_, res) => {
  const data = Utils.getAllProducts();
  res.render("main.hbs", { data });
});

router.get('/productos/listar', (_, res) => {
  const products = Utils.getAllProducts();
  res.json(products.length ? products : { error: 'No hay productos cargados.' });
});

router.get('/productos/listar/:id', (req, res) => {
  const product = Utils.getProductByID(Number(req.params.id));
  res.json(product ? product : { error: 'Producto no encontrado.' });
});

router.post('/productos/guardar', (req, res) => {
  Utils.saveProduct(req.body);
  const products = Utils.getAllProducts();
  ioServer.sockets.emit("productList", products);
  res.redirect('/');
});

router.put('/productos/actualizar/:id',(req, res) => {
  const updatedProduct = Utils.updateProduct(req.body, Number(req.params.id));
  res.send(updatedProduct);
});

router.delete('/productos/borrar/:id', (req, res) => {
  const deletedProduct = Utils.deleteProduct(Number(req.params.id));
  res.send(deletedProduct);
});

/// utils
const data = [];

class Utils {
  static getAllProducts() {
    return data;
  };

  static getProductByID(id) {
    return data.find((product) => product.id === id)
  };

  static saveProduct(product) {
    let id = 1;
    if (data.length) {
      const productIds = data.map(product => product.id);
      id = Math.max(...productIds) + 1;
    }
    product['id'] = id;
    data.push(product);
  };

  static updateProduct(product, id) {
    const productIndexToUpdate = data.findIndex((product) => product.id === id);
    if (productIndexToUpdate !== -1) {
      data[productIndexToUpdate] = {...product, id};
      return product;
    } else {
      return { error: 'Producto no encontrado.' };
    };
  };

  static deleteProduct(id) {
    const productIndexToDelete = data.findIndex((product) => product.id === id);
    if (productIndexToDelete !== -1) {
      const productToDelete = data[productIndexToDelete];
      data.splice(productIndexToDelete, 1);
      return productToDelete;
    } else {
      return { error: 'Producto no encontrado.' };
    };
  };
};

const getActualDate = () => {
  const date = new Date();

  let day = date.getDate();
  if (day < 10) day = `0${day}`;

  let month = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;

  const year = date.getFullYear();

  let hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
  let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  let seconds = (date.getSeconds() < 10 ? '0' : '' ) + date.getSeconds();
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};