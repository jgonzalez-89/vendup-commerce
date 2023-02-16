import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { HttpHandler } from "../../../http/handler";

const VentasComponent = ({ userId }) => {
  const [userValue, setUserValue] = useState({});
  const handler = new HttpHandler();

  useEffect(() => {
    debugger;
    async function getUser() {
      const { user } = await handler.getUserById(userId);
      setUserValue(user);
      console.log(user);
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
              userValue.products.map((producto) => (
                <div className="col-sm-4 my-1" key={producto.id}>
                  <Card style={{ width: "18rem", height: "100%" }}>
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
                  </Card>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VentasComponent;

// const [user, setUser] = useState(null);

// useEffect(() => {
//   fetch("http://127.0.0.1:3001/api/users/2")
//     .then((response) => response.json())
//     .then((data) => {
//       setUser(data.user);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }, []);
