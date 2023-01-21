import React from "react";
import Navbar from "src/front/js/component/Navbar.jsx";
import Jumbotron from "./Jumbotron.jsx";
import Footer from "./Footer.jsx";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Jumbotron />
      <Space />
      <Footer />
    </div>
  );
};

export default Home;
