import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" style={{ minHeight: '50px' }}>
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Button className="" variant="warning">
            Subir producto
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
