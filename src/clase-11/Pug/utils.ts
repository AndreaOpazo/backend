import data, { Product } from './data';

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

export default Utils;