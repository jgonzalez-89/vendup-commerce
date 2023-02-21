import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import "../../../../public/logoblack.png";
import "../../styles/modals.css"

function Signup () {
 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Sing Up
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hi There!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container className="justify-content-center align-text-center">
            <Row>
              <Col xs={6} md={4}>
              <Button variant="primary" onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16" className="gap-between">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
              </svg>
                Facebook 
              </Button>
              </Col>
              <Col xs={6} md={4}>
              <Button variant="secondary" onClick={handleClose}>
               Google  
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
              </svg>
              </Button>
              </Col>
             </Row>
          </Container>
          
          <Form>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            
            <Form.Label className="pt-2">Full Name</Form.Label>
              <Form.Control
                type="name"
                className="text"
                placeholder="Full Name"
              />
              
              <Form.Label className="pt-2">Email address</Form.Label>
              <Form.Control
                type="email"
                className="form-control"
                placeholder="email"
              />

              <Form.Label className="pt-2">Password</Form.Label>
              <Form.Control
                type="password"
                className="form-control"
                placeholder="Password"
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
            Sing In
          </Button>
            </Col>
            <Col xs={2} md={4}>
            <a className="m-2 text-white position-absolute bottom-0 end-0">
              <small>Already have an account?</small></a>
            </Col>
          </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Signup;