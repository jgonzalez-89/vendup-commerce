import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Forgotpass from "./PasswordModal.jsx";
import "../../../../public/logoblack.png";
import "../../styles/modals.css"

function Login() {

  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState ("");
  const navigate = useNavigate;
  const token = sessionStorage.getItem("token");


 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showForgotpassModal, setShowForgotpassModal] = useState(false);

  const handleCloseView = () => {
    setShow(false);
    setShowForgotpassModal (true);
    console.log("working");
  }



  return (
    <>
    <Button variant="warning" onClick={handleShow}>
    Login
  </Button>

    {showForgotpassModal ? <Forgotpass cerrar= {setShowForgotpassModal} className="m-2 text-white possition-absolute bottom-0 end-0" />
    : 
   
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome Back!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 p-1">
              <Form.Label>
                Email address</Form.Label>
              <Form.Control
                type="email"
                className="form-control"
                placeholder="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
              />
              
              <Form.Label className="pt-2">
                Password</Form.Label>
              <Form.Control
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="show-grid">
        <Container>
          <Row>
            <Col xs={3} md={4}>
            <img
          alt=""
          src="logowhite.png"
          width="100"
          height="60"
          className="position-absolute top-0 start-0"
          />{' '}
            </Col>
            <Col xs={7} md={4}>
            <Button variant="warning btn-lg" onClick={handleClose}>
            Login
          </Button>
            </Col>
            <Col xs={2} md={4}>
            <h6 className="mt-3 end-0 text-white" onClick={handleCloseView}><u>Forgot password?</u></h6>
          
            
            </Col>
          </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    
  }
  </>
);
}

export default Login;
