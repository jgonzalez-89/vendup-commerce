import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { HttpHandler } from '../../../http/handler';
import empy from '../../../../public/empy2.jpg';
import CardPremium from './CardPremium.jsx';

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
            <h1 className="text-center my-5">
              {userValue.shopping_products && userValue.shopping_products.length > 0
                ? 'Estos son tus articulos Comprados'
                : 'Aun no has comprado nada ...'}
            </h1>
            {userValue.shopping_products.length === 0 ? (
              <div>
                <div className="d-flex justify-content-center">
                  <img
                    width={400}
                    height={286}
                    className="align-self-center mr-3"
                    src={empy}
                    alt="Mi imagen"
                    style={{ borderRadius: '10%', boxShadow: '1px 2px 9px' }}
                  />
                </div>
              </div>
            ) : (
              userValue.shopping_products.map((item, index) => (
                <div className="col-sm-4 my-1 mb-5" key={index} >
                  <CardPremium
                    button={'Comprar'}
                    item={item}
                    image={item.images}
                    title={item.name}
                    description={item.description}
                    price={item.price}
                  />

                  {/* <Card>
                    <Card.Header className="text-bg-primary border-warning bg-warning">
                      <h4 className="my-0 fw-normal text-center">Item purchased</h4>
                    </Card.Header>
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
                      <small className="text-muted">Aqui va algo, quizas cuando se compró!</small>
                    </Card.Footer>
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
