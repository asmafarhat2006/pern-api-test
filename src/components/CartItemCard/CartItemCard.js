import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';

import Incrementer from '../Incrementer/Incrementer';

import { removeItem } from '../../store/cart/Cart.actions';

import './CartItemCard.css';
import {updateQuantity} from '../../store/cart/Cart.reducers';
function CartItemCard(props) {

  const { cartitemid, name, price, qty, calculateTotalFn} = props;
  const [ quantity, setQuantity ] = useState(qty);

  const dispatch = useDispatch();

  function handleIncrement() {
    
    setQuantity(quantity + 1);
  
    dispatch(updateQuantity({id: cartitemid,quantity:quantity + 1}));
    calculateTotalFn();
  }

  function handleDecrement() {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);

    dispatch(updateQuantity({id: cartitemid,quantity:quantity - 1}));
    calculateTotalFn();
  }

  async function remove() {
    await dispatch(removeItem(cartitemid));
  }

  return (
    <>
      <div className="cart-item-container">
        <div className="cart-item-details">
          <img src="https://m.media-amazon.com/images/I/61fTX5TjAEL._UL1001_.jpg" alt="" style={{height: '100%', paddingRight: '10px'}} />
          <p>{name},</p><br/>
          <p>  Price : {price }</p>
        </div>
        <div className=".cart-item-interact">
          <Incrementer
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            value={quantity}
          />
          <Typography onClick={remove}>Remove</Typography>
        </div>
        <div className=".cart-item-price">
          <p>{`${price * quantity }`}</p>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default CartItemCard;
