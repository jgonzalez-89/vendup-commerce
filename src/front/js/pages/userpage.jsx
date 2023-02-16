import React, { useState, useEffect } from "react";
import { HttpHandler } from "../../../http/handler";

import Header from "../component/Navbar.jsx";
import ComprasComponent from "../component/ComprasComponent.jsx";
import VentasComponent from "../component/VentasComponent.jsx";
import FavoritosComponent from "../component/FavoritosComponent.jsx";
import BuzonComponent from "../component/BuzonComponent.jsx";
import AjustesComponent from "../component/AjustesComponent.jsx";

const Userpage = () => {
  const [userName, setUserName] = useState({});
  const handler = new HttpHandler();

  useEffect(() => {
    // debugger;
    async function getUser() {
      const { user } = await handler.getUserById(userId);
      setUserName(user);
      // console.log(user);
    }

    getUser();
  }, []);

  const [selectedButton, setSelectedButton] = useState("Compras");
  const userId = 1; // Aquí se especifica el ID del usuario

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  let renderComponent;

  switch (selectedButton) {
    case "Compras":
      renderComponent = <ComprasComponent userId={userId} />;
      break;
    case "Ventas":
      renderComponent = <VentasComponent userId={userId} />;
      break;
    case "Favoritos":
      renderComponent = <FavoritosComponent />;
      break;
    case "Buzón":
      renderComponent = <BuzonComponent />;
      break;
    case "Ajustes":
      renderComponent = <AjustesComponent />;
      break;
    default:
      renderComponent = <div>No se encontró componente.</div>;
  }

  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <div style={{ width: "20vw", backgroundColor: "#EEEEEF" }}>
          {/* Contenido del primer div */}
          <div>
            <div
              className="d-flex flex-column flex-shrink-0 p-3 bg-light"
              style={{ height: "100vh" }}
            >
              <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg
                  className="bi pe-none me-2 justify-content-center"
                  width="40"
                  height="32"
                >
                  <use href="#bootstrap" />
                </svg>

                <div className="flex-column">
                  <div className="row mx-auto">
                    <img src={userName.pictures} alt="" />
                  </div>
                  <div
                    className="row fs-4 mx-auto p-3"
                    style={{ color: "#7F7D82" }}
                  >
                    Bienvenido <br />
                    {userName.name + " " + userName.surnames}
                  </div>
                </div>

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
                      style={{
                        width: "80%",
                        marginTop: "2vw",
                        backgroundColor:
                          selectedButton === "Compras" ? "#FEBD2F" : "",
                        color: "#7F7D82",
                      }}
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
                      style={{
                        width: "80%",
                        marginTop: "2vw",
                        backgroundColor:
                          selectedButton === "Ventas" ? "#FEBD2F" : "",
                        color: "#7F7D82",
                      }}
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
                      style={{
                        width: "80%",
                        marginTop: "2vw",
                        backgroundColor:
                          selectedButton === "Favoritos" ? "#FEBD2F" : "",
                        color: "#7F7D82",
                      }}
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
                      style={{
                        width: "80%",
                        marginTop: "2vw",
                        backgroundColor:
                          selectedButton === "Buzón" ? "#FEBD2F" : "",
                        color: "#7F7D82",
                      }}
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
                      style={{
                        width: "80%",
                        marginTop: "2vw",
                        backgroundColor:
                          selectedButton === "Ajustes" ? "#FEBD2F" : "",
                        color: "#7F7D82",
                      }}
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
        <div style={{ width: "80vw", backgroundColor: "#C4BFBD" }}>
          {/* Contenido del segundo div */}
          <div className="container">{renderComponent}</div>
        </div>
      </div>
    </>
  );
};

export default Userpage;
