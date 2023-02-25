import React, { useState, useEffect, useContext } from 'react';
import { Card, Modal, ListGroup, Button } from 'react-bootstrap';
import { HttpHandler } from '../../../http/handler';
import CardFree from './CardFree.jsx';
import CardPremium from './CardPremium.jsx';
import FormularioComponent from './ComponenteFormulario.jsx';

const VentasComponent = ({ userId }) => {
  const [userValue, setUserValue] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handler = new HttpHandler();

  useEffect(() => {
    async function getUser() {
      const { user } = await handler.getUserById(userId);
      setUserValue(user);
    }

    getUser();
  }, []);

  const handleEditClick = (producto) => {
    setSelectedProduct(producto);
    setShowModal(true);
  };

  const handleCloseModal = async () => {
    setSelectedProduct(null);
    setShowModal(false);
    // Actualizar el estado userValue
    const { user } = await handler.getUserById(userId);
    setUserValue(user);
  };

  return (
    <>
      {!userValue || !userValue.products ? (
        <div>Cargando...</div>
      ) : (
        <div className="container">
          <div className="row mb-5">
            <h1 className="text-center my-5">Estos son tus articulos en Venta</h1>
            {userValue.products.length === 0 ? (
              <div className="de-flex text-center">
                <h3 className="alert alert-danger text-center">Aún no has comprado nada</h3>
              </div>
            ) : (
              userValue.products.map((producto) => {
                const currentDate = new Date();
                const startDate = new Date(producto.created_at_product);
                startDate.setDate(startDate.getDate() + 3);
                const timeDiff = startDate.getTime() - currentDate.getTime();
                const daysRemaining = Math.floor(timeDiff / (500 * 60 * 60 * 24));
                const daysRemainingPremium = Math.floor(timeDiff / (200 * 60 * 60 * 24));
                const hoursRemaining = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const hoursRemainingPremium = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));


                return (
                  <div className="col-lg-4 col-md-6 col-12 my-1" key={producto.id}>
                  {userValue.is_premium ? (
                    <CardPremium
                      image={producto.images}
                      title={producto.name}
                      description={producto.description}
                      price={producto.price}
                      daysRemaining={daysRemainingPremium}
                      hoursRemaining={hoursRemainingPremium}
                      onEditClick={() => handleEditClick(producto)}
                    />
                  ) : (
                    <CardFree
                      image={producto.images}
                      title={producto.name}
                      description={producto.description}
                      price={producto.price}
                      daysRemaining={daysRemaining}
                      hoursRemaining={hoursRemaining}
                      onEditClick={() => handleEditClick(producto)}
                    />
                  )}
                </div>
                );
              })
            )}
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <FormularioComponent selectedProduct={selectedProduct} onCloseModal={handleCloseModal} />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VentasComponent;
