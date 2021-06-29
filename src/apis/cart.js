import API from './client';

// API interface for loading the user's cart
export const fetchOrCreateCart = async () => {
  try {
    const response = await API.get(`cart/mine/create`);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}
// API interface for loading the user's cart
export const fetchCartItemsByUser = async (cartId) => {
  try {
    const response = await API.get(`cart/mine`);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}

// API interface for adding a product to a user's cart
export const addToCart = async (productid, qty, cartid) => {
  try {
    console.log('in api function');
    console.log({ productid, qty, cartid });
    const response = await API.post(`cart/mine/items`, { productid, qty, cartid });

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}

// API interface for removing a product from a user's cart
export const removeFromCart = async (cartItemId) => {
  try {
    const response = await API.delete(`cart/mine/items/${cartItemId}`);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}

// API interface for checking out a user's cart
export const checkout = async (cartid, paymentInfo,userid) => {
  try {
    console.log('stemp 1');
    console.log({ userid,cartid, paymentInfo });
   // return { userid,cartid, paymentInfo };
    const response = await API.post(`cart/mine/checkout`, { userid,cartid, paymentInfo });

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}