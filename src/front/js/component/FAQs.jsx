import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Header from './NavbarUser.jsx';
import Footer from './Footer.jsx';

const FAQs = () => (
  <>
    <Header></Header>
    <h1 className="mt-2 text-center text-warning">FAQs</h1>
    <Accordion className="m-3" style={{ background: '#212529' }} defaultActiveKey="0">
      <Accordion.Item eventKey="0" alwaysOpen>
        <Accordion.Header>¿Cuáles son los métodos de pago aceptados?</Accordion.Header>
        <Accordion.Body>Aceptamos pagos con tarjeta de crédito y débito, transferencia bancaria y PayPal.</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>¿Qué tipos de artículos se pueden comprar y vender en la plataforma?</Accordion.Header>
        <Accordion.Body>En nuestra plataforma se pueden comprar y vender una amplia variedad de artículos, desde electrónica hasta moda y hogar.</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>¿Cuánto tiempo tarda en llegar mi pedido?</Accordion.Header>
        <Accordion.Body>El tiempo de entrega depende de la ubicación del vendedor y del comprador. Normalmente, el tiempo de entrega oscila entre 3 y 7 días hábiles.</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>¿Qué pasa si el artículo que recibí no coincide con la descripción del vendedor?</Accordion.Header>
        <Accordion.Body>
          En caso de que el artículo que recibas no coincida con la descripción del vendedor, puedes solicitar un reembolso o una devolución en un plazo de 14 días desde la recepción del artículo.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>¿Cómo puedo contactar al vendedor si tengo preguntas sobre un artículo?</Accordion.Header>
        <Accordion.Body>
          En la página de cada artículo se encuentra un botón de "contactar al vendedor", desde el cual podrás enviar un mensaje directamente al vendedor para aclarar tus dudas.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header>¿Cómo se calculan los costos de envío?</Accordion.Header>
        <Accordion.Body>Los costos de envío se calculan automáticamente en función del peso y las dimensiones del paquete, así como la ubicación del vendedor y del comprador.</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6">
        <Accordion.Header>¿Puedo cancelar mi pedido después de haberlo realizado?</Accordion.Header>
        <Accordion.Body>
          Puedes cancelar tu pedido en un plazo de 24 horas desde su realización. Después de ese plazo, la cancelación dependerá del vendedor y de sus políticas de cancelación.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7">
        <Accordion.Header>¿Cómo se asegura la calidad de los artículos vendidos en la plataforma?</Accordion.Header>
        <Accordion.Body>Verificamos la identidad de cada vendedor y supervisamos las transacciones para asegurarnos de que se cumplan nuestras políticas de calidad y seguridad.</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="8">
        <Accordion.Header>¿Puedo vender artículos usados en la plataforma?</Accordion.Header>
        <Accordion.Body>Sí, se permiten artículos usados siempre y cuando se describan con precisión y se encuentren en buen estado.</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="9">
        <Accordion.Header>¿Qué pasa si tengo un problema con mi pedido?</Accordion.Header>
        <Accordion.Body>Si tienes algún problema con tu pedido, puedes contactar con nuestro equipo de soporte al cliente para recibir ayuda y resolver el problema lo antes posible.</Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <br />
    <Footer />
  </>
);

export default FAQs;
