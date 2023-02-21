import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import logo from "../../../../public/logowhite.png";
import SearchPage from "../component/Search.jsx";
import ButtonCategory from "../component/ButtonCategory.jsx";
import Login from "../component/LoginModal.jsx";
import SignUp from "../component/SignupModal.jsx";
import Forgotpass from "../component/PasswordModal.jsx";


const Homelola = () => {
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
      <header className="p-3 bg-dark text-bg-dark">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-left mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <img src={logo} width="100" role="img" aria-label="Vendup"></img>
              <span className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start fs-4">
                VENDUP
              </span>
            </a>

            <ul className="nav col-8 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"></ul>
             <Login className="me-2" tabindex="-1" onClose={() => setShowLoginModal(false)}/>
             <SignUp className="me-2" onClose={() => setShowSignupModal(false)}/>

          </div>
        </div>
      </header>

      <SearchPage />

      <div className="text-center mt-5 ">
        <div className="container ">
          <div className="justify-content-center">
            <ButtonCategory text="Todos" />
            <ButtonCategory text="Coches" />
            <ButtonCategory text="Coches eléctricos" />
            <ButtonCategory text="Motor y Accesorios" />
            <ButtonCategory text="Moda y Accesorios" />
            <ButtonCategory text="Inmobiliaria" />
            <ButtonCategory text="TV, Audio y Foto" />
            <ButtonCategory text="Móviles y Telefonía" />
            <ButtonCategory text="Informática y Electrónica" />
            <ButtonCategory text="Deporte y Ocio" />
            <ButtonCategory text="Bicicletas" />
            <ButtonCategory text="Consolas y Videojuegos" />
            <ButtonCategory text="Hogar y Jardín" />
            <ButtonCategory text="Electrodomésticos" />
            <ButtonCategory text="Cine, Libros y Música" />
            <ButtonCategory text="Niños y Bebés" />
            <ButtonCategory text="Coleccionismo" />
            <ButtonCategory text="Construcción y Reformas" />
            <ButtonCategory text="Industria y Agricultura" />
            <ButtonCategory text="Otros..." />
          </div>
          <img src="https://user-images.githubusercontent.com/112573464/216276882-8d2a2299-fe88-404f-ab6d-cab3290e779a.png" />
          {store.message ||
            "Loading message from the backend (make sure your python backend is running)... ok?"}
        </div>
      </div>
    </>
  );
};

export default Homelola;