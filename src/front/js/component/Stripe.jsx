
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../../../../public/logowhite.png';
import { HttpHandler } from '../../../http/handler.js';

import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const Stripe = ({ store }) => {
  const token = Cookies.get('access_token');
  const decoded = jwt_decode(token);
  const userId = decoded.sub;

  const [buyerUser, setBuyerUser] = useState({});
  const [monto, setMonto] = useState(0);
  // const userId = store.selectedProduct.owner_id;
  const handler = new HttpHandler();
  const data = store.selectedProduct;

  // setMonto(data.price)

  useEffect(() => {
    // debugger;
    async function getUser() {
      const { user } = await handler.getUserById(userId);
      setBuyerUser(user);
      setMonto(data.price);
      // console.log(user);
    }

    getUser();
  }, []);

  console.log(data)

  const manejarPago = async (token) => {
    try {
      const data = await handler.postStripePayment({ stripeToken: token.id, monto: monto });
      console.log(data); // Agregar esta línea para imprimir los datos enviados
      if (data.status === 'success') {
        // Si el pago se procesó correctamente, crear un nuevo registro en la tabla Shopping_Product y redireccionar al usuario a /user
        const shoppingProductData = {
          owner_id: data.owner_id,
          product_id: data.id,
          status_shopping: 'active',
          created_at_shopping: new Date(),
          updated_at_shopping: new Date(),
          price: monto,
          status_paid: 'paid',
          paid_at: new Date(),
          purchase_method: 'stripe',
          commission: 0.1,
        };
      const data = await handler.postStripePayment({ stripeToken: token.id, monto: monto });
        await handler.postShoppingProduct(shoppingProductData);
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
        stripeKey="pk_test_51Mf8aTJwZ9bnrLE9UCzTjLIpqAEjnlQFYHAGwglPkNPYLRjfOE8wKus1ggkvtDTRAGz4lVMBANxmr2AT3KI8xJe80018srH0P7"
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

// -----------------------------------------------------------------------------------------------------------

// import React, { useState } from 'react';
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51Mf8aTJwZ9bnrLE9UCzTjLIpqAEjnlQFYHAGwglPkNPYLRjfOE8wKus1ggkvtDTRAGz4lVMBANxmr2AT3KI8xJe80018srH0P7");

// const PaymentForm = () => {
//   const [error, setError] = useState(null);
//   const stripe = useStripe();
//   const elements = useElements();

//   const cardStyle = {
//     style: {
//       base: {
//         color: "#32325d",
//         fontFamily: 'Arial, sans-serif',
//         fontSmoothing: "antialiased",
//         fontSize: "16px",
//         "::placeholder": {
//           color: "#32325d"
//         }
//       },
//       invalid: {
//         fontFamily: 'Arial, sans-serif',
//         color: "#fa755a",
//         iconColor: "#fa755a"
//       }
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const result = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (result.error) {
//       setError(result.error.message);
//     } else {
//       const paymentMethodId = result.paymentMethod.id;
//       // ...
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Card details
//         <CardElement options={cardStyle} />
//       </label>
//       {error && <div>{error}</div>}
//       <button disabled={!stripe}>Pagar</button>
//     </form>
//   );
// };

// const Stripe = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm />
//     </Elements>
//   );
// };

// export default Stripe;

// -----------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { Button, Form, Row, Col, Card } from "react-bootstrap";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import logo from "../../../../public/logowhite.png";
// import { HttpHandler } from "../../../http/handler";

// // const stripePromise = loadStripe("pk_test_51Mf8aTJwZ9bnrLE9UCzTjLIpqAEjnlQFYHAGwglPkNPYLRjfOE8wKus1ggkvtDTRAGz4lVMBANxmr2AT3KI8xJe80018srH0P7");

// const Stripe = ({ store }) => {
//   const [buyerUser, setBuyerUser] = useState({});
//   const [monto, setMonto] = useState(0);
//   const [nombre, setNombre] = useState("");
//   const [apellido, setApellido] = useState("");
//   const [email, setEmail] = useState("");
//   const [direccion, setDireccion] = useState("");
//   const [codigoPostal, setCodigoPostal] = useState("");
//   const [ciudad, setCiudad] = useState("");
//   const [provincia, setProvincia] = useState("");
//   const userId = store.selectedProduct.owner_id;
//   const handler = new HttpHandler();
//   const data = store.selectedProduct;

//   useEffect(() => {
//     async function getUser() {
//       const { user } = await handler.getUserById(userId);
//       setBuyerUser(user);
//     }
//     getUser();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const result = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//       billing_details: {
//         name: `${nombre} ${apellido}`,
//         email: email,
//         address: {
//           line1: direccion,
//           postal_code: codigoPostal,
//           city: ciudad,
//           state: provincia,
//           country: "US",
//         },
//       },
//     });
//     if (result.error) {
//       console.log(result.error.message);
//     } else {
//       const response = await fetch("/procesar_pago", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           payment_method: result.paymentMethod.id,
//           amount: monto * 100,
//         }),
//       });
//       const responseData = await response.json();
//       stripe.confirmCardPayment(responseData.client_secret).then((result) => {
//         if (result.error) {
//           console.log(result.error.message);
//         } else {
//           console.log("Payment processed successfully");
//           // Si el pago se procesó correctamente, hacer algo aquí
//         }
//       });
//     }
//   };

//   return (
//     <Elements stripe={stripePromise}>
//       <Card>
//         <Card.Body>
//           <Form onSubmit={handleSubmit}>
//             <Row>
//               <Col>
//                 <Form.Group controlId="formNombre">
//                   <Form.Label>Nombre</Form.Label>
//                   <Form.Control type="text" placeholder="Ingresa tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group controlId="formApellido">
//                   <Form.Label>Apellido</Form.Label>
//                   <Form.Control type="text" placeholder="Ingresa tu apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Form.Group controlId="formEmail">
//               <Form.Label>Correo electrónico</Form.Label>
//               <Form.Control type="email" placeholder="Ingresa tu correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
//             </Form.Group>
//             <Form.Group controlId="formDireccion">
//               <Form.Label>Dirección</Form.Label>
//               <Form.Control type="text" placeholder="Ingresa tu dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
//             </Form.Group>
//             <Row>
//               <Col>
//                 <Form.Group controlId="formCodigoPostal">
//                   <Form.Label>Código postal</Form.Label>
//                   <Form.Control type="text" placeholder="Ingresa tu código postal" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} required />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group controlId="formCiudad">
//                   <Form.Label>Ciudad</Form.Label>
//                   <Form.Control type="text" placeholder="Ingresa tu ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group controlId="formProvincia">
//                   <Form.Label>Provincia</Form.Label>
//                   <Form.Control type="text" placeholder="Ingresa tu provincia" value={provincia} onChange={(e) => setProvincia(e.target.value)} required />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Form.Group controlId="formCardElement">
//               <Form.Label>Información de la tarjeta</Form.Label>
//               <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
//             </Form.Group>
//             <Button variant="warning" type="submit">
//               Pagar
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Elements>
//   );
// };

// export default Stripe;

// const stripePromise = loadStripe("pk_test_51Mf8aTJwZ9bnrLE9UCzTjLIpqAEjnlQFYHAGwglPkNPYLRjfOE8wKus1ggkvtDTRAGz4lVMBANxmr2AT3KI8xJe80018srH0P7");
