import React from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../../../public/logowhite.png";

const Header = ({NavHome, NavProducts, NavUser}) => {

  return (
    <Navbar bg="dark" variant="dark" style={{ minHeight: "50px", top: "0" }}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} width="100" role="img" aria-label="Vendup" />
        </Navbar.Brand>

        <Nav className="me-auto">
          {NavHome && <Nav.Link href={NavHome}>Home</Nav.Link>}
          {NavUser && <Nav.Link href={NavUser}>Usuario</Nav.Link>}
          {NavProducts && <Nav.Link href={NavProducts}>Productos</Nav.Link>}
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
