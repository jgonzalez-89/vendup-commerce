import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';
import { Card, Modal, ListGroup, Button } from 'react-bootstrap';
import Header from '../component/NavbarUser.jsx';

const ShoppingBasket = () => {
    const { store } = useContext(Context);
    const { selectedProduct } = store;
  
    useEffect(() => {
      console.log(selectedProduct);
    }, [selectedProduct]);
  
    return (
    <>
    <Header />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {selectedProduct ? (
          <div style={{ maxWidth: "400px", margin: "20px auto" }}>
            <Card>
              <Card.Img
                variant="top"
                src={selectedProduct.images}
                style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{selectedProduct.name}</Card.Title>
                <Card.Text
                  style={{ maxHeight: "150px", overflow: "hidden" }}
                >
                  {selectedProduct.description}
                </Card.Text>
                <ListGroup className="list-group-flush">
                  <hr />
                  <ListGroup.Item>Precio: {selectedProduct.price} €</ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  {/* {daysRemaining > 0
                        ? `${daysRemaining} días y ${hoursRemaining} horas restantes`
                        : "Venta Finalizada"} */}
                </small>
                {/* <Button
                      variant="warning"
                      onClick={() => handleEditClick(producto)}
                    >
                      Editar +
                    </Button> */}
              </Card.Footer>
            </Card>
          </div>
        ) : (
          <p>No se ha seleccionado ningún producto.</p>
        )}
      </div>
      </>
    );
  };

export default ShoppingBasket;
