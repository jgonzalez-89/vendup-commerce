import React from "react";
import Navbar from "src/front/js/component/Navbar.jsx";
import Jumbotron from "./Jumbotron.jsx";
import Footer from "./Footer.jsx";
import Space from "./Space.jsx";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Space />
      <Jumbotron />
      <Footer />
    </div>
  );
};

export default Home;
