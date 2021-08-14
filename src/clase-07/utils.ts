import fs from 'fs/promises';

export const getItems = async () => {
  try {
    const productsListFileContent = await fs.readFile('./productos.txt', 'utf-8');
    return JSON.parse(productsListFileContent);
  } catch (error) {
    return [];
  };
};

export const getQuantityProducts = async () => {
  const items = await getItems();
  return items.length;
};

export const getProduct = async () => {
  const items = await getItems();
  if (items.length > 0) {
    const randomItem = Math.floor(Math.random() * items.length);
    return items[randomItem];
  } else {
    return {};
  };
};