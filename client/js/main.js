import { subscribeToNewsletter } from './api.js';
import { createCatalog } from './catalog.js';
import { createCart } from './cart.js';

const productGrid = document.getElementById('product-grid');
const cart = createCart({
  drawer: document.querySelector('.cart-drawer'),
  overlay: document.querySelector('.cart-overlay'),
  count: document.querySelector('.cart-count'),
  items: document.getElementById('cart-items'),
  total: document.getElementById('cart-total')
});

const catalog = createCatalog({
  productGrid,
  onAdd: (product, button) => cart.add(product, button)
});

function showLoadError(error) {
  productGrid.innerHTML = `<p class="empty-cart">${error.message}</p>`;
}

document.querySelector('.filter-bar').addEventListener('click', (event) => {
  const filterButton = event.target.closest('[data-filter]');
  if (!filterButton) return;
  document.querySelectorAll('[data-filter]').forEach((button) => button.classList.toggle('active', button === filterButton));
  catalog.render(filterButton.dataset.filter).catch(showLoadError);
});

document.addEventListener('click', (event) => {
  if (event.target.closest('[data-cart-open]')) cart.setOpen(true);
  if (event.target.closest('[data-cart-close]')) cart.setOpen(false);
  if (event.target.closest('.checkout-button')) cart.checkout().catch(showLoadError);
});

document.querySelector('.newsletter-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = event.target.querySelector('button');
  try {
    await subscribeToNewsletter(event.target.querySelector('input').value);
    button.textContent = 'Thank you';
  } catch {
    button.textContent = 'Try again';
  }
});

catalog.render().catch(showLoadError);
