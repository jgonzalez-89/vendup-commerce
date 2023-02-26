import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const PremiumComponent = () => {
  return (
    <div>
      <header>
        <Container>
          <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 className="display-4 fw-normal">Pricing</h1>
            <p className="fs-5 text-muted">
              Quickly build an effective pricing table for your potential customers with this Bootstrap example. Its
              built with default Bootstrap components and utilities with little customization.
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
                  <h4 className="my-0 fw-normal">Free</h4>
                </Card.Header>
                <Card.Body>
                  <Card.Title className="pricing-card-title">
                    <h1>
                      €0<small className="text-muted fw-light">/mo</small>
                    </h1>
                  </Card.Title>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>10 products included</li>
                    <li>Posted by 5 days</li>
                    <li>Email support</li>
                    <li>Help center access</li>
                  </ul>
                  <Button className="w-100 d-grid" variant="outline-warning" size="lg" disabled>
                    To all users
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="h-100 mb-4 rounded-3 shadow-sm border-warning">
                <Card.Header className="text-bg-primary border-warning bg-warning">
                  <h4 className="my-0 fw-normal">Enterprise</h4>
                </Card.Header>
                <Card.Body>
                  <Card.Title className="pricing-card-title">
                    <h1>
                      3€<small className="text-muted fw-light">/mo</small>
                    </h1>
                  </Card.Title>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>Your ad is shown first</li>
                    <li>Posted by 15 days</li>
                    {/* <li>15 photos per product</li> */}
                    <li>Phone and email support</li>
                    <li>Help center access</li>
                  </ul>
                  <Button className="w-100 d-grid" variant="warning" size="lg">
                    Hire Premium
                  </Button>
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
