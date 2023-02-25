import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { HttpHandler } from '../../../http/handler';
import { categories } from '../../../../data.js';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../store/appContext.js';
import SearchPage from '../component/Search.jsx';
import Header from '../component/NavbarUser.jsx';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import CardFree from '../component/CardFree.jsx';
import CardPremium from '../component/CardPremium.jsx';

const ProductView = () => {
  const { store, actions } = useContext(Context);
  const { selectedProduct } = store;
  const [category, setCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [premium, setPremium] = useState(false);
  const itemsPerPage = 6;
  const token = Cookies.get('access_token');
  const decoded = jwt_decode(token);
  const userId = decoded.sub;

  const handler = new HttpHandler();

  useEffect(() => {
    async function fetchPremium() {
      const result = await handler.getUser();
      console.log(result)
      // setPremium(result.user.is_premium);
      // setPremium(result.is_premium);
    }
    async function fetchData() {
      const result = await handler.getProduct();
      setData(result);
    }
    fetchPremium();
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredItems = data.product
    ? data.product.filter(
        (item) =>
          (category === '' || item.category === category) &&
          (searchText === '' || item.name.toLowerCase().includes(searchText.toLowerCase()))
      )
    : [];

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredItems.slice(startIndex, endIndex);

  return (
    <>
      <Header NavUser={'/user'} NavHome={'/'} />

      <div className="container">
        <h1 className="text-center my-5">Aquí podrás ver y seleccionar los productos por categorías</h1>
        <SearchPage onSearch={handleSearch} />
        <div className="my-3">
          {categories.map((categoryItem) => (
            <button
              key={categoryItem.value}
              className={`btn btn-outline-warning mx-1 ${category === categoryItem.value ? 'active' : ''}`}
              onClick={() => setCategory(categoryItem.value)}
            >
              {categoryItem.label}
            </button>
          ))}
          <button
            className={`btn mx-1 ${category === '' ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => setCategory('')}
          >
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
                {premium ? (
                  <CardPremium
                    image={item.images}
                    title={item.name}
                    description={item.description}
                    price={item.price}
                    daysRemaining={daysRemaining}
                    hoursRemaining={hoursRemaining}
                  />
                ) : (
                  <CardFree
                    image={item.images}
                    title={item.name}
                    description={item.description}
                    price={item.price}
                    daysRemaining={daysRemaining}
                    hoursRemaining={hoursRemaining}
                    // onEditClick={() => handleEditClick(producto)}
                  />
                )}
              </div>
            );
          })}
        </div>
        {/* Agregar componente de paginación */}
        {data.product && data.product.length > itemsPerPage && (
          <div className="d-flex justify-content-center m-5">
            {Array.from({ length: Math.ceil(data.product.length / itemsPerPage) }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`btn ${pageNum === page ? 'btn-warning' : 'btn-outline-warning'} mx-1`}
                onClick={() => setPage(pageNum)}
              >
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

{
  /* <Card>
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
                        <Button
                          variant="warning"
                          as={NavLink}
                          to="/shopping"
                          onClick={() => {
                            if (item.owner_id === userId) {
                              alert('Lo siento, no puedes comprar tu propio producto');
                            } else {
                              actions.setSelectedProduct(item);
                            }
                          }}
                        >
                          Comprar
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{daysRemaining > 0 ? `${daysRemaining} días y ${hoursRemaining} horas restantes` : 'Venta Finalizada'}</small>
                  </Card.Footer>
                </Card> */
}
