import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home.jsx';
import injectContext from './store/appContext';
import Terms from './component/Terms.jsx';
import About from './component/About.jsx';
import Team from './component/Team.jsx';
import FAQs from './component/FAQs.jsx';
import Userpage from './pages/userpage.jsx';
import ProductView from './pages/productview.jsx';
import Payment from './pages/payment.jsx';
import Error404 from './pages/error404.jsx';

const Layout = () => {
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
          <Route element={<FAQs />} path="/faqs" />
          <Route element={<Team />} path="/team" />
          <Route element={<About />} path="/about" />
          <Route element={<Error404 />} path="*" />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default injectContext(Layout);
