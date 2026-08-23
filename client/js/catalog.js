import { getProducts } from './api.js';

export function createCatalog({ productGrid, onAdd }) {
  let products = [];

  function productMarkup(product) {
    return `
      <article class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" />
          <span class="product-label">${product.label}</span>
        </div>
        <div class="product-details">
          <span class="product-category">${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-footer">
            <strong>$${product.price}</strong>
            <button class="add-button" type="button" data-add="${product.id}">Add to bag</button>
          </div>
        </div>
      </article>
    `;
  }

  async function render(category = 'all') {
    const data = await getProducts(category);
    products = data.products;
    productGrid.innerHTML = products.map(productMarkup).join('');
  }

  productGrid.addEventListener('click', (event) => {
    const addButton = event.target.closest('[data-add]');
    const product = products.find((item) => item.id === Number(addButton?.dataset.add));
    if (product) onAdd(product, addButton);
  });

  return { render };
}
