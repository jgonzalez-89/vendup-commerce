import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext.js';
import { Card, Modal, ListGroup, Button } from 'react-bootstrap';
import { HttpHandler } from '../../../http/handler';
import Header from '../component/NavbarUser.jsx';
import FormularioDePago from '../component/Stripe.jsx';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const Payment = () => {
  const token = Cookies.get('access_token');
  const decoded = jwt_decode(token);
  const { store } = useContext(Context);
  const { selectedProduct } = store;
  const [sellerData, setSellerData] = useState({
    dob_date: '',
    email: '',
    is_premium: '',
    location_city: '',
    location_country: '',
    location_postcode: '',
    location_state: '',
    name: '',
    password: '',
    phone: '',
    products: '',
    profile_picture: '',
    purchases: '',
    registered_date: '',
    surnames: '',
  });

  const [productData, setProductData] = useState({});
  const sellerId = selectedProduct.owner_id;
  const handler = new HttpHandler();

  useEffect(() => {
    async function fetchData() {
      const result = await handler.getUserById(sellerId);
      setSellerData(result);
    }
    fetchData();
  }, [sellerId]);

  useEffect(() => {
    setProductData(selectedProduct);
  }, [selectedProduct]);

  const Logout = () => {
    try {
      Cookies.remove('access_token');
      window.location.href = '/'; // redirect to home page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  console.log('Datos del vendedor:', sellerData.user);
  console.log('Datos del producto:', productData);

  return (
    <>
      <Header NavUser={'/user'} NavHome={'/'} NavProducts={'/products'} onClickLogOut={Logout} />
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px auto' }}>Cesta de la compra</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '50%', maxWidth: '400px', margin: '20px auto' }}>
          {sellerData.user ? (
            <Card>
              <Card.Header className="text-bg-primary">
                <h4 className="my-0 fw-normal text-center">Vendedor</h4>
              </Card.Header>
              <Card.Img
                variant="top"
                src={sellerData.user.profile_picture}
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #FEBD2F',
                }}
              />
              <Card.Body>
                <Card.Title>
                  {sellerData.user.name} {sellerData.user.surnames}
                </Card.Title>
                <Card.Text>Email: {sellerData.user.email}</Card.Text>
                <Card.Text>Teléfono: {sellerData.user.phone}</Card.Text>
                <Card.Text>
                  {sellerData.user.location_city}, {sellerData.user.location_country}
                </Card.Text>
                <Card.Text>
                  Ciudad: {sellerData.user.location_city}, Código postal: {sellerData.user.location_postcode}, País: {sellerData.user.location_country}
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <div className="d-flex justify-content-center m-5">
              <h1>No se encontraron datos del vendedor.</h1>
            </div>
          )}
        </div>
        <div style={{ width: '50%', maxWidth: '400px', margin: '20px auto' }}>
          {productData ? (
            <Card>
              <Card.Img variant="top" src={productData.images} style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{productData.name}</Card.Title>
                <Card.Text style={{ maxHeight: '150px', overflow: 'hidden' }}>{productData.description}</Card.Text>
                <ListGroup className="list-group-flush">
                  <hr />
                  <ListGroup.Item>Precio: {productData.price} €</ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <small className="text-muted"></small>
                <FormularioDePago store={store} />
              </Card.Footer>
            </Card>
          ) : (
            <div className="d-flex justify-content-center m-5">
              <h1>No se ha seleccionado ningún producto.</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;

// <Card style={{ width: '18rem' }}>
// <Card.Img variant="top" src={props.profile_picture} />
// <Card.Body>
//   <Card.Title>{props.name} {props.surnames}</Card.Title>
//   <Card.Text>
//     Email: {props.email}
//   </Card.Text>
//   <Card.Text>
//     Fecha de nacimiento: {props.dob_date}
//   </Card.Text>
//   <Card.Text>
//     Teléfono: {props.phone}
//   </Card.Text>
//   <Card.Text>
//     Ciudad: {props.location_city}, Código postal: {props.location_postcode}, País: {props.location_country}
//   </Card.Text>
// </Card.Body>
// </Card>

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
