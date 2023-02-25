import React from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../../../public/logowhite.png";

const Header = ({NavHome, NavProducts, NavUser, }) => {

  return (
    <Navbar bg="dark" variant="dark" style={{ minHeight: "50px", top: "0" }}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} width="100" role="img" aria-label="Vendup" />
        </Navbar.Brand>

        <Nav className="me-auto">
          {NavHome && <Nav.Link href={NavHome}><Button className="" variant="warning">Home</Button></Nav.Link>}
          {NavUser && <Nav.Link href={NavUser}><Button className="" variant="warning">Perfil</Button></Nav.Link>}
          {NavProducts && <Nav.Link href={NavProducts}><Button className="" variant="warning">Productos</Button></Nav.Link>}
        </Nav>
        <Nav className="ms-auto">
          {/* <Button className="" variant="warning">
            Subir producto
          </Button> */}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;

