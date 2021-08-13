import fs from 'fs/promises';

class Archivo {
  constructor(name) {
    this.name = name;
  };

  static async leer() {
    try {
      const productsListFileContent = await fs.readFile('./productos.txt', 'utf-8');
      return JSON.parse(productsListFileContent);
    } catch (error) {
      return [];
    };
  };

  async guardar() {
    try {
      const productFileContent = await fs.readFile(this.name, 'utf-8');
      const productToSave = JSON.parse(productFileContent);
      const productsList = await Archivo.leer();
      const id = productsList.length + 1;
      productToSave['id'] = id;
      productsList.push(productToSave);
      await fs.writeFile('./productos.txt', JSON.stringify(productsList))
      console.log('Se guardo el archivo con exito!');
    } catch (error) {
      console.error("Se produjo un error al guardar el archivo.", error);;
    }
  };

  static async borrar() {
    try {
      await fs.unlink('./productos.txt')
      console.log('Archivo Eliminado');
    } catch (error) {
      console.error('Se produjo un error al eliminar el archivo.', error)
    }
  };
};

const firstProduct = new Archivo('./productos/producto1.txt');
const secondProduct = new Archivo('./productos/producto2.txt');
const thirdProduct = new Archivo('./productos/producto3.txt');
await firstProduct.guardar();
await secondProduct.guardar();
await thirdProduct.guardar();
console.log(await Archivo.leer());
Archivo.borrar();