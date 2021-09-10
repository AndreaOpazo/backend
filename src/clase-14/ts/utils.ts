import data from './data';
import { Product } from './types';

class Utils {
  static getAllProducts() {
    return data;
  };

  static getProductByID(id: number) {
    return data.find((product: Product) => product.id === id)
  };

  static saveProduct(product: Product) {
    let id = 1;
    if (data.length) {
      const productIds = data.map(product => product.id);
      id = Math.max(...productIds) + 1;
    }
    product['id'] = id;
    data.push(product);
  };

  static updateProduct(product: Product, id: number) {
    const productIndexToUpdate = data.findIndex((product: Product) => product.id === id);
    if (productIndexToUpdate !== -1) {
      data[productIndexToUpdate] = {...product, id};
      return product;
    } else {
      return { error: 'Producto no encontrado.' };
    };
  };

  static deleteProduct(id: number) {
    const productIndexToDelete = data.findIndex((product: Product) => product.id === id);
    if (productIndexToDelete !== -1) {
      const productToDelete = data[productIndexToDelete];
      data.splice(productIndexToDelete, 1);
      return productToDelete;
    } else {
      return { error: 'Producto no encontrado.' };
    };
  };
};

export const getActualDate = () => {
  const date = new Date();

  let day: Number|String = date.getDate();
  if (day < 10) day = `0${day}`;

  let month: Number|String = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;

  const year = date.getFullYear();

  let hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
  let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  let seconds = (date.getSeconds() < 10 ? '0' : '' ) + date.getSeconds();
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export default Utils;