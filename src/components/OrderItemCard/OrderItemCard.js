import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


import './OrderItemCard.css';
function OrderItemCard(props) {

  const { name, price, qty} = props;
 
 return (
    <>
      <div className="order-item-container">
        <div className="order-item-details">
          <img src="https://m.media-amazon.com/images/I/61fTX5TjAEL._UL1001_.jpg" alt="" style={{height: '100%', paddingRight: '10px'}} />
          <p>{name},</p><br/>
          <p>  Price : {price }</p>
        </div>
      
        <div className="order-item-price">
          <p>{`${price * qty }`}</p>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default OrderItemCard;
