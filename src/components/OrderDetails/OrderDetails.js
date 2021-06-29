import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';


import { loadOrder } from '../../store/orders/Orders.actions';
import OrderItemCard  from '../OrderItemCard/OrderItemCard';
import './OrderDetails.css';



function OrderDetails() {

  const { orderId } = useParams();
 
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  const [ heroImg, setHeroImg ] = useState("https://elcopcbonline.com/photos/product/4/176/4.jpg")

  useEffect(() => {
      (async function load() {
        const response =  await dispatch(loadOrder(orderId))
        console.log(response);
        setItems(response.payload);
    
      })();
    
  }, [dispatch, orderId]);

  console.log(items);

  return (
    <>
    <section className="order-details-container">
      <div className="order-info-container">
        <p style={{fontSize: 40, color: 'black'}}>Order Details</p>
        <div className="order-info-header">
          <div className="details">
            <Typography variant="h6">
              Product Details
            </Typography>
          </div>
          <div className="qty">
            <Typography variant="h6">
              Qty
            </Typography>
          </div>
          <div className="price">
            <Typography variant="h6">
              Total
            </Typography>
          </div>
        </div>
        {
          items.map(item => {
            return (
              <OrderItemCard key = {item.id} {...item}  />
            )
          })
        }
      </div>
     
    </section>
    </>
  );
}

export default OrderDetails;