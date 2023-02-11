import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import injectContext from "./store/appContext";
import Footer from "./component/Footer.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<h1> Not found! </h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default injectContext(Layout);
