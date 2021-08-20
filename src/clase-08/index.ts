import express, { Request, Response } from 'express';
import Utils from './utils';

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () =>
  console.log(`Server listen on port ${port}`)
);

server.on("error", (error: Error) => console.error(error));

app.get('/api/productos/listar', (_: Request, res: Response) => {
  const products = Utils.getAllProducts();
  res.json(products.length ? products : { error: 'No hay productos cargados.' })
});

app.get('/api/productos/listar/:id', (req: Request, res: Response) => {
  const product = Utils.getProductByID(Number(req.params.id));
  res.json(product ?? { error: 'Producto no encontrado.' })
});

app.post('/api/productos/guardar', (req: Request, res: Response) => {
  const addedProduct = Utils.saveProduct(req.body);
  res.send(`Producto agregado: ${JSON.stringify(addedProduct)}`)
});