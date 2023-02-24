import React, { useState, useEffect } from 'react';
import { HttpHandler } from '../../../http/handler';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import Header from '../component/NavbarUser.jsx';
import ComprasComponent from '../component/ComponenteCompras.jsx';
import VentasComponent from '../component/ComponenteVentas.jsx';
import ProductoComponent from '../component/ComponenteFormularioProducto.jsx';
import FavoritosComponent from '../component/ComponenteFavoritos.jsx';
import BuzonComponent from '../component/ComponenteBuzon.jsx';
import AjustesComponent from '../component/ComponenteFormularioPerfil.jsx';
import PremiumComponent from '../component/ComponentePremium.jsx';
import ButtonUser from '../component/ButtonUser.jsx';

const Userpage = () => {
  const token = Cookies.get('access_token');
  const decoded = jwt_decode(token);
  const userId = decoded.sub;

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
      renderComponent = <AjustesComponent userId={userId} />;
      break;
    case 'Premium':
      renderComponent = <PremiumComponent />;
      break;
    default:
      renderComponent = <div>No se encontró componente.</div>;
  }

  return (
    <>
      <Header NavHome={"/"} NavProducts={"/products"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12">
            <div className="d-flex flex-column p-3 bg-light">
              <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <div className="flex-column">
                  <div className="">
                    <img src={userName.picture_large} alt="" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
                  </div>
                  <div className="row fs-4 p-3" style={{ color: 'black' }}>
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
                      <ButtonUser text="Tus Compras" selected={selectedButton === 'Compras'} handleClick={() => handleButtonClick('Compras')} />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser text="Tus Ventas" selected={selectedButton === 'Ventas'} handleClick={() => handleButtonClick('Ventas')} />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser text="Subir Producto" selected={selectedButton === 'Producto'} handleClick={() => handleButtonClick('Producto')} />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser text="Productos Favoritos" selected={selectedButton === 'Favoritos'} handleClick={() => handleButtonClick('Favoritos')} />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser text="Buzón" selected={selectedButton === 'Buzón'} handleClick={() => handleButtonClick('Buzón')} />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser text="Editar Perfil" selected={selectedButton === 'Ajustes'} handleClick={() => handleButtonClick('Ajustes')} />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser text="Hazte Premium" selected={selectedButton === 'Premium'} handleClick={() => handleButtonClick('Premium')} />
                    </div>
                  </li>
                </ul>
              </div>
              <hr />
            </div>
          </div>
          <div className="col-lg-9 col-md-8 col-sm-12" style={{  }}>
            <div className="container">{renderComponent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userpage;
