import React, { useState, useEffect, useContext } from 'react';
import { Card, Modal, ListGroup, Button } from 'react-bootstrap';

const CardFree = ({ image, title, description, price, onEditClick, item, button }) => {
  
  const currentDate = new Date();
  const startDate = new Date(item.created_at_product);
  startDate.setDate(startDate.getDate() + 3);
  const timeDiff = startDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.floor(timeDiff / (500 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <div className="mb-5">
      <Card>
        <Card.Header className="bg-secondary bg-opacity-10">
          <h4 className="my-0 fw-normal text-center">Free</h4>
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
            {daysRemaining > 0 ? `${daysRemaining} días y ${hoursRemaining} horas restantes` : 'Venta Finalizada'}
          </small>
          <Button variant="secondary" onClick={onEditClick} className="w-50 d-grid" size="lg">
            {button}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CardFree;
