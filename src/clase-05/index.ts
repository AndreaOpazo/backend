import { createServer, IncomingMessage ,ServerResponse } from "http";

const getRandomNumber = (minimo: number, maximo: number) => Math.random() * (maximo - minimo) + minimo;

const server = createServer((_: IncomingMessage, response: ServerResponse) => {
  const id = Math.round(getRandomNumber(1, 10));
  const product = {
    id,
    title: `Producto ${id}`,
    price: Number(getRandomNumber(0.00, 9999.99).toFixed(2)),
    thumbnail: `Foto ${id}`,
  };
  response.end(JSON.stringify(product));
});

const port = 4000;
server.listen(port, () => {
  console.log(`Servidor escuchando en ${port}`);
});