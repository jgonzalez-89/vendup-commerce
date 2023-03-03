import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
import { HttpHandler } from '../../../http/handler.js';

const handler = new HttpHandler();

const Stripepremium = ({ userId, buyerUser, selectedProductId }) => {
  const [monto, setMonto] = useState(0.99);
  const [product, setProduct] = useState({});
  // const [productId, setProductId] = useState(30);

  useEffect(() => {
    async function getProduct() {
      const { product } = await handler.getProductById(selectedProductId);
      setProduct(product);
    }

    if (selectedProductId) {
      getProduct();
    }
  }, [selectedProductId]);

  // console.log(selectedProductId);
  // console.log(product);

  const manejarPago = async (token) => {
    try {
      const data = await handler.postStripePayment({
        stripeToken: token.id,
        monto: monto,
        owner_id: userId,
        product_id: buyerUser.products.id,
      });
      if (data.status === 'success') {
        const payload = {
          id: selectedProductId,
          category: product.category,
          created_at_product: product.created_at_product,
          description: 'me cago en todo',
          images: product.images,
          name: product.name,
          owner_id: product.owner_id,
          premium: true,
          price: product.price,
          status_shooping: true,
        };
        // console.log('payload:', payload);
        const response = await handler.putProductById(selectedProductId, payload);

        alert('El pago se ha procesado correctamente. Será redirigido a la página de usuario.');
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
        description={'Usuario Premium'}
        currency="EUR"
        email={buyerUser.email}
        image={buyerUser.profile_picture}
        billingAddress={true}
        shippingAddress={true}
        locale="es"
        allowRememberMe={true}
      >
        <Button className="w-100 d-grid" variant="warning" size="lg">
          Pagar
        </Button>
      </StripeCheckout>
    </div>
  );
};

const PremiumComponent = ({ userId }) => {
  const [buyerUser, setBuyerUser] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);

  // console.log(buyerUser)

  useEffect(() => {
    async function getUser() {
      const { user } = await handler.getUserById(userId);
      setBuyerUser(user);
      // console.log(user);
    }
    getUser();
  }, []);

  // Filtra los productos que tienen la propiedad `premium` establecida en `false`
  const products = buyerUser.products ? buyerUser.products.filter((product) => !product.premium) : [];

  // Maneja los cambios en el formulario
  const handleSelectChange = (event) => {
    setSelectedProductId(event.target.value);
  };

  return (
    <div>
      <header>
        <Container>
          <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 className="display-4 fw-normal">Pricing</h1>
            <p className="fs-5 text-muted">
              Quickly build an effective pricing table for your potential customers with this Bootstrap example. Its built with default Bootstrap components and utilities with
              little customization.
            </p>
          </div>
        </Container>
      </header>
      <main>
        <Container>
          <Row className="row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center gap-4">
            {/* Formulario de productos */}
            <Col>
              <Card className="h-100 mb-4 rounded-3 shadow-sm">
                <Card.Header>
                  <h4 className="my-0 fw-normal">Gratis</h4>
                </Card.Header>
                <Card.Body>
                  <Card.Title className="pricing-card-title">
                    <h1>€0</h1>
                  </Card.Title>
                  <ul className="list-unstyled mt-3 mb-4">
                    {/* <li>1 products included</li> */}
                    <li>Publicado por 5 días</li>
                    <li>Soporte de correo electrónico</li>
                    <li>Acceso al centro de ayuda</li>
                  </ul>
                  <Button className="w-100 d-grid" variant="outline-warning" size="lg" disabled>
                    Para todos los usuarios
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Tarjeta de precio */}
            <Col>
              <Card className="h-100 mb-4 rounded-3 shadow border-warning">
                <Card.Header className="text-bg-primary border-warning bg-warning">
                  <h4 className="my-0 fw-normal">Premium</h4>
                </Card.Header>
                <Card.Body>
                  <Card.Title className="pricing-card-title">
                    <h1>
                      0.99€<small className="text-muted fw-light">/prod</small>
                    </h1>
                  </Card.Title>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>Su anuncio se muestra primero</li>
                    <li>Publicado por 15 días</li>
                    <li>Soporte telefónico y por correo electrónico</li>
                    <li>Acceso al centro de ayuda</li>
                    <br />
                    <Form.Select aria-label="Default select example" onChange={(event) => setSelectedProductId(event.target.value)}>
                      <option>Selecciona un Producto</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </Form.Select>
                  </ul>
                  <Stripepremium userId={userId} buyerUser={buyerUser} selectedProductId={selectedProductId} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default PremiumComponent;
