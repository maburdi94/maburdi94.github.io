const productRepository = require('../data/productRepository');

async function listProducts(category) {
  const products = await productRepository.getAllProducts();
  if (!category || category === 'all') return products;
  return products.filter((product) => product.category === category);
}

async function listCategories() {
  const products = await productRepository.getAllProducts();
  return [...new Set(products.map((product) => product.category))];
}

async function previewCart(items) {
  if (!Array.isArray(items)) {
    const error = new Error('items must be an array.');
    error.statusCode = 400;
    throw error;
  }

  const lineItems = await Promise.all(items.map(async (item) => {
    const product = await productRepository.findProductById(item.productId);
    if (!product) {
      const error = new Error(`Product ${item.productId} was not found.`);
      error.statusCode = 404;
      throw error;
    }

    const quantity = Math.max(1, Number(item.quantity) || 1);
    return { ...product, quantity, lineTotal: product.price * quantity };
  }));

  return {
    items: lineItems,
    itemCount: lineItems.reduce((total, item) => total + item.quantity, 0),
    subtotal: lineItems.reduce((total, item) => total + item.lineTotal, 0)
  };
}

function subscribeToNewsletter(email) {
  if (!email || !String(email).includes('@')) {
    const error = new Error('A valid email is required.');
    error.statusCode = 400;
    throw error;
  }
  return { subscribed: true, email };
}

module.exports = {
  listProducts,
  listCategories,
  previewCart,
  subscribeToNewsletter
};
