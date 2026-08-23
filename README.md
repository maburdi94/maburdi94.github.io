# Grace & Glow mock shop

A minimal Christian gift shop template with a small Node backend and JSON mock database.

## Run locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## API

- `GET /api/health` - service status
- `GET /api/products` - all products
- `GET /api/products?category=candles` - products in one category
- `GET /api/categories` - available categories
- `POST /api/cart/preview` - validates cart items and calculates subtotal
- `POST /api/newsletter` - accepts `{ "email": "you@example.com" }`

Product records live in `server/data/products.json`. Add a product there and it becomes available through the catalog API and frontend filters.

## Backend layout

- `server/index.js` starts the HTTP server.
- `server/app.js` configures Express, JSON parsing, static files, and error handling.
- `server/routes/apiRoutes.js` defines API paths and HTTP methods.
- `server/controllers/shopController.js` translates HTTP requests into responses.
- `server/services/shopService.js` contains catalog, cart, and newsletter logic.
- `server/data/productRepository.js` reads product records from the mock database.
- `client/index.html` contains the page markup and `client/style.css` contains the styles.
- `client/js/api.js` owns browser-to-API requests.
- `client/js/catalog.js` owns product loading and catalog rendering.
- `client/js/cart.js` owns cart state, rendering, and checkout preview.
- `client/js/main.js` composes the frontend modules and page events.
