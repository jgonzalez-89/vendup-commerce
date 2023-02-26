import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

const CardPremium = ({ image, title, description, price, onEditClick, item, button }) => {


  const currentDate = new Date();
  const startDate = new Date(item.created_at_product);
  startDate.setDate(startDate.getDate() + 3);
  const timeDiff = startDate.getTime() - currentDate.getTime();
  // const daysRemaining = Math.floor(timeDiff / (500 * 60 * 60 * 24));
  const daysRemainingPremium = Math.floor(timeDiff / (200 * 60 * 60 * 24));
  // const hoursRemaining = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const hoursRemainingPremium = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));


  return (
    <div className="mb-5">
      <Card className="rounded shadow-lg border-warning">
        <Card.Header className="text-bg-primary border-warning bg-warning">
          <h4 className="my-0 fw-normal text-center">Premium</h4>
        </Card.Header>
        <Card.Img
          variant="top"
          src={image}
          style={{
            height: '200px',
            width: '100%',
            objectFit: 'cover',
          }}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text
            style={{
              height: '150px',
              maxHeight: '150px',
              overflow: 'hidden',
            }}
          >
            {description}
          </Card.Text>
          <ListGroup className="list-group-flush">
            <hr />
            <ListGroup.Item>Precio: {price} €</ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            {daysRemainingPremium > 0 ? `${daysRemainingPremium} días y ${hoursRemainingPremium} horas restantes` : 'Venta Finalizada'}
          </small>
          <Button variant="warning" onClick={onEditClick} className="w-50 d-grid" size="lg">
            {button}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CardPremium;


{/* <Card className="shadow rounded">
  <Card.Header className="text-bg-primary border-warning bg-warning text-white py-5">
    <h2 className="my-0 fw-bold text-center">Producto Premium</h2>
  </Card.Header>
  <Card.Img variant="top" src={image} style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
  <Card.Body className="py-5">
    <Card.Title className="h3 mb-3">{title}</Card.Title>
    <Card.Text className="h5 text-muted mb-4">{description}</Card.Text>
    <ListGroup className="list-group-flush">
      <ListGroup.Item className="h3 font-weight-bold">Precio: {price} €</ListGroup.Item>
    </ListGroup>
  </Card.Body>
  <Card.Footer className="d-flex justify-content-between align-items-center bg-light">
    <small className="text-muted">
      {daysRemaining > 0 ? `${daysRemaining} días y ${hoursRemaining} horas restantes` : 'Venta Finalizada'}
    </small>
    <Button variant="warning" onClick={onEditClick} className="w-50 d-grid" size="lg">
      Editar +
    </Button>
  </Card.Footer>
</Card> */}



{
  /* <Card className="h-100 mb-4 rounded-3 shadow-sm border-warning">
<Card.Header className="text-bg-primary border-warning bg-warning">
  <h4 className="my-0 fw-normal">Enterprise</h4>
</Card.Header>
<Card.Body>
  <Card.Title className="pricing-card-title">
    <h1>
      €29<small className="text-muted fw-light">/mo</small>
    </h1>
  </Card.Title>
  <ul className="list-unstyled mt-3 mb-4">
    <li>Your ad is shown first</li>
    <li>30 products included</li>
    <li>15 photos per product</li>
    <li>Phone and email support</li>
    <li>Help center access</li>
  </ul>
  <Button className="w-100 d-grid" variant="warning" size="lg">
    Contact us
  </Button>
</Card.Body>
</Card> */
}
