import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
import { HttpHandler } from '../../../http/handler.js';

const Stripepremium = ({ userId }) => {
  const [buyerUser, setBuyerUser] = useState("");
  const [monto, setMonto] = useState('');
  const handler = new HttpHandler();

  console.log(buyerUser.products)

  useEffect(() => {
    async function getUser() {
      const { user } = await handler.getUserById(userId);
      setBuyerUser(user);
      setMonto(user.products.length)
      console.log(user)
    }
    getUser();
  }, []);

  const manejarPago = async (token) => {
    try {
      const data = await handler.postStripePayment({
        stripeToken: token.id,
        monto: monto,
        owner_id: userId,
        product_id: buyerUser.products.id,
      });
      if (data.status === 'success') {
        const updatedProducts = buyerUser.products.map((product) => {
          return { ...product, premium: true };
        });
        await handler.putProductsById(buyerUser.id, updatedProducts);
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
        amount={(monto * 100)* 0.99}
        name={buyerUser.name}
        description={"Usuario Premium"}
        currency="EUR"
        email={buyerUser.email}
        image={buyerUser.profile_picture}
        billingAddress={true}
        shippingAddress={true}
        locale="es"
        allowRememberMe={true}
      >
        <Button className="w-100 d-grid" variant="warning" size="lg">Pagar</Button>
      </StripeCheckout>
    </div>
  );
};

export default Stripepremium;