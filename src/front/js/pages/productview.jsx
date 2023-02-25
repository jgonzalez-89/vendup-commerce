import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Modal, Form } from 'react-bootstrap'; // Importar el componente Modal
import { HttpHandler } from '../../../http/handler';
import { categories } from '../../../../data.js';
import Header from '../component/NavbarUser.jsx';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../store/appContext.js';
import { setSelectedProduct } from '../store/flux.js';

const ProductView = () => {
  const { store, actions } = useContext(Context);
  const { selectedProduct } = store;

//   console.log(store);

  const [category, setCategory] = useState('');
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // 6 elementos por página

  const handler = new HttpHandler();

  useEffect(() => {
    async function fetchData() {
      const result = await handler.getProduct();
      setData(result);
    }
    fetchData();
  }, []);

  // Filtrar los elementos por categoría si se selecciona una categoría
  const filteredItems = data.product ? data.product.filter((item) => category === '' || item.category === category) : [];

  // Determinar los elementos que se mostrarán en la página actual
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredItems.slice(startIndex, endIndex);

  return (
    <>
      <Header NavUser={'/user'} NavHome={'/'} />

      <div className="container">
        <h1 className="text-center my-5">Aquí podrás ver y seleccionar los productos por categorías</h1>
        <div className="my-3">
          {categories.map((categoryItem) => (
            <button key={categoryItem.value} className={`btn btn-outline-warning mx-1 ${category === categoryItem.value ? 'active' : ''}`} onClick={() => setCategory(categoryItem.value)}>
              {categoryItem.label}
            </button>
          ))}
          <button className={`btn mx-1 ${category === '' ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setCategory('')}>
            Mostrar Todos
          </button>
        </div>
        <div className="row">
          {currentPageItems.map((item, index) => {
            const currentDate = new Date();
            const startDate = new Date(item.created_at_product);
            startDate.setDate(startDate.getDate() + 3); // Agregar 3 días a la fecha de creación
            const timeDiff = startDate.getTime() - currentDate.getTime();
            const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hoursRemaining = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            return (
              <div className="col-lg-4 col-md-6 col-12 my-1" key={index}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={item.images}
                    style={{
                      height: '200px',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text
                      style={{
                        height: '150px',
                        maxHeight: '150px',
                        overflow: 'hidden',
                      }}
                    >
                      {item.description}
                    </Card.Text>
                    <ListGroup className="list-group-flush">
                      <hr />
                      <ListGroup.Item className="d-flex justify-content-between">
                        <span>Precio: {item.price} €</span>
                        <Button as={NavLink} to="/shopping" onClick={() => actions.setSelectedProduct(item)}>
                          Comprar
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{daysRemaining > 0 ? `${daysRemaining} días y ${hoursRemaining} horas restantes` : 'Venta Finalizada'}</small>
                  </Card.Footer>
                </Card>
              </div>
            );
          })}
        </div>
        {/* Agregar componente de paginación */}
        {data.product && data.product.length > itemsPerPage && (
          <div className="d-flex justify-content-center m-5">
            {Array.from({ length: Math.ceil(data.product.length / itemsPerPage) }, (_, i) => i + 1).map((pageNum) => (
              <button key={pageNum} className={`btn ${pageNum === page ? 'btn-warning' : 'btn-outline-warning'} mx-1`} onClick={() => setPage(pageNum)}>
                {pageNum}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductView;
