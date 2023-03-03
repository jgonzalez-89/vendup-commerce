import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
import { HttpHandler } from '../../../http/handler.js';

const Stripepremium = ({ userId }) => {
  const [buyerUser, setBuyerUser] = useState(null);
  const [monto, setMonto] = useState(3.99);
  const handler = new HttpHandler();

  console.log(buyerUser);

  useEffect(() => {
    async function getUser() {
      const { user } = await handler.getUserById(userId);
      setBuyerUser(user);
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
        const updatedProduct = { ...props.store.selectedProduct, premium: true };
        if (buyerUser && buyerUser.products) {
          updatedProduct.premium = true;
        }
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

  if (!buyerUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <StripeCheckout
        stripeKey={process.env.STRIPE_KEY}
        token={manejarPago}
        amount={monto * 100}
        name={buyerUser.name}
        description={buyerUser.products[0].name}
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

export default Stripepremium;