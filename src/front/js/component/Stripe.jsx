import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
import { HttpHandler } from '../../../http/handler.js';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const Stripe = (props) => {
  const token = Cookies.get('access_token');
  const decoded = jwt_decode(token);
  const userId = decoded.sub;
  const [buyerUser, setBuyerUser] = useState({});
  const [monto, setMonto] = useState(0);
  const handler = new HttpHandler();
  const data = props.store.selectedProduct;

  // console.log('Desde data:', data);

  useEffect(() => {
    // debugger;
    async function getUser() {
      const { user } = await handler.getUserById(userId);
      setBuyerUser(user);
      setMonto(data.price);
    }

    getUser();
  }, []);

  const manejarPago = async (token) => {
    try {
      const data = await handler.postStripePayment({
        stripeToken: token.id,
        monto: monto,
        owner_id: userId,
        product_id: props.store.selectedProduct.id,
      });
      if (data.status === 'success') {
        const shoppingProductData = {
          owner_id: userId,
          product_id: props.store.selectedProduct.id,
          status_shopping: true,
          created_at_shopping: new Date(),
          updated_at_shopping: new Date(),
          price: monto,
          status_paid: 'paid',
          paid_at: new Date(),
          purchase_method: 'stripe',
          commission: 0.1,
        };
        await handler.postShoppingProduct(shoppingProductData);
        const updatedProduct = { ...props.store.selectedProduct, status_shooping: false };
        await handler.putProductById(updatedProduct.id, updatedProduct);
        alert('El pago se ha procesado correctamente. Será redirigido a la página de usuario.');
        window.location = '/user';
      } else {
        // Si el pago falló, mostrar un mensaje de error
        alert('Error al procesar el pago: ' + data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <StripeCheckout
        stripeKey={process.env.STRIPE_KEY}
        token={manejarPago}
        amount={monto * 100}
        name={buyerUser.name}
        description={data.name}
        currency="EUR"
        email={buyerUser.email}
        image={buyerUser.profile_picture}
        billingAddress={true}
        shippingAddress={true}
        locale="es"
        allowRememberMe={true}
      >
        <Button variant="warning">Pagar</Button>
      </StripeCheckout>
    </div>
  );
};

export default Stripe;
