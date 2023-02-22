import React, { useState, useEffect } from 'react';
import { HttpHandler } from '../../../http/handler';

import Header from '../component/NavbarUser.jsx';
import ComprasComponent from '../component/ComprasComponent.jsx';
import VentasComponent from '../component/VentasComponent.jsx';
import ProductoComponent from '../component/ProductoComponent.jsx';
import FavoritosComponent from '../component/FavoritosComponent.jsx';
import BuzonComponent from '../component/BuzonComponent.jsx';
import AjustesComponent from '../component/AjustesComponent.jsx';
import PremiumComponent from '../component/PremiumComponent.jsx';
import ButtonUser from '../component/ButtonUser.jsx';

const Userpage = () => {
  const userId = 4; // Aquí se especifica el ID del usuario

  const [userName, setUserName] = useState({});
  const handler = new HttpHandler();
  const [selectedButton, setSelectedButton] = useState('Compras');

  useEffect(() => {
    // debugger;
    async function getUser() {
      const { user } = await handler.getUserById(userId);
      setUserName(user);
      // console.log(user);
    }

    getUser();
  }, []);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  let renderComponent;

  switch (selectedButton) {
    case 'Compras':
      renderComponent = <ComprasComponent userId={userId} />;
      break;
    case 'Ventas':
      renderComponent = <VentasComponent userId={userId} />;
      break;
    case 'Producto':
      renderComponent = <ProductoComponent userId={userId} />;
      break;
    case 'Favoritos':
      renderComponent = <FavoritosComponent />;
      break;
    case 'Buzón':
      renderComponent = <BuzonComponent />;
      break;
    case 'Ajustes':
      renderComponent = <AjustesComponent />;
      break;
    case 'Premium':
      renderComponent = <PremiumComponent />;
      break;
        case 'Premium':
      renderComponent = <PremiumComponent />;
      break;
    default:
      renderComponent = <div>No se encontró componente.</div>;
  }

  // const navbarHeight = 50;
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-lg-3 col-md-4 col-sm-12"
            // style={{height: "100vh"}}
            // style={{ height: `calc(100vh - ${navbarHeight}px)` }}
          >
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light">
              <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <div className="flex-column">
                  <div className="row mx-auto">
                    <img src={userName.pictures} alt="" className="rounded-circle" style={{ maxHeight: '80px', maxWidth: '80px' }} />
                  </div>
                  <div className="row fs-4 mx-auto p-3" style={{ color: 'black' }}>
                    Bienvenido <br />
                    {userName.name + ' ' + userName.surnames}
                  </div>
                </div>
              </div>
              <hr />
              <div className="">
                <ul className="nav nav-pills flex-column mb-auto">
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser text="Compras" selected={selectedButton === 'Compras'} handleClick={() => handleButtonClick('Compras')} />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser text="Ventas" selected={selectedButton === 'Ventas'} handleClick={() => handleButtonClick('Ventas')} />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser text="Producto" selected={selectedButton === 'Producto'} handleClick={() => handleButtonClick('Producto')} />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser text="Favoritos" selected={selectedButton === 'Favoritos'} handleClick={() => handleButtonClick('Favoritos')} />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser text="Buzón" selected={selectedButton === 'Buzón'} handleClick={() => handleButtonClick('Buzón')} />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser text="Ajustes" selected={selectedButton === 'Ajustes'} handleClick={() => handleButtonClick('Ajustes')} />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser text="Premium" selected={selectedButton === 'Premium'} handleClick={() => handleButtonClick('Premium')} />
                    </div>
                  </li>
                </ul>
              </div>
              <hr />
            </div>
          </div>
          <div className="col-lg-9 col-md-8 col-sm-12" style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
            <div className="container">{renderComponent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userpage;
