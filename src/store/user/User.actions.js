import { createAsyncThunk } from '@reduxjs/toolkit';
import {  register } from '../../apis/auth';



export const registerUser = createAsyncThunk(
  'users/createUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await register(credentials);
      return response;
    } catch(err) {
      throw err;
    }
  }
);
