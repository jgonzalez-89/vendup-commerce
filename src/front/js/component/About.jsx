import React from "react";
import Header from "./NavbarUser.jsx";
import Card from 'react-bootstrap/Card';
import {CardGroup}  from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../../../../public/image1.jpeg";
import "../../../../public/products.jpeg";
import "../../../../public/chat.png";
import "../../../../public/deal.jpeg";
import "../../../../public/playstore.png";
import "../../../../public/appstore.png";
import "../../../../public/mobile.png";
import "../../../../public/free.png";
import "../../../../public/enterprise.png";
import "../../../../public/pro.png";
import "../../../../public/stores.png";

const About = () => (
    <>
    <Header></Header>
    <br/>
          <Row className="m-3">
            <Col sm={6}><img src="image1.jpeg"></img>
            </Col>
            <Col sm={6}><span><h1 className="bor_header_left text-center">Somos VENDUP</h1></span>
            <p>Lo entendemos, tienes cosas por casa que no sabes si tirar o guardar....
            <br />
            ¡Te proponemos algo diferente! Vendelo. Dale una segunda vida a tu cosas y vende a traves de nuestra web todo lo que ya no usas.</p>
          </Col>
          </Row>
     <br/>
     <h2 className="text-center"> ¿COMO FUNCIONA? </h2>
     <CardGroup className="m-3">
       <Card style={{width:'30rem'}}>
         <Card.Img variant="top h-100"  src="products.jpeg" />
          <Card.Body className="text-center">
            <Card.Title><strong>Busca</strong></Card.Title>
          <Card.Text>
          Busca el product que necesites entre todos los disponibles en nuestra web.
        </Card.Text>
         </Card.Body>
       </Card>
       <Card>
         <Card.Img variant="top h-100" src="chat.png" />
        <Card.Body className="text-center">
           <Card.Title><strong>Chat</strong></Card.Title>
           <Card.Text>
             ¡Usa el chat para hablar con el vendedor y conseguir una mejor oferta!
            </Card.Text>
         </Card.Body>
        </Card>
       <Card>
          <Card.Img variant="top h-100" src="deal.jpeg" />
        <Card.Body className="text-center">
            <Card.Title><strong>Compra</strong></Card.Title>
            <Card.Text>
            ¿Ya has encontrado lo que buscas? {' '} Compralo sin problemas en un click a traves de nuestra pagina.
            </Card.Text>
          </Card.Body>
        </Card>
     </CardGroup>
     <br/>
        <h2 className="text-center">Planes</h2>
        <h6 className="text-center">¿Necesitas vender más? ¡No pasa nada! Conoce nuestros planes</h6>
        <br/>
        <CardGroup className="mt-2">
        <Card>
          <Card.Img variant="top h-100" src="free.png" />
        </Card>
        <Card>
         <Card.Img variant="top h-100" src="pro.png" />
        </Card>
       <Card>
          <Card.Img variant="top h-100" src="enterprise.png" />
        </Card>
     </CardGroup>
     <br/>
     <a className= "text-center" href="/faqs"><h2>¿Tienes más preguntas?</h2></a>
     <br/>
     </>
);

export default About;