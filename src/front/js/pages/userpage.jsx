import React, { useState } from "react";
import Header from "../component/Navbar.jsx";

const Userpage = () => {
  const [selectedButton, setSelectedButton] = useState("Compras");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <div style={{ width: "20%", backgroundColor: "#eee" }}>
          {/* Contenido del primer div */}
          <div>
            <div
              className="d-flex flex-column flex-shrink-0 p-3 bg-light"
              style={{ height: "100vh" }}
            >
              <a
                href="/"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
              >
                <svg className="bi pe-none me-2" width="40" height="32">
                  <use href="#bootstrap" />
                </svg>
                <span className="fs-4">
                  Aqui va el nombre de usuario de la API
                </span>
              </a>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                  <div className="d-flex justify-content-center">
                    <button
                      className={`nav-link ${
                        selectedButton == "Compras" ? "active" : ""
                      }`}
                      aria-current="page"
                      onClick={() => handleButtonClick("Compras")}
                      style={{ width: "80%" }}
                    >
                      Compras
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="d-flex justify-content-center">
                    <button
                      className={`nav-link ${
                        selectedButton == "Ventas" ? "active" : ""
                      }`}
                      aria-current="page"
                      onClick={() => handleButtonClick("Ventas")}
                      style={{ width: "80%" }}
                    >
                      Ventas
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="d-flex justify-content-center">
                    <button
                      className={`nav-link ${
                        selectedButton == "Favoritos" ? "active" : ""
                      }`}
                      aria-current="page"
                      onClick={() => handleButtonClick("Favoritos")}
                      style={{ width: "80%" }}
                    >
                      Favoritos
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="d-flex justify-content-center">
                    <button
                      className={`nav-link ${
                        selectedButton == "Buzón" ? "active" : ""
                      }`}
                      aria-current="page"
                      onClick={() => handleButtonClick("Buzón")}
                      style={{ width: "80%" }}
                    >
                      Buzón
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="d-flex justify-content-center">
                    <button
                      className={`nav-link ${
                        selectedButton == "Ajustes" ? "active" : ""
                      }`}
                      aria-current="page"
                      onClick={() => handleButtonClick("Ajustes")}
                      style={{ width: "80%" }}
                    >
                      Ajustes
                    </button>
                  </div>
                </li>
              </ul>
              <hr />
            </div>
          </div>
        </div>
        <div style={{ width: "80%", backgroundColor: "#ddd" }}>
          {/* Contenido del segundo div */}
          <div className="container">
            <div
              className="card"
              style={{ marginLeft: "50px", marginTop: "50px" }}
            >
              <div className="card-body">
                <h5 className="card-title">Card Title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userpage;
