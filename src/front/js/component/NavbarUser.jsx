import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../../../../public/logowhite.png';
import LogoVendup from '../../../../public/vendup.png';

const Header = ({ NavHome, NavProducts, NavUser, onClickLogOut }) => {
  return (
    <Navbar bg="dark" variant="dark" style={{ minHeight: '50px', top: '0' }}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={LogoVendup} width="100" role="img" aria-label="Vendup" />
        </Navbar.Brand>

        <Nav className="me-auto">
          {NavHome && (
            <Nav.Link href={NavHome}>
              <Button className="" variant="warning">
                Inicio
              </Button>
            </Nav.Link>
          )}
          {NavUser && (
            <Nav.Link href={NavUser}>
              <Button className="" variant="warning">
                Perfil
              </Button>
            </Nav.Link>
          )}
          {NavProducts && (
            <Nav.Link href={NavProducts}>
              <Button className="" variant="warning">
                Productos
              </Button>
            </Nav.Link>
          )}
        </Nav>

        <Nav className="ms-auto">
          <Button className="" variant="warning" onClick={onClickLogOut}>
            Cerrar sesion
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
