import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { HttpHandler } from '../../../http/handler.js';
import Cookies from 'js-cookie';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handler = new HttpHandler();
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!acceptedTerms) {
      setErrorMessage('You must accept the terms and conditions before registering.');
      return;
    }

    console.log(email, password);
    const response = await handler.register(email, password);
    console.log(response);

    if (response && response.access_token) {
      setShow(false);
      Cookies.set('access_token', response.access_token, { expires: 7 });
      navigate('/user');
    } else {
      setErrorMessage('Email o contraseña incorrectos');
    }
  };

  return (
    <>
      <Button variant="warning" className="m-2" onClick={handleShow}>
        Registrarse
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bienvenido!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3 p-1">
              <Form.Label>Dirección de correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Form.Label className="pt-2">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Check
                className="mt-3"
                type="checkbox"
                label="He leído y acepto los términos y condiciones"
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
            </Form.Group>
          </Form>
          {errorMessage !== '' && <p className="alert alert-danger text-center">{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleRegister}>
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Register;