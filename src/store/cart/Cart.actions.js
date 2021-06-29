import { createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, fetchCartItemsByUser, removeFromCart,checkout } from '../../apis/cart';

export const addItem = createAsyncThunk(
  'cart/addItem',
  async (data, thunkAPI) => {
    try {
        console.log('in actions file');
        const { product, quantity, cartid }  =  data;
        console.log('Productid : ' + product.id);
        console.log('cartid : ' + cartid);
        console.log('qty : ' + quantity);
      const response = await addToCart(product.id, quantity, cartid);
      const item = {
        ...product,
        cartItemId: response.id,
        quantity
      };
      return { item };
    } catch(err) {
      throw err;
    }
  }
);

export const loadCart = createAsyncThunk(
  'cart/loadCart',
  async (params, thunkAPI) => {
    try {
      const response = await fetchCartItemsByUser();
      return {
        cart: response
      }
    } catch(err) {
      throw err;
    }
  }
);

export const removeItem = createAsyncThunk(
  'cart/removeItem',
  async (cartItemId, thunkAPI) => {
    try {
      await removeFromCart(cartItemId);
      return {
        item: cartItemId
      }
    } catch(err) {
      throw err;
    }
  }
);
export const checkoutCart = createAsyncThunk(
  'cart/checkoutCart',
  async ({ cartid, paymentInfo ,userid }, thunkAPI) => {
    try {
      console.log({ cartid, paymentInfo ,userid });
      const response = await checkout(cartid, paymentInfo,userid);
      return {
        order: response
      }
    } catch(err) {
      throw err;
    }
  }
);