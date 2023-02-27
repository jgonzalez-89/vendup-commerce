import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home.jsx';
import injectContext from './store/appContext';
import Footer from './component/Footer.jsx';
import Terms from './component/Terms.jsx';
import Team from './component/Team.jsx';
import FAQs from './component/FAQS.jsx';
import Userpage from './pages/userpage.jsx';
import ProductView from './pages/productview.jsx';
import Payment from './pages/payment.jsx';

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || '';

  return (
    <>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<ProductView />} path="/products" />
          <Route element={<Payment />} path="/pay" />
          <Route element={<Userpage />} path="/user" />
          <Route element={<Home />} path="/home" />
          <Route element={<Terms />} path="/terms" />
          <Route element={<FAQs />} path="/FAQs" />
          <Route element={<Team />} path="/team" />

          <Route element={<h1> Not found! </h1>} path="*"/>
        </Routes>{' '}
        {/* <Footer /> */}
      </BrowserRouter>{' '}
    </>
  );
};

export default injectContext(Layout);
