import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import SearchPage from "../component/search.jsx";
import Navbar from "../component/Navbar";
import Button from "../component/buttons";
import logo from "../component/logowhite.png";


export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
   <header className="p-3 bg-dark text-bg-dark">
    <div className="container-fluid">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-left mb-2 mb-lg-0 text-white text-decoration-none">
          <img src={logo} width="100" role="img" aria-label="Vendup"></img>
          <span className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start fs-4">VENDUP</span>
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        </ul>
  <Button text="login"/>
  <Button text="signup"/>

        {/* <div className="text-end">
          <button type="button" className="btn btn-outline-light me-2" onClick={Login} to="/login">Login</button>
          <button type="button" className="btn btn-warning" onClick={SignUp} to="/signup">Sign-up</button>
        </div> */}
      </div>
    </div>
  </header>
    <div className="text-center mt-3">
      <SearchPage />
      <p></p>{" "}
      <div className="alert alert-info">
        <img src="https://user-images.githubusercontent.com/112573464/216276882-8d2a2299-fe88-404f-ab6d-cab3290e779a.png" />
        {store.message ||
          "Loading message from the backend (make sure your python backend is running)... ok?"}{" "}
      </div>{" "}
    </div>
    </>
  );
};
