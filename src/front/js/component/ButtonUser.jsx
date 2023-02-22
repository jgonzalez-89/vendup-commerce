import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonUser = ({ text, selected, handleClick }) => {
  return (
    <div className="d-flex justify-content-center">
      <Button
        className={`nav-link ${selected ? 'active' : ''}`}
        variant="warning"
        aria-current="page"
        onClick={handleClick}
        style={{
          // width: "80%",
          marginTop: '2vw',
          backgroundColor: selected ? '#FEBD2F' : '',
          color: 'black',
        }}
      >
        {text}
      </Button>
    </div>
  );
};

export default ButtonUser;
