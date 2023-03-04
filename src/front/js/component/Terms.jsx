import React from 'react';
import Card from 'react-bootstrap/Card';
import Header from './Navbar.jsx';
import ListGroup from 'react-bootstrap/ListGroup';
import Footer from './Footer.jsx';

// import Navbar from '../component/Navbar.jsx';

const Terms = () => (
  <>
    <Header NavHome={'/'} NavProducts={'/products'} NavUser={'/user'} />
    <br />
    <Card>
      <Card.Header>
        <h2 className="d-flex justify-content-center">
          <strong>Terminos & Condiciones</strong>
        </h2>
      </Card.Header>
      <Card.Body style={{ background: '#212529' }}>
        <p className="m-3" style={{ color: 'white', textAlign: 'center' }}>
          ¡Bienvenido a Vendup! Los Terminos & Condiciones aplican para uso correcto de la pagina web <a href="/">www.vendup.com</a>
        </p>

        <ListGroup variant="flush">
          <ListGroup.Item>
            Objeto: Vendup es una tienda en línea que vende productos a través de Internet. El objetivo de estos términos y condiciones es establecer las condiciones generales de
            uso del sitio web y las condiciones de compra de los productos ofrecidos.
          </ListGroup.Item>
          <ListGroup.Item>Aceptación de los términos: Al utilizar el sitio web de Vendup, el usuario acepta estos términos y condiciones.</ListGroup.Item>
          <ListGroup.Item>
            Registro: Para realizar una compra en Vendup, el usuario debe registrarse en el sitio web proporcionando su nombre, dirección de correo electrónico y otra información
            personal relevante. El usuario se compromete a proporcionar información precisa y actualizada.
          </ListGroup.Item>
          <ListGroup.Item>
            Precios: Los precios de los productos en Vendup están sujetos a cambios sin previo aviso. Los precios que aparecen en el sitio web en el momento de la compra son los
            precios que se aplican.
          </ListGroup.Item>
          <ListGroup.Item>
            Métodos de pago: Vendup acepta varios métodos de pago, como tarjetas de crédito, débito y PayPal. El usuario debe proporcionar información precisa y actualizada de su
            método de pago.
          </ListGroup.Item>
          <ListGroup.Item>
            Entrega: Vendup enviará los productos al usuario en el plazo establecido en la página de detalles de cada producto. El plazo de entrega puede variar dependiendo de la
            ubicación del usuario y de otros factores externos. El usuario es responsable de proporcionar una dirección de entrega precisa.
          </ListGroup.Item>
          <ListGroup.Item>
            Devoluciones: El usuario puede devolver los productos dentro de los 14 días siguientes a la recepción del pedido, siempre y cuando estén en su estado original y sin
            usar. Vendup se reserva el derecho de rechazar cualquier devolución que no cumpla con estos requisitos.
          </ListGroup.Item>
          <ListGroup.Item>
            Política de privacidad: Vendup respeta la privacidad del usuario y protege sus datos personales de acuerdo con las leyes de protección de datos aplicables. El usuario
            puede leer la política de privacidad completa en el sitio web de Vendup.
          </ListGroup.Item>
          <ListGroup.Item>
            Propiedad intelectual: Todo el contenido del sitio web de Vendup, incluyendo textos, imágenes y logos, está protegido por derechos de propiedad intelectual y no puede
            ser utilizado sin el permiso expreso de Vendup.
          </ListGroup.Item>
          <ListGroup.Item>
            Limitación de responsabilidad: Vendup no será responsable de los daños directos o indirectos causados al usuario o a terceros como resultado del uso del sitio web o de
            la compra de productos en el sitio web.
          </ListGroup.Item>
          <ListGroup.Item>
            Legislación aplicable y jurisdicción: Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del país donde Vendup está ubicada. Cualquier
            disputa relacionada con estos términos y condiciones será resuelta por los tribunales competentes de esa jurisdicción.
          </ListGroup.Item>
        </ListGroup>
        <Card.Footer className="text-white text-center">
          Es importante que los usuarios lean y comprendan estos términos y condiciones antes de utilizar el sitio web o realizar una compra en Vendup.
        </Card.Footer>
      </Card.Body>
    </Card>
    <br />
    <Footer />
  </>
);
export default Terms;
