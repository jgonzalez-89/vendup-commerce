import React from 'react';
import Header from './Navbar.jsx';
import Card from 'react-bootstrap/Card';
import { CardGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from './Footer.jsx';
import "../../../../public/vendup.png";
import '../../../../public/products.jpeg';
import '../../../../public/chat.png';
import '../../../../public/deal.jpeg';
import '../../../../public/consumo.jpeg';
// import "../../../../public/playstore.png";
// import "../../../../public/appstore.png";
// import "../../../../public/mobile.png";
// import "../../../../public/free.png";
// import "../../../../public/enterprise.png";
// import "../../../../public/pro.png";
// import "../../../../public/stores.png";

const About = () => (
  <>
    <Header/>
    <br />
    <Row className="m-3">
      <Col sm={6}>
        <img src="vendup.png"></img>
      </Col>
      <Col sm={6}>
          <h2 className=" p-3 m-5 text-center">¡Te proponemos algo diferente!</h2>
      </Col>
    </Row>
    <br />
    <h2 className="text-center">Comprar y Vender es solo el principio</h2>
    <h6 className="text-center">Compra lo que quieres. Vende lo que no necesitas.</h6>
    <br />
    <CardGroup className="m-3">
      <Card style={{ background: "#febd2f" }}>
      <Card.Title className= "m-3 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="warning" class="bi bi-flower1" viewBox="0 0 16 16">
        <path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826zM8 1a1 1 0 0 0-.998 1.03l.01.091c.012.077.029.176.054.296.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a4.997 4.997 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1zM2 9l.03-.002.091-.01a4.99 4.99 0 0 0 .296-.054c.241-.049.542-.122.887-.213a60.59 60.59 0 0 0 2.314-.676L5.762 8l-.144-.045a60.59 60.59 0 0 0-2.314-.676 16.705 16.705 0 0 0-.887-.213 4.99 4.99 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2zm7 5-.002-.03a5.005 5.005 0 0 0-.064-.386 16.398 16.398 0 0 0-.213-.888 60.582 60.582 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a4.996 4.996 0 0 0-.064.386L7 14a1 1 0 1 0 2 0zm-5.696-2.134.025-.017a5.001 5.001 0 0 0 .303-.248c.184-.164.408-.377.661-.629A60.614 60.614 0 0 0 5.96 9.23l.103-.111-.147.033a60.88 60.88 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5.063 5.063 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027c.01-.02.021-.048.036-.084a5.09 5.09 0 0 0 .102-.283c.078-.233.165-.53.258-.874a60.6 60.6 0 0 0 .572-2.343l.033-.147-.11.102a60.848 60.848 0 0 0-1.743 1.667 17.07 17.07 0 0 0-.629.66 5.06 5.06 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366zm9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a4.951 4.951 0 0 0-.303.248 16.69 16.69 0 0 0-.661.629A60.72 60.72 0 0 0 10.04 6.77l-.102.111.147-.033a60.6 60.6 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a4.993 4.993 0 0 0 .367-.138.53.53 0 0 0 .027-.014zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027c-.01.02-.021.048-.036.084a5.09 5.09 0 0 0-.102.283c-.078.233-.165.53-.258.875a60.62 60.62 0 0 0-.572 2.342l-.033.147.11-.102a60.848 60.848 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5.001 5.001 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366zM14 9a1 1 0 0 0 0-2l-.03.002a4.996 4.996 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a4.996 4.996 0 0 0 .386.064L14 9zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035c.072.03.166.064.283.103.233.078.53.165.874.258a60.88 60.88 0 0 0 2.343.572l.147.033-.103-.111a60.584 60.584 0 0 0-1.666-1.742 16.705 16.705 0 0 0-.66-.629 4.996 4.996 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366zm2.196-1.196.017.025a4.996 4.996 0 0 0 .248.303c.164.184.377.408.629.661A60.597 60.597 0 0 0 6.77 5.96l.111.102-.033-.147a60.602 60.602 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5.006 5.006 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1zm9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a60.619 60.619 0 0 0-2.342-.572l-.147-.033.102.111a60.73 60.73 0 0 0 1.667 1.742c.253.252.477.465.66.629a4.946 4.946 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366zm-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5.065 5.065 0 0 0-.248-.303 16.705 16.705 0 0 0-.629-.661A60.462 60.462 0 0 0 9.23 10.04l-.111-.102.033.147a60.6 60.6 0 0 0 .572 2.342c.093.345.18.642.258.875a4.985 4.985 0 0 0 .138.367.575.575 0 0 0 .014.027zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
        </svg>
        </Card.Title>
      <Card.Text className="m-2 text-center"> Hacemos que la compraventa de productos de segunda mano sea una experiencia mucho más sencilla, con lo que directamente ayudamos a potenciar un modelo de consumo sostenible.</Card.Text>
      </Card>
      <Card style={{ background: "#febd2f" }}>
      <Card.Title className= "m-3 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="warning" class="bi bi-cash-coin" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
      <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
      <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
      <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
      </svg>
      </Card.Title>
        <Card.Text className="m-2 text-center">Comprando lo que necesitas y vendiendo lo que no, estás optimizando tus recursos económicos, a la vez que ayudas a otras personas a optimizar los suyos. Y entre todos, colaboramos para crear una economía mejor.</Card.Text>
      </Card>
      <Card style={{ background: "#febd2f" }}>
      <Card.Title className= "m-3 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="warning" class="bi bi-globe-americas" viewBox="0 0 16 16">
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"/>
      </svg>
      </Card.Title>
        <Card.Text className="m-2 text-center">En <strong>VENDUP</strong>, mostramos, ordenamos y tratamos todos los productos de manera igualitaria e imparcial. Y con ello, buscamos reconocer y enriquecer la diversidad de gustos de nuestra comunidad.</Card.Text>
        </Card>
    </CardGroup>
    <br/>
    <h2 className="text-center"> ¿COMO FUNCIONA? </h2>
    <CardGroup className="m-3">
      <Card style={{ width: '30rem' }}>
        <Card.Img variant="top h-100" src="products.jpeg" />
        <Card.Body className="text-center">
          <Card.Title>
            <strong>Busca</strong>
          </Card.Title>
          <Card.Text>Busca el product que necesites entre todos los disponibles en nuestra web.</Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top h-100" src="chat.png" />
        <Card.Body className="text-center">
          <Card.Title>
            <strong>Chat</strong>
          </Card.Title>
          <Card.Text>¡Usa el chat para hablar con el vendedor y conseguir una mejor oferta!</Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top h-100" src="deal.jpeg" />
        <Card.Body className="text-center">
          <Card.Title>
            <strong>Compra</strong>
          </Card.Title>
          <Card.Text>¿Ya has encontrado lo que buscas? Compralo sin problemas en un click a traves de nuestra pagina.</Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
    <br />
    
    <br />

    <Footer/>
  </>
);

export default About;
