import React from 'react';
import { useState } from 'react';
import { Button, Modal, Row, Col, Container } from 'react-bootstrap';

function Forgotpass(props) {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    props.cerrar(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <a className="m-2 text-white position-absolute bottom-0 end-0" variant="warning" onClick={handleShow}>
        Forgot password?
      </a> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Your Password?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">Don't Worry! Just enter your email address to reset your password.</p>
          <form>
            <div className="form-group">
              <label className="pb-2">Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer className="show-grid">
          <Container>
            <Row>
              <Col xs={6} md={6}>
                <img alt="" src="logowhite.png" width="100" height="60" className="position-absolute top-0 start-0" />{' '}
              </Col>
              <Col xs={6} md={6}>
                <Button variant="warning btn-lg" onClick={handleClose}>
                  New Password
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Forgotpass;
