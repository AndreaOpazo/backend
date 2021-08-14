import express, { Request, Response } from 'express';
import { getItems, getProduct, getQuantityProducts } from './utils';

const app = express();
const port = 8080;
const server = app.listen(port, () => {
  console.info(`Servidor inicializado en puerto ${port}`);
});
let quantityItems = 0;
let quantityItem = 0;

server.on("error", (error: Error) => {
  console.error(`Error en servidor ${error}`);
});

app.get('/items', async (_: Request, response: Response) => {
  ++quantityItems;
  response.json({
    items: await getItems(),
    cantidad: await getQuantityProducts()
  });
});

app.get('/item-random', async (_: Request, response: Response) => {
  ++quantityItem;
  response.json({
    item: await getProduct()
  });
});

app.get('/visitas', (_: Request, response: Response) => {
  response.json({
    visitas: {
      items: quantityItems,
      item: quantityItem
    }
  });
});