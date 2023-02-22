import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { HttpHandler } from '../../../http/handler';

const ComprasComponent = ({ userId }) => {
  const [userValue, setUserValue] = useState({});
  const handler = new HttpHandler();

  useEffect(() => {
    // debugger;
    async function getUser() {
      const { user } = await handler.getUserById(userId);
      setUserValue(user);
      // console.log(user);
    }

    getUser();
  }, []);

  return (
    <>
      {!userValue || !userValue.shopping_products ? (
        <div>Cargando...</div>
      ) : (
        <div className="container">
          <div className="row">
            <h1 className="text-center my-5">Estos son tus articulos Comprados</h1>
            {userValue.shopping_products.length === 0 ? (
              <div className="de-flex text-center">
                <h1>Aún no has comprado nada</h1>
              </div>
            ) : (
              userValue.shopping_products.map((producto) => (
                <div className="col-sm-4 my-1" key={producto.id}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={producto.images}
                      style={{
                        height: '200px',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{producto.name}</Card.Title>
                      <Card.Text
                        style={{
                          height: '150px',
                          maxHeight: '150px',
                          overflow: 'hidden',
                        }}
                      >
                        {producto.description}
                      </Card.Text>
                      <ListGroup className="list-group-flush">
                        <hr />
                        <ListGroup.Item>Precio: {producto.price} €</ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        Aqui va algo, quizas cuando se compró!
                        {/* {daysRemaining > 0
                            ? `${daysRemaining} días y ${hoursRemaining} horas restantes`
                            : "Venta Finalizada"} */}
                      </small>
                      {/* <Button variant="warning">Editar +</Button> */}
                    </Card.Footer>
                  </Card>
                  {/* <Card style={{ width: "18rem", height: "100%" }}>
                  <Card.Img
                    variant="top"
                    src={producto.images}
                    style={{ height: "50%" }}
                  />
                  <Card.Body style={{ height: "50%" }}>
                    <Card.Title>{producto.name}</Card.Title>
                    <Card.Text>{producto.description}</Card.Text>
                    <Card.Text>Precio: {producto.price} €</Card.Text>
                  </Card.Body>
                </Card> */}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ComprasComponent;
