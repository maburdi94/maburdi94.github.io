const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();

router.get('/health', (request, response) => {
  response.json({ ok: true, service: 'grace-and-glow-mock-api' });
});

router.get('/products', shopController.getProducts);
router.get('/categories', shopController.getCategories);
router.post('/cart/preview', shopController.previewCart);
router.post('/newsletter', shopController.subscribeToNewsletter);

module.exports = router;
