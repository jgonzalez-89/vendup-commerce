import React, { useState, useEffect } from 'react';
import { HttpHandler } from '../../../http/handler';
import { categories } from '../../../../data.js';
import { useContext } from 'react';
import { Context } from '../store/appContext.js';
import SearchPage from '../component/Search.jsx';
import CardFree from '../component/CardFree.jsx';
import CardPremium from '../component/CardPremium.jsx';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Login from '../component/ModalLogin.jsx';
import Register from '../component/ModalRegister.jsx';

function CardsHome() {
  const { store, actions } = useContext(Context);
  const { selectedProduct } = store;
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [category, setCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false); // estado para mostrar el modal

  const handler = new HttpHandler();

  console.log(data)


  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    async function fetchData() {
      const result = await handler.getProduct(); // eliminar el parámetro sort
      setData(result);
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPage(1); // reset page number when new search is performed
  };

  let filteredItems = [];

  if (data.product) {
    const premiumItems = data.product.filter(
      (item) => item.premium && (category === '' || item.category === category) &&
        (searchText === '' || item.name.toLowerCase().includes(searchText.toLowerCase()))
    );

    const nonPremiumItems = data.product.filter(
      (item) => !item.premium && (category === '' || item.category === category) &&
        (searchText === '' || item.name.toLowerCase().includes(searchText.toLowerCase()))
    );

    filteredItems = premiumItems.concat(nonPremiumItems);
  }

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredItems.slice(startIndex, endIndex);

  const handleClick = () => {
    setShowModal(true); // actualizar el estado para mostrar el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // actualizar el estado para cerrar el modal
  };

  return (
    <>
      <div className="container">
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
            const Component = item.premium ? CardPremium : CardFree;

            return (
              <div className="col-lg-4 col-md-6 col-12 my-1 mb-5" key={index}>
                <Component
                  actionButton={'Comprar+'}
                  item={item}
                  image={item.images}
                  title={item.name}
                  description={item.description}
                  price={item.price}
                  onAlertClick={() => handleClick()}
                />
              </div>
            );
          })}
        </div>
        {/* Agregar componente de paginación */}
        {filteredItems.length > itemsPerPage && (
          <>
            <div className="d-flex justify-content-center">
              {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    style={{ marginBottom: '6rem' }}
                    key={pageNum}
                    className={`btn ${pageNum === page ? 'btn-warning' : 'btn-outline-warning'} mx-1`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Entra o registrate para comprar.</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Login />
          <Register />
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CardsHome;
