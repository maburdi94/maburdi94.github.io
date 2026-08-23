const fs = require('node:fs/promises');
const path = require('node:path');

const productsFile = path.join(__dirname, 'products.json');

async function getAllProducts() {
  const file = await fs.readFile(productsFile, 'utf8');
  return JSON.parse(file);
}

async function findProductById(id) {
  const products = await getAllProducts();
  return products.find((product) => product.id === Number(id));
}

module.exports = {
  getAllProducts,
  findProductById
};
