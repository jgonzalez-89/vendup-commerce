import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Header from "./NavbarUser.jsx";



const FAQs = () => (
    <>
    <Header></Header>
    <h1 className="mt-2 text-center text-warning">FAQs</h1>
     <Accordion className="m-3" style={{background: '#212529'}} defaultActiveKey="0">
      <Accordion.Item eventKey="0" alwaysOpen>
        <Accordion.Header>¿Cuáles son los métodos de pago aceptados?</Accordion.Header>
        <Accordion.Body>
        Aceptamos pagos con tarjeta de crédito y débito, transferencia bancaria y PayPal.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" flush>
        <Accordion.Header>¿Qué tipos de artículos se pueden comprar y vender en la plataforma?</Accordion.Header>
        <Accordion.Body>
        En nuestra plataforma se pueden comprar y vender una amplia variedad de artículos, desde electrónica hasta moda y hogar.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" flush>
        <Accordion.Header>¿Como envio un producto?</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" flush>
        <Accordion.Header>¿Cuanto tardo en recibir un producto?</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4" flush>
        <Accordion.Header>¿Como subo un producto nuevo?</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5" flush>
        <Accordion.Header>¿Es segura la pagina?</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
</>
);

export default FAQs;
