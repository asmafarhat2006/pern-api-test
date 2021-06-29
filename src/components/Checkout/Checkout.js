import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripe = loadStripe("pk_test_516LYQmLYwAKG7FkwlJZxXXERFlfU6IhRf6XSrT4X1GipNnYT4PHUeATCtoricNb7NUrramfSl6B1mkXJr7fXSpqN00vViBhuP5");

function Checkout() {
  return (
    <Elements stripe={stripe}>
      <div style={{display: 'flex', backgroundColor: 'blue'}}>
        <CheckoutForm />
      </div>
    </Elements>
  );
}

export default Checkout;
