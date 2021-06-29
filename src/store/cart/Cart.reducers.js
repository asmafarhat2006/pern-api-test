import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus,loginUser } from '../auth/Auth.actions';
import {addItem,loadCart,removeItem} from '../cart/Cart.actions';

const initialState = {
 
    items:[]

};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

      updateQuantity(state,action){
        console.log(state.items);
        console.log(action.payload);
        const item = state.items.find(item => item.cartitemid === action.payload.id);
        console.log(item);
        item.qty = action.payload.quantity;
        console.log(item.qty);
        console.log('inside new reducer');
      }


  },
  extraReducers: (builder) => {
    builder
     
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { cart } = action.payload;
       Object.assign(state,cart);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state,cart);
      })
      .addCase(addItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.items.push(item);
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state,cart);
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.items = state.items.filter((product) => product.cartItemId !== item);
      })
     
  }
});
export const { updateQuantity }  = cartSlice.actions;
// Export reducer function by default
export default cartSlice.reducer;