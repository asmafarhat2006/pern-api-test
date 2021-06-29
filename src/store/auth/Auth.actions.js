import { createAsyncThunk } from '@reduxjs/toolkit';
import { isLoggedIn, login } from '../../apis/auth';

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async (param, thunkAPI) => {
    try {
      const response = await isLoggedIn();

      return {
        userid: response.id,
        isAuthenticated: response ? true : false,
        cart:response.cart
      }
    } catch(err) {
      throw err;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials);
      return {
        userid: response.id,
        isAuthenticated: response ? true : false,
        cart:response.cart
      }
    } catch(err) {
      throw err;
    }
  }
);


