import { previewCart } from './api.js';

export function createCart(elements) {
  const cart = [];
  const { drawer, overlay, count, items, total } = elements;

  function render() {
    count.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    total.textContent = `$${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}`;

    if (!cart.length) {
      items.innerHTML = '<p class="empty-cart">Your cart is waiting for a little light.</p>';
      return;
    }

    items.innerHTML = cart.map((item) => `
      <article class="cart-item">
        <img src="${item.image}" alt="" />
        <div><h3>${item.name}</h3><p>$${item.price} · Qty ${item.quantity}</p><div class="quantity-controls"><button type="button" data-decrease="${item.id}" aria-label="Decrease quantity">−</button><button type="button" data-increase="${item.id}" aria-label="Increase quantity">+</button><button type="button" class="remove-button" data-remove="${item.id}">Remove</button></div></div>
      </article>
    `).join('');
  }

  function add(product, button) {
    const existingItem = cart.find((item) => item.id === product.id);
    existingItem ? existingItem.quantity += 1 : cart.push({ ...product, quantity: 1 });
    render();
    button.textContent = 'Added';
    window.setTimeout(() => { button.textContent = 'Add to bag'; }, 900);
  }

  function changeQuantity(id, amount) {
    const item = cart.find((entry) => entry.id === id);
    if (!item) return;
    item.quantity += amount;
    if (item.quantity < 1) cart.splice(cart.indexOf(item), 1);
    render();
  }

  function remove(id) {
    const itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex !== -1) cart.splice(itemIndex, 1);
    render();
  }

  function setOpen(isOpen) {
    drawer.classList.toggle('is-open', isOpen);
    overlay.classList.toggle('is-visible', isOpen);
    drawer.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('cart-is-open', isOpen);
  }

  items.addEventListener('click', (event) => {
    const increase = event.target.closest('[data-increase]');
    const decrease = event.target.closest('[data-decrease]');
    const removeButton = event.target.closest('[data-remove]');
    if (increase) changeQuantity(Number(increase.dataset.increase), 1);
    if (decrease) changeQuantity(Number(decrease.dataset.decrease), -1);
    if (removeButton) remove(Number(removeButton.dataset.remove));
  });

  async function checkout() {
    if (!cart.length) return;
    const data = await previewCart(cart.map((item) => ({ productId: item.id, quantity: item.quantity })));
    window.alert(`Order preview: $${data.subtotal}`);
  }

  render();
  return { add, checkout, setOpen };
}
