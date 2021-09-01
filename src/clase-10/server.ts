import express, { Request, Response } from "express";
import handlebars from "express-handlebars";
import Utils from "./utils";

const port = 8080;
const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
  console.log(`Servidor escuchando en ${port}`);
});

server.on("error", () => {
  console.log("Error iniciando el server");
});

/**
 * Configuracion de motor de plantilla
 */
const ENGINE_NAME = "hbs";

app.engine(
  ENGINE_NAME,
  handlebars({
    extname: `.${ENGINE_NAME}`, // extension de la plantilla
    layoutsDir: `${__dirname}/views/layouts`, // ruta de plantilla principal
    defaultLayout: "index.hbs", // plantilla principal
  })
);

app.set("view engine", ENGINE_NAME);
app.set("views", "./views"); 
app.use(express.static(`${__dirname}/public`));
app.use('/api', router);

app.get("/productos/vista", (_: Request, res: Response) => {
  const data = Utils.getAllProducts();
  res.render("main.hbs", { data });
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