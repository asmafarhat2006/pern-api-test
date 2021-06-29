import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './User.actions';

const initialState = {
  isFetching: false,
  currentuser : null,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    //Registration pending
    .addCase(registerUser.pending, (state, action) => {
      state.isFetching = true;
    })  
    // Registration success
      .addCase(registerUser.fulfilled, (state, action) => {
         state.currentuser = action.payload;
         state.isFetching = false;
         
      })
      // Registration failure
      .addCase(registerUser.rejected, (state, action) => {
        const { error } = action.payload;
        state.error = error;
        state.isFetching = false;
      })
  }
});

export const selectCurrentUser = (state) => state.user.currentuser;

// Export reducer function by default
export default userSlice.reducer;