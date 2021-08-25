import express, { Request, Response } from 'express';
import Utils from './utils';

const app = express();
const port = 8080;
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

const server = app.listen(port, () =>
  console.log(`Server listen on port ${port}`)
);

server.on("error", (error: Error) => console.error(error));

app.use('/api', router);

router.get('/productos/listar', (_: Request, res: Response) => {
  const products = Utils.getAllProducts();
  res.json(products.length ? products : { error: 'No hay productos cargados.' });
});

router.get('/productos/listar/:id', (req: Request, res: Response) => {
  const product = Utils.getProductByID(Number(req.params.id));
  res.json(product ?? { error: 'Producto no encontrado.' });
});

router.post('/productos/guardar', (req: Request, res: Response) => {
  const addedProduct = Utils.saveProduct(req.body);
  res.send(`Producto agregado: ${JSON.stringify(addedProduct)}`);
});

router.put('/productos/actualizar/:id',(req: Request, res: Response) => {
  const updatedProduct = Utils.updateProduct(req.body, Number(req.params.id));
  res.send(updatedProduct);
});

router.delete('/productos/borrar/:id', (req: Request, res: Response) => {
  const deletedProduct = Utils.deleteProduct(Number(req.params.id));
  res.send(deletedProduct);
});