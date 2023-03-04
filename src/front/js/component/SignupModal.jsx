import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal, Row, Col, Container } from 'react-bootstrap';
import { HttpHandler } from '../../../http/handler.js';
import Cookies from 'js-cookie';
import Login from './LoginModal.jsx';
import '../../../../public/logoblack.png';
import '../../styles/modals.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLogin, setShowLoginModal] = useState(false);

  const handler = new HttpHandler();
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const token = sessionStorage.getItem("token");

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log(email, password);
    const response = await handler.register(email, password);
    console.log(response);

    if (response.access_token) {
      setShow(false);
      Cookies.set('access_token', response.access_token, { expires: 7 });
      navigate('/user');
    } else {
      setErrorMessage('Email o contraseña incorrectos');
    }
  };

  const handleCloseView = () => {
    setShow(false);
    setShowLoginModal(true);
    console.log('working');
  };

  return (
    <>
      <Button variant="warning" className="m-2" onClick={handleShow}>
        Registrate
      </Button>
      {showLogin ? <Login cerrar= {setShowLoginModal} className="m-2 text-white possition-absolute bottom-0 end-0" />
    : 

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>¡Hola!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 p-1">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Form.Label className="pt-2">Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
          </Form>
          {errorMessage !== '' && <p className="alert alert-danger text-center">{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer style={{background: "#212529"}}>
        <Container>
          <Row>
            <Col xs={3} md={4}>
            <Button variant="secondary" onClick={handleClose}>
               Google  
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-google p-2" viewBox="0 0 16 16">
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
              </svg>
              </Button>
           </Col>
            <Col xs={6} md={4}>
            <Button variant="warning btn-lg" onClick={handleRegister}>
            Registrate
          </Button>
            </Col>
            <Col xs={3} md={4}>
            <p className="m-3 text-white position-absolute bottom-2 end-0" onClick={handleCloseView}><small><u>¿Ya tienes cuenta?</u></small></p>
            </Col>
          </Row>
          </Container>
        </Modal.Footer>
      </Modal>
}
    </>
  );
}


export default Signup;
