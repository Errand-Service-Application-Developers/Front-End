// Update cart item quantity
const updateCartItem = (cartId, itemId, quantity) =>
  client.patch(`/carts/${cartId}/items/${itemId}/`, { quantity });

// Remove item from cart
const removeItemFromCart = (cartId, itemId) =>
  client.delete(`/carts/${cartId}/items/${itemId}/`);
// Get cart details by cart id
const getCart = (cartId) =>
  client.get(`/carts/${cartId}/`);
// Cart API for interacting with the backend cart endpoints
import client from './client';

// Get or create a cart for a customer
const getOrCreateCart = (customerId) =>
  client.get(`/customers/${customerId}/cart/`);

// Add an item to a cart
const addItemToCart = (cartId, productId, quantity) =>
  client.post(`/carts/${cartId}/items/`, {
    product_id: productId,
    quantity,
  });

export default {
  getOrCreateCart,
  addItemToCart,
  getCart,
  updateCartItem,
  removeItemFromCart,
};
