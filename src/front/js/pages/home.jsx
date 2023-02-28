import React, { useState, useContext } from 'react';
// import { Context } from '../store/appContext';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import '../../styles/home.css';
import logo from '../../../../public/logowhite.png';
import SearchPage from '../component/Search.jsx';
import CardsHome from '../component/CardsHome.jsx';
import Login from '../component/LoginModal.jsx';
import SignUp from '../component/SignupModal.jsx';

const Home = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ minHeight: '50px', top: '0' }}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} width="100" role="img" aria-label="Vendup" />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Login className="me-2" onClose={() => setShowLoginModal(false)} />
            <SignUp className="me-2" onClose={() => setShowSignupModal(false)} />
          </Nav>
        </Container>
      </Navbar>

      <div className="text-center mt-5 mb-5">
        <div className="container mb-5">
          {/* <SearchPage /> */}

          <CardsHome />
        </div>
      </div>
    </>
  );
};

export default Home;
