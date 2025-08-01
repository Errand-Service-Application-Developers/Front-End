import authStorage from '../auth/storage';
import client from './client';

// Shop API endpoints
const endpoints = {
    products: '/products/',
    collections: '/collections/', 
    carts: '/carts/',
    customers: '/customers/',
    orders: '/orders/'
};

// Products API
const getProducts = () => client.get(endpoints.products);
const getProduct = (id) => client.get(`${endpoints.products}${id}/`);
const getUserProducts = () => client.get(`${endpoints.products}me/`);
const updateProduct = (id, productData) => client.put(`${endpoints.products}${id}/`, productData);
const deleteProduct = (id) => client.delete(`${endpoints.products}${id}/`);

// Collections API  
const getCollections = () => client.get(endpoints.collections);
const getCollection = (id) => client.get(`${endpoints.collections}${id}/`);

// Cart API
const getCarts = () => client.get(endpoints.carts);
const createCart = () => client.post(endpoints.carts, {});
const getCart = (id) => client.get(`${endpoints.carts}${id}/`);
const deleteCart = (id) => client.delete(`${endpoints.carts}${id}/`);

// Cart Items API
const addToCart = async (cartId, productId, quantity = 1) => {
    return client.post(`${endpoints.carts}${cartId}/items/`, {
        product_id: productId,
        quantity: quantity
    });
};

const updateCartItem = (cartId, itemId, quantity) => {
    return client.patch(`${endpoints.carts}${cartId}/items/${itemId}/`, {
        quantity: quantity
    });
};

const removeFromCart = (cartId, itemId) => {
    return client.delete(`${endpoints.carts}${cartId}/items/${itemId}/`);
};

const getCartItems = (cartId) => client.get(`${endpoints.carts}${cartId}/items/`);

// Customers API
const getCustomers = () => client.get(endpoints.customers);
const createCustomer = (customer) => client.post(endpoints.customers, customer);
const getCustomer = (id) => client.get(`${endpoints.customers}${id}/`);
const getCustomerMe = () => client.get(`${endpoints.customers}me/`);
const updateCustomer = (id, customer) => client.put(`${endpoints.customers}${id}/`, customer);

// Orders API
const getOrders = () => client.get(endpoints.orders);
const createOrder = (orderData) => client.post(endpoints.orders, orderData);
const getOrder = (id) => client.get(`${endpoints.orders}${id}/`);
const updateOrder = (id, orderData) => client.patch(`${endpoints.orders}${id}/`, orderData);

// Helper function to get or create user's cart
const getUserCart = async () => {
    try {
        const user = await authStorage.getUser();
        if (!user) return null;

        // Try to get existing carts
        const cartsResponse = await getCarts();
        if (cartsResponse.ok && cartsResponse.data.length > 0) {
            // Return the first active cart
            return cartsResponse.data[0];
        }

        // Create a new cart if none exists
        const newCartResponse = await createCart();
        if (newCartResponse.ok) {
            return newCartResponse.data;
        }

        return null;
    } catch (error) {
        console.log('Error getting user cart:', error);
        return null;
    }
};

export default {
    // Products
    getProducts,
    getProduct,
    getUserProducts,
    updateProduct,
    deleteProduct,
    
    // Collections
    getCollections,
    getCollection,
    
    // Cart management
    getCarts,
    createCart,
    getCart,
    deleteCart,
    getUserCart,
    
    // Cart items
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartItems,
    
    // Customers
    getCustomers,
    createCustomer,
    getCustomer,
    getCustomerMe,
    updateCustomer,
    
    // Orders
    getOrders,
    createOrder,
    getOrder,
    updateOrder
};
