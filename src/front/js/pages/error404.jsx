import React from 'react';
import img404 from '../../../../public/error-404.jpg';

import Header from '../component/Navbar.jsx';

const Error404 = () => {
  return (
    <>
      <Header NavHome={'/'} />
      <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
        <img
          src={img404}
          alt="background img"
          style={{
            borderRadius: '10px',
            boxShadow: '10px 10px 20px rgba(0,0,0,0.2)',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
    </>
  );
};

export default Error404;
