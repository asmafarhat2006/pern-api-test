import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus, loginUser } from './Auth.actions';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  userid : null,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Check login status success
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
       
        state.userid  = action.payload.userid;
       // alert(state.userid);
        state.isAuthenticated = action.payload.isAuthenticated;
       
      })
      // Login success
      .addCase(loginUser.fulfilled, (state, action) => {
       state.isAuthenticated = action.payload.isAuthenticated;
       state.userid  = action.payload.userid;
      console.log(state.userid);
      // alert('logged');
      })
      // Login failure
      .addCase(loginUser.rejected, (state, action) => {
        const { error } = action.payload;
        state.isAuthenticated = false;
        state.error = error;
      })
     
  }
});

export const selectuserid = (state) => state.auth.userid;
export const selectisAuthenticated = (state) => state.auth.isAuthenticated;

// Export reducer function by default
export default authSlice.reducer;