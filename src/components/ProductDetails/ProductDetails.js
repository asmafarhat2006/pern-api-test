import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import Incrementer from '../../components/Incrementer/Incrementer';

import { loadProduct } from '../../store/products/Products.actions';
import { addItem } from '../../store/cart/Cart.actions';
import './ProductDetails.css';



function ProductDetails() {

  const { productId } = useParams();

  const [ quantity, setQuantity ] = useState(1);
  
  const product = useSelector(state => state.products[productId]);
  const dispatch = useDispatch();
  const cartid = useSelector(state => state.cart).id;
console.log('cartid ' + cartid);
  const [ heroImg, setHeroImg ] = useState("https://elcopcbonline.com/photos/product/4/176/4.jpg")

  useEffect(() => {
      (async function load() {
        await dispatch(loadProduct(productId))
      })();
    
  }, [dispatch, productId]);

  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  function handleDecrement() {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  }

  async function handleAddToCart() {
    console.log('Added to cart' + quantity);
    await dispatch(addItem({product, quantity, cartid}));
  }

  return (
    <section className="product-details-container">
      <div className="product-img-container">
        <div className="product-hero-img">
          <img className="hero-img" src={heroImg} alt="" />
        </div>
        <div className="product-img-bar">
          <div className="alt-product-img-container" onClick={() => {setHeroImg("https://elcopcbonline.com/var/photo/product/2000x4000/53/225/8.jpg")}}>
            <img style={{maxWidth: '100%', maxHeight: '100%'}} src={"https://elcopcbonline.com/var/photo/product/2000x4000/53/225/8.jpg"} alt=""/>
          </div>
          <div className="alt-product-img-container" onClick={() => {setHeroImg("https://elcopcbonline.com/var/photo/product/2000x4000/39/211/9.jpg")}}>
            <img style={{maxWidth: '100%', maxHeight: '100%'}} src={"https://elcopcbonline.com/var/photo/product/2000x4000/39/211/9.jpg"} alt=""/>
          </div>
          <div className="alt-product-img-container" onClick={() => {setHeroImg("https://elcopcbonline.com/var/photo/product/234x200/76/248/1.jpg")}}>
            {/* <img style={{maxWidth: '100%', maxHeight: '100%'}} src={"https://elcopcbonline.com/var/photo/product/234x200/76/248/1.jpg"}/> */}
          </div>
          <div className="alt-product-img-container" onClick={() => {setHeroImg("https://elcopcbonline.com/var/photo/product/2000x4000/41/213/11.jpg")}}>
            <img style={{maxWidth: '100%', maxHeight: '100%'}} src={"https://elcopcbonline.com/var/photo/product/2000x4000/41/213/11.jpg"} alt=""/>
          </div>
        </div>
      </div>
      <div className="product-info-container">
        { product &&
          <>
            <Typography variant="h3">{product?.name}</Typography>
            <Typography variant="h6">{product?.description}</Typography>
            <Typography variant="h6">£{product?.price }</Typography>
            <Incrementer
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              value={quantity}
            />
            <Button type="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>
          </>
        }
      </div>
    </section>
  );
}

export default ProductDetails;