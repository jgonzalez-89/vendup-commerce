import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Stripepremium from './StripePremium.jsx';

const PremiumComponent = ({userId}) => {
  // console.log(userId)

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
                    {/* <li>15 photos per product</li> */}
                    <li>Soporte telefónico y por correo electrónico</li>
                    <li>Acceso al centro de ayuda</li>
                  </ul>
                  <Stripepremium userId={userId} />
                  {/* <Button className="w-100 d-grid" variant="warning" size="lg">
                    Hire Premium
                  </Button> */}
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
