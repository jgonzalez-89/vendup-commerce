import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Customernavbar() {
  return (
    <Navbar className="stylenavar">
      <Container>
        <Navbar href="#home">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          React Bootstrap
        </Navbar>{" "}
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <div className="justify-content-end d-flex flex-row">
              <Nav.Link href="#">Registrate</Nav.Link>
              <Nav.Link href="#">Login</Nav.Link>
            </div>{" "}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Customernavbar;

// <Navbar className="stylenavar">
//         <Container>

//         </Container>{" "}
//       </Navbar>{" "}
