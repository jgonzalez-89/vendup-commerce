import React, { useState, useEffect } from 'react';
import { HttpHandler } from '../../../http/handler';
import { categories } from '../../../../data.js';
import { useContext } from 'react';
import { Context } from '../store/appContext.js';
import SearchPage from '../component/Search.jsx';
import Header from '../component/NavbarUser.jsx';
import CardFree from '../component/CardFree.jsx';
import CardPremium from '../component/CardPremium.jsx';

const ProductView = () => {
  const { store, actions } = useContext(Context);
  const { selectedProduct } = store;

  const [itemsPerPage, setItemsPerPage] = useState(9);
  const itemsPerPageOptions = [9, 15, 30];
  const [category, setCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);

  const handler = new HttpHandler();

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    async function fetchData() {
      const result = await handler.getProduct();
      setData(result);
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPage(1); // reset page number when new search is performed
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

  const handleEditClick = (item) => {
    actions.setSelectedProduct(item);
  };

  return (
    <>
      <Header NavUser={'/user'} />

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
            const Component = item.premium ? CardPremium : CardFree;

            return (
              <div className="col-lg-4 col-md-6 col-12 my-1 mb-5" key={index}>
                <Component
                  actionButton={'Comprar'}
                  item={item}
                  image={item.images}
                  title={item.name}
                  description={item.description}
                  price={item.price}
                  onBuyClick={() => handleEditClick(item)}
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
    </>
  );
};

export default ProductView;