import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import { HttpHandler } from "../../../http/handler";

const VentasComponent = ({ userId }) => {
  const [userValue, setUserValue] = useState({});
  const handler = new HttpHandler();

  useEffect(() => {
    async function getUser() {
      const { user } = await handler.getUserById(userId);
      setUserValue(user);
    }

    getUser();
  }, []);

  return (
    <>
      {!userValue || !userValue.products ? (
        <div>Cargando...</div>
      ) : (
        <div className="container">
          <div className="row">
            <h1 className="text-center my-5">
              Estos son tus articulos en Venta
            </h1>
            {userValue.products.length === 0 ? (
              <div>Aún no has vendido nada</div>
            ) : (
              userValue.products.map((producto) => {
                const currentDate = new Date();
                const startDate = new Date(producto.created_at_product);
                startDate.setDate(startDate.getDate() + 3); // Agregar 3 días a la fecha de creación
                const timeDiff = startDate.getTime() - currentDate.getTime();
                const daysRemaining = Math.floor(
                  timeDiff / (1000 * 60 * 60 * 24)
                );
                const hoursRemaining = Math.floor(
                  (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );

                return (
                  <div
                    className="col-lg-4 col-md-6 col-12 my-1"
                    key={producto.id}
                  >
                    <Card>
                      <Card.Img
                        variant="top"
                        src={producto.images}
                        style={{height: "200px", width: "100%", objectFit: "cover",}}
                      />
                      <Card.Body>
                        <Card.Title>{producto.name}</Card.Title>
                        <Card.Text
                          style={{height: "150px", maxHeight: "150px", overflow: "hidden",}}
                        >
                          {producto.description}
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                          <hr />
                          <ListGroup.Item>
                            Precio: {producto.price} €
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                      <Card.Footer className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          {daysRemaining > 0
                            ? `${daysRemaining} días y ${hoursRemaining} horas restantes`
                            : "Venta Finalizada"}
                        </small>
                        <Button variant="warning">Editar +</Button>
                      </Card.Footer>
                    </Card>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VentasComponent;

{
  /* <Card
                      style={{
                        width: "18rem",
                        height: "100%",
                        maxWidth: "400px",
                        overflow: "hidden",
                      }}
                      className="bg-light border-primary"
                    >
                      <Card.Img
                        variant="top"
                        src={producto.images}
                        style={{ height: "50%", objectFit: "cover" }}
                      />
                      <Card.Body style={{ height: "50%" }}>
                        <Card.Title
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {producto.name}
                        </Card.Title>
                        <Card.Text
                          style={{ maxHeight: "80px", overflow: "hidden" }}
                        >
                          {producto.description}
                        </Card.Text>
                        <Card.Text>Precio: {producto.price} €</Card.Text>
                        <Card.Text>
                          {daysRemaining > 0
                            ? `${daysRemaining} días restantes`
                            : "Venta Finalizada"}
                        </Card.Text>
                      </Card.Body>
                    </Card> */
}
