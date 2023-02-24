import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import '../../styles/home.css';
import logo from '../../../../public/logowhite.png';
import SearchPage from '../component/Search.jsx';
import CardsHome from '../component/CardsHome.jsx';
import Login from '../component/LoginModal.jsx';
import SignUp from '../component/SignupModal.jsx';
import Forgotpass from '../component/PasswordModal.jsx';

const Home = () => {
  const { store, actions } = useContext(Context);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotpassModal, setShowForgotpassModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
  };

  const handleForgotpassClick = () => {
    setShowForgotpassModal(true);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ minHeight: '50px', top: '0' }}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} width="100" role="img" aria-label="Vendup" />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Login className="me-2" onClose={() => setShowLoginModal(false)} />
            <SignUp className="me-2" onClose={() => setShowSignupModal(false)} />
          </Nav>
        </Container>
      </Navbar>

      <SearchPage />

      <div className="text-center mt-5 mb-5">
        <div className="container ">
          <div className="justify-content-center">
            <div className="col-lg-4 col-md-6 col-8 card-image1"></div>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-globe" alt="Todos"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-car" alt="Coches"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-motorcycle" alt="Motos"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-shirt" alt="Moda y accesorios"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-home" alt="Inmobiliaria"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-tv" alt="Tv, Audio, Accesorios"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-mobile-screen-button" alt="Móviles y Telefonía"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-laptop" alt="Informática y Electrónica"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-heart-pulse" alt="Deporte y Ocio"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-bicycle" alt="Bicicletas"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-desktop" alt="Consolas y Videojuegos"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-couch" alt="Hogar y Jardín"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-hard-drive" alt="Electrodomesticos"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-book" alt="Cine, Libros y Música"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-baby-carriage" alt="Niños y Bebes"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-palette" alt="Coleccionismo"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-trowel-bricks" alt="construccion y Reformas"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-industry" alt="Industria y Agricultura"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-person-digging" alt="Empleo"></i>{' '}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-spinner" alt="Otros..."></i>{' '}
            </button>
            {/* <button type="button" class="botoneshome rounded">
              <i
                className="fa-solid fa-car-circle-bolt"
                alt="Coches Electricos"
              ></i>{" "} */}
            {/* </button> */}
            {/* <ButtonCategory text="Coches eléctricos" /> */}
          </div>
          <CardsHome />
          {/* <CardsHome /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
