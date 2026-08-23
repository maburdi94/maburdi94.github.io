async function requestJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
}

export function getProducts(category = 'all') {
  return requestJson(`/api/products?category=${encodeURIComponent(category)}`);
}

export function previewCart(items) {
  return requestJson('/api/cart/preview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items })
  });
}

export function subscribeToNewsletter(email) {
  return requestJson('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
}
