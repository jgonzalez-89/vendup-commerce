import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Button from "../component/Button.jsx";
import logo from "../../../../public/logowhite.png";
import SearchPage from "../component/Search.jsx";
import Cards from "../component/Cards.jsx";
import { HttpHandler } from "../../../http/handler";

const Home = () => {
  const { store, actions } = useContext(Context);

  const [data, setData] = useState([]);
  const handler = new HttpHandler();

  useEffect(() => {
    async function fetchData() {
      const result = await handler.getProduct();
      setData(result);
    }
    fetchData();
  }, []);
  console.log(data);

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

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"></ul>
            <Button text="login" />
            <Button text="signup" />
          </div>
        </div>
      </header>

      <SearchPage />

      <div className="text-center mt-5 ">
        <div className="container ">
          <div className="justify-content-center">
            <div className="col-lg-4 col-md-6 col-8 card-image1"></div>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-globe" alt="Todos"></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-car" alt="Coches"></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-motorcycle" alt="Motos"></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-shirt" alt="Moda y accesorios"></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-home" alt="Inmobiliaria"></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-tv" alt="Tv, Audio, Accesorios"></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i
                className="fa-solid fa-mobile-screen-button"
                alt="Móviles y Telefonía"
              ></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i
                className="fa-solid fa-laptop"
                alt="Informática y Electrónica"
              ></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-heart-pulse" alt="Deporte y Ocio"></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-bicycle" alt="Bicicletas"></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i
                className="fa-solid fa-desktop"
                alt="Consolas y Videojuegos"
              ></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-couch" alt="Hogar y Jardín"></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-hard-drive" alt="Electrodomesticos"></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-book" alt="Cine, Libros y Música"></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-baby-carriage" alt="Niños y Bebes"></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-palette" alt="Coleccionismo"></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i
                className="fa-solid fa-trowel-bricks"
                alt="construccion y Reformas"
              ></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i
                className="fa-solid fa-industry"
                alt="Industria y Agricultura"
              ></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-person-digging" alt="Empleo"></i>{" "}
            </button>
            <button type="button" className="botoneshome rounded">
              <i className="fa-solid fa-spinner" alt="Otros..."></i>{" "}
            </button>
            {/* <button type="button" class="botoneshome rounded">
              <i
                className="fa-solid fa-car-circle-bolt"
                alt="Coches Electricos"
              ></i>{" "} */}
            {/* </button> */}
            {/* <ButtonCategory text="Coches eléctricos" /> */}
          </div>
          <Cards />
          <Cards />
        </div>
      </div>
    </>
  );
};

export default Home;
