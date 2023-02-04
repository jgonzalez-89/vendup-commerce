import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5 ">
      <div className="container ">
        <div className="justify-content-center">
          <Button className="botoneshome">Todos</Button>
          <Button className="botoneshome">Coches</Button>
          <Button className="botoneshome">Coches eléctricos</Button>
          <Button className="botoneshome">Motos</Button>
          <Button className="botoneshome">Motor y Accesorios</Button>
          <Button className="botoneshome">Moda y Accesorios</Button>
          <Button className="botoneshome">Inmobiliaria</Button>
          <Button className="botoneshome">TV, Audio y Foto</Button>
          <Button className="botoneshome">Móviles y Telefonía</Button>
          <Button className="botoneshome">Informática y Electrónica</Button>
          <Button className="botoneshome">Deporte y Ocio</Button>
          <Button className="botoneshome">Bicicletas</Button>
          <Button className="botoneshome">Consolas y Videojuegos</Button>
          <Button className="botoneshome">Hogar y Jardín</Button>
          <Button className="botoneshome">Electrodomésticos</Button>
          <Button className="botoneshome">Cine, Libros y Música</Button>
          <Button className="botoneshome">Niños y Bebés</Button>
          <Button className="botoneshome">Coleccionismo</Button>
          <Button className="botoneshome">Construcción y Reformas</Button>
          <Button className="botoneshome">Industria y Agricultura</Button>
          <Button className="botoneshome">Otros...</Button>
        </div>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <img src="https://user-images.githubusercontent.com/112573464/216276882-8d2a2299-fe88-404f-ab6d-cab3290e779a.png" />{" "}
        {store.message ||
          "Loading message from the backend (make sure your python backend is running)... ok?"}{" "}
      </div>{" "}
    </div>
  );
};

export default Home;
