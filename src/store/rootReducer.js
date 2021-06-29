import { combineReducers } from 'redux';
import authReducer from './auth/Auth.reducers';
import CartReducers from './cart/Cart.reducers';
import productsReducers from './products/Products.reducers';
import userReducer from './user/User.reducers';
import orderReducer from './orders/Orders.reducers';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  products:productsReducers,
  cart:CartReducers,
  order: orderReducer

});