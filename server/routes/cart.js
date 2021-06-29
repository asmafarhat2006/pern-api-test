const express = require('express');
const router = express.Router();
const cartDB = require('../db/cartqueries');
const cartItemDB = require('../db/cartitemqueries');
const orderDB =  require('../db/orderqueries');
const orderItemDB = require('../db/orderitemqueries');
const { ContactSupportOutlined } = require('@material-ui/icons');
const Stripe = require('stripe');



 
  router.get('/mine', cartDB.getCartByUserId)
  router.get('/mine/create', cartDB.createCart)
  router.get('/:id',cartDB.getCartById)
  router.get('/mine/items/:id', cartItemDB.getCartItemsByCartId)
  router.post('/mine/items', cartItemDB.createCartItem)
  router.put('mine/items/:id', cartItemDB.updateCartItem)
  router.delete('mine/items/:id',cartItemDB.deleteCartItem)

  router.post('/mine/checkout', async (req, res, next) => {
    try {
    //  const userID = req.user;
      //console.log('userid : '  + userID);
      const { cartid, paymentInfo,userid } = req.body; 
      console.log(req.body);
      console.log('inside checkout func');
        // Init Stripe with secret key
        const stripe = Stripe('sk_test_JsmMOmE05df0oDgvSBuZCOl4');


        // Load cart items
        const cartItems = await cartItemDB.findByCartId(cartid);
          console.log(cartItems);
        // Generate total price from cart items
        const total = cartItems.reduce((total, item) => {
          return total += Number(item.price) * Number(item.qty);
        }, 0);
        

        // Generate initial order
        const Order = await orderDB.createOrderAsync(userid,total);
        const orderID = Order.id;
      //  var items=cartItems.map(el=>Object.values(el));
        for(let item of cartItems){
         await orderItemDB.createOrderItemsAsync(item,orderID);
        
        }
     
        // Make charge to payment method
        await stripe.charges.create({
          amount: total,
          currency: 'usd',
          source: paymentInfo.id,
          description: 'Codecademy Charge'
        })
  
        // On successful charge to payment method, update order status to COMPLETE
        const order = await orderDB.updateOrderStatus('COMPLETE',orderID);
        res.status(200).send(order);
    } catch(err) {
      next(err);
    }
  });

module.exports = router;