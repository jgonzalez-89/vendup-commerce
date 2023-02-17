import React, { useState, useEffect } from "react";
import { HttpHandler } from "../../../http/handler";

import Header from "../component/Navbar.jsx";
import ComprasComponent from "../component/ComprasComponent.jsx";
import VentasComponent from "../component/VentasComponent.jsx";
import FavoritosComponent from "../component/FavoritosComponent.jsx";
import BuzonComponent from "../component/BuzonComponent.jsx";
import AjustesComponent from "../component/AjustesComponent.jsx";
import ButtonUser from "../component/ButtonUser.jsx";

const Userpage = () => {
  const userId = 12; // Aquí se especifica el ID del usuario

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

  const navbarHeight = 50;
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-lg-3 col-md-4 col-sm-12"
            style={{ height: `calc(100vh - ${navbarHeight}px)` }}
          >
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light">
              <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                {/* <svg className="bi pe-none me-2 justify-content-center" width="40" height="32">
                  <use href="#bootstrap" />
                </svg> */}

                <div className="flex-column">
                  <div className="row mx-auto">
                    <img
                      src={userName.pictures}
                      alt=""
                      className="rounded-circle"
                    />
                  </div>
                  <div
                    className="row fs-4 mx-auto p-3"
                    style={{ color: "black" }}
                  >
                    Bienvenido <br />
                    {userName.name + " " + userName.surnames}
                  </div>
                </div>
              </div>
              <hr />
              <div className="mipo">
                <ul className="nav nav-pills flex-column mb-auto">
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser
                        text="Compras"
                        selected={selectedButton === "Compras"}
                        handleClick={() => handleButtonClick("Compras")}
                      />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser
                        text="Ventas"
                        selected={selectedButton === "Ventas"}
                        handleClick={() => handleButtonClick("Ventas")}
                      />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser
                        text="Favoritos"
                        selected={selectedButton === "Favoritos"}
                        handleClick={() => handleButtonClick("Favoritos")}
                      />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser
                        text="Buzón"
                        selected={selectedButton === "Buzón"}
                        handleClick={() => handleButtonClick("Buzón")}
                      />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-center">
                      <ButtonUser
                        text="Ajustes"
                        selected={selectedButton === "Ajustes"}
                        handleClick={() => handleButtonClick("Ajustes")}
                      />
                    </div>
                  </li>
                </ul>
              </div>
              <hr />
            </div>
          </div>
          <div
            className="col-lg-9 col-md-8 col-sm-12"
            style={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}
          >
            <div className="container">{renderComponent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userpage;
