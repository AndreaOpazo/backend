import data, { Product } from './data';

class Utils {
  static getAllProducts() {
    return data;
  };

  static getProductByID(id: number) {
    return data.find((product: Product) => product.id === id)
  };

  static saveProduct(product: Product) {
    const id = data.length + 1;
    product['id'] = id;
    data.push(product);
    return product;
  };
};

export default Utils;