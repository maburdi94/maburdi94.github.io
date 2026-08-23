const shopService = require('../services/shopService');

async function getProducts(request, response) {
  const products = await shopService.listProducts(request.query.category);
  response.json({ products, count: products.length });
}

async function getCategories(request, response) {
  const categories = await shopService.listCategories();
  response.json({ categories });
}

async function previewCart(request, response) {
  const cart = await shopService.previewCart(request.body.items);
  response.json(cart);
}

function subscribeToNewsletter(request, response) {
  const subscription = shopService.subscribeToNewsletter(request.body.email);
  response.status(201).json(subscription);
}

module.exports = {
  getProducts,
  getCategories,
  previewCart,
  subscribeToNewsletter
};
