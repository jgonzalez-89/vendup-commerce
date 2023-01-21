import React from "react";

function Navbar() {
  return (
    <div className="container ">
      <nav className="navbar  navbar-expand-lg d-flex justify-content-between navbar-light p-50 ">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <a className="nav-link text-black" href="">
                HOME <span className="sr-only"> (current) </span>{" "}
              </a>{" "}
            </li>{" "}
            <li className="nav-item">
              <a className="nav-link text-black" href="">
                ABOUT{" "}
              </a>{" "}
            </li>{" "}
            <li className="nav-item active">
              <a className="nav-link text-black" href="">
                LOGIN <span className="sr-only"> (current) </span>{" "}
              </a>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
      </nav>{" "}
    </div>
  );
}

export default Navbar;
