import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const CardPremium = ({ image, title, description, price, onEditClick, item, actionButton, onBuyClick, onAlertClick }) => {
  const currentDate = new Date();
  const startDate = new Date(item.created_at_product);
  startDate.setDate(startDate.getDate() + 3);
  const timeDiff = startDate.getTime() - currentDate.getTime();
  const daysRemainingPremium = Math.floor(timeDiff / (200 * 60 * 60 * 24));
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
            {daysRemainingPremium > 0
              ? `${daysRemainingPremium} días y ${hoursRemainingPremium} horas restantes`
              : 'Venta Finalizada'}
          </small>
          <div>
            {actionButton === 'Comprar' && (
              <Button variant="warning" onClick={onBuyClick} as={NavLink} to="/pay" className="d-grid" size="lg">
                {actionButton}
              </Button>
            )}
            {actionButton === 'Editar' && (
              <Button variant="warning" onClick={onEditClick} className="d-grid" size="lg">
                {actionButton}
              </Button>
            )}
            {actionButton === 'Comprar+' && (
              <Button variant="warning" onClick={onAlertClick} className="d-grid" size="lg">
                {actionButton}
              </Button>
            )}
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CardPremium;