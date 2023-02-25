import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';
import { Card, Modal, ListGroup, Button } from 'react-bootstrap';
import Header from '../component/NavbarUser.jsx';
import FormularioDePago from '../component/FormularioPago.jsx';

const ShoppingBasket = () => {
  const { store } = useContext(Context);
  const { selectedProduct } = store;

  useEffect(() => {
    // console.log(selectedProduct);
  }, [selectedProduct]);

  return (
    <>
      <Header NavUser={'/user'} NavHome={'/'} NavProducts={'/products'} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {selectedProduct ? (
          <div style={{ maxWidth: '400px', margin: '20px auto' }}>
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px auto' }}>Cesta de la compra</h1>

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
          <div className="d-flex justify-content-center m-5" style={{ height: '62vh' }}>
            <h1>No se ha seleccionado ningún producto.</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingBasket;
