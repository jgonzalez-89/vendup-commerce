import React from "react";
import logo from "../../../../public/logowhite.png";
//import Login from "../pages/login.jsx";
//import SignUp from "../pages/signup.jsx";

function header() {
  return (
    <>
      <header className="p-3 bg-dark text-bg-dark">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-left mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <img src={logo} width="100" role="img" aria-label="Vendup"></img>
              <span className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start fs-4">
                VENDUP
              </span>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"></ul>

            {/* <div className="text-end">
          <button type="button" className="btn btn-outline-light me-2" onClick={Login} to="/login">Login</button>
          <button type="button" className="btn btn-warning" onClick={SignUp} to="/signup">Sign-up</button>
        </div> */}
          </div>
        </div>
      </header>
    </>
  );
}

export default header;