import React, { useEffect, useState } from 'react';
import { HttpHandler } from '../../../http/handler.js';
import CardPremium from './CardPremium.jsx';
// import Login from '../component/LoginModal.jsx';

function CardsHome() {
  const [data, setData] = useState({});

  console.log(data);

  const handler = new HttpHandler();

  useEffect(() => {
    async function fetchData() {
      const result = await handler.getProduct();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <>
      {!data || !data.product ? (
        <div>
          <h1>Cargando</h1>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            {data.product && data.product.filter((item) => item.premium).length === 0 ? (
              <div>
                <h1>No hay productos premium disponibles</h1>
              </div>
            ) : (
              <div className="container">
                <div className="row">
                  {data.product &&
                    data.product
                      .filter((item) => item.premium)
                      .slice(-6)
                      .map((item, index) => {
                        return (
                          <div className="col-lg-4 col-md-6 col-12 mt-2" key={index} style={{ marginBottom: '6rem' }}>
                            <CardPremium
                              button={'Comprar'}
                              item={item}
                              image={item.images}
                              title={item.name}
                              description={item.description}
                              price={item.price}
                            />
                          </div>
                        );
                      })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CardsHome;
