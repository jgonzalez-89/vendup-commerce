import React from "react";

const Footer = () => (
  <footer className="page-footer font-small blue pt-4 footercolor">
    <div className="container-fluid text-center text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5 className="text-uppercase">Footer Content</h5>
          <p>
            Here you can use rows and columns to organize your footer content.
          </p>
        </div>
        <hr className="clearfix w-100 d-md-none pb-0" />
        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Our linkedinks</h5>
          <ul className="list-unstyled">
            <li>
              <a href="https://www.linkedin.com/in/jgonzalez89/">
                Linkeding JoseLu 1
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/lola-petrement/">
                Linkeding Lola 2
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/j-enrique-ar%C3%A9s-lorenzo-6a636a148/">
                Linkeding Quique
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">More Proyects</h5>
          <ul className="list-unstyled">
            <li>
              <a href="https://github.com/jgonzalez-89">GitHub JoseLu</a>
            </li>
            <li>
              <a href="https://github.com/Petrement">GitHub LoLa</a>
            </li>
            <li>
              <a href="https://github.com/INVIiICTUS?tab=following">
                GitHub Quique
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright text-center py-3">
      <h5>© March 2023 Copyright By JoseLu, Lola, Quique</h5>
    </div>
  </footer>
);
export default Footer;
