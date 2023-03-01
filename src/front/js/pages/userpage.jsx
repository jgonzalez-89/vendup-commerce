import React, { useState, useEffect } from 'react';
import { HttpHandler } from '../../../http/handler';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import Header from '../component/NavbarUser.jsx';
import ComprasComponent from '../component/ComponenteCompras.jsx';
import VentasComponent from '../component/ComponenteVentas.jsx';
import ProductoComponent from '../component/ComponenteFormularioProducto.jsx';
import AjustesComponent from '../component/ComponenteFormularioPerfil.jsx';
import PremiumComponent from '../component/ComponentePremium.jsx';
import ButtonUser from '../component/ButtonUser.jsx';
import userProfilePicture from '../../../../public/perfil.jpg';

const Userpage = () => {
  const token = Cookies.get('access_token');
  const decoded = jwt_decode(token);
  const userId = decoded.sub;

  const [userName, setUserName] = useState({ profile_picture: userProfilePicture });
  const handler = new HttpHandler();
  const [selectedButton, setSelectedButton] = useState('Compras');

  const Logout = () => {
    try {
      Cookies.remove('access_token');
      window.location.href = '/'; // redirect to home page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    async function getUser() {
      const { user } = await handler.getUserById(userId);
      if (!user.profile_picture) {
        user.profile_picture = userProfilePicture;
      }
      setUserName(user);
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
      <Header NavProducts={'/products'} NavLogOut={'/'} onClickLogOut={Logout} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12">
            <div className="d-flex flex-column p-3 bg-light justify-content-center align-items-center rounded shadow m-3">
              <div>
                <img
                  src={userName.profile_picture}
                  alt=""
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #FEBD2F',
                  }}
                />
              </div>
              <div className="d-flex row fs-4 p-3 justify-content-center align-items-center" style={{ color: 'black' }}>
                {userName.name && userName.surnames ? userName.name + ' ' + userName.surnames : 'Bienvenido!'}
              </div>
              <hr />
              <div className="">
                <ul className="nav nav-pills flex-column mb-auto">
                  <li className="nav-item">
                    <ButtonUser text="Tus Compras" selected={selectedButton === 'Compras'} handleClick={() => handleButtonClick('Compras')} />
                  </li>
                  <li className="nav-item">
                    <ButtonUser text="Tus Ventas" selected={selectedButton === 'Ventas'} handleClick={() => handleButtonClick('Ventas')} />
                  </li>
                  <li className="nav-item">
                    <ButtonUser text="Subir Producto" selected={selectedButton === 'Producto'} handleClick={() => handleButtonClick('Producto')} />
                  </li>

                  <li className="nav-item">
                    <ButtonUser text="Editar Perfil" selected={selectedButton === 'Ajustes'} handleClick={() => handleButtonClick('Ajustes')} />
                  </li>
                  <li className="nav-item">
                    <ButtonUser text="Hazte Premium" selected={selectedButton === 'Premium'} handleClick={() => handleButtonClick('Premium')} />
                  </li>
                </ul>
              </div>
              <hr />
            </div>
          </div>
          <div className="col-lg-9 col-md-8 col-sm-12" style={{}}>
            <div className="container">{renderComponent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userpage;
