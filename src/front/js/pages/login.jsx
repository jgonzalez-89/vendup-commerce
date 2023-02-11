import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Login() {
  // const { store, actions } = useContext(Context);
  // const [email, setEmail] = useState("");
  // const [passWord, setpassWord] = useState("");
  // const navigate = useNavigate;
  // const token = sessionStorage.getItem("token");

  // const handleClick = () => {
  //   actions.login(email, passWord);
  // };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        LogIn
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome Back!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
               type="email" 
               className="form-control" 
               placeholder="email"
              //  value={email}
              //  onChange={(evt) => setEmail(evt.target.value)}
               />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password" 
                className="form-control" 
                placeholder="Password"
                // value={passWord}
                // onChange={(evt) => setpassWord(evt.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClick}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;