import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';
import { Card, Modal, ListGroup, Button } from 'react-bootstrap';
import Header from '../component/NavbarUser.jsx';
import FormularioDePago from '../component/Stripe.jsx';

const Payment = () => {
  const { store } = useContext(Context);
  const { selectedProduct } = store;

  useEffect(() => {
    // console.log(selectedProduct);
  }, [selectedProduct]);

  return (
    <>
      <Header NavUser={'/user'} NavHome={'/'} NavProducts={'/products'} />
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px auto' }}>Cesta de la compra</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {selectedProduct ? (
          <div style={{ maxWidth: '400px', margin: '20px auto' }}>
            <Card>
              <Card.Img variant="top" src={selectedProduct.images} style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{selectedProduct.name}</Card.Title>
                <Card.Text style={{ maxHeight: '150px', overflow: 'hidden' }}>{selectedProduct.description}</Card.Text>
                <ListGroup className="list-group-flush">
                  <hr />
                  <ListGroup.Item>Precio: {selectedProduct.price} €</ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <small className="text-muted"></small>

                <FormularioDePago store={store} />

              </Card.Footer>
            </Card>
          </div>
        ) : (
          <div className="d-flex justify-content-center m-5">
            <h1>No se ha seleccionado ningún producto.</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Payment;

// import React, { useContext, useEffect, useState } from 'react';
// import { Context } from '../store/appContext.js';
// import { Card, Modal, ListGroup, Button } from 'react-bootstrap';
// import { Row, Col } from 'react-bootstrap';
// import Header from '../component/NavbarUser.jsx';
// import FormularioDePago from '../component/FormularioPago.jsx';

// const ProductDisplay = () => (
//   <section>
//     <div className="product">
//       <img src="https://i.imgur.com/EHyR2nP.png" alt="The cover of Stubborn Attachments" />
//       <div className="description">
//         <h3>Stubborn Attachments</h3>
//         <h5>$20.00</h5>
//       </div>
//     </div>
//     <form action="/stripe" method="POST">
//       <button type="submit">Checkout</button>
//     </form>
//   </section>
// );

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );

// const payment = () => {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get('success')) {
//       setMessage('Order placed! You will receive an email confirmation.');
//     }

//     if (query.get('canceled')) {
//       setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
//     }
//   }, []);

//   return message ? <Message message={message} /> : <ProductDisplay />;
// };

// export default payment;

// const payment = () => {
//   const { store } = useContext(Context);
//   const { selectedProduct } = store;

//   useEffect(() => {
//     // console.log(selectedProduct);
//   }, [selectedProduct]);

//   return (
//     <>
//       <Header NavUser={'/user'} NavHome={'/'} NavProducts={'/products'} />
//       <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px auto' }}>Cesta de la compra</h1>
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         {selectedProduct ? (
//           <>
//             <Row>
//               <Col md={6}>
//                 <div style={{ maxWidth: '400px', margin: '20px auto' }}>
//                   <section>
//                     <div className="product">
//                       <Card>
//                         <Card.Img variant="top" src={selectedProduct.images} style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} />
//                         <Card.Body>
//                           <Card.Title>{selectedProduct.name}</Card.Title>
//                           <Card.Text style={{ maxHeight: '150px', overflow: 'hidden' }}>{selectedProduct.description}</Card.Text>
//                           <ListGroup className="list-group-flush">
//                             <hr />
//                             <ListGroup.Item>Precio: {selectedProduct.price} €</ListGroup.Item>
//                           </ListGroup>
//                         </Card.Body>
//                         <Card.Footer className="d-flex justify-content-between align-items-center">
//                           <small className="text-muted"></small>
//                         </Card.Footer>
//                       </Card>
//                       {/* <img
//         src="https://i.imgur.com/EHyR2nP.png"
//         alt="The cover of Stubborn Attachments"
//       />
//       <div className="description">
//       <h3>Stubborn Attachments</h3>
//       <h5>$20.00</h5>
//       </div> */}
//                     </div>
//                     <form action="/pago" method="POST">
//                       <button type="submit">Checkout</button>
//                     </form>
//                   </section>
//                 </div>
//               </Col>
//               <Col md={6}>{/* <FormularioDePago store={store} /> */}</Col>
//             </Row>
//           </>
//         ) : (
//           <div className="d-flex justify-content-center m-5">
//             <h1>No se ha seleccionado ningún producto.</h1>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default payment;
